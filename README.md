# engineering-standards

A starter kit of delivery standards for a product engineering team: PR and issue templates, a reusable CI quality gate, and the documents a team needs to ship safely and recover when it doesn't.

Use it as a GitHub template repository, or copy the parts you need. Every piece works on its own.

**Who it's for:** engineering leads and managers who want a consistent quality bar across several teams or repositories, without buying a platform or writing it all from scratch.

## What's in it

| Path | What it is |
|---|---|
| [`.github/workflows/quality-gate.yml`](.github/workflows/quality-gate.yml) | Reusable CI workflow: lint, test, coverage threshold, dependency audit, secret scan (gitleaks). Language-agnostic |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Example caller that runs the gate on a Node.js project |
| [`examples/node-service/`](examples/node-service) | Minimal Node 22 project the example runs against (ESLint, `node:test`, LCOV coverage) |
| [`.github/pull_request_template.md`](.github/pull_request_template.md) | PR template focused on risk, rollout and how to review |
| [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE) | Bug report and feature request forms |
| [`.github/CODEOWNERS`](.github/CODEOWNERS) | Commented example of team-based ownership |
| [`.github/dependabot.yml`](.github/dependabot.yml) | Weekly updates for Actions and npm dependencies |
| [`docs/definition-of-ready-and-done.md`](docs/definition-of-ready-and-done.md) | Entry and exit criteria for sprint work |
| [`docs/code-review-guide.md`](docs/code-review-guide.md) | Review service levels, what to look for, comment labels |
| [`docs/release-readiness-checklist.md`](docs/release-readiness-checklist.md) | Go/no-go list for higher-risk releases |
| [`docs/adr/`](docs/adr) | ADR template and one example ADR |
| [`docs/postmortem-template.md`](docs/postmortem-template.md) | Blameless incident postmortem |
| [`docs/runbooks/on-call.md`](docs/runbooks/on-call.md) | On-call runbook skeleton: severities, roles, first five minutes, per-alert entries |
| [`docs/runbooks/disaster-recovery.md`](docs/runbooks/disaster-recovery.md) | DR outline with RPO/RTO tiers, recovery procedure structure and test log |
| [`docs/metrics.md`](docs/metrics.md) | Metric definitions and how to measure them |

## Why each gate exists

The gate runs before a human reviews the PR. Its job is to take mechanical checks off reviewers so they spend their time on design and risk.

| Gate | Why |
|---|---|
| **Lint and format** | Style comments are the most common and least valuable review comments. A tool settles them in seconds and nobody argues with it. |
| **Tests** | A reviewer cannot run every path in their head. Tests prove the change works and keep working when someone else edits the code later. |
| **Coverage threshold** | A floor, not a target. It catches PRs that add logic with no tests at all. Set it near your current level and raise it slowly. 100% is not the goal. |
| **Dependency audit** | Most code in a service is third-party. Known-vulnerable packages are cheap to catch at PR time and expensive to find in an audit or a breach. |
| **Secret scan** | A key pushed to Git is compromised, even if the commit is reverted. Scanning the full history on every PR catches it before merge, while rotating it is still cheap. |

Once the gate is a required check, a step that fails or errors blocks the merge. The workflow runs all checks in one job so a project installs dependencies once. The secret scan runs in parallel because it needs no toolchain.

## Using the quality gate

From any repository, call the workflow and pass your own commands:

```yaml
jobs:
  quality-gate:
    uses: the-vishal-kumar/engineering-standards/.github/workflows/quality-gate.yml@main
    with:
      python-version: "3.12"
      install-command: pip install -r requirements.txt -r requirements-dev.txt
      lint-command: ruff check . && ruff format --check .
      test-command: pytest --cov --cov-report=xml
      coverage-file: coverage.xml
      coverage-threshold: 75
      audit-command: pip-audit -r requirements.txt
```

Inputs: `working-directory`, `node-version` / `python-version` / `go-version` (each optional), `install-command`, `lint-command`, `test-command`, `coverage-file` (LCOV or Cobertura XML), `coverage-threshold`, `audit-command`, `secret-scan`. Empty inputs skip that step. See [`ci.yml`](.github/workflows/ci.yml) for the Node example.

Pin to a tag or a commit SHA rather than `@main` once you depend on it. Then add `quality-gate` as a required status check in branch protection. Without that, the gate is advice.

## Adopting it incrementally

Don't roll all of this out at once. Each step should show a result before the next one starts.

1. **Measure first (weeks 1–4).** Start tracking PR cycle time, change failure rate and defect leakage as defined in [`docs/metrics.md`](docs/metrics.md). You need a baseline to know whether anything below helps.
2. **PR template and review guide.** Cheapest change, fastest effect. Agree on a first-response time for reviews.
3. **Quality gate in warn mode.** Run it on every PR but do not make it required. Fix the noise: flaky tests, a lint config nobody agrees with, a coverage threshold set too high.
4. **Make the gate required.** Turn on branch protection. Add the secret scan and dependency audit if they were off.
5. **Definition of Ready and Done.** Use them in planning and review. Expect the first two sprints to commit to less work. That is the point.
6. **Release readiness, postmortems, on-call runbook.** Introduce them with the next real release or incident, not as a documentation project.
7. **DR tiers.** Classify systems, then run one restore test for the most critical one. The first test usually finds the biggest gap.

## Metrics to track

| Metric | What it tells you |
|---|---|
| Lead time for changes | How long an idea takes to reach users once code starts |
| PR cycle time (and time to first review) | Whether review is a bottleneck |
| Deployment frequency | Batch size: smaller, more frequent releases are safer |
| Change failure rate | Whether speed is costing quality |
| MTTR | How quickly the team detects and recovers |
| Defect leakage | Whether testing and release criteria catch bugs before customers do |
| Sprint predictability | Whether planning and ready-criteria work |

Read speed and quality metrics together. Faster merges that cause more incidents are not progress. Definitions, data sources and measurement rules are in [`docs/metrics.md`](docs/metrics.md).

## Results in my current role

I lead a 20-engineer organization. These outcomes are from my resume. They came from practices like the ones in this repository, alongside other changes, so I don't attribute them to any single file here.

| Outcome | Practices behind it | In this repo |
|---|---|---|
| PR cycle time from ~3 days to 1 day | Automated CI quality gates, static analysis, AI-assisted code review | `quality-gate.yml`, `code-review-guide.md` |
| Production defect leakage down 35% | Automated testing standards, release-readiness criteria | Coverage gate, `release-readiness-checklist.md`, Definition of Done |
| Sprint delivery predictability from 60% to 85% | Engineering-led requirement validation, structured backlog refinement | `definition-of-ready-and-done.md`, feature request form |
| Organization-wide release governance and observability standards | Shared release and operational standards | Release checklist, on-call runbook, postmortem template |
| Disaster recovery strategy | Tiered recovery targets and tested restores | `runbooks/disaster-recovery.md` |

This repository contains no employer code, data or internal documents. It is a clean-room version of the patterns, written from scratch. If you want to measure the same things in your team, [`docs/metrics.md`](docs/metrics.md) describes a sound way to do it: baseline first, fixed definitions, medians and p90, and speed always read next to quality.

## Validation

- Workflows are checked with [actionlint](https://github.com/rhysd/actionlint): `docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:latest -color`
- The Node example passes `npm ci && npm run lint && npm test` on Node 22.

## License

[MIT](LICENSE) © 2026 Vishal Kumar
