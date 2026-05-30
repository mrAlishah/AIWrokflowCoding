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

## Required Inputs

Read:

- review findings
- relevant phase file
- only source files needed to fix the findings

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

It must not update `docs/ai/repo-context/*`.

## Fix Rules

- Apply only review findings.
- Keep fixes minimal and local.
- Touch the fewest files possible.
- Change the fewest lines possible.
- Follow repository conventions.
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

## Forbidden Actions

- Do not perform extra cleanup.
- Do not refactor unrelated code.
- Do not add new behavior outside the review findings.
- Do not update repo-context.
- Do not reopen planning unless the review finding requires it and the user approves.

## Execution Protocol

1. Confirm the findings to fix.
2. Read the relevant phase and review notes.
3. Read only files needed for the fixes.
4. Apply targeted fixes.
5. Run only requested or necessary verification.
6. Update phase or review memory if needed.
7. Report all changed markdown files under `Markdown Files Changed`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
