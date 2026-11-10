# Code review guide

Review exists to catch design and risk problems early and to spread knowledge. It is not a gate for style: the [CI quality gate](../.github/workflows/quality-gate.yml) handles formatting, lint, tests, coverage, vulnerable dependencies and secrets before a human looks.

## Service levels

- **First response within 4 working hours.** A first response is a review, a question, or "I'll look at this by [time]".
- **Small PRs get priority.** Under ~400 changed lines is the norm. Larger PRs need a reason in the description.
- **Two rounds, then talk.** If a thread goes back and forth twice, move to a call and write the outcome in the PR.

Slow first response is usually the largest share of PR cycle time. Waiting costs more than reviewing.

## For the author

- Write the PR description for someone who has not seen the ticket: what, why, how to review, risk.
- Review your own diff first. Remove debug code and unrelated changes.
- Split refactors from behaviour changes. A reviewer cannot judge both at once.
- Respond to every comment, even with "done".

## For the reviewer

Look at these, in this order:

1. **Correctness.** Does it do what the description says? What happens on bad input, timeouts, retries, concurrent calls?
2. **Design.** Is this the right place for the change? Does it add coupling we will regret? Is there a simpler way?
3. **Risk.** Migrations, auth, money, personal data, performance on large inputs, backward compatibility.
4. **Operability.** Can on-call tell when this breaks? Are errors logged with context? Are there metrics?
5. **Tests.** Do they test behaviour, not implementation? Would they fail if the code were wrong?
6. **Readability.** Will the next person understand this without the author?

Do not spend review time on things a tool can enforce. If you keep making the same comment, propose a lint rule.

## Comment labels

Prefix comments so the author knows what is blocking:

| Prefix | Meaning |
|---|---|
| `blocking:` | Must change before merge. Explain why. |
| `suggestion:` | Better in my view, author decides. |
| `question:` | I don't understand. May or may not lead to a change. |
| `nit:` | Trivial. Never blocking. |
| `praise:` | Something done well. Say it. |

## Approval

- Approve when the change is good enough to merge and improves the codebase, even if you would have written it differently.
- "Approve with suggestions" is fine. Trust the author to address them.
- Request changes only with at least one `blocking:` comment.

## AI-assisted review

Automated reviewers (static analysis, LLM-based review bots) are useful for a first pass: missing null checks, unclear names, obvious security patterns. Treat their comments as `suggestion:`. They do not replace a human approval, and a human reviewer owns the merge decision.
