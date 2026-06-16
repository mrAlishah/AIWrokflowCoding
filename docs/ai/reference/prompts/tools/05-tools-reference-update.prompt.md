Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
all

AREA:
all

CHANGE_REASON:
skill created

SOURCE_OF_TRUTH:
skills-readme

Task:
Update user-facing reference documentation so guides, prompts, prompt help, and indexes stay aligned with the current V2 AI Operating System.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_reference_update
5. docs/ai/reference/README.md
6. docs/ai/reference/help-index.md
7. Selected reference area only when needed

Constraints:
- Do not modify source code.
- Do not change runtime workflow behavior.
- Do not rename skills.
- Do not remove compatibility mappings.
- Do not read archived history or foundation material.
- Do not update docs/ai/reference/system-health/ report content.
- Keep docs/ai/reference/ non-runtime.
- Keep prompts executable by changing parameter values only.

Expected updates:
- docs/ai/reference/README.md
- docs/ai/reference/help-index.md
- docs/ai/reference/guides/
- docs/ai/reference/prompts/

Final response format:
Return Summary, Reference Areas Updated, Guides Updated, Prompts Updated, Help Files Updated, Validation Results, Markdown Files Changed, Missing Skill Metadata, Remaining Risks, and Recommended Next Step.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
