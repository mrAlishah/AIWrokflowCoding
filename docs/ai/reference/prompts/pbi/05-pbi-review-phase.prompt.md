Use skill: pbi_review_phase

Parameters:

PBI_ID:
STP-123

PHASE:
phase-01

DIFF_OR_CHANGED_FILES:
src/views/Settings/SettingsOverview.vue

REVIEW_MODE:
normal
Options: normal / strict

Task:
Review implemented PBI work and return findings first without modifying source code.

Required read path:
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only: pbi_review_phase
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
- Use local git diff only.
- Do not call external PR APIs.
- Do not create pull requests or push commits.

Expected updates:
- PBI review notes when needed
- docs/ai/pbi/{PBI_ID}/05-validation.md
- docs/ai/pbi/{PBI_ID}/99-metrics.md

Final response format:
Return findings first ordered by severity, no-issues statement when applicable, validation gaps, Markdown Files Changed, and Recommended next skill.

Markdown Files Changed rule:
When markdown files are changed, report each changed markdown file with path, action, reason, summary, and future AI context impact.
