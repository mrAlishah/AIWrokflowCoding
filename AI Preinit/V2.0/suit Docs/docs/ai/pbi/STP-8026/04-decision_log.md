# STP-8026 Decision Log

## Decisions

### 2026-06-05 - Use Backend Enrichment With A Dedicated Read DTO

Decision:

Use backend enrichment for `GetCatalogsInScope` by introducing a dedicated read-only catalog DTO carrying the selected catalog's maturity model levels.

Rationale:

- The Relation dialog already expects maturity levels on the selected catalog.
- Element maturity IDs are already provided by `FetchCatalogElementsForTreeView`.
- Existing CRUD DTOs are not suitable for this read-only display use case.
- A dedicated read DTO avoids changing scope create/update and catalog edit contracts.
- A lean repository query can reduce unnecessary payload compared with the current broad include path.

Constraints:

- Do not modify `CatalogIdNameMaturityDto`, `CatalogEditDto`, `CatalogScopeOverviewDto`, `ScopeCreateDto`, or `ScopeOverviewDto`.
- Do not copy Requirements maturity editing behavior into the Relation dialog.
- Do not change maturity calculation logic.
