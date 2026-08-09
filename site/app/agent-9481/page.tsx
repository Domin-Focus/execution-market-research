import type { Metadata } from "next";
import Link from "next/link";
import AgentLab from "./AgentLab";

const githubUrl = "https://github.com/Domin-Focus/execution-market-research";
const registryAddress = "0x8004A818BFB912233c491871b3d84c89A494BD9e";
const ownerAddress = "0x163A584516EF59a8aC494Da712DaF1D3963c01aA";
const transactionHash = "0x4e0c8cbcac3b7018f43c03c89095f5a1fc2c06b6f4d7e5dcf6bc016f14b04e6f";
const metadataUrl =
  "https://domin-focus.github.io/execution-market-research/agents/9481/agent-9481.json";

export const metadata: Metadata = {
  title: "Agent 9481 Lab",
  description:
    "A public EMR experiment connecting an ERC-8004 identity to task-backed execution evidence.",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Agent9481Page() {
  return (
    <main className="lab-page">
      <nav className="nav shell" aria-label="Agent lab navigation">
        <Link className="brand" href="/" aria-label="Return to EMR home">
          <span className="brand-mark">EMR</span>
          <span>Execution Market Research</span>
        </Link>
        <div className="nav-links">
          <a href="#experiment">Experiment</a>
          <a href="#activation">Chain steps</a>
          <a className="nav-cta" href={githubUrl} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
        </div>
      </nav>

      <header className="lab-hero shell">
        <div className="eyebrow"><span className="pulse" /> Sepolia research identity</div>
        <div className="lab-title-row">
          <div>
            <h1>Agent <span>9481</span></h1>
            <p>
              The first EMR test agent: a public identity connected to reproducible
              task evidence, explicit authority limits, and transparent evaluation.
            </p>
          </div>
          <dl className="lab-identity">
            <div><dt>Network</dt><dd>Ethereum Sepolia</dd></div>
            <div><dt>Standard</dt><dd>ERC-8004</dd></div>
            <div><dt>Capability</dt><dd>BTC risk research</dd></div>
            <div><dt>Authority</dt><dd>Simulation only</dd></div>
          </dl>
        </div>
        <div className="evidence-links">
          <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noreferrer">
            Registration transaction <Arrow />
          </a>
          <a href={`https://sepolia.etherscan.io/address/${ownerAddress}`} target="_blank" rel="noreferrer">
            Owner wallet <Arrow />
          </a>
          <a href={metadataUrl} target="_blank" rel="noreferrer">
            Public metadata <Arrow />
          </a>
        </div>
      </header>

      <section className="lab-section shell" id="experiment">
        <div className="lab-section-heading">
          <div>
            <p className="kicker">Experiment 001 · interactive prototype</p>
            <h2>Generate one execution receipt.</h2>
          </div>
          <p>
            Choose a synthetic market snapshot. Agent 9481 applies a fixed,
            inspectable risk policy and produces a browser-generated evidence record.
            No live market data, funds, trades, or investment advice are involved.
          </p>
        </div>
        <AgentLab />
      </section>

      <section className="lab-section shell activation" id="activation">
        <div className="lab-section-heading">
          <div>
            <p className="kicker">Ethereum activation path</p>
            <h2>Move from identity to evidence.</h2>
          </div>
          <p>
            The identity is on-chain. The next steps connect it to public metadata,
            repeatable executions, independent evaluation, and eventually grounded
            ERC-8004 reputation.
          </p>
        </div>
        <ol className="activation-list">
          <li className="complete"><span>01</span><div><strong>Register identity</strong><p>Agent 9481 was minted on the Sepolia ERC-8004 registry.</p></div><em>Complete</em></li>
          <li className="ready"><span>02</span><div><strong>Publish metadata</strong><p>The registration JSON is publicly hosted and ready to attach.</p></div><em>Ready</em></li>
          <li><span>03</span><div><strong>Set the on-chain agent URI</strong><p>Call <code>setAgentURI(9481, metadataUrl)</code> from the owner wallet.</p></div><em>Next</em></li>
          <li><span>04</span><div><strong>Commit an execution record</strong><p>Download a receipt from this lab, review it, and add it to the research repository.</p></div><em>Pending</em></li>
          <li><span>05</span><div><strong>Add independent evaluation</strong><p>A second wallet or evaluator verifies the task evidence and declared method.</p></div><em>Pending</em></li>
          <li><span>06</span><div><strong>Submit grounded reputation</strong><p>Reference the evaluated receipt in an ERC-8004 reputation transaction.</p></div><em>Pending</em></li>
        </ol>
        <div className="activation-actions">
          <a className="button primary" href={`https://sepolia.etherscan.io/address/${registryAddress}#writeProxyContract`} target="_blank" rel="noreferrer">
            Open registry write page <Arrow />
          </a>
          <a className="button secondary" href={`${githubUrl}/blob/main/agents/9481/agent-9481.json`} target="_blank" rel="noreferrer">
            Inspect metadata source <Arrow />
          </a>
        </div>
      </section>

      <section className="lab-section shell lab-principle">
        <p className="kicker">What this proves</p>
        <blockquote>
          Identity tells us who the agent is. An execution receipt begins to show
          what it did, under which limits, and how another evaluator can verify it.
        </blockquote>
        <p>
          This prototype validates the evidence pipeline—not Agent 9481&apos;s financial
          expertise. Expertise requires repeated tasks, delayed outcomes,
          counterfactual baselines, and independent evaluation.
        </p>
      </section>

      <footer className="footer shell">
        <div>
          <strong>Agent 9481 Lab</strong>
          <p>Simulation only. No trading authority. No funds at risk.</p>
        </div>
        <div className="footer-links">
          <Link href="/">EMR home</Link>
          <a href={`${githubUrl}/blob/main/research/experiments/001-task-backed-reputation.md`} target="_blank" rel="noreferrer">Experiment design <Arrow /></a>
        </div>
      </footer>
    </main>
  );
}
