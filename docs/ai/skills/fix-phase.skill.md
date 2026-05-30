# fix-phase Skill

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
- Add comments only for non-obvious logic.

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

