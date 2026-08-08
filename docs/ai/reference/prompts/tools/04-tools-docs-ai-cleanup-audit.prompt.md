Use skill: tools_docs_ai_cleanup_audit

Parameters:

CLEANUP_SCOPE:
docs/ai/reference

CLEANUP_MODE:
audit-only
Options: audit-only

TARGET_AREA:
prompts

MAX_INSPECTION_DEPTH:
standard
Options: standard / deep

INCLUDE_DONE_WORKSPACES:
false
Options: true / false

OUTPUT_MODE:
report
Options: report / plan

ALLOW_MARKDOWN_UPDATES:
false
Options: true / false

Task:
Audit the target docs/ai area for cleanup and context-cost risks without changing active workflow behavior.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_docs_ai_cleanup_audit
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
- Cleanup report or cleanup plan under docs/ai/reference/history/foundation/

Final response format:
Return Summary, Files audited, Duplications found, Cleanup recommendations, Markdown Files Changed, and Recommended next action.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
