---
name: frontend-reusable-components
description: Use this skill whenever building or refactoring frontend reusable components, Tailwind CSS UI, tables, pagination, search, filters, filter bars, reusable form fields, shared frontend services, API clients, feature folders, or frontend component architecture. It focuses on modular reusable components, Tailwind consistency, feature-specific code near the feature, and cross-feature UI/services in shared folders.
---

# Frontend Reusable Components

Use this skill for focused frontend component architecture and shared service placement. Keep broader frontend planning in `planning-frontend`.

## Component Structure

Organize reusable UI by capability. Tables, pagination, search boxes, filter controls, form fields, dialogs, confirmations, empty states, loading states, error states, and toasts should be reusable when more than one screen can benefit from them.

Keep feature-specific business behavior near the feature. Keep cross-feature UI primitives, hooks, API clients, formatting helpers, schemas, and utilities in shared locations.

## Tailwind CSS

Use Tailwind CSS unless the project already uses another primary styling system.

Keep class names readable and responsive states explicit. Tables, filters, dialogs, and forms should work on mobile and desktop.

Handle loading, empty, error, disabled, focused, and validation states.

## Tables, Search, Filters, Pagination

For list pages, prefer this composition:

```text
FeaturePage
  -> FeatureToolbar
       -> SearchInput
       -> FilterControls
       -> CreateButton
  -> DataTable
       -> RowActions
  -> Pagination
```

Keep state clear: page, page size, search query, filters, sort, loading, error, and selected row if needed.

Use URL query parameters for list state when the project already does so or when shareable/bookmarkable state matters.

Put feature-specific column definitions near the feature. Put generic table primitives in shared components.

## Shared Services

Keep API calls, HTTP clients, auth/session helpers, storage clients, and reusable data access functions in shared services or feature services based on scope.

Use feature services for one domain, such as `usersService`. Use shared services for cross-cutting logic, such as `apiClient`, `uploadService`, `authTokenService`, or `queryClient` helpers.

Avoid calling `fetch`, `axios`, or backend endpoints directly from deeply nested UI components when the project has a service layer.

## Output Expectations

Mention reusable components created or reused, feature-specific pieces, shared services, table/search/filter/pagination state, and responsive/loading/empty/error handling.
