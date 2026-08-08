# Relevant Areas

- Frontend DPIA components: `Web-Suite/clientapp/src/components/DataProtection/Dpia`
- DPIA Risk Assessment components: `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment`
- Shared filtering component: `Web-Suite/clientapp/src/shared/components/SearchAndFilter.vue`
- DPIA state/service/composable only if the component-level diagnosis shows data loading is involved.

# Files To Inspect

- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessmentContainer.vue`
- `Web-Suite/clientapp/src/shared/components/SearchAndFilter.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaBia/DpiaBiaOverviewWrapper.vue`
- `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaBia/DpiaBiaRopasList.vue`

# Files To Inspect Only If Needed

- `Web-Suite/clientapp/src/store/stores/dpia.js`
- `Web-Suite/clientapp/src/services/dpia-service.js`
- `Web-Suite/clientapp/src/Composables/DpiaComposable.js`
- `Web-Suite/clientapp/src/router.js`

# Files Expected To Change

- Most likely one of:
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`
- `SearchAndFilter.vue` should change only if the shared component contract is confirmed to be the defect source.

# Files Expected To Stay Unchanged

- Backend controllers, services, repositories, models, and migrations.
- Risk calculation logic.
- BIA functionality except for inspection and regression comparison.
- UI layout and styling files unless a component import/ref issue requires a paired style-safe adjustment.

# Search Hints

- Search for `searchByText`.
- Search for `defineExpose`.
- Search for `dpiaRopaAssessmentList`.
- Search for refs passed between `DpiaRopaOccurProbabOverviewWrapper.vue`, `DpiaRiskAssessmentContainer.vue`, and `SearchAndFilter.vue`.
- Compare against BIA wrapper/list behavior before introducing a new pattern.

# Phase To Source Files

- Phase 1: inspect the four reported components plus BIA sibling components for the existing working pattern.
- Phase 2: change only the confirmed component/ref contract file or files.
- Phase 3: verify affected Risk Assessment views and update handoff documentation.

# Phase To Knowledge Files

- No dedicated `knowledge/*` file is planned for light planning.
- If implementation discovers a reusable DPIA Risk Assessment ref/search contract, document it in a focused `knowledge/` file before final handoff.

# Phase To Relevant Modules

- Phase 1: `Web-Suite/clientapp` Vue component layer.
- Phase 2: `Web-Suite/clientapp` Vue component layer.
- Phase 3: `Web-Suite/clientapp` manual/browser verification path.

# Phase To Created Or Updated Files

- Phase 1: `docs/ai/pbi/STP-8124/phases/01-diagnose-ref-search-contract.md`
- Phase 2: `docs/ai/pbi/STP-8124/phases/02-apply-minimal-frontend-fix.md`
- Phase 3: `docs/ai/pbi/STP-8124/phases/03-verify-risk-assessment-views.md`

# Phase To Created Or Updated Functions

- Unknown until targeted source inspection.
- Candidate function or exposed method: `searchByText`.

# Function Purpose, Usage, Related Flow, Validation Focus, and Review Focus

- `searchByText`
  - Purpose: apply search text to the list/overview filtering flow.
  - Usage: called through component refs while opening or filtering the Probability of Occurrence overview.
  - Related Flow: `SearchAndFilter.vue` -> risk assessment wrapper/container -> assessment list.
  - Validation Focus: no runtime error, overview loads, search/filter still works, BIA switching remains stable.
  - Review Focus: method ownership, `defineExpose` usage if applicable, lifecycle/ref nullability, and avoiding shared component regressions.
