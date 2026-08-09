---
Name: V3 Configuration Schema and Validation Contract
Type: Architecture Specification
Subject: Machine-Readable Validation for Runtime, STP, and Capability Configuration
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; Step 02 policy contract; Step 03 provenance contract; Step 04 concurrency contract; Step 05 Golden Evaluation contract; Step 06 verification contract; Step 07 risk/capability contract; Step 08 runtime configuration contract
---

# V3 Configuration Schema and Validation Contract

## Purpose and Non-Goals

Future V3 configuration must be deterministic, machine-readable, strict where
safety matters, helpful to developers, and compatible only where translation is
explicitly defined.

This contract defines three schema targets and validation stages. It does not
create JSON Schemas, parse YAML, implement a validator, or modify configuration.

## Configuration Document Types

| Document type | Canonical path | Purpose | Inheritance |
|---|---|---|---|
| repository_runtime_config | docs/ai/config/runtime_config.yaml | Repository-wide preferences | Profile/system defaults |
| capability_registry | docs/ai/config/capabilities.yaml | Provider declarations | No STP inheritance |
| stp_config | docs/ai/pbi/STP-XXXX/config.yaml | Task-specific permitted overrides | Repository effective preferences |

They share versioning and bounded value conventions but have distinct allowed
keys, owners, and forbidden fields.

## Runtime Config Schema Boundary

Allowed root sections:

| Section | Type | Required | Default source | STP override | Safety relevance |
|---|---|---:|---|---:|---|
| version | integer | Yes | None | No | High |
| profile | enum | No | standard | Yes | Medium |
| experience | object | No | system/profile | No | Low |
| workflow | object | No | profile | Limited strengthening | High |
| risk | object | No | profile/system | Limited | High |
| decision_policy | object | No | policy | No weakening | Critical |
| security | object | No | mandatory baseline/profile | Limited preferences | Critical |
| human_in_loop | object | No | risk-based | Preference only | Critical |
| learning | object | No | profile | Yes | Low |
| localization | object | No | repository/system | Yes | Low |
| quality | object | No | profile/policy | Strengthening | High |
| capabilities | object | No | registry/profile | Preferences only | High |
| observability | object | No | V2-compatible defaults | Yes within policy | Medium |
| context | object | No | V2-compatible defaults | Yes within policy | High |
| terminal | object | No | V2-compatible defaults | Yes | Low |
| research | object | No | profile | Yes within policy | Medium |

Mandatory governance, current runtime state, pending decisions, selected
providers, verification status, and publication authorization are forbidden.

## STP Config Schema Boundary

The STP schema is an explicit allowlist:

- version;
- profile;
- workflow strengthening: planning, design_review,
  independent_review, security_review;
- risk posture and targeted clarification preference;
- research mode;
- learning mode and artifact language;
- localization artifact mappings;
- human-in-loop recommendation/interaction preferences;
- quality strengthening;
- preferred and fallback providers by capability;
- permitted context/terminal presentation preferences.

Forbidden STP fields include mandatory policy, decision precedence, publication
authorization, security prohibitions, review source-write protection, mandatory
verification removal, forbidden actions, repo-context ownership, provider
authority, and runtime state.

The STP schema must not be implemented as “repository schema minus fields”; it
must remain an explicit safe allowlist.

## Capability Registry Schema

Future capability registry:

docs/ai/config/capabilities.yaml

Root shape:

~~~yaml
version: 3
capabilities:
  test:
    providers:
      - provider_type: local_tool
        identifier: repository_tests
        availability: configured
        authority: repository
        deterministic: true
        command_or_tool_reference: test-command
        network_requirement: none
~~~

Required provider concepts are provider_type, identifier, availability,
authority, and deterministic. Command/tool references and network requirements
are conditional. Secrets and credentials are forbidden.

## Enum Strategy

Operational behavior uses bounded enums:

- profile: fast, standard, critical;
- workflow.planning: auto, required, skip_when_low_risk;
- workflow.design_review: risk_based, required, disabled_when_permitted;
- workflow.independent_review: risk_based, required, strict;
- workflow.security_review: risk_based, required;
- research.mode: off, when_material, required_for_currentness;
- learning.mode: off, important_only, detailed;
- human_in_loop.strategy: risk_based, explicit_only, recommend_then_ask;
- context.mode: conservative, balanced, deep;
- context.repo_context: never, on_demand, when_skill_requires;
- context.source_reading: exact_only, targeted, expanded_when_needed;
- security.profile: strict, standard;
- provider_type: agent, local_tool, external_tool, human, hybrid;
- availability: configured, detected, unavailable, unknown;
- language: ISO 639-1 code.

Unknown enum values are errors, not ignored strings.

## Language Validation

Use ISO 639-1 two-letter lowercase codes such as fa, en, and de. Do not
maintain a large custom language registry.

Invalid codes are errors. Well-formed but unsupported languages produce a
warning or documented artifact fallback. Missing language inherits the
repository default or artifact default. STP artifact overrides are validated
independently.

## Unknown Key Policy

Safety-relevant schema areas use additionalProperties: false. Unknown root,
nested, STP, or provider keys produce CFG_UNKNOWN_KEY; typo-like keys are
errors rather than silently ignored.

Purely informational extension namespaces may be permitted only when explicitly
declared and cannot influence runtime permissions or safety.

## Deprecated Key Strategy

Each deprecated key has:

- replacement;
- since version;
- removal condition;
- semantic-change flag.

Renamed keys with identical semantics may translate with warning. Changed
semantics require manual_migration_required. A deprecated key without a defined
mapping is invalid.

## Config Version Compatibility

Supported versions:

- version 3: native V3;
- version 1: compatibility translation only for known V2 fields;
- missing version: invalid;
- unsupported older version: manual migration or invalid;
- future version: unsupported and blocked from affecting runtime.

Translation results are:

translated, translated_with_warning, manual_migration_required, or invalid.
Unknown V1 values are never guessed.

## Legacy Filename Resolution

Only legacy runtime-config.yaml:

Compatibility mode with translation warning.

Only canonical runtime_config.yaml:

Canonical V3 mode.

Both files:

invalid_config; never merge or choose by timestamp/order.

Neither:

Use profile/system defaults.

## Preset/Profile Migration

V2 presets are not assumed to be one-to-one:

| V2 preset | V3 treatment |
|---|---|
| runtime-config.low_cost.yaml | translated_with_warning to fast; observability differences reported |
| runtime-config.balanced.yaml | translated_with_warning to standard; review semantics checked |
| runtime-config.deep_review.yaml | manual_migration_required or critical with warning; deep review is not identical to critical risk |

Preset files are not modified in this phase.

## Validation Severity Model

| Severity | Meaning |
|---|---|
| info | Informational migration or trace detail |
| warning | Safe translation or deprecated behavior with visible limitation |
| error | Configuration cannot be trusted for the affected document/section |
| blocking | Mandatory policy, security, authority, or required-capability violation |

The validator must not collapse errors and blocking findings into generic prose.

## Validation Result Contract

~~~yaml
status: invalid_config
document_type: stp_config
errors:
  - code: CFG_UNKNOWN_KEY
    path: human_in_lop
    message: unknown key
    suggestion: human_in_loop
warnings:
  - code: COMPAT_TRANSLATED_WITH_WARNING
    path: version
    message: V2 settings were translated
    suggestion: migrate to version 3
trace:
  source_layers: [system, profile, repository, stp]
  rejected_overrides: []
~~~

Every finding supports machine decision, path/location, reason, human-readable
message, and suggested remediation. Warnings must not hide errors.

## Error Code Strategy

Use stable families with a small extensible set:

- CFG_ for syntax, schema, key, type, and value errors;
- STP_ for task-overlay boundary violations;
- CAP_ for capability/provider declaration problems;
- LANG_ for artifact language errors;
- COMPAT_ for versions, deprecated keys, and filename migration;
- POLICY_ for policy-aware conflicts or forbidden weakening.

Examples include CFG_UNKNOWN_KEY, CFG_INVALID_VALUE, STP_FORBIDDEN_OVERRIDE,
CAP_DUPLICATE_ID, CAP_MISSING_FIELD, LANG_INVALID, COMPAT_UNSUPPORTED_VERSION,
and POLICY_WEAKENING.

## Schema vs Policy Validation

Validation has two ordered stages:

1. schema validation: syntax, document type, root shape, keys, types, enums,
   and local references;
2. policy-aware validation: precedence, mandatory constraints, ownership,
   security, required capability, and cross-document consistency.

Schema-valid profile critical is not automatically policy-valid if an STP
override attempts to weaken a mandatory control. Policy validation does not
execute workflows or resolve current runtime state.

## Cross-File Validation

Cross-file validation may compare runtime_config.yaml, capabilities.yaml, and
STP/config.yaml for:

- preferred provider existence;
- configured security scanner availability state;
- STP provider references;
- profile capability requirements;
- artifact language support;
- registry version compatibility;
- legacy filename conflicts.

It reports references and constraints; it does not select current providers or
execute commands.

## Provider Validation

Provider declarations must have unique identifiers, known provider types,
declared authority, valid availability state, determinism, and required
references.

Schema validation checks declaration shape only. Availability verification and
capability sufficiency belong to Step 07 resolution or future doctor. Provider
commands are never executed during schema parsing.

## Command Safety

A command/tool reference is a declaration, not execution authorization. It must
not contain arbitrary secret interpolation, shell-control payloads, or
undeclared credential references.

Execution remains governed by Step 02 policy, Step 07 provider selection, and
tool permissions. Registry presence never grants permission.

## Secret Safety

Inline secrets, credentials, tokens, private keys, and password values are
forbidden in all configuration and capability files.

Indirect environment/reference identifiers may be permitted only when policy
allows them and the value itself remains outside the file. This contract does
not implement secret scanning.

## Defaulting Rules

Safe preferences may inherit defaults:

- profile defaults;
- context posture;
- terminal summaries;
- learning mode;
- artifact language;
- optional research mode.

Security-sensitive ambiguity does not receive permissive defaults. Missing
required capability, authority, approval, or security evidence is invalid or
blocked according to policy.

## Effective Config Traceability

Validation preserves enough metadata for future doctor/explain-config:

- effective value;
- source layer;
- inherited default/profile;
- accepted override;
- rejected override and reason;
- warning/error code.

This trace is compact and is not runtime state.

## Future Schema File Layout

Recommended future layout:

~~~text
docs/ai/config/schema/
  runtime_config.schema.json
  stp_config.schema.json
  capabilities.schema.json
~~~

schema is clearer than schemas because it is one conceptual area containing
three documents. Numeric prefixes are unnecessary because no read order is
semantic.

## JSON Schema Recommendation

Use JSON Schema Draft 2020-12 for future schemas. It provides stable object
composition, reusable definitions, conditional constraints, and strict
additionalProperties behavior supported by modern validators.

The repository should use a small validator with pinned draft support. No
experimental draft or external framework is required at this stage.

## Human-Friendly Error Contract

Errors must include path, actual value, expected values/shape, stable code,
concise explanation, suggestion, and policy explanation when relevant.

Example:

~~~text
Unknown setting: workflow.independant_review
Did you mean: workflow.independent_review?
Code: CFG_UNKNOWN_KEY
~~~

Technical validator details may be retained as references, not copied into
normal developer output.

## Doctor Integration

Future /doctor separates:

- syntax;
- schema;
- compatibility;
- policy conflict;
- provider reference;
- provider availability;
- capability requirement;
- localization;
- legacy filename conflict.

It reports remediation and does not apply repairs automatically.

## Scenario Evaluation

| Scenario | Document/stage | Expected status | Code/result | Runtime allowed? |
|---|---|---|---|---|
| Valid minimal runtime config | runtime/schema | valid | None | Yes |
| Valid advanced runtime config | runtime/schema + policy | valid | None | Yes |
| Missing config | resolution | defaults | INFO_DEFAULTS | Yes |
| Invalid YAML | syntax | error | CFG_SYNTAX | No |
| Unknown root key | schema | error | CFG_UNKNOWN_KEY | No |
| Nested typo | schema | error | CFG_UNKNOWN_KEY | No |
| Invalid enum | schema | error | CFG_INVALID_VALUE | No |
| Missing version | schema | error | CFG_MISSING_VERSION | No |
| Unsupported future version | compatibility | blocking | COMPAT_UNSUPPORTED_VERSION | No |
| V2 version compatibility | compatibility | warning/translated | COMPAT_TRANSLATED_WITH_WARNING | Yes with warning |
| Both filenames present | filename | blocking | COMPAT_DUAL_FILENAME | No |
| Valid STP strengthening | STP + policy | valid | None | Yes |
| STP security weakening | policy | blocking | POLICY_WEAKENING | No |
| STP unknown field | STP/schema | error | STP_UNKNOWN_KEY | No |
| Valid capability registry | capability/schema | valid | None | Yes |
| Duplicate provider ID | capability/schema | error | CAP_DUPLICATE_ID | No |
| Provider missing field | capability/schema | error | CAP_MISSING_FIELD | No |
| Inline provider secret | capability/security | blocking | CAP_INLINE_SECRET | No |
| Unknown preferred provider | cross-file | error/blocking | CAP_UNKNOWN_REFERENCE | No |
| Invalid language | language | error | LANG_INVALID | No |
| Deprecated safely mapped key | compatibility | warning | COMPAT_DEPRECATED_MAPPED | Yes |
| Deprecated changed semantics | compatibility | error | COMPAT_MANUAL_MIGRATION | No |
| Missing optional capability | cross-file | warning | CAP_OPTIONAL_UNAVAILABLE | Yes |
| Missing required security capability | policy/capability | blocking | CAP_REQUIRED_MISSING | No |
| Profile/repository conflict | policy-aware | error/blocking | POLICY_CONFLICT | No |

These scenarios become Golden Evaluation candidates; this contract does not
execute validation.

## Developer Experience Assessment

The normal configuration remains:

~~~yaml
version: 3
profile: standard
security:
  profile: strict
learning:
  mode: important_only
localization:
  interaction_language: fa
~~~

Developers should not need to understand schemas, validators, provider
authority, or precedence internals.

## Migration Strategy

1. Finalize schema contract.
2. Create actual machine-readable schemas.
3. Add YAML parsing.
4. Add local schema validation.
5. Add V2 compatibility translation.
6. Add policy-aware validation.
7. Add cross-file validation.
8. Integrate with doctor and Golden Evaluation.

No implementation stage is executed here.

## Migration Constraints

This is a non-runtime V3 architecture specification. It does not create schema
files, config files, STP files, registries, parsers, validators, doctor,
resolvers, or changes to prior contracts, skills, adapters, routes,
repo-context, or application source.
