# Tech debt register

Tech debt is any part of the system that makes future work slower, riskier or more expensive than it needs to be. The register makes it visible and comparable, so it competes for capacity with features on evidence instead of on who complains loudest.

Keep the register as a table in the repository, a spreadsheet, or issues with a `tech-debt` label and the fields below. The format matters less than reviewing it on a schedule.

## What goes in it

Include debt that has a **cost you can describe**: incidents, slower delivery, toil, security exposure, blocked features, or money. Leave out code you simply dislike. "This module is ugly" is not an entry; "every change to invoicing takes 2–3 extra days because of the duplicated tax logic" is.

## Fields

| Field | What to write |
|---|---|
| ID | `TD-NNN`, never reused |
| Title | Short and specific: "Tax logic duplicated in 3 services" |
| Area / owner | The team that would do the work |
| Type | Code, architecture, infrastructure, dependency, test, documentation, security |
| Interest | What it costs today, with evidence: "4 of the last 10 invoicing PRs needed a follow-up fix" |
| Impact (1–5) | How much it hurts when it bites |
| Frequency (1–5) | How often it bites: 5 = every week, 1 = once a year or less |
| Effort (S/M/L/XL) | S ≤ 2 days, M ≤ 2 weeks, L ≤ 1 quarter for one team, XL needs an RFC |
| Score | `Impact × Frequency ÷ effort weight` (S = 1, M = 2, L = 4, XL = 8) |
| Trigger | A date or event that forces action: end of support, a contract, a growth threshold |
| Status | Open, scheduled, in progress, paid down, accepted (we choose to live with it, with a reason) |

The score is a sorting aid, not an answer. A low-scoring item with a hard trigger, such as a runtime reaching end of life, still goes first.

## Template

| ID | Title | Owner | Type | Interest (evidence) | Impact | Freq. | Effort | Score | Trigger | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| TD-001 | | | | | | | | | | Open |

## Worked example (fictional)

| ID | Title | Owner | Type | Interest (evidence) | Impact | Freq. | Effort | Score | Trigger | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| TD-004 | Reporting queries run on the primary database | Platform | Architecture | p95 API latency 850 ms at month-end vs 240 ms other days | 5 | 3 | M | 7.5 | Next enterprise customer onboarding | Scheduled |
| TD-007 | Node 18 in two services | Payments | Dependency | Out of upstream support; security patches stop | 4 | 2 | S | 8 | End of life date passed | In progress |
| TD-011 | No integration tests for ERP sync | Integrations | Test | 3 of the last 5 sync incidents reached customers before detection | 4 | 3 | M | 6 | None | Open |
| TD-015 | Hand-built staging environment | Platform | Infrastructure | Rebuild takes 2 days; drifts from production | 3 | 2 | L | 1.5 | DR test needs IaC | Accepted until DR work starts |

## How to run it

- **Anyone can add an entry.** The owning team's lead triages new entries weekly: merge duplicates, fill in evidence, or close entries without a cost.
- **Review monthly** with the engineering manager and product manager for the area. Re-score, move the top items into planning, and close what is paid down.
- **Reserve capacity.** A fixed share of each team's capacity, commonly 15–25%, goes to the top of the register. A fixed share avoids a quarterly negotiation and keeps debt from waiting for a crisis. Adjust it from evidence: if incidents and cycle time are rising, raise it.
- **Pay down next to features.** The cheapest time to fix debt is while working in the same code. Tie entries to the feature work that touches them.
- **Report the trend, not the list.** For leadership, show the count of open high-score items, the capacity spent, and the delivery or incident metric each paid-down item was meant to move. See [metrics](metrics.md).
- **"Accepted" is a valid status.** Some debt is cheaper to live with. Write down why, and the trigger that would change the answer.
