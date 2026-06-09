# AGENTS.md

# AI Multi-Agent Coding Operating System (V2)

## Mission

This repository uses a markdown-driven AI Operating System.

Primary goals:

1. Simplicity
2. Automation
3. Low Token Cost
4. Markdown Files = Shared Memory
5. Multi-Agent Collaboration

All agent behavior must support these goals.

---

# Core Principles

## Markdown Files = Shared Memory

Agents are temporary workers.

Markdown files are the source of truth.

Do not rely on chat history.

Do not rely on assumptions from previous sessions.

Always use repository documentation.

---

## Agents = Stateless Workers

Every task must be resumable by another agent.

If information is important:

Write it to markdown.

Do not keep important state only in conversation context.

---

## Skills = Execution Protocols

Always use:

```text
Use Skill + Parameters
```

Do not invent custom workflows if an approved skill exists.

---

# Knowledge Separation

Never mix these concepts:

```text
Repository Knowledge
≠
PBI Knowledge
≠
Review Knowledge
≠
Execution Memory
≠
Architecture Decisions
```

Definitions:

Repository Knowledge

```text
docs/ai/repo-context/
```

Reusable repository knowledge.

PBI Knowledge

```text
docs/ai/pbi/STP-XXXX/
```

Task-specific implementation knowledge.

Review Knowledge

```text
docs/ai/reviews/STP-XXXX/
```

Review-specific knowledge.

Execution Memory

```text
phases/
followup-log
```

Records of actual execution.

Architecture Decisions

```text
04-decision_log.md
```

Design and architecture decisions.

---

# Required Read Order

Before any implementation or review:

1. AGENTS.md
2. Agent-specific file (if exists)
3. docs/ai/skills/README.md
4. Selected skill
5. Active workspace
6. repo-context routing files
7. Required source files only

---

# Extra File Rule

Before reading additional files, document:

```text
File Path
Reason
Decision Impact
```

Read only what is needed.

---

# Token Cost Rules

Do NOT:

```text
Read entire repository
Read all markdown files
Read all skills
Analyze whole codebase
```

Prefer:

```text
repo-context
module_map
file_index
codebase-index
```

before source inspection.

---

# Repository Knowledge Rules

Repository knowledge lives in:

```text
docs/ai/repo-context/
```

Read repo-context first.

Inspect source code only when necessary.

---

# repo-context Ownership Rule

Only:

```text
repo-context-update
```

may update:

```text
docs/ai/repo-context/*
```

Exception:

```text
policy-plan-update
```

may update reusable repository policy files under `docs/ai/repo-context/` only when:

```text
SCOPE: global
INPUT_TAG: USER_CODE_POLICY
UPDATE_MODE: apply-global-rule
```

All other skills:

```text
Read Only
```

---

# PBI Workflow

Workspace:

```text
docs/ai/pbi/STP-XXXX/
```

Official files:

```text
00-approved-pbi.md
01-context.md
02-implementation-plan.md
03-codebase-index.md
04-decision_log.md
06-handoff.md
```

Phase files:

```text
Plan
+
Execution Memory
```

Allowed statuses:

```text
Planned Only
Planned
In Progress
Done
```

---

# Review Workflow

Workspace:

```text
docs/ai/reviews/STP-XXXX/
```

Official files:

```text
01-review-brief.md
02-context.md
03-diff-analysis.md
04-en-pr-comments.md
05-fa-pr-suggestions.md
06-followup-log.md
07-handoff.md
```

Review must use:

```text
git diff BASE_BRANCH...HEAD
```

Review must not:

```text
Modify source code
Call PR APIs
Create pull requests
Push commits
```

---

# Code Quality Rules

Follow repository conventions.

Respect:

```text
Naming conventions
Architecture boundaries
Coding standards
Comment standards
Active code policies
```

Prefer:

```text
Simple code
Minimal files
Minimal lines
```

Avoid:

```text
Over-engineering
Broad refactoring
Unnecessary abstractions
```

Active code policies are defined in:

```text
docs/ai/repo-context/code-policies.md
```

---

# Comment Rules

Comment:

```text
Important intent
Business rules
Validation rules
Technical decisions
Compatibility behavior
```

Avoid:

```text
Obvious comments
Noise comments
Line-by-line comments
```

---

# Markdown Change Reporting Rule

Whenever markdown files are changed:

```text
## Markdown Files Changed

File Path
Action
Reason
Summary
Future AI Context Impact
```

must be reported.

---

# Source Code Safety

Do not modify source code unless the active skill explicitly allows it.

Review skills never modify source code.

When in doubt:

Stop and document the uncertainty.

```

```
