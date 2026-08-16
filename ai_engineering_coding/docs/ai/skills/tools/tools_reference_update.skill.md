# Skill: tools_reference_update

## Purpose

Keep user-facing reference documentation synchronized with the current V3 AI Engineering Operating System.

This skill owns maintenance of `docs/ai/reference/`, including guides, prompts, `README.md`, and `help-index.md`.

Primary usability rule:

- Users must be able to execute prompts by changing parameter values only.
- Users must not need to read skill files to understand how to use the system.

## Parameters

- `UPDATE_SCOPE`: optional; `all`, `guides-only`, `prompts-only`, `index-only`, or `area-only`; default `all`
- `AREA`: optional; `pbi`, `pr`, `review`, `tools`, or `all`; default `all`
- `CHANGE_REASON`: required
- `SOURCE_OF_TRUTH`: optional; `skills-readme`, `skill-files`, `system-health-report`, or `manual-request`; default `skills-readme`

## Read

Always start with:

- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/reference/README.md`
- `docs/ai/reference/help-index.md`

Read selected skill files only when needed.

Do not read all skills unless:

- `UPDATE_SCOPE: all`
- `AREA: all`

Do not read source code, archived history, or foundation material.

## Steps

1. Resolve `UPDATE_SCOPE`, `AREA`, `CHANGE_REASON`, and `SOURCE_OF_TRUTH`.
2. Confirm the requested update affects only `docs/ai/reference/`.
3. Read the minimum required source of truth in this order:
   - selected skill file
   - `docs/ai/skills/README.md`
   - governance files
   - existing reference files
4. Identify affected guides, prompts, help files, and indexes.
5. Align guides with current workflows.
6. Align prompts with canonical skill names, parameters, outputs, and runtime safety rules.
7. Align help files with parameter meanings, required status, defaults, examples, and documented options.
8. Mark undocumented parameter options as `Options not documented yet.` and recommend updating the skill.
9. Validate that users can execute prompts by changing parameter values only.
10. Validate that reference files remain non-runtime and do not expand daily read paths.

## Update

Allowed updates:

- `docs/ai/reference/README.md`
- `docs/ai/reference/help-index.md`
- `docs/ai/reference/guides/`
- `docs/ai/reference/prompts/`

Allowed only as links, not report rewrites:

- existing `docs/ai/reference/system-health/` report links

Never update:

- source code
- `docs/ai/pbi/`
- `docs/ai/reviews/`
- `docs/ai/repo-context/`
- `docs/ai/foundation/`
- `docs/ai/reference/history/`
- `docs/ai/reference/system-health/` report content

## Stop Conditions

- The task requires source code modification.
- The task requires changes outside `docs/ai/reference/`.
- The task requires changing runtime workflow behavior.
- The task requires renaming skills or removing compatibility mappings.
- Required skill parameter metadata is missing and cannot be represented safely.
- Prompt usability cannot be validated.

## Final Output

Return exactly:

- Summary
- Reference Areas Updated
- Guides Updated
- Prompts Updated
- Help Files Updated
- Validation Results
  - Prompt Usability
  - Parameter Completeness
  - Reference Consistency
- Markdown Files Changed
- Missing Skill Metadata
- Remaining Risks
- Recommended Next Step

## References

Follow canonical governance and policy:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/repo-context/policy/context_budget.md`
