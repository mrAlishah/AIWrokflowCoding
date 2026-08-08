# 01 - Repo Context Initial Population.prompt.md

Use skill: tools_repo_context_update

Parameters:

UPDATE_REASON:
initial_population

REPOSITORY_AREAS:
repository-root

INSPECTION_SCOPE:
standard

Task:

Create the initial stable reusable repository knowledge for this codebase.

Goal:

Establish the first version of the repo-context layer for future PBI planning, implementation, and review workflows.

Required outputs should populate or update:

- architecture.md
- module_map.md
- file_index.md
- codebase-index.md
- domain_glossary.md
- test_strategy.md
- workflow.md

Read strategy:

Start from the repository entry points and expand incrementally.

Before reading additional files or modules, explain why they are required.

Constraints:

- Do not read the entire repository recursively.
- Do not read all docs/ai.
- Do not read all skills.
- Do not modify source code.
- Do not change workflow behavior.
- Do not introduce V3 concepts.
- Preserve compatibility mappings.
- Report markdown changes.

Expected result:

Create a stable, reusable repository knowledge baseline optimized for low-token future execution.
