# review-phase Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

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

For post-PR review feedback verification, the minimal required parameters are:

- `PBI_ID`
- `RF_ID`
- `REVIEW_MODE`

## Required Inputs

Read:

- relevant PBI workspace files
- implementation diff
- changed files needed to understand the diff

For `RF_ID`, resolve and read:

```text
docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
docs/ai/pbi/{PBI_ID}/phases/RF-*.md matching {RF_ID}
```

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/review-phase.skill.md`
3. Active workspace: `docs/ai/pbi/STP-XXXX/*`
4. repo-context routing docs only if needed:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files listed in the phase, context, or diff

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

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
- important intent, business logic, validation rules, technical decisions, and compatibility comments
- obvious, noisy, or line-by-line comments
- over-engineering and broad refactoring
- test coverage or verification gaps
- regressions, edge cases, and maintainability risks

For `RF_ID` verification, check only the selected RF fix, its validation plan, and necessary surrounding context.

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
2. If `RF_ID` is provided, resolve the RF file from `PBI_ID`.
3. Inspect the implementation diff.
4. Review only the changed behavior and necessary surrounding context.
5. Record findings, risks, and verification gaps.
6. If no issues are found, state that clearly.
7. Report all changed markdown files under `Markdown Files Changed`.
