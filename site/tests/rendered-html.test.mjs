import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the EMR research site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Execution Market Research · EMR<\/title>/i);
  assert.match(html, /Make autonomous/);
  assert.match(html, /execution legible/);
  assert.match(html, /Experiment 001/);
  assert.match(html, /EMR Research Agent/);
  assert.match(html, /9481/);
  assert.match(html, /github\.com\/Domin-Focus\/execution-market-research/);
});

test("ships public identity and social-preview assets", async () => {
  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
    access(new URL("../public/agents/9481/agent-9481.json", import.meta.url)),
  ]);
});
