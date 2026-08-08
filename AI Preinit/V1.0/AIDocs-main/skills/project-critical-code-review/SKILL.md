---
name: project-critical-code-review
description: Use for critical review of project phases or current changes against acceptance criteria, validation, security, auditability, performance, and edge cases.
---

# Project Critical Code Review

Review only the requested phase(s) or current change scope. Default output: `Critical issues`.

## Mandatory Checks

- Acceptance criteria coverage.
- Missing or weak validation.
- Security: auth, authorization, secrets, file paths, injection, unsafe external calls.
- Auditability: logs, traceability, user actions, generated artifacts.
- Performance: large files, repeated IO, unnecessary network calls, expensive loops.
- Edge cases: empty inputs, duplicate IDs, invalid references, failed file operations, failed API responses.
- Project rules from `AGENTS.md`.

## Workflow

1. Read `AGENTS.md`.
2. Read only relevant implementation docs.
3. Inspect `git status --short`, targeted diffs, and affected files.
4. Report only issues that can break correctness, safety, auditability, or acceptance criteria.

## Output

```text
Critical issues

1. [Critical] <title>
   File: <path>:<line>
   Problem: <what is wrong>
   Impact: <why it matters>
   Recommendation: <specific fix>
   Check: <mandatory check violated>
```

If none:

```text
Critical issues

No critical issues found in the reviewed scope.

Residual risks:
- <short risk, if any>
```
