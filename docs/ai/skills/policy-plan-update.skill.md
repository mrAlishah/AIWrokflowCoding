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
- `INPUT_SOURCE`, except when `SCOPE: pbi` and `INPUT_TAG: USER_REVIEW_FEEDBACK`
- `UPDATE_MODE`, except when `SCOPE: pbi` and `INPUT_TAG: USER_REVIEW_FEEDBACK`
- `USER_INPUT`, except when the selected `INPUT_TAG` is fully represented in resolved workspace files

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
- `apply-global-rule`

## Supported Input Tags

- `USER_ANSWER`
- `USER_REVIEW_FEEDBACK`
- `USER_CODE_POLICY`

## USER_REVIEW_FEEDBACK Invocation

Preferred minimal invocation:

```text
Use skill: policy-plan-update

Parameters:

SCOPE:
pbi

STP_ID:
STP-8019

INPUT_TAG:
USER_REVIEW_FEEDBACK
```

When `SCOPE: pbi` and `INPUT_TAG: USER_REVIEW_FEEDBACK`, do not ask the user for `INPUT_SOURCE`, `UPDATE_MODE`, `review-feedback.md` path, or RF file paths.

Resolve automatically:

```text
docs/ai/pbi/{STP_ID}/phases/review-feedback.md
docs/ai/pbi/{STP_ID}/phases/RF-*.md
docs/ai/pbi/{STP_ID}/02-implementation-plan.md
docs/ai/pbi/{STP_ID}/03-codebase-index.md
docs/ai/pbi/{STP_ID}/04-decision_log.md
```

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

For `SCOPE: pbi` and `INPUT_TAG: USER_REVIEW_FEEDBACK`, this skill may update only when relevant:

- `docs/ai/pbi/STP-XXXX/phases/review-feedback.md`
- `docs/ai/pbi/STP-XXXX/phases/RF-*.md`
- `docs/ai/pbi/STP-XXXX/02-implementation-plan.md`
- `docs/ai/pbi/STP-XXXX/03-codebase-index.md`
- `docs/ai/pbi/STP-XXXX/04-decision_log.md`

For `SCOPE: review`, this skill may update only the active review workspace files related to the tagged user input.

For `SCOPE: repo-context` or `SCOPE: global`, update repo-context only when the policy affects reusable repository knowledge.

For `SCOPE: global`, `INPUT_TAG: USER_CODE_POLICY`, and `UPDATE_MODE: apply-global-rule`, this skill may update only relevant governance and reusable coding-standard markdown files, including:

- `docs/AGENTS.md`
- `docs/ai/skills/common-skill-rules.md`
- `docs/ai/repo-context/code-policies.md`
- `docs/ai/repo-context/coding_standards.md`
- skill files that explicitly reference repository coding conventions

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

For `USER_CODE_POLICY`, report conflicts if an existing governance or coding-standard file allows, recommends, or silently permits the disallowed pattern.

For `USER_REVIEW_FEEDBACK`, report conflicts if:

- `review-feedback.md` says `Required` but the RF file says `Ignored`.
- RF file status differs from the RF index.
- The implementation plan references an old RF status.
- The RF file is missing for an RF ID.

## USER_REVIEW_FEEDBACK Sync Rules

When `SCOPE: pbi` and `INPUT_TAG: USER_REVIEW_FEEDBACK`:

1. Read `review-feedback.md`.
2. Detect RF items with statuses `Required`, `Ignored`, `Blocked`, and `Done`.
3. Read related `RF-*.md` files.
4. Add or update `Post-PR Review Feedback Plan` in `02-implementation-plan.md`.
5. Ensure `Required` RF items are visible as planned fix work.
6. Ensure `Ignored` RF items are recorded as intentionally skipped.
7. Ensure `Done` RF items are marked complete and do not get re-planned.
8. Ensure `Blocked` RF items show required user input.
9. Update `03-codebase-index.md` only when RF routing, affected files, modules, functions, validation focus, or review focus are known.
10. Update `04-decision_log.md` only if the RF decision creates an architecture, domain, or design decision.

Use this plan format in `02-implementation-plan.md`:

```md
## Post-PR Review Feedback Plan

| RF ID | Title | Status | Action | RF File | Related Files | Validation |
|---|---|---|---|---|---|---|
| RF-001 | Null validation | Required | Fix | RF-001-null-validation.md | ... | ... |
```

## USER_CODE_POLICY Sync Rules

When `SCOPE: global`, `INPUT_TAG: USER_CODE_POLICY`, and `UPDATE_MODE: apply-global-rule`:

1. Treat the user input as approved active governance.
2. Register the canonical policy in `docs/ai/repo-context/code-policies.md`.
3. Link shared governance rules to the canonical policy file.
4. Sync reusable repository coding standards with concise pointers, not duplicated policy text.
5. Update skill guidance that references repository coding conventions to apply active code policies.
6. Report any conflicting policies.
7. Do not modify source code.
8. Do not create implementation tasks or PBI workspaces.

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
3. Resolve workspace paths from stable identifiers.
4. Find the tagged user input in `INPUT_SOURCE`, unless `INPUT_TAG` is resolved from workspace files.
5. Compare related files for stale or conflicting references.
6. Update only files whose owner rules require synchronization.
7. Record decisions only when the input creates architecture, domain, or design decisions.
8. Report conflicts found and resolved.
9. Recommend the next skill based on the updated workflow state.

## Expected Output

1. Summary
2. User input or review feedback status detected
3. Files inspected
4. Files updated
5. Conflicts found and resolved
6. Markdown Files Changed
7. Recommended next skill

