# PBI User Guide

## What This Area Is For

PBI guides explain how to turn product backlog items into planned, implemented, reviewed, fixed, and handed-off work.

## Who Should Use It

Use this area when asking an AI agent to perform PBI work in the V2 AI Operating System.

## When To Use It

Use it when the task matches one listed skill and you want a safe workflow instead of a custom prompt.

## Required Inputs

Common inputs include stable identifiers such as `STP_ID`, branch names, scope, acceptance criteria, review findings, or the user request. Exact inputs are listed in each prompt help file.

## Expected Outputs

Expected outputs are written under `docs/ai/pbi/{STP_ID}/` or another tool-specific markdown location listed in the selected prompt.

## Which Agent To Use

Any agent that follows AGENTS.md and the V2 skill index.

## How To Start

1. Open `docs/ai/reference/help-index.md`.
2. Pick the area: `pbi`.
3. Read this guide and the area workflow.
4. Copy the matching prompt from `docs/ai/reference/prompts/pbi/`.
5. Replace placeholders and run one skill.

## What Files Will Be Created Or Updated

- 00-approved-pbi.md
- 99-metrics.md
- PBI workspace files
- docs/ai/pbi/metrics.md
- 01-context.md
- 02-implementation-plan.md
- 03-codebase-index.md
- 05-validation.md
- phases/*.md
- Approved target files
- selected phase file
- PBI review notes
- Target files
- phase or RF file
- 06-handoff.md

- phases/review-feedback.md
- phases/RF-*.md

## Common Mistakes

- Starting from a prompt that does not match the task.
- Running multiple skills in one request.
- Reading all docs or the whole repository by default.
- Using old skill names instead of canonical names.

## Token Cost Rules

Keep context narrow: `START_HERE.md`, `skills/README.md`, selected skill, active workspace, repo-context only if needed, exact source files only if needed.

## What Not To Do

Do not use reference docs as runtime authority. Do not introduce V3 concepts. Do not remove compatibility mappings. Do not change workflow behavior from a prompt template.
