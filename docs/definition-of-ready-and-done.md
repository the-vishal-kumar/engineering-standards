# Definition of Ready and Definition of Done

Both lists are agreements, not paperwork. If a team keeps skipping an item, either it is not needed or something upstream is broken. Discuss it in the retro.

## Definition of Ready

A ticket can enter a sprint when:

- [ ] **Problem stated.** Who is affected and why it matters, in one or two sentences.
- [ ] **Acceptance criteria written** as testable statements, agreed with the product owner.
- [ ] **Sized** by the team that will build it. Anything above [8 points / 3 days] is split.
- [ ] **Dependencies known.** Other teams, APIs, data or access needed are named, and either available or scheduled.
- [ ] **Design agreed** if the change crosses a service boundary, changes a schema, or needs an ADR.
- [ ] **Open questions answered,** or the ticket is a time-boxed spike to answer them.
- [ ] **UX available** for user-facing work.

Most missed sprint commitments trace back to work that entered the sprint before it was ready. Holding this line is the cheapest way to improve predictability.

## Definition of Done

A change is done when:

- [ ] Code merged to `main` through a reviewed PR.
- [ ] CI quality gate green: lint, tests, coverage threshold, dependency audit, secret scan.
- [ ] Acceptance criteria verified, by test where possible.
- [ ] Deployed to production, or to staging behind a flag with a release date.
- [ ] Logs, metrics and alerts cover the new behaviour.
- [ ] Docs, runbook or ADR updated where behaviour or operations changed.
- [ ] No known defects left open against the change without a ticket and an agreed priority.
- [ ] Product owner has accepted it.

"Done but not deployed" is not done. Undeployed work is inventory: it carries risk and gives no value.
