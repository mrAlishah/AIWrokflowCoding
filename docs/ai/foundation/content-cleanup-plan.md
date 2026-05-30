# Content Cleanup Plan

## Summary

This plan classifies current `docs/ai/` files by operational role so future cleanup can reduce daily context cost without losing governance, shared memory, or audit value.

Primary cleanup direction:

- Keep daily agent routing small.
- Keep active governance explicit.
- Preserve audit/history unless it becomes clearly redundant.
- Prefer archive or merge before delete.
- Do not treat repo-context placeholders as daily runtime files.
- Do not delete repo-context placeholder files during cleanup.

## Classification Rules

- Active Runtime: needed in normal daily workflow.
- Active Governance: current operating rule, validation source, or naming source.
- Reference: useful when relevant, but not daily routing.
- Audit / History: records past corrections, validation, or naming decisions.
- Candidate For Merge: overlaps with another active file and can be consolidated later.
- Candidate For Delete: low-value duplicate with no audit or runtime value.

## File Classification

| File path | Current role | Used by agents daily? | Can be merged? | Can be archived? | Can be deleted? | Risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `docs/ai/README.md` | Reference | Yes | Yes | No | No | Medium: entry rules and shared memory summary may be duplicated elsewhere. | Keep. Consider linking to a single daily entry point when available. |
| `docs/ai/foundation/README.md` | Reference | No | Yes | No | No | Low: small index file. | Keep and update later to separate active governance from audit/history. |
| `docs/ai/foundation/v2-approved-baseline.md` | Active Governance | Yes | No | No | No | High: source of approved V2 rules. | Keep as primary governance source. |
| `docs/ai/foundation/v2-validation-checklist.md` | Active Governance | No | No | Yes | No | Medium: current validation status is useful but not daily runtime. | Keep as current validation status; do not read during normal PBI/review work. |
| `docs/ai/foundation/v2-governance-corrections.md` | Audit / History | No | Yes | Yes | No | Low: historical correction record. | Keep for audit or later move to archive. |
| `docs/ai/foundation/v2-workspace-naming.md` | Active Governance | No | Yes | No | No | Medium: official workspace naming must stay aligned with skills. | Keep as the current naming reference. |
| `docs/ai/foundation/content-cleanup-plan.md` | Audit / History | No | Yes | Yes | No | Low: planning artifact for cleanup. | Keep until cleanup is complete; archive later. |
| `docs/ai/pbi/README.md` | Reference | Sometimes | Yes | No | No | Medium: explains PBI workflow and file meanings. | Keep; daily routing should point here only when PBI workflow context is needed. |
| `docs/ai/reviews/README.md` | Reference | Sometimes | Yes | No | No | Medium: explains coworker review workflow and file meanings. | Keep; daily routing should point here only when review workflow context is needed. |
| `docs/ai/repo-context/README.md` | Reference | Sometimes | No | No | No | Medium: ownership and file map for repo-context. | Keep. |
| `docs/ai/repo-context/architecture.md` | Reference | No | No | No | No | Medium: should become useful reusable architecture memory. | Keep; populate only via `repo-context-update`. |
| `docs/ai/repo-context/module_map.md` | Reference | Sometimes | No | No | No | Medium: routing value for low token cost. | Keep; populate via `repo-context-update`. |
| `docs/ai/repo-context/file_index.md` | Reference | Sometimes | No | No | No | Medium: routing value for low token cost. | Keep; populate via `repo-context-update`. |
| `docs/ai/repo-context/codebase-index.md` | Reference | Sometimes | Yes | No | No | Medium: overlaps conceptually with `file_index.md` and `module_map.md`. | Keep for now; later evaluate merge boundaries after real repo-context population. |
| `docs/ai/repo-context/domain_glossary.md` | Reference | No | Yes | Yes | No | Low: currently optional placeholder until real domain terms exist. | Keep as optional; do not delete immediately. Consider merge only after repo-context is populated and validated. |
| `docs/ai/repo-context/coding_standards.md` | Reference | Sometimes | No | No | No | Medium: important for code quality. | Keep; populate via `repo-context-update`. |
| `docs/ai/repo-context/context_budget.md` | Reference | Sometimes | No | No | No | Medium: important for low token cost. | Keep. |
| `docs/ai/repo-context/test_strategy.md` | Reference | Sometimes | No | No | No | Medium: important for validation. | Keep; populate via `repo-context-update`. |
| `docs/ai/repo-context/workflow.md` | Reference | Sometimes | Yes | No | No | Medium: may overlap with `pbi/README.md`, `reviews/README.md`, and skills. | Keep for repository-specific workflow only; avoid duplicating generic V2 workflow. |
| `docs/ai/skills/README.md` | Active Runtime | Yes | No | No | No | High: central routing index. | Keep and keep short. |
| `docs/ai/skills/common-skill-rules.md` | Active Runtime | Yes | No | No | No | High: shared execution constraints. | Keep; use to reduce duplicated skill text later. |
| `docs/ai/skills/repo-context-update.skill.md` | Active Runtime | Sometimes | No | No | No | High: only repo-context writer. | Keep. |
| `docs/ai/skills/pbi-workspace-create.skill.md` | Active Runtime | Sometimes | No | No | No | High: creates PBI workspace. | Keep. |
| `docs/ai/skills/pbi-plan-create.skill.md` | Active Runtime | Sometimes | No | No | No | High: creates PBI plan and context. | Keep. |
| `docs/ai/skills/implementation-phase.skill.md` | Active Runtime | Sometimes | No | No | No | High: controls scoped implementation. | Keep. |
| `docs/ai/skills/review-phase.skill.md` | Active Runtime | Sometimes | No | No | No | High: PBI implementation review. | Keep. |
| `docs/ai/skills/fix-phase.skill.md` | Active Runtime | Sometimes | No | No | No | High: controls targeted fixes. | Keep. |
| `docs/ai/skills/pbi-final-handoff.skill.md` | Active Runtime | Sometimes | No | No | No | High: final PBI handoff. | Keep. |
| `docs/ai/skills/review-workspace-create.skill.md` | Active Runtime | Sometimes | No | No | No | High: creates review workspace. | Keep. |
| `docs/ai/skills/review-diff-analysis.skill.md` | Active Runtime | Sometimes | No | No | No | High: local diff analysis. | Keep. |
| `docs/ai/skills/review-comments-create.skill.md` | Active Runtime | Sometimes | No | No | No | High: creates review comments. | Keep. |
| `docs/ai/skills/review-followup.skill.md` | Active Runtime | Sometimes | No | No | No | High: tracks review follow-up. | Keep. |
| `docs/ai/skills/review-final-handoff.skill.md` | Active Runtime | Sometimes | No | No | No | High: final review decision. | Keep. |

## Key Cleanup Candidates

- `docs/ai/foundation/v2-governance-corrections.md`: archive later after baseline is stable.
- `docs/ai/foundation/v2-workspace-naming.md`: keep as the current official naming reference.
- `docs/ai/foundation/content-cleanup-plan.md`: archive after cleanup execution is complete.
- `docs/ai/repo-context/domain_glossary.md`: keep optional if empty; do not delete immediately.
- `docs/ai/repo-context/codebase-index.md`: review overlap with `module_map.md` and `file_index.md` after repo-context contains real data.
- `docs/ai/repo-context/workflow.md`: keep only repository-specific workflow details.

## Files That Must Not Be Deleted

- `docs/ai/foundation/v2-approved-baseline.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/common-skill-rules.md`
- all official `docs/ai/skills/*.skill.md` files
- `docs/ai/repo-context/README.md`
- `docs/ai/repo-context/architecture.md`
- `docs/ai/repo-context/module_map.md`
- `docs/ai/repo-context/file_index.md`
- `docs/ai/repo-context/codebase-index.md`
- `docs/ai/repo-context/coding_standards.md`
- `docs/ai/repo-context/context_budget.md`
- `docs/ai/repo-context/test_strategy.md`
- `docs/ai/repo-context/workflow.md`
- `docs/ai/pbi/README.md`
- `docs/ai/reviews/README.md`

## Noted Gap

`docs/ai/START_HERE.md` is not present in the current file inventory. If daily workflow simplicity remains the top priority, create or restore it as the first runtime entry point.

## Recommended Cleanup Order

1. Create or restore `docs/ai/START_HERE.md`.
2. Update `docs/ai/foundation/README.md` to label active governance vs audit/history.
3. Keep `docs/ai/skills/README.md` focused on routing only.
4. Use `docs/ai/skills/common-skill-rules.md` to reduce duplicated skill rules later.
5. Populate repo-context with real repository knowledge before merging repo-context files.
6. Archive history files only after validation confirms the active baseline covers their decisions.
