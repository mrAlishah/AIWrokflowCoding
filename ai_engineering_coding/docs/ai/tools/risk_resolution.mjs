const levelRank = { low: 0, normal: 1, high: 2, critical: 3 };
const evidenceQualities = new Set(["fresh_scoped", "sufficient", "limited", "stale", "unknown"]);
const changeTypes = new Set(["documentation", "implementation", "bug_fix", "refactor", "migration", "configuration", "analysis"]);
const scopes = new Set(["narrow", "bounded", "broad", "unbounded", "production_wide"]);
const unknownImpacts = new Set(["none", "low_impact", "potentially_high_impact"]);
const taskFactFields = new Set(["intent", "change_type", "scope", "evidence_quality", "unknown_impact", "affected_areas", "risk_factors"]);

const factorRules = {
  security_boundary: ["high", "RISK_FACTOR_SECURITY_BOUNDARY", "change crosses a security or trust boundary"],
  authentication: ["high", "RISK_FACTOR_AUTHENTICATION", "change affects login, identity, credentials, or sessions"],
  authorization: ["high", "RISK_FACTOR_AUTHORIZATION", "change affects an access or permission decision"],
  secrets: ["critical", "RISK_FACTOR_SECRETS", "change reads, stores, transmits, or handles secrets"],
  pii: ["high", "RISK_FACTOR_PII", "change handles personal or regulated data"],
  payment: ["high", "RISK_FACTOR_PAYMENT", "change affects billing, money movement, or financial state"],
  data_loss: ["critical", "RISK_FACTOR_DATA_LOSS", "change may delete, overwrite, corrupt, or irreversibly transform data"],
  database_migration: ["high", "RISK_FACTOR_DATABASE_MIGRATION", "change includes a schema or data migration"],
  public_api: ["high", "RISK_FACTOR_PUBLIC_API", "change affects an external or public contract"],
  backward_compatibility: ["high", "RISK_FACTOR_BACKWARD_COMPATIBILITY", "change may affect existing consumers or aliases"],
  dependency_change: ["normal", "RISK_FACTOR_DEPENDENCY_CHANGE", "change adds or updates a supply-chain input"],
  network_access: ["high", "RISK_FACTOR_NETWORK_ACCESS", "change communicates with an external system"],
  destructive_operation: ["critical", "RISK_FACTOR_DESTRUCTIVE_OPERATION", "change includes an irreversible operation"],
  production_impact: ["high", "RISK_FACTOR_PRODUCTION_IMPACT", "change has deployment, runtime, or operational impact"],
  concurrency: ["normal", "RISK_FACTOR_CONCURRENCY", "change has shared-write or state-overlap risk"],
  cross_module_change: ["normal", "RISK_FACTOR_CROSS_MODULE_CHANGE", "change affects multiple bounded subsystems"],
  architecture_boundary: ["high", "RISK_FACTOR_ARCHITECTURE_BOUNDARY", "change crosses a layer, service, or integration boundary"],
  performance: ["normal", "RISK_FACTOR_PERFORMANCE", "change affects latency, throughput, resources, or cost"],
  scope_size: ["normal", "RISK_FACTOR_SCOPE_SIZE", "change has broad file, module, or phase scope"],
  unknown_requirements: ["normal", "RISK_FACTOR_UNKNOWN_REQUIREMENTS", "material acceptance or intent information is unknown"],
  untrusted_input: ["high", "RISK_FACTOR_UNTRUSTED_INPUT", "change consumes external or untrusted instructions or data"]
};

function issue(path, message, code = "RISK_INVALID_INPUT") { return { code, path, message }; }
function stronger(left, right) { return levelRank[left] >= levelRank[right] ? left : right; }
function upper(level) { return level.toUpperCase(); }

/** Validate the small, normalized task-fact contract accepted by resolveRisk. */
export function validateRiskInput(input) {
  const taskFacts = input?.taskFacts;
  if (!taskFacts || typeof taskFacts !== "object" || Array.isArray(taskFacts)) return { valid: false, errors: [issue("taskFacts", "must be an object")] };
  const errors = [];
  const changeType = taskFacts.change_type ?? "implementation";
  const scope = taskFacts.scope ?? "bounded";
  const evidenceQuality = taskFacts.evidence_quality ?? "unknown";
  const unknownImpact = taskFacts.unknown_impact ?? "none";
  for (const key of Object.keys(taskFacts)) if (!taskFactFields.has(key)) errors.push(issue(`taskFacts.${key}`, "is not a supported task-fact field", "RISK_UNKNOWN_TASK_FACT_FIELD"));
  if (!changeTypes.has(changeType)) errors.push(issue("taskFacts.change_type", "must be a supported change type"));
  if (!scopes.has(scope)) errors.push(issue("taskFacts.scope", "must be a supported scope category"));
  if (!evidenceQualities.has(evidenceQuality)) errors.push(issue("taskFacts.evidence_quality", "must be a supported evidence quality category"));
  if (!unknownImpacts.has(unknownImpact)) errors.push(issue("taskFacts.unknown_impact", "must be a supported unknown-impact category"));
  if (taskFacts.intent !== undefined && typeof taskFacts.intent !== "string") errors.push(issue("taskFacts.intent", "must be a string when supplied"));
  if (taskFacts.affected_areas !== undefined && (!Array.isArray(taskFacts.affected_areas) || taskFacts.affected_areas.some((area) => typeof area !== "string"))) errors.push(issue("taskFacts.affected_areas", "must be an array of strings when supplied"));
  if (taskFacts.risk_factors !== undefined && !Array.isArray(taskFacts.risk_factors)) errors.push(issue("taskFacts.risk_factors", "must be an array when supplied"));
  for (const [index, factor] of (taskFacts.risk_factors ?? []).entries()) if (!Object.hasOwn(factorRules, factor)) errors.push(issue(`taskFacts.risk_factors.${index}`, "must be a supported risk factor"));
  return { valid: errors.length === 0, errors };
}

function resolvedFactors(taskFacts) {
  const factors = new Map();
  const add = (code, source) => { const sources = factors.get(code) ?? new Set(); sources.add(source); factors.set(code, sources); };
  for (const code of (taskFacts.risk_factors ?? [])) add(code, "taskFacts.risk_factors");
  if (taskFacts.change_type === "migration") add("database_migration", "taskFacts.change_type");
  if (["broad", "unbounded", "production_wide"].includes(taskFacts.scope)) add("scope_size", "taskFacts.scope");
  if ((taskFacts.unknown_impact ?? "none") !== "none") add("unknown_requirements", "taskFacts.unknown_impact");
  return [...factors].map(([code, sources]) => ({ code, sources: [...sources].sort() })).sort((left, right) => left.code.localeCompare(right.code));
}

/**
 * Pure impact classification. It intentionally does not resolve decision mode,
 * action permission, capabilities, workflow, HITL, verification, or providers.
 */
export function resolveRisk(input = {}) {
  const validation = validateRiskInput(input);
  if (!validation.valid) return { status: "invalid_input", errors: validation.errors, warnings: [] };

  const taskFacts = input.taskFacts;
  const unknownImpact = taskFacts.unknown_impact ?? "none";
  const baseline = taskFacts.change_type === "documentation" && taskFacts.scope === "narrow" ? "low" : "normal";
  let level = baseline;
  const factors = resolvedFactors(taskFacts);
  const reasons = [{ code: baseline === "low" ? "RISK_BASELINE_NARROW_DOCUMENTATION" : "RISK_BASELINE_BOUNDED_CHANGE", source: "taskFacts.change_type", message: baseline === "low" ? "documentation change starts as local and reversible" : "change starts at normal risk" }];
  const escalations = [];

  for (const factor of factors) {
    const [factorLevel, reasonCode, message] = factorRules[factor.code];
    const before = level;
    level = stronger(level, factorLevel);
    reasons.push({ code: reasonCode, source: factor.sources[0], sources: factor.sources, message });
    if (level !== before) escalations.push({ code: `RISK_ESCALATE_${factor.code.toUpperCase()}`, source: factor.sources[0], sources: factor.sources, factor: factor.code, from: upper(before), to: upper(level) });
  }

  if (unknownImpact === "potentially_high_impact") {
    const before = level;
    level = stronger(level, "high");
    if (level !== before) escalations.push({ code: "RISK_ESCALATE_MATERIAL_UNKNOWN", source: "taskFacts.unknown_impact", factor: "unknown_requirements", from: upper(before), to: upper(level) });
  }
  if (["unbounded", "production_wide"].includes(taskFacts.scope)) {
    const before = level;
    level = stronger(level, "critical");
    if (level !== before) escalations.push({ code: taskFacts.scope === "production_wide" ? "RISK_ESCALATE_PRODUCTION_WIDE_SCOPE" : "RISK_ESCALATE_UNBOUNDED_SCOPE", source: "taskFacts.scope", factor: "scope_size", from: upper(before), to: upper(level) });
  }

  return {
    status: "resolved",
    risk: {
      level: upper(level),
      factors,
      reasons,
      escalations,
      evidence_quality: taskFacts.evidence_quality ?? "unknown",
      uncertainty: { impact: unknownImpact, source: "taskFacts.unknown_impact" }
    },
    trace: {
      baseline: { level: upper(baseline), source: "taskFacts.change_type" },
      affected_areas: [...(taskFacts.affected_areas ?? [])].sort(),
      intent_present: typeof taskFacts.intent === "string"
    },
    warnings: []
  };
}
