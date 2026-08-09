# EMR-001: Execution Receipt v0.1

**Status:** working draft

An execution receipt is a signed, versioned record connecting an agent identity to a task, delegated authority, observable actions, evaluation method, and settlement reference.

## Minimum fields

```yaml
version: emr-receipt/0.1
task:
  id: string
  specification_hash: bytes32
agent:
  identity: caip10-or-registry-reference
authority:
  policy_hash: bytes32
  expires_at: timestamp
execution:
  inputs_hash: bytes32
  outputs_hash: bytes32
  actions_hash: bytes32
  started_at: timestamp
  completed_at: timestamp
evaluation:
  method: string
  baseline: string
  evaluator: address-or-did
  evidence_uri: uri
settlement:
  reference: optional-string
signatures:
  executor: signature
  evaluator: optional-signature
```

## Design rules

- Store private or large evidence off-chain; commit hashes and public references on-chain.
- Declare the evaluation method and baseline before observing the outcome.
- Keep execution quality, outcome quality, and incremental contribution separate.
- Link identity and evidence without requiring one specific chain, payment system, or agent framework.

## Open questions

- Which fields must be signed by the principal as well as the executor?
- How should partial, failed, and prevented executions be represented?
- Which receipt claims are facts, evaluator attestations, or derived scores?
