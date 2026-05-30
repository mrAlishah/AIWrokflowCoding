# Context Budget

Rules for loading repository context efficiently.

## Defaults

- Start with the most relevant shared memory file.
- Read current source files before changing implementation behavior.
- Prefer targeted search over broad file dumps.
- Avoid loading full repository trees unless explicitly needed.

## Repo Context Usage

- Treat `docs/ai/repo-context/*` as reusable memory.
- Other skills may read repo-context but must not update it.
- Only `repo-context-update` may refresh repo-context files.

## Update Style

- Keep stable facts.
- Remove stale or noisy details.
- Summarize patterns instead of copying source.

