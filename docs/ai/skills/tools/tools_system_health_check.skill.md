# Skill: tools_system_health_check

## Purpose

Audit the V2 AI Operating System for system health, cohesion, runtime efficiency, documentation quality, skill quality, workflow consistency, governance ownership, heuristic context efficiency, backward compatibility, and maintainability.

Generate actionable recommendations without changing runtime workflow behavior.

## Parameters

- `CHECK_SCOPE`: optional; `runtime-only`, `foundation-only`, or `full`; default `full`
- `CHECK_COMPATIBILITY`: optional; `true` or `false`; default `true`
- `REPORT_MODE`: optional; `latest-only` or `latest-and-history`; default `latest-only`
- `ANALYSIS_DEPTH`: optional; `standard` or `deep`; default `deep`

## Read

Always read:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai/README.md`
- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/governance/`
- `docs/ai/repo-context/README.md`
- `docs/ai/repo-context/policy/`
- `docs/ai/pbi/README.md`
- `docs/ai/reviews/README.md`

When `CHECK_SCOPE` includes runtime, read:

- `docs/ai/skills/pbi/`
- `docs/ai/skills/review/`
- `docs/ai/skills/pr/`
- `docs/ai/skills/tools/`

When `CHECK_SCOPE` includes foundation or historical material, read:

- `docs/ai/reference/history/foundation/`

Do not read source code.

Do not read unrelated reference or archive material unless required by the selected check scope.

## Steps

1. Resolve parameter defaults.
2. Confirm the requested scope does not require source code inspection.
3. Validate runtime read path and context expansion risks.
4. Validate file, skill, and compatibility dependencies.
5. Analyze cohesion across PBI, review, PR review, tools, repo-context, governance, observability, and historical foundation material.
6. Validate skill naming, workspace structures, governance ownership, repo policy ownership, output structures, and backward compatibility.
7. Validate context efficiency metrics for runtime docs and selected skills.
8. Validate system health policy alignment and trigger coverage.
9. Audit every selected skill for purpose clarity, parameter quality, output structure, restrictions, workflow alignment, canonical references, duplication level, prompt length, and readability.
10. Classify findings by type and severity.
11. Write the latest report.
12. If `REPORT_MODE: latest-and-history`, also write the dated history report.

## Context Efficiency Metrics

Evaluate whether skills and runtime docs encourage reading only the minimum required context.

Use heuristic documentation-based estimates only. Do not estimate exact tokens, dollar cost, or external telemetry.

Definitions:

- Expected Read Scope: heuristic estimate of the files or file groups a skill should normally read, such as selected skill, active workspace, specific repo-context routing files, or specific source files only when needed.
- Files Read: files that the skill or report expects or instructs agents to read, estimated from skill `Read` sections, README routing, and workflow docs.
- Context Expansion Count: number of times a skill instructs the agent to expand context beyond the initial selected skill and active workspace, such as repo-context, extra source files, foundation/archive/history, all docs, all skills, or all source files.
- Estimated Read Cost: qualitative value only: `Low`, `Medium`, or `High`.
- Context Efficiency Status: `Good`, `Acceptable`, `Warning`, or `Poor`.

Heuristic rules:

- Good: clear read scope and no broad default reads.
- Acceptable: several docs are read only for system-level audit, planning, or validation.
- Warning: ambiguous read scope or possible unnecessary context expansion.
- Poor: broad default reads such as all docs, all skills, all source files, or archived history by default.

Finding rules:

- Good: no finding required, or `information` / `Low`.
- Acceptable: `information` / `Low`.
- Warning: `optional` / `Medium`.
- Poor: `required` / `High`.
- Critical: only when runtime docs instruct agents to read all docs, all skills, or source code by default.

Report section:

```markdown
## Context Efficiency Metrics

| Skill / Area | Expected Read Scope | Context Expansion Count | Estimated Read Cost | Efficiency Status | Recommendation |
|---|---|---:|---|---|---|
```

## Update

- Always write `docs/ai/reference/system-health/latest.md`
- When `REPORT_MODE: latest-and-history`, also write `docs/ai/reference/system-health/history/YYYY-MM-DD.md`

Do not write reports to:

- `docs/ai/foundation/`
- `docs/ai/archive/`

Do not add exact token tracking, dollar-cost tracking, or external telemetry.

## Stop Conditions

- Requested scope requires source code inspection.
- The task asks to modify source code, workflows, skill names, compatibility mappings, historical records, or archived files.
- The report cannot be written under `docs/ai/reference/system-health/`.
- Required runtime governance files are missing.
- The requested report requires exact token tracking, dollar-cost tracking, or external telemetry.

## Final Output

Return exactly:

- Summary
- Report Written
- Status
- Critical Findings
- Required Actions
- Markdown Files Changed
- Recommended Next Step

## References

Follow canonical governance and policy:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/repo-context/policy/context_budget.md`
