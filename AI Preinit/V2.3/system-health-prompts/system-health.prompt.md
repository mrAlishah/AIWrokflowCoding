# Prompt — Run System Health Check After AI OS Update

Use skill: `tools_system_health_check`

## Parameters

```text
CHECK_SCOPE: full
CHECK_COMPATIBILITY: true
REPORT_MODE: latest-and-history
ANALYSIS_DEPTH: deep
```

## Task

Run a full health check for the V2 AI Operating System after the latest `docs/ai` update or refactor.

Validate that the system is still cohesive, executable, low-token, backward-compatible, and aligned with current V2 priorities.

## Required Report Output

Write the latest report to:

```text
docs/ai/reference/system-health/latest.md
```

Also write a dated history copy to:

```text
docs/ai/reference/system-health/history/YYYY-MM-DD.md
```

## Validation Focus

Check:

- runtime read path
- file and skill dependency correctness
- skill routing
- naming consistency
- workflow cohesion
- system logic cohesion
- governance ownership
- policy ownership
- repo-context ownership
- PBI workflow logic
- review workflow logic
- PR review workflow logic
- validation and metrics structure
- output structure consistency
- duplicated rules
- stale references
- broken references
- orphaned files
- token/context cost risks
- context efficiency metrics
- backward compatibility
- foundation/archive status
- system priorities alignment
- skill quality
- prompt quality
- improvement opportunities

## Current System Priorities

Validate alignment with:

```text
Simplicity > Flexibility
Minimal Prompts > Rich Workflow
Quality First
Low Token Cost
Agent Neutral
```

## Finding Classification

Every finding must include:

```text
Type:
- required
- optional
- information
```

Severity:

```text
Low
Medium
High
Critical
```

## Important Rules

Do not modify source code.

Do not estimate exact tokens.

Do not estimate dollar cost.

Do not add external telemetry.

Do not change workflow behavior.

Do not rename skills.

Do not remove compatibility mappings.

Do not rewrite historical foundation/archive content.

Do not remove files.

Do not introduce V3 concepts.

This is audit and reporting only.

## Required Report Section

Include:

```markdown
## Context Efficiency Metrics

| Skill / Area | Expected Read Scope | Context Expansion Count | Estimated Read Cost | Efficiency Status | Recommendation |
| ------------ | ------------------- | ----------------------: | ------------------- | ----------------- | -------------- |
```

## Expected Status Logic

Use:

```text
Ready
```

when there are no required fixes.

Use:

```text
Needs Fix
```

when there are required fixes but runtime is not blocked.

Use:

```text
Blocked
```

when system execution, routing, ownership, or safety is broken.

## Final Response

Return exactly:

```markdown
## Summary

## Report Written

## Status

## Critical / High Findings

## Required Actions

## Optional Improvements

## Token Cost Suggestions

## Markdown Files Changed

| File Path | Action | Reason | Summary | Future AI Context Impact |
| --------- | ------ | ------ | ------- | ------------------------ |

## Recommended Next Step
```

## Markdown Files Changed

Report every markdown file created or updated.
