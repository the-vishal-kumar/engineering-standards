# Release readiness checklist

Use this before any release that changes production behaviour. A release is ready when every item is checked or marked N/A with a reason. The release owner signs off, not the person who wrote the most code.

Small, flag-guarded changes that ship through the normal pipeline do not need this list. They are covered by the [Definition of Done](definition-of-ready-and-done.md). Use the list for releases that bundle several changes, change a schema, touch auth or billing, or carry customer-visible risk.

## 1. Scope

- [ ] Release notes list every change, with links to PRs
- [ ] Each change has a named owner who is reachable during the rollout window
- [ ] Nothing in the release is "almost done". Unfinished work is behind a flag that is off

## 2. Quality

- [ ] CI quality gate is green on the release commit
- [ ] No open S1 or S2 bugs against the release (bug impact levels from the [bug report form](../.github/ISSUE_TEMPLATE/bug_report.yml); incident severities SEV1–SEV3 are defined in the [on-call runbook](runbooks/on-call.md))
- [ ] New code paths have tests for the success and the failure case
- [ ] Tested in staging with production-like data volume where performance matters

## 3. Data and compatibility

- [ ] Migrations are backward compatible: the previous app version runs against the new schema
- [ ] Long-running migrations tested for lock time on a production-sized copy
- [ ] API changes are additive, or consumers are named and have signed off
- [ ] Config and secrets exist in every target environment

## 4. Observability

- [ ] Dashboards show the new behaviour (traffic, errors, latency for new endpoints or jobs)
- [ ] Alerts exist for the failure modes we know about
- [ ] Logs carry a request or correlation ID and contain no secrets or personal data

## 5. Rollout and rollback

- [ ] Rollout plan written: big bang, canary, percentage flag, or per tenant
- [ ] Rollback steps written and tested. "Revert and redeploy" counts only if the migration allows it
- [ ] Rollback trigger agreed in advance (for example: error rate above 1% for 5 minutes, or p95 latency doubles)
- [ ] Release window avoids peak traffic and has on-call cover

## 6. Communication

- [ ] Support and customer-facing teams know what changes and when
- [ ] Runbooks updated for any new alert or operational task
- [ ] Status page or customer notice prepared if downtime or visible change is expected

## Sign-off

| Role | Name | Date |
|---|---|---|
| Release owner | | |
| On-call engineer for the window | | |
| Product owner (customer-visible changes) | | |
