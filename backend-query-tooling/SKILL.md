---
name: backend-query-tooling
description: Use this skill whenever working on backend database queries, list endpoints, loops over records, relation loading, N+1 query risks, bulk queries, whereIn/IN clauses, formatter setup, linter setup, Node.js backend tooling, Bun backend tooling, integration tests, or Swagger/OpenAPI request/response docs. It focuses on avoiding N+1 queries, using bulk loading and whereIn when looping, preferring Biome or Oxlint instead of ESLint for Node/Bun, keeping only integration test files written at the end, and keeping Swagger docs accurate.
---

# Backend Query Tooling

Use this skill for backend performance, tooling, tests, and API documentation concerns. Keep broader backend planning in `planning-backend`.

## Formatter and Linter

Backend projects need a formatter and linter path.

For Node.js or Bun projects, prefer Biome or Oxlint. Avoid adding ESLint unless the project already uses ESLint and replacing it is outside the task scope.

Use existing scripts first: `format`, `lint`, `check`, `typecheck`, `test:integration`, or `test`.

For Bun projects, prefer Bun-compatible commands. For Node.js projects, match the existing package manager.

## Integration Tests Only

Only create or update integration test files unless the user explicitly asks for another test type or the repository already has a mandatory generated test pattern.

Write integration tests at the end, after routes, services, repositories, DTOs, validation, Swagger docs, and wiring are stable.

## Avoid N+1 Queries

Before writing repository or service loops that fetch related data, check whether the data can be loaded with one query, eager loading, a join, a bulk query, or `whereIn`/`IN`.

Use this pattern:

```text
Bad: for each order -> query user by order.userId
Good: collect userIds -> users whereIn userIds -> map users by id

Bad: for each product -> query stock by product.id
Good: collect productIds -> stocks whereIn productIds -> group by productId
```

Keep ORM/query details in repositories or service layer, not controllers.

## Swagger/OpenAPI

If Swagger/OpenAPI exists, update request body, response body, params, query parameters, status codes, and auth requirements when adding or changing endpoints.

Do not document vague response bodies like `object` when DTOs or schemas exist.

Do not include password hashes, tokens, secrets, or internal fields in examples unless the endpoint truly returns them.

## Output Expectations

Mention how N+1 was avoided, which formatter/linter was used, whether Swagger docs were updated, which integration tests were added/updated, and which validation commands ran.
