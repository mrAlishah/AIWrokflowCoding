Use skill: pbi_review_phase

Parameters:

PBI_ID:
STP-123

PHASE:
phase-01

DIFF_OR_CHANGED_FILES:
src/views/Settings/SettingsOverview.vue

REVIEW_MODE:
normal
Options: normal / strict

Task:
Review implemented PBI work and return findings first without modifying source code.

Key constraints:
- Read only the selected skill.
- Use repo-context only if needed.
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.

Expected output:
- PBI review notes when needed
- docs/ai/pbi/{PBI_ID}/05-validation.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md
- Final response required by pbi_review_phase
