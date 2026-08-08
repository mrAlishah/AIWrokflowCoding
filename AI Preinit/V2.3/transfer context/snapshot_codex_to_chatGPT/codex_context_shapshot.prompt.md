# Prompt — Generate AI OS Current State Snapshot for ChatGPT

You are maintaining the V2 AI Operating System.

## Goal

Generate a concise but complete current-state snapshot so ChatGPT can understand the latest repository state and help with the next prompts/decisions.

Do not modify any files.
Do not change source code.
Do not create new files.
Do not introduce V3 concepts.

## Read Scope

Read only documentation needed to describe current state:
AGENTS.md
CLAUDE.md
docs/ai/README.md
docs/ai/START_HERE.md
docs/ai/skills/README.md
docs/ai/skills/governance/
docs/ai/skills/pbi/
docs/ai/skills/pr/
docs/ai/skills/review/
docs/ai/skills/tools/
docs/ai/reference/README.md
docs/ai/reference/help-index.md
docs/ai/reference/guides/
docs/ai/reference/prompts/
docs/ai/reference/system-health/latest.md
docs/ai/repo-context/README.md
docs/ai/repo-context/policy/

Do not read source code.

## Output Format

Return exactly this Markdown:

# AI OS Current State Snapshot

## Executive Summary

## Current Version / Status

## Active Priorities

## Current Folder Structure

## Current Runtime Read Path

## Current Skills

| Area | Skill | Path | Purpose |
| ---- | ----- | ---- | ------- |

## Current Reference Layer

## Current Prompt Template Status

## Current User Guide Status

## Current Governance Files

## Current Repo Policy Files

## Current System Health Status

## Recent Changes

## Open Issues

## Required Fixes

## Optional Improvements

## Risks

## Recommended Next Prompt For ChatGPT

## Files Read

## Important

Be precise.

Mention any missing, weak, incomplete, or low-quality prompt/help/user-guide files.

Especially check whether prompts are truly user-ready:

- no `<value>`
- no `PARAM_A or PARAM_B`
- concrete parameter examples
- option lists in help files
- user can run prompt without reading skill files

Do not hide problems.
