# review-comments-create Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Create review comments from local diff analysis.

## When To Use

Use after `review-diff-analysis` has identified findings and risks.

## Required Parameters

- review id in `STP-XXXX` format
- diff-analysis path
- findings to convert into comments
- severity or priority for each finding

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/review-comments-create.skill.md`
3. Active workspace: `docs/ai/reviews/STP-XXXX/*`
4. repo-context routing docs only if needed:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files referenced by diff-analysis findings, only if needed

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/04-en-pr-comments.md`
- `docs/ai/reviews/STP-XXXX/05-fa-pr-suggestions.md`

## English PR Comments

Create English PR comments in `04-en-pr-comments.md`.

Each comment must have:

- PR.No, such as `PR-001`
- Status
- Severity
- English PR-ready comment
- Suggested fix summary

Allowed status values:

- `Planned`
- `Done`
- `Ignore`

## Persian Deep Suggestions

Create Persian deep suggestions in `05-fa-pr-suggestions.md`.

Each Persian suggestion must link to the English comment by `PR.No`.

Each Persian suggestion must include:

- PR.No
- Deep Persian reasoning
- Suggested fixes
- Pseudo-code
- Alternative solutions
- Personal notes
- Whether to post or keep internal

## Required Rules

- Use local git diff analysis only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.
- Do not invent findings that are not supported by the diff.

## Execution Protocol

1. Read `03-diff-analysis.md`.
2. Create concise English PR comments.
3. Create Persian deep suggestions linked by `PR.No`.
4. Use only `Planned`, `Done`, or `Ignore` statuses.
5. Report all changed markdown files under `Markdown Files Changed`.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context
