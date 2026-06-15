# Skill: pbi-final-handoff

## Purpose

Create the final PBI handoff after implementation, review, and fixes are complete.

## Parameters

- `STP_ID`: required
- `CHANGED_FILES`: required
- `VALIDATION_RESULTS`: required
- `KNOWN_RISKS`: optional
- `PR_SUMMARY`: required
- `REVIEW_FOCUS`: required

## Read

- `00-approved-pbi.md`
- `02-implementation-plan.md`
- `05-validation.md`
- `99-metrics.md`
- Relevant phase files
- Verification results
- Final diff summary

## Steps

1. Confirm implementation and fixes are complete or identify remaining work.
2. Summarize changed files, validation, risks, PR summary, and review focus.
3. Update completed phase `Step` values.
4. Update handoff.

## Update

- `02-implementation-plan.md` with `Step: handoff` or final `Step: done`
- `06-handoff.md`
- `99-metrics.md`
- `docs/ai/pbi/metrics.md`

## Stop Conditions

- Required implementation or fixes are incomplete and not documented.
- Verification results are missing or unclear.
- The request asks for new implementation, review, fix work, source changes, or repo-context updates.

## Final Output

- Summary
- Changed files
- Validation performed and not performed
- Known risks
- PR summary
- Markdown Files Changed
- Recommended next action

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
