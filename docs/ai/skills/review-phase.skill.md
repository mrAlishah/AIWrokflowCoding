# review-phase Skill

## Purpose

Review implemented PBI work before fixes.

## When To Use

Use after an implementation phase has changed files and before any fix-phase work begins.

## Required Parameters

- PBI id in `STP-XXXX` format
- implementation diff or changed files
- relevant phase file
- acceptance criteria
- verification results, if available

## Required Inputs

Read:

- relevant PBI workspace files
- implementation diff
- changed files needed to understand the diff

## Allowed File Scope

This skill may update review notes in the PBI workspace if the workflow requires durable review memory.

It must not modify source code unless the user explicitly requests fixes in the same turn.

## Review Checklist

Check:

- correctness against the PBI and acceptance criteria
- scope control and unrelated changes
- architecture boundaries
- repository standards and naming conventions
- simplicity, minimal files, and minimal lines
- comment quality
- test coverage or verification gaps
- regressions, edge cases, and maintainability risks

## Findings Rules

- Lead with actionable findings.
- Order findings by severity.
- Reference files and lines when possible.
- Do not invent issues.
- Clearly state when no issues are found.

## Forbidden Actions

- Do not apply fixes unless explicitly requested.
- Do not update repo-context.
- Do not broaden the PBI scope.
- Do not request unrelated refactors.
- Do not treat style preferences as defects unless they violate project standards.

## Execution Protocol

1. Read the PBI context and relevant phase file.
2. Inspect the implementation diff.
3. Review only the changed behavior and necessary surrounding context.
4. Record findings, risks, and verification gaps.
5. If no issues are found, state that clearly.
6. Report all changed markdown files under `Markdown Files Changed`.

