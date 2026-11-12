#!/usr/bin/env node
// Reads `gh pr list --json number,createdAt,mergedAt` output on stdin and
// prints merged count, median and p90 cycle time in hours as one JSON line.
//
//   gh pr list --state merged --json number,createdAt,mergedAt | node src/cli.js

import { fromGhPrList, summarize } from "./cycle-time.js";

const USAGE = "usage: gh pr list --state merged --json number,createdAt,mergedAt | node src/cli.js";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}

if (process.stdin.isTTY) {
  console.error(USAGE);
  process.exit(2);
}

try {
  const input = await readStdin();
  if (input.trim() === "") {
    console.error(`error: no input on stdin\n${USAGE}`);
    process.exit(2);
  }
  const result = summarize(fromGhPrList(JSON.parse(input)));
  const round = (h) => (h === null ? null : Math.round(h * 10) / 10);
  console.log(
    JSON.stringify({
      merged: result.merged,
      medianHours: round(result.medianHours),
      p90Hours: round(result.p90Hours),
    }),
  );
} catch (err) {
  console.error(`error: ${err.message}`);
  process.exit(1);
}
