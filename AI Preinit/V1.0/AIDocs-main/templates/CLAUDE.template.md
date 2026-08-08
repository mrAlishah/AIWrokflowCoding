# Claude Rules for <PROJECT_NAME>

Use the same project rules as `AGENTS.md`.

## Working Rules

- Read `AGENTS.md` first.
- Keep changes scoped to the requested task.
- Prefer existing codebase patterns over new abstractions.
- Explain assumptions before risky changes.
- Update docs when behavior or workflow changes.

## Output Rules

- Start with the result.
- List changed files and why each changed.
- Include validation commands and results.
- Mention risks or incomplete checks.

## Do Not

- Do not refactor unrelated code.
- Do not invent requirements.
- Do not store secrets in plain text unless local development explicitly allows it.
- Do not bypass validation or human review gates.
