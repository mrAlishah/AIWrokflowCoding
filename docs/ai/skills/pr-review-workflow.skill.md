# pr-review-workflow Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Provide the recommended daily-use entrypoint for local PR or code review.

This skill orchestrates the existing review workflow internally while preserving local git diff review, review workspace files, English PR-ready comments, Persian/internal suggestions, final handoff, and review-only source code safety.

It reduces daily prompt count. It does not replace or remove the lower-level review skills.

## When To Use

Use when the user wants an end-to-end local PR/code review in one request.

The user must manually check out the review branch before running this skill.

Use lower-level review skills for follow-up, debugging, specialized review, partial re-run, or when the user wants only one review step.

## Required Parameters

```yaml
STP_ID: required
BASE_BRANCH: required
CURRENT_BRANCH: optional, default auto
REVIEW_SCOPE: required
REVIEW_MODE: optional, default strict
COMMENT_LEVEL: optional, default important-only
COMMENT_STYLE: optional, default collaborative
SUGGESTION_DEPTH: optional, default normal
FINAL_DECISION: optional, default needs-followup
```

Allowed `REVIEW_SCOPE` values:

```text
full
backend-only
frontend-only
tests-only
security-sensitive
architecture-sensitive
```

## Existing Skill Mapping

This repository uses the existing `review-*` skill names.

Map orchestrator steps to existing skills:

| Orchestrator Step | Existing Skill |
| --- | --- |
| Create or verify workspace | `review-workspace-create` |
| Analyze local git diff | `review-diff-analysis` |
| Generate structured review findings | `review-diff-analysis` |
| Generate English PR-ready comments | `review-comments-create` |
| Generate Persian/internal suggestions | `review-comments-create` |
| Generate final review handoff | `review-final-handoff` |

Do not rename existing review files or skills.

## Workspace

Use the existing review workspace:

```text
docs/ai/reviews/{STP_ID}/
```

Preserve the current repository naming convention:

```text
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
99-metrics.md
```

## Allowed File Scope

This skill may create or update only:

- `docs/ai/reviews/{STP_ID}/*`
- `docs/ai/reviews/metrics.md`

It must not modify source code.
It must not update repo-context.
It must not update PBI workspaces.

## Local Git Rule

Use local git only.

Required diff sources:

```text
git diff --name-only {BASE_BRANCH}...HEAD
git diff {BASE_BRANCH}...HEAD
```

Do not:

- call external PR APIs
- create pull requests
- push commits
- modify source code during review-only work

## Context Efficiency Rules

- Start from changed files.
- Read local git diff before reading full files.
- Use repo-context only as routing or context support.
- Avoid reading all `docs/ai`.
- Avoid reading all source files.
- Justify extra file reads outside the initial review scope.
- Preserve review quality over context minimization.

Before reading extra files, state:

```text
Requested File:
Reason:
Expected Decision Impact:
```

## Output Separation

Preserve strict separation:

```text
English PR-ready comments -> 04-en-pr-comments.md
Persian/internal suggestions -> 05-fa-pr-suggestions.md
```

English PR comments must be concise, actionable, and ready to paste into the PR.

Persian/internal suggestions may include deeper reasoning, suggested fixes, pseudo-code, alternatives, and personal notes.

Do not mix Persian internal explanations into PR-ready English comments.

## ObsV1.1 Compatibility

When ObsV1.1 files exist, update:

```text
docs/ai/reviews/{STP_ID}/99-metrics.md
docs/ai/reviews/metrics.md
```

Review context efficiency ratio:

```text
Source Files Reviewed / Files Read
```

Use estimated metrics only. Do not add exact token tracking, external telemetry, non-markdown dashboards, confidence scores, trust metrics, self-correction loops, or autonomous optimization.

## Internal Workflow

Execute or coordinate these logical steps:

1. Create or verify review workspace.
2. Analyze local git diff.
3. Generate structured review findings.
4. Generate English PR-ready comments.
5. Generate Persian/internal suggestions.
6. Generate final review handoff.
7. Append execution metrics to `99-metrics.md`.
8. Update `docs/ai/reviews/metrics.md`.

The orchestrator may perform these steps in one run, but it must preserve the lower-level workflow boundaries and output files.

## Final Response Format

The final response must include:

```markdown
# Summary

# Review Workspace

# Diff Analyzed

# Findings Summary

# PR Comments Location

# Internal Suggestions Location

# Final Decision

# Markdown Files Changed

# Usage Summary

- Files Read:
- Files Changed:
- Extra Files Requested:
- Reason:
- Context Size: small | medium | large
- Scope Violations: yes | no

# Recommended Next Action
```

If ObsV1.1 metrics are updated, also include:

```markdown
# Metrics Updated

- Local Metrics:
- Central Metrics:
- Context Efficiency Ratio:
```

## Forbidden Actions

- Do not modify source code.
- Do not call external PR APIs.
- Do not create pull requests.
- Do not push commits.
- Do not remove or rename lower-level review skills.
- Do not introduce hard token limits.
- Do not introduce advanced observability.
- Do not introduce V3 Harness Engineering features.

## Execution Protocol

1. Validate `STP_ID`, `BASE_BRANCH`, and `REVIEW_SCOPE`.
2. Confirm the user has checked out the review branch.
3. Create or verify `docs/ai/reviews/{STP_ID}/` with the existing review file names.
4. Run or inspect local git diff only.
5. Analyze changed files and review risks.
6. Update `03-diff-analysis.md`.
7. Create English PR-ready comments in `04-en-pr-comments.md`.
8. Create Persian/internal suggestions in `05-fa-pr-suggestions.md`.
9. Update `07-handoff.md`.
10. Append execution metrics to `99-metrics.md`.
11. Update `docs/ai/reviews/metrics.md`.
12. Return the required final response format.
