const actions = new Set(["read_context", "read_source", "write_markdown", "write_source", "run_build", "run_tests", "run_static_analysis", "add_dependency", "network_access", "external_tool", "read_secret", "destructive_operation", "git_commit", "git_push", "create_pr", "modify_policy", "modify_repo_context"]);
const riskLevels = new Set(["LOW", "NORMAL", "HIGH", "CRITICAL"]);
const capabilityByAction = { write_source: ["source_editing", "build", "test"], run_build: ["build"], run_tests: ["test"], run_static_analysis: ["static_analysis"], add_dependency: ["dependency_analysis"], git_commit: ["publication"], git_push: ["publication"], create_pr: ["publication"] };
const capabilityByFactor = { dependency_change: "dependency_analysis", security_boundary: "security_scan", authentication: "security_scan", authorization: "security_scan", secrets: "security_scan", database_migration: "migration_validation", performance: "performance_validation" };
const providerTypes = new Set(["agent", "local_tool", "external_tool", "human", "hybrid"]);
const availabilityStates = new Set(["configured", "detected", "unavailable", "unknown"]);
function issue(path, message, code = "CAPABILITY_INVALID_INPUT") { return { code, path, message }; }
function stable(value) { return [...new Set(value)].sort(); }

export function validateCapabilityProviderInput(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false, errors: [issue("input", "must be an object")] };
  if (!actions.has(input.action)) errors.push(issue("action", "must be a supported action"));
  if (input.risk?.status !== "resolved" || !riskLevels.has(input.risk?.risk?.level)) errors.push(issue("risk", "must be a resolved risk result", "CAPABILITY_RISK_REQUIRED"));
  if (input.policy?.status !== "resolved") errors.push(issue("policy", "must be a resolved Step 16 policy result", "CAPABILITY_POLICY_REQUIRED"));
  if (input.effectiveConfig !== undefined && input.effectiveConfig?.status !== "resolved") errors.push(issue("effectiveConfig", "must be resolved when supplied", "CAPABILITY_EFFECTIVE_CONFIG_INVALID"));
  if (!input.registry || typeof input.registry !== "object" || !input.registry.capabilities || typeof input.registry.capabilities !== "object") errors.push(issue("registry", "must contain validated capability declarations", "CAPABILITY_REGISTRY_REQUIRED"));
  for (const [capability, declaration] of Object.entries(input.registry?.capabilities ?? {})) {
    if (!declaration || !Array.isArray(declaration.providers)) { errors.push(issue(`registry.capabilities.${capability}.providers`, "must be a provider array", "CAPABILITY_INVALID_REGISTRY")); continue; }
    for (const [index, provider] of declaration.providers.entries()) if (!provider || typeof provider.identifier !== "string" || !providerTypes.has(provider.provider_type) || !availabilityStates.has(provider.availability) || typeof provider.authority !== "string" || typeof provider.deterministic !== "boolean") errors.push(issue(`registry.capabilities.${capability}.providers.${index}`, "must contain canonical provider fields", "CAPABILITY_INVALID_REGISTRY"));
  }
  if (input.runtimeAvailability !== undefined && (!input.runtimeAvailability || typeof input.runtimeAvailability !== "object" || Array.isArray(input.runtimeAvailability))) errors.push(issue("runtimeAvailability", "must be an object when supplied"));
  return { valid: errors.length === 0, errors };
}
function required(input) {
  const values = capabilityByAction[input.action] ?? [];
  for (const factor of input.risk.risk.factors ?? []) values.push(capabilityByFactor[factor.code]);
  return stable(values.filter(Boolean));
}
function providersFor(registry, capability, runtimeAvailability) {
  return (registry.capabilities[capability]?.providers ?? []).filter((provider) => provider.availability !== "unavailable" && runtimeAvailability?.[provider.identifier] === "detected").sort((a, b) => Number(b.deterministic) - Number(a.deterministic) || a.identifier.localeCompare(b.identifier));
}
function preferences(input, capability) { const config = input.effectiveConfig?.effective_config ?? {}; return { preferred: config.capabilities?.preferred?.[capability], fallback: config.capabilities?.fallback?.[capability] }; }
function selectProvider(providers, preferred, fallback) {
  const primary = fallback && providers.some((provider) => provider.identifier !== fallback) ? providers.filter((provider) => provider.identifier !== fallback) : providers;
  const deterministic = primary.filter((provider) => provider.deterministic);
  const tier = deterministic.length ? deterministic : primary;
  return tier.find((provider) => provider.identifier === preferred) ?? tier[0];
}
/** Pure Step 17 resolution. It reports requirements and selected declarations; it never executes a provider. */
export function resolveCapabilityProviders(input = {}) {
  const validation = validateCapabilityProviderInput(input);
  if (!validation.valid) return { status: "invalid_input", errors: validation.errors, warnings: [] };
  const requirements = required(input);
  if (input.policy.permission === "DENY" || input.policy.status !== "resolved") return { status: "blocked", capabilities: { required: requirements, available: {}, selected: {}, missing: requirements }, selection_trace: {}, warnings: [{ code: "CAPABILITY_POLICY_RESTRICTED" }] };
  const available = {}, selected = {}, missing = [], selection_trace = {};
  for (const capability of requirements) {
    const providers = providersFor(input.registry, capability, input.runtimeAvailability);
    available[capability] = providers.map((provider) => provider.identifier);
    if (providers.length === 0) { missing.push(capability); selection_trace[capability] = { reason: "CAPABILITY_NO_ELIGIBLE_PROVIDER" }; continue; }
    const { preferred, fallback } = preferences(input, capability);
    const provider = selectProvider(providers, preferred, fallback);
    selected[capability] = provider.identifier;
    selection_trace[capability] = { provider: provider.identifier, reason: provider.identifier === preferred ? "CAPABILITY_PREFERRED_ELIGIBLE" : provider.identifier === fallback ? "CAPABILITY_FALLBACK_ELIGIBLE" : provider.deterministic ? "CAPABILITY_DETERMINISTIC_IDENTIFIER" : "CAPABILITY_STABLE_IDENTIFIER" };
  }
  return { status: missing.length ? "blocked" : "resolved", capabilities: { required: requirements, available, selected, missing }, selection_trace, warnings: [] };
}
