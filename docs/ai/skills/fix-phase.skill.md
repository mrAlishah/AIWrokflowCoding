# Skill: fix-phase

## Purpose

Apply targeted fixes for approved review findings or Required RF items.

## Parameters

- `STP_ID` or `PBI_ID`: required
- `FINDINGS` or `RF_ID`: required
- `TARGET_FILES`: required unless resolved from RF
- `VERIFICATION`: required

## Read

- Review findings or RF file
- Relevant phase file
- `05-validation.md`
- `99-metrics.md`
- Only files needed to fix approved findings

## Steps

1. Confirm findings are approved for fixing.
2. For `RF_ID`, proceed only when status is `Required`.
3. Apply minimal targeted fixes.
4. Run requested or necessary verification.
5. Update phase or review memory.
6. Update the fixed phase `Step` in `02-implementation-plan.md`.

## Update

- Files directly required for approved fixes
- Relevant phase or RF file
- `02-implementation-plan.md` with `Step: fix` or a versioned fix step
- `05-validation.md` when validation requirements, risks, or sign-off criteria change
- `99-metrics.md`
- `docs/ai/pbi/metrics.md`

## Stop Conditions

- RF status is not `Required`.
- Fix target is unclear.
- The fix would add unrelated behavior or cleanup.
- Scope expansion is required without approval.

## Final Output

- Summary
- Fixes applied
- Verification performed
- Remaining risks
- Markdown Files Changed
- Recommended next skill

## References

Follow:
- `docs/ai/governance/common-rules.md`
- `docs/ai/governance/context-efficiency.md`
- `docs/ai/governance/markdown-reporting.md`
- `docs/ai/governance/observability.md`
