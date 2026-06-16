Use skill: pbi_clarification

Parameters:

STP_ID:
STP-123

RAW_PBI:
As a user, I need audit-log filters.

REQUESTER:
Mostafa

Task:
Clarify a raw PBI and block downstream work when critical information is missing.

Key constraints:
- Read only the selected skill.
- Use repo-context only if needed.
- Do not modify source code.

Expected output:
- docs/ai/pbi/{STP_ID}/00-approved-pbi.md
- docs/ai/pbi/{STP_ID}/99-metrics.md
- docs/ai/pbi/metrics.md
- Final response required by pbi_clarification
