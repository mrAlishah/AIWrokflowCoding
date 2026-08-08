# Validation Guide

## Principles

- Validate every external boundary.
- Never export or persist final output when blocking errors exist.
- Make every error actionable.
- Keep warnings visible but non-blocking unless correctness is at risk.

## Common Validations

| Validation | Meaning | How To Fix |
|---|---|---|
| Required field missing | A required value is empty. | Fill the value or remove the invalid item. |
| Duplicate ID | Two records use the same identifier. | Make IDs unique. |
| Invalid reference | A record points to missing data. | Add the missing data or fix the reference. |
| Invalid value | A value is outside the allowed mapping. | Use one of the configured values. |
| Export blocked | Final validation failed. | Fix all errors and run validation again. |
