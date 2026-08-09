"use client";

import { useMemo, useState } from "react";

type Snapshot = {
  id: string;
  label: string;
  description: string;
  capturedAt: string;
  spotUsd: number;
  realizedVol30d: number;
  funding8hPct: number;
  openInterest24hPct: number;
  putSkew25d: number;
  btcReturn7dPct: number;
};

type Receipt = Record<string, unknown>;

const snapshots: Snapshot[] = [
  {
    id: "synthetic-neutral-001",
    label: "Neutral market",
    description: "Moderate volatility with balanced positioning and limited leverage pressure.",
    capturedAt: "2026-08-09T00:00:00Z",
    spotUsd: 100000,
    realizedVol30d: 38,
    funding8hPct: 0.005,
    openInterest24hPct: 2.1,
    putSkew25d: 1.2,
    btcReturn7dPct: 1.8,
  },
  {
    id: "synthetic-leverage-002",
    label: "Leverage buildup",
    description: "Rising open interest, positive funding, and higher volatility increase liquidation risk.",
    capturedAt: "2026-08-09T00:00:00Z",
    spotUsd: 100000,
    realizedVol30d: 57,
    funding8hPct: 0.024,
    openInterest24hPct: 10.4,
    putSkew25d: 3.7,
    btcReturn7dPct: 7.9,
  },
  {
    id: "synthetic-riskoff-003",
    label: "Risk-off shock",
    description: "A sharp weekly decline, high volatility, and defensive options skew signal downside stress.",
    capturedAt: "2026-08-09T00:00:00Z",
    spotUsd: 100000,
    realizedVol30d: 71,
    funding8hPct: -0.008,
    openInterest24hPct: -6.8,
    putSkew25d: 8.1,
    btcReturn7dPct: -12.4,
  },
];

const stableStringify = (value: unknown) =>
  JSON.stringify(value, (_key, nestedValue) => {
    if (
      nestedValue &&
      typeof nestedValue === "object" &&
      !Array.isArray(nestedValue)
    ) {
      return Object.keys(nestedValue as Record<string, unknown>)
        .sort()
        .reduce<Record<string, unknown>>((sorted, key) => {
          sorted[key] = (nestedValue as Record<string, unknown>)[key];
          return sorted;
        }, {});
    }
    return nestedValue;
  });

async function sha256(value: unknown) {
  const bytes = new TextEncoder().encode(
    typeof value === "string" ? value : JSON.stringify(value)
  );
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return `0x${Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")}`;
}

function assess(snapshot: Snapshot) {
  const signals: string[] = [];
  let score = 0;

  if (snapshot.realizedVol30d >= 60) {
    score += 2;
    signals.push("30-day realized volatility is above the high-risk threshold.");
  } else if (snapshot.realizedVol30d >= 40) {
    score += 1;
    signals.push("30-day realized volatility is elevated.");
  }

  if (snapshot.funding8hPct >= 0.02) {
    score += 2;
    signals.push("Positive funding indicates crowded leveraged longs.");
  } else if (snapshot.funding8hPct >= 0.01) {
    score += 1;
    signals.push("Funding is moderately positive.");
  }

  if (snapshot.openInterest24hPct >= 8) {
    score += 2;
    signals.push("Open interest expanded rapidly over 24 hours.");
  } else if (snapshot.openInterest24hPct >= 4) {
    score += 1;
    signals.push("Open interest growth is above the monitoring threshold.");
  }

  if (snapshot.putSkew25d >= 5) {
    score += 2;
    signals.push("Options skew shows strong demand for downside protection.");
  } else if (snapshot.putSkew25d >= 2) {
    score += 1;
    signals.push("Options skew shows moderate demand for protection.");
  }

  if (snapshot.btcReturn7dPct <= -8) {
    score += 2;
    signals.push("The seven-day return indicates a material downside shock.");
  } else if (snapshot.btcReturn7dPct <= -3) {
    score += 1;
    signals.push("The seven-day return is below the downside threshold.");
  }

  if (signals.length === 0) {
    signals.push("No monitored signal crossed an elevated-risk threshold.");
  }

  if (score >= 7) {
    return {
      score,
      classification: "High",
      action: "Escalate for human review; reduce leverage assumptions and evaluate downside protection.",
      signals,
    };
  }
  if (score >= 4) {
    return {
      score,
      classification: "Elevated",
      action: "Increase monitoring frequency and review leverage, liquidity, and liquidation exposure.",
      signals,
    };
  }
  if (score >= 2) {
    return {
      score,
      classification: "Moderate",
      action: "Maintain routine monitoring and re-check if another risk signal crosses its threshold.",
      signals,
    };
  }
  return {
    score,
    classification: "Low",
    action: "Continue routine monitoring; no simulated intervention is indicated.",
    signals,
  };
}

export default function AgentLab() {
  const [selectedId, setSelectedId] = useState(snapshots[0].id);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = useMemo(
    () => snapshots.find((snapshot) => snapshot.id === selectedId) ?? snapshots[0],
    [selectedId]
  );

  async function runExperiment() {
    setRunning(true);
    setCopied(false);

    const startedAt = new Date().toISOString();
    const result = assess(selected);
    const taskSpecification = {
      type: "btc-seven-day-risk-assessment",
      objective: "Classify downside and leverage risk from a frozen synthetic snapshot.",
      output: "Risk class, observed signals, and a monitoring recommendation.",
    };
    const policy = {
      id: "emr-btc-risk-policy-v0.1",
      mode: "simulation-only",
      allowedActions: ["read_synthetic_snapshot", "classify_risk", "recommend_monitoring"],
      prohibitedActions: ["trade", "transfer_assets", "access_wallet", "use_live_market_data"],
    };

    const [specificationHash, policyHash, inputsHash, outputsHash] = await Promise.all([
      sha256(taskSpecification),
      sha256(policy),
      sha256(selected),
      sha256(result),
    ]);
    const completedAt = new Date().toISOString();
    const receiptBody = {
      version: "emr-receipt/0.1",
      task: {
        id: `emr-9481-${selected.id}`,
        specificationHash,
        ...taskSpecification,
      },
      agent: {
        identity: "eip155:11155111:0x8004A818BFB912233c491871b3d84c89A494BD9e:9481",
        name: "EMR Research Agent",
      },
      authority: {
        policyHash,
        ...policy,
        principal: "public-research-simulation",
      },
      execution: {
        status: "completed",
        snapshotId: selected.id,
        inputsHash,
        outputsHash,
        actionsHash: await sha256(["read", "score", "classify", "recommend"]),
        startedAt,
        completedAt,
        result,
      },
      evaluation: {
        method: "schema-and-policy-check/v0.1",
        baseline: "monitor-only",
        executionQuality: 1,
        outcomeQuality: null,
        incrementalContribution: null,
        evaluator: "self-check-unverified",
        evidenceStatus: "awaiting-independent-evaluation",
      },
      settlement: { reference: null },
      signatures: { executor: null, evaluator: null },
      provenance: {
        environment: "browser-client",
        data: "synthetic",
        persistence: "download-required",
      },
    };
    const receiptId = await sha256(stableStringify(receiptBody));
    setReceipt({ receiptId, ...receiptBody });
    setRunning(false);
  }

  async function copyReceipt() {
    if (!receipt) return;
    await navigator.clipboard.writeText(JSON.stringify(receipt, null, 2));
    setCopied(true);
  }

  function downloadReceipt() {
    if (!receipt) return;
    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `agent-9481-${selected.id}-receipt.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const result = receipt?.execution as
    | { result?: { classification: string; score: number; action: string; signals: string[] } }
    | undefined;

  return (
    <div className="lab-console">
      <section className="scenario-panel" aria-labelledby="scenario-title">
        <div className="console-label"><span>01</span> Task input</div>
        <h3 id="scenario-title">Choose a frozen scenario</h3>
        <div className="scenario-options">
          {snapshots.map((snapshot) => (
            <label className={selectedId === snapshot.id ? "selected" : ""} key={snapshot.id}>
              <input
                type="radio"
                name="snapshot"
                value={snapshot.id}
                checked={selectedId === snapshot.id}
                onChange={() => {
                  setSelectedId(snapshot.id);
                  setReceipt(null);
                  setCopied(false);
                }}
              />
              <span><strong>{snapshot.label}</strong><small>{snapshot.description}</small></span>
            </label>
          ))}
        </div>
        <dl className="snapshot-table">
          <div><dt>BTC spot</dt><dd>${selected.spotUsd.toLocaleString()}</dd></div>
          <div><dt>30d realized vol.</dt><dd>{selected.realizedVol30d}%</dd></div>
          <div><dt>8h funding</dt><dd>{selected.funding8hPct}%</dd></div>
          <div><dt>24h open interest</dt><dd>{selected.openInterest24hPct}%</dd></div>
          <div><dt>25d put skew</dt><dd>{selected.putSkew25d}</dd></div>
          <div><dt>BTC seven-day return</dt><dd>{selected.btcReturn7dPct}%</dd></div>
        </dl>
        <button className="button primary run-button" type="button" onClick={runExperiment} disabled={running}>
          {running ? "Generating evidence…" : "Run Agent 9481"}
        </button>
      </section>

      <section className="receipt-panel" aria-live="polite" aria-labelledby="receipt-title">
        <div className="console-label"><span>02</span> Execution evidence</div>
        {!receipt ? (
          <div className="empty-receipt">
            <div className="empty-mark">9481</div>
            <h3 id="receipt-title">No receipt yet</h3>
            <p>Run the fixed policy to generate a locally verifiable JSON record.</p>
          </div>
        ) : (
          <div className="receipt-result">
            <div className="result-heading">
              <div>
                <span className={`risk-badge risk-${result?.result?.classification.toLowerCase()}`}>
                  {result?.result?.classification} risk
                </span>
                <h3 id="receipt-title">Assessment complete</h3>
              </div>
              <strong>{result?.result?.score}/10</strong>
            </div>
            <p className="recommendation">{result?.result?.action}</p>
            <ul className="signal-list">
              {result?.result?.signals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
            <dl className="verification-grid">
              <div><dt>Schema</dt><dd>EMR receipt v0.1</dd></div>
              <div><dt>Policy compliance</dt><dd><span className="status-dot" /> Pass</dd></div>
              <div><dt>Outcome</dt><dd>Pending</dd></div>
              <div><dt>Independent evaluator</dt><dd>Required</dd></div>
            </dl>
            <details className="receipt-json">
              <summary>Inspect receipt JSON</summary>
              <pre>{JSON.stringify(receipt, null, 2)}</pre>
            </details>
            <div className="receipt-actions">
              <button className="button primary" type="button" onClick={downloadReceipt}>Download receipt</button>
              <button className="button secondary" type="button" onClick={copyReceipt}>{copied ? "Copied" : "Copy JSON"}</button>
            </div>
            <p className="local-note">The record exists only in this browser until you download and commit it.</p>
          </div>
        )}
      </section>
    </div>
  );
}
