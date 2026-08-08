# AI OS Current State Snapshot

## Executive Summary

The repository currently contains a V2 AI Operating System based on markdown shared memory, explicit skill routing, low-token runtime reads, and non-runtime reference material.

Runtime is stable and centered on:

- `AGENTS.md` / `CLAUDE.md`
- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- selected skill only
- active workspace only when needed
- repo-context only when needed
- exact source files only when needed

The user-facing reference layer now exists under `docs/ai/reference/` with guides and ready-to-run prompt templates. A new tools skill, `tools_reference_update`, exists to maintain that reference layer.

No files were modified for this snapshot.

## Current Version / Status

Current system: V2 AI Operating System.

Latest health report status: `Ready`.

Important caveat: `docs/ai/reference/system-health/latest.md` still reports optional findings about `docs/ai/reference/myDocs/`, but the current filesystem check shows `docs/ai/reference/myDocs/` does not exist. The health report is therefore slightly stale in that specific optional finding.

## Active Priorities

Current priorities are:

1. Simplicity > Flexibility
2. Minimal Prompts > Rich Workflow
3. Quality First
4. Low Token Cost
5. Agent Neutral

Supporting principles:

- Markdown Files = Shared Memory
- Agents = Stateless Workers
- Skills = Execution Protocols
- Use Skill + Parameters
- One selected skill at a time

## Current Folder Structure

Current relevant structure:

```text
docs/ai/
  README.md
  START_HERE.md

  skills/
    README.md
    governance/
      common-rules.md
      markdown-change-reporting.md
      observability.md
      read-order.md
      README.md
      skill-template.md
      system-health-policy.md
    pbi/
    pr/
    review/
    tools/

  pbi/
    README.md

  reviews/
    README.md

  repo-context/
    README.md
    policy/
      README.md
      code-policies.md
      coding_standards.md
      context_budget.md

  reference/
    README.md
    help-index.md
    guides/
    prompts/
    system-health/
    history/
    validation/
    decisions/
```

`docs/ai/reference/myDocs/` is not present now, even though the latest health report still mentions it.

## Current Runtime Read Path

Daily runtime read path:

1. `AGENTS.md` or agent-specific adapter such as `CLAUDE.md`
2. `docs/ai/START_HERE.md`
3. `docs/ai/skills/README.md`
4. Selected skill only
5. Active workspace only when the selected skill requires it
6. repo-context only if needed
7. Exact source files only if needed

`docs/ai/reference/**` is non-runtime. It is read only when the user explicitly asks for guides, prompts, validation, history, decisions, or AI OS maintenance.

## Current Skills

| Area   | Skill                          | Path                                                        | Purpose                                                                            |
| ------ | ------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| PBI    | `pbi_clarification`            | `docs/ai/skills/pbi/pbi_clarification.skill.md`             | Clarify raw PBI and block downstream work when critical information is missing.    |
| PBI    | `pbi_workspace_create`         | `docs/ai/skills/pbi/pbi_workspace_create.skill.md`          | Create standard PBI workspace after clarification.                                 |
| PBI    | `pbi_plan_create`              | `docs/ai/skills/pbi/pbi_plan_create.skill.md`               | Create implementation plan, validation plan, phase files, and codebase navigation. |
| PBI    | `pbi_implementation_phase`     | `docs/ai/skills/pbi/pbi_implementation_phase.skill.md`      | Execute one planned PBI phase.                                                     |
| PBI    | `pbi_review_phase`             | `docs/ai/skills/pbi/pbi_review_phase.skill.md`              | Review implemented PBI work or one RF fix.                                         |
| PBI    | `pbi_fix_phase`                | `docs/ai/skills/pbi/pbi_fix_phase.skill.md`                 | Apply targeted fixes for approved findings or Required RF items.                   |
| PBI    | `pbi_review_feedback_analysis` | `docs/ai/skills/pbi/pbi_review_feedback_analysis.skill.md`  | Convert human review feedback into structured RF items.                            |
| PBI    | `pbi_final_handoff`            | `docs/ai/skills/pbi/pbi_final_handoff.skill.md`             | Create final PBI handoff.                                                          |
| PR     | `pr_review_workflow`           | `docs/ai/skills/pr/pr_review_workflow.skill.md`             | Daily end-to-end local PR/code review workflow.                                    |
| Review | `review_workspace_create`      | `docs/ai/skills/review/review_workspace_create.skill.md`    | Create standard review workspace.                                                  |
| Review | `review_diff_analysis`         | `docs/ai/skills/review/review_diff_analysis.skill.md`       | Analyze local branch diff for behavior and risks.                                  |
| Review | `review_comments_create`       | `docs/ai/skills/review/review_comments_create.skill.md`     | Create English PR-ready comments and Persian/internal suggestions.                 |
| Review | `review_followup`              | `docs/ai/skills/review/review_followup.skill.md`            | Re-check planned review comments after branch changes.                             |
| Review | `review_final_handoff`         | `docs/ai/skills/review/review_final_handoff.skill.md`       | Summarize final review outcome and decision.                                       |
| Tools  | `tools_system_health_check`    | `docs/ai/skills/tools/tools_system_health_check.skill.md`   | Audit AI OS health and write latest/history reports.                               |
| Tools  | `tools_reference_update`       | `docs/ai/skills/tools/tools_reference_update.skill.md`      | Maintain user-facing reference guides and prompt templates.                        |
| Tools  | `tools_repo_context_update`    | `docs/ai/skills/tools/tools_repo_context_update.skill.md`   | Refresh reusable repo-context knowledge.                                           |
| Tools  | `tools_policy_plan_update`     | `docs/ai/skills/tools/tools_policy_plan_update.skill.md`    | Synchronize tagged user input or approved policy changes.                          |
| Tools  | `tools_docs_ai_cleanup_audit`  | `docs/ai/skills/tools/tools_docs_ai_cleanup_audit.skill.md` | Audit docs/ai cleanup, duplication, stale content, and context cost.               |

## Current Reference Layer

`docs/ai/reference/` is the non-runtime user-facing layer.

Current canonical reference areas:

- `docs/ai/reference/guides/`
- `docs/ai/reference/prompts/`
- `docs/ai/reference/system-health/`
- `docs/ai/reference/history/`
- `docs/ai/reference/validation/`
- `docs/ai/reference/decisions/`

It explains:

- difference between guides and prompts
- where new users should start
- where ready prompts live
- why reference docs are non-runtime
- where system health and historical files live

## Current Prompt Template Status

Canonical prompt templates live under:

```text
docs/ai/reference/prompts/
```

Current prompt coverage:

- PBI prompts exist for all PBI skills.
- PR prompt exists for `pr_review_workflow`.
- Review prompts exist for all review skills.
- Tools prompts exist for all tools skills, including `tools_reference_update`.
- System health prompts exist under `docs/ai/reference/prompts/system-health-prompts/`.

Prompt quality checks:

- No `<value>` placeholder found in canonical prompts.
- No `PARAM_A or PARAM_B` found.
- No `Replace this line` found.
- No `example-value` found.
- Help files include parameter tables and rules tables.
- Prompt files use concrete editable values.
- Review prompts preserve local-git-only, no-source-change, and no-PR-API guardrails.
- Tools prompts preserve no-source-code and no-workflow-change guardrails.

Weaknesses:

- Some help files contain `Options not documented yet.` for free-text parameters or skill parameters without documented fixed values. This is acceptable but indicates skill metadata could be richer.
- The latest health report mentions `myDocs`, but that folder is not present now.

## Current User Guide Status

Canonical guides live under:

```text
docs/ai/reference/guides/
```

Current guide areas:

- `pbi`
- `pr`
- `review`
- `tools`

Each area contains:

- `user-guide.md`
- `workflow.md`
- `help-index.md`

Guide quality:

- Guides explain purpose, workflow, expected outputs, mistakes, token rules, and what not to do.
- Tools guide includes `tools_reference_update`.
- Reference layer remains explicitly non-runtime.

Potential weakness:

- Some guide prose is concise and operational, not richly tutorial. It is usable, but future polish could add better examples for end users.

## Current Governance Files

Canonical governance files:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/skills/governance/README.md`

Key governance points:

- Do not read all docs, all skills, or the whole repository by default.
- Use one selected skill at a time.
- Review work is local git diff driven and must not modify source code.
- Repo-context is owned by `tools_repo_context_update`, with a narrow `tools_policy_plan_update` policy exception.
- System health checks are required after structural, routing, governance, skill, policy, workflow, reference, or historical foundation changes.

## Current Repo Policy Files

Canonical repo policy files:

- `docs/ai/repo-context/policy/code-policies.md`
- `docs/ai/repo-context/policy/coding_standards.md`
- `docs/ai/repo-context/policy/context_budget.md`
- `docs/ai/repo-context/policy/README.md`

Active code policy:

- CP-001: Frontend JavaScript and TypeScript must not use `var`; use `const` by default and `let` only when reassignment is required.

Repo-context ownership:

- Normal writer: `tools_repo_context_update`
- Policy exception: `tools_policy_plan_update` only for approved global policy parameters
- All other skills treat repo-context as read-only

## Current System Health Status

Latest health report:

```text
docs/ai/reference/system-health/latest.md
```

Current status in report:

```text
Ready
```

No required, high, or critical findings are reported.

Current optional findings in the latest report:

- `docs/ai/reference/myDocs/` was reported as noncanonical duplicate prompt material.
- `docs/ai/reference/myDocs/tools_reference_update/tools_reference_update.help.md` was reported as mojibake.

Current filesystem check:

- `docs/ai/reference/myDocs/` does not exist now.

Conclusion:

- System health is currently `Ready`.
- The latest health report is slightly stale because it references `myDocs`, which is no longer present.

## Recent Changes

Recent visible state changes include:

- Added `tools_reference_update` skill.
- Registered `tools_reference_update` in `docs/ai/skills/README.md`.
- Added tools reference prompt and help files:
  - `05-tools-reference-update.prompt.md`
  - `05-tools-reference-update-short.prompt.md`
  - `05-tools-reference-update.help.md`
- Expanded user-facing reference layer:
  - guides
  - prompt templates
  - prompt help files
- Converted canonical prompt templates into ready-to-run execution forms.
- Re-ran system health report after reference/tooling updates.

## Open Issues

1. Latest health report contains stale optional findings about `docs/ai/reference/myDocs/`, but that folder is not currently present.
2. Some prompt help files still state `Options not documented yet.` for parameters where skill files do not define allowed options.
3. `tools_reference_update` is new and has no legacy compatibility invocation mapping. This is acceptable unless users start using an old name.
4. User guides are complete enough for routing and usage, but could be improved with richer real examples.

## Required Fixes

None identified from the read scope.

The system is not blocked.

## Optional Improvements

1. Re-run `tools_system_health_check` after confirming `myDocs` removal so latest health no longer reports stale `myDocs` findings.
2. Use `tools_reference_update` to polish guides with more concrete examples.
3. Add richer allowed-option metadata to skill files where help files currently say `Options not documented yet.`
4. Consider adding `tools_reference_update` to compatibility mapping only if an old invocation name is introduced or requested.
5. Update `docs/ai/START_HERE.md` routing table to explicitly mention `tools_reference_update` for reference maintenance, if desired.

## Risks

- Stale health report finding may confuse ChatGPT or future agents into thinking `myDocs` still exists.
- Prompt help files with `Options not documented yet.` are honest but less user-friendly than explicit option lists.
- If reference prompts evolve faster than skill files, prompt parameter drift can reappear. `tools_reference_update` is intended to control this.
- Full health checks read broad documentation and should remain explicit maintenance tasks, not daily runtime.

## Recommended Next Prompt For ChatGPT

```text
Use skill: tools_system_health_check

Parameters:

CHECK_SCOPE:
full

CHECK_COMPATIBILITY:
true

REPORT_MODE:
latest-and-history

ANALYSIS_DEPTH:
deep

Task:
Re-run the V2 AI OS health check after confirming docs/ai/reference/myDocs no longer exists, and update latest/history reports so stale myDocs findings are removed if no longer applicable.

Constraints:
Do not modify source code.
Do not change workflow behavior.
Do not introduce V3 concepts.
```

## Files Read

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai/README.md`
- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/observability.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/README.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/skills/governance/system-health-policy.md`
- `docs/ai/skills/pbi/*.skill.md`
- `docs/ai/skills/pr/*.skill.md`
- `docs/ai/skills/review/*.skill.md`
- `docs/ai/skills/tools/*.skill.md`
- `docs/ai/reference/README.md`
- `docs/ai/reference/help-index.md`
- `docs/ai/reference/guides/**`
- `docs/ai/reference/prompts/**`
- `docs/ai/reference/system-health/latest.md`
- `docs/ai/repo-context/README.md`
- `docs/ai/repo-context/policy/README.md`
- `docs/ai/repo-context/policy/code-policies.md`
- `docs/ai/repo-context/policy/coding_standards.md`
- `docs/ai/repo-context/policy/context_budget.md`

## Important

No files were modified.

No source code was read.

No V3 concepts were introduced.

Canonical prompts are currently user-ready by the requested checks: no `<value>`, no `PARAM_A or PARAM_B`, concrete parameter examples, help tables, and executable prompt structure.

The main issue to carry forward is health-report staleness around `docs/ai/reference/myDocs/`.
