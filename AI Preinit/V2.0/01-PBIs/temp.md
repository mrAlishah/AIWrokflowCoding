# Prompt — V2.1 Essential Update (Quality-Preserving Context Efficiency)

You are maintaining the AI Multi-Agent Coding Operating System.

Your task is to update the V2 Approved Baseline to incorporate the approved V2.1 Essential improvements.

Preserve the existing architecture and philosophy.

Do not redesign the system.

Do not introduce V3 Harness Engineering concepts such as autonomous agents, confidence scores, trust metrics, self-correction loops, or advanced observability.

The objective is to improve implementation reliability and context efficiency without reducing code quality, reasoning quality, or implementation accuracy.

---

## Core Principles (Must Remain Unchanged)

```text
Markdown Files = Shared Memory

Agents = Stateless Workers

Skills = Execution Protocols

Use Skill + Parameters

Simplicity > Flexibility

Minimal Prompts > Rich Workflow
```

---

## Critical Rule — Quality First

Context optimization must never reduce:

- reasoning quality
- implementation quality
- code quality
- review quality
- validation quality

Agents must always gather sufficient context to make correct decisions.

The goal is not to minimize token usage at all costs.

The goal is to avoid unnecessary context consumption.

Preferred principle:

```text
Minimum Required Context
≠
Minimum Possible Context
```

Agents must read all information required for high-confidence execution.

---

## Objective 1 — Add PBI Clarification Layer

Current problem:

Raw PBIs are frequently ambiguous and cannot be safely implemented directly.

Add a mandatory clarification step before `pbi-workspace-create`.

New workflow:

```text
Raw PBI
↓
PBI Clarification
↓
Approved PBI
↓
pbi-workspace-create
```

### Add New Skill

```text
pbi-clarification
```

### Responsibilities

Transform a raw PBI into a structured and implementation-ready PBI.

The skill must:

- identify ambiguities
- identify missing information
- identify assumptions
- identify risks
- generate questions for Product Managers
- prevent implementation when critical information is missing

### Required Sections in `00-approved-pbi.md`

```markdown
# Business Goal

# Current Behavior

# Expected Behavior

# In Scope

# Out Of Scope

# Acceptance Criteria

# Assumptions

# Open Questions

# Risks
```

### Rule

If critical information is missing:

```text
STATUS: BLOCKED_FOR_CLARIFICATION
```

Planning and implementation skills must not continue until clarification is complete.

---

## Objective 2 — Add Validation File

Current problem:

The repository does not contain unit tests or end-to-end tests.

Validation must remain explicit and repeatable.

### Add New File

```text
docs/ai/pbi/STP-XXXX/05-validation.md
```

### Required Sections

```markdown
# Build Verification

# Manual Test Scenarios

# Regression Checklist

# Known Risks

# Sign-off Criteria
```

### Rules

Validation may include:

- build verification
- lint verification
- manual smoke tests
- manual regression tests

Do not assume automated tests exist.

```text
No automated tests ≠ No validation
```

### Skill Updates Required

Update:

```text
pbi-plan-create

implementation-phase

review-phase

fix-phase

pbi-final-handoff
```

All implementation and review workflows must read and update `05-validation.md`.

---

## Objective 3 — Replace Token Budget Rules with Context Efficiency Rules

Current problem:

Context consumption is uncontrolled.

However, hard token limits may negatively impact reasoning quality.

Do not introduce numerical token budgets, file limits, or strict context quotas.

Instead, update:

```text
docs/ai/repo-context/context_budget.md
```

with the following principles.

### Context Efficiency Principles

```text
Read the minimum required context.

Prefer repo-context over source inspection.

Prefer targeted source inspection over broad repository analysis.

Prefer local git diff over full file inspection during review.

Request approval before broad repository analysis.

Justify context expansion when reading outside the approved scope.
```

### Required Agent Behavior

Before reading files outside the approved scope, agents must report:

```text
Requested File:

Reason:

Expected Decision Impact:
```

### Scope Expansion Rule

If an agent determines that additional context is required for quality reasons, it must explicitly request permission and explain why the existing context is insufficient.

### Quality Rule

When context optimization conflicts with implementation quality:

```text
Implementation quality takes priority.
```

---

## Required Documentation Updates

Update if necessary:

```text
docs/ai/README.md

docs/ai/repo-context/context_budget.md

docs/ai/skills/README.md

docs/ai/pbi/README.md
```

---

## Constraints

Do not modify:

```text
repo-context ownership rules

review workflow boundaries

phase status model

shared memory architecture
```

Do not add:

```text
hard token limits

maximum file limits

confidence scoring

trust metrics

advanced observability

autonomous planning

self-correction loops
```

---

## Deliverables

Provide:

1. updated architecture decisions
2. updated folder structure
3. required skill modifications
4. required documentation changes
5. migration impact summary
6. backward compatibility considerations

Preserve the existing V2 philosophy while improving reliability and context efficiency.
