# engineering-standards

[![ci](https://github.com/the-vishal-kumar/engineering-standards/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/the-vishal-kumar/engineering-standards/actions/workflows/ci.yml)
[![docs](https://github.com/the-vishal-kumar/engineering-standards/actions/workflows/docs.yml/badge.svg?branch=main)](https://github.com/the-vishal-kumar/engineering-standards/actions/workflows/docs.yml)

A starter kit of engineering standards for a product engineering organisation: a reusable CI quality gate, PR and issue templates, and the documents teams need to decide, ship, operate, recover and hire consistently.

**Problem:** as an engineering organisation grows past a few teams, every team invents its own review rules, CI checks, incident process and interview loop. Quality becomes uneven, delivery is hard to compare, and a new leader has nothing to build on.

**Who it's for:** engineering managers, directors and heads of engineering who want one consistent bar across several teams or repositories, without buying a platform or writing it all from scratch.

**What you get:** templates and checklists you can copy as they are, a CI workflow any repository can call, and metric definitions with a working script to compute them. Every piece works on its own. Use the repository as a GitHub template, or copy the parts you need.

## Start here

| If you are... | Read first |
|---|---|
| An engineering manager setting up a team | [Week 1](#week-1-adoption), [code review guide](docs/code-review-guide.md), [Definition of Ready and Done](docs/definition-of-ready-and-done.md) |
| A director or head of engineering aligning several teams | [Metrics](docs/metrics.md), [quality gate](#using-the-quality-gate), [RFC and ADR process](docs/rfc/README.md), [tech debt register](docs/tech-debt-register.md) |
| Responsible for reliability or security | [On-call runbook](docs/runbooks/on-call.md), [DR runbook](docs/runbooks/disaster-recovery.md), [security baseline](docs/security-baseline.md) |
| Hiring | [Hiring loop and scorecard](docs/hiring.md) |

## What's in it

### Deliver

| Document | What it is |
|---|---|
| [Definition of Ready and Done](docs/definition-of-ready-and-done.md) | Entry and exit criteria for sprint work |
| [Code review guide](docs/code-review-guide.md) | Review service levels, what to look for, comment labels |
| [PR template](.github/pull_request_template.md) | PR template focused on risk, rollout and how to review |
| [Issue forms](.github/ISSUE_TEMPLATE) | Bug report form (with the field that feeds defect leakage) and feature request form |
| [CODEOWNERS](.github/CODEOWNERS) | Commented example of team-based ownership |
| [Release readiness checklist](docs/release-readiness-checklist.md) | Go/no-go list for higher-risk releases |

### Automate

| Document | What it is |
|---|---|
| [Quality gate workflow](.github/workflows/quality-gate.yml) | Reusable CI workflow: lint, test, coverage threshold, dependency audit, secret scan (gitleaks). Language-agnostic |
| [Example CI caller](.github/workflows/ci.yml) | Example caller that runs the gate on the Node example, plus actionlint |
| [Dependabot config](.github/dependabot.yml) | Weekly updates for Actions and npm dependencies |
| [Node example](examples/node-service) | Node 22 project the gate runs against, including a CLI that computes PR cycle time from `gh` output |

### Operate and recover

| Document | What it is |
|---|---|
| [On-call runbook](docs/runbooks/on-call.md) | On-call runbook skeleton: severities, roles, first five minutes, per-alert entries |
| [Postmortem template](docs/postmortem-template.md) | Blameless incident postmortem |
| [DR runbook](docs/runbooks/disaster-recovery.md) | DR outline with RPO/RTO tiers, recovery procedure structure and test log |
| [Security baseline](docs/security-baseline.md) | Minimum security controls, the evidence for each, and rough SOC 2 / ISO 27001 pointers |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting policy, usable as a template |

### Decide, measure and grow

| Document | What it is |
|---|---|
| [RFC and ADR process](docs/rfc/README.md) | When to write an RFC or an ADR, the review process, and an RFC template |
| [ADR template and example](docs/adr) | ADR template and one example ADR |
| [Metrics](docs/metrics.md) | DORA and team metrics: definitions, how to measure each, measurement rules |
| [Tech debt register](docs/tech-debt-register.md) | Register fields, scoring, a worked example and the review routine |
| [Hiring loop and scorecard](docs/hiring.md) | Structured interview loop, competencies, scorecard, debrief rules and funnel metrics |

## Week 1 adoption

The goal of the first week is a baseline and one pilot team, not a rollout. Each step takes an hour or two.

1. **Day 1: measure.** For your two or three busiest repositories, run the [PR cycle time CLI](docs/metrics.md#example-pr-cycle-time-from-the-github-cli) for the last 30 days. Count production deploys and incidents for the same period. Write the numbers down with the date. This is your baseline.
2. **Day 2: templates on a pilot repository.** Copy the PR template, issue forms and CODEOWNERS into one repository whose team volunteered.
3. **Day 3: quality gate in warn mode.** Call [`quality-gate.yml`](#using-the-quality-gate) from the pilot repository with its own commands. Do not make it a required check yet. Note what fails and why.
4. **Day 4: agree how to review.** In 30 minutes with the pilot team, agree the first-response time and comment labels from the [code review guide](docs/code-review-guide.md), and the [Definition of Ready and Done](docs/definition-of-ready-and-done.md). Change them where the team disagrees; agreement matters more than the exact wording.
5. **Day 5: find the operational gaps.** List the systems the pilot team owns and give each a [DR tier](docs/runbooks/disaster-recovery.md#tiers). List every alert that can page someone and check it has a [runbook entry](docs/runbooks/on-call.md#alerts). Each gap becomes an entry in the [tech debt register](docs/tech-debt-register.md).

**End of week 1:** a dated baseline, one team using the templates, the gate running in warn mode, and a short, evidence-based list of gaps.

## After week 1

Each step should show a result before the next one starts.

1. **Fix the gate's noise (weeks 2 to 4).** Flaky tests, a lint config nobody agrees with, a coverage threshold set too high. Keep measuring.
2. **Make the gate required.** Turn on branch protection on the pilot repository. Add the secret scan and dependency audit if they were off. Then offer the gate to the next team.
3. **Release readiness, postmortems and on-call.** Introduce them with the next real release or incident, not as a documentation project.
4. **Decisions.** Use the [RFC process](docs/rfc/README.md) for the next change that crosses team boundaries.
5. **DR.** Run one restore test for the most critical system. The first test usually finds the biggest gap.
6. **Review the metrics after 6 to 8 weeks** against the week 1 baseline, speed and quality side by side.

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
    uses: the-vishal-kumar/engineering-standards/.github/workflows/quality-gate.yml@v1
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

Pin to a release tag (`@v1`) or a commit SHA, never `@main`. Then add `quality-gate` as a required status check in branch protection. Without that, the gate is advice. A repository can only call a reusable workflow from a private repository if the owner allows it under **Settings → Actions → General → Access**; a public copy of this repository needs no setting.

## Metrics to track

| Metric | What it tells you |
|---|---|
| Deployment frequency (DORA) | Batch size: smaller, more frequent releases are safer |
| Lead time for changes (DORA) | How long a committed change takes to reach users |
| Change failure rate (DORA) | Whether speed is costing quality |
| Failed deployment recovery time (DORA) | How quickly the team detects and recovers from a bad deploy |
| PR cycle time and time to first review | Whether review is a bottleneck |
| Defect leakage | Whether testing and release criteria catch bugs before customers do |
| Sprint predictability | Whether planning and ready-criteria work |

Read speed and quality metrics together. Faster merges that cause more incidents are not progress. Definitions, data sources, the fifth DORA metric (deployment rework rate) and measurement rules are in [`docs/metrics.md`](docs/metrics.md).

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

Every check runs in Docker with a pinned image, locally and in CI:

| Check | Command |
|---|---|
| Markdown lint, link check (including `#fragments`), mermaid render | `scripts/check-docs.sh` (or one of `lint-md`, `links`, `mermaid`) |
| Workflow syntax | `docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:1.7.7 -color` |
| Node example: lint, 11 tests, coverage | `docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -v "$PWD/examples/node-service:/src" -w /src node:22 sh -c "npm ci && npm run lint && npm test"` |

## License

[MIT](LICENSE) © 2026 Vishal Kumar
