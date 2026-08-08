# PR Prompt Help

## Purpose

This folder contains ready-to-run prompt forms for PR work.

## How To Use

1. Open the prompt that matches the skill you need.
2. Replace parameter values only.
3. Keep each parameter name unchanged.
4. Execute one prompt at a time.

## Prompt Types

- `00-pr-review-all-in-one.prompt.md`: supported all-in-one local PR/code review through `pr_review_workflow`.
- `.prompt.md`: full ready-to-run prompt with read path, constraints, expected updates, and final response format.
- `-short.prompt.md`: shorter daily-use prompt with the same parameters.
- `.help.en.md`: English help with parameter meanings, allowed values, defaults, examples, rules, mistakes, and token tips.
- `.help.fa.md`: Persian help with the same parameter names and allowed values.
- `.help.md`: compatibility help file.

## Parameter Rules

Each prompt uses one parameter per field. Do not combine parameter names. If a parameter has fixed options, the prompt lists those options inline and the matching help files explain them.

## Common Prompt Usage Mistakes

- Leaving sample IDs unchanged.
- Adding undocumented parameters.
- Running multiple skills in one request.
- Asking for all docs, all skills, or the whole repository.

## Runtime Safety

These prompts are non-runtime reference material. They preserve the V2 read path and do not change workflow behavior.
