Use skill: repo-context-update

Task:
Update reusable repository knowledge.

Update reason:
[initial population / architecture changed / test strategy changed / files changed and updated]

Repository areas to inspect:
[مسیرها یا ماژول‌های مشخص]

Rules:

- Inspect repository only because this skill is explicitly invoked.
- Update only docs/ai/repo-context/\*.
- Do not modify source code.
- Do not update PBI or Review workspaces.
- Do not dump full repository trees.
- Keep context concise and reusable.

Output:

- Repo-context files updated
- Important repository knowledge captured
- Gaps or future updates needed
- Markdown Files Changed
- Confirmation source code was not modified
