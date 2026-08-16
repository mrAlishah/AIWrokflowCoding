# System Health Policy

## Purpose

Ensure `tools_system_health_check` remains aligned with the current V3 AI Engineering Operating System after structural, workflow, governance, skill, naming, routing, policy, reference, or historical foundation changes.

## Trigger Conditions

Run a system health check after changes to:

- Documentation structure: folders, file moves, file renames, archive changes, reference structure changes, or compatibility pointer changes.
- Skills: new skills, removed skills, skill renames, parameter changes, output changes, restriction changes, or prompt changes.
- Governance: common rules, read order, markdown reporting, observability, or skill template changes.
- Repo-context: ownership rules, policy files, context budget, or repository knowledge structure.
- Workflows: PBI workflow, review workflow, PR workflow, validation workflow, or tool workflow changes.
- Historical foundation material: archive decisions, rewrite decisions, baseline updates, or validation updates.
- Priorities: system priority changes, optimization goal changes, or token reduction strategy changes.

System health checks must validate context efficiency heuristically after structural, workflow, skill, governance, or routing changes.

## Required Skill Review

Whenever any validation area changes, verify whether `docs/ai/skills/tools/tools_system_health_check.skill.md` still validates that area correctly.

If it does not, update the skill before the change is considered complete.

## Required Health Check Execution

After any triggering change, run:

```text
Use skill: tools_system_health_check
```

Parameters:

```text
CHECK_SCOPE: full
CHECK_COMPATIBILITY: true
REPORT_MODE: latest-and-history
ANALYSIS_DEPTH: deep
```

## Required Validation Artifact

The canonical health report is:

```text
docs/ai/reference/system-health/latest.md
```

The latest report must reflect the current system state. A stale report invalidates the change.

## Priority Synchronization Rules

The health check must validate alignment with current priorities:

```text
Simplicity > Flexibility
Minimal Prompts > Rich Workflow
Quality First
Low Token Cost
Agent Neutral
```

If priorities change, update governance documents, runtime documents, and `tools_system_health_check.skill.md` before running the next health check.

## Change Completion Criteria

A documentation change is complete only when:

- Required files are updated.
- Compatibility is validated.
- System health check is executed when required.
- `docs/ai/reference/system-health/latest.md` is updated when required.
- Findings are reviewed.
- Required fixes are addressed.

## Exceptions

Minor editorial fixes do not require a full health check.

Examples:

- Typo fixes.
- Grammar fixes.
- Formatting changes.

## Related Files

- `docs/ai/skills/tools/tools_system_health_check.skill.md`
- `docs/ai/reference/system-health/latest.md`
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/README.md`
- `docs/ai/START_HERE.md`
