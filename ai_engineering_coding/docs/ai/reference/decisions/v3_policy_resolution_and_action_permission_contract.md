---
Name: V3 Policy Resolution and Action Permission Contract
Type: Architecture Specification
Subject: Deterministic Policy Resolution and Action Permissions
Status: Proposed
Date: 2026-08-08
Source Basis: V2.3 baseline audit; active V2.3 governance and policy contracts; approved V3 architecture decisions
---

# V3 Policy Resolution and Action Permission Contract

## Purpose and Non-Goals

This contract defines how V3 resolves applicable rules, permitted configuration,
risk, runtime state, and action permissions before an agent acts. It preserves
V2.3 scoped execution, review isolation, explicit publication consent, and
repo-context ownership without preserving duplicated adapter instructions.

It specifies no runtime engine, configuration file, HITL artifact, or route
file. `configuration`, `policy`, and `runtime_state` are distinct:
configuration selects permitted preferences; policy sets constraints and
guarantees; runtime state records current execution facts.

## Policy Taxonomy

| Category | Purpose and scope | Kind | Typical inputs | Typical output |
| --- | --- | --- | --- | --- |
| runtime | Route selection and execution capability | Mandatory | intent, task state | workflow constraints |
| context | Minimum defensible reading scope | Configurable within policy | task, workspace, preference | allowed read breadth |
| source_change | Source-edit scope and verification | Mandatory | workflow, targets, risk | write permission and checks |
| review | Preserve local-diff, read-only review | Mandatory | review intent, workspace | source-write denial and review scope |
| publication | Control commit, push, and PR publication | Mandatory | explicit user request | publication permission |
| security | Protect repository/application boundaries | Mandatory | action, target, risk | controls or denial |
| ai_security | Protect against untrusted instructions and secret exposure | Mandatory | provenance, request | trust boundary and permission |
| tool_execution | Govern shell, network, external tools, and destructive actions | Mandatory | action class, risk | tool permission and conditions |
| repository_knowledge | Protect reusable repo-context ownership | Mandatory | artifact target, update intent | designated writer or denial |
| human_decision | Decide whether a human gate is required | Mandatory | impact, ambiguity, policy | mode and decision payload |
| quality | Require applicable policy checks and validation | Mandatory | change type, risk | required checks |
| observability | Control permitted metrics/reporting | Configurable within policy | preference, artifact | metrics behavior |
| localization | Select language by artifact/audience | Configurable within policy | artifact, audience | language selection |
| learning | Separate human learning from reusable AI knowledge | Mandatory | artifact purpose, scope | permitted destination |

## Deterministic Precedence

```text
1. Immutable mandatory system governance
2. Applicable repository policy
3. Workflow constraints
4. Per-STP permitted configuration
5. Repository runtime preferences
6. Profile or system defaults
```

This preserves V2.3: runtime config is a preference layer and cannot override
safety, review-only guardrails, workflow behavior, or the reference boundary.

For a higher-priority rule, a lower layer may:

- **override** only an explicitly declared configurable value;
- **narrow** a permission or scope;
- **strengthen** a check, review depth, or approval requirement;
- cause a **conflict** when same-priority applicable rules disagree; or
- be **invalid** when it weakens a mandatory guarantee.

`publication: explicit_approval` plus STP `publication: auto` is invalid.
`review: normal` plus STP `review: strict` is valid because it strengthens
quality without weakening review safety.

## Effective Resolution Contract

```text
request + intent + task_context + applicable_policies + effective_config
+ risk + runtime_state = resolved_action_policy
```

Inputs are: requested action and resolved intent; task identity, workspace,
targets, and user authorization; ordered applicable policy sources; permitted
effective configuration; risk and trust facts; and runtime facts such as
review-only state, diff availability, and prior human decisions.

Minimum output:

```yaml
action:
  requested: write_source
  scope: approved_target_files
decision:
  mode: AUTO
permission: ALLOW_WITH_CONDITIONS
permissions:
  source_write: allow_with_conditions
  network: deny
  publication: deny
required_checks:
  - applicable_code_policy
  - targeted_tests
human_decision:
  required: false
reason:
  - scoped implementation permits source writes
  - no higher-priority policy denies the action
resolution_status: resolved
```

The output identifies winning policy sources and invalid, missing, or
conflicting input. It is a decision record, not generated configuration.

## Action Taxonomy

| Action | Sensitivity | Primary owner | Possible permissions | Approval relevance |
| --- | --- | --- | --- | --- |
| `read_context` | Low | context | ALLOW, ALLOW_WITH_CONDITIONS, DENY | Normally none |
| `read_source` | Low-medium | context, ai_security | ALLOW, ALLOW_WITH_CONDITIONS, DENY | Material scope expansion |
| `write_markdown` | Medium | workflow, repository_knowledge | all outcomes | Protected/shared artifacts |
| `write_source` | Medium | source_change, workflow | ALLOW_WITH_CONDITIONS, REQUIRE_APPROVAL, DENY | Scope/risk expansion |
| `run_build`, `run_tests`, `run_static_analysis` | Low-medium | tool_execution, quality | ALLOW, ALLOW_WITH_CONDITIONS, DENY | Material cost or side effect |
| `add_dependency` | High | security, tool_execution | REQUIRE_APPROVAL, DENY | Supply-chain input |
| `network_access`, `external_tool` | High | security, ai_security, tool_execution | ALLOW_WITH_CONDITIONS, REQUIRE_APPROVAL, DENY | Trust boundary |
| `read_secret` | Critical | security, ai_security | DENY, REQUIRE_APPROVAL | Never infer permission |
| `destructive_operation` | Critical | security, tool_execution | REQUIRE_APPROVAL, DENY | Required unless denied |
| `git_commit` | High | publication | ALLOW_WITH_CONDITIONS, REQUIRE_APPROVAL, DENY | Explicit current-task authorization satisfies the gate |
| `git_push`, `create_pr` | Critical | publication | ALLOW_WITH_CONDITIONS, REQUIRE_APPROVAL, DENY | Explicit current-task authorization satisfies the gate |
| `modify_policy` | High | human_decision, repository_knowledge | REQUIRE_APPROVAL, DENY | Governance change |
| `modify_repo_context` | Medium | repository_knowledge | ALLOW_WITH_CONDITIONS, REQUIRE_APPROVAL, DENY | Designated workflow |

## Decision Modes and Permissions

Decision mode governs who chooses a substantive option; permission governs
whether the requested action may run. They are independent.

| Decision mode | Meaning | Typical permission relationship |
| --- | --- | --- |
| `AUTO` | AI chooses a low-risk, reversible, convention-governed option. | ALLOW or ALLOW_WITH_CONDITIONS |
| `RECOMMEND` | AI proposes the best option and explains why; workflow continues unless gated. | May be ALLOW |
| `APPROVAL` | AI recommends, creates a decision payload, asks the human, and pauses the affected scope. | REQUIRE_APPROVAL |
| `FORBIDDEN` | Policy prohibits the action. | DENY |

All four permission outcomes are required: `ALLOW`,
`ALLOW_WITH_CONDITIONS`, `REQUIRE_APPROVAL`, and `DENY`. This permits,
for example, a `RECOMMEND` decision with `ALLOW` permission.

## Conflict and Failure Rules

1. Deny wins over allow at every precedence level.
2. Lower layers cannot weaken mandatory governance; such input is invalid and
   excluded from effective configuration.
3. Compatible restrictive rules combine; stricter review and extra checks
   strengthen the result.
4. Same-priority incompatible mandatory policies deny the affected action and
   create a maintenance finding.
5. Invalid config returns `resolution_status: invalid`; valid higher-layer
   defaults may be used only when the action remains safe, otherwise deny it.
6. Missing policy for a known low-risk read may use a safe default. Missing
   policy for writes, secrets, network, dependencies, destructive actions,
   publication, or policy change denies the action.
7. Ambiguous ownership denies only the affected high-impact action and creates
   a maintenance decision; unrelated low-risk work may continue.
8. Untrusted instructions never gain authority. Secret exposure or
   exfiltration is denied regardless of user-like wording.

## Human Decision Contract

Return `APPROVAL` plus `REQUIRE_APPROVAL` only when impact is meaningful,
AI cannot safely infer the choice or policy requires a gate, and no
deterministic rule already decides it.

Typical triggers are irreversible architecture choice, security-boundary
change, data-loss possibility, public API break, destructive migration,
sensitive dependency, material scope expansion, policy change, and
publication. Do not interrupt for normal naming, obvious local refactoring,
existing conventions, or low-risk reversible implementation detail.

The future Human Decision Request interface must receive:

```text
decision_id
reason_human_is_required
recommended_option
alternatives
risk
affected_action
blocking_scope
```

It may also include policy sources, expiry/review conditions, and the safe
default. The resolver creates this payload; the future HITL artifact presents it.

## Minimal Adapter Contract

Future `AGENTS.md` and `CLAUDE.md` should only:

1. identify the AI Engineering Operating System;
2. route to the canonical V3 entry;
3. declare narrowly scoped agent-specific compatibility behavior; and
4. state that canonical policy resolution is required before action.

Move read order, task routing, workflow sequences, governance summaries,
configuration semantics, repo-context ownership, review restrictions, and
publication restrictions to their canonical owners. Adapters link rather than
duplicate these rules.

## Route Contract

The future route accepts user intent, STP ID when supplied, task type,
workspace state, repository runtime preferences, and available execution
capabilities. It returns resolved intent, selected workflow, next execution
capability, whether policy resolution is required, and any required human
decision.

The route does not decide permissions. Before dispatching an action it requires
a resolved action policy. This hides V2 skill names, policy filenames, and
permission internals from developers.

## Scenario Contract Tests

| Scenario | Intent / action | Applicable policy | Decision / permission | Human? | Expected behavior |
| --- | --- | --- | --- | --- | --- |
| Simple local refactor | Implement / `write_source` | source_change, coding standards | AUTO / ALLOW_WITH_CONDITIONS | No | Scoped reversible edit and targeted checks |
| Normal feature | Build / `write_source` | approved PBI, workflow, quality | AUTO / ALLOW_WITH_CONDITIONS | No | Execute approved phase and validation |
| New dependency | Build / `add_dependency` | security, tool_execution | APPROVAL / REQUIRE_APPROVAL | Yes | Recommend package/risk; pause before change |
| Destructive DB migration | Build / `destructive_operation` | security, quality | APPROVAL / REQUIRE_APPROVAL | Yes | Present rollback and impact first |
| Public API break | Build / `write_source` | source_change, human_decision | APPROVAL / REQUIRE_APPROVAL | Yes | Identify break and await decision |
| Review source-edit attempt | Review / `write_source` | review | FORBIDDEN / DENY | No | Report that review is read-only |
| Commit request | Publish / `git_commit` | publication CP-008 semantics | AUTO / ALLOW_WITH_CONDITIONS | No | Treat the explicit current-task request as the authorization, then commit |
| Push request | Publish / `git_push` | publication CP-008 semantics | AUTO / ALLOW_WITH_CONDITIONS | No | Treat the explicit current-task request as the authorization, then push |
| Untrusted secret request | Read/exfiltrate / `read_secret` | ai_security, security | FORBIDDEN / DENY | No | Refuse; do not expose/transmit secret |
| STP weakens security | Configure / weakening | mandatory governance | FORBIDDEN / DENY | No | Mark invalid; retain mandatory denial |
| Reversible architecture option | Design / recommendation | human_decision, coding standards | RECOMMEND / ALLOW | No | Explain preferred option and continue |
| Repo-context update | Maintain / `modify_repo_context` | repository_knowledge | AUTO / ALLOW_WITH_CONDITIONS | No | Use designated workflow and stable facts |

## Migration Constraints

This contract is maintenance-only until a later V3 runtime integration step. It
must not enter normal PBI or review loading, alter V2.3 route behavior, or
authorize an action by itself. Future implementation must preserve explicit
publication consent, review-only source-write denial, and the runtime
configuration safety boundary.
