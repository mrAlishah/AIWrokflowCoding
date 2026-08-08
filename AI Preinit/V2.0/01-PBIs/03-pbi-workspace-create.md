# Prompt — Create PBI Workspace

Use skill: pbi-workspace-create

Input:

Attached file:
Approved PBI Package (.md)

Instructions:

Read:

- AGENTS.md
- docs/ai/skills/README.md
- docs/ai/skills/pbi-workspace-create.skill.md
- attached Approved PBI Package

Extract all required parameters from the attached file.

Required parameters must be inferred from the approved package:

- PBI_ID
- PBI_TITLE
- PBI_DESCRIPTION
- SOURCE_CONTEXT

Do not ask for parameters that already exist in the attached file.

If required information is missing:

- report the missing field
- stop workspace creation
- do not guess values

Workspace Creation Rules:

- Create only the PBI workspace structure.
- Do not perform planning.
- Do not inspect source code.
- Do not inspect repository modules.
- Do not create implementation phases.
- Do not implement code.
- Do not modify source code.

Expected Output:

1. Summary
2. Extracted Parameters
3. Workspace Created
4. Markdown Files Changed
5. Missing Information (if any)
6. Open Questions
7. Recommended Next Skill

Success Criteria:

The attached Approved PBI Package is the single source of truth for workspace creation.

No parameter duplication is required in the prompt.
