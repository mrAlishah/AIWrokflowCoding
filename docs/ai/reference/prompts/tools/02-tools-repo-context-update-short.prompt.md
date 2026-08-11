Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
Document stable routing changes after settings workflow update.

REPOSITORY_AREAS:
settings module and audit-log workflow

INSPECTION_SCOPE:
targeted
Options: targeted / standard

Task:
Refresh stable reusable repo-context knowledge for listed repository areas only.

Key constraints:
- Do not modify source code.
- Do not change workflow behavior.
- Read only the selected skill and required docs.
- Report markdown changes.

Expected output:
- docs/ai/repo-context/*
- docs/ai/repo-context/policy/* when relevant
- Final response required by tools_repo_context_update
