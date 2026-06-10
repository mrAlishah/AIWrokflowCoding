# Claude Compatibility Validation

## Status

Ready For Pilot

## Summary

Claude can be treated as a first-class V2 agent when it enters through repository-defined rules instead of chat history.

The compatibility layer is based on:

- `AGENTS.md` for shared agent rules
- `CLAUDE.md` for Claude-specific adapter rules
- `docs/ai/START_HERE.md` for runtime entry
- `docs/ai/skills/README.md` for skill routing
- selected skill files for execution protocol
- markdown workspaces for shared memory

## Checked Files

- `AGENTS.md`
- `CLAUDE.md`
- `docs/ai/START_HERE.md`
- `docs/ai/skills/README.md`
- `docs/ai/skills/common-skill-rules.md`

## Passed Checks

- Claude has a repository-defined entry contract.
- Claude reads shared agent rules before Claude-specific overrides.
- Claude uses `START_HERE.md` as the runtime entry point.
- Claude routes work through `skills/README.md`.
- Claude must select one approved skill before execution.
- Claude must execute one skill at a time.
- Claude is instructed not to rely on chat history or hidden context.
- Claude is instructed not to read all docs, all skills, or the whole repository by default.
- Claude is instructed to preserve markdown shared memory.
- Claude has explicit stop conditions for unclear scope, missing workspace files, disallowed file updates, source code safety, and insufficient tool access.
- Claude can orchestrate end-to-end work without skipping approved workflow steps.

## Failed Checks

None.

## Pilot Criteria

A Claude pilot is successful if Claude can:

- start with the minimal Claude prompt
- read only the required entry files
- select the correct skill for a PBI, review, policy, or repo-context task
- read only the selected skill and required workspace files
- update only files allowed by the selected skill
- stop safely when scope or tool access is unclear
- report Markdown Files Changed
- recommend the next skill after one completed step

## Source Code Modified

No

## Ready For Pilot

Yes
