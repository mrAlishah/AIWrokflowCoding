Use skill: pbi_implementation_phase

Parameters:

STP_ID:
STP-123

PHASE:
phase-01

TARGET_FILES:
src/views/Settings/SettingsOverview.vue

VERIFICATION:
Run targeted manual verification. Do not run npm lint unless explicitly requested.

Task:
Execute exactly one approved phase, modify only approved target files, and update phase memory.

Key constraints:
- Read only the selected skill.
- Use repo-context only if needed.
- Change only approved target files.

Expected output:
- Approved target files
- docs/ai/pbi/{STP_ID}/phases/{PHASE}.md
- docs/ai/pbi/{STP_ID}/05-validation.md
- Final response required by pbi_implementation_phase
