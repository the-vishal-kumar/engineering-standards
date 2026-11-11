# ADR-0001: Enforce quality checks through one reusable CI workflow

- **Status:** Accepted
- **Date:** 2026-11-10
- **Deciders:** engineering leads
- **Consulted:** service teams, platform team

> Example ADR. The context describes a common situation in a growing engineering org, not a specific company. Replace it with your own.

## Context

Each repository had its own CI file. They drifted. Some ran lint, some ran tests without coverage, few ran a dependency audit and none scanned for secrets. Reviewers spent their time on style and missing tests instead of design and risk, which made reviews slow and uneven.

We want every repository to enforce the same minimum bar, and we want to raise that bar in one place.

## Decision

We will maintain one reusable GitHub Actions workflow (`.github/workflows/quality-gate.yml`) that runs lint, tests, a coverage threshold, a dependency audit and a secret scan. Repositories call it with their own commands. Branch protection requires it to pass before merge.

## Options considered

| Option | Pros | Cons |
|---|---|---|
| Reusable workflow (chosen) | One place to change; language-agnostic via inputs; versioned by tag | Callers cannot inject custom steps between gates |
| Copy a template CI file into each repo | Full flexibility per repo | Drifts within months; no central upgrade path |
| Composite action | Can be mixed with custom steps | Callers still own job layout, so the gate order and the secret scan are optional in practice |
| Third-party CI quality platform | Rich dashboards | Cost, vendor lock-in, code leaves our CI boundary |

### Why not a copied template

We already had that, and it is what drifted. Without a central definition, raising the coverage threshold or adding a scanner means a PR to every repository.

## Consequences

- Raising the bar is one PR here plus a tag bump in callers.
- Callers pin a major version (`@v1`). Breaking changes need a new major tag and a migration note.
- Repositories with unusual toolchains may need a new input. That is a deliberate cost: it forces the conversation about whether the exception is needed.
- The coverage threshold is a floor, not a target. We review it each quarter and do not raise it for its own sake.

## Conditions of the decision

- The workflow is released as tag `v1`, and callers reference that tag.
- `quality-gate` is a required status check in branch protection. Without that, the gate is advice.
- PR cycle time and defect leakage (see [metrics](../metrics.md)) are measured before callers switch over, so there is a baseline to compare against.
