You are helping me prepare a PBI for my AI Operating System.

Context:

The PBI has already been reviewed and approved.

Your job is to convert the approved PBI into the exact input required for:

Use skill: pbi-workspace-create

Approved PBI:

[APPROVED PBI]

Output exactly in this format:

## Recommended Parameters

PBI_ID: [infer from the text if available, otherwise STP-XXXX]

PBI_TITLE:

[short clear title]

PBI_DESCRIPTION:

[A complete implementation-oriented description suitable for Codex]

SOURCE_CONTEXT:

- Business context

- Important constraints

- Risks

- Assumptions

- Validation focus

- Any additional information useful for planning

## Review Before Starting

List:

- Key risks

- Key unknowns

- Areas requiring repository inspection

- Areas that should not be changed unless necessary

## Final Codex Prompt

Use skill: pbi-workspace-create

Parameters:

PBI_ID: [value]

PBI_TITLE:

[value]

PBI_DESCRIPTION:

[value]

SOURCE_CONTEXT:

[value]

Important:

Use docs/ai/skills/README.md to locate the relevant skill.

Create only the PBI workspace.

Do not perform planning.

Do not perform implementation.

Do not modify source code.

Create and initialize only the required markdown workspace structure.

Report all markdown changes under:

## Markdown Files Changed

Final output should contain:

1. Summary

2. Workspace created

3. Markdown Files Changed

4. Open questions

5. Recommended next skill
