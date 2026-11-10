// PR cycle time: hours from "ready for review" to merge.
// Measured from ready-for-review, not from first commit, so drafts and local
// work do not count against the review process.

const HOUR_MS = 60 * 60 * 1000;

/**
 * @param {{ readyAt: string, mergedAt: string | null }} pr
 * @returns {number | null} hours, or null if the PR is not merged
 */
export function cycleTimeHours(pr) {
  if (!pr.mergedAt) return null;
  const start = Date.parse(pr.readyAt);
  const end = Date.parse(pr.mergedAt);
  if (Number.isNaN(start) || Number.isNaN(end)) {
    throw new TypeError("readyAt and mergedAt must be ISO-8601 timestamps");
  }
  if (end < start) throw new RangeError("mergedAt is before readyAt");
  return (end - start) / HOUR_MS;
}

/**
 * Nearest-rank percentile. Returns null for an empty list.
 * @param {number[]} values
 * @param {number} p between 0 and 100
 */
export function percentile(values, p) {
  if (p < 0 || p > 100) throw new RangeError("p must be between 0 and 100");
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = Math.max(1, Math.ceil((p / 100) * sorted.length));
  return sorted[rank - 1];
}

/**
 * Median and p90 cycle time for merged PRs. Report both: the median shows the
 * typical PR, the p90 shows the ones that stall.
 * @param {Array<{ readyAt: string, mergedAt: string | null }>} prs
 */
export function summarize(prs) {
  const hours = prs.map(cycleTimeHours).filter((h) => h !== null);
  return {
    merged: hours.length,
    medianHours: percentile(hours, 50),
    p90Hours: percentile(hours, 90),
  };
}
