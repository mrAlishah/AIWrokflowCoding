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

## Reference Boundary

`docs/ai/reference/**` is non-runtime documentation.

Daily runtime workflows, PR review workflows, and PBI implementation workflows must not read `docs/ai/reference/**`.

Read `docs/ai/reference/**` only when the selected task explicitly requires guides, prompt/help maintenance, validation, history, decisions, system health, or AI OS maintenance.

## Runtime Config

If `docs/ai/config/runtime-config.yaml` exists, read it after `docs/ai/skills/README.md` only to apply runtime preferences such as terminal-output optimization and observability metrics behavior.

Runtime config does not change skill routing, workflow behavior, source-code permissions, review-only guardrails, or the reference boundary.

## Extra File Rule

Before reading files outside the approved scope, report:

```text
Requested File:
Reason:
Expected Decision Impact:
```

Read the extra file only when it changes implementation quality, validation quality, review quality, risk assessment, or user-facing behavior.
