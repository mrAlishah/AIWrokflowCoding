Use skill: review_final_handoff

Parameters:

STP_ID:
STP-123

FINAL_STATUS:
needs-followup
Options: ready / needs-followup / blocked

REMAINING_RISKS:
No known remaining risks.

VALIDATION_PERFORMED:
Local diff review completed.

RECOMMENDED_DECISION:
needs-followup
Options: ready / needs-followup / blocked

Task:
Summarize final review state, issue categories, final decision, validation, and residual risk.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: review_final_handoff
5. Active review workspace only when required
6. repo-context only if needed
7. Exact changed files only if needed

Constraints:
- Do not read all docs/ai.
- Do not read all skills.
- Do not read the entire repository.
- Before reading extra files, explain why.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Do not modify source code.
- Use local git diff only.
- Do not call external PR APIs.
- Do not create pull requests or push commits.

Expected updates:
- docs/ai/reviews/{STP_ID}/07-handoff.md
- docs/ai/reviews/{STP_ID}/99-metrics.md

Final response format:
Return Summary, Final decision, Blocking and non-blocking issues, Residual risks, Markdown Files Changed, and Recommended next action.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
