Use skill: pbi_final_handoff

Parameters:

STP_ID:
STP-123

CHANGED_FILES:
src/views/Settings/SettingsOverview.vue

VALIDATION_RESULTS:
Manual verification completed.

KNOWN_RISKS:
No known runtime risks.

PR_SUMMARY:
Adds audit-log filters.

REVIEW_FOCUS:
Verify filter behavior.

Task:
Create final handoff after implementation, review, fixes, and validation are complete.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_final_handoff
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

Expected updates:
- docs/ai/pbi/{STP_ID}/06-handoff.md
- docs/ai/pbi/{STP_ID}/99-metrics.md

Final response format:
Return Summary, Changed files, Validation performed and not performed, Known risks, PR summary, Markdown Files Changed, and Recommended next action.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
