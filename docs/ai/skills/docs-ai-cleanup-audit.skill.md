# Skill: docs-ai-cleanup-audit

## Purpose

Audit `docs/ai` for cleanup, duplicated governance, stale content, context cost risk, and archive/delete candidates.

## Parameters

- `CLEANUP_SCOPE`: required
- `CLEANUP_MODE`: required; audit-only unless explicitly approved otherwise
- `TARGET_AREA`: required
- `MAX_INSPECTION_DEPTH`: optional
- `INCLUDE_DONE_WORKSPACES`: optional
- `OUTPUT_MODE`: required
- `ALLOW_MARKDOWN_UPDATES`: optional

## Read

- Targeted `docs/ai` areas within the requested audit scope
- Governance and routing files needed to classify findings

## Steps

1. Confirm audit scope and mode.
2. Identify duplicated rules, stale docs, naming drift, workspace artifacts, and context-cost risks.
3. Recommend keep, merge, archive, or delete actions.
4. Do not execute destructive cleanup unless a separate approved cleanup task permits it.

## Update

- Cleanup report or cleanup plan under `docs/ai/foundation/`
- `docs/ai/skills/README.md` only when registering or routing the skill itself

## Stop Conditions

- Scope is unclear.
- The task asks to delete, archive, rename, rewrite governance, update repo-context content, create workspaces, or modify source code.
- The cleanup would change active workflow behavior.

## Final Output

- Summary
- Files audited
- Duplications found
- Cleanup recommendations
- Markdown Files Changed
- Recommended next action

## References

Follow:
- `docs/ai/governance/common-rules.md`
- `docs/ai/governance/context-efficiency.md`
- `docs/ai/governance/markdown-reporting.md`
