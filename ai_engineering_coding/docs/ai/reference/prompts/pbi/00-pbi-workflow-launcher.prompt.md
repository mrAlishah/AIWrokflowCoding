# 00 - PBI Workflow Launcher

Use skill: pbi_clarification

Parameters:

STP_ID:
STP-XXXX

RAW_PBI:
Paste the raw PBI or user story here.

REQUESTER:
Mostafa

Task:
Start the PBI workflow by clarifying the raw PBI.

If the PBI has enough information, prepare the next ready-to-run prompt for `pbi_workspace_create`, but do not execute it.

Workflow order:

```text
pbi_clarification
-> pbi_workspace_create
-> pbi_plan_create
-> pbi_implementation_phase
-> pbi_review_phase
-> pbi_fix_phase if needed
-> pbi_final_handoff
```

Rules:

- Execute only `pbi_clarification` in this run.
- Do not create a workspace unless the selected skill explicitly does it.
- Do not modify source code.
- Do not read all docs, all skills, all workspaces, or the whole repository.
- Follow the runtime read order from `docs/ai/skills/governance/read-order.md`.

Expected output:

- Clarified PBI or blocking clarification questions.
- If ready, the exact next prompt for `pbi_workspace_create`.
- Markdown Files Changed report when applicable.
