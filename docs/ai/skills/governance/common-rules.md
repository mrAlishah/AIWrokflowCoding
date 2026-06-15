# Common Rules

Canonical shared rules for the AI Multi-Agent Coding Operating System.

## Core Rules

- Markdown files are shared memory.
- Agents are stateless workers.
- Use skill + parameters.
- Quality first.
- Simplicity over flexibility.
- Minimal prompts over rich workflow.
- Preserve backward compatibility.
- Do not duplicate global rules inside skills, README files, or workspace templates. Reference the canonical governance file instead.

## Safety Rules

- Do not modify source code unless the selected skill explicitly allows it and the task requires it.
- Review-only work must not modify source code.
- Do not perform broad refactors unless explicitly requested.
- Do not introduce new workflow semantics from documentation cleanup.
- Do not introduce V3 Harness Engineering features.

## Ownership Rules

- `docs/ai/repo-context/*` is reusable repository knowledge.
- Repository policy files live under `docs/ai/repo-context/policy/`.
- Only `tools_repo_context_update` may update repo-context files.
- Exception: `tools_policy_plan_update` may update reusable repository policy files only when its approved global policy parameters allow it.
- All other skills treat repo-context as read-only.

## PBI Rules

- PBI workspaces live under `docs/ai/pbi/STP-XXXX/`.
- PBI workflow semantics, validation behavior, phase status model, `pbi_clarification`, and workspace metrics behavior must remain unchanged.
- Phase statuses remain exactly: `Planned Only`, `Planned`, `In Progress`, `Done`.
- `02-implementation-plan.md` phase tables use `Phase | Status | Step | Goal`.
- `Step` is independent from `Status`.

## Review Rules

- Review workspaces live under `docs/ai/reviews/STP-XXXX/`.
- Reviews are local git diff driven.
- Do not call PR APIs, create pull requests, push commits, or modify source code during review-only work.
- Preserve separation between English PR-ready comments and Persian/internal suggestions.
