import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../src/cli.js", import.meta.url));
const run = (input, args = []) =>
  spawnSync(process.execPath, [cli, ...args], { input, encoding: "utf8" });

test("cli prints merged count, median and p90 as JSON", () => {
  const prs = [
    { number: 1, createdAt: "2026-01-05T09:00:00Z", mergedAt: "2026-01-05T13:00:00Z" },
    { number: 2, createdAt: "2026-01-05T09:00:00Z", mergedAt: "2026-01-06T09:00:00Z" },
  ];
  const res = run(JSON.stringify(prs));
  assert.equal(res.status, 0, res.stderr);
  assert.deepEqual(JSON.parse(res.stdout), { merged: 2, medianHours: 4, p90Hours: 24 });
});

test("cli exits 1 with a clear message on invalid JSON", () => {
  const res = run("not json");
  assert.equal(res.status, 1);
  assert.match(res.stderr, /^error: /);
});

test("cli --help prints usage and exits 0", () => {
  const res = run("", ["--help"]);
  assert.equal(res.status, 0);
  assert.match(res.stdout, /usage: gh pr list/);
});

test("cli exits 2 with usage on empty input", () => {
  const res = run("");
  assert.equal(res.status, 2);
  assert.match(res.stderr, /no input on stdin/);
});
