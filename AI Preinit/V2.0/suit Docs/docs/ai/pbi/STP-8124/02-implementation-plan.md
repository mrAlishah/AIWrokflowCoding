# Status

Planned

# Scope

Restore the DPIA Risk Assessment Probability of Occurrence overview by resolving the missing `searchByText` function reference while preserving existing behavior.

# Out Of Scope

- Redesigning the Risk Assessment UI.
- Changing risk calculation or DPIA business rules.
- Refactoring unrelated Data Protection, BIA, ROPA, or Risk Management components.
- Updating backend APIs unless targeted source inspection proves the frontend error is caused by a backend contract mismatch.

# Phases

- Phase 1: Targeted diagnosis of the component ref/search contract. Status: Planned.
- Phase 2: Minimal frontend fix preserving existing behavior. Status: Planned.
- Phase 3: Focused verification and handoff notes. Status: Planned.

# Verification Plan

- Manually verify opening `Data Protection -> DPIA -> Risk Assessment -> Probability of Occurrence` does not throw console errors.
- Verify the Probability of Occurrence overview renders data or the expected empty state.
- Verify search and filter behavior still works in Probability of Occurrence.
- Verify switching between BIA and Probability of Occurrence does not create blank views or console errors.
- Verify no obvious regression in the BIA Risk Assessment view.
- Do not run `npm run lint` or `npx eslint` unless the user explicitly approves it.

# Handoff Expectations

- Record inspected files and the confirmed root cause in the relevant phase file.
- Keep the implementation narrowly scoped to the affected component/ref contract.
- Record any skipped verification and reason in `06-handoff.md` during final handoff.
