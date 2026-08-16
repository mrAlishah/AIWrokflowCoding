# Skills Index

Routing index for approved execution protocols.

Read this file to select one skill. Then read only the selected skill file.

Global rules live in `docs/ai/skills/governance/`.

Skills are bounded execution protocols. They follow the authoritative V3
control-plane outcome and do not replace canonical resolver, Coordinator, or
Workflow Routing decisions.

System health policy lives in `docs/ai/skills/governance/system-health-policy.md`.

`docs/ai/reference/` is non-runtime material. Do not read it during normal skill execution unless the user explicitly asks for guides, prompts, validation, history, decisions, or AI OS maintenance.

## Repository

| Task | Skill | Path |
| --- | --- | --- |
| Refresh reusable repo knowledge | `tools_repo_context_update` | `docs/ai/skills/tools/tools_repo_context_update.skill.md` |
| Audit `docs/ai` cleanup or context cost | `tools_docs_ai_cleanup_audit` | `docs/ai/skills/tools/tools_docs_ai_cleanup_audit.skill.md` |
| Audit AI Operating System health | `tools_system_health_check` | `docs/ai/skills/tools/tools_system_health_check.skill.md` |
| Update user-facing AI reference docs | `tools_reference_update` | `docs/ai/skills/tools/tools_reference_update.skill.md` |
| Sync user answer or policy | `tools_policy_plan_update` | `docs/ai/skills/tools/tools_policy_plan_update.skill.md` |

## PBI Workflow

| Task | Skill | Path |
| --- | --- | --- |
| Clarify raw PBI | `pbi_clarification` | `docs/ai/skills/pbi/pbi_clarification.skill.md` |
| Create PBI workspace | `pbi_workspace_create` | `docs/ai/skills/pbi/pbi_workspace_create.skill.md` |
| Create implementation plan | `pbi_plan_create` | `docs/ai/skills/pbi/pbi_plan_create.skill.md` |
| Execute one phase | `pbi_implementation_phase` | `docs/ai/skills/pbi/pbi_implementation_phase.skill.md` |
| Review PBI implementation | `pbi_review_phase` | `docs/ai/skills/pbi/pbi_review_phase.skill.md` |
| Fix approved findings | `pbi_fix_phase` | `docs/ai/skills/pbi/pbi_fix_phase.skill.md` |
| Analyze human PR feedback | `pbi_review_feedback_analysis` | `docs/ai/skills/pbi/pbi_review_feedback_analysis.skill.md` |
| Final PBI handoff | `pbi_final_handoff` | `docs/ai/skills/pbi/pbi_final_handoff.skill.md` |

## PR Review Workflow

Use `pr_review_workflow` for daily end-to-end local PR/code review.

| Task | Skill | Path |
| --- | --- | --- |
| Daily full review | `pr_review_workflow` | `docs/ai/skills/pr/pr_review_workflow.skill.md` |

## Review Workflow

Lower-level review skills remain available for follow-up, debugging, specialized review, or partial re-run.

| Task | Skill | Path |
| --- | --- | --- |
| Create review workspace only | `review_workspace_create` | `docs/ai/skills/review/review_workspace_create.skill.md` |
| Analyze local diff | `review_diff_analysis` | `docs/ai/skills/review/review_diff_analysis.skill.md` |
| Create comments and suggestions | `review_comments_create` | `docs/ai/skills/review/review_comments_create.skill.md` |
| Follow up on review updates | `review_followup` | `docs/ai/skills/review/review_followup.skill.md` |
| Final review handoff | `review_final_handoff` | `docs/ai/skills/review/review_final_handoff.skill.md` |

## Compatibility

Existing legacy invocation names are mapped to the current names. Use current names for new work.

| Old Invocation | New Invocation | New Skill Path |
|---|---|---|
| `pbi-clarification` | `pbi_clarification` | `docs/ai/skills/pbi/pbi_clarification.skill.md` |
| `pbi-workspace-create` | `pbi_workspace_create` | `docs/ai/skills/pbi/pbi_workspace_create.skill.md` |
| `pbi-plan-create` | `pbi_plan_create` | `docs/ai/skills/pbi/pbi_plan_create.skill.md` |
| `implementation-phase` | `pbi_implementation_phase` | `docs/ai/skills/pbi/pbi_implementation_phase.skill.md` |
| `review-phase` | `pbi_review_phase` | `docs/ai/skills/pbi/pbi_review_phase.skill.md` |
| `fix-phase` | `pbi_fix_phase` | `docs/ai/skills/pbi/pbi_fix_phase.skill.md` |
| `pbi-final-handoff` | `pbi_final_handoff` | `docs/ai/skills/pbi/pbi_final_handoff.skill.md` |
| `review-feedback-analysis` | `pbi_review_feedback_analysis` | `docs/ai/skills/pbi/pbi_review_feedback_analysis.skill.md` |
| `review-workspace-create` | `review_workspace_create` | `docs/ai/skills/review/review_workspace_create.skill.md` |
| `review-diff-analysis` | `review_diff_analysis` | `docs/ai/skills/review/review_diff_analysis.skill.md` |
| `review-comments-create` | `review_comments_create` | `docs/ai/skills/review/review_comments_create.skill.md` |
| `review-followup` | `review_followup` | `docs/ai/skills/review/review_followup.skill.md` |
| `review-final-handoff` | `review_final_handoff` | `docs/ai/skills/review/review_final_handoff.skill.md` |
| `pr-review-workflow` | `pr_review_workflow` | `docs/ai/skills/pr/pr_review_workflow.skill.md` |
| `repo-context-update` | `tools_repo_context_update` | `docs/ai/skills/tools/tools_repo_context_update.skill.md` |
| `docs-ai-cleanup-audit` | `tools_docs_ai_cleanup_audit` | `docs/ai/skills/tools/tools_docs_ai_cleanup_audit.skill.md` |
| `policy-plan-update` | `tools_policy_plan_update` | `docs/ai/skills/tools/tools_policy_plan_update.skill.md` |

## Read Scope

Read only the selected skill file. Full read-order rules live in `docs/ai/skills/governance/read-order.md`.
