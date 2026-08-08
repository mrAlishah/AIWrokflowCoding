# PBI ID

STP-8124

# Title

DPIA Risk Assessment Probability of Occurrence Overview Fails Due to Frontend Error

# Approved Request

The DPIA Risk Assessment module contains a defect that prevents the Probability of Occurrence overview from loading correctly.

When a user navigates to:

```text
Data Protection -> DPIA -> Risk Assessment -> Probability of Occurrence
```

the UI displays an empty overview and the browser console reports the following runtime error:

```text
TypeError: dpiaRopaAssessmentList.value.searchByText is not a function
```

The error originates from:

```text
DpiaRopaAssessmentList.vue:266
```

and propagates through:

```text
DpiaRopaOccurProbabOverviewWrapper.vue
DpiaRiskAssessmentContainer.vue
SearchAndFilter.vue
```

The existing Probability of Occurrence functionality has already been implemented and should remain unchanged. The objective of this PBI is to restore the intended behavior by resolving the defect that prevents the overview from rendering.

# Acceptance Criteria

- No JavaScript runtime error occurs when opening Probability of Occurrence.
- The Probability of Occurrence overview loads successfully.
- Existing Risk Assessment functionality remains unchanged.
- Search and filter behavior continues to function correctly.
- Switching between BIA and Probability of Occurrence works without blank views or console errors.
- No regression is introduced in other Risk Assessment views.

# Source Context

## Business Context

- DPIA Risk Assessment cannot be completed correctly because the Probability of Occurrence overview fails to load.
- Users are blocked from performing probability assessments within DPIA workflows.

## Important Constraints

- This is a bug fix only.
- Existing business logic is already implemented and should be preserved.
- Existing UI behavior should remain unchanged.
- No redesign or feature enhancement is required.

## Risks

- Shared components may be used by multiple Risk Assessment views.
- Changes to list refresh or filtering logic may affect BIA and other assessment views.
- The root cause may involve component refs, exposed methods, or lifecycle timing.

## Assumptions

- Probability of Occurrence functionality previously existed and is expected to work.
- The blank overview is caused by the reported frontend runtime error.
- No business-rule clarification is required.

## Validation Focus

- Verify that opening Probability of Occurrence does not generate console errors.
- Verify that the overview loads correctly.
- Verify search and filter functionality.
- Verify switching between Risk Assessment views.
- Verify no regressions in BIA and related assessment screens.

## Additional Information

Reported runtime error:

```text
TypeError: dpiaRopaAssessmentList.value.searchByText is not a function
```

Relevant components identified during investigation:

```text
DpiaRopaAssessmentList.vue
DpiaRopaOccurProbabOverviewWrapper.vue
DpiaRiskAssessmentContainer.vue
SearchAndFilter.vue
```

# Review Before Starting

## Key Risks

- Regression in shared Risk Assessment components.
- Impact on existing search/filter behavior.
- Incorrect fix masking the error while leaving loading issues unresolved.

## Key Unknowns

- Exact root cause of the missing `searchByText` function reference.
- Whether the issue is caused by component exposure, lifecycle timing, wrapper integration, or incorrect ref usage.

## Areas Requiring Repository Inspection

- `DpiaRopaAssessmentList.vue`
- `DpiaRopaOccurProbabOverviewWrapper.vue`
- `DpiaRiskAssessmentContainer.vue`
- `SearchAndFilter.vue`
- Shared Risk Assessment list/filter infrastructure.
- Component refs and exposed methods.

## Areas That Should Not Be Changed Unless Necessary

- Risk calculation logic.
- BIA functionality.
- DPIA workflow behavior.
- Existing Probability of Occurrence business rules.
- UI design and layout.
