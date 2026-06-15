# Read Order

Canonical context reading rules.

## Read Order

1. Agent entry files.
2. `docs/ai/START_HERE.md`.
3. `docs/ai/skills/README.md`.
4. Selected skill file only.
5. Active workspace only when the selected skill requires it.
6. repo-context routing files only when useful.
7. Exact source files, diff files, or docs required for the task.

## Rules

- Read the minimum context needed for a defensible decision.
- Prefer active workspace files.
- Prefer repo-context for stable repository knowledge.
- Prefer diff-first review.
- Do not read all `docs/ai`, all skills, or the whole repository by default.
- Quality takes priority over context minimization.
- Do not use hard token limits, maximum file limits, or strict quotas as a reason to skip required understanding.

## Extra File Rule

Before reading files outside the approved scope, report:

```text
Requested File:
Reason:
Expected Decision Impact:
```

Read the extra file only when it changes implementation quality, validation quality, review quality, risk assessment, or user-facing behavior.
