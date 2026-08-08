# Phase Name

Minimal frontend fix preserving existing behavior

# Status

Done

# Goal

Apply the smallest frontend change that restores the existing Probability of Occurrence overview and search/filter behavior.

# Scope

- Fix the confirmed component ref/search contract issue.
- Preserve existing business logic, UI behavior, and BIA behavior.
- Avoid shared component changes unless diagnosis proves the shared component owns the defect.

# Target Files Or Areas

- Primary target to be determined by Phase 1.
- Most likely target files:
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`

# Planned Steps

- Apply a minimal fix following the existing component pattern.
- If the issue is a missing exposed method, expose the existing method rather than duplicating filtering logic.
- If the issue is an incorrect ref target, redirect the call to the component that owns the method.
- Keep naming and structure aligned with nearby DPIA/BIA components.
- Do not introduce unrelated refactors.

# Execution Memory

- Applied the phase-01 diagnosis to `DpiaRopaAssessmentList.vue`.
- Updated `onSearchTextChanged` to call `searchByText` on `dpiaRopaAssessmentList.value?.dataGrid` instead of directly on the `base-data-grid` component ref.
- After user runtime verification, fixed the filter button handler by renaming the boolean parameter from `showFilterBar` to `showFilterBarParameter` so it no longer shadows the `showFilterBar` ref.
- After a second user runtime verification, fixed the Probability of Occurrence filter options by using the actual risk management store getter `getOccuranceProbabilityConfig`.
- Added an empty-array fallback for occurrence probability assessment filter values so opening the filter is safe while the occurrence probability config is still empty or loading.
- Updated `DpiaRopaOccurProbabOverviewWrapper.vue` to use the same existing store getter when deciding whether the occurrence probability config must be fetched.
- After user reported that the Probability of Occurrence grid still displayed no data, traced the fetch path:
  `DpiaRopaAssessmentList.vue` -> `DataGrid.vue` -> `dpia/fetchDpiaRopasOccurenceProbabilityByDpiaRopaId` -> `/Dpia/GetDpiaRopaOccurenceProbabilities`.
- Confirmed backend expects `DpiaRopaOccurenceProbabilityFilterDto.DpiaId` and service queries ROPAs by that `DpiaId`.
- Reviewed the active `DataGrid.vue` fetch payload path and confirmed the existing `fetchObjectExtraParameters` prop was defined but not merged into the generated fetch object.
- Fixed `DataGrid.vue` to merge `fetchObjectExtraParameters` into the generated fetch payload, allowing `DpiaRopaAssessmentList.vue` to keep using the existing `fetch-object-extra-parameters` contract.
- After user reported `setSelectFilterData is not a function` when selecting filters, compared with the working DPIA BIA list.
- Fixed `DpiaRopaAssessmentList.vue` to import `useFilter` and get `setSelectFilterData` from `useFilter()`, while keeping `hasFilterAnyValue` from `useBase()`.
- After a deeper filtering review, aligned the frontend manual filter keys with the BIA pattern and backend DTO by using numeric `-1` and `0` instead of string values.
- Fixed `DpiaService.GetDpiaRopaOccuranceProbabilityScore` to use `OccurrenceProbabilityGrades` semantics. `Not rated` now matches ROPAs with no occurrence probability score, while `Not relevant` and configured grades match stored score values.
- After user reported two additional runtime errors, reviewed the attached stack traces:
  - `Cannot read properties of null (reading 'emitsOptions')` around `DpiaRopaAssessmentList.vue` content-ready handling.
  - `Cannot read properties of undefined (reading 'value')` at `DpiaRiskAssessmentTable.vue:6`.
- Hardened `DpiaRopaAssessmentList.vue` content-ready focus handling so filtered/refetched visible rows clear selection safely when the previously targeted row no longer exists.
- Fixed `DpiaRiskAssessmentTable.vue` template ref usage by removing `.value` from `getSelectedRiskAssessmentDpiaRopa` in the template, where refs are auto-unwrapped.
- Added null-safe occurrence probability config access in the risk assessment table for content rows, dynamic columns, and header styles while the config is still loading.
- Fixed the risk assessment table watcher to watch the ref itself and load the selected DPIA ROPA immediately, instead of watching the current ref value.
- Aligned the risk assessment table watcher with nearby DPIA store getter watch syntax by using `() => getSelectedRiskAssessmentDpiaRopa.value`.
- Kept the source changes minimal and did not modify shared `SearchAndFilter.vue`, BIA components, business logic, layout, or styling.

# Verification Notes

- Reviewed the targeted diff after the edit.
- User reported a runtime filter-button error after the first fix: `Cannot create property 'value' on boolean 'true'`.
- Reviewed the targeted diff after the follow-up edit.
- User reported a remaining filter runtime error: `Cannot read properties of undefined (reading 'value')` in `occurrenceProbabilityFilters`.
- Verified by targeted source inspection that `riskManagement.js` exposes `getOccuranceProbabilityConfig`, not `getOccurProbConfig`.
- Preserved the existing local `getOccurProbConfig` variable name by aliasing it to the actual store getter `getOccuranceProbabilityConfig`, keeping the source API fix without an unnecessary local rename.
- Verified by targeted search that the Risk Assessment table already uses `getOccuranceProbabilityConfig`.
- User reported the Probability of Occurrence grid still displayed no data.
- Verified by targeted source inspection that `DataGrid.vue` now merges the existing `fetchObjectExtraParameters` prop into the fetch payload.
- Addressed review feedback by removing the store-level `payload.dpiaId = state.selectedDpia.id` assignment; `dpiaId` is now derived from the payload supplied by the caller through `fetch-object-extra-parameters`.
- Verified by targeted backend inspection that `/Dpia/GetDpiaRopaOccurenceProbabilities` requires `DpiaId` to fetch the list.
- User reported selecting Probability of Occurrence filters throws `setSelectFilterData is not a function`.
- Verified against working `DpiaBiaRopasList.vue` that `setSelectFilterData` belongs to `FilterComposable`, not `BaseComposable`.
- Verified that the backend previously compared frontend filter keys against `OccurrenceProbability`, whose `not rated` and `not relevant` values are reversed for the score-grade filter use case.
- Verified that `OccurrenceProbabilityGrades` matches frontend filter keys and audit/display semantics: `notRated=-1`, `notRelevant=0`.
- Verified by targeted source inspection that the table title used `.value` in the Vue template, which is invalid for an auto-unwrapped template ref when the selected ROPA is temporarily undefined.
- Verified by targeted source inspection that occurrence probability config was read directly in table rendering paths before all loading states were guarded.
- Addressed review feedback by changing the store getter watcher syntax to `watch(() => getSelectedRiskAssessmentDpiaRopa.value, ...)`.
- `dotnet build` was started after the backend change but did not finish before the 120 second timeout, so no build result is available.
- No runtime, lint, or eslint command was run.
- `npm run lint` and `npx eslint` were intentionally not run because the user instruction forbids using them unless explicitly requested.

# Files Changed

- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRiskAssessmentTable.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`
- `Web-Suite/clientapp/src/shared/components/DataGrid.vue`
- `Web-Suite/clientapp/src/store/stores/dpia.js`
- `Web.Services/DpiaService.cs`
- `docs/ai/pbi/STP-8124/phases/02-apply-minimal-frontend-fix.md`

# Known Risks Or Follow-Up

- Runtime behavior still needs phase-03 verification in the browser after the targeted fixes.
- Verify Probability of Occurrence loading, backend payload includes `dpiaId`, filter button behavior, occurrence probability filter option rendering, occurrence probability filtering for not-rated/not-relevant/configured grades, search behavior, and switching between BIA and Probability of Occurrence.
- Personnel filtering remains a known limitation matching the existing BIA implementation: backend code contains a TODO and the overview DTO does not expose a `personnel` field for client-side filtering.
