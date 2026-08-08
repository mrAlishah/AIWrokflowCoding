Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
prompts-only
Options: all / guides-only / prompts-only / index-only / area-only

AREA:
tools
Options: pbi / pr / review / tools / all

CHANGE_REASON:
user feedback
Options: skill created / skill renamed / workflow updated / parameters changed / health check finding / user feedback

SOURCE_OF_TRUTH:
skill-files
Options: skills-readme / skill-files / system-health-report / manual-request

Task:
Update the selected user-facing reference area so prompts remain executable by changing parameter values only.

Key constraints:
- Do not modify source code.
- Do not change workflow behavior.
- Read only the selected skill and affected reference files.
- Keep reference docs outside the runtime read path.

Expected output:
- Updated affected reference files
- Markdown Files Changed table
- Missing skill metadata, if any
- Recommended next step
