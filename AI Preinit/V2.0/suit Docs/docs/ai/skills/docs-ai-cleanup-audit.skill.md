# docs-ai-cleanup-audit Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Audit `docs/ai` for long-term cleanup, context cost reduction, stale or hallucinated information, duplicated rules, outdated naming, old workspace artifacts, audit/history files, and archive/delete candidates.

This skill is audit and planning only.

## When To Use

- Monthly or quarterly `docs/ai` cleanup review.
- After many PBI or Review workspaces have accumulated.
- After governance changes.
- Before archiving old foundation or history files.
- When agents start reading too much context.
- When duplicated or stale markdown information is suspected.

## When Not To Use

- Normal PBI implementation.
- Normal PR review.
- repo-context population.
- Source code cleanup.
- Direct file deletion, archiving, or renaming.
- Governance rewriting.

## Required Parameters

- `CLEANUP_SCOPE`
- `CLEANUP_MODE`
- `TARGET_AREA`

Allowed `CLEANUP_SCOPE` values:

- `runtime-only`
- `foundation-only`
- `skills-only`
- `repo-context-only`
- `workspaces-only`
- `full-docs-ai`

Allowed `CLEANUP_MODE` values:

- `audit-only`
- `merge-candidates`
- `archive-candidates`
- `delete-candidates`
- `stale-risk-check`
- `token-cost-check`

Allowed `TARGET_AREA` values:

- `docs/ai`
- `docs/ai/foundation`
- `docs/ai/skills`
- `docs/ai/repo-context`
- `docs/ai/pbi`
- `docs/ai/reviews`

## Optional Parameters

- `MAX_INSPECTION_DEPTH`: `light`, `normal`, `deep`
- `INCLUDE_DONE_WORKSPACES`: `yes`, `no`
- `OUTPUT_MODE`: `append-to-cleanup-plan`, `new-cleanup-run-file`
- `ALLOW_MARKDOWN_UPDATES`: `yes`, `no`

Default values:

- `MAX_INSPECTION_DEPTH: normal`
- `INCLUDE_DONE_WORKSPACES: no`
- `OUTPUT_MODE: append-to-cleanup-plan`
- `ALLOW_MARKDOWN_UPDATES: yes`

## Allowed File Scope

This skill may update only:

- `docs/ai/foundation/content-cleanup-plan.md`
- `docs/ai/foundation/cleanup-runs/YYYY-MM-DD-docs-ai-cleanup.md` when `OUTPUT_MODE` is `new-cleanup-run-file`
- `docs/ai/skills/README.md` only when registering this skill
- `docs/ai/START_HERE.md` only when adding a short routing note

## Forbidden Actions

- Do not modify source code.
- Do not delete markdown files.
- Do not archive markdown files.
- Do not rename markdown files.
- Do not rewrite active governance.
- Do not modify official skills except this skill and skill index registration.
- Do not update repo-context content.
- Do not create PBI or Review workspaces.
- Do not modify real PBI or Review workspaces unless the task explicitly scopes workspace audit and only reports findings.

## Classification Rules

Classify inspected files as:

- Active Runtime
- Active Governance
- Reference
- Audit / History
- Cleanup Planning
- Candidate For Merge
- Candidate For Archive
- Candidate For Delete Later

For each candidate, report:

- File path
- Current role
- Runtime needed? Yes/No
- Governance needed? Yes/No
- Audit value: High/Medium/Low
- Duplicate of
- Hallucination/stale risk: High/Medium/Low
- Token-cost risk: High/Medium/Low
- Recommendation: Keep / Merge / Archive / Delete Later
- Reason
- Validation required after action? Yes/No

## Cleanup Policy

- Runtime path must stay small.
- Active governance must stay explicit.
- Audit/history should be preserved unless clearly redundant.
- Archive before delete.
- Do not delete repo-context placeholder files.
- Do not delete official skills.
- Do not delete `v2-approved-baseline.md`.
- Do not delete `v2-workspace-naming.md`.
- Do not delete `common-skill-rules.md`.
- Do not delete `skills/README.md`.
- Do not treat `content-cleanup-plan.md` as daily runtime context.
- After any governance edit, recommend re-running the V2 validation checklist.

## Execution Protocol

1. Confirm parameter values are allowed.
2. Read `docs/ai/START_HERE.md`, `docs/ai/foundation/README.md`, `docs/ai/foundation/content-cleanup-plan.md`, `docs/ai/skills/README.md`, and `docs/ai/skills/common-skill-rules.md`.
3. Inspect only the selected `TARGET_AREA` within the selected `CLEANUP_SCOPE`.
4. Classify files and identify cleanup candidates without changing those files.
5. Write findings to the selected output location only when `ALLOW_MARKDOWN_UPDATES` is `yes`.
6. Recommend merge, archive, or delete actions only. Do not execute them.
7. Include validation recommendation and source code modification status.

## Cleanup Report Template

```md
# Cleanup Run - YYYY-MM-DD

## Summary

## Scope

## Files Inspected

## Runtime Path Check

## Active Governance Check

## Duplicate / Drift Findings

## Stale Or Hallucination Risk

## Token Cost Risk

## Merge Candidates

## Archive Candidates

## Delete Later Candidates

## Files That Must Not Be Deleted

## Required Follow-up

## Validation Recommendation

## Source Code Modified
No
```

