# Developer and AI Engineer Guide

## Purpose

This guide is for a developer or AI engineer who wants to improve, maintain, or extend the V2.3 AI Operating System professionally.

The goal is to evolve the system while preserving:

- Simplicity over flexibility.
- Minimal prompts over rich workflow.
- Quality first.
- Low token cost.
- Agent neutrality.
- Backward compatibility.
- Markdown files as shared memory.

## Role Definition

The developer / AI engineer role improves the AI Operating System itself.

This role works on:

- Reference guides and prompt templates.
- Skill structure and skill documentation.
- Governance and policy rules.
- Runtime config documentation and schema alignment.
- System health validation.
- Compatibility mappings.
- Documentation cleanup and deduplication.
- Multi-agent usage patterns.

This role is different from an end user. An end user runs existing workflows. A developer / AI engineer maintains the system those workflows depend on.

## First Principles

| Principle | Meaning |
|---|---|
| One Canonical Source | Every rule should live in one canonical place and be referenced elsewhere. |
| Runtime Stays Small | Runtime docs route to selected skills; they should not become long manuals. |
| Reference Is Non-Runtime | `docs/ai/reference/**` teaches and documents; it is not daily execution context. |
| Compatibility Is Preserved | Old skill names and old user paths should remain safely mapped unless explicitly retired. |
| Skills Stay Focused | Skill files contain skill-specific behavior and point to governance for global rules. |
| Governance Owns Rules | Common rules, read order, markdown reporting, observability, and templates live under governance. |
| Validation Follows Change | Structural, workflow, skill, governance, routing, policy, or config changes require health validation. |

## Primary Files To Know

| Area | Files |
|---|---|
| Runtime entry | `AGENTS.md`, `docs/ai/START_HERE.md` |
| Skill routing | `docs/ai/skills/README.md` |
| Governance | `docs/ai/skills/governance/` |
| Runtime config | `docs/ai/config/runtime-config.yaml`, `docs/ai/skills/governance/runtime-config-schema.md` |
| Repo policy | `docs/ai/repo-context/policy/` |
| Reference material | `docs/ai/reference/` |
| Health reports | `docs/ai/reference/system-health/` |
| Prompt templates | `docs/ai/reference/prompts/` |

## Which Skill To Use

| Goal | Use Skill |
|---|---|
| Update guides, prompt templates, help files, or reference indexes | `tools_reference_update` |
| Update governance or approved policy | `tools_policy_plan_update` |
| Update reusable repo-context knowledge | `tools_repo_context_update` |
| Validate AI OS cohesion after changes | `tools_system_health_check` |
| Audit cleanup, duplication, obsolete files, or token cost | `tools_docs_ai_cleanup_audit` |

Use one skill at a time. Do not combine guide updates, policy changes, and health reports in one free-form task unless the user explicitly asks for a controlled multi-step maintenance run.

## Maintenance Workflow

1. Understand the requested improvement.
2. Classify the change type.
3. Select the correct skill.
4. Read canonical routing and governance only as needed.
5. Identify the smallest set of files to update.
6. Preserve runtime read path and reference boundary.
7. Avoid duplicating canonical rules.
8. Update affected reference docs or prompts.
9. Validate links, ownership, and compatibility.
10. Run system health check when required.
11. Report markdown files changed.

## Change Classification

| Change Type | Examples | Primary Owner |
|---|---|---|
| Reference | User guide, prompt help, workflow tutorial, role guide | `docs/ai/reference/` |
| Skill | Parameters, steps, outputs, final response format | Selected skill file |
| Governance | Read order, common rules, markdown reporting, observability | `docs/ai/skills/governance/` |
| Runtime config | Config schema, presets, config guide | `docs/ai/config/`, governance schema, reference guide |
| Repo policy | Coding standards, code policies, context budget | `docs/ai/repo-context/policy/` |
| Health validation | Full system report and history copy | `docs/ai/reference/system-health/` |

## Runtime Boundary Rules

Normal runtime path remains:

```text
AGENTS.md or CLAUDE.md
-> docs/ai/START_HERE.md
-> docs/ai/skills/README.md
-> selected skill only
-> active workspace only when needed
-> repo-context only if needed
-> exact source files only if needed
```

`docs/ai/reference/**` is non-runtime. Do not make daily workflow instructions depend on reference guides.

## Reference Design Rules

Use reference docs for:

- Teaching users.
- Explaining prompt usage.
- Explaining maintenance roles.
- Documenting runtime config usage.
- Explaining workflow automation.
- Providing non-runtime decision support.

Do not use reference docs for:

- Canonical runtime rules.
- Skill behavior that should live in skill files.
- Repo policy that should live in repo-context policy files.
- Historical records that should remain archived.
- Long duplicated governance text.

## Skill Design Rules

When creating or improving a skill:

1. Use the V2 skill template:

```text
Purpose
Parameters
Read
Steps
Update
Stop Conditions
Final Output
References
```

2. Keep global rules out of the skill body.
3. Reference governance files for shared rules.
4. Keep parameters explicit and documented.
5. Preserve final response sections.
6. Do not remove backward compatibility without explicit approval.
7. Update prompt templates and help files if user-facing execution changes.

## Prompt Template Rules

Prompt templates should be executable by changing parameter values only.

Good prompt shape:

```text
Use skill: skill_name

Parameters:

PARAMETER:
example-value

Task:
Concrete task for this run.
```

Prompt help files should explain:

- Purpose.
- Parameters.
- Required values.
- Allowed options.
- Defaults.
- Required inputs.
- Expected outputs.
- Rules.
- Common mistakes.
- Token optimization tips.

## Governance Update Rules

Use governance docs when a rule applies across multiple skills or workflows.

Common governance locations:

| Rule Type | File |
|---|---|
| Shared behavior | `docs/ai/skills/governance/common-rules.md` |
| Read order and reference boundary | `docs/ai/skills/governance/read-order.md` |
| Markdown reporting | `docs/ai/skills/governance/markdown-change-reporting.md` |
| Skill format | `docs/ai/skills/governance/skill-template.md` |
| Runtime config values | `docs/ai/skills/governance/runtime-config-schema.md` |
| Context management | `docs/ai/skills/governance/context-management.md` |
| Observability | `docs/ai/skills/governance/observability.md` |
| Terminal output and RTK | `docs/ai/skills/governance/terminal-output-optimization.md` |
| System health | `docs/ai/skills/governance/system-health-policy.md` |

## Runtime Config Maintenance

Runtime config work must keep these aligned:

- `docs/ai/config/runtime-config.yaml`
- preset files under `docs/ai/config/`
- `docs/ai/config/README.md`
- `docs/ai/skills/governance/runtime-config-schema.md`
- `docs/ai/skills/governance/context-management.md`
- `docs/ai/skills/governance/terminal-output-optimization.md`
- `docs/ai/skills/governance/observability.md`
- `docs/ai/reference/guides/runtime-config-guide.en.md`
- `docs/ai/reference/guides/runtime-config-guide.fa.md`

Config preferences must not override source-code permissions, review-only guardrails, markdown reporting, or the reference boundary.

## Validation Checklist

Before finishing an AI OS maintenance change, verify:

- Runtime read path remains clear.
- Reference docs remain non-runtime.
- Skill routing still points to canonical skill names.
- Compatibility mappings remain intact.
- Governance rules are not duplicated in long form.
- Repo-context ownership is preserved.
- Markdown reporting requirements are preserved.
- Runtime config values match the schema.
- No source code changed unless the selected task allowed it.
- System health check was run when required.

## Common Mistakes

| Mistake | Better Approach |
|---|---|
| Putting canonical rules in a README | Put the rule in governance and link to it. |
| Updating every prompt after one rule changes | Add one canonical governance rule and update only necessary pointers. |
| Reading all docs for a small guide change | Read the selected guide, routing index, and relevant governance only. |
| Treating reference guides as runtime authority | Keep reference docs educational and non-runtime. |
| Changing skill behavior while updating help | Separate behavior changes from documentation updates. |
| Removing old names too early | Preserve compatibility mappings unless explicitly retired. |

## Recommended Improvement Cycle

For each improvement:

1. Plan the smallest safe change.
2. Apply the change in the owning location.
3. Update user-facing reference only if usage changed.
4. Validate the system with targeted checks.
5. Run health check when the change affects structure, governance, skills, routing, config, prompts, or compatibility.
6. Record what markdown files changed.

## Related Guides

- `docs/ai/reference/guides/ai-engineer/flow.md`
- `docs/ai/reference/guides/runtime-config-guide.en.md`
- `docs/ai/reference/guides/professional-end-user-guide.en.md`
- `docs/ai/reference/guides/workflow-automation-guide.en.md`
- `docs/ai/reference/guides/tools/user-guide.md`
