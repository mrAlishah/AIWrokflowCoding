# AGENTS.md

# AI Multi-Agent Coding Operating System (V2)

## Mission

This repository uses markdown files as shared memory for a V2 AI Operating System.

Primary goals:

1. Simplicity
2. Automation
3. Low Token Cost
4. Markdown Files = Shared Memory
5. Multi-Agent Collaboration

## Daily Runtime Read Path

1. `AGENTS.md` or agent-specific adapter such as `CLAUDE.md`
2. `docs/ai/START_HERE.md`
3. `docs/ai/skills/README.md`
4. Selected skill only
5. Active workspace only when the selected skill requires it
6. repo-context only if needed
7. Exact source files only if needed

`docs/ai/reference/**` is non-runtime reference material and must not be read during normal execution unless explicitly requested for guides, prompts, validation, history, decisions, or AI OS maintenance.

## Canonical Governance

- Common rules: `docs/ai/skills/governance/common-rules.md`
- Runtime read order: `docs/ai/skills/governance/read-order.md`
- Markdown reporting: `docs/ai/skills/governance/markdown-change-reporting.md`
- Skill structure: `docs/ai/skills/governance/skill-template.md`

## Canonical Repo Policy

- Code policies: `docs/ai/repo-context/policy/code-policies.md`
- Coding standards: `docs/ai/repo-context/policy/coding_standards.md`
- Context budget: `docs/ai/repo-context/policy/context_budget.md`

## Critical Guardrails

- Always use `Use Skill + Parameters`.
- Select one approved skill from `docs/ai/skills/README.md` before execution.
- Execute one skill at a time.
- Do not read all docs, all skills, all workspaces, or the whole repository by default.
- Do not modify source code unless the selected skill explicitly allows it and the task requires it.
- Do not modify `docs/ai/reference/history/foundation/**` unless the user explicitly authorizes archive or history work.
- Do not introduce V3 concepts.
- Preserve knowledge separation between repo-context, PBI workspaces, review workspaces, execution memory, and architecture decisions.

## repo-context Ownership

`docs/ai/repo-context/*` is reusable repository knowledge.

Only `tools_repo_context_update` may update repo-context files.

Exception: `tools_policy_plan_update` may update reusable repository policy files under `docs/ai/repo-context/policy/` only when:

```text
SCOPE: global
INPUT_TAG: USER_CODE_POLICY
UPDATE_MODE: apply-global-rule
```

All other skills treat repo-context as read-only.

## Review Guardrail

Review work is local git diff driven and must not modify source code, call PR APIs, create pull requests, or push commits.

## Markdown Reporting

When markdown files are changed, follow:

```text
docs/ai/skills/governance/markdown-change-reporting.md
```

## Validation Note

After changing skills, naming, workflow, reference material, `START_HERE.md`, common rules, or agent files, re-run the V2 validation checklist without editing `docs/ai/reference/history/foundation/**`.
