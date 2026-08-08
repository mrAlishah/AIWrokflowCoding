# Context_Snapshot.md

# Executive Summary

The project is an AI Multi-Agent Coding Operating System designed to transform ambiguous Product Backlog Items (PBIs) into high-quality implementations and reviews through structured, skill-based workflows.

The system prioritizes:

```text
Simplicity > Flexibility

Minimal Prompts > Rich Workflow

Quality First

Low Token Cost

Agent Neutral
```

Core architectural principles:

```text
Markdown Files = Shared Memory

Agents = Stateless Workers

Skills = Execution Protocols

Use Skill + Parameters
```

The operating model separates:

```text
Repository Knowledge
≠ PBI Knowledge
≠ Review Knowledge
≠ Execution Memory
≠ Architecture Decisions
```

The system currently operates on the approved V2 baseline with:

```text
V2 Approved
V2.1 Essential
V2.2 Productivity
ObsV1.1
```

V3 concepts remain explicitly deferred.

Recent work focused on:

- Refactoring `docs/ai`
- Introducing categorized skills
- Centralizing governance
- Reducing documentation duplication
- Improving context efficiency
- Building a user-facing reference layer
- Introducing automated system health checks
- Creating a reference maintenance workflow

---

# User Profile

## Background

Technical leader designing an AI-assisted software delivery platform.

## Skills

- Software engineering
- System architecture
- AI workflow design
- Multi-agent orchestration
- Prompt engineering
- Documentation systems

## Professional Domain

AI-assisted software development and delivery.

## Learning Goals

- Design scalable multi-agent systems
- Reduce AI operational costs
- Improve prompt quality
- Increase agent interoperability

## Personal Goals

Create a sustainable AI operating model that minimizes manual coordination.

## AI Usage Goals

- Convert ambiguous requirements into implementation-ready work
- Standardize implementation and review workflows
- Reduce dependency on chat history
- Improve consistency across agents
- Lower token consumption

## Decision-Making Preferences

Prioritize:

1. Simplicity
2. Practicality
3. Maintainability
4. Low operational cost
5. Quality

Favor evolutionary improvements over large redesigns.

---

# Long-Term Objectives

- Build a production-grade AI Multi-Agent Coding Operating System.
- Support multiple coding agents without vendor lock-in.
- Minimize context requirements.
- Maintain high implementation quality.
- Establish documentation as the primary memory layer.
- Enable reproducible workflows independent of conversation history.
- Create self-maintaining documentation and prompt systems.
- Introduce observability without complex telemetry.
- Delay advanced autonomous capabilities until V3.

---

# Active Projects

## AI Multi-Agent Coding Operating System

### Purpose

Provide a skill-driven operating system for software delivery using multiple AI agents.

### Current State

```text
Status: V2 Operational
```

Implemented:

- Categorized skills
- Governance centralization
- Repo policy separation
- Review orchestration
- Observability
- System health checks
- Reference architecture

### Important Context

Current structure:

```text
docs/ai/

├── skills/
│   ├── governance/
│   ├── pbi/
│   ├── review/
│   ├── pr/
│   └── tools/
│
├── repo-context/
│   └── policy/
│
├── pbi/
├── reviews/
├── reference/
│   ├── guides/
│   ├── prompts/
│   ├── system-health/
│   └── history/
```

Foundation content is historical and non-runtime.

### Open Tasks

- Create `tools_reference_update.skill.md`
- Improve reference prompt usability
- Complete user-facing guides
- Complete prompt help files
- Enforce parameter metadata standards
- Integrate reference maintenance into health checks

### Risks

- Reference documentation drift
- Prompt usability inconsistency
- Historical documentation confusion
- Context cost growth

### Next Action

Implement and validate:

```text
tools_reference_update
```

Then run:

```text
tools_system_health_check
```

---

# Current Session Context

## Current Focus

Improving end-user usability.

## Recent Discussions

- Health check capabilities
- Context efficiency metrics
- Reference structure design
- User guide generation
- Prompt template quality
- Prompt parameter usability

## Current Decisions

Reference documentation is separated into:

```text
docs/ai/reference/guides/
docs/ai/reference/prompts/
```

Each skill prompt requires:

```text
[name].prompt.md
[name]-short.prompt.md
[name].help.md
```

Prompts must be executable forms rather than technical documentation.

Users must only modify parameter values.

Users must not need to read skill files.

Reference documentation is non-runtime.

## Immediate Next Steps

1. Implement `tools_reference_update.skill.md`
2. Generate guides and prompts
3. Update help files
4. Run `tools_system_health_check`
5. Review findings
6. Commit changes

---

# Important Rules

## Runtime Read Path

```text
1. AGENTS.md or CLAUDE.md
2. docs/ai/START_HERE.md
3. docs/ai/skills/README.md
4. Selected skill only
5. Active workspace
6. repo-context only if needed
7. Exact source files only if needed
```

## Context Rules

- Do not read all docs.
- Do not read all skills.
- Do not read the entire repository.
- Justify extra file reads.
- Prefer repo-context over source inspection.

## Review Rules

- Local git diff only
- No PR APIs
- No source code changes

## Ownership Rules

- `repo-context` is reusable repository knowledge.
- Only `tools_repo_context_update` may modify repo-context.
- Policy exceptions must be explicitly documented.

## Reference Rules

- Reference is non-runtime.
- Prompts must be user-ready.
- Users should modify parameters only.
- Help files must explain parameter options.

---

# Decision Framework

Use the following priority order:

```text
Simplicity > Flexibility
Minimal Prompts > Rich Workflow
Quality First
Low Token Cost
Agent Neutral
```

Optimization rules:

- Centralize repeated rules.
- Prefer pointers over duplication.
- Keep runtime docs concise.
- Separate governance from execution.
- Separate history from runtime.

---

# Preferred Output Formats

## Markdown Standards

- GitHub-Flavored Markdown
- Structured headings
- Tables for comparisons
- Fenced code blocks
- Explicit file paths

## Operational Reporting

Always include:

```text
Files Read
Files Changed
Extra Files Requested
Context Size
Scope Violations
```

## Prompt Design

Prompt files must be:

- Copy-paste ready
- Parameter driven
- User focused
- Self-explanatory

---

# Workflows

## PBI Workflow

```text
pbi_clarification
↓
pbi_workspace_create
↓
pbi_plan_create
↓
pbi_implementation_phase
↓
pbi_review_phase
↓
pbi_fix_phase
↓
pbi_final_handoff
```

## Review Workflow

```text
review_workspace_create
↓
review_diff_analysis
↓
review_comments_create
↓
review_followup
↓
review_final_handoff
```

## PR Workflow

```text
pr_review_workflow
```

Internal orchestration:

```text
pr_review_workspace_create
↓
pr_local_diff_analysis
↓
pr_review_findings
↓
pr_review_comments
↓
pr_review_suggestions
↓
pr_review_followup
↓
pr_review_final_handoff
```

## Maintenance Workflow

```text
System Change
↓
tools_reference_update
↓
tools_system_health_check
↓
Commit
```

---

# Open Tasks

Priority order:

1. Create `tools_reference_update.skill.md`
2. Build user-facing guides
3. Build prompt templates
4. Build prompt help files
5. Add prompt usability validation
6. Enhance system health checks
7. Improve parameter metadata quality

---

# Known Constraints

## Resources

- No exact token tracking
- No external telemetry

## Technical

- Source code must remain untouched during documentation changes.
- Foundation remains historical.
- Compatibility mappings must remain.

## Architectural

- No V3 concepts
- No autonomous planning
- No trust metrics
- No confidence scoring

---

# Risks and Dependencies

## Dependencies

- Accurate skill metadata
- Consistent parameter definitions
- Updated health reports

## Risks

- Reference drift
- Parameter ambiguity
- Naming inconsistencies
- Context expansion
- Historical confusion

---

# Recommended Continuation Prompt

```text
Read the latest Context_Snapshot.md.

Reconstruct the current V2 AI Operating System state.

Focus on:

- tools_reference_update.skill.md
- docs/ai/reference/guides/
- docs/ai/reference/prompts/
- Prompt usability improvements
- System health integration

Preserve all V2 principles.

Do not introduce V3 concepts.

Recommend the next implementation step.
```

---

# Snapshot Quality Score

| Metric               |  Score |
| -------------------- | -----: |
| Completeness         | 95/100 |
| Transfer Readiness   | 97/100 |
| Context Preservation | 96/100 |

## Final Score

```text
96/100
```

END OF FILE
