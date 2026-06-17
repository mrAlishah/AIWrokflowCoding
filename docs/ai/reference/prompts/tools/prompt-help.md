# TOOLS Prompt Help

## Purpose

This folder contains ready-to-run prompt forms for TOOLS work.

## How To Use

1. Open the prompt that matches the skill you need.
2. Replace parameter values only.
3. Keep each parameter name unchanged.
4. Execute one prompt at a time.

## Prompt Types

- `.prompt.md`: full ready-to-run prompt with read path, constraints, expected updates, and final response format.
- `-short.prompt.md`: shorter daily-use prompt with the same parameters.
- `.help.md`: parameter meanings, allowed values, defaults, examples, rules, mistakes, and token tips.

## Current Prompts

- `01-tools-system-health-check`: run AI OS health reports.
- `02-tools-repo-context-update`: refresh reusable repo-context knowledge.
- `03-tools-policy-plan-update`: synchronize approved planning or policy input.
- `04-tools-docs-ai-cleanup-audit`: audit `docs/ai` cleanup and context-cost risks.
- `05-tools-reference-update`: maintain user-facing reference guides and prompts.

## Parameter Rules

Each prompt uses one parameter per field. Do not combine parameter names. If a parameter has fixed options, use one value from the matching help file.

## Common Prompt Usage Mistakes

- Leaving sample IDs unchanged.
- Adding undocumented parameters.
- Running multiple skills in one request.
- Asking for all docs, all skills, or the whole repository.

## Runtime Safety

These prompts are non-runtime reference material. They preserve the V2 read path and do not change workflow behavior.
