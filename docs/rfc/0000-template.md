# RFC-NNNN: [Title]

- **Author(s):**
- **Decider:** [one person who makes the call if reviewers disagree]
- **Required reviewers:** [one per affected team, plus one likely skeptic]
- **Status:** Draft | In review | Accepted | Rejected | Withdrawn
- **Review closes:** YYYY-MM-DD
- **Resulting ADR:** [link, once accepted]

## 1. Problem

What is wrong or missing, who it affects, and what it costs today. Use numbers: incidents, latency, hours spent, money, deals lost. If this section is weak, stop here.

## 2. Goals and non-goals

- **Goals:** what must be true when this is done, written so someone can check it.
- **Non-goals:** related problems this RFC deliberately does not solve.

## 3. Options

At least two, plus "do nothing". Describe each well enough that a reviewer could argue for it.

| Option | How it works | Cost (build + run) | Risk | Reversibility |
|---|---|---|---|---|
| A | | | | |
| B | | | | |
| Do nothing | | | | |

## 4. Proposal

The recommended option and why it beats the others. Include a diagram if the change crosses components.

## 5. Impact

- **Other teams and services:** who changes what, and by when.
- **Data and migrations:** schema changes, backfills, backward compatibility.
- **Security and privacy:** new data flows, access, secrets, personal data. See the [security baseline](../security-baseline.md).
- **Operations:** new alerts, on-call load, DR tier of any new component. See the [DR runbook](../runbooks/disaster-recovery.md).
- **Cost:** one-off and recurring, in money and engineer time.

## 6. Rollout and rollback

How it ships in small steps, how we know each step worked, and how we back out.

## 7. Open questions

What reviewers need to help answer. Remove this section once it is empty.

## Decision

Filled in by the decider: the outcome, the date, and the main reason. Then write the ADR.
