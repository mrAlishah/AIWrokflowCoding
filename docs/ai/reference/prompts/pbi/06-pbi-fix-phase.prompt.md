Use skill: pbi_fix_phase

Parameters:

PBI_ID:
STP-123

RF_ID:
RF-001

TARGET_FILES:
src/views/Settings/SettingsOverview.vue

VERIFICATION:
Run targeted manual verification. Do not run npm lint unless explicitly requested.

Task:
Apply only the approved fix, update related memory, and run requested verification.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_fix_phase
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
- Modify source code only when the selected skill explicitly allows it and the task requires it.
- Stay inside approved target files and scope.

Expected updates:
- Approved target files
- Relevant phase or RF file
- docs/ai/pbi/{PBI_ID}/05-validation.md

Final response format:
Return Summary, Fixes applied, Verification performed, Remaining risks, Markdown Files Changed, and Recommended next skill.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
