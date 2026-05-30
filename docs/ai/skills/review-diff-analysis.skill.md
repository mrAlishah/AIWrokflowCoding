# review-diff-analysis Skill

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

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/diff-analysis.md`
- `docs/ai/reviews/STP-XXXX/context.md` if needed for assumptions or local diff context

## Analysis Checklist

Analyze:

- changed files
- behavior changes
- correctness risks
- scope risks
- architecture boundary concerns
- repository convention issues
- comment quality
- test and validation gaps

## Required Rules

- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.
- Keep analysis concise and actionable.

## Execution Protocol

1. Confirm the review workspace exists.
2. Run or inspect `git diff BASE_BRANCH...HEAD` locally.
3. Summarize changed files and key risks.
4. Update `diff-analysis.md`.
5. Report all changed markdown files under `Markdown Files Changed`.

