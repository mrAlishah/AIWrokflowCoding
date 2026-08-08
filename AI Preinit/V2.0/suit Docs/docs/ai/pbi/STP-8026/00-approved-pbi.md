# STP-8026 Approved PBI

## PBI ID

STP-8026

## Title

Display View-Only Maturity Indicators in Measures Catalog Relationship Dialog

## Approved Request

The Measures (Maßnahmen) module contains a catalog relationship dialog ("Beziehungen zu Katalogelementen") that allows users to link catalog elements to a measure.

The dialog contains two columns:

- Ist (Current Maturity)
- Soll (Target Maturity)

These columns are currently rendered without maturity information.

The expected behavior is to display maturity indicators in the same visual style and using the same maturity resolution logic as the Requirements catalog tree, but strictly as a view-only representation.

Reference implementation:

- `@Web-Suite/clientapp/src/components/Requirements/CatalogElementsTreeView.vue`

Expected UI behavior:

- Display maturity color indicators for Ist.
- Display maturity color indicators for Soll.
- Display hover tooltips equivalent to the Requirements implementation.
- No editing capabilities.
- No dropdowns.
- No maturity modification.
- No changes to relationship assignment workflow.

Known root cause:

`RelationAssignCatalogElementsDialog.vue` currently resolves maturity display through:

`selectedCatalog.maturityLevelModel.maturityLevels`

However, the catalog data loaded through the current `GetCatalogsInScope` path only provides `IdAndNameDto` information. The selected catalog therefore contains basic catalog information but does not provide the maturity level definitions required to resolve:

- `currentMaturityId`
- `targetMaturityId`

into displayable maturity colors and tooltip information.

As a result, even when maturity identifiers are available on catalog elements, the dialog cannot resolve them into visible maturity indicators and the cells remain empty.

## Acceptance Criteria

- Display maturity color indicators for Ist.
- Display maturity color indicators for Soll.
- Display hover tooltips equivalent to the Requirements implementation.
- Keep maturity rendering view-only.
- Do not introduce dropdowns or maturity editing.
- Do not change relationship assignment workflow.
- Verify parent and child catalog nodes display maturity consistently with the Requirements implementation.
- Verify expand/collapse behavior.
- Verify search and filtering behavior.
- Verify relationship assignment still functions correctly.
- Verify no regression in existing consumers of catalog-loading endpoints.

## Constraints

- Repository inspection must be performed before any changes.
- Determine how the Requirements implementation resolves and renders maturity information.
- Determine whether an existing DTO already provides the required maturity metadata.
- Evaluate existing DTOs first, especially `CatalogIdNameMaturityDto`.
- Reuse existing DTOs whenever possible.
- If an existing DTO is sufficient, use it instead of creating a new DTO.
- If existing DTOs are insufficient, create the smallest possible DTO required to support maturity rendering.
- If changing `GetCatalogsInScope` would introduce risk for existing consumers, a separate low-risk endpoint or DTO may be introduced.
- Favor the solution requiring the smallest code footprint and lowest regression risk.
- Do not redesign the dialog.
- Do not modify maturity calculation logic.
- Do not modify Requirements behavior.
- Do not introduce edit capabilities.

## Source Context

### Business Context

- Users need visibility of maturity status while selecting catalog elements for Measure relationships.
- Missing maturity indicators reduce usability and can lead to incorrect relationship selection.
- The dialog should provide the same maturity visibility already available in the Requirements module.

### Important Constraints

- Requirements implementation is the functional reference.
- Rendering must remain view-only.
- Existing relationship assignment behavior must remain unchanged.
- Existing maturity calculations must remain unchanged.
- Repository inspection is required before selecting an implementation approach.
- Existing DTOs must be evaluated before introducing new DTOs.
- Prefer the smallest possible change set.

### Risks

- `GetCatalogsInScope` currently appears to return insufficient maturity metadata.
- Existing consumers may depend on the current DTO contract.
- Multiple frontend components may share the same catalog loading path.
- Requirements and Measures may use different data-loading mechanisms.

### Assumptions

- Requirements currently displays maturity information correctly.
- Maturity identifiers already exist on catalog elements.
- Missing maturity definitions are the primary reason indicators cannot be rendered.
- Existing maturity metadata models can potentially be reused.

### Validation Focus

- Verify Ist maturity indicators are displayed.
- Verify Soll maturity indicators are displayed.
- Verify tooltip behavior matches Requirements behavior.
- Verify rendering is view-only.
- Verify parent and child catalog nodes display maturity consistently with the Requirements implementation.
- Verify expand/collapse behavior.
- Verify search and filtering behavior.
- Verify relationship assignment still functions correctly.
- Verify no regression in existing consumers of catalog-loading endpoints.

### Planning Inputs

- Primary investigation target: `@Web-Suite/clientapp/src/components/Requirements/CatalogElementsTreeView.vue`
- Primary dialog: `RelationAssignCatalogElementsDialog.vue`
- Primary backend investigation: `GetCatalogsInScope`
- Existing DTO candidate: `CatalogIdNameMaturityDto`
- Existing DTO currently suspected: `IdAndNameDto`
- Codex should prefer reuse over creation and minimal-impact solutions over broad refactoring.

## Review Before Starting

### Key Risks

- Modifying `GetCatalogsInScope` could affect existing consumers.
- Shared DTO changes may introduce regressions.
- Requirements and Measures may use different maturity resolution paths.
- Missing maturity metadata may originate from backend mapping rather than frontend rendering.

### Key Unknowns

- Whether `CatalogIdNameMaturityDto` already satisfies all dialog requirements.
- Whether maturity metadata is already available elsewhere in the API layer.
- Whether other modules consume the same endpoint and DTO contracts.
- Whether additional maturity-related models already exist that can be reused.

### Areas Requiring Repository Inspection

- `@Web-Suite/clientapp/src/components/Requirements/CatalogElementsTreeView.vue`
- `RelationAssignCatalogElementsDialog.vue`
- `GetCatalogsInScope`
- Catalog DTO definitions
- `CatalogIdNameMaturityDto`
- `IdAndNameDto`
- Maturity model definitions
- Catalog-loading services
- Tooltip rendering implementation in Requirements

### Areas That Should Not Be Changed Unless Necessary

- Requirements module behavior
- Maturity calculation logic
- Relationship assignment workflow
- Existing UI layout
- Existing catalog hierarchy behavior
- Shared DTOs used by unrelated consumers
- Existing maturity editing functionality elsewhere in the application
