function providerReferences(configuration, source) {
  const references = [];
  for (const preferenceKind of ["preferred", "fallback"]) {
    for (const [capability, provider] of Object.entries(configuration?.capabilities?.[preferenceKind] ?? {})) {
      references.push({
        capability,
        provider,
        path: `${source}.capabilities.${preferenceKind}.${capability}`
      });
    }
  }
  for (const [index, provider] of (configuration?.security?.preferred_scanners ?? []).entries()) {
    references.push({
      capability: "security_scan",
      provider,
      path: `${source}.security.preferred_scanners.${index}`
    });
  }
  return references;
}

function finding(code, reference, details) {
  return {
    code,
    path: reference.path,
    capability: reference.capability,
    provider: reference.provider,
    ...details
  };
}

export function validateCapabilityReferences({ repositoryConfig, stpConfig, capabilitiesRegistry }) {
  const references = [
    ...providerReferences(repositoryConfig, "repository"),
    ...providerReferences(stpConfig, "stp")
  ];
  if (references.length === 0) return { capability_validation: "not_applicable", errors: [] };

  if (!capabilitiesRegistry) {
    return {
      capability_validation: "failed",
      errors: references.map((reference) => finding("CAP_REGISTRY_REQUIRED", reference, {
        message: "a capability registry is required to validate this provider reference",
        suggestion: "Pass --capabilities <capabilities.yaml>."
      }))
    };
  }

  const providers = new Map();
  for (const [capability, declaration] of Object.entries(capabilitiesRegistry.capabilities ?? {})) {
    for (const provider of declaration.providers ?? []) providers.set(provider.identifier, { capability, provider });
  }

  const errors = [];
  for (const reference of references) {
    if (!capabilitiesRegistry.capabilities?.[reference.capability]) {
      errors.push(finding("CAP_UNKNOWN_CAPABILITY", reference, {
        message: "referenced capability is not declared in the capability registry",
        suggestion: "Declare the capability in the registry or use a declared capability identifier."
      }));
      continue;
    }
    const declared = providers.get(reference.provider);
    if (!declared) {
      errors.push(finding("CAP_UNKNOWN_PROVIDER", reference, {
        message: "referenced provider is not declared in the capability registry",
        suggestion: "Declare the provider in the registry or use a declared provider identifier."
      }));
      continue;
    }
    if (declared.capability !== reference.capability) {
      errors.push(finding("CAP_PROVIDER_MISMATCH", reference, {
        message: "referenced provider is declared for a different capability",
        declared_capability: declared.capability,
        expected_capability: reference.capability,
        suggestion: "Use a provider declared for the referenced capability."
      }));
      continue;
    }
    if (declared.provider.availability === "unavailable") {
      errors.push(finding("CAP_PROVIDER_UNAVAILABLE", reference, {
        message: "referenced provider is explicitly declared unavailable",
        declared_capability: declared.capability,
        suggestion: "Use an available declared provider or update the registry declaration."
      }));
    }
  }

  return { capability_validation: errors.length === 0 ? "passed" : "failed", errors };
}
