import { test } from "node:test";
import assert from "node:assert/strict";
import { cycleTimeHours, percentile, summarize } from "../src/cycle-time.js";

test("cycleTimeHours returns hours between ready and merge", () => {
  const pr = { readyAt: "2026-01-05T09:00:00Z", mergedAt: "2026-01-06T15:00:00Z" };
  assert.equal(cycleTimeHours(pr), 30);
});

test("cycleTimeHours returns null for unmerged PRs", () => {
  assert.equal(cycleTimeHours({ readyAt: "2026-01-05T09:00:00Z", mergedAt: null }), null);
});

test("cycleTimeHours rejects bad input", () => {
  assert.throws(() => cycleTimeHours({ readyAt: "nope", mergedAt: "2026-01-05T09:00:00Z" }), TypeError);
  assert.throws(
    () => cycleTimeHours({ readyAt: "2026-01-06T09:00:00Z", mergedAt: "2026-01-05T09:00:00Z" }),
    RangeError,
  );
});

test("percentile uses nearest rank", () => {
  const values = [5, 1, 4, 2, 3, 10, 9, 8, 7, 6];
  assert.equal(percentile(values, 50), 5);
  assert.equal(percentile(values, 90), 9);
  assert.equal(percentile(values, 0), 1);
  assert.equal(percentile([], 50), null);
  assert.throws(() => percentile(values, 101), RangeError);
});

test("summarize ignores unmerged PRs", () => {
  const prs = [
    { readyAt: "2026-01-05T09:00:00Z", mergedAt: "2026-01-05T13:00:00Z" },
    { readyAt: "2026-01-05T09:00:00Z", mergedAt: "2026-01-06T09:00:00Z" },
    { readyAt: "2026-01-05T09:00:00Z", mergedAt: null },
  ];
  assert.deepEqual(summarize(prs), { merged: 2, medianHours: 4, p90Hours: 24 });
});
