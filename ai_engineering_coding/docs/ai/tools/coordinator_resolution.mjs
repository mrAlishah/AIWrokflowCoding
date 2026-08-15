import { resolveEffectiveConfig } from "./effective_config.mjs";
import { resolveRisk } from "./risk_resolution.mjs";
import { resolveDecisionActionPolicy } from "./decision_action_policy.mjs";
import { resolveCapabilityProviders } from "./capability_provider_resolution.mjs";
import { resolveHumanDecisionRequirement } from "./hitl_requirement_resolution.mjs";
import { validateRuntimeState } from "./validate_runtime_state.mjs";
import { resolveWorkflowRoute } from "./workflow_routing_resolution.mjs";
import { resolveReviewRequirement } from "./review_requirement_resolution.mjs";
import { resolveVerification } from "./verification_resolution.mjs";
import { resolveReviewResult } from "./review_result_resolution.mjs";
import { resolveHandoffCompletion } from "./handoff_completion_resolution.mjs";
import Ajv2020 from "ajv/dist/2020.js";
import runtimeConfigSchema from "../config/schema/runtime_config.schema.json" with { type: "json" };
import stpConfigSchema from "../config/schema/stp_config.schema.json" with { type: "json" };

const rootKeys = ["config_input", "risk_input", "policy_input", "capability_input", "review_requirement_input", "verification_input", "review_result_input", "handoff_input", "workflow_input", "runtime_state", "implementation"];
const identifier = /^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/;
const fingerprints = /^sha256:[a-f0-9]{64}$/;
const richKeys = new Set(["source_code", "source", "diff", "patch", "review_comment", "review_body", "handoff_markdown", "terminal_output", "command", "tool_log", "transcript", "provider_transcript", "model_response", "secret", "credential", "human_message", "raw_policy", "raw_verification", "raw_review"]);
const configAjv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, validateFormats: false });
const validateRepositoryConfig = configAjv.compile(runtimeConfigSchema);
const validateStpConfig = configAjv.compile(stpConfigSchema);

function exactObject(value, keys) { return value !== null && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key)); }
function invalid(owner, code, subsystemStatuses = {}) { return { resolution_status: "invalid_input", status: "BLOCKED", active_owner: owner, next_stage: "NONE", reason_codes: [code], requires_human: false, blocked: true, complete: false, evidence_refs: [], subsystem_statuses: subsystemStatuses, errors: [{ code }], warnings: [] }; }
function stop(status, owner, reason, subsystemStatuses, requiresHuman = false) { return { resolution_status: "resolved", status, active_owner: owner, next_stage: "NONE", reason_codes: [reason], requires_human: requiresHuman, blocked: status === "BLOCKED", complete: false, evidence_refs: [], subsystem_statuses: subsystemStatuses, errors: [], warnings: [] }; }
function refs(value) { return Array.isArray(value) && value.every((item) => typeof item === "string" && identifier.test(item) && !/^(?:https?|file):/i.test(item)); }
function canonicalRefs(value) { return [...new Set(value)].sort(); }
function subsystemStatuses(results) { return Object.fromEntries(Object.entries(results).map(([key, value]) => [key, value?.status ?? value?.resolution_status ?? "unknown"])); }
function workflowOwner(route) { if (route.status === "COMPLETE") return "COMPLETE"; if (route.status === "WAITING") return "WAITING"; if (route.status === "BLOCKED") return "BLOCKED"; if (route.status === "TERMINAL") return "TERMINAL"; return route.stage; }
function finalOutput(route, results, evidenceRefs, hitlRequired) { return { resolution_status: route.resolution_status, status: route.status, active_owner: workflowOwner(route), next_stage: route.stage, reason_codes: [route.reason], requires_human: hitlRequired, blocked: route.status === "BLOCKED", complete: route.status === "COMPLETE", evidence_refs: evidenceRefs, subsystem_statuses: subsystemStatuses(results), errors: route.errors.map(({ code }) => ({ code })), warnings: [] }; }
function validRoot(input) { return exactObject(input, rootKeys) && exactObject(input.config_input, ["repositoryConfig", "stpConfig", "policyTrace"]) && exactObject(input.policy_input, ["action", "policyRules", "context"]) && exactObject(input.workflow_input, ["policy_gate", "scope_reassessment", "evidence_refs", "approval_identity"]); }
function plainObject(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
function noRichKeys(value) { if (Array.isArray(value)) return value.every(noRichKeys); if (!plainObject(value)) return true; return Object.entries(value).every(([key, nested]) => !richKeys.has(key) && noRichKeys(nested)); }
function validPolicyTrace(value) {
  const simple = exactObject(value, ["rejected_overrides"]);
  const full = exactObject(value, ["source_layers", "rejected_overrides"]);
  if (!simple && !full) return false;
  if (!Array.isArray(value.rejected_overrides)) return false;
  if (value.rejected_overrides.some((item) => !allowedObject(item, ["path", "stronger_source", "attempted_value", "required_minimum"], ["path", "stronger_source", "attempted_value", "required_minimum"]) || [item.path, item.stronger_source, item.attempted_value, item.required_minimum].some((field) => typeof field !== "string"))) return false;
  return value.source_layers === undefined || Array.isArray(value.source_layers) && value.source_layers.every((item) => typeof item === "string" && identifier.test(item));
}
function validConfigInput(value) { return exactObject(value, ["repositoryConfig", "stpConfig", "policyTrace"]) && (value.repositoryConfig === null || plainObject(value.repositoryConfig) && validateRepositoryConfig(value.repositoryConfig)) && (value.stpConfig === null || plainObject(value.stpConfig) && validateStpConfig(value.stpConfig)) && validPolicyTrace(value.policyTrace); }
function validRiskInput(value) { if (!exactObject(value, ["taskFacts"]) || !plainObject(value.taskFacts) || Object.keys(value.taskFacts).some((key) => !["intent", "change_type", "scope", "evidence_quality", "unknown_impact", "affected_areas", "risk_factors"].includes(key))) return false; const facts = value.taskFacts; return (facts.intent === undefined || typeof facts.intent === "string") && (facts.affected_areas === undefined || Array.isArray(facts.affected_areas) && facts.affected_areas.every((item) => typeof item === "string")) && (facts.risk_factors === undefined || Array.isArray(facts.risk_factors) && facts.risk_factors.every((item) => typeof item === "string")); }
function allowedObject(value, required, allowed) { return plainObject(value) && required.every((key) => Object.hasOwn(value, key)) && Object.keys(value).every((key) => allowed.includes(key)); }
function validPolicyInput(value) { if (!exactObject(value, ["action", "policyRules", "context"]) || !Array.isArray(value.policyRules) || !allowedObject(value.context, [], ["review_only", "untrusted_instruction", "satisfied_conditions"])) return false; if (value.context.review_only !== undefined && typeof value.context.review_only !== "boolean" || value.context.untrusted_instruction !== undefined && typeof value.context.untrusted_instruction !== "boolean" || value.context.satisfied_conditions !== undefined && (!Array.isArray(value.context.satisfied_conditions) || value.context.satisfied_conditions.some((item) => typeof item !== "string"))) return false; return value.policyRules.every((rule) => allowedObject(rule, ["id", "authority", "action", "decision_mode", "permission"], ["id", "authority", "action", "decision_mode", "permission", "risk_levels", "conditions", "reason_code"]) && (rule.risk_levels === undefined || Array.isArray(rule.risk_levels) && rule.risk_levels.every((item) => typeof item === "string")) && (rule.conditions === undefined || Array.isArray(rule.conditions) && rule.conditions.every((item) => typeof item === "string"))); }
function validCapabilityInput(value) { if (!exactObject(value, ["action", "registry", "runtimeAvailability"]) || !plainObject(value.registry) || Object.keys(value.registry).some((key) => !["version", "capabilities"].includes(key)) || !plainObject(value.registry.capabilities) || !plainObject(value.runtimeAvailability)) return false; return Object.values(value.registry.capabilities).every((declaration) => exactObject(declaration, ["providers"]) && Array.isArray(declaration.providers) && declaration.providers.every((provider) => exactObject(provider, ["identifier", "availability", "deterministic", "provider_type", "authority"]))) && Object.values(value.runtimeAvailability).every((item) => typeof item === "string"); }
function validReviewRequirementInput(value) { return exactObject(value, ["change_facts", "policy_review", "acceptance_review"]) && exactObject(value.change_facts, ["security_sensitive", "authorization_change", "public_api_change", "destructive_migration"]) && exactObject(value.policy_review, ["status"]) && exactObject(value.acceptance_review, ["status"]); }
function validVerificationInput(value) { return exactObject(value, ["change_facts", "acceptance_criteria", "policy", "implementation", "capabilities", "evidence"]); }
function validIdentity(value, keys) { return exactObject(value, keys) && keys.every((key) => typeof value[key] === "string" && (key.endsWith("fingerprint") ? fingerprints.test(value[key]) || identifier.test(value[key]) : identifier.test(value[key]))); }
function validReviewInput(value) { return exactObject(value, ["current_identity", "observation"]) && validIdentity(value.current_identity, ["implementation_revision", "scope_fingerprint", "review_definition_fingerprint", "review_policy_fingerprint", "verification_identity_fingerprint"]); }
function validHandoffInput(value) { return exactObject(value, ["current_identity", "handoff_observation"]) && validIdentity(value.current_identity, ["implementation_fingerprint", "scope_fingerprint", "verification_identity_fingerprint", "review_identity", "handoff_definition_fingerprint"]); }
function validApprovalIdentity(value) { return value === null || exactObject(value, ["operation_id", "action", "decision_id", "request_identity", "request_fingerprint"]) && [value.operation_id, value.action, value.decision_id, value.request_identity, value.request_fingerprint].every((item) => typeof item === "string" && identifier.test(item)) && fingerprints.test(value.request_identity) && fingerprints.test(value.request_fingerprint); }
function validWorkflowBoundary(value) { return exactObject(value, ["policy_gate", "scope_reassessment", "evidence_refs", "approval_identity"]) && exactObject(value.policy_gate, ["status"]) && exactObject(value.scope_reassessment, ["required"]) && typeof value.scope_reassessment.required === "boolean" && refs(value.evidence_refs) && validApprovalIdentity(value.approval_identity); }
function boundaryError(input) {
  if (!noRichKeys(input.config_input) || !validConfigInput(input.config_input)) return ["CONFIG", "COORDINATOR_CONFIG_BOUNDARY_INVALID"];
  if (!noRichKeys(input.risk_input) || !validRiskInput(input.risk_input)) return ["RISK", "COORDINATOR_RISK_BOUNDARY_INVALID"];
  if (!noRichKeys(input.policy_input) || !validPolicyInput(input.policy_input)) return ["POLICY", "COORDINATOR_POLICY_BOUNDARY_INVALID"];
  if (!noRichKeys(input.capability_input) || !validCapabilityInput(input.capability_input)) return ["CAPABILITY", "COORDINATOR_CAPABILITY_BOUNDARY_INVALID"];
  if (!noRichKeys(input.review_requirement_input) || !validReviewRequirementInput(input.review_requirement_input)) return ["REVIEW_REQUIREMENT", "COORDINATOR_REVIEW_REQUIREMENT_BOUNDARY_INVALID"];
  if (!noRichKeys(input.verification_input) || !validVerificationInput(input.verification_input)) return ["VERIFICATION", "COORDINATOR_VERIFICATION_BOUNDARY_INVALID"];
  if (!noRichKeys(input.review_result_input) || !validReviewInput(input.review_result_input)) return ["REVIEW", "COORDINATOR_REVIEW_BOUNDARY_INVALID"];
  if (!noRichKeys(input.handoff_input) || !validHandoffInput(input.handoff_input)) return ["HANDOFF", "COORDINATOR_HANDOFF_BOUNDARY_INVALID"];
  if (!noRichKeys(input.workflow_input) || !validWorkflowBoundary(input.workflow_input)) return ["WORKFLOW", "COORDINATOR_WORKFLOW_BOUNDARY_INVALID"];
  if (!noRichKeys(input.implementation) || !exactObject(input.implementation, ["status"])) return ["WORKFLOW", "COORDINATOR_IMPLEMENTATION_BOUNDARY_INVALID"];
  return null;
}
function policyGateFromPolicy(policy, approvalSatisfied) { if (policy.permission === "DENY" || policy.decision?.mode === "FORBIDDEN") return "PROHIBITED"; if ((policy.permission === "REQUIRE_APPROVAL" || policy.decision?.mode === "APPROVAL") && !approvalSatisfied) return "UNRESOLVED"; return "SATISFIED"; }
function approvalSatisfiedForCurrentOperation(runtimeState, policy, hitl, approvalIdentity) {
  const human = runtimeState.human_decision;
  return hitl.human_requirement?.required === true
    && runtimeState.lifecycle.state === "OPEN"
    && runtimeState.policy_projection.status === "resolved"
    && human.required === true
    && human.request_status === "terminal"
    && human.response_status === "consumed"
    && approvalIdentity !== null
    && approvalIdentity.operation_id === runtimeState.workspace.operation_id
    && approvalIdentity.action === policy.action.requested
    && approvalIdentity.decision_id === human.decision_id
    && approvalIdentity.request_identity === human.request_identity
    && approvalIdentity.request_fingerprint === human.request_fingerprint;
}

/** Pure Step 30 single-snapshot composition of the canonical V3 resolvers. */
export function evaluateCoordinator(input) {
  if (!validRoot(input)) return invalid("COORDINATOR", "COORDINATOR_INVALID_INPUT");
  if (!noRichKeys(input.config_input) || !validConfigInput(input.config_input)) return invalid("CONFIG", "COORDINATOR_CONFIG_BOUNDARY_INVALID");
  const results = {};
  results.runtime = validateRuntimeState(input.runtime_state);
  if (results.runtime.status !== "valid") return invalid("RUNTIME", "COORDINATOR_RUNTIME_INVALID", subsystemStatuses(results));
  const boundary = boundaryError(input);
  if (boundary) return invalid(boundary[0], boundary[1], subsystemStatuses(results));
  results.config = resolveEffectiveConfig(input.config_input);
  if (input.runtime_state.lifecycle.state === "TERMINAL") return stop("TERMINAL", "TERMINAL", "COORDINATOR_RUNTIME_TERMINAL", subsystemStatuses(results));
  if (input.runtime_state.lifecycle.state === "WAITING_FOR_HUMAN") return stop("WAITING", "WAITING", "COORDINATOR_RUNTIME_WAITING_FOR_HUMAN", subsystemStatuses(results), true);
  results.risk = resolveRisk(input.risk_input);
  if (results.risk.status !== "resolved") return invalid("RISK", "COORDINATOR_UPSTREAM_RISK_INVALID", subsystemStatuses(results));

  results.policy = resolveDecisionActionPolicy({ ...input.policy_input, risk: results.risk, effectiveConfig: results.config });
  if (results.policy.status === "invalid_input") return invalid("POLICY", "COORDINATOR_UPSTREAM_POLICY_INVALID", subsystemStatuses(results));
  if (results.policy.status !== "resolved") return stop("BLOCKED", "POLICY", results.policy.status === "invalid_policy" ? "COORDINATOR_POLICY_INVALID" : "COORDINATOR_POLICY_UNRESOLVED", subsystemStatuses(results));
  if (results.policy.permission === "DENY" || results.policy.decision?.mode === "FORBIDDEN") return stop("BLOCKED", "POLICY", "COORDINATOR_POLICY_PROHIBITED", subsystemStatuses(results));

  results.capability = resolveCapabilityProviders({ ...input.capability_input, risk: results.risk, policy: results.policy, effectiveConfig: results.config });
  if (results.capability.status === "invalid_input") return invalid("CAPABILITY", "COORDINATOR_UPSTREAM_CAPABILITY_INVALID", subsystemStatuses(results));
  results.hitl = resolveHumanDecisionRequirement({ policy: results.policy, capability: results.capability });
  if (results.hitl.status === "invalid_input") return invalid("HITL", "COORDINATOR_UPSTREAM_HITL_INVALID", subsystemStatuses(results));
  if (results.capability.status === "blocked") return stop("BLOCKED", "CAPABILITY", "COORDINATOR_CAPABILITY_BLOCKED", subsystemStatuses(results));
  const approvalSatisfied = approvalSatisfiedForCurrentOperation(input.runtime_state, results.policy, results.hitl, input.workflow_input.approval_identity);
  if (results.hitl.human_requirement?.required && !approvalSatisfied) return stop("WAITING", "HITL", "COORDINATOR_HITL_REQUIRED", subsystemStatuses(results), true);

  results.review_requirement = resolveReviewRequirement({ ...input.review_requirement_input, risk: results.risk });
  if (results.review_requirement.resolution_status === "invalid_input") return invalid("REVIEW_REQUIREMENT", "COORDINATOR_UPSTREAM_REVIEW_REQUIREMENT_INVALID", subsystemStatuses(results));
  if (results.review_requirement.status === "UNRESOLVED") return stop("BLOCKED", "REVIEW_REQUIREMENT", "COORDINATOR_REVIEW_REQUIREMENT_UNRESOLVED", subsystemStatuses(results));

  results.verification = resolveVerification({ ...input.verification_input, risk: results.risk });
  if (results.verification.resolution_status === "invalid_input") return invalid("VERIFICATION", "COORDINATOR_UPSTREAM_VERIFICATION_INVALID", subsystemStatuses(results));

  results.review_result = resolveReviewResult({ review_requirement: { status: results.review_requirement.status }, ...input.review_result_input });
  if (results.review_result.resolution_status === "invalid_input") return invalid("REVIEW", "COORDINATOR_UPSTREAM_REVIEW_INVALID", subsystemStatuses(results));

  const workflowPolicy = { status: policyGateFromPolicy(results.policy, approvalSatisfied) };
  const workflowRefs = input.workflow_input.evidence_refs;
  if (input.workflow_input.policy_gate.status !== workflowPolicy.status) return invalid("POLICY", "COORDINATOR_POLICY_GATE_MISMATCH", subsystemStatuses(results));
  results.handoff = resolveHandoffCompletion({ ...input.handoff_input, implementation: input.implementation, verification: { status: results.verification.status }, review_requirement: { status: results.review_requirement.status }, review_result: results.review_requirement.status === "NOT_REQUIRED" ? null : { status: results.review_result.status }, scope_reassessment: input.workflow_input.scope_reassessment, policy_gate: workflowPolicy });
  if (results.handoff.resolution_status === "invalid_input") return invalid("HANDOFF", "COORDINATOR_UPSTREAM_HANDOFF_INVALID", subsystemStatuses(results));

  const routeInput = { runtime_state: input.runtime_state, policy_gate: workflowPolicy, implementation: input.implementation, verification: { status: results.verification.status }, review_requirement: { status: results.review_requirement.status, reason_codes: results.review_requirement.reason_codes }, review_result: results.review_requirement.status === "NOT_REQUIRED" ? null : { status: results.review_result.status }, scope_reassessment: input.workflow_input.scope_reassessment, handoff: { status: results.handoff.status }, evidence_refs: canonicalRefs(workflowRefs) };
  results.workflow = resolveWorkflowRoute(routeInput);
  if (results.workflow.resolution_status === "invalid_input") return invalid("WORKFLOW", "COORDINATOR_WORKFLOW_INVALID", subsystemStatuses(results));
  return finalOutput(results.workflow, results, canonicalRefs([...workflowRefs, ...results.verification.evidence_refs, ...results.review_result.evidence_refs, ...results.handoff.evidence_refs]), results.hitl.human_requirement?.required === true && !approvalSatisfied);
}

export const resolveCoordinator = evaluateCoordinator;
