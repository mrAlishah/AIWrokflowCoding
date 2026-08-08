# PBI Final Handoff

## PBI

- PBI ID: `STP-8124`
- Title: DPIA Risk Assessment Probability of Occurrence Overview Fails Due to Frontend Error
- Target path: `Data Protection -> DPIA -> Risk Assessment -> Probability of Occurrence`

## Final Summary

The Probability of Occurrence flow was fixed across the frontend list, wrapper, table, store fetch path, and backend occurrence probability filtering logic.

The original `searchByText is not a function` issue was traced to calling `searchByText` on the wrapper component ref instead of the inner data grid instance. Follow-up runtime issues reported by the user were also addressed:

- filter bar handler shadowing the `showFilterBar` ref
- missing occurrence probability config getter usage
- missing `dpiaId` in the occurrence probability list fetch payload, fixed by making `DataGrid.vue` merge caller-provided `fetch-object-extra-parameters`
- `setSelectFilterData is not a function` from using the wrong composable
- incorrect not-rated/not-relevant filtering semantics
- unsafe focus handling after filter/refetch
- invalid `.value` usage in the risk assessment table template
- unsafe occurrence probability config access while loading
- store getter watcher syntax aligned with nearby DPIA patterns

Shared `DataGrid.vue` was updated narrowly so its existing `fetchObjectExtraParameters` prop is merged into generated fetch payloads.

## Changed Source Files

- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRiskAssessmentTable.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`
- `Web-Suite/clientapp/src/shared/components/DataGrid.vue`
- `Web-Suite/clientapp/src/store/stores/dpia.js`
- `Web.Services/DpiaService.cs`

## Final Diff Notes

- `package-lock.json` is modified in the working tree with two `peer: true` additions, but it is not part of the STP-8124 fix and should be confirmed or excluded before PR.
- `DataGrid.vue` has a narrow infrastructure diff: it now merges `fetchObjectExtraParameters` into the fetch payload.

## Validation Performed

- Source inspection of the affected Probability of Occurrence components.
- Comparison against the working DPIA BIA list pattern.
- Backend fetch path inspection from frontend grid action to `/Dpia/GetDpiaRopaOccurenceProbabilities`.
- Targeted final diff review.
- `git diff --check` was run for changed source files and returned no output.

## Validation Not Performed

- Browser/runtime verification was not completed.
- `dotnet build` was started after the backend change but timed out after 120 seconds, so no build result is available.
- `npm run lint` and `npx eslint` were not run because the user explicitly instructed not to run them unless requested.

## Remaining Risks

- Runtime verification is still required for opening Probability of Occurrence, selecting filters, search, row focus, score table rendering, and switching between BIA and Probability of Occurrence.
- Personnel filtering remains a known limitation. The backend contains a TODO for personnel filtering in the occurrence probability path, and the overview DTO does not expose a personnel field suitable for client-side filtering.
- `package-lock.json` should be reviewed separately because it appears unrelated to this PBI.

## Suggested PR Description

Fix DPIA Risk Assessment Probability of Occurrence loading, search, and filtering.

This change corrects the Probability of Occurrence data-grid ref usage, ensures the occurrence probability config and caller-provided DPIA id are available for list loading through `fetch-object-extra-parameters`, uses the correct filter composable, aligns occurrence probability filter values with backend grade semantics, and hardens table/focus handling during loading and filtering. `DataGrid.vue` is updated only to honor its existing `fetchObjectExtraParameters` prop.

Validation performed by source inspection, BIA pattern comparison, fetch-path tracing, final diff review, and `git diff --check`. Browser verification, frontend lint, and a successful backend build are still pending.

## Recommended Review Focus

- Verify the Probability of Occurrence page loads without console errors.
- Verify search and occurrence probability filters work for not rated, not relevant, and configured grades.
- Verify switching between BIA and Probability of Occurrence does not produce blank views.
- Verify backend filtering semantics for not-rated scores match expected business behavior.
- Confirm `package-lock.json` should not be included in the PR unless intentionally updated.
