# AI-Assisted Project Method Template

Copy this `AIDocs` folder into a new repository when you want to work with Codex or Claude using a phase-based planning, implementation, and review workflow.

## What This Gives You

- A compact project instruction template.
- Standard docs for architecture, workflow, validation, and implementation planning.
- Reusable skills for phase implementation and critical code review.
- Numbered prompts you can run in order with Codex.

## Recommended Copy Steps

1. Copy `AIDocs` into the new repository root.
2. Copy `AIDocs/templates/AGENTS.template.md` to `<repo-root>/AGENTS.md`.
3. Copy `AIDocs/templates/CLAUDE.template.md` to `<repo-root>/CLAUDE.md` if Claude is used.
4. Copy `AIDocs/skills` to `<repo-root>/.agents/skills`.
5. Copy docs templates from `AIDocs/templates/docs` to `<repo-root>/docs`.
6. Replace placeholders like `<PROJECT_NAME>`, `<BUILD_COMMAND>`, `<TEST_COMMAND>`, and `<DOMAIN_RULES>`.
7. Start with `AIDocs/prompts/00-create-project-definition.md`.

## Project Start Rule

Every new project or PBI starts from:

```text
docs/project-definition.md
```

This file describes the business goal, scope, requirements, workflow, risks, and acceptance criteria. `docs/implementation-plan.md` must be created from `docs/project-definition.md`, not from loose assumptions.

## Daily Workflow

```text
Project Definition -> Implementation Plan -> Phase Plan -> Implement -> Validate -> Critical Review -> Fix -> Document -> Next Phase
```

## Context Rule

Keep `AGENTS.md` short. Put long explanations in `docs`, repeatable workflows in `.agents/skills`, and reusable AI prompts in `prompts`.
