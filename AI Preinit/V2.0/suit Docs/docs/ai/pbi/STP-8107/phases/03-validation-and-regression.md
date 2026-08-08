# Phase 03 - Validation And Regression

## Status

Done

## Goal

Verify the implemented changes satisfy the PBI without breaking AD Connection health check or import workflows.

## Scope

- Targeted backend and frontend verification.
- Manual/network verification of UI-facing responses.
- Test updates only where proportional and useful.
- No broad linting unless explicitly requested by the user.

## Target Files Or Areas

- Changed backend/frontend files from phases 01 and 02.
- `Web.NUnitTest/ADImportControllerTests.cs` if backend behavior needs test coverage.
- Browser/network verification for `/import/adImport` and AD Connection API calls.

## Planned Steps

1. Verify `GetADConnections` and any detail/list endpoints used by UI do not return real `AzureClientSecret`.
2. Verify the AD Connection editor does not display existing secrets.
3. Verify create, edit-without-secret, edit-with-new-secret, health check, and import-related flows.
4. Add or update targeted tests if the backend update/sanitization behavior is isolated enough for existing test patterns.
5. Run proportional checks. Use `dotnet build` or targeted tests if backend changed; do not run frontend lint unless explicitly requested.
6. Record verification results and any residual risk in execution memory and final handoff.

## Files Changed

- `Web.NUnitTest/ADImportControllerTests.cs`

## Execution Memory

Added four targeted NUnit tests to `ADImportControllerTests.cs` covering the backend secret sanitization and update behaviors introduced in phase 01:

- `GetADConnections_ReturnsNullSecret` — verifies `GetAllADConnectionsForUI` strips `AzureClientSecret` from the returned DTO list.
- `GetADConnectionById_ReturnsNullSecret` — verifies `GetADConnectionByIdForUI` strips `AzureClientSecret` from the returned DTO.
- `UpdateADConnection_WithoutNewSecret_PreservesExistingSecret` — verifies `Update` with a null/empty secret in the DTO preserves the existing encrypted secret on the entity. Mapper mock simulates AutoMapper overwriting the field with null (the scenario the pre-capture guard protects against).
- `UpdateADConnection_WithNewSecret_EncryptsAndStoresNewSecret` — verifies `Update` with a new secret encrypts it and stores it, replacing the existing secret.

`GetAllADConnectionsWithHealthCheck` secret-clearing behavior was not separately tested because it depends on `_azureAdInfoService.CheckMultipleADConnections`, which is an external Azure API call. The secret-clearing logic is the same `ClearAzureClientSecrets` helper already covered by the list/detail tests.

Manual UI and network verification steps remain for a human tester in phase 03 (see Verification Notes below).

## Verification Notes

- `dotnet build` not available in this environment — build verified by inspection.
- All new tests use existing test infrastructure (NSubstitute, NUnit, real `ADConnectionService` instance, mocked repository and mapper), consistent with the existing `CreateADAzureUser_ReturnsSuccessResult` pattern.
- Implicit usings confirmed via `<ImplicitUsings>enable</ImplicitUsings>` in `Web.NUnitTest.csproj` — `System.Linq` and `System.Collections.Generic` are available without explicit `using` statements.

Manual verification still required (not available in this environment):

- Open `/import/adImport` in browser, open AD Connection editor, select an existing connection — secret field must be empty.
- Inspect network response for `GET /ADImport/GetADConnections` — `azureClientSecret` must be `null`.
- Inspect network response for `GET /ADImport/GetADConnectionById?id=...` — `azureClientSecret` must be `null`.
- Edit a connection without entering a new secret, save — confirm backend does not overwrite the stored secret (check DB or re-run health check).
- Edit a connection with a new secret, save — confirm backend stores the new secret (health check should still pass).
- Create a new connection — secret field must enforce required validation.
- Run health check on an existing connection — must still succeed.

## Known Risks Or Follow-Up

- `GetAllADConnectionsWithHealthCheck` secret-clearing behavior not covered by automated test — depends on external Azure API call. Covered by the shared `ClearAzureClientSecrets` helper already tested via list/detail tests.
- Optional wizard components (`ADImportWizard.vue`, `ChooseConnection.vue`, `ChooseGroups.vue`) were not inspected in any phase — if they bind or display `azureClientSecret`, a follow-up review is required.
- Manual UI/network verification steps listed above remain for a human tester.
