# Tools Help Index

## Guide Files

- `user-guide.md`: explains who should use this area and how to start.
- `workflow.md`: explains the step sequence and decision rules.
- `help-index.md`: maps guides, prompts, skills, and outputs.

## Prompt Folder

Prompts live in `docs/ai/reference/prompts/tools/`. They are paste-ready templates, not runtime instructions.

## Prompt Files

- `01-tools-system-health-check.prompt.md`: full prompt for `tools_system_health_check`.
- `01-tools-system-health-check-short.prompt.md`: short daily prompt for `tools_system_health_check`.
- `01-tools-system-health-check.help.md`: parameter and usage help for `tools_system_health_check`.
- `02-tools-repo-context-update.prompt.md`: full prompt for `tools_repo_context_update`.
- `02-tools-repo-context-update-short.prompt.md`: short daily prompt for `tools_repo_context_update`.
- `02-tools-repo-context-update.help.md`: parameter and usage help for `tools_repo_context_update`.
- `03-tools-policy-plan-update.prompt.md`: full prompt for `tools_policy_plan_update`.
- `03-tools-policy-plan-update-short.prompt.md`: short daily prompt for `tools_policy_plan_update`.
- `03-tools-policy-plan-update.help.md`: parameter and usage help for `tools_policy_plan_update`.
- `04-tools-docs-ai-cleanup-audit.prompt.md`: full prompt for `tools_docs_ai_cleanup_audit`.
- `04-tools-docs-ai-cleanup-audit-short.prompt.md`: short daily prompt for `tools_docs_ai_cleanup_audit`.
- `04-tools-docs-ai-cleanup-audit.help.md`: parameter and usage help for `tools_docs_ai_cleanup_audit`.

## Related Skill Names

- `tools_system_health_check`
- `tools_repo_context_update`
- `tools_policy_plan_update`
- `tools_docs_ai_cleanup_audit`

## Expected Output Locations

- docs/ai/reference/system-health/latest.md
- docs/ai/reference/system-health/history/YYYY-MM-DD.md
- docs/ai/repo-context/*
- Planning files or docs/ai/repo-context/policy/*
- Cleanup report or plan under docs/ai/reference/history/foundation/

## Which Prompt To Use In Which Situation

Use the full prompt for first-time or careful execution. Use the short prompt for routine execution when parameters are already known.

## Not Available / Not Created

- None.
