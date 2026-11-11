# Security and compliance baseline

The minimum every service and repository meets, whatever its size. Each control lists the **evidence** that shows it is in place, because that is what a customer security review or an auditor asks for. If you can produce the evidence on request, the control exists. If you can't, it doesn't.

This is a baseline, not a compliance programme. It covers the engineering controls that most frameworks ask for in some form. The framework column is a rough pointer for conversations with a compliance lead, not an audit mapping.

## How to use it

1. Copy the checklist into each service's repository or into a tracking sheet with one column per service.
2. Mark each control as met, not met, or N/A with a reason. Not-met items become entries in the [tech debt register](tech-debt-register.md) with type "security".
3. Review it every quarter, and whenever a service starts handling a new kind of data (payments, health, personal data of a new region).

## 1. Identity and access

| Control | Evidence | Framework pointer |
|---|---|---|
| [ ] SSO with MFA for the code host, cloud console, CI and production tooling | IdP configuration; list of apps behind SSO | SOC 2 CC6.1, ISO 27001 A.8.5 |
| [ ] No shared accounts. Service accounts are named, owned and have no console login | Account inventory with owners | SOC 2 CC6.2 |
| [ ] Least privilege: production write access is limited to a named group, granted through roles, not per person | IAM role list and group membership | ISO 27001 A.8.2 |
| [ ] Access reviewed every quarter, and removed within 1 working day of someone leaving | Review records; offboarding tickets with timestamps | SOC 2 CC6.2, CC6.3 |
| [ ] Break-glass access to production is logged and alerts the security owner | Audit log entries; alert rule | SOC 2 CC7.2 |

## 2. Code and supply chain

| Control | Evidence | Framework pointer |
|---|---|---|
| [ ] Default branch protected: PR review required, no direct pushes, no force-push | Branch protection settings | SOC 2 CC8.1 |
| [ ] [Quality gate](../.github/workflows/quality-gate.yml) is a required check: tests, dependency audit, secret scan | Required status checks; recent CI runs | SOC 2 CC8.1 |
| [ ] Dependencies are pinned through lockfiles and updated automatically ([Dependabot](../.github/dependabot.yml) or Renovate) | Lockfiles in the repository; update PR history | ISO 27001 A.8.8 |
| [ ] High and critical vulnerabilities fixed within agreed times, for example critical 7 days, high 30 days | Vulnerability report with open dates | SOC 2 CC7.1 |
| [ ] Container images built from a pinned base, run as non-root, and scanned before deploy | Dockerfile; scan results in CI | ISO 27001 A.8.9 |
| [ ] Third-party CI actions pinned to a version tag or commit SHA | Workflow files | |

## 3. Secrets

| Control | Evidence | Framework pointer |
|---|---|---|
| [ ] No secrets in code, config files or CI logs. Secret scanning runs on every PR and on the full history | gitleaks or code-host secret scanning results | SOC 2 CC6.1 |
| [ ] Secrets live in a secrets manager and reach workloads at runtime, not at build time | Secrets manager inventory; deployment config | ISO 27001 A.8.24 |
| [ ] Each secret has an owner and a rotation procedure. A leaked secret can be rotated in under an hour | Runbook entry in the [on-call runbook](runbooks/on-call.md) | |
| [ ] CI uses short-lived credentials (OIDC federation to the cloud) instead of long-lived keys | CI configuration; absence of static cloud keys | |

## 4. Data protection

| Control | Evidence | Framework pointer |
|---|---|---|
| [ ] Data classified: public, internal, confidential, restricted (personal or payment data) | Data inventory per service | ISO 27001 A.5.12 |
| [ ] Encryption in transit (TLS 1.2 or later) for all external and internal traffic | Load balancer and service mesh config | SOC 2 CC6.7 |
| [ ] Encryption at rest for databases, object storage and backups, with managed keys | Storage configuration | SOC 2 CC6.1 |
| [ ] No production personal data in non-production environments unless masked | Data-copy procedure; masking scripts | GDPR Art. 32, ISO 27001 A.8.11 |
| [ ] Retention periods defined and enforced by lifecycle rules, not by hand | Retention policy; lifecycle configuration | GDPR Art. 5(1)(e) |
| [ ] Backups isolated and restore-tested per [DR tier](runbooks/disaster-recovery.md) | DR test log | SOC 2 A1.2, A1.3 |

## 5. Logging, detection and response

| Control | Evidence | Framework pointer |
|---|---|---|
| [ ] Audit logs for authentication, admin actions and production access, kept at least 12 months | Log configuration and retention | SOC 2 CC7.2, ISO 27001 A.8.15 |
| [ ] Application logs carry a request ID and contain no secrets, tokens or unmasked personal data | Log samples; logging library config | |
| [ ] Alerts for suspicious access (new admin, disabled MFA, unusual data export) go to a named owner | Alert rules | SOC 2 CC7.2 |
| [ ] Security incidents follow the [on-call severities](runbooks/on-call.md) and get a [postmortem](postmortem-template.md) | Incident records | SOC 2 CC7.3–CC7.5 |
| [ ] A [`SECURITY.md`](../SECURITY.md) tells outside researchers how to report a vulnerability | File in each public repository | |

## 6. Vendors and new components

| Control | Evidence | Framework pointer |
|---|---|---|
| [ ] A new vendor that processes customer data gets a security review before contract: their SOC 2 or ISO report, a data processing agreement, and the data they will hold | Vendor register | SOC 2 CC9.2, GDPR Art. 28 |
| [ ] New datastores, runtimes and vendors go through an [RFC](rfc/README.md) that covers security and privacy impact | RFC with a completed "Security and privacy" section | |

## What this does not cover

Physical security, HR controls (background checks, security training), business continuity beyond technical DR, and formal risk assessment. A compliance programme needs those too, owned outside engineering.
