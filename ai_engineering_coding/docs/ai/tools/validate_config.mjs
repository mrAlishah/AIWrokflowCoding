#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import { parseDocument } from "yaml";
import { validatePolicy } from "./policy_validation.mjs";
import { validateCapabilityReferences } from "./capability_validation.mjs";

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));
const docsDirectory = path.resolve(toolDirectory, "..");
const schemaDirectory = path.join(docsDirectory, "config", "schema");
const fixtureDirectory = path.join(docsDirectory, "reference", "validation", "v3_config_schema");
const secretFieldNames = new Set(["token", "secret", "password", "api_key", "private_key", "credential"]);

const schemas = {
  repository_runtime_config: "runtime_config.schema.json",
  stp_config: "stp_config.schema.json",
  capability_registry: "capabilities.schema.json"
};

class ValidatorInvocationError extends Error {
  constructor(message) {
    super(message);
    this.code = "CFG_INVALID_INVOCATION";
  }
}

function usage() {
  return [
    "Usage:",
    "  node docs/ai/tools/validate_config.mjs <config-path> [--type <document-type>] [--repository <runtime-config-path>] [--capabilities <capabilities-path>] [--json]",
    "  node docs/ai/tools/validate_config.mjs --fixtures [--json]",
    "",
    "Document types: repository_runtime_config, stp_config, capability_registry"
  ].join("\n");
}

function parseArguments(argumentsList) {
  const options = { json: false, fixtures: false, type: undefined, typeProvided: false, repository: undefined, repositoryProvided: false, capabilities: undefined, capabilitiesProvided: false, file: undefined };
  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];
    if (argument === "--json") options.json = true;
    else if (argument === "--fixtures") options.fixtures = true;
    else if (argument === "--type") {
      const requestedType = argumentsList[index + 1];
      if (!requestedType || requestedType.startsWith("--")) throw new ValidatorInvocationError("--type requires a document type.");
      options.type = requestedType;
      options.typeProvided = true;
      index += 1;
    } else if (argument === "--repository") {
      const repository = argumentsList[index + 1];
      if (!repository || repository.startsWith("--")) throw new ValidatorInvocationError("--repository requires a runtime configuration path.");
      options.repository = repository;
      options.repositoryProvided = true;
      index += 1;
    } else if (argument === "--capabilities") {
      const capabilities = argumentsList[index + 1];
      if (!capabilities || capabilities.startsWith("--")) throw new ValidatorInvocationError("--capabilities requires a capability registry path.");
      options.capabilities = capabilities;
      options.capabilitiesProvided = true;
      index += 1;
    } else if (argument === "--help" || argument === "-h") options.help = true;
    else if (!options.file) options.file = argument;
    else throw new ValidatorInvocationError(`Unexpected argument: ${argument}`);
  }
  return options;
}

function normalizeDocumentType(value) {
  const aliases = {
    runtime: "repository_runtime_config",
    repository_runtime_config: "repository_runtime_config",
    stp: "stp_config",
    stp_config: "stp_config",
    capabilities: "capability_registry",
    capability_registry: "capability_registry"
  };
  return aliases[value];
}

function inferDocumentType(filePath) {
  const normalized = filePath.split(path.sep).join("/");
  if (normalized.endsWith("/docs/ai/config/runtime_config.yaml")) return "repository_runtime_config";
  if (normalized.endsWith("/docs/ai/config/capabilities.yaml")) return "capability_registry";
  if (/\/docs\/ai\/pbi\/[^/]+\/config\.yaml$/.test(normalized)) return "stp_config";
  return undefined;
}

function pointerToPath(pointer, property) {
  const segments = pointer.split("/").filter(Boolean).map((segment) => segment.replace(/~1/g, "/").replace(/~0/g, "~"));
  if (property) segments.push(property);
  return segments.join(".") || "<root>";
}

function valueAtPointer(value, pointer) {
  return pointer.split("/").filter(Boolean).reduce((current, segment) => {
    if (current === undefined || current === null) return undefined;
    return current[segment.replace(/~1/g, "/").replace(/~0/g, "~")];
  }, value);
}

function isSecretPath(value) {
  return value.split(".").some((segment) => secretFieldNames.has(segment));
}

function levenshtein(left, right) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let previous = row[0];
    row[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const current = row[rightIndex];
      row[rightIndex] = Math.min(row[rightIndex] + 1, row[rightIndex - 1] + 1, previous + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[right.length];
}

function schemaNodeForError(schema, schemaPath) {
  const segments = schemaPath.replace(/^#\//, "").split("/").filter(Boolean);
  if (segments.at(-1) === "additionalProperties") segments.pop();
  return segments.reduce((current, segment) => current?.[segment.replace(/~1/g, "/").replace(/~0/g, "~")], schema);
}

function unknownKeySuggestion(schema, error) {
  const unknown = error.params.additionalProperty;
  const candidates = Object.keys(schemaNodeForError(schema, error.schemaPath)?.properties ?? {});
  const closest = candidates
    .map((candidate) => ({ candidate, distance: levenshtein(unknown, candidate) }))
    .sort((left, right) => left.distance - right.distance)[0];
  if (closest && closest.distance <= Math.max(2, Math.floor(unknown.length / 4))) return closest.candidate;
  return undefined;
}

function mapSchemaError(documentType, schema, data, error) {
  const property = error.keyword === "additionalProperties" ? error.params.additionalProperty : undefined;
  const findingPath = pointerToPath(error.instancePath, property);
  const secret = documentType === "capability_registry" && property && secretFieldNames.has(property);
  let code = "CFG_SCHEMA_VALIDATION";
  if (secret) code = "CAP_INLINE_SECRET";
  else if (error.keyword === "additionalProperties") code = documentType === "stp_config" ? "STP_UNKNOWN_KEY" : "CFG_UNKNOWN_KEY";
  else if (error.keyword === "required") code = error.params.missingProperty === "version" ? "CFG_MISSING_VERSION" : documentType === "capability_registry" ? "CAP_MISSING_FIELD" : "CFG_SCHEMA_VALIDATION";
  else if ((error.keyword === "enum" || error.keyword === "const") && findingPath === "version") code = "COMPAT_UNSUPPORTED_VERSION";
  else if (error.keyword === "enum" || error.keyword === "const" || error.keyword === "pattern") code = findingPath.includes("language") || findingPath.startsWith("localization.artifacts") ? "LANG_INVALID" : "CFG_INVALID_VALUE";

  const actualPointer = property ? `${error.instancePath}/${property.replace(/~/g, "~0").replace(/\//g, "~1")}` : error.instancePath;
  const actual = error.keyword === "required" || isSecretPath(findingPath) ? undefined : valueAtPointer(data, actualPointer);
  const finding = {
    code,
    path: findingPath,
    message: error.message ?? "Schema validation failed",
    expected: error.keyword === "enum" ? error.params.allowedValues : error.keyword === "const" ? error.params.allowedValue : error.keyword === "required" ? error.params.missingProperty : undefined
  };
  if (actual !== undefined) finding.actual = actual;
  const suggestion = error.keyword === "additionalProperties" && !secret ? unknownKeySuggestion(schema, error) : undefined;
  if (suggestion) finding.suggestion = suggestion;
  return finding;
}

function findUnsafeKey(value, pathPrefix = "") {
  if (!value || typeof value !== "object") return undefined;
  for (const [key, nestedValue] of Object.entries(value)) {
    const currentPath = pathPrefix ? `${pathPrefix}.${key}` : key;
    if (["__proto__", "constructor", "prototype"].includes(key)) return currentPath;
    const nestedResult = findUnsafeKey(nestedValue, currentPath);
    if (nestedResult) return nestedResult;
  }
  return undefined;
}

function duplicateProviderFindings(data) {
  const findings = [];
  const seen = new Set();
  for (const [capability, declaration] of Object.entries(data?.capabilities ?? {})) {
    for (const provider of declaration?.providers ?? []) {
      if (!provider?.identifier) continue;
      if (seen.has(provider.identifier)) {
        findings.push({
          code: "CAP_DUPLICATE_ID",
          path: `capabilities.${capability}.providers`,
          message: "provider identifier must be unique within the registry",
          actual: provider.identifier,
          expected: "a unique provider identifier"
        });
      }
      seen.add(provider.identifier);
    }
  }
  return findings;
}

async function loadSchema(documentType) {
  const schemaName = schemas[documentType];
  if (!schemaName) throw new Error(`Unsupported document type: ${documentType}`);
  return JSON.parse(await readFile(path.join(schemaDirectory, schemaName), "utf8"));
}

async function parseYaml(filePath) {
  let source;
  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") throw new ValidatorInvocationError(`Configuration file does not exist: ${filePath}`);
    throw error;
  }
  const document = parseDocument(source, {
    schema: "core",
    merge: false,
    uniqueKeys: true,
    prettyErrors: false
  });
  if (document.errors.length > 0) {
    return { errors: document.errors.map((error) => ({ code: "CFG_SYNTAX", path: "<root>", message: error.message })) };
  }
  let data;
  try {
    data = document.toJS({ maxAliasCount: 0 });
  } catch (error) {
    return { errors: [{ code: "CFG_SYNTAX", path: "<root>", message: error.message }] };
  }
  const unsafeKey = findUnsafeKey(data);
  if (unsafeKey) return { errors: [{ code: "CFG_SYNTAX", path: unsafeKey, message: "unsafe YAML key is not allowed" }] };
  return { data };
}

async function validateDocument(filePath, requestedType, inferencePath = filePath) {
  let documentType;
  if (requestedType !== undefined) {
    documentType = normalizeDocumentType(requestedType);
    if (!documentType) throw new ValidatorInvocationError(`Unsupported document type: ${requestedType}`);
  } else {
    documentType = inferDocumentType(path.resolve(inferencePath));
    if (!documentType) throw new ValidatorInvocationError("Document type is required for this path. Pass --type.");
  }

  const parsed = await parseYaml(filePath);
  if (parsed.errors) return { data: undefined, result: { status: "invalid_config", document_type: documentType, schema_validation: "not_run", validator_validation: "invalid", errors: parsed.errors, warnings: [] } };

  const schema = await loadSchema(documentType);
  const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false, validateFormats: false });
  const validate = ajv.compile(schema);
  const schemaValid = validate(parsed.data);
  const errors = schemaValid ? [] : (validate.errors ?? []).map((error) => mapSchemaError(documentType, schema, parsed.data, error));
  if (schemaValid && documentType === "capability_registry") errors.push(...duplicateProviderFindings(parsed.data));

  return { data: parsed.data, result: { status: errors.length === 0 ? "valid" : "invalid_config", document_type: documentType, schema_validation: schemaValid ? "valid" : "invalid", validator_validation: errors.length === 0 ? "valid" : "invalid", errors, warnings: [] } };
}

function laterStagesNotApplicable(result) {
  return { ...result, policy_validation: "not_applicable", policy_trace: undefined, capability_validation: "not_applicable" };
}

async function validateConfig(filePath, requestedType, repositoryPath, capabilitiesPath, inferencePath = filePath) {
  const target = await validateDocument(filePath, requestedType, inferencePath);
  if (target.result.status !== "valid") return laterStagesNotApplicable(target.result);
  if (target.result.document_type === "capability_registry") return laterStagesNotApplicable(target.result);
  if (repositoryPath && target.result.document_type !== "stp_config") throw new ValidatorInvocationError("--repository is only supported when validating an STP configuration.");
  if (capabilitiesPath && !["repository_runtime_config", "stp_config"].includes(target.result.document_type)) throw new ValidatorInvocationError("--capabilities is only supported when validating runtime or STP configuration.");

  let repository;
  if (repositoryPath) {
    repository = await validateDocument(repositoryPath, "repository_runtime_config");
    if (repository.result.status !== "valid") {
      return laterStagesNotApplicable({
        ...target.result,
        status: "invalid_config",
        errors: repository.result.errors.map((finding) => ({ ...finding, path: `repository.${finding.path}` }))
      });
    }
  }

  const policy = validatePolicy({
    repositoryConfig: target.result.document_type === "repository_runtime_config" ? target.data : repository?.data,
    stpConfig: target.result.document_type === "stp_config" ? target.data : undefined
  });
  const policyResult = {
    ...target.result,
    status: policy.policy_validation === "passed" ? "valid" : "invalid_config",
    policy_validation: policy.policy_validation,
    policy_trace: policy.trace,
    errors: [...target.result.errors, ...policy.errors]
  };
  if (policyResult.status !== "valid") return { ...policyResult, capability_validation: "not_applicable" };

  let capabilitiesRegistry;
  if (capabilitiesPath) {
    const capabilities = await validateDocument(capabilitiesPath, "capability_registry");
    if (capabilities.result.status !== "valid") {
      return {
        ...policyResult,
        status: "invalid_config",
        capability_validation: "not_applicable",
        errors: [...policyResult.errors, ...capabilities.result.errors.map((finding) => ({ ...finding, path: `capabilities_registry.${finding.path}` }))]
      };
    }
    capabilitiesRegistry = capabilities.data;
  }
  const capability = validateCapabilityReferences({
    repositoryConfig: target.result.document_type === "repository_runtime_config" ? target.data : repository?.data,
    stpConfig: target.result.document_type === "stp_config" ? target.data : undefined,
    capabilitiesRegistry
  });
  return {
    ...policyResult,
    status: capability.capability_validation === "failed" ? "invalid_config" : policyResult.status,
    capability_validation: capability.capability_validation,
    errors: [...policyResult.errors, ...capability.errors]
  };
}

function printResult(result, asJson) {
  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`${result.document_type}: ${result.status}`);
  for (const finding of result.errors) {
    console.log(`${finding.code} ${finding.path}: ${finding.message}`);
    if (finding.suggestion) console.log(`  suggestion: ${finding.suggestion}`);
  }
  for (const warning of result.warnings) console.log(`${warning.code}: ${warning.message}`);
}

function errorResult(error) {
  return {
    status: "error",
    document_type: null,
    errors: [{
      code: error instanceof ValidatorInvocationError ? error.code : "CFG_VALIDATOR_INTERNAL",
      path: null,
      message: error.message
    }],
    warnings: []
  };
}

function printError(error, asJson) {
  const result = errorResult(error);
  if (asJson) console.log(JSON.stringify(result, null, 2));
  else console.error(`Validator error: ${result.errors[0].message}`);
}

async function runInvocationCase(invocationCase) {
  let result;
  let exitCode;
  try {
    result = await validateConfig(
      path.join(fixtureDirectory, invocationCase.fixture),
      invocationCase.requested_type,
      undefined,
      undefined,
      path.join(docsDirectory, invocationCase.inferred_path)
    );
    exitCode = result.status === "valid" ? 0 : 1;
  } catch (error) {
    result = errorResult(error);
    exitCode = 2;
  }
  const actualCode = result.errors[0]?.code;
  const jsonOutputValid = (() => {
    try {
      JSON.parse(JSON.stringify(result));
      return true;
    } catch {
      return false;
    }
  })();
  const passed = exitCode === invocationCase.expected_exit_code && actualCode === invocationCase.expected_code && (!invocationCase.expect_json || jsonOutputValid);
  return { id: invocationCase.id, passed, expected_exit_code: invocationCase.expected_exit_code, actual_exit_code: exitCode, expected_code: invocationCase.expected_code, actual_code: actualCode, json_output_valid: jsonOutputValid };
}

async function runFixtures(asJson) {
  const manifest = parseDocument(await readFile(path.join(fixtureDirectory, "cases.yaml"), "utf8"), { schema: "core", uniqueKeys: true });
  if (manifest.errors.length > 0) throw new Error(`Fixture manifest is invalid: ${manifest.errors[0].message}`);
  const cases = manifest.toJS({ maxAliasCount: 0 }).cases;
  const invocationCases = manifest.toJS({ maxAliasCount: 0 }).invocation_cases ?? [];
  const results = [];
  for (const fixtureCase of cases) {
    const result = await validateConfig(
      path.join(fixtureDirectory, fixtureCase.fixture),
      fixtureCase.document_type,
      fixtureCase.repository_fixture ? path.join(fixtureDirectory, fixtureCase.repository_fixture) : undefined,
      fixtureCase.capabilities_fixture ? path.join(fixtureDirectory, fixtureCase.capabilities_fixture) : undefined
    );
    const actualSchemaResult = result.schema_validation;
    const actualValidatorResult = result.validator_validation;
    const expectedCode = fixtureCase.expected_code;
    const expectedPolicyCode = fixtureCase.expected_policy_code;
    const actualCodes = result.errors.map((error) => error.code);
    const expectedPolicyValidation = fixtureCase.expected_policy_validation;
    const actualPolicyValidation = result.policy_validation;
    const expectedCapabilityValidation = fixtureCase.expected_capability_validation;
    const actualCapabilityValidation = result.capability_validation;
    const expectedCapabilityCode = fixtureCase.expected_capability_code;
    const passed = actualSchemaResult === fixtureCase.expected_schema_result && actualValidatorResult === fixtureCase.expected_validator_result && (!expectedCode || actualCodes.includes(expectedCode)) && (expectedPolicyValidation === undefined || actualPolicyValidation === expectedPolicyValidation) && (!expectedPolicyCode || actualCodes.includes(expectedPolicyCode)) && (expectedCapabilityValidation === undefined || actualCapabilityValidation === expectedCapabilityValidation) && (!expectedCapabilityCode || actualCodes.includes(expectedCapabilityCode));
    results.push({ fixture: fixtureCase.fixture, repository_fixture: fixtureCase.repository_fixture, capabilities_fixture: fixtureCase.capabilities_fixture, passed, expected_schema_result: fixtureCase.expected_schema_result, actual_schema_result: actualSchemaResult, expected_validator_result: fixtureCase.expected_validator_result, actual_validator_result: actualValidatorResult, expected_code: expectedCode, expected_policy_code: expectedPolicyCode, expected_capability_code: expectedCapabilityCode, actual_codes: actualCodes, expected_policy_validation: expectedPolicyValidation, actual_policy_validation: actualPolicyValidation, expected_capability_validation: expectedCapabilityValidation, actual_capability_validation: actualCapabilityValidation });
  }
  const invocationResults = [];
  for (const invocationCase of invocationCases) invocationResults.push(await runInvocationCase(invocationCase));
  const allResults = [...results, ...invocationResults];
  const summary = { status: allResults.every((result) => result.passed) ? "passed" : "failed", total: allResults.length, passed: allResults.filter((result) => result.passed).length, failed: allResults.filter((result) => !result.passed).length, cases: results, invocation_cases: invocationResults };
  if (asJson) console.log(JSON.stringify(summary, null, 2));
  else {
    for (const result of results) console.log(`${result.passed ? "PASS" : "FAIL"} ${result.fixture}`);
    for (const result of invocationResults) console.log(`${result.passed ? "PASS" : "FAIL"} ${result.id}`);
    console.log(`Fixture suite: ${summary.passed}/${summary.total} passed`);
  }
  return summary;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return 0;
  }
  if (!options.fixtures && !options.file) throw new ValidatorInvocationError("A configuration path or --fixtures is required.");
  if (options.fixtures) {
    if (options.file || options.typeProvided || options.repositoryProvided || options.capabilitiesProvided) throw new ValidatorInvocationError("--fixtures cannot be combined with a file, --type, --repository, or --capabilities.");
    const summary = await runFixtures(options.json);
    return summary.status === "passed" ? 0 : 2;
  }
  if (options.repositoryProvided && options.typeProvided && normalizeDocumentType(options.type) !== "stp_config") throw new ValidatorInvocationError("--repository is only supported when validating an STP configuration with --type stp_config.");
  const result = await validateConfig(path.resolve(options.file), options.type, options.repository ? path.resolve(options.repository) : undefined, options.capabilities ? path.resolve(options.capabilities) : undefined);
  printResult(result, options.json);
  return result.status === "valid" ? 0 : 1;
}

const jsonRequested = process.argv.slice(2).includes("--json");

main().then((exitCode) => { process.exitCode = exitCode; }).catch((error) => {
  printError(error, jsonRequested);
  process.exitCode = 2;
});
