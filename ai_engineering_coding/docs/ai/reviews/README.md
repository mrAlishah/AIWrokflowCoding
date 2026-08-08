# Review Workflow

Local git diff driven review workspaces live under:

```text
docs/ai/reviews/STP-XXXX/
```

Daily end-to-end review entrypoint:

```text
pr_review_workflow
```

Lower-level review skills are listed in `docs/ai/skills/README.md`.

## Review Guardrails

- Use local git diff.
- Do not modify source code.
- Do not call PR APIs.
- Do not create pull requests.
- Do not push commits.

## Workspace Files

```text
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
99-metrics.md
```

Read only the active `STP-XXXX` workspace required by the selected skill.

## Governance

- Common rules: [../skills/governance/common-rules.md](../skills/governance/common-rules.md)
- Read order: [../skills/governance/read-order.md](../skills/governance/read-order.md)
- Markdown reporting: [../skills/governance/markdown-change-reporting.md](../skills/governance/markdown-change-reporting.md)
- Observability: [../skills/governance/observability.md](../skills/governance/observability.md)
