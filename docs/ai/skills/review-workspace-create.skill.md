# review-workspace-create Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

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
- `docs/ai/reviews/metrics.md`

## Required Workspace Structure

Create:

```text
docs/ai/reviews/STP-XXXX/
  01-review-brief.md
  02-context.md
  03-diff-analysis.md
  04-en-pr-comments.md
  05-fa-pr-suggestions.md
  06-followup-log.md
  07-handoff.md
  99-metrics.md
```

## Required Rules

- Use local git only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Do not update files outside the review workspace except `docs/ai/reviews/metrics.md`.

## File Templates

- `01-review-brief.md`: review contract, branch, base, scope, title, and description
- `02-context.md`: review-specific context
- `03-diff-analysis.md`: local diff analysis
- `04-en-pr-comments.md`: English PR-ready comments only
- `05-fa-pr-suggestions.md`: Persian reasoning, suggested fixes, pseudo-code, alternatives, and personal notes
- `06-followup-log.md`: follow-up status tracking
- `07-handoff.md`: final review summary and decision
- `99-metrics.md`: review-local execution metrics

## `99-metrics.md` Template

```markdown
# Execution Metrics

| Timestamp | Agent | Skill | Phase | Duration (min) | Prompts | Files Read | Source Files Reviewed | Markdown Files Changed | Context Expansions | Context Size | Context Efficiency Ratio | Cost | Scope Violations |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|---:|---|---|

## Execution Details

### <Timestamp>

#### Files Read

- ...

#### Source Files Reviewed

- ...

#### Markdown Files Changed

- ...

#### Extra Files Requested

- ...

Reason:

...
```

The review context efficiency ratio is:

```text
Source Files Reviewed / Files Read
```

## Execution Protocol

1. Confirm the review id is in `STP-XXXX` format.
2. Create the review workspace and required files.
3. Record base branch, head branch, and review scope.
4. Add placeholders only.
5. Append execution metrics to `99-metrics.md` with phase `N/A`.
6. Update `docs/ai/reviews/metrics.md`.
7. Report all changed markdown files under `Markdown Files Changed`.
