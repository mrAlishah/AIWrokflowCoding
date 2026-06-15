# Skill: pbi_workspace_create

## Purpose

Create the standard PBI workspace structure after clarification.

## Parameters

- `STP_ID`: required
- `TITLE`: required
- `APPROVED_PBI`: required or already present in `00-approved-pbi.md`
- `REQUESTER`: optional

## Read

- `docs/ai/pbi/{STP_ID}/00-approved-pbi.md`, if already created

## Steps

1. Confirm `STP_ID` format.
2. Stop if `00-approved-pbi.md` contains `STATUS: BLOCKED_FOR_CLARIFICATION`.
3. Create the PBI workspace files and folders.
4. Preserve the approved PBI in `00-approved-pbi.md`.
5. Add placeholders only.

## Update

Create or update:

- `00-approved-pbi.md`
- `01-context.md`
- `02-implementation-plan.md`
- `03-codebase-index.md`
- `04-decision_log.md`
- `05-validation.md`
- `06-handoff.md`
- `99-metrics.md`
- `phases/`
- `knowledge/` only when needed
- `docs/ai/pbi/metrics.md`

`02-implementation-plan.md` phase table:

```markdown
| Phase | Status | Step | Goal |
|---|---|---|---|
```

## Stop Conditions

- Invalid `STP_ID`.
- Clarification is blocked.
- The request requires planning, source inspection, implementation, or repo-context updates.

## Final Output

- Summary
- Workspace path
- Files created or updated
- Markdown Files Changed
- Recommended next skill

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
