# Validation

## Purpose

Validation prompts and validation report templates live here.

## Contents

Place non-runtime validation prompts, validation checklists, and validation report templates here.

`v3_config_schema/` contains non-runtime fixtures and their compact expected-result manifest for the V3 configuration schemas.

## V3 Configuration Validation

From the logical repository root, validate a known configuration path with:

~~~text
npm --prefix docs/ai/tools run validate-config -- docs/ai/config/runtime_config.yaml
~~~

Use `--type repository_runtime_config`, `--type stp_config`, or `--type capability_registry` for paths that cannot be inferred. Validate an STP configuration against repository preferences with:

~~~text
npm --prefix docs/ai/tools run validate-config -- docs/ai/pbi/STP-XXXX/config.yaml --type stp_config --repository docs/ai/config/runtime_config.yaml
~~~

The validator runs parsing, schema/custom checks, then a small policy stage. A policy failure returns exit code `1` with `policy_validation: failed`; malformed input skips policy interpretation. Run the fixture suite with:

~~~text
npm --prefix docs/ai/tools run validate-config-fixtures
~~~

Exit code `0` means a requested document is valid or the fixture suite matched its expectations; `1` means a requested configuration is schema-, custom-, or policy-invalid; `2` means invalid invocation, an internal validator error, or a fixture mismatch. `--json` provides compact machine-readable results. This policy stage validates only the bounded configuration constraints documented by its fixtures; it is not an effective configuration resolver.

## Usage Rule

Read this folder only when the user explicitly asks for validation material or AI OS maintenance.
