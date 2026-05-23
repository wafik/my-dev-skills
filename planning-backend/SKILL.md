---
name: planning-backend
description: Use this skill whenever planning or implementing backend work in a backend folder, backend API, server-side feature, service layer, repository layer, controller, module, domain folder, shared utility, profile endpoint, update profile flow, update password flow, Redis cache, formatter, linter, Node.js backend, Bun backend, integration test, database query, Swagger/OpenAPI docs, or backend refactor. It guides Claude to structure backend code by business domain, keep reusable shared services outside feature-specific folders, use Redis caching for get-profile data when profile endpoints are involved, avoid N+1 queries with bulk/whereIn patterns, prefer Biome or Oxlint instead of ESLint for Node/Bun linting, keep only integration test files and write them at the end, document accurate Swagger request/response bodies when Swagger exists, avoid duplication, and preserve existing project conventions. Use it even when the user simply says to add or fix backend code, because backend changes often need modular boundaries, shared service placement, query performance checks, tooling consistency, and accurate API behavior.
---

# Planning Backend

Use this skill to plan, implement, or refactor backend code into clear domain modules with reusable shared services. The goal is a backend folder that stays easy to extend: domain code owns business-specific behavior, while cross-cutting or reusable behavior lives in shared infrastructure.

## Core Approach

Start by reading the existing backend structure before editing. Preserve the stack, naming style, dependency injection pattern, routing style, validation approach, and test conventions already used in the project.

Prefer the smallest correct change. Add structure only when the current task needs it or when duplication is already appearing.

Organize by business capability first, not by technical layer globally. A domain such as `users`, `orders`, `payments`, or `inventory` should contain the code that changes together for that capability.

Put reusable services in a shared location only when they are genuinely reusable by multiple domains or are not part of one domain's business language.

## Recommended Folder Shape

Adapt names to the framework already used by the project.

```text
backend/
  src/
    modules/
      users/
        users.controller.*
        users.service.*
        users.repository.*
        users.dto.*
        users.validation.*
        users.types.*
        users.module.*
        tests/
      orders/
        orders.controller.*
        orders.service.*
        orders.repository.*
        orders.dto.*
        orders.validation.*
        orders.types.*
        orders.module.*
        tests/
    shared/
      services/
      repositories/
      middleware/
      guards/
      errors/
      config/
      database/
      logging/
      validation/
      types/
      utils/
```

Use existing equivalents if the codebase uses names like `features/`, `domains/`, `app/`, `common/`, `lib/`, or `core/`. Do not rename broad project structure unless the user asks for a refactor.

## Placement Rules

Keep code inside a domain module when it speaks that domain's language or encodes that domain's business rules.

Move code to `shared/` or the project's equivalent only when it is framework infrastructure, cross-cutting behavior, or a stable reusable capability used by more than one domain.

Avoid a generic dumping ground. A shared function or service should have a clear responsibility and a narrow public interface.

Prefer dependencies flowing inward like this:

```text
controller/route -> domain service -> repository/external client
domain module -> shared service
shared service -> lower-level infrastructure
shared service should not depend on a specific domain module
```

If two domains need to coordinate, prefer an application-level service, event, command handler, or explicit orchestration layer instead of making one domain reach into another domain's internals.

## Domain Module Contents

Controllers or route handlers should stay thin. They should parse request input, call a service or use case, and map responses or errors.

Services or use cases should hold business workflow and decision logic. They can coordinate repositories, external clients, and shared services.

Repositories should isolate persistence details. Keep raw SQL, ORM query details, and database mapping out of controllers.

DTOs, schemas, validators, and types should live near the domain when they are domain-specific. Put common validation helpers in shared validation only when reused.

Tests should sit near the module when the project supports it, or follow the existing test folder convention.

Only create or update integration test files unless the user explicitly asks for another test type or the repository already has a mandatory generated test pattern. Work on integration tests at the end of the implementation, after routes, services, repositories, DTOs, validation, Swagger docs, and wiring are stable.

## Formatter, Linter, and Test Tooling

Backend projects must have a formatter and linter path. For Node.js or Bun projects, prefer Biome or Oxlint. Avoid adding ESLint unless the project already uses ESLint and replacing it is outside the task scope.

Use existing scripts first. Look for scripts such as `format`, `lint`, `check`, `typecheck`, `test:integration`, or `test` in the package manager configuration.

If tooling is missing and the user asks to set up backend standards, add the smallest appropriate setup:

```text
Node.js/Bun formatter -> Biome formatter or existing formatter
Node.js/Bun linter -> Oxlint or Biome lint
Avoid new ESLint setup -> use only if already established in the repo
```

For Bun projects, prefer Bun-compatible commands and package scripts. For Node.js projects, match the existing package manager (`npm`, `pnpm`, or `yarn`).

When editing code, run formatting and linting if scripts exist and the task size justifies it. If commands cannot run, explain why.

## Database Query Performance

Avoid N+1 queries. Before writing repository or service loops that fetch related data, check whether the data can be loaded with one query, an eager-loading include, a join, a bulk query, or a `whereIn`/`IN` clause.

When looping over records, do not run one database query per item unless the dataset is guaranteed tiny and there is no practical bulk API. Prefer collecting ids and performing a single bulk fetch.

Common patterns:

```text
Bad: for each order -> query user by order.userId
Good: collect userIds -> users whereIn userIds -> map users by id

Bad: for each product -> query stock by product.id
Good: collect productIds -> stocks whereIn productIds -> group by productId
```

Keep bulk-query mapping logic in the repository or service layer based on existing project conventions. Avoid leaking ORM-specific details into controllers.

When adding list endpoints, consider pagination, filtering, sorting, and relation loading together so performance stays predictable.

## Swagger and API Documentation

If the backend already uses Swagger/OpenAPI, update the Swagger metadata when adding or changing endpoints. Request body, response body, params, query parameters, status codes, and auth requirements should match the actual DTOs and runtime behavior.

Do not document vague response bodies like `object` when concrete DTOs or schemas are available. Keep examples realistic and avoid including sensitive fields such as password hashes, tokens, secrets, or internal-only fields unless the endpoint truly returns them.

When changing validation rules, update Swagger request schemas at the same time so generated API docs remain trustworthy.

## Shared Services

Good shared services include email sending, password hashing, token signing, file storage, date/time providers, logging, database connection helpers, queue clients, HTTP clients, error classes, configuration, auth middleware, and validation primitives.

Redis/cache clients and cache helper services are shared infrastructure. Keep Redis connection setup, key helpers, TTL defaults, serialization, and cache invalidation helpers outside domain modules unless the project already has a more specific convention.

Poor shared services include vague classes like `CommonService`, `HelperService`, `BackendService`, or `DataService` that collect unrelated behavior.

When creating a shared service:

1. Give it a specific name based on capability.
2. Keep its interface small.
3. Hide vendor/framework details behind the service when useful.
4. Inject or pass it into domain services using the project's existing pattern.
5. Add tests or update existing tests when behavior is important.

## Profile, Password, and Redis Cache

When adding profile endpoints, keep profile business behavior in the owning domain, usually `users`, `auth`, or `profile` depending on the existing project language. Do not create a separate profile module if the codebase already clearly owns profile data in `users` or `auth`.

For get-profile endpoints, use Redis cache when Redis is available or requested. The profile service should read from cache first, fall back to the repository/database on cache miss, then write a sanitized profile payload back to cache with a reasonable TTL.

Use cache keys that are specific and easy to invalidate, such as `profile:{userId}`. Do not cache passwords, password hashes, reset tokens, refresh tokens, secrets, or sensitive auth state in the profile payload.

Invalidate or refresh the profile cache after update-profile succeeds. If update-password changes any field included in the cached profile, invalidate the profile cache there too; otherwise keep password cache behavior separate from profile data.

For update-profile endpoints:

1. Validate allowed fields explicitly.
2. Prevent users from updating protected fields such as id, role, password, email verification status, or audit fields unless the existing authorization rules allow it.
3. Persist through the user/profile repository.
4. Return a sanitized profile response.
5. Invalidate or refresh `profile:{userId}` in Redis after a successful update.

For update-password endpoints:

1. Require the authenticated user context.
2. Validate current password, new password, and confirmation when applicable.
3. Verify the current password with the existing password hashing service.
4. Hash the new password through the shared password hasher.
5. Persist only the password hash, never the raw password.
6. Consider revoking sessions or refresh tokens if the project already supports session invalidation.
7. Return a minimal success response and avoid returning password-related data.

Profile endpoints usually follow this dependency flow:

```text
profile/users controller -> profile/users service -> users repository
profile/users service -> shared cache service -> Redis
profile/users service -> shared password hasher for update password
```

## Implementation Workflow

1. Inspect backend folders, imports, naming conventions, dependency patterns, and tests.
2. Identify the domain affected by the user request.
3. Place new files in that domain unless the behavior is clearly reusable or cross-cutting.
4. Reuse existing shared services before creating new ones.
5. If duplicated code exists in multiple domains, extract the smallest reusable shared service or helper.
6. Keep controllers/routes thin and put workflow in domain services/use cases.
7. Keep persistence in repositories or data access files if the project already uses that pattern.
8. For get-profile endpoints, use Redis cache when available/requested and invalidate profile cache after profile updates.
9. For update-password endpoints, use the shared password hashing/verification service and avoid returning sensitive data.
10. Check repository/service code for N+1 query risk; use bulk queries, eager loading, joins, or `whereIn` when looping over related data.
11. If Swagger/OpenAPI exists, update request and response documentation to match the implemented DTOs and behavior.
12. Update exports, module registration, dependency injection wiring, and routes consistently.
13. Add or update only integration test files, and do this at the end after implementation and docs are stable.
14. Run formatter and linter scripts when available; for Node.js or Bun prefer Biome or Oxlint and avoid introducing ESLint.
15. Run the narrowest relevant validation command available, such as integration tests, typecheck, lint, format check, or the backend test script.

## Refactoring Guidance

When asked to refactor a backend folder into modular domains, do it incrementally.

First map the current structure and identify natural domains from routes, models, tables, entities, or API names. Then move one domain at a time, updating imports and tests after each move when practical.

Avoid mixing behavior changes with structural moves unless required. If a bug fix is requested, fix the bug with minimal structural improvement rather than a large reorganization.

When extracting shared code, choose a name that describes the reusable capability rather than the original domain. For example, extract `PasswordHasher` from `users` instead of creating `UserPasswordHelper` in shared.

## Output Expectations

When making changes, briefly explain:

1. Which domain the change belongs to.
2. Which code was placed in shared services and why.
3. How dependencies flow between controller, service, repository, and shared services.
4. How N+1 queries were avoided or why the query shape is safe.
5. Whether Swagger/OpenAPI request and response bodies were updated or not present.
6. Which formatter/linter was used or why it could not be run.
7. Which integration tests were added or updated, or why tests were not changed.
8. What validation was run, or why validation could not be run.

If the user asks for a proposed structure instead of code changes, provide a concise folder tree and explain where reusable services should live.

## Examples

**Adding forgot password**

Put reset-token business rules in `modules/auth` or `modules/users` depending on existing ownership. Put email delivery in `shared/services/email` if email can be reused for other domains. Put token hashing in a shared crypto or token service if already used elsewhere.

**Adding get profile, update profile, and update password**

Put profile behavior in `modules/users`, `modules/auth`, or `modules/profile` based on existing ownership. Use Redis through a shared cache service for `getProfile`, with a key such as `profile:{userId}` and a sanitized cached payload. Invalidate or refresh that key after `updateProfile`. Keep password verification and hashing in a shared password service, and make `updatePassword` verify the current password before saving the new hash.

**Adding order checkout**

Put checkout workflow in `modules/orders` or `modules/checkout`. Put payment gateway integration in `shared/services/payments` only if multiple domains need it or the project treats gateways as infrastructure. Keep order persistence in the order repository.

**Adding list endpoint with related data**

Avoid querying related records inside a loop. Collect ids from the main query, fetch related rows with `whereIn` or the ORM's bulk include pattern, then map the related rows by id before building the response.

**Adding Swagger-documented endpoint**

When adding a create or update endpoint, document the actual request DTO and response DTO. Keep Swagger examples aligned with validation rules and never include password hashes or internal secrets in documented responses.

**Adding tooling for Node.js or Bun backend**

Use Biome or Oxlint for linting/formatting when setting up new tooling. Do not introduce ESLint unless the project already uses it and the task is to maintain the existing setup.

**Refactoring duplicated file upload code**

Extract storage provider logic to `shared/services/storage`. Keep domain-specific file rules, such as allowed document types for invoices or avatars, inside each domain.
