Use skill: review-final-handoff

Parameters:

STP_ID:
STP-XXXX

FINAL_DECISION:
request-changes

Rules:

- Summarize final review decision.
- Include blocking issues, non-blocking issues, resolved issues, ignored issues.
- Include remaining risks and recommended next action.
- Do not modify source code.
- Do not call PR APIs.

Output:

- Final review decision
- Ready to merge: Yes/No
- Remaining risks
- Markdown Files Changed
- Confirmation source code was not modified
