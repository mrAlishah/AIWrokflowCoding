# Developer and AI Engineer Guides

## Purpose

This folder is for developers and AI engineers who maintain, improve, or extend the V2.3 AI Operating System.

It is separate from end-user guides. End-user guides explain how to use existing workflows. These guides explain how to evolve the system without breaking runtime behavior, compatibility, governance ownership, or low-token execution.

## Non-Runtime Rule

This folder is reference material. Do not read it during normal PBI, review, PR review, or implementation runtime.

Read it only when the user explicitly asks for AI OS maintenance, guide maintenance, prompt maintenance, skill design, governance updates, validation, or system improvement planning.

## Guide Map

| File | Use |
|---|---|
| `developer-ai-engineer-guide.md` | Main role guide for maintaining and improving the AI Operating System. |
| `flow.md` | Visual workflow for deciding, changing, validating, and documenting AI OS improvements. |

## Role Boundary

This role may maintain reference docs and propose improvements, but it must still use the correct approved skill for actual changes:

| Work Type | Skill |
|---|---|
| Reference guide or prompt update | `tools_reference_update` |
| Governance or policy update | `tools_policy_plan_update` |
| Repo-context update | `tools_repo_context_update` |
| System health validation | `tools_system_health_check` |
| Docs cleanup audit | `tools_docs_ai_cleanup_audit` |

## Canonical Runtime Sources

- `AGENTS.md`
- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/governance/`
- `docs/ai/config/runtime-config.yaml`
- `docs/ai/repo-context/policy/`

## Maintenance Rule

When a change affects skills, governance, routing, runtime config, prompts, reference structure, compatibility, or validation behavior, run a system health check after the change.
