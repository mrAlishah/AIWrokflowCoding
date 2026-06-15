# Common Skill Rules

Use these common rules to reduce drift across official skills. They do not replace the required rules inside critical skill files.

## Markdown Change Reporting Rule

Whenever any markdown file is created, updated, renamed, or deleted, the agent must report it under:

## Markdown Files Changed

For each file:

- File path
- Action: Created / Updated / Renamed / Deleted
- Reason
- Summary of changes
- Whether the change affects future AI context

## Context Read Order

Read context in this order:

1. `docs/ai/skills/README.md`
2. Selected skill file
3. Active workspace:
   - `docs/ai/pbi/STP-XXXX/*`
   - or `docs/ai/reviews/STP-XXXX/*`
4. repo-context routing docs:
   - `docs/ai/repo-context/module_map.md`
   - `docs/ai/repo-context/file_index.md`
   - `docs/ai/repo-context/context_budget.md`
5. Exact source files listed in phase, context, or diff

Do not read the entire repository, all `docs/ai`, all skills, or the whole codebase unless a later explicit instruction requires it.

Context efficiency must preserve implementation quality, validation quality, and review quality. Do not use hard token limits, maximum file limits, or strict context quotas as a reason to skip required understanding.

## Extra File Justification Rule

Before reading any extra file, state:

```text
Requested File:

Reason:

Expected Decision Impact:
```

If the reason cannot be stated clearly, do not read the extra file.

## PBI Validation Rule

PBI workflows must read and maintain:

```text
docs/ai/pbi/STP-XXXX/05-validation.md
```

No automated tests does not mean no validation.

Implementation, review, fix, planning, and final handoff skills must keep validation requirements, known risks, and sign-off criteria aligned with the PBI state.

## Workspace Metrics Rule

Operational skills must append lightweight execution metrics to the active workspace metrics file:

```text
docs/ai/pbi/STP-XXXX/99-metrics.md
docs/ai/reviews/STP-XXXX/99-metrics.md
```

Operational skills must also update the matching aggregate dashboard:

```text
docs/ai/pbi/metrics.md
docs/ai/reviews/metrics.md
```

Metrics belong to the work item. Use estimated metrics instead of exact token counts.

Do not add external telemetry, exact token tracking, API-based cost calculation, real-time dashboards, confidence scores, trust metrics, self-correction loops, or autonomous optimization.

Context efficiency metrics must never reduce implementation quality, validation quality, or review quality. When additional context is required, read it and record the reason.

PBI context efficiency ratio:

```text
Files Changed / Files Read
```

Review context efficiency ratio:

```text
Source Files Reviewed / Files Read
```

Use `N/A` for non-phase skills. Phase information belongs only in `99-metrics.md`, not in central dashboards.

PBI `99-metrics.md` schema:

```markdown
# Execution Metrics

| Timestamp | Agent | Skill | Phase | Duration (min) | Prompts | Files Read | Files Changed | Commands | Context Expansions | Context Size | Context Efficiency Ratio | Cost | Scope Violations |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|---:|---|---|

## Execution Details

### <Timestamp>

#### Files Read

- ...

#### Files Changed

- ...

#### Extra Files Requested

- ...

Reason:

...
```

Review `99-metrics.md` schema:

```markdown
# Execution Metrics

| Timestamp | Agent | Skill | Phase | Duration (min) | Prompts | Files Read | Source Files Reviewed | Markdown Files Changed | Context Expansions | Context Size | Context Efficiency Ratio | Cost | Scope Violations |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|---:|---|---|

## Execution Details

### <Timestamp>

#### Files Read

- ...

#### Source Files Reviewed

- ...

#### Markdown Files Changed

- ...

#### Extra Files Requested

- ...

Reason:

...
```

## Source Code Modification Rule

Do not modify source code unless the selected skill explicitly allows it and the current task scope requires it.

## Skill Selection Rule

Use one approved skill at a time.

If a task could match multiple skills, choose the least invasive skill that can safely handle the current step.

If no approved skill matches the task, stop and ask for a workflow decision instead of inventing a custom workflow.

## Stop Condition Rule

Stop before changing files when:

- the selected skill does not allow the needed update
- source code modification would be required but the selected skill forbids it
- the required workspace or stable identifier is missing
- scope, risk, or validation expectations are unclear
- required file or tool access is unavailable

When stopping, report the blocker, inspected files, and recommended next skill or prompt.

## repo-context Ownership Rule

Only `repo-context-update` may update `docs/ai/repo-context/*`. All other skills must treat repo-context as read-only.

Exception: `policy-plan-update` may update reusable repository policy files under `docs/ai/repo-context/` only when `SCOPE: global`, `INPUT_TAG: USER_CODE_POLICY`, and `UPDATE_MODE: apply-global-rule`.

## Workspace Resolution Rule

Users should provide stable identifiers, not repeated file paths.

Skills must resolve workspace files from identifiers.

Examples:

```text
PBI_ID -> docs/ai/pbi/{PBI_ID}/
RF_ID -> docs/ai/pbi/{PBI_ID}/phases/review-feedback.md and matching RF file
PHASE -> docs/ai/pbi/{PBI_ID}/phases/{PHASE}.md
```

User prompts should prefer:

```text
PBI_ID
RF_ID
TAG
```

over hardcoded file paths.

## Comment Quality Rule

- Comment important intent.
- Comment important business logic.
- Comment important validation rules.
- Comment important technical decisions.
- Comment compatibility rules or behavior copied from existing codebase patterns.
- Avoid obvious comments.
- Avoid noisy comments.
- Avoid commenting every line.

## Simplicity Rule

- Keep code simple, readable, and aligned with repo conventions.
- Avoid over-engineering.
- Avoid broad refactoring unless explicitly requested.
- Prefer minimal files and minimal lines.

## Active Code Policies

Active code policies are defined in `docs/ai/repo-context/code-policies.md`.

Implementation, fix, and review skills must apply active code policies when they touch or inspect affected code.
