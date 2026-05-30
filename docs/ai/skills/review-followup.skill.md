# review-followup Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Check whether planned review comments were addressed after a branch changes.

## When To Use

Use after new local changes are available for a reviewed branch.

## Required Parameters

- review id in `STP-XXXX` format
- base branch
- current head
- existing `04-en-pr-comments.md`
- follow-up diff

## Required Command

Use local git diff only:

```text
git diff BASE_BRANCH...HEAD
```

## Context Read Order

1. `docs/ai/skills/README.md`
2. `docs/ai/skills/review-followup.skill.md`
3. Active workspace: `docs/ai/reviews/STP-XXXX/*`
4. repo-context routing docs only if needed:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files needed to verify `Planned` comments

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/04-en-pr-comments.md`
- `docs/ai/reviews/STP-XXXX/05-fa-pr-suggestions.md`
- `docs/ai/reviews/STP-XXXX/06-followup-log.md`
- `docs/ai/reviews/STP-XXXX/03-diff-analysis.md` if follow-up analysis must be recorded

## Follow-Up Rules

- Use only these status values: `Planned`, `Done`, `Ignore`.
- Check only comments with status `Planned`.
- Only `Planned` items require follow-up.
- Mark a planned comment `Done` only when the fix is confirmed in the local diff.
- Keep `Planned` when the issue remains.
- Use `Ignore` only when the comment is no longer relevant and record why.
- `Done` items must not be rechecked unless explicitly requested.
- `Ignore` items must not be rechecked.
- Create follow-up comments only when needed.
- If a fix is incomplete, create a follow-up item like `PR-001.1` and reference the parent `PR.No`.

## Required Rules

- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.

## Execution Protocol

1. Read existing `04-en-pr-comments.md`.
2. Identify only `Planned` comments.
3. Inspect the local follow-up diff.
4. Mark fixed comments as `Done`.
5. Add `PR-001.1` style follow-up comments when needed.
6. Update `06-followup-log.md`.
7. Report all changed markdown files under `Markdown Files Changed`.
