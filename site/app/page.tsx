import type { Metadata } from "next";
import Link from "next/link";

const githubUrl = "https://github.com/Domin-Focus/execution-market-research";
const txUrl =
  "https://sepolia.etherscan.io/tx/0x4e0c8cbcac3b7018f43c03c89095f5a1fc2c06b6f4d7e5dcf6bc016f14b04e6f";
const registryUrl =
  "https://sepolia.etherscan.io/address/0x8004A818BFB912233c491871b3d84c89A494BD9e";
const issueUrl = `${githubUrl}/issues/new?template=research-question.md&title=RQ%3A+`;

export const metadata: Metadata = {
  title: "Execution Market Research",
  description:
    "Open research on making autonomous execution measurable, accountable, and economically coordinated.",
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="EMR home">
          <span className="brand-mark">EMR</span>
          <span>Execution Market Research</span>
        </a>
        <div className="nav-links">
          <a href="#research">Research</a>
          <a href="#questions">Questions</a>
          <a href="#experiment">Experiment</a>
          <Link href="/agent-9481/">Agent 9481</Link>
          <a className="nav-cta" href={githubUrl} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span className="pulse" /> Public research · v0.1</div>
        <h1>Make autonomous<br />execution legible.</h1>
        <p className="hero-copy">
          EMR studies how agents can act under delegated authority, produce verifiable
          evidence, and earn trust from measurable contribution—not self-claims.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={githubUrl} target="_blank" rel="noreferrer">
            Explore the research <Arrow />
          </a>
          <a className="button secondary" href="#experiment">View experiment 001</a>
        </div>
        <div className="thesis">
          <span>Core thesis</span>
          <p>Before execution becomes a market, it must become measurable, comparable, and accountable.</p>
        </div>
      </section>

      <section className="section shell" id="research">
        <div className="section-heading">
          <p className="kicker">Research program</p>
          <h2>From agent identity<br />to accountable action.</h2>
        </div>
        <div className="pillars">
          <article>
            <span className="index">01</span>
            <h3>Execution evidence</h3>
            <p>What task was assigned, what action occurred, and what evidence makes two executions comparable?</p>
          </article>
          <article>
            <span className="index">02</span>
            <h3>Authority & responsibility</h3>
            <p>Who allowed the action, which constraints applied, and who carries the consequences?</p>
          </article>
          <article>
            <span className="index">03</span>
            <h3>Contribution & markets</h3>
            <p>Did the agent improve the outcome relative to a baseline—and should the next task route to it?</p>
          </article>
        </div>
        <div className="artifact-grid" aria-label="Research artifacts">
          <a href={`${githubUrl}/blob/main/papers/paper-0.md`} target="_blank" rel="noreferrer">
            <span className="artifact-type">Paper 0</span>
            <h3>The economics of autonomous execution</h3>
            <p>Define the object of study and the gap between intelligence, authority, and accountable action.</p>
            <strong>Read working draft <Arrow /></strong>
          </a>
          <a href={`${githubUrl}/blob/main/specifications/execution-receipt-v0.1.md`} target="_blank" rel="noreferrer">
            <span className="artifact-type">Specification 001</span>
            <h3>Execution receipt v0.1</h3>
            <p>A minimum evidence structure connecting task, authority, action, outcome, and evaluation.</p>
            <strong>Inspect specification <Arrow /></strong>
          </a>
          <a href={`${githubUrl}/blob/main/research/experiments/001-task-backed-reputation.md`} target="_blank" rel="noreferrer">
            <span className="artifact-type">Experiment 001</span>
            <h3>Task-backed reputation</h3>
            <p>Test whether grounded contribution evidence improves future agent selection.</p>
            <strong>Review experiment <Arrow /></strong>
          </a>
          <a href={`${githubUrl}/blob/main/BACKLOG.md`} target="_blank" rel="noreferrer">
            <span className="artifact-type">Research backlog</span>
            <h3>Questions before solutions</h3>
            <p>The prioritized set of falsifiable questions guiding the EMR research program.</p>
            <strong>Explore backlog <Arrow /></strong>
          </a>
        </div>
      </section>

      <section className="section shell questions" id="questions">
        <div className="section-heading">
          <p className="kicker">Open questions</p>
          <div>
            <h2>What must be true?</h2>
            <p className="section-intro">EMR advances one bounded question at a time. Claims move into papers only after evidence, challenge, and review.</p>
          </div>
        </div>
        <ol className="question-list">
          <li><span>Q01</span><p>What minimum evidence makes two autonomous executions economically comparable?</p></li>
          <li><span>Q02</span><p>Does task-backed contribution history outperform aggregate reputation when selecting agents?</p></li>
          <li><span>Q03</span><p>Which execution evidence belongs on-chain, and which must remain private or off-chain?</p></li>
        </ol>
        <a className="button secondary question-cta" href={issueUrl} target="_blank" rel="noreferrer">
          Propose one research question <Arrow />
        </a>
      </section>

      <section className="section shell experiment" id="experiment">
        <div className="experiment-copy">
          <p className="kicker">Experiment 001</p>
          <h2>Task-backed reputation</h2>
          <p>
            Test whether evidence-backed contribution history selects the right financial research agent more reliably than aggregate ratings.
          </p>
          <a className="text-link" href={`${githubUrl}/blob/main/research/experiments/001-task-backed-reputation.md`} target="_blank" rel="noreferrer">
            Read the experiment design <Arrow />
          </a>
        </div>
        <ol className="flow" aria-label="Experiment flow">
          <li><span>01</span><strong>Task</strong><small>Freeze one market-data snapshot</small></li>
          <li><span>02</span><strong>Execute</strong><small>One active agent, two shadows</small></li>
          <li><span>03</span><strong>Evaluate</strong><small>Compare against a declared baseline</small></li>
          <li><span>04</span><strong>Route</strong><small>Measure future selection regret</small></li>
        </ol>
      </section>

      <section className="section shell agent" id="agent">
        <div>
          <p className="kicker">Live on Sepolia</p>
          <h2>EMR Research Agent <span>#9481</span></h2>
          <p>
            Our first ERC-8004 identity anchors the experiment to a public agent, owner, registry, and transaction history.
          </p>
          <div className="agent-links">
            <Link href="/agent-9481/">Open Agent 9481 Lab <Arrow /></Link>
            <a href={txUrl} target="_blank" rel="noreferrer">Registration transaction <Arrow /></a>
            <a href={registryUrl} target="_blank" rel="noreferrer">Identity registry <Arrow /></a>
          </div>
        </div>
        <dl className="identity-card">
          <div><dt>Network</dt><dd><span className="status-dot" /> Ethereum Sepolia</dd></div>
          <div><dt>Agent ID</dt><dd>9481</dd></div>
          <div><dt>Standard</dt><dd>ERC-8004</dd></div>
          <div><dt>Status</dt><dd>Identity registered</dd></div>
        </dl>
      </section>

      <section className="section shell paper">
        <div>
          <p className="kicker">Paper 0</p>
          <h2>The economics of autonomous execution</h2>
        </div>
        <div className="paper-copy">
          <p>
            AI is turning execution from an internal organizational capability into a programmable resource. EMR asks when it should be coordinated by hierarchy, workflow, platforms, or open markets.
          </p>
          <a className="text-link" href={`${githubUrl}/blob/main/papers/paper-0.md`} target="_blank" rel="noreferrer">
            Read the working draft <Arrow />
          </a>
        </div>
      </section>

      <section className="section shell source-of-truth">
        <div>
          <p className="kicker">Built in public</p>
          <h2>GitHub is the research ledger.</h2>
        </div>
        <div className="ledger-copy">
          <p>Ideas begin as issues. Evidence lives in versioned notes and experiments. Decisions are recorded. Stable findings graduate into papers.</p>
          <ul>
            <li><span>01</span> One question per issue</li>
            <li><span>02</span> Evidence before conclusion</li>
            <li><span>03</span> Versioned, reviewable artifacts</li>
            <li><span>04</span> Weekly synthesis into papers</li>
          </ul>
          <a className="text-link" href={`${githubUrl}/blob/main/GOVERNANCE.md`} target="_blank" rel="noreferrer">
            Read source-of-truth rules <Arrow />
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <div>
          <strong>Execution Market Research</strong>
          <p>Open questions. Reproducible evidence. Versioned conclusions.</p>
        </div>
        <div className="footer-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a href="https://eips.ethereum.org/EIPS/eip-8004" target="_blank" rel="noreferrer">ERC-8004 <Arrow /></a>
        </div>
      </footer>
    </main>
  );
}
