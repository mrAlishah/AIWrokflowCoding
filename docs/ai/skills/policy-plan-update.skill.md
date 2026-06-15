# Skill: policy-plan-update

## Purpose

Synchronize tagged user answers, RF status changes, or approved policy changes into related planning and governance files.

## Parameters

- `SCOPE`: required; `pbi`, `review`, `repo-context`, or `global`
- `STP_ID`: required for workspace updates
- `INPUT_TAG`: required
- `UPDATE_MODE`: conditional
- `USER_INPUT`: required

## Read

- Active workspace files resolved from `STP_ID`
- Existing RF files when `INPUT_TAG: USER_REVIEW_FEEDBACK`
- Policy files when `INPUT_TAG: USER_CODE_POLICY`

## Steps

1. Resolve scope and workspace from stable identifiers.
2. Classify the tagged input.
3. Update only related planning, routing, RF, or approved policy files.
4. Preserve PBI ownership boundaries.
5. For global code policy, register the canonical policy under repo-context policy files.

## Update

Depending on scope:

- PBI planning files
- Review feedback files
- `docs/ai/repo-context/code-policies.md`
- `docs/ai/repo-context/coding_standards.md`
- Related skill guidance only when the policy affects coding conventions

## Stop Conditions

- `SCOPE` or `INPUT_TAG` is missing.
- Related workspace cannot be resolved.
- The task asks for implementation, review execution, source changes, broad refactor, or unapproved repo-context updates.

## Final Output

- Summary
- Files updated
- Conflicts found
- Markdown Files Changed
- Recommended next action

## References

Follow:
- `docs/ai/governance/common-rules.md`
- `docs/ai/governance/context-efficiency.md`
- `docs/ai/governance/markdown-reporting.md`
