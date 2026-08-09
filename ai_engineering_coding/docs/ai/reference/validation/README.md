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

Validate provider preferences against a local capability registry with `--capabilities`:

~~~text
npm --prefix docs/ai/tools run validate-config -- docs/ai/config/runtime_config.yaml --capabilities docs/ai/config/capabilities.yaml
~~~

For STP validation, combine `--repository` and `--capabilities`. The validator runs parsing, schema/custom checks, a small policy stage, then capability-reference validation. Provider references require a supplied registry; the cross-file stage reports `CAP_REGISTRY_REQUIRED`, `CAP_UNKNOWN_CAPABILITY`, `CAP_UNKNOWN_PROVIDER`, `CAP_PROVIDER_MISMATCH`, or `CAP_PROVIDER_UNAVAILABLE` as applicable. Registry availability is declared configuration data only: validation does not probe local tools, network services, or credentials. A policy failure returns exit code `1` with `policy_validation: failed`; malformed input skips later interpretation. Run the fixture suite with:

~~~text
npm --prefix docs/ai/tools run validate-config-fixtures
~~~

Exit code `0` means a requested document is valid or the fixture suite matched its expectations; `1` means a requested configuration is schema-, custom-, or policy-invalid; `2` means invalid invocation, an internal validator error, or a fixture mismatch. `--json` provides compact machine-readable results. This policy stage validates only the bounded configuration constraints documented by its fixtures; it is not an effective configuration resolver.

Resolve validated preferences without selecting providers or authorizing actions with:

~~~text
npm --prefix docs/ai/tools run resolve-config -- --repository docs/ai/config/runtime_config.yaml --stp docs/ai/pbi/STP-XXXX/config.yaml --capabilities docs/ai/config/capabilities.yaml --json
~~~

The resolver returns effective values, per-leaf source trace, and policy rejection trace. Run its fixture suite with `npm --prefix docs/ai/tools run resolve-config-fixtures`.

## Usage Rule

Read this folder only when the user explicitly asks for validation material or AI OS maintenance.
