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

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_policy_plan_update
5. Active workspace only when required
6. repo-context only if needed
7. Exact source files only if needed

Constraints:
- Do not read all docs/ai.
- Do not read all skills.
- Do not read the entire repository.
- Before reading extra files, explain why.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Do not modify source code.
- Do not change workflow behavior.
- Report markdown changes.

Expected updates:
- Related PBI planning files
- Related review feedback files
- docs/ai/repo-context/policy/code-policies.md when SCOPE is global

Final response format:
Return Summary, Files updated, Conflicts found, Markdown Files Changed, and Recommended next action.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
