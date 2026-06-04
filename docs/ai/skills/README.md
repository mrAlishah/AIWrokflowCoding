# Skills Index

This index routes work to the official V2 skills.

All skills follow `docs/ai/skills/common-skill-rules.md`.

## Repository

| Skill | Purpose | When To Use | Required Parameters | Allowed File Scope | Forbidden Actions |
| --- | --- | --- | --- | --- | --- |
| `repo-context-update` | Refresh reusable repository knowledge. | Use only when explicitly invoked to update repo-context. | update reason, repository areas to inspect | `docs/ai/repo-context/*` | modifying source code; updating non repo-context files; dumping full repository trees |
| `docs-ai-cleanup-audit` | Audit `docs/ai` for cleanup, stale content, duplicated governance, and token-cost risk. | Monthly/quarterly cleanup review, after governance changes, or when docs context bloat is suspected. | `CLEANUP_SCOPE`, `CLEANUP_MODE`, `TARGET_AREA` | cleanup plan or cleanup run report under `docs/ai/foundation/`; skill index only when registering | modifying source code; deleting, archiving, renaming, or rewriting governance |

## PBI Workflow

| Skill | Purpose | When To Use | Required Parameters | Allowed File Scope | Forbidden Actions |
| --- | --- | --- | --- | --- | --- |
| `pbi-workspace-create` | Create the working documentation space for a PBI. | Start of a PBI workflow. | PBI id, title, source request | PBI workspace under `docs/ai/` | modifying source code; updating repo-context |
| `pbi-plan-create` | Turn a PBI into a scoped implementation plan. | After PBI workspace creation and before implementation. | PBI id, acceptance criteria, constraints | PBI workspace under `docs/ai/` | modifying source code; updating repo-context |
| `policy-plan-update` | Sync tagged user answers or policy changes into related planning files. | After a user answers an open question, changes policy, or updates RF statuses. | `SCOPE`, `STP_ID`, `INPUT_TAG`; extra inputs only when the tag requires them | active workspace files related to selected scope | modifying source code; running implementation or review; updating repo-context unless allowed by scope |
| `implementation-phase` | Implement the approved PBI plan. | When the plan is ready for code or documentation changes. | PBI id, approved plan, target files | files allowed by the PBI plan | unrelated refactors; updating repo-context; changing scope without approval |
| `review-phase` | Review implemented PBI work before fixes. | After implementation and before final fixes. | PBI id, changed files, acceptance criteria | PBI workspace and changed files | broad rewrites; updating repo-context |
| `fix-phase` | Apply targeted fixes from review findings. | When review-phase identifies required fixes. | PBI id, review findings, target fixes | files required for approved fixes | unrelated cleanup; updating repo-context |
| `review-feedback-analysis` | Analyze human PR comments after a PBI PR exists. | After post-PR human review feedback is received and before RF fixes are planned. | `PBI_ID`; optional feedback input | PBI workspace review-feedback and RF phase files | modifying source code; executing fixes; creating PBI workspaces |
| `pbi-final-handoff` | Summarize completion and verification. | At the end of a PBI workflow. | PBI id, summary, verification results | PBI workspace under `docs/ai/` | modifying source code; updating repo-context |

## Review Workflow

| Skill | Purpose | When To Use | Required Parameters | Allowed File Scope | Forbidden Actions |
| --- | --- | --- | --- | --- | --- |
| `review-workspace-create` | Create the working documentation space for a review. | Start of a PR or code review workflow. | review id, source branch or PR, target branch | review workspace under `docs/ai/` | modifying source code; updating repo-context |
| `review-diff-analysis` | Analyze the diff for risk and behavior changes. | After review workspace creation. | review id, diff source, files changed | review workspace under `docs/ai/` | modifying source code; updating repo-context |
| `review-comments-create` | Produce actionable review comments. | After diff analysis. | review id, findings, severity | review workspace under `docs/ai/` | modifying source code; inventing findings; updating repo-context |
| `review-followup` | Re-check changes after review feedback is addressed. | When a review receives updates or responses. | review id, previous findings, new diff | review workspace under `docs/ai/` | unrelated implementation; updating repo-context |
| `review-final-handoff` | Summarize review outcome and residual risk. | At the end of a review workflow. | review id, final findings, verification notes | review workspace under `docs/ai/` | modifying source code; updating repo-context |

## Cleanup Audit Example

```text
Use skill: docs-ai-cleanup-audit

Parameters:
CLEANUP_SCOPE: full-docs-ai
CLEANUP_MODE: audit-only
TARGET_AREA: docs/ai
MAX_INSPECTION_DEPTH: normal
INCLUDE_DONE_WORKSPACES: no
OUTPUT_MODE: append-to-cleanup-plan
ALLOW_MARKDOWN_UPDATES: yes
```

## Policy / Plan Update Example

```text
Use skill: policy-plan-update

Parameters:
SCOPE: pbi
STP_ID: STP-XXXX
INPUT_TAG: USER_ANSWER
INPUT_SOURCE: docs/ai/pbi/STP-XXXX/01-context.md
UPDATE_MODE: sync-related-files
USER_INPUT: [The user answered an open question or added a new rule/policy.]
```

## Review Feedback Shortcuts

- `review-feedback-analysis` analyzes human PR comments after a PBI PR exists.
- `policy-plan-update` with `INPUT_TAG: USER_REVIEW_FEEDBACK` syncs `Required`, `Ignored`, `Done`, and `Blocked` RF statuses into plan and routing files.
- `fix-phase` with `RF_ID` applies one approved RF fix.
- `review-phase` with `RF_ID` verifies one RF fix.
