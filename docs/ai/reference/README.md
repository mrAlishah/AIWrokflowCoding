# AI Reference

## Purpose

Non-runtime AI documentation lives here: guides, ready prompts, validation material, history, decisions, and system health reports.

## Guides vs Prompts

Guides explain how the V2 AI Operating System works and when to use each workflow. Prompts are paste-ready execution templates for existing skills.

## Available Areas

- `pbi`: PBI clarification, workspace, planning, implementation, review, fixes, and handoff.
- `pr`: daily local PR/code review workflow.
- `review`: lower-level local review steps.
- `tools`: AI OS health, repo-context, policy, and cleanup tools.

## New User Start

Start with `help-index.md`. For professional multi-model or multi-agent usage, read `guides/professional-end-user-guide.fa.md` for Persian or `guides/professional-end-user-guide.en.md` for English, then copy only the prompt that matches the selected skill.

## Ready Prompts

Ready prompts live under `prompts/{area}/`. Each skill has a full prompt, a short prompt, and a help file when the skill exists.

## Non-Runtime Rule

`docs/ai/reference/` is outside normal AI execution and must not be read by default. Agents read it only when the user explicitly asks for guides, prompts, validation, history, decisions, or AI OS maintenance.

## System Health Reports

System health reports live in `system-health/`.

## Historical Files

Historical foundation records live in `history/foundation/` and are not current runtime authority.

## Canonical Runtime Sources

- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/governance/`
- `docs/ai/repo-context/policy/`
- `docs/ai/skills/{pbi,review,pr,tools}/`
