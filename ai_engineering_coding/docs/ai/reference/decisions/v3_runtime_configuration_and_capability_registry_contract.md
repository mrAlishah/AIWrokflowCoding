---
Name: V3 Runtime Configuration and Capability Registry Contract
Type: Architecture Specification
Subject: Repository Runtime Configuration, STP Overlays, and Capability Providers
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; Step 02 policy contract; Step 03 provenance contract; Step 04 concurrency contract; Step 05 Golden Evaluation contract; Step 06 verification contract; Step 07 risk/capability contract; approved V3 configuration/localization/learning requirements
---

# V3 Runtime Configuration and Capability Registry Contract

## Purpose and Non-Goals

V3 separates policy, configuration, and runtime state:

- policy constrains behavior and guarantees safety;
- configuration selects permitted preferences;
- runtime state records current execution facts.

This contract specifies configuration and provider declarations only. It does
not implement parsing, schema validation, runtime state, routing, policy
resolution, localization, learning, or capability discovery.

## Configuration Layers

Configuration is resolved from lowest to highest preference:

~~~text
system defaults
-> selected profile defaults
-> repository runtime configuration
-> optional per-STP permitted overrides
~~~

Mandatory governance is not a configuration layer. After preference resolution,
Step 02 policy and workflow constraints are applied externally:

~~~text
effective preferences + mandatory policy constraints = effective configuration
~~~

The effective output preserves source layer, overrides, rejected overrides, and
warnings. A lower layer cannot weaken a higher policy constraint.

## Repository Runtime Config

The future canonical repository control plane is:

docs/ai/config/runtime_config.yaml

It owns repository-wide preferences for experience, bounded workflow behavior,
risk posture, decision preferences, security preferences, HITL preferences,
learning, localization, quality, capability preferences, observability,
context, and terminal output.

It does not own mandatory governance, policy precedence, current runtime state,
current selected provider, pending decisions, or verification status.

## Per-STP Config

The optional task overlay is:

docs/ai/pbi/STP-XXXX/config.yaml

When absent, the task inherits repository effective defaults. It may override
permitted preferences such as risk posture, review strictness, learning mode,
artifact languages, research mode, preferred provider, and workflow
strengthening.

It may not override mandatory security, publication safety, review
source-read-only restrictions, required verification, forbidden actions, policy
precedence, or repo-context ownership.

## Profiles

Use three bounded profiles:

| Profile | Purpose | Defaults |
|---|---|---|
| fast | Low-risk, small changes | Shallow planning, targeted verification, minimal learning |
| standard | Normal development | Standard planning, applicable review/checks, important learning |
| critical | High/critical work | Deep planning, strict review, strongest applicable verification, approval posture |

Profiles are defaults, not policy. Selecting fast cannot suppress a mandatory
security scan, approval, review, or verification check.

## Smart Defaults

The normal developer path should be small:

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

Unspecified settings inherit profile/repository/system defaults. Developers
should not need to understand provider names or internal policy categories.

## Versioning

version identifies the configuration schema contract, not the AI OS release.

- Supported version 3 is parsed as V3.
- Supported V2 version 1 may be compatibility-translated when read from the
  legacy filename.
- Unsupported, missing, or malformed versions produce invalid_config.
- Version migration must be explicit and report warnings; values must not be
  guessed.

## Legacy Filename Compatibility

Current V2 filename:

docs/ai/config/runtime-config.yaml

Future canonical filename:

docs/ai/config/runtime_config.yaml

During the compatibility window:

1. only legacy file: read through a V2-to-V3 compatibility mapping and warn;
2. only new file: read as canonical V3;
3. both files: return invalid_config and do not silently merge or choose one;
4. neither file: use profile/system defaults;
5. remove legacy support only after documented usage and migration exit
   criteria are satisfied.

The old and new files are never active simultaneously.

## Effective Config Resolution

Conceptually:

~~~text
system defaults
+ profile defaults
+ repository config
+ permitted STP overrides
+ mandatory policy constraints
= effective configuration
~~~

Compact output:

~~~yaml
effective:
  profile: standard
  security.profile: strict
  learning.mode: important_only
sources:
  profile: standard
  security.profile: repository
  learning.mode: stp
overrides:
  - review.strictness: stp strengthened repository value
rejected:
  - publication.mode: STP attempted to weaken mandatory approval
warnings:
  - legacy_filename
status: RESOLVED
~~~

## Conflict Rules

| Condition | Result |
|---|---|
| Unknown key | Warning for optional key; invalid_config when it affects safety or behavior |
| Invalid value/type | invalid_config |
| Deprecated key | Warning plus deterministic mapping if defined; otherwise invalid_config |
| Both config filenames | invalid_config; never merge |
| STP weakens policy | Reject override; policy remains active; blocked/approval as required |
| Unsupported provider | invalid_config or missing capability |
| Missing provider | BLOCKED when capability is required |
| Profile conflict | invalid_config; no arbitrary selection |
| Invalid language | invalid_config or documented safe artifact fallback |
| Absent STP config | Inherit repository effective defaults |

Important configuration errors are never silently ignored.

## Workflow Customization

Use bounded enums only:

~~~yaml
workflow:
  planning: auto
  design_review: risk_based
  independent_review: risk_based
  security_review: risk_based
research:
  mode: when_material
~~~

Allowed values include planning auto/required/skip_when_low_risk,
design_review risk_based/required/disabled_when_permitted,
independent_review risk_based/required/strict,
security_review risk_based/required, learning off/important_only/detailed,
and research off/when_material/required_for_currentness.

V3 does not provide a general workflow programming language.

## Feature Enablement

Configurable feature preferences may include learning, proactive advisor,
research, observability, localization, status/explain helpers, and optional
HITL behavior.

Mandatory controls are not disable-able. For example,
human_in_loop.enabled=false cannot bypass a Step 02 approval requirement;
security, review safety, publication safety, and required verification remain
active.

## Security Configuration Boundary

Config may select security profile, preferred scanners, network default
posture, dependency-review strictness, and research permissions within policy.

Config cannot disable secret-exfiltration prohibition, untrusted-content
controls, review source protection, publication authorization, or destructive
operation safeguards.

## HITL Configuration

Permitted preferences:

~~~yaml
human_in_loop:
  strategy: risk_based
  recommend_before_ask: true
  avoid_unnecessary_questions: true
  decision_artifact_language: fa
~~~

Mandatory Step 02 approval triggers override all preferences. A false or
disabled HITL preference cannot turn required approval into AUTO.

## Localization Contract

Localization is artifact-specific:

~~~yaml
localization:
  interaction_language: fa
  artifacts:
    human_decision: fa
    learning: fa
    handoff: fa
    internal_review_suggestion: fa
    implementation_plan: en
    phase: en
    pr_comment: en
    adr: en
~~~

Skills request an artifact type rather than hardcoding language. Repository
config supplies defaults; STP config may override permitted artifact languages.
Identifiers remain language-independent. Code comments may have a separate
setting only if a repository policy defines it.

## Learning Configuration

~~~yaml
learning:
  mode: important_only
  artifact_language: fa
  generate:
    architecture_decisions: true
    new_patterns: true
    important_commands: true
    debugging_notes: true
~~~

Modes are off, important_only, and detailed. Important concepts, new patterns,
architecture decisions, and knowledge debt justify artifacts; trivial changes
do not. Language follows artifact localization unless explicitly overridden.

## Context Configuration

Preserve useful V2.3 settings:

context.mode, reference_docs, repo_context, source_reading, diff_first,
prefer_existing_summaries, broad_scan, extra_file_justification, and
context_expansion_notice.

Their V3 values remain bounded enums/booleans. reference_docs=false,
broad_scan=false, diff_first=true, and targeted expansion remain safe defaults.
Some values may be derived automatically from risk and workflow; config cannot
authorize broad or unsafe reads against policy.

## Terminal Configuration

Preserve:

prefer_summary, raw_output_on_error, raw_output_when_requested, and
summarize_success_output.

These remain lightweight preferences with current V2.3 defaults: summarize
successful output, retain failure output, and honor explicit raw-output
requests. They never affect tool permission or evidence requirements.

## Observability Configuration

Keep lightweight internal metrics configurable:

~~~yaml
observability:
  enabled: true
  metrics:
    enabled: true
    workspace_records: true
    central_dashboards: true
    final_response_status: true
    tool_reports: true
    exact_token_tracking: false
    external_telemetry: false
~~~

Exact token tracking and external telemetry remain false and cannot be enabled
by ordinary config. Observability does not become a telemetry platform.

## Capability Registry

Provider declarations belong in a separate repository-local file:

docs/ai/config/capabilities.yaml

This keeps frequently adjusted provider data out of the normal runtime config,
supports machine validation, and gives capability maintenance a clear owner.
runtime_config.yaml references the registry; STP config may select preferences
but cannot redefine provider authority.

## Provider Declaration

Minimal declaration:

~~~yaml
capabilities:
  test:
    provider_type: local_tool
    identifier: repository_tests
    availability: configured
    authority: repository
    command: test-command
    deterministic: true
    network_requirement: none
~~~

Required concepts are capability, provider_type, identifier, availability,
authority, and determinism. command/tool reference and network requirement are
included when applicable. Provider internals are intentionally excluded.

## Provider Preference

Config may express preferred_provider and fallback_provider. Step 07 selection
still controls final choice.

Preferences cannot force an unavailable, unauthorized, unsafe, or inferior
provider for required deterministic evidence. A configured deterministic
provider is preferred over AI simulation.

## Agent Preferences

Model/agent names remain optional and non-canonical. Config may express
preferences such as architecture auto, implementation auto, or review
different_from_implementer, but capability and policy semantics remain
agent-neutral.

Replacing an AI model must not require rewriting repository configuration.

## Runtime State Boundary

Configuration must not contain current phase, current owner, pending decision
artifact, current risk result, verification status, or selected current
provider. These belong in future per-STP runtime state:

docs/ai/pbi/STP-XXXX/runtime_state.yaml

Runtime state is not configuration and is not a second policy source.

## Schema Strategy

Use a small machine-readable schema with deterministic validation, preferably
JSON Schema or an equivalent schema consumed by a small repository-local
validator. Keep Markdown documentation as human guidance, not the sole schema.

The validator must detect required keys, types, enum values, deprecated keys,
unknown safety-relevant keys, filename conflicts, provider declarations,
language codes, and forbidden overrides.

No schema or validator is implemented in this step.

## Doctor Contract

Future /doctor validates:

- schema and version;
- unknown, deprecated, invalid, or duplicate keys;
- legacy/new filename conflicts;
- policy conflicts and invalid STP overrides;
- provider declarations, authority, availability, and missing capabilities;
- artifact language codes;
- required capabilities for the declared profile/task;
- unsafe feature disablement.

It reports actionable findings without applying repairs automatically.

## Explain Config Contract

Use the existing explain front door with a config subject, for example
explain config, rather than adding another mandatory command.

It should show effective values, source layers, accepted overrides, rejected
overrides, active profile, security posture, learning/localization settings,
selected provider preferences, and warnings in human terms.

Example:

~~~text
Profile: standard
Risk handling: automatic
Learning: important only
Security: strict
Architecture decisions: approval when required
PR comments: English
Human decisions: Persian
~~~

## Minimal Config Example

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

This is the expected normal usage for most developers.

## Advanced Config Example

~~~yaml
version: 3
profile: standard
workflow:
  planning: auto
  design_review: risk_based
  independent_review: strict
  security_review: risk_based
risk:
  unknown_high_impact: targeted_clarification
research:
  mode: when_material
human_in_loop:
  strategy: risk_based
  recommend_before_ask: true
learning:
  mode: detailed
localization:
  interaction_language: fa
  artifacts:
    human_decision: fa
    learning: fa
    pr_comment: en
capabilities:
  registry: capabilities.yaml
  preferred:
    test: repository_tests
    security_scan: configured_scanner
observability:
  enabled: true
  metrics:
    enabled: true
    exact_token_tracking: false
    external_telemetry: false
~~~

Advanced configuration remains bounded and cannot override policy.

## STP Config Examples

No config:

~~~text
Inherit repository effective defaults.
~~~

Low-risk override:

~~~yaml
version: 3
profile: fast
learning:
  mode: off
~~~

Critical/security-sensitive override:

~~~yaml
version: 3
profile: critical
workflow:
  independent_review: strict
research:
  mode: required_for_currentness
~~~

This strengthens behavior; it cannot disable mandatory checks.

Localization override:

~~~yaml
version: 3
localization:
  artifacts:
    human_decision: fa
    pr_comment: en
~~~

An STP attempt to disable security, review source protection, publication
approval, or required verification is rejected.

## Backward Compatibility

V2 runtime-config.yaml version 1 is read through a compatibility mapping to V3
where mappings are defined. Presets map to fast/standard/critical only where
semantics are equivalent; otherwise a warning or invalid_config is emitted.

Migration warnings should identify the new filename, version, and changed
semantics. Dual-read is compatibility support, not simultaneous activation.

## Scenario Evaluation

| Scenario | Expected result |
|---|---|
| No config present | Use system/profile defaults |
| Minimal repository config | Resolve standard profile and strict security |
| Advanced repository config | Accept bounded valid preferences |
| Valid STP override | Apply permitted overlay |
| STP strengthens review | Accept stronger review |
| STP weakens security | Reject override; retain mandatory security |
| Both runtime config filenames | invalid_config; never merge |
| Unknown key | Warning unless safety-relevant, then invalid_config |
| Unsupported version | invalid_config with migration guidance |
| Learning disabled for trivial task | Accept if no mandatory learning requirement |
| Detailed learning for architecture task | Accept and generate when workflow permits |
| Human decision in Persian | Select Persian decision artifact |
| PR comment in English | Select English PR artifact |
| Capability provider unavailable | Missing capability; BLOCKED if required |
| Preferred provider unsafe | Reject preference; select safe provider or block |
| Security tool configured but missing | BLOCKED when required |
| Developer disables HITL | Mandatory approval remains active |
| Deprecated config key | Warn and map only if defined |
| Standard repository profile plus critical STP | Critical overlay strengthens behavior |
| Invalid language code | invalid_config or documented safe fallback |

These scenarios become Golden Evaluation candidates; this contract does not
execute them.

## Developer Experience Assessment

The target is profile plus a few overrides for 80–90% of developers. Routine
users need not understand policy filenames, provider internals, schema
precedence, or runtime-state structure.

Internal complexity remains in the resolver, registry, doctor, and explain
capabilities. The normal front door remains intent-driven.

## Migration Strategy

1. Finalize the configuration contract.
2. Add machine-readable schema validation.
3. Add a compatibility reader for V2 config.
4. Add effective-config resolution.
5. Add the separate capability registry.
6. Add optional STP overlays.
7. Add doctor and explain-config behavior.
8. Integrate with risk, routing, verification, and Golden Evaluation.

No stage is implemented here.

## Migration Constraints

This is a non-runtime V3 architecture specification. It does not create or
rename config files, create STP config or registries, implement schema,
doctor, resolver, localization, learning, routing, skills, repo-context, or
application changes.
