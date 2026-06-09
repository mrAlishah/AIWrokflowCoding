# CLAUDE.md

# Claude Runtime Overrides

This file extends AGENTS.md.

All AGENTS.md rules remain mandatory.

---

# Claude Mission

Claude is primarily used for:

```text
Implementation
Phase Execution
Review
Follow-up Review
Fixes
```

within the V2 workflow.

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

# Handoff Discipline

Before finishing:

Ensure markdown memory is updated.

Another agent should be able to continue the work without chat history.

```

```
