---
name: frontend-reusable-components
description: Use this skill whenever building or refactoring frontend reusable components, shadcn/ui components, Tailwind CSS UI, tables, pagination, search, filters, filter bars, dropdowns, selects, comboboxes, reusable searchable dropdowns, reusable form fields, shared frontend services, API clients, feature folders, page logic separation, hooks, or frontend component architecture. It focuses on modular reusable components, using shadcn/ui whenever available or allowed, Tailwind consistency, reusable searchable dropdowns for select/dropdown fields, keeping pages thin, separating API calls/business logic/transforms into services/hooks/helpers, feature-specific code near the feature, cross-feature UI/services in shared folders, and optimized maintainable frontend code.
---

# Frontend Reusable Components

Use this skill for focused frontend component architecture and shared service placement. Keep broader frontend planning in `planning-frontend`.

Use shadcn/ui components as the default UI building blocks when the project already has shadcn configured or the user allows adding it. Prefer shadcn primitives over hand-rolled buttons, inputs, dialogs, cards, badges, tables, popovers, commands, dropdown menus, and selects. If the project uses another established design system, follow that system instead of forcing shadcn.

Keep page and route components thin. They should compose feature components and pass high-level props, not contain direct API calls, raw endpoint strings, large mutation workflows, repeated data transforms, validation schemas, formatter logic, or complex table/filter state.

## Component Structure

Organize reusable UI by capability. Tables, pagination, search boxes, filter controls, searchable dropdowns, form fields, dialogs, confirmations, empty states, loading states, error states, and toasts should be reusable when more than one screen can benefit from them.

Keep feature-specific business behavior near the feature. Keep cross-feature UI primitives, hooks, API clients, formatting helpers, schemas, and utilities in shared locations.

Move logic out of pages by default:
- API calls go in feature services or shared API clients.
- Fetching and mutation orchestration goes in feature hooks or existing query hooks.
- Business-specific mapping/transforms go in feature helpers.
- Generic formatting/parsing goes in shared utilities.
- Validation rules go in feature schemas or shared schemas when reusable.
- Complex table/search/filter state goes in feature hooks or reusable components.

## Tailwind CSS

Use Tailwind CSS unless the project already uses another primary styling system.

Keep class names readable and responsive states explicit. Tables, filters, dialogs, and forms should work on mobile and desktop.

Handle loading, empty, error, disabled, focused, and validation states.

## shadcn/ui

When shadcn is available, build reusable components on top of shadcn primitives:
- `Button`, `Input`, `Textarea`, `Label`, and form wrappers for forms.
- `Dialog` for create/update flows.
- `AlertDialog` for destructive confirmations.
- `Popover` + `Command` for searchable dropdown/select behavior.
- `DropdownMenu` for row actions or compact action menus.
- `Table`, `Card`, `Badge`, and `Tabs` for common layout/data UI.

Do not create raw custom primitives that duplicate shadcn behavior unless shadcn is not present and adding it is out of scope.

## Reusable Searchable Dropdown

Dropdown/select fields should use a reusable searchable dropdown by default. Build it with shadcn `Popover` and `Command` when available.

Use it for relational or growing option lists: customer, user, product, category, role, supplier, warehouse, doctor, class, location, and similar fields.

Allow plain shadcn `Select` only for tiny fixed enums with 2-5 stable options, such as status or type, where search would be unnecessary.

The reusable component should support:
- `value` and `onChange`.
- Options with `label` and `value`.
- Placeholder and search placeholder.
- Empty state text.
- Disabled and loading state.
- Optional clear selection.
- Form validation/error integration.

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

Debounce search when it triggers API calls or expensive filtering. Avoid repeated transforms in render; compute data in hooks/helpers or the data layer when it improves clarity and avoids unnecessary rerenders.

## Shared Services

Keep API calls, HTTP clients, auth/session helpers, storage clients, and reusable data access functions in shared services or feature services based on scope.

Use feature services for one domain, such as `usersService`. Use shared services for cross-cutting logic, such as `apiClient`, `uploadService`, `authTokenService`, or `queryClient` helpers.

Avoid calling `fetch`, `axios`, or backend endpoints directly from pages or UI components. Use feature hooks/services or shared API clients according to the project's existing pattern.

Use the project's existing caching/data layer when available, such as TanStack Query, SWR, Next.js server data patterns, or existing hooks, to avoid duplicate requests and keep loading/error behavior consistent.

## Output Expectations

Mention reusable components created or reused, shadcn/ui primitives used or added, dropdown/select handling with reusable searchable dropdowns, how page logic was separated into services/hooks/helpers, feature-specific pieces, shared services, table/search/filter/pagination state, optimization choices such as caching/debounce/avoiding repeated render work, and responsive/loading/empty/error handling.
