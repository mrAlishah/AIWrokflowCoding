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

Key constraints:
- Do not modify source code.
- Do not change workflow behavior.
- Read only the selected skill and required docs.
- Report markdown changes.

Expected output:
- docs/ai/reference/system-health/latest.md
- docs/ai/reference/system-health/history/YYYY-MM-DD.md
- Final response required by tools_system_health_check
