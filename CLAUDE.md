# CLAUDE.md

# Claude Adapter

This file adapts Claude to the V2 AI Multi-Agent Coding Operating System.

It extends `AGENTS.md`. All `AGENTS.md` rules remain mandatory.

Claude-specific guidance must stay small and must not duplicate shared governance.

---

# Entry Contract

At the start of every repository task, Claude must read:

```text
AGENTS.md
CLAUDE.md
docs/ai/START_HERE.md
docs/ai/skills/README.md
```

Then Claude must:

```text
Select one approved skill
Read only the selected skill
Execute one skill at a time
Use markdown files as shared memory
```

Do not rely on chat history or hidden context.

---

# Claude Mission

Claude is primarily used for:

```text
Workflow Orchestration
Implementation
Phase Execution
Review
Follow-up Review
Fixes
```

within the V2 workflow.

---

# Skill Selection

Claude must route work through `docs/ai/skills/README.md`.

If more than one skill appears possible:

```text
Prefer the least invasive skill
Prefer planning or policy sync before implementation
Prefer review workflow for review tasks
Stop if the user intent cannot be mapped to one approved skill
```

Do not invent custom workflows.

---

# V2 Workflow Orchestration

When explicitly asked to manage a PBI or review workflow end-to-end, Claude may act as the workflow orchestrator.

Claude must still execute one approved skill at a time.

Do not replace the skill workflow with a custom prompt-only process.

If orchestration is requested, Claude must report the selected current skill and the recommended next skill after each step.

---

# PBI Orchestration

When managing a PBI end-to-end, use this sequence:

```text
pbi-clarification
pbi-workspace-create
pbi-plan-create
implementation-phase
review-phase
fix-phase only if review findings require fixes
repeat implementation/review/fix per phase
pbi-final-handoff
```

Rules:

- Execute only one implementation phase at a time.
- Do not skip PBI clarification.
- Do not skip workspace creation.
- Do not skip implementation planning.
- Do not skip `05-validation.md`.
- Do not skip phase files.
- Do not skip markdown memory updates.
- Do not rely on chat history.
- Do not update `docs/ai/repo-context/*` unless explicitly using an approved repo-context update skill.
- Stop before continuing if scope, risks, or validation are unclear.

---

# Review Orchestration

When managing a coworker branch review end-to-end, use this sequence:

```text
review-workspace-create
review-diff-analysis
review-comments-create
review-followup only after branch changes
review-final-handoff
```

Rules:

- Use local git diff only.
- Do not call PR APIs.
- Do not create PRs.
- Do not push commits.
- Do not modify source code.
- Update review markdown memory after each step.

---

# Preferred Working Style

Prefer:

```text
Small scoped changes
Incremental implementation
Single phase execution
Minimal diffs
```

Avoid:

```text
Large refactors
Repository-wide changes
Architecture rewrites
```

---

# Phase Discipline

When executing implementation:

Read only:

```text
02-implementation-plan.md
05-validation.md
Selected phase file
Required source files
```

Do not execute multiple phases in one run unless explicitly instructed.

---

# Phase Memory Updates

After implementation:

Update the phase file.

Document:

```text
Files changed
Functions added
Functions modified
Validation performed
Risks
Notes for next agent
```

---

# Review Discipline

When reviewing:

Focus on:

```text
Correctness
Architecture
Repository standards
Comment quality
Test impact
Simplicity
```

Do not suggest broad redesigns unless necessary.

---

# Fix Discipline

When fixing review findings:

Apply only:

```text
Requested fixes
Required corrections
```

Avoid:

```text
Cleanup work
Refactors
Opportunistic improvements
```

unless explicitly requested.

---

# Token Efficiency

Prefer:

```text
repo-context
codebase-index
phase files
```

before reading additional files.

Minimize unnecessary context usage.

---

# Tool Access Limits

If Claude cannot access files, git diff, shell, or another required tool directly:

```text
Ask the user for the exact required file or output
Do not guess missing repository state
Keep the selected skill and scope rules active
Stop if required verification cannot be performed
```

---

# Claude Stop Conditions

Claude must stop before file changes when:

```text
No approved skill matches the task
Required workspace files are missing
The selected skill does not allow the needed update
The task asks for source code modification but the selected skill forbids it
The requested work would require reading all docs or the whole repository
Tool access is insufficient and the user has not provided the needed content
```

When stopping, Claude must report the blocker and recommended next prompt.

---

# Handoff Discipline

Before finishing:

Ensure markdown memory is updated.

Another agent should be able to continue the work without chat history.

---

# Minimal Claude Prompt

Use this short prompt when starting Claude cold:

```markdown
Use the V2 AI Multi-Agent Coding Operating System.

Read:
1. AGENTS.md
2. CLAUDE.md
3. docs/ai/START_HERE.md
4. docs/ai/skills/README.md

Task:
[write the task here]

Rules:
- Select one approved skill.
- Execute one skill at a time.
- Follow the selected skill file exactly.
- Use markdown files as shared memory.
- Do not rely on chat history.
- Do not read all docs or the whole repository.
- Do not update repo-context unless an approved skill allows it.
- Report Markdown Files Changed.
```
