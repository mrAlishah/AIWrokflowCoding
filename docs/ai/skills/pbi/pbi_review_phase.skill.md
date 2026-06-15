# Skill: pbi_review_phase

## Purpose

Review implemented PBI work before fixes, or verify one post-PR review feedback fix.

## Parameters

- `STP_ID` or `PBI_ID`: required
- `PHASE` or `RF_ID`: required
- `DIFF_OR_CHANGED_FILES`: required unless `RF_ID` resolves the scope
- `REVIEW_MODE`: optional

## Read

- Relevant PBI workspace files
- `05-validation.md`
- `99-metrics.md`
- Relevant phase or RF file
- Implementation diff and necessary changed files

## Steps

1. Resolve the phase or RF scope.
2. Inspect only changed behavior and necessary surrounding context.
3. Check correctness, scope, architecture, conventions, code policy, comments, validation, and regressions.
4. Record findings or state clearly when no issues are found.
5. Update the reviewed phase `Step` in `02-implementation-plan.md`.

## Update

- PBI review notes when durable review memory is needed
- `02-implementation-plan.md` with `Step: review` or a versioned review step
- `05-validation.md` when review changes validation requirements or risks
- `99-metrics.md`
- `docs/ai/pbi/metrics.md`

## Stop Conditions

- Review scope is unclear.
- Required diff or files are unavailable.
- The review would require source modification without explicit user request.
- Scope expansion is required without approval.

## Final Output

- Findings first, ordered by severity
- No-issues statement when applicable
- Validation gaps
- Markdown Files Changed
- Recommended next skill

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
