Use skill: tools_policy_plan_update

Parameters:

SCOPE:
pbi
Options: pbi / review / repo-context / global

STP_ID:
STP-123

INPUT_TAG:
USER_REVIEW_FEEDBACK
Options: USER_REVIEW_FEEDBACK / USER_CODE_POLICY

UPDATE_MODE:
apply-workspace-update
Options: apply-workspace-update / apply-global-rule

USER_INPUT:
Mark RF-001 as Required and keep RF-002 as Proposed.

Task:
Classify tagged user input and update only related planning, RF, or approved policy files.

Key constraints:
- Do not modify source code.
- Do not change workflow behavior.
- Read only the selected skill and required docs.
- Report markdown changes.

Expected output:
- Related PBI planning files
- Related review feedback files
- docs/ai/repo-context/policy/code-policies.md when SCOPE is global
- Final response required by tools_policy_plan_update
