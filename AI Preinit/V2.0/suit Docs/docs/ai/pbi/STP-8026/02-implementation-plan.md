# STP-8026 Implementation Plan

## Status

Planned

## Scope

Display view-only maturity indicators for `Ist` and `Soll` in the Measures catalog relationship dialog by enriching the catalog-in-scope response with the selected catalog's maturity model levels.

The implementation should use a dedicated read-only backend DTO and avoid changing existing catalog/scope CRUD DTOs.

## Out Of Scope

- No maturity editing in the Relation dialog.
- No dropdowns or radio controls in the Relation dialog.
- No changes to Requirements behavior.
- No changes to maturity calculation logic.
- No redesign of the dialog layout.
- No changes to `CatalogIdNameMaturityDto`, `CatalogEditDto`, `CatalogScopeOverviewDto`, `ScopeCreateDto`, or `ScopeOverviewDto` unless a later blocker proves unavoidable.

## Phases

- Backend catalog-in-scope maturity DTO and query: Planned
- Frontend Relation dialog maturity consumption: Planned
- Verification and handoff: Planned

## Verification Plan

- Build backend after DTO/interface/service/repository changes.
- Verify `/Catalog/GetCatalogsInScope` returns catalog `id`, `name`, and `maturityLevelModel.maturityLevels`.
- Verify Relation dialog shows Ist maturity indicators.
- Verify Relation dialog shows Soll maturity indicators.
- Verify Relation maturity tooltips show the expected maturity level names.
- Verify Relation maturity cells remain view-only.
- Verify filter options for current/target maturity are populated from the selected catalog's maturity levels.
- Verify search, filtering, expand/collapse, selection, and relationship assignment still work.
- Verify Scope create/update maturity model behavior is not affected.
- Verify existing catalog edit maturity model behavior is not affected.

## Handoff Expectations

- Record implemented files and functions in `03-codebase-index.md`.
- Record verification commands/results in the implementation or review phase file.
- Keep any source changes minimal and limited to planned files.
- Do not run frontend lint unless the user explicitly allows it.
