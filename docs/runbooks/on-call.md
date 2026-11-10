# On-call runbook: [service name]

> Skeleton. Fill in every `[...]`. A runbook is done when an engineer who has never touched this service can follow it at 3 a.m. without asking anyone.

## Service at a glance

| | |
|---|---|
| What it does | [one sentence, in business terms] |
| Owning team | [team], escalation channel [#channel] |
| Dependencies | [databases, queues, third-party APIs] |
| Dependents | [who breaks if this breaks] |
| DR tier | [Tier 0–3, see [DR runbook](disaster-recovery.md)] |
| Dashboards | [links] |
| Logs | [link + saved query] |
| Deploy / rollback | [pipeline link, rollback command] |

## On-call basics

- **Rotation:** [weekly, handover day and time]. Primary and secondary.
- **Acknowledge** pages within [5] minutes. If you cannot, hand over explicitly.
- **Handover note** at the end of each shift: open incidents, noisy alerts, anything half-done.
- **You are not alone.** Escalate early. Waking someone up for a real incident is the correct call.

## Severity levels

| Level | Definition | Response |
|---|---|---|
| SEV1 | Outage or data loss for many users; security breach | Declare incident, page secondary and engineering lead, status page update within [15] minutes |
| SEV2 | Major feature degraded, workaround exists | Declare incident, fix or mitigate within working hours of the same day |
| SEV3 | Minor degradation, no customer-visible impact yet | Ticket, fix within the sprint |

## Incident roles (SEV1 and SEV2)

- **Incident commander:** owns decisions and the timeline. Does not debug.
- **Operations lead:** investigates and applies fixes.
- **Communications lead:** updates stakeholders and the status page every [30] minutes.

For a small team one person may hold two roles. Never all three.

## First five minutes

1. Acknowledge the page.
2. Check the dashboard: is it real, and how big is it?
3. Check recent changes: deploys, config, feature flags, dependency status pages.
4. If a recent change correlates, **roll it back first and investigate later.**
5. Declare an incident if SEV1/SEV2. Open the incident channel and write the first update.

## Alerts

One section per alert. Every alert that can page someone must have an entry here. If it has no entry, it should not page.

### [ALERT NAME]

- **What it means:** [plain language]
- **Likely causes:** [ranked by how often they happen]
- **Check:** [query, command or dashboard panel]
- **Mitigate:** [steps, safest first]
- **Escalate to:** [team or person] if not mitigated in [N] minutes

## Common tasks

- Restart a service: [command]
- Scale out: [command or console path]
- Drain a queue / replay a dead-letter queue: [command]
- Toggle a feature flag: [where]
- Rotate a leaked credential: [steps]

## After the incident

- Write a [postmortem](../postmortem-template.md) for every SEV1 and SEV2, within [3] working days.
- Fix or delete any alert that paged without needing action.
- Update this runbook with whatever you wished it had said.
