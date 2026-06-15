# Start Here

Daily runtime usage starts here after the agent entry contract.

Cold-start agents must first read:

```text
AGENTS.md
agent-specific file if it exists, for example CLAUDE.md
```

Then continue with this file.

## Read Order

1. Read `docs/ai/START_HERE.md`.
2. Read `docs/ai/skills/README.md`.
3. Select one approved skill.
4. Read the selected skill file only.

Do not read all docs, all skills, or the whole repository by default.

Daily runtime path:

```text
AGENTS.md -> optional agent-specific file -> START_HERE.md -> skills/README.md -> selected skill -> active workspace -> repo-context only if needed
```

## Routing

| Task | Route |
| --- | --- |
| Raw or unclear PBI | `pbi-clarification` |
| PBI task | `docs/ai/skills/README.md` -> selected PBI skill |
| Review task | `docs/ai/skills/README.md` -> selected review skill |
| User answer or policy update | `policy-plan-update` |
| Repo knowledge update | `repo-context-update` |
| Long-term docs cleanup audit | `docs-ai-cleanup-audit` |
| AI OS maintenance | `docs/ai/foundation/v2-approved-baseline.md` and relevant foundation docs |

## Rules

- Use one selected skill at a time.
- Read active workspace files only when the selected skill requires them.
- Read repo-context or source files only when the selected skill allows it.
- Do not read `docs/ai/foundation/*` unless the task is AI OS maintenance.
- Do not read `setup-prompts/*` unless the task is setup or prompt maintenance.
- Do not read validation reports unless the task is validation.
- For tagged user answers or policy changes that must sync into planning files, use `policy-plan-update`.
- For long-term `docs/ai` cleanup or context-cost audit, use `docs-ai-cleanup-audit`.
- Do not use cleanup audits during normal PBI implementation or PR review.
- Keep changes minimal and report markdown changes.
