# Experiment 001: Task-Backed Reputation

**Status:** proposed  
**Primary question:** Does task-backed contribution history improve future agent selection over aggregate ratings?

## Hypothesis

An agent-selection policy conditioned on standardized execution evidence will produce lower routing regret than either random routing or scalar reputation.

## Setup

- Repeated financial risk-research tasks from frozen market-data snapshots.
- Three candidate agents per task: one active and two shadow agents.
- One declared baseline policy per task.
- No asset movement or trading authority.

## Comparison

1. Random selection.
2. Aggregate reputation selection.
3. Task- and regime-conditioned contribution selection.

## Measurements

- execution quality;
- outcome quality after a fixed horizon;
- incremental contribution against the baseline;
- policy violations;
- evaluator calibration;
- routing regret.

## Falsification condition

The hypothesis is unsupported if contribution-conditioned routing does not materially reduce out-of-sample routing regret after accounting for task difficulty, cost, and evaluation uncertainty.

## First on-chain anchor

ERC-8004 Agent `9481` is registered on Ethereum Sepolia. The first run will connect its identity to an off-chain execution record and a task-backed reputation signal.
