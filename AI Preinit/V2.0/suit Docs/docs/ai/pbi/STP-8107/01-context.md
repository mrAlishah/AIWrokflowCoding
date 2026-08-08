# STP-8107 Context

## Repo Context Summary

This PBI is a narrow cross-layer AD Import/UI security change.

Relevant repository boundaries from repo-context:

- `Web-Suite` owns API controllers, startup/DI, mapping profiles, and SPA hosting.
- `Web-Suite/clientapp` owns the Vue 3 frontend, including views/components, service wrappers, Pinia stores, routing, and translations.
- `Web.Core` owns shared contracts, DTOs, validators, models, interfaces, and migrations.
- `Web.Services` owns application/business services and backend integration behavior.
- `Web.Data` owns repository implementations.

Frontend feature work usually follows this path:

```text
route -> view/component -> service wrapper -> Pinia store -> translations if needed
```

Backend feature work usually follows this path:

```text
controller -> DTO/interface/model/validator -> service -> repository if needed
```

No source files were inspected during planning because the approved PBI and repo-context provide enough information for a scoped implementation plan. Exact source behavior must be confirmed during `implementation-phase` before code edits.

## Task Context

The approved PBI is limited to preventing the real `AzureClientSecret` from being exposed through UI-facing AD Connection flows.

Current problematic flow from the approved PBI:

```text
API response -> Store -> ADConnectionEditor.vue -> v-model azureClientSecret
```

The implementation must keep backend-only secret usage intact for authentication, health checks, and import processes. It must also preserve existing secrets when editing non-secret AD Connection fields without providing a replacement secret.

## Constraints

- Do not change existing encryption implementation.
- Do not change key management.
- Do not change database schema or migrations.
- Do not migrate existing data.
- Do not implement Azure Key Vault, Managed Identity, or secret rotation.
- Do not remove backend code unless dependencies are fully verified.
- Potentially unused secret-related code should be documented for future cleanup, not deleted.
- Do not run `npm run lint` or `npx eslint` unless explicitly requested by the user.
- Follow existing project naming, vertical slice boundaries, and local implementation patterns.

## Risks

- Update flow may clear or overwrite the existing stored secret when no new secret is provided.
- Sanitizing API responses may break UI behavior if the edit form assumes a secret value is always present.
- Shared DTOs may be used by both UI and backend/internal workflows.
- Health check and import workflows may require decrypted secrets and must not be changed into UI-safe flows accidentally.
- Multiple frontend paths may consume AD Connection data.

## Open Questions

- Does the UI currently use both list and detail endpoints for AD Connection editing?
- Does `GetADConnectionsWithHealthCheck` return the same DTO shape as normal list retrieval?
- Does the current validator require `AzureClientSecret` on every update, and if so, how should update-without-secret be represented?
- Is a masked placeholder needed in UI text, or is an empty reset field sufficient under existing UX conventions?

## Source Inspection Notes

Not performed during planning. Required source inspection is deferred to `implementation-phase` and should be targeted to the files listed in `03-codebase-index.md`.
