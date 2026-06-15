# PBI Workflow

Task-specific implementation workspaces live under:

```text
docs/ai/pbi/STP-XXXX/
```

## Read Next

Use `docs/ai/skills/README.md` to select the current PBI skill.

Common sequence:

```text
pbi_clarification -> pbi_workspace_create -> pbi_plan_create -> pbi_implementation_phase -> pbi_review_phase -> pbi_fix_phase -> pbi_final_handoff
```

## Workspace Files

```text
00-approved-pbi.md
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision_log.md
05-validation.md
06-handoff.md
99-metrics.md
phases/
knowledge/
```

Do not read every PBI workspace. Read only the active `STP-XXXX` workspace required by the selected skill.

## Governance

- Common rules: [../skills/governance/common-rules.md](../skills/governance/common-rules.md)
- Read order: [../skills/governance/read-order.md](../skills/governance/read-order.md)
- Markdown reporting: [../skills/governance/markdown-change-reporting.md](../skills/governance/markdown-change-reporting.md)
- Observability: [../skills/governance/observability.md](../skills/governance/observability.md)
