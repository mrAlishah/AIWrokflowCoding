# 02 - Repo Context Incremental Update.prompt.md

Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
architecture_changed / test_strategy_changed / files_changed

REPOSITORY_AREAS:

module:settings
workflow:audit-log

INSPECTION_SCOPE:
targeted

Task:

Refresh stable reusable repo-context knowledge only for the listed repository areas.

Update repository knowledge only when changes affect future AI execution quality.

Required read path:

1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_repo_context_update
5. Existing repo-context only when needed
6. Exact source files only when needed

Constraints:

- Do not read unrelated modules.
- Do not read the entire repository.
- Do not read all docs/ai.
- Do not read all skills.
- Before reading extra files, explain why.
- Do not modify source code.
- Do not change workflow behavior.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Report markdown changes.

Expected updates:

- docs/ai/repo-context/\*
- docs/ai/repo-context/policy/\* when relevant

Final response format:

- Summary
- Source areas inspected
- Repo-context files updated
- Markdown Files Changed
- Recommended next action
