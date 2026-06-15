# fix-phase Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Apply targeted fixes for review findings.

## When To Use

Use after `review-phase` identifies concrete findings that must be fixed.

## Required Parameters

- PBI id in `STP-XXXX` format
- review findings to fix
- target files for each finding
- relevant phase file
- verification requested for the fixes

For post-PR review feedback, the minimal required parameters are:

- `PBI_ID`
- `RF_ID`

## Required Inputs

Read:

- review findings
- relevant phase file
- `docs/ai/pbi/STP-XXXX/05-validation.md`
- `docs/ai/pbi/STP-XXXX/99-metrics.md`
- only source files needed to fix the findings

For `RF_ID`, resolve and read:

```text
docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
docs/ai/pbi/{PBI_ID}/phases/RF-*.md matching {RF_ID}
```

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/fix-phase.skill.md`
3. Active workspace: `docs/ai/pbi/STP-XXXX/*`
4. repo-context routing docs only if needed:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files needed for the review findings

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

## Allowed File Scope

This skill may update:

- files directly required to fix review findings
- relevant phase file or PBI review notes, if needed
- `docs/ai/pbi/STP-XXXX/05-validation.md` when fixes change validation requirements, risks, or sign-off criteria
- `docs/ai/pbi/STP-XXXX/99-metrics.md`
- `docs/ai/pbi/metrics.md`

It must not update `docs/ai/repo-context/*`.

## Fix Rules

- Apply only review findings.
- For `RF_ID` work, apply only RF items with status `Required`.
- Do not apply `Proposed`, `Ignored`, `Done`, or `Blocked` RF items.
- Keep fixes minimal and local.
- Touch the fewest files possible.
- Change the fewest lines possible.
- Follow repository conventions.
- Follow active code policies from `docs/ai/repo-context/code-policies.md` when they apply to touched code.
- Preserve the original implementation plan unless a finding requires a scoped adjustment.
- Code should remain simple, readable, and aligned with repo conventions.
- Avoid over-engineering.
- Avoid broad refactoring unless explicitly requested.
- Comment important intent.
- Comment important business logic.
- Comment important validation rules.
- Comment important technical decisions.
- Comment compatibility rules or behavior copied from existing codebase patterns.
- Avoid obvious comments.
- Avoid noisy comments.
- Avoid commenting every line.
- Preserve fix quality over numeric context limits.
- Stop and request approval before reading files outside the approved fix scope unless they are required for correctness or validation.

## Forbidden Actions

- Do not perform extra cleanup.
- Do not refactor unrelated code.
- Do not add new behavior outside the review findings.
- Do not update repo-context.
- Do not reopen planning unless the review finding requires it and the user approves.

## Execution Protocol

1. Confirm the findings to fix.
2. If `RF_ID` is provided, resolve the RF file from `PBI_ID` and confirm its status is `Required`.
3. Read the relevant phase and review notes.
4. Read only files needed for the fixes.
5. Apply targeted fixes.
6. Run only requested or necessary verification.
7. Update phase or review memory if needed.
8. Update `05-validation.md` if validation requirements, known risks, or sign-off criteria changed.
9. Append execution metrics to `99-metrics.md`.
10. Update `docs/ai/pbi/metrics.md`.
11. Report all changed markdown files under `Markdown Files Changed`.
