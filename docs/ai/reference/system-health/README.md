# System Health Reports

## Purpose

System health reports are operational validation artifacts for the V2 AI Operating System.

They are not runtime instructions.

Reports include heuristic context efficiency metrics, not exact token or cost tracking.

## When To Run

Run health checks after significant `docs/ai` structure, governance, skill, workflow, policy, reference, or archive changes.

Minor typo, grammar, or formatting fixes do not require a full health check.

## Skill

Canonical audit skill:

```text
tools_system_health_check
```

## Latest Report

Latest report:

```text
docs/ai/reference/system-health/latest.md
```

## Historical Reports

Historical reports live under:

```text
docs/ai/reference/system-health/history/
```

## Rules

- Do not treat reports as runtime instructions.
- Do not write health reports under `docs/ai/foundation/**`.
- Do not write health reports under `docs/ai/archive/**`.
- Keep reports under `docs/ai/reference/system-health/`.

## Related Files

- `docs/ai/skills/tools/tools_system_health_check.skill.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/reference/system-health/latest.md`
- `docs/ai/reference/system-health/history/`
