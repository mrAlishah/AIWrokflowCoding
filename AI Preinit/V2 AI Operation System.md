# Current V2 AI Operating System Assessment

## 1. Folder Structure

```text
docs/ai/
  README.md
  START_HERE.md
  foundation/
    README.md
    claude-compatibility-validation.md
    content-cleanup-plan.md
    review-feedback-workflow-validation.md
    v2-approved-baseline.md
    v2-governance-corrections.md
    v2-validation-checklist.md
    v2-workspace-naming.md
  governance/
    common-rules.md
    context-efficiency.md
    markdown-reporting.md
    observability.md
  pbi/
    README.md
    metrics.md
  repo-context/
    README.md
    architecture.md
    code-policies.md
    codebase-index.md
    coding_standards.md
    context_budget.md
    domain_glossary.md
    file_index.md
    module_map.md
    test_strategy.md
    workflow.md
  reviews/
    README.md
    metrics.md
  skills/
    README.md
    common-skill-rules.md
    *.skill.md
```

## 2. Skills Inventory

| Current Path                                       | Current Skill Name       | Category   | Prefix OK                             | Suggested Future Path                                                                        | Duplicate / Overlap Risk                                                  |
| -------------------------------------------------- | ------------------------ | ---------- | ------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `docs/ai/skills/docs-ai-cleanup-audit.skill.md`    | docs-ai-cleanup-audit    | governance | No convention gap                     | `docs/ai/skills/tools/tools_docs_ai_cleanup_audit.skill.md` or governance prefix if approved | Overlaps with existing `docs/ai/foundation/content-cleanup-plan.md` scope |
| `docs/ai/skills/fix-phase.skill.md`                | fix-phase                | pbi        | No                                    | `docs/ai/skills/pbi/pbi_fix_phase.skill.md`                                                  | Adjacent to `review-feedback-analysis`; fix execution remains distinct    |
| `docs/ai/skills/implementation-phase.skill.md`     | implementation-phase     | pbi        | No                                    | `docs/ai/skills/pbi/pbi_implementation_phase.skill.md`                                       | Low                                                                       |
| `docs/ai/skills/pbi-clarification.skill.md`        | pbi-clarification        | pbi        | Partial, hyphen not future underscore | `docs/ai/skills/pbi/pbi_clarification.skill.md`                                              | Low                                                                       |
| `docs/ai/skills/pbi-final-handoff.skill.md`        | pbi-final-handoff        | pbi        | Partial                               | `docs/ai/skills/pbi/pbi_final_handoff.skill.md`                                              | Low                                                                       |
| `docs/ai/skills/pbi-plan-create.skill.md`          | pbi-plan-create          | pbi        | Partial                               | `docs/ai/skills/pbi/pbi_plan_create.skill.md`                                                | Low                                                                       |
| `docs/ai/skills/pbi-workspace-create.skill.md`     | pbi-workspace-create     | pbi        | Partial                               | `docs/ai/skills/pbi/pbi_workspace_create.skill.md`                                           | Low                                                                       |
| `docs/ai/skills/policy-plan-update.skill.md`       | policy-plan-update       | governance | No convention gap                     | `docs/ai/skills/tools/tools_policy_plan_update.skill.md` or governance prefix if approved    | Overlaps repo-context policy update rules; needs strong boundaries        |
| `docs/ai/skills/pr-review-workflow.skill.md`       | pr-review-workflow       | pr         | Partial                               | `docs/ai/skills/pr/pr_review_workflow.skill.md`                                              | Orchestrates lower-level review skills                                    |
| `docs/ai/skills/repo-context-update.skill.md`      | repo-context-update      | tools      | No                                    | `docs/ai/skills/tools/tools_repo_context_update.skill.md`                                    | Unique owner of repo-context writes                                       |
| `docs/ai/skills/review-comments-create.skill.md`   | review-comments-create   | review     | Partial                               | `docs/ai/skills/review/review_comments_create.skill.md`                                      | Part of PR review pipeline                                                |
| `docs/ai/skills/review-diff-analysis.skill.md`     | review-diff-analysis     | review     | Partial                               | `docs/ai/skills/review/review_diff_analysis.skill.md`                                        | Overlaps with `pr-review-workflow` but as a sub-step                      |
| `docs/ai/skills/review-feedback-analysis.skill.md` | review-feedback-analysis | pbi        | No, name suggests review              | `docs/ai/skills/pbi/pbi_review_feedback_analysis.skill.md`                                   | Naming overlaps review workflow; actually writes PBI RF files             |
| `docs/ai/skills/review-final-handoff.skill.md`     | review-final-handoff     | review     | Partial                               | `docs/ai/skills/review/review_final_handoff.skill.md`                                        | Low                                                                       |
| `docs/ai/skills/review-followup.skill.md`          | review-followup          | review     | Partial                               | `docs/ai/skills/review/review_followup.skill.md`                                             | Low                                                                       |
| `docs/ai/skills/review-phase.skill.md`             | review-phase             | pbi        | No, ambiguous                         | `docs/ai/skills/pbi/pbi_review_phase.skill.md`                                               | Easily confused with PR review skills                                     |
| `docs/ai/skills/review-workspace-create.skill.md`  | review-workspace-create  | review     | Partial                               | `docs/ai/skills/review/review_workspace_create.skill.md`                                     | Low                                                                       |

## 3. Governance / Rules Inventory

| Path                                            | Purpose                                           | Suggested Location                                                                              | Reason                                                         |
| ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `AGENTS.md`                                     | Root entry contract, global V2 rules              | keep current location                                                                           | Required root-level agent file                                 |
| `CLAUDE.md`                                     | Claude adapter and orchestration rules            | keep current location                                                                           | Agent-specific adapter explicitly expected                     |
| `docs/ai/START_HERE.md`                         | Runtime routing entry                             | keep current location                                                                           | Daily entrypoint, should stay small                            |
| `docs/ai/README.md`                             | Top-level docs/ai orientation                     | keep current location                                                                           | Already routing/index style                                    |
| `docs/ai/skills/README.md`                      | Skill routing index                               | keep current location                                                                           | Already selected-skill router                                  |
| `docs/ai/governance/common-rules.md`            | Canonical shared operating rules                  | keep current location or planned `docs/ai/skills/governance/` only after compatibility decision | Existing system already centralizes governance here            |
| `docs/ai/governance/context-efficiency.md`      | Canonical read-order/context rules                | keep current location                                                                           | Already referenced by skills                                   |
| `docs/ai/governance/markdown-reporting.md`      | Canonical Markdown Files Changed format           | keep current location                                                                           | Already canonical and compact                                  |
| `docs/ai/governance/observability.md`           | Metrics/ObsV1.1 rules                             | keep current location                                                                           | Runtime skills reference it                                    |
| `docs/ai/foundation/v2-approved-baseline.md`    | Full baseline governance                          | keep current location                                                                           | Foundation source, not daily runtime                           |
| `docs/ai/foundation/v2-validation-checklist.md` | Governance validation checklist                   | keep current location                                                                           | Required after governance edits                                |
| `docs/ai/repo-context/code-policies.md`         | Active repository code policies                   | `docs/ai/repo-context/policy/` candidate                                                        | Policy content, not general repo knowledge                     |
| `docs/ai/repo-context/context_budget.md`        | Compatibility pointer to governance context rules | `docs/ai/repo-context/policy/` candidate or keep as compatibility pointer                       | Policy-like, but currently a backward-compatible routing alias |
| `docs/ai/repo-context/coding_standards.md`      | Repo conventions and policy pointer               | keep current location or split policy section later                                             | Mixed standards plus pointer                                   |
| `docs/ai/repo-context/workflow.md`              | Repository workflow notes                         | keep current location                                                                           | Repo-specific workflow knowledge                               |

## 4. Repo-Context Inventory

Existing files:

```text
architecture.md
code-policies.md
codebase-index.md
coding_standards.md
context_budget.md
domain_glossary.md
file_index.md
module_map.md
README.md
test_strategy.md
workflow.md
```

Repository knowledge files: `architecture.md`, `codebase-index.md`, `domain_glossary.md`, `file_index.md`, `module_map.md`, `test_strategy.md`, `workflow.md`.

Codebase policy files: `code-policies.md`, `coding_standards.md`, `context_budget.md`.

Move candidates for `docs/ai/repo-context/policy/`: `code-policies.md` and maybe `context_budget.md`. `coding_standards.md` should be split only if preserving compatibility pointers.

Required files status:

```text
code-policies.md: exists
coding_standards.md: exists
context_budget.md: exists
```

## 5. Foundation Snapshot

`docs/ai/foundation` contains approved baseline, validation checklist, compatibility validation, governance correction history, workspace naming, review-feedback workflow validation, and cleanup planning.

It appears runtime-critical as an authority source, but not daily-runtime critical. `START_HERE.md` explicitly says not to read `foundation/*` unless the task is AI OS maintenance.

Runtime workflows reference foundation indirectly through governance validation rules, especially after changes to skills, naming, workflow, foundation, `START_HERE.md`, or common rules.

For this refactor assessment, foundation should be kept unchanged for now, except using it as validation authority.

## 6. Current Runtime Read Path

PBI workflow:

```text
AGENTS.md -> CLAUDE.md if applicable -> docs/ai/START_HERE.md -> docs/ai/skills/README.md -> selected PBI skill -> active docs/ai/pbi/STP-XXXX files -> repo-context only if needed
```

Review workflow:

```text
AGENTS.md -> CLAUDE.md if applicable -> docs/ai/START_HERE.md -> docs/ai/skills/README.md -> pr-review-workflow or selected review skill -> active docs/ai/reviews/STP-XXXX files -> local git diff -> changed files only when needed
```

PR review workflow:

```text
pr-review-workflow -> review workspace creation/context -> git diff BASE_BRANCH...HEAD -> comments/suggestions/handoff sections
```

Repo-context update workflow:

```text
repo-context-update explicitly invoked -> current relevant repo-context files -> targeted source/doc inspection -> update docs/ai/repo-context/*
```

Agents are currently told multiple times not to read too many files. The rule is correct but duplicated across `AGENTS.md`, `CLAUDE.md`, `START_HERE.md`, README files, governance, foundation validation, and skills.

## 7. Duplication and Token Cost Risks

| Repeated Rule                                | Appears In                                                                                                       | Suggested Canonical Location                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Markdown files are shared memory             | `AGENTS.md`, `docs/ai/governance/common-rules.md`, `docs/ai/foundation/v2-approved-baseline.md`, validation docs | `docs/ai/skills/governance/common-rules.md` if moved, otherwise current `docs/ai/governance/common-rules.md` |
| Agents are stateless workers                 | `AGENTS.md`, `CLAUDE.md`, `docs/ai/governance/common-rules.md`, foundation                                       | `skills/governance/common-rules.md`                                                                          |
| Use skill + parameters                       | `AGENTS.md`, `CLAUDE.md`, `START_HERE.md`, `skills/README.md`, governance                                        | `skills/governance/common-rules.md` plus short routing pointers                                              |
| Markdown Files Changed                       | `AGENTS.md`, `CLAUDE.md`, most skill files, `docs/ai/governance/markdown-reporting.md`, foundation               | `skills/governance/markdown-change-reporting.md`                                                             |
| Do not read all docs/ai/all skills/source    | `AGENTS.md`, `CLAUDE.md`, `START_HERE.md`, `docs/ai/README.md`, `skills/README.md`, governance, README files     | `repo-context/policy/context_budget.md` or `skills/governance/read-order.md`                                 |
| repo-context read-only except owner skills   | `AGENTS.md`, `CLAUDE.md`, `common-rules.md`, `repo-context/README.md`, many skills                               | `skills/governance/common-rules.md`                                                                          |
| Review uses local git diff                   | `AGENTS.md`, `CLAUDE.md`, `common-rules.md`, review skills, validation checklist                                 | `skills/governance/common-rules.md` and review skill specifics                                               |
| Review must not modify source / call PR APIs | `AGENTS.md`, `CLAUDE.md`, `common-rules.md`, review skills                                                       | `skills/governance/common-rules.md`                                                                          |
| Quality first / simplicity                   | `AGENTS.md`, `common-rules.md`, foundation                                                                       | `skills/governance/common-rules.md`                                                                          |
| Context efficiency rules                     | `AGENTS.md`, `CLAUDE.md`, `START_HERE.md`, `context-efficiency.md`, `repo-context/context_budget.md`, foundation | `repo-context/policy/context_budget.md` plus compatibility pointer                                           |

## 8. Refactor Readiness Assessment

The repo is already partially optimized: global rules are centralized in `docs/ai/governance/`, skill files are compact, and README files are mostly routing/index documents.

Main blocker: the planned target `docs/ai/skills/governance/` conflicts with the current established `docs/ai/governance/` path. A safe refactor must either keep compatibility pointers or explicitly update every reference.

Naming refactor risk is medium: skill names are currently routing IDs. Renaming files with `pbi_*`, `review_*`, `pr_*`, and `tools_*` would require updating `START_HERE.md`, `skills/README.md`, `CLAUDE.md`, skill cross-references, foundation validation, and any user prompts that invoke old names.

Backward compatibility requires aliases or bridge docs. Direct renames without compatibility would break the “select one approved skill” flow.

Repo-context policy split is feasible but must preserve `code-policies.md`, `coding_standards.md`, and `context_budget.md` references, because `AGENTS.md`, validation, and skills point to current paths.

`foundation` can be ignored for daily refactor mechanics, but must be used for validation after governance/skill naming edits.

## 9. Recommended Refactor Constraints

- Keep `foundation` unchanged during first pass.
- Do not rename workflow IDs until alias strategy exists.
- Preserve old skill filenames or add compatibility routing entries if new prefixed files are introduced.
- Keep old repo-context policy paths as compatibility pointers if files move under `repo-context/policy/`.
- Do not remove skill parameters, update lists, stop conditions, or final output sections.
- Keep `docs/ai/governance/` references valid unless the move to `docs/ai/skills/governance/` is fully migrated.
- Re-run V2 validation checklist after any skill, naming, workflow, `START_HERE.md`, common rule, or foundation edit.
- Do not introduce V3 Harness concepts.

## 10. Questions / Ambiguities

- Should `docs/ai/governance/` remain canonical, or should governance really move under `docs/ai/skills/governance/`?
- Should future skill names use underscores in filenames only, or also change the runtime skill IDs?
- Is `review-feedback-analysis` intended to remain a PBI skill despite the `review-` prefix?
- Should `docs-ai-cleanup-audit` become `tools_docs_ai_cleanup_audit`, or should a separate governance prefix be added to the naming convention?

No files were modified. No lint or eslint commands were run.
