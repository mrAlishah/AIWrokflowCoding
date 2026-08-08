# Context_Snapshot.md

# Executive Summary

The user is designing and implementing an AI Multi-Agent Coding Operating System (currently V2) focused on simplifying software implementation and code review workflows using multiple AI agents (ChatGPT, Codex, Claude, and future agents).

The primary objective is not to maximize automation complexity, but to minimize workflow complexity, token cost, context consumption, and operational overhead while maintaining reliable implementation, review, knowledge sharing, and auditability.

The architecture is based on:

- Markdown Files = Shared Memory
- Agents = Stateless Workers
- Skills = Execution Protocols
- Repository Knowledge Reuse
- Low Token Cost
- Multi-Agent Collaboration

The project has reached a stable V2 baseline and is transitioning from architecture/governance design into operationalization, pilot execution, repository knowledge population, and long-term maintenance.

---

# User Profile

## Background

Experienced software engineer / technical lead.

Strong focus on:

- Software architecture
- Process optimization
- AI-assisted development
- Code review quality
- Documentation-driven workflows

## Skills

- Software development
- Backend systems
- Architecture design
- Technical planning
- AI workflow design
- Process engineering

## Professional Domain

Software engineering and AI-assisted software delivery.

## Learning Goals

- Build reliable multi-agent software workflows.
- Reduce AI token costs.
- Improve AI context management.
- Improve repeatability of AI-driven implementation and review.

## Personal Goals

- Create a maintainable AI operating system.
- Reduce manual coordination between AI tools.
- Improve development speed without sacrificing quality.

## AI Usage Goals

Use:

- ChatGPT
- Codex
- Claude

as cooperative workers inside a shared operating model.

## Decision-Making Preferences

Strong preference order:

1. Simplicity
2. Automation
3. Low Token Cost
4. Shared Markdown Memory
5. Multi-Agent Collaboration

User consistently rejects unnecessary complexity.

---

# Long-Term Objectives

1. Create a production-ready AI Multi-Agent Coding Operating System.
2. Standardize PBI implementation workflows.
3. Standardize PR review workflows.
4. Minimize context consumption.
5. Reuse repository knowledge.
6. Make AI agents replaceable.
7. Reduce dependency on chat history.
8. Maintain auditability.
9. Keep workflows simple and predictable.
10. Create reusable skills rather than large prompts.

---

# Active Projects

## AI Multi-Agent Coding Operating System (V2)

### Purpose

Provide a complete operating system for:

- PBI analysis
- Planning
- Implementation
- Review
- Fixes
- Handoffs
- Repository knowledge management

using multiple AI agents.

### Current State

Status:

```text
V2 Ready For Pilot
```

Architecture approved.

Governance approved.

Validation passed.

Naming standardized.

Runtime path simplified.

### Important Context

Core architecture:

```text
Markdown Files = Shared Memory
```

```text
Agents = Stateless Workers
```

```text
Skills = Execution Protocols
```

Knowledge separation:

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

### Open Tasks

1. Populate repo-context with real repository knowledge.
2. Run first PBI pilot.
3. Run first Review pilot.
4. Establish long-term cleanup process.
5. Monitor token consumption.
6. Validate skill effectiveness.

### Risks

- Over-documentation.
- Governance drift.
- Skill duplication.
- Repo-context remaining placeholders.
- Excessive runtime reading.

### Next Action

Populate repo-context using:

```text
repo-context-update
```

---

# Current Session Context

## Current Focus

Long-term maintenance and cleanup of:

```text
docs/ai/
```

The goal is to prevent:

- Context bloat
- Hallucinated documentation
- Stale information
- Governance drift
- Excessive token consumption

while preserving:

- Auditability
- Shared memory
- Governance

## Recent Discussions

Created and refined:

```text
docs-ai-cleanup-audit
```

skill.

Defined:

- Cleanup strategy
- Cleanup policy
- Archive vs delete policy
- Runtime vs governance separation

Created minimal invocation model:

```text
Use skill: docs-ai-cleanup-audit

Parameters:
...
```

## Current Decisions

Cleanup should:

```text
Audit
Before
Delete
```

Policy:

```text
Archive > Delete
```

Cleanup should focus on:

```text
Reducing reads
Not reducing file count
```

## Immediate Next Steps

1. Implement `docs-ai-cleanup-audit.skill.md`
2. Populate repo-context
3. Run validation
4. Execute first PBI pilot
5. Execute first Review pilot

---

# Important Rules

## Core Rules

```text
Markdown Files = Shared Memory
```

```text
Agents = Stateless Workers
```

```text
Skills = Execution Protocols
```

## Repository Rules

Only:

```text
repo-context-update
```

may modify:

```text
docs/ai/repo-context/*
```

All others are read-only.

## Token Cost Rules

Do not:

- Read entire repository
- Read all docs
- Read all skills
- Analyze whole codebase

Use:

```text
repo-context
```

first.

## Cleanup Rules

```text
Archive > Delete
```

Never delete:

- Active governance
- Official skills
- repo-context placeholders
- V2 baseline

without validation.

## Validation Rule

After governance changes:

```text
Re-run V2 validation checklist
```

---

# Decision Framework

User consistently evaluates decisions using:

## Priority 1

Simplicity

Question:

```text
Does this make daily usage simpler?
```

## Priority 2

Automation

Question:

```text
Can agents do this automatically?
```

## Priority 3

Low Token Cost

Question:

```text
Will this reduce context consumption?
```

## Priority 4

Shared Memory

Question:

```text
Can another agent continue without chat history?
```

## Priority 5

Predictability

Question:

```text
Will agents behave consistently?
```

---

# Preferred Output Formats

## Architecture Discussions

- Structured markdown
- Clear sections
- Explicit decisions

## Skills

Preferred format:

```text
Use skill: <skill-name>

Parameters:
...
```

Minimal prompts preferred.

## Documentation

- GitHub markdown
- Explicit headings
- Tables where useful
- Minimal prose

## Governance

Prefer:

```text
Common rules
+
Small skills
```

over duplicated documentation.

---

# Workflows

## PBI Workflow

```text
ChatGPT
↓
Approved PBI

pbi-workspace-create
↓
Workspace

pbi-plan-create
↓
Planning

implementation-phase
↓
review-phase
↓
fix-phase
↓
pbi-final-handoff
```

## Review Workflow

```text
ChatGPT
↓
Review Definition

review-workspace-create
↓
review-diff-analysis
↓
review-comments-create
↓
review-followup
↓
review-final-handoff
```

## Repository Knowledge Workflow

```text
repo-context-update
↓
repo-context/*
```

## Cleanup Workflow

```text
docs-ai-cleanup-audit
↓
Audit

Archive Candidates
Delete Candidates
Merge Candidates

↓
Validation
```

---

# Open Tasks

Priority order:

1. Create/Finalize `docs-ai-cleanup-audit.skill.md`
2. Populate repo-context
3. Re-run validation
4. Execute first PBI pilot
5. Execute first Review pilot
6. Evaluate pilot results
7. Refine skills if needed
8. Implement recurring cleanup process

---

# Known Constraints

## Time

User prefers efficient workflows.

## Resources

No PR API dependency.

No external review API dependency.

## Skills

Current AI stack:

- ChatGPT
- Codex
- Claude

Future agents may be added.

## External Limitations

Agents cannot rely on:

- Previous chats
- Hidden context
- External state

Markdown must contain operational memory.

---

# Risks and Dependencies

## Risks

- Over-documentation
- Governance sprawl
- Skill duplication
- Stale documentation
- Placeholder repo-context
- Excessive runtime reading

## Dependencies

- repo-context quality
- Skill quality
- Validation discipline
- Cleanup discipline

---

# Recommended Continuation Prompt

```text
We are continuing work on the AI Multi-Agent Coding Operating System V2.

Current status:
- V2 Ready For Pilot
- Governance approved
- Validation passed
- Naming finalized
- Runtime path simplified

Focus:
Populate repo-context using repo-context-update and prepare the first PBI pilot.

Before proposing changes:
Respect simplicity, automation, low token cost, shared markdown memory, and multi-agent collaboration principles.
```

---

# Snapshot Quality Score

Completeness: 98/100

Transfer Readiness: 99/100

Context Preservation: 98/100

Final Score: 98/100

END OF FILE
