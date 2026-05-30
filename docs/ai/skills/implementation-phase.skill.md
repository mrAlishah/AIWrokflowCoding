# implementation-phase Skill

## Purpose

Execute one planned PBI phase with the smallest practical change.

## When To Use

Use when `pbi-plan-create` has produced an implementation plan and a selected phase is ready to execute.

## Required Parameters

- PBI id in `STP-XXXX` format
- selected phase file
- implementation-plan path
- target files listed in the selected phase
- verification requested for the phase

## Required Inputs

Read only:

- `docs/ai/pbi/STP-XXXX/implementation-plan.md`
- the selected `docs/ai/pbi/STP-XXXX/phases/*.md`
- source files explicitly listed in the selected phase

## Allowed File Scope

This skill may update:

- source or documentation files explicitly listed in the selected phase
- the selected phase file after execution

It must not update `docs/ai/repo-context/*`.

## Execution Rules

- Execute only one phase.
- Keep the change simple and direct.
- Touch the fewest files possible.
- Change the fewest lines possible.
- Follow repository naming, structure, and coding conventions.
- Prefer existing local patterns over new abstractions.
- Add comments only when they clarify non-obvious logic.
- Remove or avoid comments that restate the code.
- Do not perform unrelated cleanup or refactors.

## Phase File Update

After execution, update the selected phase file with:

- status: `Done` if complete, otherwise `In Progress`
- files changed
- execution memory
- verification performed
- known risks or follow-up

## Forbidden Actions

- Do not execute more than one phase.
- Do not read unrelated source files.
- Do not modify files outside the selected phase scope.
- Do not update repo-context.
- Do not broaden scope without approval.
- Do not run review-phase or fix-phase inside this skill.

## Execution Protocol

1. Confirm the PBI workspace and selected phase exist.
2. Read `implementation-plan.md`.
3. Read only the selected phase file.
4. Read only source files listed in the phase.
5. Implement the phase with minimal files and lines.
6. Run only requested or necessary verification.
7. Update the selected phase file.
8. Report all changed markdown files under `Markdown Files Changed`.

