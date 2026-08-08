# English PR Comments: STP-7471

## Skill

Use skill: `review-comments-create`

## PR-Ready Comments

### PR-001

- Status: Planned
- Severity: P1
- File: `Web-Suite/clientapp/src/store/stores/audit.js`
- Lines: 109-114

The overview fetch currently ignores the API response and always writes `DUMMY_AUDIT_PROGRAMS` into the store, even when `AuditService.getAllAuditPrograms()` succeeds. That means the audit overview will show placeholder audits instead of the real backend data, and failures are hidden by the same placeholder fallback. Please store the service response on success and avoid using dummy data in production behavior.

Suggested fix summary: assign the awaited API result to the store, remove the success-path dummy update, and handle errors explicitly according to the project pattern.

### PR-002

- Status: Planned
- Severity: P1
- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditRelation.vue`
- Lines: 53, 202-203

The audit relation tab passes `relationTargetType.securityIncident`, but `RelationComposable` does not define `securityIncident` or an audit target type. This makes `owner-type` and case 6 resolve to `undefined`, so relation creation from the audit editor cannot be associated with the correct owner/target type. Please wire this tab to the actual audit relation target type and expose that type through the relation composable if needed.

Suggested fix summary: add/use the correct `relationTargetType.audit` mapping and update the owner/target branches to pass a defined value.

### PR-003

- Status: Planned
- Severity: P1
- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditProgramEditor.vue`
- Lines: 36, 59-61
- Related file: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditDocument.vue`

The documents tab does not yet implement the behavior described in the PR: showing documents already added for the catalog element in step 1. The catalog element tab is still a placeholder, and `AuditDocument` only renders `auditProgramToEdit.documents`, with no seeding or synchronization from selected catalog elements. Please connect the catalog-element selection to the documents model before treating this tab as complete.

Suggested fix summary: implement or integrate the catalog element selection source, then initialize/sync the audit document list from the selected catalog element documents while still allowing additional documents to be added.

### PR-004

- Status: Planned
- Severity: P2
- File: `Web-Suite/clientapp/src/Composables/AuditComposable.js`
- Lines: 11-12, 36-46, 60-66

The audit status enum order does not match the status item keys. `auditStatus` maps `started` to 1 and `notStarted` to 2, while `getAuditStatuses()` labels key 1 as "Not started" and key 2 as "Started". As a result, the overview can render the correct label with the wrong icon. Please align the enum order and the item keys.

Suggested fix summary: make `auditStatus` use the same numeric order as `getAuditStatuses()` or derive both labels/icons from one shared status definition.

### PR-005

- Status: Planned
- Severity: P2
- File: `Web-Suite/clientapp/src/components/AuditManagement/AuditProgramEditor/AuditRelation.vue`
- Lines: 137-149

The diff adds audit-specific relation remove dialog translations under `l_audit.relation.*`, but the audit relation tab still uses `l_riskManagement.riskSphere.relation.*` for its remove dialog text. That can show risk-sphere wording in the audit UI while the new audit translations remain unused. Please switch this component to the audit translation keys that were added for this feature.

Suggested fix summary: replace the risk-management translation keys in `removeDialogText` with the corresponding `l_audit.relation.*` keys.
