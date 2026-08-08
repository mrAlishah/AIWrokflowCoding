# Coding Standards

Reusable coding standards observed in this repository.

## Naming Conventions

- C# interfaces use `I` prefix; `.editorconfig` treats violations as errors.
- C# private fields use `_camelCase`; `.editorconfig` treats violations as errors.
- C# uses 4-space indentation; frontend JS/Vue/SCSS/JSON uses 2-space indentation.
- Backend vertical-slice names usually repeat the domain name: `FooController`, `IFooService`, `FooService`, `IFooRepository`, `FooRepository`, `FooDto`, `FooDtoValidator`.
- Frontend domain helpers use `useFoo` composables in `FooComposable.js`.
- Frontend stores use Pinia setup stores named `useFooStore`.
- Translation keys use `l_...` naming and should be added consistently to both `en.json` and `de.json`; review coverage for changed translation keys is governed by CP-003 in `docs/ai/repo-context/code-policies.md`.

## File Organization

- Keep backend contracts/shared types in `Web.Core`; do not put business implementations there unless the existing pattern for that type already does.
- Put repository implementations in `Web.Data`.
- Put business service implementations in `Web.Services`.
- Put HTTP controllers in `Web-Suite/Controllers`.
- Put AutoMapper profiles/resolvers in `Web-Suite/MappingProfiles`.
- Put frontend API wrappers in `src/services`, state in `src/store/stores`, view shells in `src/views`, reusable UI in `src/components`, and reusable logic in `src/Composables`.
- Match existing area folders for asset management, BIA, data protection, emergency planning, reports, settings, users, and catalog work.

## Implementation Patterns

- Controllers generally inject a service, validate `ModelState` where needed, call service methods, return `Ok`/`BadRequest` with translation-key messages, catch `Exception`, log with Serilog and a GUID-like marker, then return HTTP 500.
- Backend authorization uses `[Authorize]` plus custom policy attributes such as `MultiplePoliciesAuthorize`.
- Service methods commonly enforce tenant/user context through `IIdentityClaimService`.
- Repository query methods usually compose EF queries with `Include`, `ThenInclude`, `Where`, optional `AsNoTracking`, paging, and sorting.
- Use `BaseResult` for service outcomes when the existing service pattern does so.
- File-upload endpoints use multipart `FormData` on the frontend and `[FromForm]` DTOs containing `IFormFile` on the backend; keep validation messages as translation keys when following the existing catalog import pattern.
- Validators use FluentValidation and may query `WebSuiteContext`; register validators in `Startup.cs`.
- Frontend API modules call the shared `api` instance and pass `authHeader()` for authenticated endpoints.
- Frontend stores wrap service calls and keep local edit state in `reactive` state with computed getters.
- Frontend route permissions are checked client-side in `router.beforeEach`; backend policy checks are still required.

## Active Code Policies

Canonical policy source:

```text
docs/ai/repo-context/code-policies.md
```

Use this file for approved global code policies such as CP-001. Keep `coding_standards.md` focused on repository conventions and concise pointers.

## Documentation Standards

- Keep markdown simple and reusable.
- Prefer concise operational notes over full source excerpts.
- Report markdown changes under `Markdown Files Changed`.

## Tooling Notes

- Root `package.json` only defines repo-level dev dependencies and `prepare`; frontend scripts are in `Web-Suite/clientapp/package.json`.
- Do not run `npx eslint` unless explicitly requested by the user.
- Frontend lint command from package scripts is `npm run lint` from `Web-Suite/clientapp`; pre-commit uses `eslint --fix --config ./Web-Suite/clientapp/eslint.config.js`.
- Backend analyzers are configured in `Directory.Build.props`; `DebugFast` disables analyzers for faster builds.
- `.editorconfig` enables StyleCop/Sonar/code-style rules and treats unused C# code/imports as errors.
