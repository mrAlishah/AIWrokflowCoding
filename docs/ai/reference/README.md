# AI Reference

## Purpose

Non-runtime AI documentation lives here, including guides, reusable prompts, validation material, history, and decision notes.

## Non-Runtime Rule

`docs/ai/reference/` is outside normal AI execution and must not be read by default.

## Folder Map

- `guides/`: user-facing and agent-facing guides.
- `prompts/`: reusable prompts that are not runtime skills.
- `validation/`: validation prompts and validation report templates.
- `history/`: historical records, migration notes, and archived foundation content.
- `decisions/`: system-level design decisions and approved baselines.

## When To Read

Read this folder only when the user explicitly asks for guides, prompts, validation, history, decisions, or AI OS maintenance.

## When Not To Read

Do not read this folder during normal PBI, review, PR review, tools, or implementation execution.

## Canonical Runtime Sources

- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/governance/`
- `docs/ai/repo-context/policy/`
- `docs/ai/skills/{pbi,review,pr,tools}/`
