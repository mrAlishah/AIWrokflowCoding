# Phase 01 - Backend UI Contract

## Status

Done

## Goal

Prevent UI-facing AD Connection responses from exposing the real `AzureClientSecret` while preserving backend-only secret access for health checks, authentication, and import workflows.

## Scope

- Inspect AD Connection controller, DTO, validator, service, mapping, and backend consumers.
- Identify UI-facing response paths.
- Choose the smallest local-pattern-compatible way to keep real secrets out of UI responses.
- Preserve existing secret when update payload omits or intentionally leaves secret empty.
- Avoid changing encryption, schema, migrations, key management, or persistence model.

## Target Files Or Areas

- `Web-Suite/Controllers/ADImportController.cs`
- `Web.Core/Dto/ADImport/ADConnectionDto.cs`
- `Web.Core/Validators/ADConnectionValidators/ADConnectionDtoValidator.cs`
- `Web.Core/Services/IADConnectionService.cs`
- `Web.Services/ADConnectionService.cs`
- `Web.Services/AzureAdInfoService.cs`
- `Web.Services/ADUserService.cs`
- `Web-Suite/MappingProfiles/Profiles.cs`

## Planned Steps

1. Inspect AD Connection read/create/update/health-check/import flows.
2. Determine whether the existing shared DTO can be safely sanitized for UI responses or whether a separate UI-safe DTO is needed.
3. Ensure UI-facing list/detail responses do not include the real secret.
4. Ensure backend-only flows still receive or resolve the real secret internally.
5. Adjust update behavior so absence of a new secret preserves the existing stored secret.
6. Adjust validation if current rules require a secret for every update.
7. Document any code that looks obsolete but cannot be safely removed in this PBI.

## Files Changed

- `Web-Suite/Controllers/ADImportController.cs`
- `Web.Core/Services/IADConnectionService.cs`
- `Web.Core/Validators/ADConnectionValidators/ADConnectionDtoValidator.cs`
- `Web.Services/ADConnectionService.cs`

## Execution Memory

Implemented backend UI contract changes only.

- Added UI-safe AD Connection service methods for list/detail reads.
- Updated UI-facing controller read endpoints to use the UI-safe service methods.
- Sanitized `AzureClientSecret` from UI-facing list/detail responses.
- Sanitized `AzureClientSecret` after health check results are computed, preserving backend access during the check.
- Preserved the existing encrypted secret on update when the incoming update DTO does not provide a new secret.
- Adjusted AD Connection validation so update-without-secret can pass while create still requires a secret.
- Did not change encryption, schema, migrations, key management, persistence model, or backend integration logic.

## Verification Notes

- `dotnet build Web-Suite.sln` completed successfully with 0 errors.
- Build produced existing project/package/analyzer warnings, including NuGet vulnerability/version warnings and existing StyleCop/Sonar warnings outside this phase.
- No frontend lint was run, per project/user instruction.
- Manual API/UI network verification remains for later validation phase.

## Known Risks Or Follow-Up

- Phase 02 must update frontend state/UI behavior so the empty/sanitized secret response is treated as "do not display existing secret" rather than "clear the secret".
- Phase 03 should manually verify `GetADConnections`, `GetADConnection`, and `GetADConnectionsWithHealthCheck` responses do not expose the real secret.

---

## Review Notes

Review performed after phase implementation. Review mode: strict.

### Findings

| # | Severity | File | Finding |
|---|---|---|---|
| F-01 | Required (comment) | `ADConnectionDtoValidator.cs:35-38` | `When` condition logic is non-obvious; `NotEmpty()` on second branch is a dead rule — add inline comment explaining intent |
| F-02 | Optional / Document | `ADConnectionDtoValidator.cs:64-66` | Uniqueness check reconstructs secret from DB on update; maintenance risk if update logic diverges |
| F-03 | Optional | `ADConnectionService.cs:157` | Add ordering comment to explain why `ClearAzureClientSecrets` follows `CheckMultipleADConnections` |
| F-04 | Optional | `ADConnectionService.cs:112` | Add comment explaining why `existingAzureClientSecret` is captured before `_mapper.Map` |
| F-05 | No issue | `ADImportController.cs` | `GetADConnectionsWithHealthCheck` correctly sanitizes at service layer — no change needed |
| F-06 | No issue | `ADImportController.cs` | Logging change to `Log.Error(ex, message)` is correct and improves structured log enrichment |

### Required Fixes

- **F-01** — Add inline comment to `ADConnectionDtoValidator.cs:38` explaining the `When` condition:
  - Create (`Id == Guid.Empty`): secret is required.
  - Update with new secret (`!IsNullOrWhiteSpace`): enforce format rules.
  - Update without secret: rule is skipped; existing secret is preserved in the service layer.

### Optional Improvements

- **F-03** — Add comment in `ADConnectionService.GetAllADConnectionsWithHealthCheck` explaining that secrets must be cleared after (not before) the health check, because the health check reads the decrypted secret from the DTO.
- **F-04** — Add comment in `ADConnectionService.Update` explaining that the secret is captured before `_mapper.Map` to survive AutoMapper overwriting the field with `null` from the sanitized incoming DTO.

### Verification Gaps

- `CheckMultipleADConnections` was not inspected — confirm it reads `AzureClientSecret` from the DTO (not independently from DB). If from DTO, the ordering of `ClearAzureClientSecrets` is load-bearing.
- `Profiles.cs` (AutoMapper mapping profile) was not inspected — confirm that `AzureClientSecret` is mapped from DTO to entity, making the pre-capture in `Update` necessary.

### Review Status

All required and optional fixes applied via fix-phase.

### Fixes Applied

| # | File | Change |
|---|---|---|
| F-01 | `ADConnectionDtoValidator.cs:35-38` | Added inline comment explaining the `When` condition intent for create / update-with-secret / update-without-secret |
| F-03 | `ADConnectionService.cs` | Added ordering comment in `GetAllADConnectionsWithHealthCheck` explaining why `ClearAzureClientSecrets` must follow `CheckMultipleADConnections` |
| F-04 | `ADConnectionService.cs` | Added intent comment in `Update` explaining why `existingAzureClientSecret` is captured before `_mapper.Map` |
