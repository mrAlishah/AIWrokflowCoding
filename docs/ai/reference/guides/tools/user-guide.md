# Tools User Guide

## What This Area Is For

Tools guides explain how to run maintenance tools for health checks, repo-context updates, policy synchronization, and docs cleanup audits.

## Who Should Use It

Use this area when asking an AI agent to perform Tools work in the V2 AI Operating System.

## When To Use It

Use it when the task matches one listed skill and you want a safe workflow instead of a custom prompt.

## Required Inputs

Common inputs include stable identifiers such as `STP_ID`, branch names, scope, acceptance criteria, review findings, or the user request. Exact inputs are listed in each prompt help file.

## Expected Outputs

Expected outputs are written under `tool-specific markdown files under docs/ai/` or another tool-specific markdown location listed in the selected prompt.

## Which Agent To Use

Any agent following the selected tools skill and its update boundaries.

## How To Start

1. Open `docs/ai/reference/help-index.md`.
2. Pick the area: `tools`.
3. Read this guide and the area workflow.
4. Copy the matching prompt from `docs/ai/reference/prompts/tools/`.
5. Replace placeholders and run one skill.

## What Files Will Be Created Or Updated

- docs/ai/reference/system-health/latest.md
- docs/ai/reference/system-health/history/YYYY-MM-DD.md
- docs/ai/repo-context/*
- Planning files or docs/ai/repo-context/policy/*
- Cleanup report or plan under docs/ai/reference/history/foundation/
- docs/ai/reference/README.md
- docs/ai/reference/help-index.md
- docs/ai/reference/guides/
- docs/ai/reference/prompts/

## Common Mistakes

- Starting from a prompt that does not match the task.
- Running multiple skills in one request.
- Reading all docs or the whole repository by default.
- Using old skill names instead of canonical names.

## Token Cost Rules

Keep context narrow: `START_HERE.md`, `skills/README.md`, selected skill, active workspace, repo-context only if needed, exact source files only if needed.

## What Not To Do

Do not use reference docs as runtime authority. Do not introduce V3 concepts. Do not remove compatibility mappings. Do not change workflow behavior from a prompt template.
