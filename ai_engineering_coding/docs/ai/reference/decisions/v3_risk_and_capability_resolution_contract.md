---
Name: V3 Risk and Capability Resolution Contract
Type: Architecture Specification
Subject: Deterministic Risk and Engineering Capability Resolution
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; Step 02 policy contract; Step 03 provenance contract; Step 04 concurrency contract; Step 05 Golden Evaluation contract; Step 06 deterministic verification contract; approved V3 autonomy and developer-experience goals
---

# V3 Risk and Capability Resolution Contract

## Purpose and Non-Goals

This contract resolves observable task risk, required engineering capabilities,
available providers, workflow requirements, verification selection, and human
decision implications.

It is a specification only. It does not implement a risk engine, capability
discovery, configuration schema, web research, policy resolver, or runtime
workflow.

## Risk Levels

| Level | Deterministic meaning | Oversight |
|---|---|---|
| LOW | Local, reversible, narrow impact; no security/data/public-contract boundary | Lightweight workflow and targeted checks |
| NORMAL | Bounded implementation with ordinary subsystem impact and recoverable failure | Standard plan, implementation, verification, and applicable review |
| HIGH | Security, public contract, cross-module, data-integrity, dependency, or material operational impact | Strengthened verification and independent review |
| CRITICAL | Irreversible/destructive, sensitive-data, production-wide, or security-critical impact with substantial blast radius | All applicable evidence, explicit approvals, rollback/data-safety evidence, independent review |

Risk is derived from impact, reversibility, blast radius, data, security,
compatibility, and operational characteristics. Unknown information is not
automatically CRITICAL.

## Risk Factors

| Factor | Trigger | Default contribution | Escalation evidence |
|---|---|---|---|
| security_boundary | Auth, trust, secret, or security-control boundary | HIGH | Security policy/tests |
| authentication | Login, identity, credential, session behavior | HIGH | Auth scenarios/security review |
| authorization | Permission or access decision | HIGH | Authorization tests/policy |
| secrets | Secret read, storage, transmission, or handling | CRITICAL | Secret/security controls |
| PII | Personal or regulated data | HIGH | Data-flow/security evidence |
| payment | Billing, money movement, financial state | HIGH | Contract/integration evidence |
| data_loss | Delete, overwrite, corruption, or irreversible transformation | CRITICAL | Preservation/rollback evidence |
| database_migration | Schema/data migration | HIGH | Migration and integration checks |
| public_api | External/public contract change | HIGH | Contract/compatibility checks |
| backward_compatibility | Existing consumer or alias impact | HIGH | Compatibility evidence |
| dependency_change | New/updated package or supply-chain input | NORMAL | Dependency/security analysis |
| network_access | External communication or remote action | HIGH | Tool/security policy |
| destructive_operation | Irreversible shell, filesystem, or repository action | CRITICAL | Explicit approval and recovery |
| production_impact | Deployment, runtime, or operational effect | HIGH | Operational/release evidence |
| concurrency | Shared Markdown or state write overlap | NORMAL | Ownership/fingerprint checks |
| cross_module_change | Multiple bounded subsystems affected | NORMAL | Architecture/review evidence |
| architecture_boundary | Layer, service, or integration boundary changes | HIGH | Architecture review |
| performance | Latency, throughput, resource, or cost budget | NORMAL | Baseline/performance check |
| scope_size | Broad file, module, or phase scope | NORMAL | Plan and diff scope |
| unknown_requirements | Material acceptance or intent ambiguity | NORMAL | Clarification/HITL |
| untrusted_input | External or untrusted instructions/data | HIGH | Provenance/AI-security controls |

The resolver records triggered factors and evidence; it does not reduce a
critical factor merely because implementation appears simple.

## Risk Resolution

Conceptually:

~~~text
intent + change_type + affected_area + risk_factors + policy
+ repository_knowledge + provenance_quality = resolved_risk
~~~

Minimum output:

~~~yaml
risk:
  level: HIGH
  factors:
    - authorization
  reasons:
    - change modifies access decisions
  evidence_quality: fresh_scoped
  escalations:
    - independent_security_review
capabilities:
  required:
    - build
    - authorization_test
    - security_review
  available:
    build: repository_tool
    authorization_test: repository_tests
    security_review: human
  selected:
    build: repository_tool
    authorization_test: repository_tests
    security_review: human
  missing: []
status: RESOLVED
~~~

Evidence quality is categorical: fresh_scoped, sufficient, limited, stale, or
unknown. It is not a meaningless numeric confidence score.

## Escalation Rules

- LOW plus destructive_operation becomes CRITICAL.
- LOW plus security_boundary, secrets, or data_loss becomes at least HIGH and
  CRITICAL where exposure or irreversibility is possible.
- NORMAL plus authentication, authorization, public_api, database_migration,
  or architecture_boundary becomes at least HIGH.
- HIGH plus possible irreversible data loss, secrets, production-wide impact,
  or unbounded blast radius becomes CRITICAL.
- Any unresolved unknown that could affect security, data integrity, public
  compatibility, or irreversible behavior escalates to HIGH and may become
  CRITICAL after targeted inspection.
- Fresh, scoped evidence can reduce uncertainty but cannot remove a triggered
  factor.

## Unknown Risk Handling

Unknown but low-impact information permits targeted inspection or a LOW/NORMAL
path when the action is reversible and bounded.

Unknown information with plausible high impact requires targeted clarification,
source inspection, or provenance verification. If meaningful uncertainty
remains, the result is APPROVAL, BLOCKED, or DENY according to Step 02 policy.
The resolver does not interrupt for every minor unknown and does not silently
assume a high-risk unknown is safe.

## Capability Taxonomy

| Capability | Meaning |
|---|---|
| architecture_analysis | Analyze boundaries, trade-offs, and design constraints |
| technical_research | Research current standards, versions, or practices when material |
| planning | Produce scoped implementation and verification plan |
| source_reading | Inspect approved source/context |
| source_editing | Modify approved source or Markdown |
| build | Build/compile/package affected code |
| test | Execute applicable tests |
| lint | Run style/convention checks |
| type_check | Run type/static type validation |
| static_analysis | Run defect/code analysis |
| security_scan | Scan security/secret/vulnerability conditions |
| dependency_analysis | Inspect package, license, and supply-chain changes |
| migration_validation | Validate forward/data/rollback migrations |
| performance_validation | Compare performance against an accepted baseline |
| diff_review | Independently inspect local changes |
| security_review | Independently assess security implications |
| documentation | Create/update approved documentation |
| learning_generation | Produce an appropriate human learning artifact |
| git_local | Inspect local Git state and diff |
| publication | Commit, push, PR, or publish when policy authorizes it |
| network_research | Use approved external research capability |

Capabilities are agent/tool neutral and are not one-to-one with commands or
specific products.

## Capability Provider Model

| Provider | Meaning | Example |
|---|---|---|
| agent | Reasoning or bounded inspection performed by the agent | Architecture analysis |
| local_tool | Repository/local deterministic tool | Build, test, lint |
| external_tool | Approved external service/tool | Security or research provider |
| human | Human decision or observation | Architecture approval |
| hybrid | Tool evidence plus agent or human interpretation | Security review |

Provider identity is configuration/runtime data, not part of capability names.

## Required vs Available Capabilities

The resolver keeps four distinct sets:

- required_capabilities: demanded by risk, change type, policy, acceptance, and
  verification contract;
- available_capabilities: providers discovered and authorized for this task;
- selected_capabilities: providers chosen by deterministic selection rules;
- missing_required_capabilities: required capabilities with no permitted provider
  or fallback.

A missing required capability never masquerades as success:

~~~yaml
required:
  - security_scan
available: {}
missing:
  - security_scan
status: BLOCKED
~~~

## Capability Discovery

Discovery uses configured and repository-known evidence:

- repository scripts and build/test configuration;
- known local commands declared by repository context;
- configured tools and tool permissions;
- available agent capabilities;
- available human decision/observation paths;
- approved external connectors.

Discovery does not scan every executable, network service, or machine-wide
resource automatically. A provider is available only when discovered,
authorized, and scoped for the task.

## Capability Selection

When multiple providers exist, select in this order:

1. deterministic and repository-compatible;
2. authorized and secure for the scope;
3. sufficient quality and evidence strength;
4. lower cost/latency when quality is equivalent;
5. stable and available.

A deterministic tool is preferred over an AI simulation of that tool. The
selected provider and rationale are recorded compactly.

## Current Best Practice Research Rules

technical_research is required or recommended when the choice is
version-sensitive, security-sensitive, based on an unknown technology,
potentially deprecated, an architecture technology decision, or affected by
current standards/regulation.

It is not required for ordinary repository-convention code or routine local
refactoring.

Current/latest is not automatically best for the repository. Recommendations
must consider compatibility, maturity, maintenance, security, migration cost,
ecosystem stability, and repository fit. Unavailable research blocks only when
currentness is material to the decision.

## Risk to Workflow Mapping

| Risk | Design/planning | Implementation | Verification | Review/HITL |
|---|---|---|---|---|
| LOW | Lightweight or inferred | Narrow scope | Targeted checks | Optional unless policy requires |
| NORMAL | Standard plan and acceptance | One approved phase | Step 06 applicable checks | Workflow review as required |
| HIGH | Explicit design impact and risk | Scoped with conditions | Strong checks and independent review | Security/architecture review where relevant |
| CRITICAL | Explicit plan, rollback/data safety | Approval-gated | All applicable deterministic evidence | Independent review and human approval |

Handoff always follows Step 04 ownership and concurrency rules.

## Risk to Verification Mapping

The resolver passes resolved risk, change type, affected area, and selected
capabilities to Step 06. Step 06 then determines required verification
evidence. This contract selects capabilities; it does not redefine evidence
records, check states, or VERIFIED semantics.

Missing a required deterministic capability produces BLOCKED or an explicitly
policy-approved fallback. It never silently downgrades a blocking check.

## Risk to Decision Authority

Risk and decision authority are distinct:

- LOW usually permits AUTO.
- NORMAL may be AUTO or RECOMMEND.
- HIGH commonly requires RECOMMEND and may require APPROVAL.
- CRITICAL normally requires APPROVAL and can be FORBIDDEN.

Risk alone does not force approval. A fully governed, reversible HIGH operation
may remain AUTO/ALLOW_WITH_CONDITIONS. A NORMAL request that changes a public
contract may require APPROVAL because authority, not only risk, is decisive.

Step 02 remains authoritative for final decision mode and permission.

## Independent Review Rules

- Optional: trivial documentation, narrow low-risk fixes, and isolated naming.
- Required: NORMAL changes when workflow/acceptance requires review.
- Strict: public APIs, authentication/authorization, migrations, data
  integrity, security, architecture boundaries, and broad cross-module work.
- Critical: independent review plus human approval and all applicable evidence.

## Security Capability Rules

Security-sensitive work resolves applicable security_scan,
dependency_analysis, secret_scan, authentication tests, authorization tests,
input-validation tests, and security_review.

If a configured deterministic capability exists but is unavailable, status is
BLOCKED under Step 06. AI review cannot silently replace it. If no deterministic
capability is configured, a fallback is valid only when repository policy
explicitly permits it and the limitation remains visible.

## Fallback Rules

| Missing capability | Valid fallback |
|---|---|
| Preferred linter | Repository-approved alternate linter |
| Preferred test provider | Compatible repository-approved test provider |
| Security scanner | BLOCKED when required |
| Architecture tool | Agent analysis may be sufficient if policy permits |
| Network research | Continue only when currentness is immaterial; otherwise BLOCKED/APPROVAL |
| Human observation | Manual criterion remains BLOCKED until observed |

Fallback selection must be explicit, authorized, and evidence-compatible.

## Configuration Integration

Future repository/STP configuration may select permitted workflow profiles,
preferred providers, optional capabilities, research mode, review strictness,
and learning mode.

Configuration cannot remove mandatory capabilities, weaken policy, bypass
security, authorize publication, or convert a required human decision into AUTO.

## Resolution Output Contract

The compact output contains:

~~~yaml
risk:
  level: HIGH
  factors: [authorization]
  reasons: [access decision changes]
  evidence_quality: fresh_scoped
capabilities:
  required: [build, authorization_test, security_review]
  available: {build: repository_tool, authorization_test: repository_tests, security_review: human}
  selected: {build: repository_tool, authorization_test: repository_tests, security_review: human}
  missing: []
workflow:
  independent_review: required
human:
  approval_required: false
status: RESOLVED
~~~

The output is a decision input for routing, Step 02 policy resolution, Step 06
verification, and Step 05 evaluation. It is not a configuration file.

## Technical Advisor Integration

The Technical Advisor uses resolved risk, capabilities, provenance-qualified
repository context, and research results to recommend simpler solutions, safer
implementations, compatible libraries, and better architecture.

It may recommend and explain trade-offs, but cannot silently alter approved
requirements, expand scope, select unauthorized providers, or bypass policy.

## Developer Experience Check

For a request such as STP-1234 implementation, the developer supplies intent
and ordinary task context. The system infers risk, required checks, review
level, security capabilities, providers, and research needs.

Only unresolved material choices reach the human. Internal capability names and
provider details remain implementation details.

## Scenario Evaluation

| Scenario | Risk/factors | Required capabilities | Missing | Workflow/human | Expected status |
|---|---|---|---|---|---|
| Typo/documentation fix | LOW | documentation, lint | None | Lightweight, no approval | RESOLVED |
| Normal backend feature | NORMAL | planning, source_editing, build, test, diff_review | None | Standard workflow | RESOLVED |
| Broad cross-module refactor | HIGH / cross_module, scope_size | architecture_analysis, build, test, diff_review | None | Strong review | RESOLVED |
| Authentication change | HIGH / authentication, security_boundary | build, test, security_scan, security_review | None | Security review | RESOLVED |
| Authorization change | HIGH / authorization | build, authorization_test, security_review | None | Independent security review | RESOLVED |
| New dependency | NORMAL/HIGH / dependency_change | dependency_analysis, build, test | Depends | Approval if sensitive | RESOLVED or BLOCKED |
| Security-sensitive dependency | HIGH / dependency, security_boundary | dependency_analysis, security_scan, security_review | Scanner blocks | Approval/review | BLOCKED if unavailable |
| Database migration | HIGH / database_migration | migration_validation, integration_test, rollback_check | Depends | Review | RESOLVED or BLOCKED |
| Destructive migration | CRITICAL / data_loss, destructive | migration_validation, rollback_check, integration_test, security_review | Any blocking gap | Approval and review | RESOLVED or BLOCKED |
| Public API break | HIGH / public_api, compatibility | contract_test, build, test, diff_review | None | Approval required | RESOLVED |
| Performance endpoint | NORMAL/HIGH / performance | performance_validation, build, test | Benchmark blocks if required | Review by impact | RESOLVED or BLOCKED |
| Unknown framework version | NORMAL / unknown_requirements | technical_research, source_reading | Research may block | Recommend/clarify | RESOLVED or BLOCKED |
| Deprecated library | HIGH / dependency, compatibility | technical_research, dependency_analysis, migration plan | Research blocks currentness | Recommendation/review | RESOLVED or BLOCKED |
| Required scanner unavailable | HIGH / security_boundary | security_scan | security_scan | No silent fallback | BLOCKED |
| Multiple testing tools | NORMAL | test | None | Select deterministic repository-compatible provider | RESOLVED |
| Architecture advice only | NORMAL/HIGH by impact | architecture_analysis, technical_research if material | Depends | RECOMMEND; approval if irreversible | RESOLVED |
| Low-risk bug, unclear requirement | NORMAL / unknown_requirements | source_reading, planning | Acceptance clarification | Clarification before implementation | BLOCKED |
| High risk with fresh knowledge | HIGH | Applicable deterministic checks and review | None | Strong workflow | RESOLVED |
| High risk with stale/inferred knowledge | HIGH/CRITICAL / provenance | source_reading, targeted verification, applicable checks | Fresh evidence | Approval or verification first | BLOCKED |
| Research unavailable when currentness matters | Risk of underlying decision | technical_research | research | No current-best-practice claim | BLOCKED or APPROVAL |

These scenarios become Golden Evaluation candidates; this contract does not
execute them.

## Context Cost Assessment

Resolution should load intent, active workspace, targeted repo knowledge,
applicable policy, and a known capability registry. It must not scan the whole
repository, all policies, all tools, or all reference documents for every task.

Capability discovery is configured/repository-known rather than machine-wide.
Risk reasons and selected providers are compact; full tool logs belong to Step
06 evidence, not normal routing context.

## Migration Strategy

1. Preserve this risk/capability contract as non-runtime architecture.
2. Define repository and profile capability registries/configuration.
3. Implement a runtime resolver with explicit missing-capability states.
4. Integrate selection with Step 06 verification.
5. Integrate with routing and Step 05 Golden Evaluation.

No stage is implemented here.

## Migration Constraints

This is a non-runtime V3 architecture specification. It does not implement
risk resolution, capability discovery, configuration, research, policy,
verification, HITL, security tools, routing, adapters, skills, repo-context, or
application changes.
