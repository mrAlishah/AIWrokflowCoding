# Review User Guide

## What This Area Is For

Review guides explain how to run lower-level local review steps when the full PR review workflow is not the right fit.

## Who Should Use It

Use this area when asking an AI agent to perform Review work in the V2 AI Operating System.

## When To Use It

Use it when the task matches one listed skill and you want a safe workflow instead of a custom prompt.

## Required Inputs

Common inputs include stable identifiers such as `STP_ID`, branch names, scope, acceptance criteria, review findings, or the user request. Exact inputs are listed in each prompt help file.

## Expected Outputs

Expected outputs are written under `docs/ai/reviews/{STP_ID}/` or another tool-specific markdown location listed in the selected prompt.

## Which Agent To Use

Any agent that can inspect local git diff and follows review-only constraints.

## How To Start

1. Open `docs/ai/reference/help-index.md`.
2. Pick the area: `review`.
3. Read this guide and the area workflow.
4. Copy the matching prompt from `docs/ai/reference/prompts/review/`.
5. Replace placeholders and run one skill.

## What Files Will Be Created Or Updated

- 01-review-brief.md
- 02-context.md
- 03-diff-analysis.md
- 04-en-pr-comments.md
- 05-fa-pr-suggestions.md
- 06-followup-log.md
- 07-handoff.md
- 99-metrics.md

## Common Mistakes

- Starting from a prompt that does not match the task.
- Running multiple skills in one request.
- Reading all docs or the whole repository by default.
- Using old skill names instead of canonical names.

## Token Cost Rules

Keep context narrow: `START_HERE.md`, `skills/README.md`, selected skill, active workspace, repo-context only if needed, exact source files only if needed.

## What Not To Do

Do not use reference docs as runtime authority. Do not introduce V3 concepts. Do not remove compatibility mappings. Do not change workflow behavior from a prompt template.
