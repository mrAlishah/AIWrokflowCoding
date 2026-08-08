# Domain Glossary

Stable project terms and meanings.

| Term | Meaning | Notes |
| --- | --- | --- |
| Tenant / Mandant | Customer/tenant boundary for data and permissions | Many queries must be tenant-scoped |
| Scope / Geltungsbereich | Organizational or compliance scope | Appears in asset and data-protection workflows |
| Catalog / Katalog | Control/requirements catalog content | Official and custom catalogs exist |
| Official Catalog / Offizieller Katalog | Catalog release type for centrally managed catalog content | JSON import creates official catalogs in editing status and requires privileged/super-tenant context |
| Catalog Family / Katalogfamilie | Grouping for related official catalog releases | Official catalog JSON import requires either an existing family ID or a new family name |
| Maturity Level / Reifegrad | Maturity model and grading concept | Managed through maturity-level modules |
| Asset | Infrastructure or organizational asset | Many concrete asset types have parallel backend/frontend slices |
| BIA | Business Impact Analysis | Has master data and analysis workflows |
| ROPA / VVT | Record of processing activities | Data-protection module |
| DPIA / DSFA | Data Protection Impact Assessment | Data-protection module |
| TOM | Technical and organizational measures | Data-protection/security module |
| Action / Massnahme | Task/action item with status, priority, receiver, serial scheduling | Backend class name is `Action`; often aliased to avoid `System.Action` ambiguity |
| AD Import | Active Directory user/import integration | Related minimal API is `ADInfo.API` |
| i-doit | External CMDB/integration target | Uses dedicated controller/client registration |
| Feature Package | Licensed/packaged feature area | Permission/license-sensitive |

## Naming Notes

- Preserve existing German route names and UI terms where already used.
- Preserve backend enum/key names because frontend permissions and translations depend on exact strings.
- Backend error messages often return translation keys instead of human-readable text.

