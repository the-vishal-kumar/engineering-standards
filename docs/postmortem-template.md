# Postmortem: [short title]

> Blameless by default. We describe what the system and the process allowed, not who made a mistake. People acted on the information they had at the time. If a person "should have known", the question is why the system did not tell them.

- **Incident ID:**
- **Severity:** SEV1 | SEV2 | SEV3
- **Date:** YYYY-MM-DD
- **Duration:** detection to resolution, in minutes
- **Author:**
- **Status:** Draft | In review | Final

## Summary

Three sentences: what broke, who was affected and for how long, and how it was fixed.

## Impact

- Users or tenants affected (count or percentage):
- Requests failed or degraded:
- Data lost or corrupted (yes/no, scope):
- SLO budget consumed:
- Revenue, contractual or compliance impact:

## Timeline (all times UTC)

| Time | Event |
|---|---|
| HH:MM | Change deployed / trigger occurred |
| HH:MM | First alert fired (or first customer report) |
| HH:MM | On-call acknowledged |
| HH:MM | Incident declared, roles assigned |
| HH:MM | Mitigation applied |
| HH:MM | Recovery confirmed |

**Time to detect:** ... **Time to mitigate:** ... **Time to resolve:** ...

## Root cause and contributing factors

Describe the chain of causes. Most incidents have several. Ask "why" until you reach something the team can change: a missing check, an unclear runbook, a gap in tests or monitoring.

## Detection

How did we find out? If a customer told us first, why did our alerts not?

## Response

What went well. What slowed us down: access, unclear ownership, missing dashboards, noisy alerts.

## Action items

Each item has an owner and a due date, and is tracked in the issue tracker. Prefer items that prevent a class of failure over items that fix only this instance.

| Action | Type | Owner | Due | Issue |
|---|---|---|---|---|
| | Prevent | | | |
| | Detect | | | |
| | Mitigate | | | |
| | Process | | | |

## Lessons

What would we tell another team so they avoid this?

---

**Review:** the postmortem is reviewed within 5 working days of the incident, in a meeting open to anyone. Action items are checked at the next review until closed.
