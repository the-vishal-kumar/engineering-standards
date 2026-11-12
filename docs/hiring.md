# Hiring: structured interview loop and scorecard

A structured loop asks every candidate for the same role the same kind of questions, scores each answer against written criteria, and keeps interviewers from comparing notes until each has written a score. It makes decisions faster and fairer, and it lets you find out which part of the loop predicts success and which part is noise.

## 1. Before the first interview

Write a one-page role brief and get the hiring manager and one future peer to agree on it:

- **The outcomes** this person must deliver in their first 6 to 12 months. Outcomes, not a list of technologies.
- **4 to 6 competencies** that predict those outcomes, chosen from the table below.
- **Level** and the one or two competencies that separate this level from the one below.
- **Must-haves vs trainable.** Most "requirements" are trainable in a few weeks. Keep the must-have list short.

## 2. The loop

Each stage assesses named competencies. No two interviewers assess the same competency unless you deliberately want a second signal on it.

| Stage | Length | Assesses | Notes |
|---|---|---|---|
| Recruiter screen | 30 min | Motivation, logistics, level fit | Fixed questions; share the loop and the competencies with the candidate |
| Technical screen | 60 min | Problem solving, code quality | Realistic task in the candidate's language. No puzzles |
| System design | 60 min | Design, trade-offs, operability | Open problem from your domain; score the reasoning, not the final diagram |
| Code review or debugging | 45 min | Code quality, collaboration | Candidate reviews a prepared PR or debugs a failing service. Close to the real job |
| Behavioural | 45 min | Ownership, collaboration, communication | Past-behaviour questions ("tell me about a time..."), with follow-ups for specifics |
| Hiring manager | 45 min | Role fit, growth, values | Also the candidate's chance to assess the manager |

For engineering manager and leadership roles, replace the technical screen with a **people-leadership interview** (performance problems, hiring decisions, conflict between teams) and add a **delivery and strategy interview** (how they set goals, measure delivery, and handle a failing project). Keep system design: leaders who cannot reason about architecture make poor technical calls.

## 3. Competencies

Define what each level looks like, so "strong" means the same thing to every interviewer.

| Competency | Signals of a strong answer |
|---|---|
| Problem solving | Clarifies the problem first; breaks it down; tests assumptions; changes approach on evidence |
| Code quality | Readable, tested, handles failure paths; can explain why, not only what |
| System design | Starts from requirements and load; names trade-offs; designs for failure, observability and cost |
| Operability | Thinks about how it breaks, how we would know, and how to roll back |
| Ownership | Describes outcomes they drove, including mistakes and what they changed afterwards |
| Collaboration | Disagrees with reasons; credits others; adapts to the listener |
| Communication | Clear structure; gets to the point; checks understanding |
| People leadership (managers) | Has handled underperformance with a plan; grows people; hires deliberately |
| Delivery and strategy (leaders) | Links work to business outcomes; uses metrics; makes and explains trade-offs |

## 4. Scorecard

Each interviewer completes this **before** the debrief and before seeing anyone else's scores.

```markdown
**Candidate:**            **Role and level:**
**Interviewer:**          **Stage:**            **Date:**

| Competency | Score (1-4) | Evidence: what the candidate said or did |
|---|---|---|
|            |             |                                          |
|            |             |                                          |

Scale: 1 = strong no, 2 = no, 3 = yes, 4 = strong yes. No middle option.

**Overall recommendation:** Strong no | No | Yes | Strong yes
**Biggest concern, and what would resolve it:**
```

Evidence means quotes and observed behaviour, not impressions. "Explained why the cache needs a TTL and what happens on a stampede" is evidence. "Seemed smart" is not.

## 5. Debrief and decision

- **Within 1 working day** of the last interview, 30 minutes.
- Each interviewer reads their score and evidence before discussion starts. The most junior interviewer goes first, so seniority does not anchor the room.
- Discuss the competencies where scores disagree, not the ones where they agree.
- **The hiring manager decides.** It is not a vote, but a strong no with clear evidence on a must-have competency needs an answer, not an override.
- Record the decision and the main reasons. That record is how you calibrate later.

## 6. Measure the funnel

| Metric | Definition | Why it matters |
|---|---|---|
| Time to hire | Days from first contact to accepted offer, median | Strong candidates accept other offers while you wait |
| Stage pass-through rate | Candidates passing a stage ÷ candidates entering it | A stage that passes nearly everyone or almost no one is not adding signal |
| Offer acceptance rate | Accepted offers ÷ offers made | Low rates point to compensation, speed or candidate experience |
| Interviewer calibration | Each interviewer's yes rate and agreement with final decisions | Finds interviewers who need pairing or recalibration |
| Quality of hire | Hiring manager's rating at 6 months against the role brief outcomes | The only check that the loop predicts the job |

Review these every quarter with the recruiters. Change one stage at a time, so you can tell what helped.

## Ground rules

- Every interviewer is trained and has shadowed two interviews before running one.
- Same questions for the same stage and level. Keep a shared question bank with scoring notes.
- Candidates get the loop, the competencies and the format in advance. Surprises measure nerves, not skill.
- Take-home tasks are optional and capped at 2 to 3 hours, or paid.
- Give every candidate who reached an onsite a decision within 3 working days of it.
