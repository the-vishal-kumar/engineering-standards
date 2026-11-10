# Delivery metrics: definitions and how to measure them

Track a few metrics, define them precisely, and measure them the same way every time. Look at trends over 4–8 weeks, not single weeks. Use them to find bottlenecks in the system, never to rank individuals: the moment a metric is used for performance reviews, people optimise the metric instead of the work.

## The metrics

| Metric | Definition | Source | Report as |
|---|---|---|---|
| **Lead time for changes** | Time from first commit on a branch to that commit running in production | Git + deploy pipeline events | Median and p90, weekly |
| **PR cycle time** | Time from PR marked ready for review to merged | Code host API (GitHub `ready_for_review` and `merged_at`) | Median and p90, weekly |
| **Time to first review** | Time from ready for review to first review event | Code host API | Median, weekly |
| **Deployment frequency** | Production deploys per day or week, per service | Deploy pipeline | Count, weekly |
| **Change failure rate** | Share of production deploys that cause an incident, rollback or hotfix | Deploy log joined to incident log | Percentage, monthly |
| **MTTR** | Mean time from incident start (or detection) to recovery | Incident tracker | Mean and median, monthly |
| **Defect leakage** | Bugs found in production ÷ all bugs found for the same releases | Issue tracker, "found in production" field on bug reports | Percentage, per release or monthly |
| **Sprint predictability** | Committed work completed ÷ committed work, at sprint end | Sprint tool; count only work committed at planning | Percentage, per sprint, rolling average of 3 |

The first four plus MTTR are the DORA metrics, with PR cycle time split out because it is usually the easiest to move.

## Measurement rules

- **Baseline first.** Measure for at least 4–6 weeks before changing the process. Without a baseline, any improvement claim is a guess.
- **Freeze the definition.** If you change how a metric is counted (for example, excluding draft PRs), restate the baseline with the new definition.
- **Exclude noise explicitly** and write down what you excluded: bot PRs (dependency updates), reverts, PRs open for more than 30 days.
- **Use medians and p90,** not averages. One PR that sat for three weeks hides the typical case in a mean.
- **Pair speed with quality.** Report PR cycle time next to change failure rate and defect leakage. Faster reviews that ship more bugs are not an improvement.
- **Attribute carefully.** Several changes usually land at once. Say what changed and when, and resist claiming a single cause.

## Example: PR cycle time from the GitHub CLI

```sh
# Merged PRs in the last 30 days with ready and merge timestamps.
gh pr list --state merged --limit 500 \
  --search "merged:>=$(date -d '30 days ago' +%F) -author:app/dependabot" \
  --json number,createdAt,mergedAt,isDraft
```

`createdAt` approximates "ready for review" when the team does not use draft PRs. If it does, read the `ready_for_review` event from the timeline API. The [Node example](../examples/node-service/src/cycle-time.js) computes median and p90 from this data.

## Example: defect leakage

Add a required "found in production?" field to bug reports (the [bug template](../.github/ISSUE_TEMPLATE/bug_report.yml) does this). Then, per month:

```
defect leakage = bugs found in production / (bugs found in production + bugs found before release)
```

Count by the release that introduced the bug where you can, otherwise by the month it was reported. Be consistent.
