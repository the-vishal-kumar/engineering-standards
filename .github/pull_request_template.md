## What and why

<!-- One or two sentences. What changes, and what problem it solves. Link the issue. -->

Closes #

## How to review

<!-- Where to start reading. What you want the reviewer to look at hardest. -->

## Risk and rollout

- [ ] Low risk: no schema, config, auth or public API change
- [ ] Behind a feature flag (name: `...`)
- [ ] Includes a migration. It is backward compatible with the currently deployed code
- [ ] Rollback plan: <!-- revert the PR / turn off the flag / other -->

## Checklist

- [ ] Tests cover the new behaviour and the failure path
- [ ] CI quality gate is green (lint, tests, coverage, audit, secret scan)
- [ ] Logs, metrics or alerts updated if this changes how we see the system in production
- [ ] Docs, runbook or ADR updated if this changes how the system works or is operated
- [ ] PR is small enough to review in under 30 minutes. If not, say why

## Screenshots or output

<!-- For UI or CLI changes. Delete if not relevant. -->
