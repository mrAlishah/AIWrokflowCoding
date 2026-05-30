# Step 1 — Create Repository Knowledge Layer

Implement Step 1 of V2.

Goal:
Create the repo-context structure and the official repo-context-update skill.

Rules:

- Do not modify source code.
- Only update docs/ai/.
- repo-context is reusable repository knowledge.
- Only repo-context-update may update repo-context.
- Other skills must treat repo-context as read-only.
- Keep templates concise.
- Report all markdown changes.

Create/update:

docs/ai/repo-context/README.md
docs/ai/repo-context/architecture.md
docs/ai/repo-context/module_map.md
docs/ai/repo-context/file_index.md
docs/ai/repo-context/codebase-index.md
docs/ai/repo-context/domain_glossary.md
docs/ai/repo-context/coding_standards.md
docs/ai/repo-context/context_budget.md
docs/ai/repo-context/test_strategy.md
docs/ai/repo-context/workflow.md

docs/ai/skills/repo-context-update.skill.md

The skill must:

- inspect repository only when explicitly invoked
- update only docs/ai/repo-context/\*
- summarize important repo structure
- capture naming conventions, coding standards, test strategy, architecture boundaries
- avoid dumping full repository trees
- keep context optimized
