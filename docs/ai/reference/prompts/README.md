# Prompts

## Purpose

Reusable prompts live here. They are paste-ready templates for existing V2 skills, not runtime skills themselves.

## Guides vs Prompts

Guides explain; prompts execute. Read a guide when learning the workflow. Copy a prompt when you are ready to run one skill.

## Contents

- `pbi/`: PBI workflow prompts.
- `pr/`: daily local PR/code review prompts.
- `review/`: lower-level review prompts.
- `tools/`: maintenance tools prompts.
- `system-health-prompts/`: reusable prompts for running full and short system health checks.

## Help Files

Prompt help is bilingual:

- `.help.en.md`: English help.
- `.help.fa.md`: Persian help.
- `.help.md`: compatibility help.

Prompt files list documented fixed options inline when the selected skill or help metadata defines those options.

## Usage Rule

Read this folder only when the user explicitly asks for reusable prompts or AI OS maintenance. Prompts preserve the V2 low-token runtime path and must not make agents read all docs, all skills, or the whole repository.
