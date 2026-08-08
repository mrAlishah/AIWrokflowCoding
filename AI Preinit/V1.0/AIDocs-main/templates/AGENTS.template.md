# Codex Rules for <PROJECT_NAME>

<PROJECT_DESCRIPTION>

## Always Follow

- Stay inside the current task, PBI, or phase scope.
- Read existing patterns before editing.
- Keep diffs small and reviewable.
- Do not refactor unrelated files.
- Do not add new dependencies, architecture, storage, or external services unless explicitly requested.
- Add short English code comments only for important validation, security-sensitive logic, external boundaries, file operations, or non-obvious behavior.
- Update docs when behavior, workflow, contracts, or validation rules change.
- Use `.agents/skills/project-phase-implementation` for phase work.
- Use `.agents/skills/project-critical-code-review` for critical review.

## Project Structure

```text
src/                 Application code
tests/               Automated tests
docs/                Optional project documentation
docs/phases          Compact phase logs
prompts/             Versioned reusable prompts
.agents/skills       Reusable Codex skills
```

## Build And Test

```powershell
<BUILD_COMMAND>
<TEST_COMMAND>
```

## Important Domain Rules

- <DOMAIN_RULE_1>
- <DOMAIN_RULE_2>
- <DOMAIN_RULE_3>

## Out Of Scope Unless Explicitly Requested

- <OUT_OF_SCOPE_1>
- <OUT_OF_SCOPE_2>
- <OUT_OF_SCOPE_3>
