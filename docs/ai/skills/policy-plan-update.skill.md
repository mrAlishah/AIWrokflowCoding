# policy-plan-update Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Synchronize tagged user answers, rules, or policy changes into related AI OS planning files without running implementation or review.

This skill keeps workspace memory consistent after the user answers an open question or changes a task policy.

## When To Use

- A user answers an open question recorded in a workspace.
- A user adds a new rule, constraint, assumption, or policy.
- A user changes scope, planning assumptions, validation expectations, or implementation instructions.
- Related planning files may now contain stale references.

## When Not To Use

- Source code implementation.
- Review execution.
- Fixing review findings.
- repo-context population, unless `SCOPE` explicitly allows it.
- Creating PBI or Review workspaces.

## Required Parameters

- `SCOPE`
- `STP_ID`
- `INPUT_TAG`
- `INPUT_SOURCE`
- `UPDATE_MODE`
- `USER_INPUT`

Allowed `SCOPE` values:

- `pbi`
- `review`
- `repo-context`
- `global`

Allowed `UPDATE_MODE` values:

- `sync-related-files`
- `context-only`
- `plan-only`
- `conflict-check-only`

## Read Order

Read:

1. `docs/AGENTS.md` or `AGENTS.md`, whichever exists.
2. `docs/ai/START_HERE.md`
3. `docs/ai/skills/README.md`
4. `docs/ai/skills/policy-plan-update.skill.md`
5. Active workspace files related to the selected `SCOPE`

Do not read unrelated workspaces.

## Allowed File Scope

For `SCOPE: pbi`, this skill may update only when relevant:

- `docs/ai/pbi/STP-XXXX/01-context.md`
- `docs/ai/pbi/STP-XXXX/02-implementation-plan.md`
- `docs/ai/pbi/STP-XXXX/03-codebase-index.md`
- `docs/ai/pbi/STP-XXXX/04-decision_log.md`
- `docs/ai/pbi/STP-XXXX/phases/*.md`
- `docs/ai/pbi/STP-XXXX/knowledge/*`

For `SCOPE: review`, this skill may update only the active review workspace files related to the tagged user input.

For `SCOPE: repo-context` or `SCOPE: global`, update repo-context only when the policy affects reusable repository knowledge.

## PBI Update Rules

- `01-context.md` owns open questions, answers, assumptions, constraints, and user answers.
- `04-decision_log.md` is updated only if the user input creates an architecture, domain, or design decision.
- `02-implementation-plan.md` is updated only if phase order, scope, or status changes.
- `03-codebase-index.md` is updated only if routing, affected files, modules, or functions change.
- `phases/*.md` are updated only if implementation instructions, validation, risks, or scope change.
- `knowledge/*` is updated only if reusable PBI-level knowledge changes.

## Conflict Rules

If a conflict exists between files:

- Prefer tagged user input as the highest priority.
- Report the conflict.
- Update stale references.
- Do not silently ignore inconsistencies.

## Forbidden Actions

- Do not modify source code.
- Do not run implementation.
- Do not run review.
- Do not create PBI or Review workspaces.
- Do not update repo-context unless `SCOPE` is explicitly `repo-context` or `global` and the policy affects reusable repository knowledge.
- Do not broaden scope beyond the tagged user input.
- Do not invent user intent beyond the provided `USER_INPUT`.

## Execution Protocol

1. Confirm required parameters are present.
2. Confirm the selected skill and active workspace exist.
3. Find the tagged user input in `INPUT_SOURCE`.
4. Compare related files for stale or conflicting references.
5. Update only files whose owner rules require synchronization.
6. Record decisions only when the input creates architecture, domain, or design decisions.
7. Report conflicts found and resolved.
8. Recommend the next skill based on the updated workflow state.

## Expected Output

1. Summary
2. User input detected
3. Files inspected
4. Files updated
5. Conflicts found and resolved
6. Markdown Files Changed
7. Recommended next skill

