# Diff Analysis: STP-7471

## Skill

Use skill: `review-diff-analysis`

## Parameters

- Review id: STP-7471
- Base branch: develop
- Head branch: task/STP-7471/audit-program-fe-tabs-relations
- Review scope: frontend-only
- Risk mode: normal
- Diff source: `git diff develop...HEAD`

## Diff Summary

- Local diff available.
- Total diff: 79 files changed, 12497 insertions, 78 deletions.
- Frontend files reviewed in scope:
  - `Web-Suite/clientapp/src/Composables/AuditComposable.js`
  - `Web-Suite/clientapp/src/components/AuditManagement/AuditManagementOverview.vue`
  - `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditDocument.vue`
  - `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditProgramEditor.vue`
  - `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditProperties.vue`
  - `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditRelation.vue`
  - `Web-Suite/clientapp/src/components/Role/Create/SelectPermissions.vue`
  - `Web-Suite/clientapp/src/language/translations/de.json`
  - `Web-Suite/clientapp/src/language/translations/en.json`
  - `Web-Suite/clientapp/src/router.js`
  - `Web-Suite/clientapp/src/services/audit-service.js`
  - `Web-Suite/clientapp/src/shared/components/DocumentList.scss`
  - `Web-Suite/clientapp/src/store/stores/audit.js`
  - `Web-Suite/clientapp/src/views/AuditManagement/AuditManagementOverview.vue`

## Out-of-Scope Files Not Reviewed

Backend controllers, services, repositories, DTOs, models, migrations, and EF context changes were present in the diff but not reviewed in detail because `REVIEW_SCOPE` is `frontend-only`.

## Findings

### P1 - Audit overview always shows dummy data instead of API data

- File: `Web-Suite/clientapp/src/store/stores/audit.js`
- Lines: 109-114
- Impact: `fetchAuditPrograms` calls `AuditService.getAllAuditPrograms()` but discards the response and updates the grid with `DUMMY_AUDIT_PROGRAMS`. If the API succeeds, users still see static placeholder audits. If the API fails, the error is hidden and the same dummy data is displayed. This makes the overview behavior incorrect for production data.

### P1 - Audit relation editor uses a missing owner target type

- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditRelation.vue`
- Lines: 53, 202-203
- Related file: `Web-Suite/clientapp/src/Composables/RelationComposable.js`
- Impact: The new component passes `relationTargetType.securityIncident`, but `RelationComposable` only exposes asset, action, catalogElement, riskSphereApproval, and ropa. The value passed to `RelationEditor` is therefore `undefined`, and case 6 also assigns `undefined`. New audit relations cannot be reliably created with the correct owner/target type.

### P1 - Documents tab is not connected to the catalog element source described by the PR

- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditProgramEditor.vue`
- Lines: 36, 59-61
- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditDocument.vue`
- Lines: 50, 170-171
- Impact: The PR description says documents already added for the catalog element in step 1 should be displayed in the documents tab. The catalog element tab is still a placeholder, and the documents tab only renders `auditProgramToEdit.documents`; there is no logic to seed or synchronize documents from selected catalog elements. The implemented tab can add/remove local documents, but it does not satisfy the described source behavior.

### P2 - Audit status icons are mapped to the wrong status values

- File: `Web-Suite/clientapp/src/Composables/AuditComposable.js`
- Lines: 11-12, 36-46, 60-66
- Impact: `auditStatus` maps `started` to 1 and `notStarted` to 2, while `getAuditStatuses()` labels key 1 as not started and key 2 as started. The overview label can say "Not started" while the icon path treats the same status as started, and vice versa.

### P2 - Added audit relation translations are not used by the relation tab

- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditRelation.vue`
- Lines: 137-149
- Related files:
  - `Web-Suite/clientapp/src/language/translations/en.json`
  - `Web-Suite/clientapp/src/language/translations/de.json`
- Impact: The diff adds `l_audit.relation.*` translation keys in both languages, but `AuditRelation.vue` still builds its remove dialog text from `l_riskManagement.riskSphere.relation.*`. The audit relation tab can therefore show risk-sphere wording while the intended audit translations remain unused.

## Translation Diff Check

- Changed translation keys found in diff: 32
- Keys present in both `en.json` and `de.json`: 32
- Missing from either language file: 0
- Changed keys without direct frontend code references outside translation files:
  - `l_audit.document.removeMultipleBannerTitle`
  - `l_audit.relation.removeBannerTitle`
  - `l_audit.relation.removeDialogDescription`
  - `l_audit.relation.removeMultipleBannerTitle`
  - `l_audit.relation.removeMultipleDialogDescription`
  - `l_audit.relation.removeMultipleDialogTitle`
  - `l_relation.targetTypePlural.audit`
  - `l_relation.targetTypeSingular.audit`
- Review note: the unused `l_relation.*.audit` keys align with the existing `PR-002` finding that the audit relation target type is not wired into `RelationComposable`.

## Code Policy Checks

- CP-001: No frontend `var` usage found in the reviewed frontend diff.
- CP-002: No avoidable identifier rename finding raised in the reviewed frontend diff.

## Test and Validation Gaps

- No lint or eslint was run per user instruction.
- No automated tests were run; review used local diff inspection only.
- Frontend behavior should be verified manually after fixes for:
  - real audit overview API data
  - relation creation in audit editor
  - catalog element documents appearing in the documents tab
  - status icon/label alignment
  - audit-specific relation remove dialog translations

## Status

Diff analysis complete.

## Recommended Next Skill

`review-comments-create`
