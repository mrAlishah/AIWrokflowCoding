# Skill: tools_system_health_check

## Purpose

Audit the V3 AI Engineering Operating System for system health, cohesion, runtime efficiency, documentation quality, skill quality, workflow consistency, governance ownership, heuristic context efficiency, backward compatibility, and maintainability.

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
- `docs/ai/config/runtime-config.yaml` if it exists
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
5. Validate runtime config against `docs/ai/skills/governance/runtime-config-schema.md`.
6. Analyze cohesion across PBI, review, PR review, tools, repo-context, governance, observability, and historical foundation material.
7. Validate skill naming, workspace structures, governance ownership, repo policy ownership, output structures, and backward compatibility.
8. Validate context efficiency metrics for runtime docs and selected skills.
9. Validate context-management, terminal-output, and observability config alignment with canonical governance.
10. Validate system health policy alignment and trigger coverage.
11. Audit every selected skill for purpose clarity, parameter quality, output structure, restrictions, workflow alignment, canonical references, duplication level, prompt length, and readability.
12. Classify findings by type and severity.
13. Write the latest report.
14. If `REPORT_MODE: latest-and-history`, also write the dated history report.

## Runtime Config Validation

When `docs/ai/config/runtime-config.yaml` exists, validate:

- Required root keys: `version`, `runtime`, `context`, `terminal`, `observability`
- `runtime.rtk`: `auto`, `true`, or `false`
- `context.mode`: `conservative`, `balanced`, or `deep`
- `context.reference_docs`: `true` or `false`
- `context.repo_context`: `never`, `on_demand`, or `when_skill_requires`
- `context.source_reading`: `exact_only`, `targeted`, or `expanded_when_needed`
- `context.diff_first`: `true` or `false`
- `context.prefer_existing_summaries`: `true` or `false`
- `context.broad_scan`: `true` or `false`
- `context.extra_file_justification`: `true` or `false`
- `context.context_expansion_notice`: `true` or `false`
- `context.final_response_detail`: `concise`, `standard`, or `detailed`
- `terminal.output.prefer_summary`: `true` or `false`
- `terminal.output.raw_output_on_error`: `true` or `false`
- `terminal.output.raw_output_when_requested`: `true` or `false`
- `terminal.output.summarize_success_output`: `true` or `false`
- `observability.enabled`: `true` or `false`
- `observability.metrics.enabled`: `true` or `false`
- `observability.metrics.workspace_records`: `true` or `false`
- `observability.metrics.central_dashboards`: `true` or `false`
- `observability.metrics.final_response_status`: `true` or `false`
- `observability.metrics.tool_reports`: `true` or `false`
- `observability.metrics.exact_token_tracking`: must be `false`
- `observability.metrics.external_telemetry`: must be `false`

Missing required keys or invalid values are required findings.

Unknown keys are optional findings unless they conflict with safety, routing, workflow behavior, source-code permissions, review-only guardrails, markdown reporting, or reference boundary rules.

Runtime config must not override canonical safety rules.

## Context Efficiency Metrics

Evaluate whether skills and runtime docs encourage reading only the minimum required context.

Use heuristic documentation-based estimates only. Do not estimate exact tokens, dollar cost, or external telemetry.

Definitions:

- Expected Read Scope: heuristic estimate of the files or file groups a skill should normally read, such as selected skill, active workspace, specific repo-context routing files, or specific source files only when needed.
- Files Read: files that the skill or report expects or instructs agents to read, estimated from skill `Read` sections, README routing, and workflow docs.
- Context Expansion Count: number of times a skill instructs the agent to expand context beyond the initial selected skill and active workspace, such as repo-context, extra source files, foundation/archive/history, all docs, all skills, or all source files.
- Estimated Read Cost: qualitative value only: `Low`, `Medium`, or `High`.
- Context Efficiency Status: `Good`, `Acceptable`, `Warning`, or `Poor`.
- Runtime Config Alignment: whether `context.*`, `terminal.output.*`, and `observability.*` settings preserve low-token execution and safety.

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
- `docs/ai/skills/governance/context-management.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
- `docs/ai/skills/governance/runtime-config-schema.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/skills/governance/terminal-output-optimization.md`
- `docs/ai/repo-context/policy/context_budget.md`
