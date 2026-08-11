import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { validateRuntimeState } from "./validate_runtime_state.mjs";

export const INITIAL_EXPECTED_REVISION = `sha256:${"0".repeat(64)}`;
export const MAX_RUNTIME_STATE_BYTES = 64 * 1024;
let temporaryCounter = 0;

function result(status, extra = {}) { return { status, ...extra }; }
function error(code) { return [{ code }]; }
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  return value;
}
function revisionProjection(state) {
  const projection = structuredClone(state);
  projection.revision = {};
  return canonicalize(projection);
}
export function calculateRuntimeStateRevision(state) {
  return `sha256:${createHash("sha256").update(JSON.stringify(revisionProjection(state))).digest("hex")}`;
}
export function serializeRuntimeState(state) {
  return YAML.stringify(canonicalize(state), { lineWidth: 0 }).replaceAll("\r\n", "\n").replace(/\n?$/, "\n");
}
function validationFailure(validation, load = false) {
  const unsupported = validation.errors.some((item) => item.code === "RUNTIME_STATE_UNSUPPORTED_VERSION");
  return result(load ? (unsupported ? "unsupported_version" : "invalid_state") : "invalid_state", { errors: validation.errors });
}
async function resolveTarget(repositoryRoot, statePath) {
  if (typeof repositoryRoot !== "string" || !path.isAbsolute(repositoryRoot) || typeof statePath !== "string" || !statePath || path.isAbsolute(statePath)) return result("path_invalid", { errors: error("RUNTIME_STATE_PATH_INVALID") });
  try {
    const root = await realpath(repositoryRoot);
    const target = path.resolve(root, statePath);
    const relative = path.relative(root, target);
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return result("path_invalid", { errors: error("RUNTIME_STATE_PATH_INVALID") });
    return result("resolved", { root, target });
  } catch {
    return result("path_invalid", { errors: error("RUNTIME_STATE_PATH_INVALID") });
  }
}
async function ensureSafeDirectory(root, target) {
  let current = root;
  for (const segment of path.relative(root, path.dirname(target)).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    try { await mkdir(current); } catch (cause) { if (cause?.code !== "EEXIST") return false; }
    try {
      if ((await lstat(current)).isSymbolicLink()) return false;
      const resolved = await realpath(current);
      if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) return false;
    } catch { return false; }
  }
  return true;
}
async function targetIsSafe(root, target) {
  let current = root;
  for (const segment of path.relative(root, path.dirname(target)).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    try {
      if ((await lstat(current)).isSymbolicLink()) return false;
      const resolved = await realpath(current);
      if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) return false;
    } catch (cause) { if (cause?.code === "ENOENT") break; return false; }
  }
  try {
    const metadata = await lstat(target);
    if (metadata.isSymbolicLink()) return false;
    const resolved = await realpath(target);
    return resolved === root || resolved.startsWith(`${root}${path.sep}`);
  } catch (cause) { return cause?.code === "ENOENT"; }
}
async function readResolvedState(root, target, expectedToExist) {
  if (!(await targetIsSafe(root, target))) return result("path_invalid", { errors: error("RUNTIME_STATE_PATH_INVALID") });
  let bytes;
  try {
    const metadata = await stat(target);
    if (metadata.size > MAX_RUNTIME_STATE_BYTES) return result("invalid_state", { errors: error("RUNTIME_STATE_LOAD_INVALID") });
    bytes = await readFile(target, "utf8");
  } catch (cause) {
    if (cause?.code === "ENOENT") return result(expectedToExist ? "expected_state_missing" : "not_initialized", { errors: error(expectedToExist ? "RUNTIME_STATE_EXPECTED_MISSING" : "RUNTIME_STATE_NOT_INITIALIZED") });
    return result("io_error", { errors: error("RUNTIME_STATE_IO_ERROR") });
  }
  try {
    const documents = YAML.parseAllDocuments(bytes, { schema: "core", maxAliasCount: 0, uniqueKeys: true, logLevel: "silent" });
    if (documents.length !== 1 || documents[0].errors.length || documents[0].warnings.length) return result("parse_error", { errors: error("RUNTIME_STATE_PARSE_ERROR") });
    const state = documents[0].toJSON();
    const validation = validateRuntimeState(state);
    if (validation.status !== "valid") return validationFailure(validation, true);
    const revision = calculateRuntimeStateRevision(state);
    if (state.revision.state_revision !== revision) return result("invalid_state", { errors: error("RUNTIME_STATE_LOAD_INVALID") });
    return result("loaded", { state, state_revision: revision });
  } catch {
    return result("parse_error", { errors: error("RUNTIME_STATE_PARSE_ERROR") });
  }
}
export async function loadRuntimeState({ repositoryRoot, statePath, expectedToExist = false } = {}) {
  const pathResult = await resolveTarget(repositoryRoot, statePath);
  if (pathResult.status !== "resolved") return pathResult;
  return readResolvedState(pathResult.root, pathResult.target, expectedToExist);
}
function prepareCandidate(state, create) {
  const initialValidation = validateRuntimeState(state);
  if (initialValidation.status !== "valid") return validationFailure(initialValidation);
  if (create && state.revision.expected_revision !== INITIAL_EXPECTED_REVISION) return result("invalid_state", { errors: error("RUNTIME_STATE_WRITE_INVALID") });
  const candidate = structuredClone(state);
  candidate.revision.state_revision = calculateRuntimeStateRevision(candidate);
  const validation = validateRuntimeState(candidate);
  return validation.status === "valid" ? result("prepared", { state: candidate, state_revision: candidate.revision.state_revision, serialized: serializeRuntimeState(candidate) }) : validationFailure(validation);
}
async function atomicReplace(root, target, serialized, beforeTempWrite) {
  if (Buffer.byteLength(serialized, "utf8") > MAX_RUNTIME_STATE_BYTES) return result("invalid_state", { errors: error("RUNTIME_STATE_WRITE_INVALID") });
  if (!(await ensureSafeDirectory(root, target)) || !(await targetIsSafe(root, target))) return result("path_invalid", { errors: error("RUNTIME_STATE_PATH_INVALID") });
  const temporary = path.join(path.dirname(target), `.${path.basename(target)}.tmp-${process.pid}-${temporaryCounter++}`);
  try {
    if (beforeTempWrite) await beforeTempWrite(temporary);
    await writeFile(temporary, serialized, { encoding: "utf8", flag: "wx", mode: 0o600 });
    await rename(temporary, target);
    return result("written");
  } catch {
    await rm(temporary, { force: true, recursive: true }).catch(() => {});
    return result("io_error", { errors: error("RUNTIME_STATE_IO_ERROR") });
  }
}
/** Stores an already-constructed state only; it performs no transition, HDR creation, authentication, response consumption, workflow, or execution. */
export async function saveRuntimeState({ repositoryRoot, statePath, state, expectedToExist, testHooks = {} } = {}) {
  const create = expectedToExist === false;
  if (typeof expectedToExist !== "boolean") return result("invalid_state", { errors: error("RUNTIME_STATE_WRITE_INVALID") });
  const prepared = prepareCandidate(state, create);
  if (prepared.status !== "prepared") return prepared;
  const pathResult = await resolveTarget(repositoryRoot, statePath);
  if (pathResult.status !== "resolved") return pathResult;
  const initial = await readResolvedState(pathResult.root, pathResult.target, expectedToExist);
  if (create && initial.status === "loaded") return result("revision_conflict", { current_revision: initial.state_revision, errors: error("RUNTIME_STATE_REVISION_CONFLICT") });
  if (create ? initial.status !== "not_initialized" : initial.status !== "loaded") return initial;
  if (!create && state.revision.expected_revision !== initial.state_revision) return result("revision_conflict", { current_revision: initial.state_revision, errors: error("RUNTIME_STATE_REVISION_CONFLICT") });
  if (testHooks.beforeFinalRead) await testHooks.beforeFinalRead();
  const latest = await readResolvedState(pathResult.root, pathResult.target, !create);
  if (create ? latest.status !== "not_initialized" : latest.status !== "loaded") {
    if (create && latest.status === "loaded") return result("revision_conflict", { current_revision: latest.state_revision, errors: error("RUNTIME_STATE_REVISION_CONFLICT") });
    return latest;
  }
  if (!create && state.revision.expected_revision !== latest.state_revision) return result("revision_conflict", { current_revision: latest.state_revision, errors: error("RUNTIME_STATE_REVISION_CONFLICT") });
  const write = await atomicReplace(pathResult.root, pathResult.target, prepared.serialized, testHooks.beforeTempWrite);
  return write.status === "written" ? result(create ? "created" : "updated", { state_revision: prepared.state_revision }) : write;
}
