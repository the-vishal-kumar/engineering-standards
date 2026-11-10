# Disaster recovery runbook (outline)

> Outline. It defines tiers, targets and the structure of each recovery procedure. Fill in the procedures per system and test them. An untested DR plan is a hypothesis.

## Terms

- **RPO (recovery point objective):** the most data, measured in time, we accept losing. RPO 15 min means at most the last 15 minutes of writes may be gone.
- **RTO (recovery time objective):** the longest we accept the service being down, from declaring a disaster to serving traffic again.
- **Disaster:** loss of a region, an account, a primary datastore, or data integrity (including ransomware or a bad migration). Losing one instance is an incident, not a disaster.

## Tiers

Assign every system a tier. The tier sets the targets, the backup design and how often we test. Higher tiers cost more, so put a system in Tier 0 only if the business case holds.

| Tier | Examples | RPO | RTO | Backup and replication | DR test |
|---|---|---|---|---|---|
| 0: Critical | Auth, payments, core transactional DB | ≤ 5 min | ≤ 1 h | Continuous replication to a second region; point-in-time recovery; infra as code ready to apply | Quarterly failover drill |
| 1: Important | Customer-facing APIs, order processing | ≤ 1 h | ≤ 4 h | PITR plus cross-region snapshot copies; images and IaC in the second region | Twice a year restore test |
| 2: Supporting | Internal tools, reporting, search indexes | ≤ 24 h | ≤ 24 h | Daily snapshots, copied off-account; indexes rebuilt from source | Yearly restore test |
| 3: Rebuildable | Caches, ephemeral workers, dev environments | N/A | ≤ 72 h | None needed; rebuilt from code and source data | Covered by normal deploys |

## System inventory

| System | Tier | Data stores | Backup method | Where backups live | Last restore test | Result |
|---|---|---|---|---|---|---|
| [service] | | | | | | |

## Principles

1. **Backups are only proven by restores.** Each test records the actual RPO and RTO achieved.
2. **Isolate backups.** Copy them to a separate account or project with separate credentials, and make them immutable for a retention window. Ransomware and compromised admin keys target backups first.
3. **Everything as code.** If the infrastructure cannot be recreated from the repository, the RTO is a guess.
4. **Recover in dependency order.** Identity and networking first, then data, then services, then edge and DNS.
5. **Decide before the disaster** who can declare one and who can approve a failover.

## Procedure per scenario

Write one section per scenario, using this structure.

### Scenario: [primary region unavailable | primary database lost | data corrupted | account compromised]

1. **Detect and declare.** Signals that indicate this scenario. Who declares, and how.
2. **Assess.** What is the latest good recovery point? Is the cause still active (for example, an attacker or a looping bad job)? Stop it first.
3. **Communicate.** Incident channel, status page, customer and leadership notices. Templates: [link].
4. **Recover data.** Exact restore commands or console steps, with expected duration.
5. **Recover services.** Apply IaC to the recovery region, point config at restored data, scale up.
6. **Switch traffic.** DNS or load balancer change, TTLs, cache purges.
7. **Verify.** Smoke tests, data integrity checks (row counts, checksums, latest timestamps), key business flows.
8. **Return to normal.** Plan the failback, or declare the new region primary. Re-establish replication.
9. **Review.** Postmortem with measured RPO and RTO against the tier targets.

## Test log

| Date | Scenario | Systems | Target RPO / RTO | Achieved RPO / RTO | Gaps found | Actions |
|---|---|---|---|---|---|---|
| | | | | | | |
