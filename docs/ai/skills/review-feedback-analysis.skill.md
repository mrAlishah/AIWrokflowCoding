# review-feedback-analysis Skill

This skill follows `common-skill-rules.md`.

Skill-specific rules are listed below.

## Purpose

Analyze human PR or code review comments received after a PBI implementation is complete and convert them into structured Review Feedback items inside the existing PBI workspace.

This skill is documentation-only. It prepares RF items for user decision and later `fix-phase` work.

## When To Use

- A PBI implementation is complete.
- A PR or equivalent code review exists.
- Human review comments need to be analyzed, grouped, and routed before fixes.

## When Not To Use

- Source code fixes.
- Implementation.
- Review execution.
- Creating a PBI workspace.
- Creating duplicate RF items for repeated comments.

## Preferred Invocation

```text
Use skill: review-feedback-analysis

Parameters:

PBI_ID:
STP-1234
```

## Optional Invocation With Direct Comments

```text
Use skill: review-feedback-analysis

Parameters:

PBI_ID:
STP-1234

INPUT_MODE:
prompt

REVIEW_FEEDBACK:
[paste human PR comments here]
```

## Parameters

| Parameter | Required | Options | Meaning |
| --- | --- | --- | --- |
| `PBI_ID` | Yes | `STP-XXXX` | Existing PBI workspace id |
| `INPUT_MODE` | Optional | `prompt`, `file`, `existing-review-feedback` | Where human review comments come from |
| `REVIEW_FEEDBACK` | Conditional | text | Required only when `INPUT_MODE: prompt` |
| `SOURCE_LABEL` | Optional | `human-review`, `team-lead`, `architect`, `qa`, `security` | Source of feedback |
| `ANALYSIS_DEPTH` | Optional | `light`, `normal`, `deep` | Depth of AI analysis |
| `DEFAULT_STATUS` | Optional | `Proposed` | Initial status for new RF items |

Default values:

```text
INPUT_MODE: existing-review-feedback
SOURCE_LABEL: human-review
ANALYSIS_DEPTH: normal
DEFAULT_STATUS: Proposed
```

## Workspace Resolution

From `PBI_ID`, resolve:

```text
docs/ai/pbi/{PBI_ID}/
docs/ai/pbi/{PBI_ID}/phases/review-feedback.md
docs/ai/pbi/{PBI_ID}/02-implementation-plan.md
docs/ai/pbi/{PBI_ID}/03-codebase-index.md
docs/ai/pbi/{PBI_ID}/99-metrics.md
```

Do not ask the user for these paths.

## Allowed File Scope

This skill may create or update only:

- `docs/ai/pbi/{PBI_ID}/phases/review-feedback.md`
- `docs/ai/pbi/{PBI_ID}/phases/RF-*.md`
- `docs/ai/pbi/{PBI_ID}/02-implementation-plan.md`
- `docs/ai/pbi/{PBI_ID}/03-codebase-index.md`
- `docs/ai/pbi/{PBI_ID}/99-metrics.md`
- `docs/ai/pbi/metrics.md`

Update `03-codebase-index.md` only when RF routing, affected files, modules, functions, validation focus, or review focus are known.

## RF Status Values

Use exactly:

- `Proposed`
- `Required`
- `Ignored`
- `Done`
- `Blocked`

Status definitions:

| Status | Meaning |
| --- | --- |
| `Proposed` | AI analyzed the feedback, but the user has not approved action |
| `Required` | User approved the RF for fixing |
| `Ignored` | User decided not to act on this RF |
| `Done` | Fix is completed and verified |
| `Blocked` | More information or decision is needed |

## Required Behavior

1. Confirm `PBI_ID` is present and the PBI workspace exists.
2. Resolve workspace files from `PBI_ID`.
3. Read existing `review-feedback.md` if it exists.
4. Read or receive human review comments according to `INPUT_MODE`.
5. Group duplicate or overlapping comments into one meaningful RF item.
6. Create or update `review-feedback.md`.
7. Create one phase-style RF file per meaningful feedback item.
8. Add or update `Post-PR Review Feedback Plan` in `02-implementation-plan.md`.
9. Update `03-codebase-index.md` only when routing details are known.
10. Leave all initial RF statuses as `Proposed`.
11. Append execution metrics to `99-metrics.md`.
12. Update `docs/ai/pbi/metrics.md`.

## review-feedback.md Required Format

```md
# Review Feedback

## Purpose

Tracks human PR/code review feedback for this PBI after PR creation.

## Status Values

- Proposed
- Required
- Ignored
- Done
- Blocked

## RF Index

| RF ID | Title | Status | Source | RF File | Severity | Recommended Action |
|---|---|---|---|---|---|---|

## RF Items

### RF-001

Title:
[short title]

Status:
Proposed

Source:
human-review

Original Comment:
[original reviewer comment]

AI Interpretation:
[what the AI thinks the reviewer means]

Recommended Action:
[Required / Ignored / Needs user decision]

RF File:
RF-001-short-title.md
```

## RF File Required Format

Each RF file must be a phase-style file with plan and execution memory:

```md
# RF-001 - Short Title

## Metadata

RF_ID:
RF-001

Status:
Proposed

Source:
human-review

Related PBI:
STP-XXXX

## Original Review Comment

...

## AI Interpretation

...

## Validity Assessment

Is this valid?
Yes / No / Partially / Needs user decision

Reason:
...

## Severity

Blocking / Important / Minor / Question

## Suggested Action

...

## Affected Areas

## Affected Files

## Affected Functions

## Validation Plan

## Risk If Ignored

## User Decision

Status:
Proposed

Decision Notes:

## Fix Plan

Only used if Status becomes Required.

## Execution Memory

Actual Changed Files:

Validation Result:

Remaining Risks:

Final Status:
```

## Important Rules

- Initial RF status must be `Proposed`.
- AI must not decide to fix automatically.
- User must change RF status to `Required` before `fix-phase` can act.
- Do not modify previous completed implementation phases unless a specific RF requires updating their execution memory.
- Do not create unnecessary RF files for duplicate or non-actionable comments.
- If multiple comments describe the same issue, group them into one RF item.
- Do not modify source code.

## Expected Output

1. Summary
2. RF items created or updated
3. Recommended user decisions
4. Files updated
5. Markdown Files Changed
6. Recommended next prompt
