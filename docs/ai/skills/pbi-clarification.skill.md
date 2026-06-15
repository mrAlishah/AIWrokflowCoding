# Skill: pbi-clarification

## Purpose

Transform a raw PBI into an implementation-ready approved PBI and block downstream work when critical information is missing.

## Parameters

- `STP_ID`: optional when derivable, otherwise required
- `RAW_PBI`: required
- `REQUESTER`: optional

## Read

- Raw PBI input
- Minimal repo-context only when needed to understand the problem

## Steps

1. Confirm or derive `STP_ID`.
2. Identify ambiguities, missing information, assumptions, risks, and acceptance criteria gaps.
3. Ask focused Persian questions when the user communicates in Persian.
4. Write required approved PBI sections to `00-approved-pbi.md`.
5. If critical information is missing, write `STATUS: BLOCKED_FOR_CLARIFICATION`.

## Update

- `docs/ai/pbi/{STP_ID}/00-approved-pbi.md`
- `docs/ai/pbi/{STP_ID}/99-metrics.md`
- `docs/ai/pbi/metrics.md`

## Stop Conditions

- `STP_ID` cannot be derived.
- Critical implementation information is missing.
- The requested update would create implementation tasks, phase files, source changes, or repo-context changes.

## Final Output

- Summary
- Clarification status
- Open questions, if any
- Markdown Files Changed
- Recommended next skill

## References

Follow:
- `docs/ai/governance/common-rules.md`
- `docs/ai/governance/context-efficiency.md`
- `docs/ai/governance/markdown-reporting.md`
- `docs/ai/governance/observability.md`
