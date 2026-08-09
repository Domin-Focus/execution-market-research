# Agent 9481 execution records

This directory is the durable source of truth for reviewed execution receipts produced by ERC-8004 Agent `9481`.

## Admission rule

A receipt may be committed only after a researcher has:

1. confirmed that the task used a declared, reproducible input snapshot;
2. verified that the receipt matches `emr-receipt/0.1`;
3. checked that the execution stayed inside its stated authority policy;
4. labeled self-evaluation, independent evaluation, and delayed outcomes separately;
5. removed private data and secrets.

Browser-generated receipts are temporary until they are reviewed and committed here. A receipt does not prove expertise by itself.
