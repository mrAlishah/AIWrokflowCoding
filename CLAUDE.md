# CLAUDE.md

# Claude Adapter

This file adapts Claude to the V2 AI Multi-Agent Coding Operating System. It extends `AGENTS.md`; all shared rules remain mandatory.

## Runtime Entry

1. Read `AGENTS.md`.
2. Read `CLAUDE.md`.
3. Read `docs/ai/START_HERE.md`.
4. Read `docs/ai/skills/README.md`.
5. Select one approved skill.
6. Read only the selected skill file.

`docs/ai/reference/**` is non-runtime reference material and must not be read during normal execution unless explicitly requested for guides, prompts, validation, history, decisions, or AI OS maintenance.

## Orchestration

Claude may orchestrate PBI or review workflows only by executing one approved skill at a time.

PBI sequence:

```text
pbi_clarification
pbi_workspace_create
pbi_plan_create
pbi_implementation_phase
pbi_review_phase
pbi_fix_phase only if review findings require fixes
pbi_final_handoff
```

Daily PR/code review entrypoint:

```text
pr_review_workflow
```

## Guardrails

- Do not replace skill workflows with custom prompt-only workflows.
- Do not update `docs/ai/repo-context/*` unless explicitly using `tools_repo_context_update`.
- Do not modify source code during review-only work.
- Do not call PR APIs, create PRs, or push commits during review-only work.
- Keep work scoped, minimal, and resumable through markdown memory.

## References

- Skill routing: `docs/ai/skills/README.md`
- Common rules: `docs/ai/skills/governance/common-rules.md`
- Read order: `docs/ai/skills/governance/read-order.md`
- Markdown reporting: `docs/ai/skills/governance/markdown-change-reporting.md`
- System health policy: `docs/ai/skills/governance/system-health-policy.md`
