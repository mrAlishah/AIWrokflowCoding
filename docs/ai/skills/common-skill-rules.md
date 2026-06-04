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

## Extra File Justification Rule

Before reading any extra file, state:

- file path
- why it is needed
- what decision, risk, or validation it helps evaluate

If the reason cannot be stated clearly, do not read the extra file.

## Source Code Modification Rule

Do not modify source code unless the selected skill explicitly allows it and the current task scope requires it.

## repo-context Ownership Rule

Only `repo-context-update` may update `docs/ai/repo-context/*`. All other skills must treat repo-context as read-only.

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
