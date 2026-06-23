# Skill: pbi_plan_create

## Purpose

Create a scoped implementation plan, task context, validation requirements, phase files, and task-specific codebase navigation.

## Parameters

- `STP_ID`: required
- `ACCEPTANCE_CRITERIA`: required
- `CONSTRAINTS`: optional
- `PLANNING_SCOPE`: required

## Read

- `00-approved-pbi.md`
- `05-validation.md`
- `99-metrics.md`
- Relevant repo-context routing files
- Targeted source files only when repo-context is insufficient

## Steps

1. Confirm workspace exists.
2. Stop if `00-approved-pbi.md` contains `STATUS: BLOCKED_FOR_CLARIFICATION`.
3. Read repo-context before source inspection.
4. Build a concise plan.
5. Create phase files as plan plus execution memory.
6. Define validation requirements.
7. Record decisions only when real architecture, domain, or design decisions exist.

## Update

- `01-context.md`
- `02-implementation-plan.md`
- `03-codebase-index.md`
- `04-decision_log.md` only when decisions exist
- `05-validation.md`
- `99-metrics.md`
- `phases/*.md`
- `knowledge/*` only when needed
- `docs/ai/pbi/metrics.md`

`02-implementation-plan.md` phase table:

```markdown
| Phase | Status | Step | Goal |
|---|---|---|---|
```

Initial `Step` values use `planned` unless a later workflow step is already known.

## Stop Conditions

- Missing workspace or approved PBI.
- Critical PBI information is still unclear.
- Planning requires broad source inspection or repo-context updates.
- Source changes are requested.

## Final Output

- Summary
- Plan status
- Phase list
- Validation summary
- Markdown Files Changed
- Metrics Updated: Yes / No / Not Applicable when enabled by runtime config; if No, include reason.
- Recommended next skill

## References

Follow canonical governance and policy:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/repo-context/policy/context_budget.md`
