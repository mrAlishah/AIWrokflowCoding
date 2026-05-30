# review-comments-create Skill

## Purpose

Create review comments from local diff analysis.

## When To Use

Use after `review-diff-analysis` has identified findings and risks.

## Required Parameters

- review id in `STP-XXXX` format
- diff-analysis path
- findings to convert into comments
- severity or priority for each finding

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/en_pr_comments.md`
- `docs/ai/reviews/STP-XXXX/fa_pr_suggestions.md`

## English PR Comments

Create English PR comments in `en_pr_comments.md`.

Each comment must have:

- PR.No, such as `PR-001`
- Status
- File or area
- Finding
- Suggested change
- Reason

Allowed status values:

- `Planned`
- `Done`
- `Ignore`

## Persian Deep Suggestions

Create Persian deep suggestions in `fa_pr_suggestions.md`.

Each Persian suggestion must link to the English comment by `PR.No`.

## Required Rules

- Use local git diff analysis only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.
- Do not invent findings that are not supported by the diff.

## Execution Protocol

1. Read `diff-analysis.md`.
2. Create concise English PR comments.
3. Create Persian deep suggestions linked by `PR.No`.
4. Use only `Planned`, `Done`, or `Ignore` statuses.
5. Report all changed markdown files under `Markdown Files Changed`.

