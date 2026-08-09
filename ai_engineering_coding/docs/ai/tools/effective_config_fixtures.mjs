import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";
import { validateConfig } from "./validate_config.mjs";
import { resolveEffectiveConfig } from "./effective_config.mjs";
import { resolveFromOptions } from "./resolve_config.mjs";
const directory = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "reference", "validation", "v3_config_schema");
const valueAt = (value, dotted) => dotted.split(".").reduce((current, key) => current?.[key], value);
async function data(file) { return parseDocument(await readFile(path.join(directory, file), "utf8"), { schema: "core", merge: false, uniqueKeys: true }).toJS({ maxAliasCount: 0 }); }
const manifest = await data("effective_config_cases.yaml");
let passed = 0;
for (const testCase of manifest.cases) {
  const repositoryPath = testCase.repository_fixture && path.join(directory, testCase.repository_fixture);
  const stpPath = testCase.stp_fixture && path.join(directory, testCase.stp_fixture);
  const capabilitiesPath = testCase.capabilities_fixture && path.join(directory, testCase.capabilities_fixture);
  const repository = repositoryPath && await validateConfig(repositoryPath, "repository_runtime_config", undefined, capabilitiesPath);
  const stp = stpPath && await validateConfig(stpPath, "stp_config", repositoryPath, capabilitiesPath);
  const blocked = (repository && repository.status !== "valid") || (stp && stp.status !== "valid");
  const result = blocked ? { status: "blocked" } : resolveEffectiveConfig({ repositoryConfig: stp?.repository_data ?? repository?.parsed_data, stpConfig: stp?.parsed_data, policyTrace: stp?.policy_trace ?? repository?.policy_trace });
  const ok = result.status === testCase.expected_status && (!testCase.expected_value_path || valueAt(result.effective_config, testCase.expected_value_path) === testCase.expected_value) && (!testCase.expected_source_path || result.source_trace[testCase.expected_source_path] === testCase.expected_source);
  console.log(`${ok ? "PASS" : "FAIL"} ${testCase.id}`); if (ok) passed += 1;
}
let readCount = 0;
const validationReadCount = 4;
const virtualRepository = "/virtual/effective-config-repository.yaml";
const virtualStp = "/virtual/effective-config-stp.yaml";
const guardedReader = async (file, ...args) => { readCount += 1; if (readCount > validationReadCount) throw new Error("POST_VALIDATION_READ"); if (file === virtualRepository) return readFile(path.join(directory, "policy_repository_learning_detailed.yaml"), ...args); if (file === virtualStp) return readFile(path.join(directory, "policy_valid_stp_override_learning.yaml"), ...args); return readFile(file, ...args); };
const noReparse = (await resolveFromOptions({ repository: virtualRepository, stp: virtualStp }, guardedReader)).effective_config.learning.mode === "off" && readCount === validationReadCount;
console.log(`${noReparse ? "PASS" : "FAIL"} no_post_validation_reparse reads=${readCount} post_validation_reads=${Math.max(0, readCount - validationReadCount)}`); if (noReparse) passed += 1;
console.log(`Effective config fixture suite: ${passed}/${manifest.cases.length + 1} passed`);
process.exitCode = passed === manifest.cases.length + 1 ? 0 : 1;
