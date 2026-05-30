# Step 6 - Create User Guides

Implement Step 6 of V2.

Goal:
Create short operational user guides.

Rules:

- Do not modify source code.
- Only update docs/ai/.
- Keep guides practical and short.
- Report all markdown changes.

Create/update:

docs/ai/pbi/README.md
docs/ai/reviews/README.md

PBI guide must explain:

- ChatGPT creates Approved PBI
- pbi-workspace-create
- pbi-plan-create
- implementation-phase
- review-phase
- fix-phase
- pbi-final-handoff

Review guide must explain:

- user checks out branch manually
- BASE_BRANCH is target branch such as develop/main
- review-workspace-create
- review-diff-analysis
- review-comments-create
- review-followup
- review-final-handoff
- review never modifies source code
