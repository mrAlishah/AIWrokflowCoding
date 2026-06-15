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

# Agent Entry Contract

For every task, agents must enter through repository-defined rules, not chat history.

Read in this order:

1. `AGENTS.md`
2. Agent-specific file if it exists, for example `CLAUDE.md`
3. `docs/ai/START_HERE.md`
4. `docs/ai/skills/README.md`
5. Selected skill only
6. Active workspace only when the selected skill requires it
7. repo-context routing files only when the selected skill allows it
8. Required source files only when the selected skill allows source inspection

Agents must select one approved skill before execution.

Do not read all docs, all skills, or the whole repository by default.

---

# Skill Execution Contract

Every task must be routed through:

```text
Use skill + parameters
```

Agents may orchestrate multi-step work, but must execute one approved skill at a time.

Orchestration is not permission to skip workspace creation, planning, review, validation, handoff, or markdown memory updates.

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
tools_repo_context_update
```

may update:

```text
docs/ai/repo-context/*
```

Exception:

```text
tools_policy_plan_update
```

may update reusable repository policy files under `docs/ai/repo-context/policy/` only when:

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
05-validation.md
06-handoff.md
99-metrics.md
```

Every PBI must define explicit validation requirements in:

```text
docs/ai/pbi/STP-XXXX/05-validation.md
```

No automated tests does not mean no validation.

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

`02-implementation-plan.md` phase tables must include:

```markdown
| Phase | Status | Step | Goal |
|---|---|---|---|
```

`Step` is independent from `Status` and records the latest completed or active workflow step for the phase.

---

# Review Workflow

Recommended daily-use review entrypoint:

```text
pr_review_workflow
```

Lower-level review skills remain available for follow-up, debugging, specialized review, or partial re-run.

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
99-metrics.md
```

Review aggregate metrics live in:

```text
docs/ai/reviews/metrics.md
```

PBI aggregate metrics live in:

```text
docs/ai/pbi/metrics.md
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
docs/ai/repo-context/policy/code-policies.md
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

---

# Stop Conditions

Stop before changing files when:

```text
No approved skill matches the task
The selected skill does not allow the needed file update
The task requires source code modification but the selected skill forbids it
The workspace id or required workspace file is missing
Scope, risk, or validation expectations are unclear
Tool access is insufficient to verify the required files
```

When stopping, report:

```text
Reason
Files inspected
Decision needed from user
Recommended next skill or prompt
```

---

# Governance Validation Rule

After changing skills, naming, workflow, foundation, `START_HERE.md`, common rules, or agent files:

```text
Re-run V2 validation checklist
```

```

```
