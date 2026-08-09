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

Use `--type repository_runtime_config`, `--type stp_config`, or `--type capability_registry` for paths that cannot be inferred. Run the fixture suite with:

~~~text
npm --prefix docs/ai/tools run validate-config-fixtures
~~~

Exit code `0` means a requested document is valid or the fixture suite matched its expectations; `1` means a requested configuration is invalid; `2` means invalid invocation, an internal validator error, or a fixture mismatch. `--json` provides compact machine-readable results. Schema validation does not implement policy-aware validation, so schema-valid STP settings may still be rejected by a future policy stage.

## Usage Rule

Read this folder only when the user explicitly asks for validation material or AI OS maintenance.
