# review-final-handoff Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Summarize the final review decision for a coworker's branch.

## When To Use

Use after review comments and follow-up checks are complete.

## Required Parameters

- review id in `STP-XXXX` format
- final status of review comments
- remaining risks
- validation performed
- recommended decision

## Allowed File Scope

This skill may update only:

- `docs/ai/reviews/STP-XXXX/07-handoff.md`

## Handoff Content

Update `07-handoff.md` with:

- review summary
- final review decision
- blocking issues
- non-blocking issues
- resolved issues
- ignored issues
- comment status summary
- remaining planned comments, if any
- ignored comments and reasons, if any
- validation performed
- residual risks
- remaining risks
- next action
- ready to merge: Yes/No
- recommended reviewer focus

## Required Rules

- Use local review documents and local git context only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside `docs/ai/reviews/STP-XXXX/`.
- Do not mark unresolved planned comments as done.

## Execution Protocol

1. Read review comments, suggestions, follow-up log, and diff analysis.
2. Summarize the final state.
3. State the final review decision clearly.
4. Update `07-handoff.md`.
5. Report all changed markdown files under `Markdown Files Changed`.
