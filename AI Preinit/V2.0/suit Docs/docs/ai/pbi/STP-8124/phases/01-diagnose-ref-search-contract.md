# Phase Name

Targeted diagnosis of the component ref/search contract

# Status

Done

# Goal

Confirm why `dpiaRopaAssessmentList.value.searchByText` is not callable in the Probability of Occurrence flow.

# Scope

- Inspect only the affected DPIA Risk Assessment components and BIA sibling components needed for comparison.
- Identify method ownership, component refs, lifecycle timing, and exposed methods.

# Target Files Or Areas

- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessmentContainer.vue`
- `Web-Suite/clientapp/src/shared/components/SearchAndFilter.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaBia/DpiaBiaOverviewWrapper.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaBia/DpiaBiaRopasList.vue`

# Planned Steps

- Locate all `searchByText` declarations and calls in the target components.
- Check whether the called component exposes `searchByText` to parent refs.
- Compare Probability of Occurrence with BIA's working list/search flow.
- Record the root cause before editing code.

# Execution Memory

- Inspected only the source files listed in this phase.
- `DpiaRopaAssessmentList.vue` declares `dpiaRopaAssessmentList` as the ref for `<base-data-grid>`.
- `DpiaRopaAssessmentList.vue` handles `SearchAndFilter.vue`'s `search-text-changed` event with `onSearchTextChanged`.
- The failing call is in `onSearchTextChanged`: `dpiaRopaAssessmentList.value.searchByText(search)`.
- `DpiaBiaRopasList.vue` uses a working sibling pattern: it creates `dataGrid = computed(() => biaRopaGrid.value?.dataGrid)` and calls `dataGrid.value.searchByText(search)`.
- Root cause: Probability of Occurrence calls `searchByText` on the wrapper component ref instead of the inner DevExtreme grid instance exposed through the `dataGrid` property.
- `SearchAndFilter.vue` is only emitting the search text and is not the defect source.
- `DpiaRopaOccurProbabOverviewWrapper.vue` and `DpiaRiskAssessmentContainer.vue` only trigger reload/switching and do not own `searchByText`.
- No source code was changed in this phase because phase-01 is diagnosis only.

# Verification Notes

- Verified by source inspection and comparison with the BIA list pattern.
- No runtime, build, lint, or eslint command was run.

# Files Changed

- `docs/ai/pbi/STP-8124/phases/01-diagnose-ref-search-contract.md`

# Known Risks Or Follow-Up

- Phase 2 should apply the minimal fix in `DpiaRopaAssessmentList.vue`, most likely by calling the inner grid instance consistently with the BIA pattern.
- Phase 2 should preserve existing search/filter behavior and avoid changes to `SearchAndFilter.vue`.
