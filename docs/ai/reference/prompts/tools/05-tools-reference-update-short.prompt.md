Use skill: tools_reference_update

Parameters:

UPDATE_SCOPE:
prompts-only

AREA:
tools

CHANGE_REASON:
user feedback

SOURCE_OF_TRUTH:
skill-files

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
