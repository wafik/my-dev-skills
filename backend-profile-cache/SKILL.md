---
name: backend-profile-cache
description: Use this skill whenever adding or changing backend get profile, update profile, update password, authenticated user profile endpoints, Redis profile cache, password verification, or profile response sanitization. It focuses on placing profile behavior in the correct users/auth/profile domain, using shared Redis cache services for get-profile, invalidating cache after profile updates, and using shared password hashing/verification for update-password. Use this even if the user only says profile, akun, password, or user settings.
---

# Backend Profile Cache

Use this skill for backend profile flows. Keep broader backend planning in `planning-backend`; this skill is the focused checklist for profile/cache/password behavior.

## Placement

Place profile behavior in the existing owner domain, usually `users`, `auth`, or `profile`. Do not create a new profile module if the codebase already clearly owns profile data in `users` or `auth`.

Keep Redis/cache setup in shared infrastructure, not inside the profile module. Keep password hashing and verification in a shared password service when reusable.

## Get Profile With Redis

For get-profile endpoints, use Redis cache when Redis is available or requested.

Use this flow:

1. Build a specific cache key such as `profile:{userId}`.
2. Read sanitized profile payload from Redis.
3. On cache hit, return the cached sanitized payload.
4. On cache miss, fetch from repository/database.
5. Sanitize the profile response.
6. Store the sanitized payload in Redis with a reasonable TTL.
7. Return the sanitized payload.

Never cache passwords, password hashes, reset tokens, refresh tokens, secrets, or sensitive auth state in the profile payload.

## Update Profile

For update-profile endpoints:

1. Require authenticated user context.
2. Validate allowed fields explicitly.
3. Prevent updates to protected fields such as id, role, password, email verification status, or audit fields unless authorization rules allow it.
4. Persist through the user/profile repository.
5. Return a sanitized profile response.
6. Invalidate or refresh `profile:{userId}` after success.

## Update Password

For update-password endpoints:

1. Require authenticated user context.
2. Validate current password, new password, and confirmation when applicable.
3. Verify the current password with the existing password hashing service.
4. Hash the new password through the shared password hasher.
5. Persist only the password hash, never the raw password.
6. Consider revoking sessions or refresh tokens if the project already supports session invalidation.
7. Return a minimal success response and avoid returning password-related data.

## Output Expectations

Mention cache key, cache invalidation behavior, sanitized response shape, password verification, and which domain owns the profile endpoints.
