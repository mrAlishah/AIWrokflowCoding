Use skill: review_final_handoff

Parameters:

STP_ID:
STP-123

FINAL_STATUS:
needs-followup

REMAINING_RISKS:
No known remaining risks.

VALIDATION_PERFORMED:
Local diff review completed.

RECOMMENDED_DECISION:
needs-followup

Task:
Summarize final review state, issue categories, final decision, validation, and residual risk.

Key constraints:
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Read only the selected skill.

Expected output:
- docs/ai/reviews/{STP_ID}/07-handoff.md
- docs/ai/reviews/{STP_ID}/99-metrics.md
- Final response required by review_final_handoff
