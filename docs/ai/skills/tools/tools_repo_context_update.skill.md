# Skill: tools_repo_context_update

## Purpose

Refresh reusable repository knowledge under `docs/ai/repo-context/`.

## Parameters

- `UPDATE_REASON`: required
- `REPOSITORY_AREAS`: required
- `INSPECTION_SCOPE`: optional

## Read

- Existing relevant repo-context files
- Targeted repository files needed to refresh stable knowledge

## Steps

1. Confirm the user explicitly invoked `tools_repo_context_update`.
2. Read current repo-context before source inspection.
3. Inspect only targeted repository areas.
4. Update stable reusable knowledge.
5. Keep entries concise.

## Update

- Relevant files under `docs/ai/repo-context/*`, including `docs/ai/repo-context/policy/*`

## Stop Conditions

- The update was not explicitly requested.
- Required repository area is unclear.
- The task requires source modification or non repo-context file updates.
- Broad repository inspection is requested without a concrete update reason.

## Final Output

- Summary
- Repo-context files updated
- Source areas inspected
- Markdown Files Changed
- Recommended next action

## References

Follow:
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
