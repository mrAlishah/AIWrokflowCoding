# Skill: review_final_handoff

## Purpose

Summarize final review outcome, residual risk, and recommended decision.

## Parameters

- `STP_ID`: required
- `FINAL_STATUS`: required
- `REMAINING_RISKS`: optional
- `VALIDATION_PERFORMED`: required
- `RECOMMENDED_DECISION`: required

## Read

- `03-diff-analysis.md`
- `04-en-pr-comments.md`
- `05-fa-pr-suggestions.md`
- `06-followup-log.md`
- Local review context when needed

## Steps

1. Summarize final review state.
2. Separate blocking, non-blocking, resolved, ignored, and remaining planned items.
3. State final decision and ready-to-merge status.
4. Record validation and residual risk.

## Update

- `07-handoff.md`
- `99-metrics.md`
- `docs/ai/reviews/metrics.md`

## Stop Conditions

- Review comments or follow-up state are insufficient.
- Planned comments are unresolved but requested as done.
- The task requires source modification, PR API calls, PR creation, or pushing commits.

## Final Output

- Summary
- Final decision
- Blocking and non-blocking issues
- Residual risks
- Markdown Files Changed
- Metrics Updated: Yes / No / Not Applicable when enabled by runtime config; if No, include reason.
- Recommended next action

## References

Follow canonical governance and policy:

- `docs/ai/skills/governance/common-rules.md`
- `docs/ai/skills/governance/read-order.md`
- `docs/ai/skills/governance/markdown-change-reporting.md`
- `docs/ai/skills/governance/skill-template.md`
- `docs/ai/repo-context/policy/context_budget.md`
