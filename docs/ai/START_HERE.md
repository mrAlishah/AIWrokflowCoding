# Start Here

Daily runtime usage starts here after `AGENTS.md` or an agent-specific adapter such as `CLAUDE.md`.

## Runtime Read Path

1. `AGENTS.md` or `CLAUDE.md`
2. `docs/ai/START_HERE.md`
3. `docs/ai/skills/README.md`
4. Selected skill only
5. Active workspace
6. repo-context only if needed
7. Exact source files only if needed

Do not read all docs, all skills, all workspaces, or the whole repository by default.

`docs/ai/reference/**` is non-runtime reference material and must not be read during normal execution unless explicitly requested for guides, prompts, validation, history, decisions, or AI OS maintenance.

If `docs/ai/config/runtime-config.yaml` exists, read it only for runtime preferences such as optional terminal-output optimization and observability metrics behavior.

## Routing

| Task | Route |
| --- | --- |
| Raw or unclear PBI | `pbi_clarification` |
| PBI task | `docs/ai/skills/README.md` -> selected PBI skill |
| Daily PR/code review | `pr_review_workflow` |
| Review task | `docs/ai/skills/README.md` -> selected review skill |
| User answer or policy update | `tools_policy_plan_update` |
| Repo knowledge update | `tools_repo_context_update` |
| AI OS health audit | `tools_system_health_check` |
| Long-term docs cleanup audit | `tools_docs_ai_cleanup_audit` |
| AI OS maintenance | Explicit maintenance task only; use `docs/ai/reference/` only when guides, prompts, validation, history, decisions, or AI OS maintenance are requested |

## Canonical Rules

- Common rules: `docs/ai/skills/governance/common-rules.md`
- Read order: `docs/ai/skills/governance/read-order.md`
- Markdown reporting: `docs/ai/skills/governance/markdown-change-reporting.md`
- Observability: `docs/ai/skills/governance/observability.md`
- Skill template: `docs/ai/skills/governance/skill-template.md`
- System health policy: `docs/ai/skills/governance/system-health-policy.md`
- Terminal output optimization: `docs/ai/skills/governance/terminal-output-optimization.md`
