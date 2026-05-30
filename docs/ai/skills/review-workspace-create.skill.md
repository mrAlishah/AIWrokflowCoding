# review-workspace-create Skill

## Purpose

Create the standard documentation workspace for reviewing a coworker's branch.

## When To Use

Use at the start of a PR or code review workflow before diff analysis.

## Required Parameters

- review id in `STP-XXXX` format
- base branch
- head branch or current branch
- review request summary

## Allowed File Scope

This skill may create or update only:

- `docs/ai/reviews/STP-XXXX/*`

## Required Workspace Structure

Create:

```text
docs/ai/reviews/STP-XXXX/
  review-brief.md
  context.md
  diff-analysis.md
  en_pr_comments.md
  fa_pr_suggestions.md
  followup-log.md
  handoff.md
```

## Required Rules

- Use local git only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside the review workspace.

## File Templates

- `review-brief.md`: review id, branches, request summary, scope
- `context.md`: local context and assumptions
- `diff-analysis.md`: placeholder for diff findings
- `en_pr_comments.md`: English PR comments with status values
- `fa_pr_suggestions.md`: Persian deep suggestions linked by PR.No
- `followup-log.md`: follow-up checks and comment history
- `handoff.md`: final review decision placeholder

## Execution Protocol

1. Confirm the review id is in `STP-XXXX` format.
2. Create the review workspace and required files.
3. Record base branch, head branch, and review scope.
4. Add placeholders only.
5. Report all changed markdown files under `Markdown Files Changed`.

