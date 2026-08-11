# Tools Workflow

## Workflow Overview

Tools work follows one selected skill at a time. Use prompts in numbered order only when the task actually needs each step.

## Step By Step Flow

01. `tools_system_health_check`: Audit the AI Operating System health and write reports.
02. `tools_repo_context_update`: Refresh reusable repository knowledge.
03. `tools_policy_plan_update`: Synchronize tagged user answers or approved policy changes.
04. `tools_docs_ai_cleanup_audit`: Audit docs/ai cleanup, duplication, stale content, and context cost risk.
05. `tools_reference_update`: Maintain user-facing reference guides and prompts.

## Skill Sequence

- 01: `tools_system_health_check`
- 02: `tools_repo_context_update`
- 03: `tools_policy_plan_update`
- 04: `tools_docs_ai_cleanup_audit`
- 05: `tools_reference_update`

## Input And Output Per Step

- `tools_system_health_check`: inputs: AI OS docs only; no source code. outputs: docs/ai/reference/system-health/latest.md; docs/ai/reference/system-health/history/YYYY-MM-DD.md.
- `tools_repo_context_update`: inputs: Existing repo-context and targeted repository files. outputs: docs/ai/repo-context/*.
- `tools_policy_plan_update`: inputs: Active workspace, RF files, or policy files depending on scope. outputs: Planning files or docs/ai/repo-context/policy/*.
- `tools_docs_ai_cleanup_audit`: inputs: Targeted docs/ai areas only. outputs: Cleanup report or plan under docs/ai/reference/history/foundation/.
- `tools_reference_update`: inputs: skills index, selected skill files when needed, and affected reference files. outputs: docs/ai/reference/README.md; docs/ai/reference/help-index.md; docs/ai/reference/guides/; docs/ai/reference/prompts/.

## Stop Conditions

Stop when required parameters are missing, scope is unclear, the selected skill does not allow the requested action, or the task would require broad context expansion without approval.

## Validation Expectations

Follow the selected skill validation requirements and report performed or skipped validation honestly. Review-only workflows must stay local-git-driven and source-read-only.

## Next Step Decision Rules

Use the next numbered prompt only when the previous step completed successfully and the next action is still needed. If the task is blocked, ask for the missing input instead of guessing.
