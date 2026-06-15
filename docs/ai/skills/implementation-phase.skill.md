# implementation-phase Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

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

- `docs/ai/pbi/STP-XXXX/02-implementation-plan.md`
- `docs/ai/pbi/STP-XXXX/05-validation.md`
- the selected `docs/ai/pbi/STP-XXXX/phases/*.md`
- source files explicitly listed in the selected phase

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/implementation-phase.skill.md`
3. Active workspace: `docs/ai/pbi/STP-XXXX/*`
4. repo-context routing docs only if needed:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files listed in the selected phase

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

## Allowed File Scope

This skill may update:

- source or documentation files explicitly listed in the selected phase
- the selected phase file after execution
- `docs/ai/pbi/STP-XXXX/05-validation.md` when implementation changes validation needs, risks, or sign-off criteria

It must not update `docs/ai/repo-context/*`.

## Execution Rules

- Execute only one phase.
- Keep the change simple and direct.
- Touch the fewest files possible.
- Change the fewest lines possible.
- Follow repository naming, structure, and coding conventions.
- Follow active code policies from `docs/ai/repo-context/code-policies.md` when they apply to touched code.
- Prefer existing local patterns over new abstractions.
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
- Do not perform unrelated cleanup or refactors.
- Preserve implementation quality over numeric context limits.
- Stop and request approval before reading files outside the approved phase scope unless they are required for correctness or validation.

## Phase File Update

After execution, update the selected phase file with:

- status: `Done` if complete, otherwise `In Progress`
- files changed
- execution memory
- verification performed
- known risks or follow-up
- validation updates that belong in `05-validation.md`

## Forbidden Actions

- Do not execute more than one phase.
- Do not read unrelated source files.
- Do not modify files outside the selected phase scope.
- Do not update repo-context.
- Do not broaden scope without approval.
- Do not run review-phase or fix-phase inside this skill.

## Execution Protocol

1. Confirm the PBI workspace and selected phase exist.
2. Read `02-implementation-plan.md`.
3. Read only the selected phase file.
4. Read only source files listed in the phase.
5. Implement the phase with minimal files and lines.
6. Run only requested or necessary verification.
7. Update the selected phase file.
8. Update `05-validation.md` if validation requirements, known risks, or sign-off criteria changed.
9. Report all changed markdown files under `Markdown Files Changed`.
