Use skill: review-diff-analysis

Parameters:

STP_ID:
STP-XXXX

BASE_BRANCH:
develop

RISK_MODE:
strict / normal

Diff command:
git diff develop...HEAD

Rules:

- Use local git diff only.
- Do not call PR APIs.
- Do not modify source code.
- Analyze changed files, risks, behavior, tests, architecture, and scope.
- Update only review workspace files.

Output:

- Changed files summary
- Risk analysis
- Files requiring deeper review
- Test/validation gaps
- Markdown Files Changed
- Confirmation source code was not modified
