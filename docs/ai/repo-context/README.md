# Repo Context

Reusable repository knowledge.

## When To Read

Read repo-context when the selected skill needs stable repository knowledge before source inspection.

## Read Next

- [architecture.md](architecture.md): architecture boundaries and system shape
- [module_map.md](module_map.md): important modules and responsibilities
- [file_index.md](file_index.md): curated index of important files
- [codebase-index.md](codebase-index.md): compact codebase navigation guide
- [domain_glossary.md](domain_glossary.md): optional project terms and domain language; keep if empty until real domain terms exist
- [coding_standards.md](coding_standards.md): naming, style, and implementation conventions
- [code-policies.md](code-policies.md): approved global code policies
- [context_budget.md](context_budget.md): context loading and optimization rules
- [test_strategy.md](test_strategy.md): verification and test strategy
- [workflow.md](workflow.md): repository-specific working workflow

## Policy Migration Compatibility

Future policy target:

```text
docs/ai/repo-context/policy/
```

Current policy move candidates are:

```text
code-policies.md
coding_standards.md
context_budget.md
```

Keep `test_strategy.md` and `workflow.md` in `docs/ai/repo-context/`.

## Do Not Read By Default

Do not read every repo-context file. Start with the routing file that matches the selected skill.

## Governance

Repo-context ownership rules are in [../governance/common-rules.md](../governance/common-rules.md).

