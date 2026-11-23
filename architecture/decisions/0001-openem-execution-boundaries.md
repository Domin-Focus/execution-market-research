# ADR-0001: OpenEM execution boundaries

- **Status:** proposed
- **Date:** 2026-11-23
- **Related issues/notes:** [#4](https://github.com/Domin-Focus/execution-market-research/issues/4), [OpenEM-01 M1 architecture assessment](../openem-m1-architecture.md)

## Context

OpenEM-01 asks for a simulated, verifiable execution workflow: task, bidding, allocation, authorization, safety validation, execution in a deterministic CEX simulator, settlement, receipt, and replay. The repository currently contains a research record and a static website. It has no OpenEM runtime, package, ledger, allocator, authorizer, simulator, or receipt profile; the only executable code is the site and its browser-side Agent 9481 lab.

The epic fixes several architectural constraints: preserve the execution-market abstraction, reuse existing components, keep market allocation separate from financial authorization, treat agent and executor outputs as untrusted, route all financial state changes through a deterministic safety kernel, keep simulated executor rewards separate from user asset accounting, and never integrate real exchanges or funds.

This ADR records the boundary decisions required before any M2 implementation. The detailed interfaces, state machine, invariants, and plan are in the [M1 architecture assessment](../openem-m1-architecture.md).

## Decision

Adopt the M1 contract with the following decisions:

1. **Separate runtime package.** Implement OpenEM as a framework-agnostic TypeScript package under `openem/`, independent of the Next.js static site and its D1/Cloudflare runtime. The site remains a presentation surface and may later consume read-only receipt types. Financial authorization, the safety kernel, and authoritative ledgers must not run in browser code or a static export.
2. **Deterministic core.** The core uses canonical JSON, SHA-256 hashes, integer minor units, a fixture clock, content-derived identifiers, sorted iteration, and no network access, wall-clock time, or unseeded randomness. Replay depends on this determinism.
3. **Allocation and authorization are separate.** The allocator receives tasks, bids, and executor manifests and returns a selection. It cannot issue a grant, alter a ledger, or observe the selected executor's eventual action. The authorizer independently evaluates a typed action against the principal's mandate and issues a scoped, expiring, single-use grant. An allocation cannot widen authority.
4. **One financial mutator.** Only `SafetyKernel.commit` mutates the user-asset ledger or the reward ledger. `SafetyKernel.validate` is pure. Commit revalidates against authoritative state, invokes the simulator, computes postings, asserts invariants, and persists the fill, both ledgers, the event batch, and the idempotency record atomically. A failed commit writes nothing.
5. **Untrusted executor outputs.** Bids, action proposals, claimed capabilities, and claimed quality are untrusted. They are validated structurally and semantically against the task, reviewed manifests, deadlines, and the grant. No agent-supplied content is evaluated as code or used to resolve a manifest, network location, or authorization scope.
6. **Receipt profile, not a new framework.** OpenEM receipts reuse the existing `emr-receipt/0.1` envelope and add `profile: "openem-execution/0.1"` plus an `openem` extension. The EMR-001 specification is not rewritten in M1. This preserves the common task, agent, authority, execution, evaluation, settlement, and signature fields while adding allocation, authorization, order, ledger, reward, and replay evidence.
7. **Separate simulated rewards.** Executor compensation is settled in a separate simulated-credit ledger. It never posts to a user-asset account, and there is no conversion path into user assets. In M2 the bid fee is an allocation signal only; user-funded service fees are not implemented.
8. **Simulated market only.** Execution consumes a frozen, content-addressed order-book snapshot. The simulator is deterministic, full-fill-or-reject in M2, uses integer price arithmetic, and never calls an exchange, wallet, payment rail, or network endpoint.

## Alternatives considered

- **Implement the workflow inside `site/`.** Rejected. The site is a static export with a client-side lab and an optional D1 binding. A client-controlled browser cannot be the trust anchor for authorization or ledger mutation, and the site has no server-side domain logic or core tests.
- **Create a new receipt envelope or start `emr-receipt/0.2`.** Rejected for M1. It would fragment the evidence format and duplicate the existing required fields. A profile keeps compatibility; if the extension stabilizes, EMR-001 can be revised separately after review.
- **Combine allocation and authorization into one routing service.** Rejected. It collapses market selection and spending authority, contradicting an explicit epic principle and making "selected" indistinguishable from "authorized".
- **Let the authorizer reserve funds.** Rejected for M2. Reservation is a financial state change; performing it in the authorizer would create a second mutator. Commit-time atomic debit keeps the kernel as the sole mutator; reservations move to M3 with the same rule.
- **Model `EXECUTED` as an externally observable state before settlement.** Rejected. A crash between fill and settlement would leave an order without settled balances. Execution and settlement are recorded as two events in one atomic commit, so the observable financial state is always `SETTLED`.
- **Use real exchange APIs, live data, or wallets.** Rejected by the epic. The simulator and fixtures are sufficient to evaluate the workflow, and real integration would add unsafe and unnecessary scope.
- **Sign receipts in M2.** Deferred. Hash binding and verification are implementable without a signing model, and claiming signed evidence without reviewed key management would overstate auditability. M2 marks signatures as `null` and evaluation as a self-check.

## Consequences

Benefits:

- The four trust boundaries (allocation vs authorization, authorization vs mutation, execution vs settlement, user assets vs rewards) are explicit and testable.
- M2 can be implemented and reviewed as a small, dependency-free package while the research record remains the durable evidence store.
- The existing receipt, identity, hashing, and admissions artifacts are reused instead of replaced.
- The atomic commit removes a partial-settlement failure mode before code is written.

Costs and risks:

- A new package, test command, and CI workflow are required; the repository currently has none for core code.
- The site cannot display OpenEM runs until a later read-only integration; M2 ships a CLI.
- M2 is single-attempt and commit-debited. It does not implement reservations, concurrency, durable idempotency, or replay execution; these are M3.
- M2 receipts are unsigned, self-evaluated, and based on a synthetic full-fill simulator. They are auditable evidence records, not proof of expertise or real-market performance.
- The receipt profile may need a follow-up EMR-001 revision if the extension becomes widely used.

Follow-up work:

- Implement M2 only after this ADR and the M1 assessment are reviewed.
- Add the `openem/` package, fixtures, tests, and CI.
- Keep the M2 interface names and field semantics aligned with the M1 contract; record any deviation in a new ADR.
- Decide the M3 reservation, scoped-approval, signature, and replay designs before implementing them.

## Supersession

None. This ADR is proposed and has no superseding decision.
