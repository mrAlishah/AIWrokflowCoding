Use skill: tools_system_health_check

Parameters:

CHECK_SCOPE:
full
Options: runtime-only / foundation-only / full

CHECK_COMPATIBILITY:
true
Options: true / false

REPORT_MODE:
latest-and-history
Options: latest-only / latest-and-history

ANALYSIS_DEPTH:
deep
Options: standard / deep

Task:
Run a full AI OS health check and write the latest report plus a dated history copy.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: tools_system_health_check
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
- docs/ai/reference/system-health/latest.md
- docs/ai/reference/system-health/history/YYYY-MM-DD.md

Final response format:
Return Summary, Report Written, Status, Critical Findings, Required Actions, Markdown Files Changed, and Recommended Next Step.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
