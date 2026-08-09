import { resolveRisk } from "./risk_resolution.mjs";

const cases = [
  ["documentation_low", { change_type: "documentation", scope: "narrow" }, "LOW", [], [], []],
  ["bounded_documentation_normal", { change_type: "documentation", scope: "bounded" }, "NORMAL", [], ["RISK_BASELINE_BOUNDED_CHANGE"], []],
  ["bounded_feature_normal", { change_type: "implementation", affected_areas: ["backend"] }, "NORMAL", [], ["RISK_BASELINE_BOUNDED_CHANGE"], []],
  ["authentication_high", { risk_factors: ["authentication"] }, "HIGH", ["authentication"], ["RISK_FACTOR_AUTHENTICATION"], ["RISK_ESCALATE_AUTHENTICATION"]],
  ["authorization_high", { risk_factors: ["authorization"] }, "HIGH", ["authorization"], ["RISK_FACTOR_AUTHORIZATION"], ["RISK_ESCALATE_AUTHORIZATION"]],
  ["public_api_high", { risk_factors: ["public_api"] }, "HIGH", ["public_api"], ["RISK_FACTOR_PUBLIC_API"], ["RISK_ESCALATE_PUBLIC_API"]],
  ["migration_high", { change_type: "migration" }, "HIGH", ["database_migration"], ["RISK_FACTOR_DATABASE_MIGRATION"], ["RISK_ESCALATE_DATABASE_MIGRATION"]],
  ["architecture_boundary_high", { risk_factors: ["architecture_boundary"] }, "HIGH", ["architecture_boundary"], ["RISK_FACTOR_ARCHITECTURE_BOUNDARY"], ["RISK_ESCALATE_ARCHITECTURE_BOUNDARY"]],
  ["destructive_critical", { change_type: "documentation", risk_factors: ["destructive_operation"] }, "CRITICAL", ["destructive_operation"], ["RISK_FACTOR_DESTRUCTIVE_OPERATION"], ["RISK_ESCALATE_DESTRUCTIVE_OPERATION"]],
  ["secrets_critical", { risk_factors: ["secrets"] }, "CRITICAL", ["secrets"], ["RISK_FACTOR_SECRETS"], ["RISK_ESCALATE_SECRETS"]],
  ["data_loss_critical", { risk_factors: ["data_loss"] }, "CRITICAL", ["data_loss"], ["RISK_FACTOR_DATA_LOSS"], ["RISK_ESCALATE_DATA_LOSS"]],
  ["production_wide_critical", { risk_factors: ["production_impact"], scope: "production_wide" }, "CRITICAL", ["production_impact", "scope_size"], ["RISK_FACTOR_PRODUCTION_IMPACT", "RISK_FACTOR_SCOPE_SIZE"], ["RISK_ESCALATE_PRODUCTION_IMPACT", "RISK_ESCALATE_PRODUCTION_WIDE_SCOPE"]],
  ["strongest_factor_wins", { risk_factors: ["dependency_change", "authentication", "data_loss"] }, "CRITICAL", ["authentication", "data_loss", "dependency_change"], ["RISK_FACTOR_AUTHENTICATION", "RISK_FACTOR_DATA_LOSS"], ["RISK_ESCALATE_AUTHENTICATION", "RISK_ESCALATE_DATA_LOSS"]],
  ["fresh_evidence_retains_factor", { risk_factors: ["authentication"], evidence_quality: "fresh_scoped" }, "HIGH", ["authentication"], ["RISK_FACTOR_AUTHENTICATION"], ["RISK_ESCALATE_AUTHENTICATION"]],
  ["material_unknown_not_low", { change_type: "documentation", unknown_impact: "potentially_high_impact" }, "HIGH", ["unknown_requirements"], ["RISK_FACTOR_UNKNOWN_REQUIREMENTS"], ["RISK_ESCALATE_MATERIAL_UNKNOWN"]]
];

let passed = 0;
for (const [id, taskFacts, level, factors, reasons, escalations] of cases) {
  const result = resolveRisk({ taskFacts });
  const actualFactors = result.risk?.factors.map(({ code }) => code);
  const actualReasons = result.risk?.reasons.map(({ code }) => code);
  const actualEscalations = result.risk?.escalations.map(({ code }) => code);
  const includes = (actual, expected) => expected.every((value) => actual.includes(value));
  const ok = result.status === "resolved" && result.risk.level === level && JSON.stringify(actualFactors) === JSON.stringify(factors) && includes(actualReasons, reasons) && includes(actualEscalations, escalations);
  console.log(`${ok ? "PASS" : "FAIL"} ${id}`);
  if (ok) passed += 1;
}

const identicalInput = { taskFacts: { intent: "change session behavior", change_type: "implementation", affected_areas: ["auth", "api"], risk_factors: ["authentication", "public_api"], evidence_quality: "fresh_scoped" } };
const deterministic = JSON.stringify(resolveRisk(identicalInput)) === JSON.stringify(resolveRisk(structuredClone(identicalInput)));
console.log(`${deterministic ? "PASS" : "FAIL"} identical_input_identical_trace`);
if (deterministic) passed += 1;

const invalid = resolveRisk({ taskFacts: { risk_factors: ["not_a_contract_factor"] } });
const invalidInput = invalid.status === "invalid_input" && invalid.errors[0]?.code === "RISK_INVALID_INPUT";
console.log(`${invalidInput ? "PASS" : "FAIL"} rejects_unbounded_factor_input`);
if (invalidInput) passed += 1;

const unknownProperty = resolveRisk({ taskFacts: { unexpected_property: true } });
const rejectsUnknownProperty = unknownProperty.status === "invalid_input" && unknownProperty.errors.some((error) => error.code === "RISK_UNKNOWN_TASK_FACT_FIELD" && error.path === "taskFacts.unexpected_property");
console.log(`${rejectsUnknownProperty ? "PASS" : "FAIL"} rejects_unknown_taskfact_property`);
if (rejectsUnknownProperty) passed += 1;

const duplicateFactor = resolveRisk({ taskFacts: { change_type: "migration", risk_factors: ["database_migration"] } });
const duplicateFactorSources = duplicateFactor.risk?.factors.find((factor) => factor.code === "database_migration")?.sources;
const preservesAllSources = JSON.stringify(duplicateFactorSources) === JSON.stringify(["taskFacts.change_type", "taskFacts.risk_factors"]);
console.log(`${preservesAllSources ? "PASS" : "FAIL"} duplicate_factor_preserves_all_sources`);
if (preservesAllSources) passed += 1;

console.log(`Risk resolution fixture suite: ${passed}/${cases.length + 4} passed`);
process.exitCode = passed === cases.length + 4 ? 0 : 1;
