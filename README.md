# Execution Market Research

EMR studies how autonomous execution can become measurable, accountable, and economically coordinated.

**Website:** [execution-market-research.lihao20051404.chatgpt.site](https://execution-market-research.lihao20051404.chatgpt.site)  
**Maintainer:** [Domin-Focus](https://github.com/Domin-Focus)  
**First on-chain agent:** [ERC-8004 Agent 9481 on Ethereum Sepolia](https://sepolia.etherscan.io/tx/0x4e0c8cbcac3b7018f43c03c89095f5a1fc2c06b6f4d7e5dcf6bc016f14b04e6f)

This repository is the durable research record. ChatGPT is a collaborator for exploration, critique, and drafting; conclusions become authoritative only after they are reviewed and committed here.

## Working loop

1. Select one question from [`BACKLOG.md`](BACKLOG.md).
2. Open one issue using the research-question template.
3. Capture evidence and reasoning in a research note.
4. If a claim is testable, add a hypothesis/experiment document.
5. Record consequential design choices as an ADR.
6. Synthesize progress weekly.
7. Promote stable findings into a paper draft.

## Structure

```text
BACKLOG.md                 Prioritized questions
GOVERNANCE.md              Source-of-truth and promotion rules
.github/ISSUE_TEMPLATE/    One-question-per-issue intake
research/notes/            Evidence-backed working notes
research/experiments/      Falsifiable hypotheses and results
research/weekly/           Weekly synthesis
architecture/decisions/    Architecture decision records
papers/                    Drafting pipeline and manuscripts
specifications/             Versioned EMR schemas
agents/                     Public agent registration metadata
site/                       Public research website
templates/                 Reusable research templates
```

## Initial EMR scope

- Execution evidence and receipts
- Authority and delegation
- Contribution evaluation and capability surfaces
- Responsibility accounting
- Coordination and settlement

Keep implementation choices such as ERC-8004, x402, and adjacent standards composable with EMR rather than treating them as EMR's thesis.
