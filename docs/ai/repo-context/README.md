# Repo Context

`repo-context` is reusable repository knowledge for the AI Multi-Agent Coding Operating System.

## Rules

- `repo-context` is read-only for all skills except `repo-context-update`.
- `repo-context-update` is the only skill allowed to update files in this directory.
- Repository inspection happens only when `repo-context-update` is explicitly invoked.
- Keep entries concise, stable, and useful for future work.
- Do not dump full repository trees or large source excerpts.

## Files

- [architecture.md](architecture.md): architecture boundaries and system shape
- [module_map.md](module_map.md): important modules and responsibilities
- [file_index.md](file_index.md): curated index of important files
- [codebase-index.md](codebase-index.md): compact codebase navigation guide
- [domain_glossary.md](domain_glossary.md): project terms and domain language
- [coding_standards.md](coding_standards.md): naming, style, and implementation conventions
- [context_budget.md](context_budget.md): context loading and optimization rules
- [test_strategy.md](test_strategy.md): verification and test strategy
- [workflow.md](workflow.md): repository-specific working workflow

