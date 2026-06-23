Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
[initial population / architecture changed / test strategy changed / files changed and updated]

REPOSITORY_AREAS:
settings module and audit-log workflow

INSPECTION_SCOPE:
targeted / standard

Task:
Refresh stable reusable repo-context knowledge for listed repository areas only.

Required read path:

1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_repo_context_update
5. Active workspace only when required
6. repo-context only if needed
7. Exact source files only if needed

Constraints:

- Do not read all docs/ai.
- Do not read all skills.
- Do not read the entire repository.
- Before reading extra files, explain why.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Do not modify source code.
- Do not change workflow behavior.
- Report markdown changes.

Expected updates:

- docs/ai/repo-context/\*
- docs/ai/repo-context/policy/\* when relevant

Final response format:
Return Summary, Repo-context files updated, Source areas inspected, Markdown Files Changed, and Recommended next action.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
