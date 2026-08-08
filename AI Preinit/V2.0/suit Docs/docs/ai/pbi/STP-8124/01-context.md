# Repo Context Summary

- The affected area is the Vue 3 frontend under `Web-Suite/clientapp`.
- Frontend work usually follows a vertical slice across `src/router.js`, `src/views`, `src/components`, `src/store/stores`, `src/services`, `src/Composables`, and translations when needed.
- Shared frontend components live under `Web-Suite/clientapp/src/shared/components`.
- Frontend JavaScript/Vue/SCSS/JSON files use 2-space indentation.
- Active frontend code policy CP-001 applies: do not use `var`; use `const` by default and `let` only when reassignment is needed.
- Frontend verification should use package scripts from `Web-Suite/clientapp`; do not use `npx eslint`. User instruction also says not to run `npm run lint` unless explicitly requested.

# Task Context

- STP-8124 is a frontend bug fix for the DPIA Risk Assessment Probability of Occurrence overview.
- Reported runtime error: `TypeError: dpiaRopaAssessmentList.value.searchByText is not a function`.
- The PBI says the error originates from `DpiaRopaAssessmentList.vue:266` and propagates through `DpiaRopaOccurProbabOverviewWrapper.vue`, `DpiaRiskAssessmentContainer.vue`, and `SearchAndFilter.vue`.
- Existing Probability of Occurrence behavior is already implemented and must be preserved.
- Existing UI behavior and business logic should remain unchanged; no redesign or feature enhancement is in scope.
- Filename-only navigation found the likely affected files under:
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaAssessmentList.vue`
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessment/DpiaRopaOccurProbabOverviewWrapper.vue`
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaRiskAssessmentContainer.vue`
  - `Web-Suite/clientapp/src/shared/components/SearchAndFilter.vue`
- Related sibling BIA files to inspect for compatible behavior:
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaBia/DpiaBiaOverviewWrapper.vue`
  - `Web-Suite/clientapp/src/components/DataProtection/Dpia/DpiaBia/DpiaBiaRopasList.vue`

# Source Inspection Notes

- No source file content was inspected during planning.
- Repo-context does not contain DPIA Risk Assessment component contracts or exposed method details.
- Implementation must inspect only the targeted source files listed in `03-codebase-index.md` before changing code.

# Constraints

- Bug fix only.
- Preserve existing Risk Assessment, BIA, DPIA workflow, and Probability of Occurrence business behavior.
- Avoid shared component changes unless the defect is confirmed to be in a shared contract.
- Do not run `npm run lint` or `npx eslint` unless the user explicitly permits it.

# Open Questions

- Does `DpiaRopaAssessmentList.vue` use `<script setup>` and need `defineExpose` for `searchByText`, or is the wrapper using the wrong ref target?
- Is `searchByText` expected to be owned by the list component, the overview wrapper, or the shared `SearchAndFilter` flow?
- Does BIA use the same ref/search contract successfully, and should Probability of Occurrence match that pattern?

# Risks

- Fixing only the thrown error could leave the overview empty if the underlying load/refresh sequence is also broken.
- Changing a shared `SearchAndFilter` contract could regress unrelated screens.
- Changing list filtering behavior could affect BIA or other DPIA Risk Assessment views.
