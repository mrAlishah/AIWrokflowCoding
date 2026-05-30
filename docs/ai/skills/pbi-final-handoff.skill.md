# pbi-final-handoff Skill

## Purpose

Create the final PBI handoff after implementation, review, and fixes are complete.

## When To Use

Use at the end of the PBI workflow when work is ready for user handoff or PR preparation.

## Required Parameters

- PBI id in `STP-XXXX` format
- changed files
- validation results
- known risks
- PR summary
- review focus

## Required Inputs

Read:

- `docs/ai/pbi/STP-XXXX/00-approved-pbi.md`
- `docs/ai/pbi/STP-XXXX/implementation-plan.md`
- relevant phase files
- verification results
- final diff summary

## Allowed File Scope

This skill may update only:

- `docs/ai/pbi/STP-XXXX/06_handoff.md`

It must not update `docs/ai/repo-context/*`.

## Handoff Content

Update `06_handoff.md` with:

- PBI summary
- changed files
- validation performed
- validation not performed
- known risks
- PR summary
- recommended review focus
- follow-up items, if any

## Handoff Rules

- Keep the handoff concise.
- Separate facts from risks.
- Do not claim unperformed validation.
- Do not hide known limitations.
- Keep PR summary focused on user-visible and reviewer-relevant changes.

## Forbidden Actions

- Do not modify source code.
- Do not run implementation, review, or fix work.
- Do not update repo-context.
- Do not add new scope.
- Do not mark incomplete work as complete.

## Execution Protocol

1. Confirm implementation and fixes are complete or clearly identify remaining work.
2. Read PBI summary, plan, phases, and verification notes.
3. Summarize changed files and validation.
4. Record risks and review focus.
5. Update `06_handoff.md`.
6. Report all changed markdown files under `Markdown Files Changed`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
