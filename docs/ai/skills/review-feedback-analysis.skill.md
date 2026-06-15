# Skill: review-feedback-analysis

## Purpose

Convert human post-PR/code review feedback into structured RF items inside an existing PBI workspace.

## Parameters

- `PBI_ID`: required
- `INPUT_MODE`: optional; `prompt`, `file`, or `existing-review-feedback`
- `REVIEW_FEEDBACK`: conditional when `INPUT_MODE: prompt`
- `SOURCE_LABEL`: optional
- `ANALYSIS_DEPTH`: optional
- `DEFAULT_STATUS`: optional, default `Proposed`

## Read

- `docs/ai/pbi/{PBI_ID}/02-implementation-plan.md`
- `docs/ai/pbi/{PBI_ID}/03-codebase-index.md`
- Existing `phases/review-feedback.md`, if present
- Human review feedback from the selected input mode

## Steps

1. Resolve workspace from `PBI_ID`.
2. Read existing review feedback, if present.
3. Group duplicate or overlapping comments.
4. Create one meaningful RF item per actionable feedback group.
5. Leave initial RF status as `Proposed`.
6. Update RF plan and routing only when known.

## Update

- `phases/review-feedback.md`
- `phases/RF-*.md`
- `02-implementation-plan.md`
- `03-codebase-index.md`
- `99-metrics.md`
- `docs/ai/pbi/metrics.md`

RF status values remain exactly: `Proposed`, `Required`, `Ignored`, `Done`, `Blocked`.

## Stop Conditions

- `PBI_ID` is missing or workspace does not exist.
- Feedback source is missing.
- The task asks to execute fixes, create a workspace, modify source code, or decide RF status automatically.

## Final Output

- Summary
- RF items created or updated
- Recommended user decisions
- Files updated
- Markdown Files Changed
- Recommended next prompt

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
