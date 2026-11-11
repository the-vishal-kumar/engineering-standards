# Delivery metrics: definitions and how to measure them

Track a few metrics, define them precisely, and measure them the same way every time. Look at trends over 4–8 weeks, not single weeks. Use them to find bottlenecks in the system, never to rank individuals: the moment a metric is used for performance reviews, people optimise the metric instead of the work.

## The metrics

| Metric | Definition | Source | Report as |
|---|---|---|---|
| **Deployment frequency** (DORA) | Production deploys per day or week, per service | Deploy pipeline | Count, weekly |
| **Lead time for changes** (DORA) | Time from a commit to that commit running in production | Git + deploy pipeline events | Median and p90, weekly |
| **Change failure rate** (DORA) | Share of production deploys that cause an incident, rollback or hotfix | Deploy log joined to incident log | Percentage, monthly |
| **Failed deployment recovery time** (DORA, formerly MTTR) | Time from a failed deploy being detected to service restored | Incident tracker | Median and p90, monthly |
| **Deployment rework rate** (DORA) | Share of deploys that were unplanned and happened because of a production incident | Deploy log, with a "hotfix" or "incident" label | Percentage, monthly |
| **PR cycle time** | Time from PR marked ready for review to merged | Code host API (GitHub `ready_for_review` and `merged_at`) | Median and p90, weekly |
| **Time to first review** | Time from ready for review to first review event | Code host API | Median, weekly |
| **Defect leakage** | Bugs found in production ÷ all bugs found for the same releases | Issue tracker, "found in production" field on bug reports | Percentage, per release or monthly |
| **Sprint predictability** | Committed work completed ÷ committed work, at sprint end | Sprint tool; count only work committed at planning | Percentage, per sprint, rolling average of 3 |

The first five are the [DORA](https://dora.dev/guides/dora-metrics/) software delivery metrics. DORA started with four keys (with MTTR) and now uses five. It groups them as **throughput** (lead time, deployment frequency, failed deployment recovery time) and **instability** (change failure rate, deployment rework rate). Its research finds that speed and stability are not a trade-off: most teams that do well on one group do well on the other. A team that improves throughput by adding instability has not improved.

PR cycle time and time to first review are split out of lead time because review wait is usually the largest part of it and the easiest to change. Defect leakage and sprint predictability are not DORA metrics. They measure whether testing and planning work.

## How to measure the DORA metrics

You need two event streams with timestamps: **deploys** (service, commit SHA, time, success or failure) and **incidents** (start, detected, resolved, and the deploy that caused it, if any). Most teams have the first in their pipeline and the second in an incident tool or a spreadsheet. Joining them is the work.

| Metric | Calculation | Minimum data you need |
|---|---|---|
| Deployment frequency | Count of successful production deploys in the period, per service | One log line per deploy: service, SHA, timestamp |
| Lead time for changes | For each deployed SHA, `deploy_time − commit_time` for every commit it includes for the first time. Report the median and p90 | Deploy SHAs plus `git log` between consecutive deploys |
| Change failure rate | Deploys linked to an incident, rollback or hotfix ÷ all deploys | A "caused by deploy" field on incidents, and a rollback or hotfix label on deploys |
| Failed deployment recovery time | `restored_time − detected_time` for each incident caused by a deploy | Incident start, detection and resolution times |
| Deployment rework rate | Unplanned deploys made to fix a production incident ÷ all deploys | A label on deploys made in response to an incident |

Practical notes:

- **Start with the pipeline you have.** On GitHub Actions, a workflow that deploys to production can record each run in a GitHub [deployment](https://docs.github.com/en/rest/deployments/deployments), so the deploy log is an API call away.
- **Count hotfixes honestly.** A deploy whose purpose is to fix the previous deploy counts as a failure of the previous one, and as rework.
- **Agree on "restored".** Restored means users are served normally again, often through a rollback. The root-cause fix can come later.
- **Compare to yourself first.** DORA publishes benchmark groups each year in its [research](https://dora.dev/research/). They are useful for context, but your own trend is the number to manage.

## Measurement rules

- **Baseline first.** Measure for at least 4–6 weeks before changing the process. Without a baseline, any improvement claim is a guess.
- **Freeze the definition.** If you change how a metric is counted (for example, excluding draft PRs), restate the baseline with the new definition.
- **Exclude noise explicitly** and write down what you excluded: bot PRs (dependency updates), reverts, PRs open for more than 30 days.
- **Use medians and p90,** not averages. One PR that sat for three weeks hides the typical case in a mean.
- **Pair speed with quality.** Report PR cycle time next to change failure rate and defect leakage. Faster reviews that ship more bugs are not an improvement.
- **Attribute carefully.** Several changes usually land at once. Say what changed and when, and resist claiming a single cause.

## Example: PR cycle time from the GitHub CLI

The [Node example](../examples/node-service) includes a small CLI that reads `gh pr list` JSON on stdin and prints the median and p90:

```sh
# Merged PRs since a date, without Dependabot, piped into the summary CLI.
gh pr list --state merged --limit 500 \
  --search "merged:>=2026-10-01 -author:app/dependabot" \
  --json number,createdAt,mergedAt \
  | node examples/node-service/src/cli.js
# {"merged":42,"medianHours":6.5,"p90Hours":51.2}
```

The output line shows the format; your numbers will differ. `createdAt` approximates "ready for review" when the team does not use draft PRs. If it does, read the `ready_for_review` event from the [timeline API](https://docs.github.com/en/rest/issues/timeline) and pass it as `readyAt`; the CLI uses `readyAt` when present and falls back to `createdAt`.

## Example: defect leakage

Add a required "found in production?" field to bug reports (the [bug template](../.github/ISSUE_TEMPLATE/bug_report.yml) does this). Then, per month:

```text
defect leakage = bugs found in production / (bugs found in production + bugs found before release)
```

Count by the release that introduced the bug where you can, otherwise by the month it was reported. Be consistent.
