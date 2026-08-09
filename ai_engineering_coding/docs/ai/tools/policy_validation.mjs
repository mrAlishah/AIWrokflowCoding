const orderedPreferences = {
  "workflow.design_review": ["disabled_when_permitted", "risk_based", "required"],
  "workflow.independent_review": ["risk_based", "required", "strict"],
  "workflow.security_review": ["risk_based", "required"]
};

const mandatoryMinimums = {
  "workflow.design_review": "risk_based",
  "workflow.independent_review": "risk_based",
  "workflow.security_review": "risk_based"
};

function valueAtPath(configuration, dottedPath) {
  return dottedPath.split(".").reduce((value, segment) => value?.[segment], configuration);
}

function preferenceRank(dottedPath, value) {
  return orderedPreferences[dottedPath]?.indexOf(value) ?? -1;
}

function policyFinding({ code, path, strongerSource, attemptedValue, requiredValue }) {
  return {
    code,
    path,
    message: `configuration value weakens ${strongerSource} requirements`,
    stronger_source: strongerSource,
    attempted_value: attemptedValue,
    required_minimum: requiredValue,
    suggestion: `Use ${requiredValue} or a stricter permitted value.`
  };
}

function enforceMinimums(configuration, source, findings) {
  for (const [dottedPath, requiredValue] of Object.entries(mandatoryMinimums)) {
    const attemptedValue = valueAtPath(configuration, dottedPath);
    if (attemptedValue === undefined || preferenceRank(dottedPath, attemptedValue) >= preferenceRank(dottedPath, requiredValue)) continue;
    findings.push(policyFinding({
      code: "POLICY_FORBIDDEN_OVERRIDE",
      path: dottedPath,
      strongerSource: source,
      attemptedValue,
      requiredValue
    }));
  }
}

export function validatePolicy({ repositoryConfig, stpConfig }) {
  const findings = [];
  if (repositoryConfig) enforceMinimums(repositoryConfig, "mandatory_governance", findings);

  if (stpConfig) {
    for (const dottedPath of Object.keys(orderedPreferences)) {
      const attemptedValue = valueAtPath(stpConfig, dottedPath);
      if (attemptedValue === undefined) continue;
      const repositoryValue = repositoryConfig ? valueAtPath(repositoryConfig, dottedPath) : undefined;
      const requiredValue = repositoryValue ?? mandatoryMinimums[dottedPath];
      if (requiredValue === undefined || preferenceRank(dottedPath, attemptedValue) >= preferenceRank(dottedPath, requiredValue)) continue;
      findings.push(policyFinding({
        code: repositoryValue === undefined ? "POLICY_FORBIDDEN_OVERRIDE" : "POLICY_WEAKENING",
        path: dottedPath,
        strongerSource: repositoryValue === undefined ? "mandatory_governance" : "repository_runtime_config",
        attemptedValue,
        requiredValue
      }));
    }
  }

  return {
    policy_validation: findings.length === 0 ? "passed" : "failed",
    errors: findings,
    trace: {
      source_layers: ["mandatory_governance", ...(repositoryConfig ? ["repository_runtime_config"] : []), ...(stpConfig ? ["stp_config"] : [])],
      rejected_overrides: findings.map(({ path, stronger_source, attempted_value, required_minimum }) => ({ path, stronger_source, attempted_value, required_minimum }))
    }
  };
}
