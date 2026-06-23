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

Key constraints:
- Do not modify source code.
- Do not change workflow behavior.
- Read only the selected skill and required docs.
- Report markdown changes.

Expected output:
- Cleanup report or cleanup plan under docs/ai/reference/history/foundation/
- Final response required by tools_docs_ai_cleanup_audit
