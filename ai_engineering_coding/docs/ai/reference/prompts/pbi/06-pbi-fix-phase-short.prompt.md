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

Key constraints:
- Read only the selected skill.
- Use repo-context only if needed.
- Change only approved target files.

Expected output:
- Approved target files
- Relevant phase or RF file
- docs/ai/pbi/{PBI_ID}/05-validation.md
- Final response required by pbi_fix_phase
