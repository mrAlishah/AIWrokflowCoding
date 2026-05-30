# review-followup Skill

## Purpose

Check whether planned review comments were addressed after a branch changes.

## When To Use

Use after new local changes are available for a reviewed branch.

## Required Parameters

- review id in `STP-XXXX` format
- base branch
- current head
- existing `en_pr_comments.md`
- follow-up diff

## Required Command

Use local git diff only:

```text
git diff BASE_BRANCH...HEAD
```

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/en_pr_comments.md`
- `docs/ai/reviews/STP-XXXX/fa_pr_suggestions.md`
- `docs/ai/reviews/STP-XXXX/followup-log.md`
- `docs/ai/reviews/STP-XXXX/diff-analysis.md` if follow-up analysis must be recorded

## Follow-Up Rules

- Check only comments with status `Planned`.
- Mark a planned comment `Done` only when the fix is confirmed in the local diff.
- Keep `Planned` when the issue remains.
- Use `Ignore` only when the comment is no longer relevant and record why.
- Create follow-up comments only when needed.
- Follow-up comment numbers must use the parent number style, such as `PR-001.1`.

## Required Rules

- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.

## Execution Protocol

1. Read existing `en_pr_comments.md`.
2. Identify only `Planned` comments.
3. Inspect the local follow-up diff.
4. Mark fixed comments as `Done`.
5. Add `PR-001.1` style follow-up comments when needed.
6. Update `followup-log.md`.
7. Report all changed markdown files under `Markdown Files Changed`.

