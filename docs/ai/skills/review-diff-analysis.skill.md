# review-diff-analysis Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Analyze a coworker's branch diff for changed files, behavior, and review risks.

## When To Use

Use after `review-workspace-create` and before creating PR comments.

## Required Parameters

- review id in `STP-XXXX` format
- base branch
- head branch or current branch
- review scope

## Required Command

Use local git diff only:

```text
git diff BASE_BRANCH...HEAD
```

`BASE_BRANCH` must be replaced with the requested base branch. `HEAD` represents the branch being reviewed.

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/review-diff-analysis.skill.md`
3. Active workspace: `docs/ai/reviews/STP-XXXX/*`
4. repo-context routing docs only if needed:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files listed in the local diff

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/03-diff-analysis.md`
- `docs/ai/reviews/STP-XXXX/02-context.md` if needed for assumptions or local diff context

## Analysis Checklist

Analyze:

- changed files
- affected modules
- affected layers
- risk areas
- behavior changes
- correctness risks
- scope risks
- architecture boundary concerns
- repository convention issues
- comment quality
- test impact
- missing tests
- files requiring deeper review
- files safe to ignore
- test and validation gaps

## Required Rules

- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.
- Keep analysis concise and actionable.
- Preserve review quality over numeric context limits.
- Stop and request approval before broad repository analysis or files outside the diff unless they are required to understand correctness, risk, or validation impact.

## Execution Protocol

1. Confirm the review workspace exists.
2. Run or inspect `git diff BASE_BRANCH...HEAD` locally.
3. Summarize changed files and key risks.
4. Update `03-diff-analysis.md`.
5. Report all changed markdown files under `Markdown Files Changed`.
