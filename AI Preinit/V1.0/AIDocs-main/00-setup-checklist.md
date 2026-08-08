# Setup Checklist For A New Repository

## Files To Create

- `AGENTS.md`
- `CLAUDE.md` if Claude is used
- `.agents/skills/project-phase-implementation/SKILL.md`
- `.agents/skills/project-critical-code-review/SKILL.md`
- `docs/project-definition.md`
- `docs/implementation-plan.md`
- `docs/architecture.md`
- `docs/workflow.md`
- `docs/validation.md`
- `docs/codebase-index.md`
- `docs/phases/.gitkeep`
- `prompts/.gitkeep`

## First Codex Prompt

Use:

```text
Use AIDocs/prompts/00-create-project-definition.md

Project/PBI:
<paste the new project or PBI description here>
```

## Required Placeholders

Replace:

- `<PROJECT_NAME>`
- `<PROJECT_DESCRIPTION>`
- `<BUILD_COMMAND>`
- `<TEST_COMMAND>`
- `<DOMAIN_RULES>`
- `<OUT_OF_SCOPE>`
- `<IMPORTANT_PATHS>`

## Required First Output

The first durable project document should be:

```text
docs/project-definition.md
```

Create `docs/implementation-plan.md` only after project definition is clear enough.
