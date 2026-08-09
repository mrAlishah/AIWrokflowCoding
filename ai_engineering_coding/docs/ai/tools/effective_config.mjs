const systemDefaults = {
  profile: "standard",
  workflow: { planning: "auto", design_review: "risk_based", independent_review: "risk_based", security_review: "risk_based" },
  security: { profile: "strict", network_default_posture: "deny", dependency_review: "risk_based", preferred_scanners: [] },
  human_in_loop: { strategy: "risk_based", recommend_before_ask: true, avoid_unnecessary_questions: true, decision_artifact_language: "en" },
  learning: { mode: "important_only", artifact_language: "en", generate: { architecture_decisions: false, new_patterns: false, important_commands: false, debugging_notes: false } },
  localization: { interaction_language: "en", artifacts: { human_decision: "en", learning: "en", handoff: "en", internal_review_suggestion: "en", implementation_plan: "en", phase: "en", pr_comment: "en", adr: "en" } },
  capabilities: { registry: "capabilities.yaml", preferred: {}, fallback: {} },
  research: { mode: "when_material" },
  context: { mode: "conservative", reference_docs: false, repo_context: "on_demand", source_reading: "targeted", diff_first: true, prefer_existing_summaries: true, broad_scan: false, extra_file_justification: true, context_expansion_notice: true, final_response_detail: "standard" },
  terminal: { output: { prefer_summary: true, raw_output_on_error: true, raw_output_when_requested: true, summarize_success_output: true } },
  observability: { enabled: false, metrics: { enabled: false, workspace_records: false, central_dashboards: false, final_response_status: false, tool_reports: false, exact_token_tracking: false, external_telemetry: false } }
};

const profiles = {
  fast: { workflow: { planning: "skip_when_low_risk", design_review: "risk_based", independent_review: "risk_based", security_review: "risk_based" }, research: { mode: "off" }, learning: { mode: "off" }, human_in_loop: { strategy: "explicit_only" } },
  standard: {},
  critical: { workflow: { planning: "required", design_review: "required", independent_review: "strict", security_review: "required" }, research: { mode: "required_for_currentness" }, learning: { mode: "detailed" }, human_in_loop: { strategy: "recommend_then_ask" } }
};

function isObject(value) { return value && typeof value === "object" && !Array.isArray(value); }
function copy(value) { return structuredClone(value); }
function setAtPath(target, segments, value) { let current = target; for (const segment of segments.slice(0, -1)) current = current[segment] ??= {}; current[segments.at(-1)] = value; }
function merge(target, source, sourceName, trace, prefix = []) {
  for (const [key, value] of Object.entries(source ?? {})) {
    if (key === "version") continue;
    const path = [...prefix, key];
    if (isObject(value) && isObject(target[key])) merge(target[key], value, sourceName, trace, path);
    else { target[key] = copy(value); trace[path.join(".")] = sourceName; }
  }
}
function seedTrace(value, trace, prefix = []) {
  for (const [key, nested] of Object.entries(value)) {
    const path = [...prefix, key];
    if (isObject(nested)) seedTrace(nested, trace, path); else trace[path.join(".")] = "system_default";
  }
}

export function resolveEffectiveConfig({ repositoryConfig, stpConfig, policyTrace }) {
  const effective_config = copy(systemDefaults);
  const source_trace = {};
  seedTrace(effective_config, source_trace);
  const profile = stpConfig?.profile ?? repositoryConfig?.profile ?? systemDefaults.profile;
  merge(effective_config, profiles[profile], "profile_default", source_trace);
  if (repositoryConfig) merge(effective_config, repositoryConfig, "repository_config", source_trace);
  if (stpConfig) merge(effective_config, stpConfig, "stp_config", source_trace);
  effective_config.profile = profile;
  source_trace.profile = stpConfig?.profile ? "stp_config" : repositoryConfig?.profile ? "repository_config" : "system_default";
  return { status: "resolved", effective_config, source_trace, rejected_overrides: policyTrace?.rejected_overrides ?? [], warnings: [] };
}
