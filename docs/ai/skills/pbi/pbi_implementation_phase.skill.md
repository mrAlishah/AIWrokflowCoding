# Skill: pbi_implementation_phase

## Purpose

Execute one planned PBI phase with the smallest practical change.

## Parameters

- `STP_ID`: required
- `PHASE`: required
- `TARGET_FILES`: required
- `VERIFICATION`: required

## Read

- `02-implementation-plan.md`
- `05-validation.md`
- `99-metrics.md`
- Selected `phases/*.md`
- Source or documentation files listed for the selected phase

## Steps

1. Confirm workspace and selected phase exist.
2. Read only the selected phase and approved target files.
3. Implement the phase with minimal files and lines.
4. Run requested or necessary verification.
5. Update phase execution memory.
6. Update the selected phase `Step` in `02-implementation-plan.md`.

## Update

- Approved target files listed in the selected phase
- Selected `phases/*.md`
- `02-implementation-plan.md` with `Step: implementation` or a versioned implementation step
- `05-validation.md` when validation needs, risks, or sign-off criteria change
- `99-metrics.md`
- `docs/ai/pbi/metrics.md`

## Stop Conditions

- Missing workspace, plan, validation file, metrics file, or selected phase.
- Target files are not approved by the phase.
- More than one phase would be executed.
- Scope expansion is required without approval.

## Final Output

- Summary
- Files changed
- Verification performed
- Risks or follow-up
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
