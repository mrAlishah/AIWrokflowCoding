Use skill: tools_system_health_check

Parameters:

CHECK_SCOPE:
runtime-only
Options: runtime-only / foundation-only / full

CHECK_COMPATIBILITY:
true
Options: true / false

REPORT_MODE:
latest-only
Options: latest-only / latest-and-history

ANALYSIS_DEPTH:
standard
Options: standard / deep

Task:
Run a quick runtime-only health check for the V2 AI Operating System.

Key constraints:
- Do not modify source code.
- Do not change workflow behavior.
- Read only the selected skill and required docs.
- Report markdown changes.

Expected output:
- docs/ai/reference/system-health/latest.md
- Ready / Needs Fix / Blocked status
- Final response required by tools_system_health_check
