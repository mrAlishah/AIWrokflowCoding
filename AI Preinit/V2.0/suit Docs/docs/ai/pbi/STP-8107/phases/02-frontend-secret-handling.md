# Phase 02 - Frontend Secret Handling

## Status

Done

## Goal

Update the AD Connection frontend so existing secrets are not retained or displayed, while create and replacement/reset flows remain usable.

## Scope

- Inspect AD Connection editor, store, service wrapper, and any related AD Import views/components that consume AD Connection data.
- Remove real secret display/binding for existing connections.
- Keep create flow able to submit a new secret.
- Keep edit flow able to submit a replacement secret without showing the existing one.
- Avoid broad UI redesign.

## Target Files Or Areas

- `Web-Suite/clientapp/src/components/Import/ADImport/ADConnectionEditor.vue`
- `Web-Suite/clientapp/src/store/stores/adImporter.js`
- `Web-Suite/clientapp/src/services/ad-import-service.js`
- `Web-Suite/clientapp/src/views/Import/ADImport/ADImportOverview.vue`
- Optional related components only if direct AD Connection consumption is found:
  - `Web-Suite/clientapp/src/components/Import/ADImport/ADImportWizard.vue`
  - `Web-Suite/clientapp/src/components/Import/ADImport/ChooseConnection.vue`
  - `Web-Suite/clientapp/src/components/Import/ADImport/ChooseGroups.vue`

## Planned Steps

1. Inspect how selected AD Connection rows are copied into edit state.
2. Ensure existing `azureClientSecret` values from backend responses are not retained in frontend state.
3. Change edit form behavior so the secret field is empty or reset-oriented for existing records.
4. Preserve create behavior where a new secret is required/submitted.
5. Ensure update payload distinguishes "no new secret provided" from "replace with this new secret".
6. Add or reuse existing UI text only if needed; if new translation keys are required, add both English and German entries.

## Files Changed

- `Web-Suite/clientapp/src/store/stores/adImporter.js`
- `Web-Suite/clientapp/src/components/Import/ADImport/ADConnectionEditor.vue`

## Execution Memory

- Updated `UPDATE_AD_CONNECTION_TO_EDIT` in the store to clear `azureClientSecret` whenever loading an existing record (`id` is present). This prevents backend-supplied null secrets from being retained in edit state and ensures the field is always empty when selecting an existing connection.
- Added `isEditMode`, `secretFieldLabel`, and `secretFieldRules` computed properties in `ADConnectionEditor.vue` to distinguish create vs edit context.
- Changed the secret `v-text-field` to use the computed label and rules: required with `*` on create, optional with no rule on edit.
- Removed hardcoded `required` attribute from the secret field — validation is now fully driven by `secretFieldRules`.
- No new translation keys added; existing `l_import.adImport.clientSecret` key is reused.
- `ad-import-service.js` and `ADImportOverview.vue` required no changes.
- Optional wizard components (`ADImportWizard.vue`, `ChooseConnection.vue`, `ChooseGroups.vue`) were not inspected — they do not participate in the AD Connection edit flow.

## Verification Notes

- No frontend lint run, per project/user instruction.
- No build tool available in this environment; manual UI verification required in Phase 03.
- Logic verified by inspection:
  - Store strips `azureClientSecret` for any record with an `id` — null from backend is never retained.
  - Edit form secret field has no validation rule — empty value on update is valid and passes through to the backend.
  - Backend `Update` preserves the existing encrypted secret when `azureClientSecret` is null/empty in the payload (Phase 01).
  - Create form secret field retains `required` rule via computed — new connections still require a secret.

## Known Risks Or Follow-Up

- The `createADConnection` success handler calls `setADConnectionToEdit({ ...adConnectionList.value.find(a => a.id === newId) })`. After a successful create the connection is re-fetched via `refreshADConnections`. The list entry will have `azureClientSecret: null` (from the backend); the store strip in `UPDATE_AD_CONNECTION_TO_EDIT` correctly handles this.
- Optional wizard components (`ADImportWizard.vue`, `ChooseConnection.vue`, `ChooseGroups.vue`) were not inspected in this phase. If any of these components render or bind `azureClientSecret`, they require a follow-up review.
- Phase 03 must manually verify the network response and form UI to confirm secrets are not displayed.

---

## Review Notes

Review performed after phase implementation. Review mode: strict.

### Findings

| # | Severity | File | Finding |
|---|---|---|---|
| F-01 | No issue | `adImporter.js:42-44` | `clearADConnectionToEdit` correctly bypasses the strip — no defect |
| F-02 | Optional (comment) | `adImporter.js:122` | `id` guard assumes new records have absent/undefined `id`, not zero-GUID — document assumption |
| F-03 | No issue | `ADConnectionEditor.vue:288-290` | Redundant `!!(v \|\| '').trim()` follows existing repo convention — no defect |
| F-04 | Informational | `ADConnectionEditor.vue:323-328` | Pre-existing 500ms race in post-create handler — out of scope |
| F-05 | No issue | `ADConnectionEditor.vue:282` | `isEditMode` named computed is valid and readable — no defect |
| F-06 | No issue | `ADConnectionEditor.vue:178` | Direct `v-model` to store property follows existing repo convention |
| F-07 | Informational | `ADConnectionEditor.vue:412-421` | Pre-existing race on dialog open watcher — out of scope |
| F-08 | **Required** | `ADConnectionEditor.vue:177-184` | Secret input field has no `type="password"` — new secret typed on create/edit is visible in plaintext | 

### Required Fixes

- **F-08** — Add `type="password"` to the secret `v-text-field` in `ADConnectionEditor.vue`. Within PBI scope: preventing Azure client secret exposure in the UI.

### Optional Improvements

- **F-02** — Add a comment in `adImporter.js:UPDATE_AD_CONNECTION_TO_EDIT` documenting that the `id` guard assumes new records have an absent/undefined `id`, not a zero-GUID string.

### Verification Gaps

- Optional wizard components not inspected — follow-up required if they bind `azureClientSecret`.
- No runtime verification — manual UI check required in Phase 03.

### Review Status

Ignore fix for F-08 and F-02.
