# Security policy

## Reporting a vulnerability

Please report security issues privately through GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/report-privately) on this repository (**Security → Report a vulnerability**). Do not open a public issue.

Include what you found, how to reproduce it, and the impact you expect. You will get an acknowledgement within 5 working days.

## Scope

This repository holds documentation and a reusable CI workflow. The most likely real issues are in [`quality-gate.yml`](.github/workflows/quality-gate.yml): for example, a way for a caller's input to run commands it should not, or a pinned tool version with a known vulnerability.

## Using this file as a template

Copy it into your own repositories and change the contact route and response time. Keep the response time to one you can meet.
