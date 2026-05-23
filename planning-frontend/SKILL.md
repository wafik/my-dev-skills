---
name: planning-frontend
description: Use this skill whenever planning or implementing frontend work in a frontend folder, React or Next.js UI, page, component, form, table, modal dialog, search, filter, pagination, toast, Tailwind CSS styling, shadcn/ui components, dropdowns, selects, comboboxes, Zod validation, reusable frontend service, formatted dates, formatted prices, formatted totals, formatted quantities, numeric inputs, nominal inputs, amount inputs, performance optimization, or frontend refactor. It guides Claude to build modular reusable components, keep pages thin, separate API calls/business logic/data transforms into services/hooks/helpers, use shadcn/ui components whenever available or allowed, use Tailwind CSS consistently, use reusable searchable dropdown components for select/dropdown fields, format displayed tanggal/harga/total/jumlah values correctly, format nominal/jumlah/amount/total inputs with thousands separators, validate forms in real time with schemas such as Zod, keep API/client logic in shared services, optimize render/data behavior, and use dialogs/toasts for create, update, delete, and success flows. Use it even when the user simply asks to add or fix frontend code because these patterns keep UI code reusable, maintainable, optimized, and user-friendly.
---

# Planning Frontend

Use this skill to plan, build, or refactor frontend code into modular, reusable components with shadcn/ui when available, Tailwind CSS, validated forms, shared services, consistent tables, reusable searchable dropdowns, and predictable feedback patterns.

## Core Approach

Start by reading the existing frontend structure before editing. Preserve the framework, routing style, component library, state management, naming conventions, validation approach, and existing Tailwind patterns.

Prefer the smallest correct change. Reuse existing components and services before creating new ones.

Use shadcn/ui components as the default UI building blocks when the project already has shadcn configured or the user allows adding it. Prefer shadcn `Button`, `Input`, `Label`, `Dialog`, `AlertDialog`, `Popover`, `Command`, `Select`, `Checkbox`, `Table`, `Badge`, `Card`, `Tabs`, `DropdownMenu`, and toast/sonner equivalents over hand-rolled primitives. If the project has a different established design system, follow that system instead of forcing shadcn.

Keep pages thin. A page or route component should compose feature components and wire high-level parameters, not contain direct API calls, large business workflows, repeated data transforms, validation definitions, formatter logic, or complex table/filter state. Move those concerns into feature services, hooks, schemas, helpers, and reusable components so the code stays maintainable and easier to optimize.

Organize reusable UI by capability. Tables, pagination, search boxes, filter controls, form fields, dialogs, confirm prompts, and toasts should be reusable when more than one screen can benefit from them.

Keep feature-specific business behavior near the feature. Keep cross-feature UI primitives, hooks, schemas, API clients, and formatting helpers in shared locations.

## Recommended Folder Shape

Adapt names to the project. Use existing equivalents such as `app/`, `pages/`, `features/`, `modules/`, `components/`, `lib/`, `shared/`, `services/`, or `utils/`.

```text
frontend/
  src/
    features/
      users/
        components/
        schemas/
        services/
        hooks/
        types/
        pages-or-routes/
      products/
        components/
        schemas/
        services/
        hooks/
        types/
    shared/
      components/
        table/
        pagination/
        search/
        filters/
        forms/
        dialogs/
        feedback/
      services/
      hooks/
      schemas/
      types/
      utils/
      constants/
```

Do not force this exact structure if the project already has a clear convention. Match the current codebase and improve within it.

## Tailwind CSS

Use Tailwind CSS for styling unless the project already uses another primary styling system.

Keep class names readable. Group layout, spacing, typography, colors, states, and responsive behavior in a consistent order when editing existing components.

Prefer reusable component variants over repeating long class strings across many screens. If the project already uses `class-variance-authority`, `clsx`, `tailwind-merge`, or a design system, follow that pattern.

Make responsive states explicit. Tables, filters, dialogs, and forms should work on mobile and desktop.

Avoid styling that only works for the happy path. Handle loading, empty, error, disabled, focused, and validation states.

## shadcn/ui Components

Use shadcn/ui by default when available in the project. Check for `components.json`, `components/ui`, `@/components/ui`, or existing imports before adding or using components.

For common UI, prefer these shadcn primitives:

1. Buttons: `Button`.
2. Inputs: `Input`, `Textarea`, `Label`.
3. Forms: project form wrappers or shadcn-compatible form components with `react-hook-form`.
4. Dialogs: `Dialog` for create/update, `AlertDialog` for destructive confirmation.
5. Dropdown actions: `DropdownMenu`.
6. Searchable selection: `Popover` + `Command` wrapped in a reusable searchable dropdown component.
7. Cards/badges/tabs/tables: `Card`, `Badge`, `Tabs`, `Table`.
8. Toasts: the project's existing shadcn `toast` or `sonner` setup.

Do not rebuild these primitives with raw divs unless the project lacks shadcn and adding it is out of scope. If a required shadcn component is missing but the project is already using shadcn, add the component through the project's established shadcn workflow.

## Dropdowns and Selects

For dropdown/select fields, use a reusable searchable dropdown component by default. This prevents inconsistent select behavior across forms and makes long option lists usable.

Preferred implementation:

```text
SearchableDropdown
  -> shadcn Button trigger
  -> Popover
  -> CommandInput
  -> CommandList / CommandItem
```

Use the reusable searchable dropdown for foreign key selections such as user, product, customer, category, role, warehouse, supplier, doctor, class, location, and option lists that may grow beyond a few items.

Allow a plain shadcn `Select` only for very small fixed enums, such as status with 2-5 stable values, when search would add unnecessary friction. Even then, keep the wrapper reusable if the pattern repeats.

The reusable searchable dropdown should support `value`, `onChange`, options with `label` and `value`, placeholder, search placeholder, empty text, disabled state, loading state when needed, optional clear selection, and integration with the project's validation/error pattern.

## Reusable Components

Create reusable components when a pattern is likely to appear across screens or already appears more than once.

Good reusable components include:

1. Data table wrapper.
2. Pagination control.
3. Search input with debounced callback when appropriate.
4. Filter bar or filter popover.
5. Form field wrappers with labels, helper text, and errors.
6. Reusable searchable dropdown for select/dropdown fields.
7. Modal/dialog wrappers for create and update forms.
8. Confirmation dialog for delete actions.
9. Empty, loading, and error states.
10. Toast or notification helpers.

Keep reusable components flexible but not over-abstracted. A table component should support common concerns such as rows, columns, loading, empty state, row actions, and pagination, but domain-specific labels and actions should remain in the feature.

## Tables, Search, Filters, and Pagination

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

Keep table state clear: page, page size, search query, filters, sort, loading, error, and selected row if needed.

Use URL query parameters for table state when the project already does so or when shareable/bookmarkable list state matters.

Debounce search only when it calls an API or expensive computation. Keep local filtering simple when the data set is small.

Put feature-specific column definitions near the feature. Put generic table primitives in shared components.

## Display and Input Formatting

Every displayed value for `tanggal`, date, `harga`, price, `total`, `jumlah`, quantity, `nominal`, and `amount` should use the correct user-facing format instead of raw backend values.

Use shared formatting utilities when the project has them. If not, create a small shared formatter in the existing shared utility location, such as `shared/utils/formatters`, `lib/format`, or the project's equivalent.

For Indonesian projects or Indonesian field names, prefer Indonesian locale formatting:

```text
tanggal/date -> format with Indonesian locale, for example 23 Mei 2026 or the project's existing date style
harga/price/nominal/amount/total -> thousands separator with dot, for example 1.000, 25.000, 1.250.000
jumlah/quantity -> thousands separator with dot when large, for example 1.000
```

Use `Intl.NumberFormat('id-ID')` or an existing formatter for display formatting. Use currency symbols such as `Rp` only when the project or field label expects currency display. If the UI label already says `Harga (Rp)`, the value can be `1.000`; if the value stands alone as money, prefer `Rp 1.000` when consistent with the existing UI.

For input fields named or labeled `nominal`, `jumlah`, `amount`, `total`, `harga`, or price-like fields, format the visible input value with a dot thousands separator at minimum. The user should see `1.000` instead of `1000`.

Keep form state and API payloads clean. Store or submit numeric values as numbers or unformatted numeric strings according to the existing API contract, not as display strings with separators, unless the backend explicitly expects formatted strings.

For formatted numeric inputs:

1. Strip non-digit characters before validation and submission, except decimals if the field truly supports decimals.
2. Reformat the visible value as the user types or on blur based on existing UX conventions.
3. Keep caret behavior reasonable; if live formatting makes caret handling complex, format on blur and still parse on change.
4. Validate the parsed numeric value with Zod or the existing schema library.
5. Show validation errors near the field using the project's existing form error pattern.

Do not scatter formatting logic inside table cells and form components. Prefer reusable helpers like `formatDate`, `formatNumber`, `formatCurrency`, `parseFormattedNumber`, or a reusable `NumericFormatInput` when repeated.

## Forms and Validation

Use schema-based validation for forms when available. Prefer Zod when the project uses or allows it.

Validate in real time when it improves user feedback: on change, on blur, or with the form library's mode that matches existing code. Avoid noisy validation that shows errors before a user has interacted with a field unless the project already does that.

Keep schemas close to the feature when rules are domain-specific. Move reusable validation helpers to shared schemas or shared validation utilities.

Recommended React pattern when available:

```text
react-hook-form + zod resolver + feature schema + reusable FormField components
```

For create and update forms, use the same form component when the fields and validation rules are mostly the same. Pass initial values and submit handlers from the feature container.

## Dialogs, Modals, and Delete Confirmation

Use a modal popup/dialog for create and update forms when the form has fewer than 7 input fields. This keeps short CRUD flows fast and avoids unnecessary page navigation.

If a create or update form has 7 or more input fields, consider a dedicated page, drawer, or multi-section layout unless the project already standardizes on large dialogs.

Use a confirmation popup for delete actions. This applies to prompts using `delete`, `remove`, or Indonesian wording such as `hapus`.

The delete confirmation should clearly show what will be deleted when possible, such as a name, title, email, or record id. Use destructive styling for the confirm action and provide a cancel action.

After successful create, update, or delete actions, show a toast success message. Use the project's existing toast library or notification system. Do not introduce a new toast dependency if one already exists.

Show error feedback near the failed action or as an error toast depending on existing conventions.

## Thin Pages and Logic Separation

Pages/routes should stay as composition boundaries. They should choose which feature view to render, read route/search params, and pass high-level props. They should not become the place where every API call, mutation, transform, filter, and form rule accumulates.

Separate frontend responsibilities like this by default:
- API calls and HTTP details go in feature services or shared API clients.
- Fetching/mutation orchestration goes in feature hooks or existing query hooks.
- Business-specific transforms and mappers go in feature helpers.
- Generic formatting and parsing go in shared utilities.
- Validation rules go in feature schemas or shared schemas when reusable.
- Complex table/filter/search state goes in a feature hook or reusable table/filter component.
- UI-only reusable pieces go in shared components.

Avoid direct `fetch`, `axios`, raw endpoint strings, mutation workflows, large `useEffect` data-loading blocks, and repeated mapping/formatting logic inside page components. If an existing page already has this pattern, improve it incrementally when touching that area instead of broad rewrites.

## Optimization Defaults

Optimize for maintainability and runtime behavior without over-engineering:
- Avoid duplicate API calls by using the project's existing data-fetching/cache layer when available, such as TanStack Query, SWR, Next.js server data patterns, or existing hooks.
- Keep derived values cheap and close to the data layer. Use memoization only when it avoids real repeated work or the project already follows that pattern.
- Debounce search inputs that trigger API calls or expensive filtering.
- Keep list/table pagination, sorting, search, and filters explicit and reusable.
- Avoid passing unstable inline objects/functions deep into large reusable components when it causes unnecessary rerenders; follow the project's React Compiler or memoization conventions.
- Split large components when separate state domains make the code easier to maintain, but avoid unnecessary micro-components.

## Shared Services

Keep API calls, HTTP clients, storage clients, auth/session helpers, and reusable data access functions in shared services or feature services based on scope.

Use feature services when the service is specific to one domain, such as `usersService` or `productsService`.

Use shared services when the logic is cross-cutting, such as `apiClient`, `uploadService`, `authTokenService`, `toastService`, or `queryClient` helpers.

Avoid calling `fetch`, `axios`, or backend endpoints directly from pages or UI components. Components should receive callbacks, data, or use feature hooks/services according to the project's existing pattern.

Keep request/response types close to the service or feature. Reuse shared types only when they are genuinely shared.

## Implementation Workflow

1. Inspect the frontend folders, component conventions, Tailwind setup, form libraries, validation libraries, toast system, dialog components, and service layer.
2. Identify the feature or page affected by the request.
3. Reuse existing shared components before creating new ones.
4. Place domain-specific UI, schemas, hooks, and services inside the feature.
5. Place reusable UI primitives, cross-cutting hooks, and shared API clients in shared folders.
6. Use shadcn/ui components for common UI when available, with Tailwind CSS for layout, responsive behavior, state styles, and visual polish.
7. For list screens, provide reusable table, pagination, search, and filter composition where appropriate.
8. Format displayed `tanggal`, `harga`, `total`, `jumlah`, `nominal`, and `amount` values with shared formatters.
9. Format numeric inputs for `nominal`, `jumlah`, `amount`, `total`, and `harga` with dot thousands separators while submitting clean numeric values.
10. For create/update with fewer than 7 inputs, prefer a modal/dialog form.
11. For delete or hapus, use a confirmation popup before mutation.
12. On successful create, update, or delete, show a toast success message.
13. Use or create a reusable searchable dropdown for dropdown/select fields unless the field is a tiny fixed enum suited to plain shadcn `Select`.
14. Keep page/route components thin by moving API calls, transforms, schemas, complex state, and mutation workflows into services, hooks, helpers, or reusable components.
15. Add or update validation with Zod or the project's existing schema validation approach.
16. Check for obvious performance issues such as duplicate requests, expensive search without debounce, unnecessary full-page state, or repeated transforms in render.
17. Run the narrowest relevant validation command available, such as frontend tests, typecheck, lint, or build.

## Refactoring Guidance

Refactor incrementally. Avoid turning a small UI change into a broad design-system rewrite.

When extracting reusable components, start from repeated UI and preserve behavior. A good extraction removes duplication while keeping feature-specific copy, data mapping, and business rules in the feature.

When moving API logic to services, keep the public service methods named by user intent, such as `getUsers`, `createUser`, `updateUser`, and `deleteUser`.

When moving logic out of pages, preserve behavior and make the smallest useful extraction. Prefer a feature hook such as `useUsersPage`, `useProductFilters`, or `useCreateOrder` for page orchestration, and a feature service such as `usersService` or `ordersService` for API calls. Keep shared helpers generic and avoid vague catch-all files.

When adding validation, align field names, error messages, and schema rules with the backend contract when visible in the codebase.

When adding formatting, align with existing locale and currency conventions first. If there is no existing convention and fields use Indonesian names such as `tanggal`, `harga`, `jumlah`, or `nominal`, use `id-ID` formatting and dot thousands separators.

## Output Expectations

When making frontend changes, briefly explain:

1. Which feature or page was changed.
2. Which reusable components or shared services were added or reused.
3. Which shadcn/ui components were used or added.
4. How dropdown/select fields use the reusable searchable dropdown or why a plain small-enum select was appropriate.
5. How page logic was kept thin and where API calls, hooks, transforms, schemas, or helpers live.
6. What optimization-relevant choices were made, such as caching, debounce, avoiding duplicate requests, or keeping render work cheap.
7. How form validation works and where the schema lives.
8. How date, price, total, quantity, nominal, or amount values are formatted for display and input.
9. How create, update, delete, confirmation, and toast feedback are handled.
10. What validation was run, or why validation could not be run.

If the user asks for a proposed structure instead of code changes, provide a concise folder tree and explain which pieces are feature-specific versus shared.

## Examples

**CRUD user page**

Use `features/users` for user columns, user schema, user form, and user service methods. Use shared `DataTable`, `Pagination`, `SearchInput`, `FilterBar`, `FormField`, `EntityDialog`, `ConfirmDialog`, and toast helper if they already exist or are broadly useful.

**Create or update with 5 fields**

Use one shadcn `Dialog` form component for both create and update. Use shadcn form/input primitives where the project supports them. Validate with a Zod schema in real time. On success, close the dialog, refresh the list, and show a success toast.

**Displaying transaction data**

Format `tanggal` using the project's date style or Indonesian locale. Format `harga`, `jumlah`, `nominal`, `amount`, and `total` with dot thousands separators, such as `1.000` and `1.250.000`, instead of raw values like `1000` or `1250000`.

**Nominal or jumlah input**

Show the input value with thousands separators while the user types or on blur, such as `10.000`. Parse it back to a clean numeric value before Zod validation and API submission.

**Delete or hapus product**

Open a confirmation popup before deleting. Show the product name in the message when available. After successful deletion, refresh the table and show a success toast.

**Repeated filters across pages**

Extract reusable filter controls only for generic behavior. Keep domain-specific filter options and labels inside each feature.

**Dropdown or select field**

For selecting customer, product, role, category, supplier, doctor, class, location, or other relational options, use a reusable searchable dropdown built from shadcn `Popover` and `Command`. Use plain shadcn `Select` only for very small fixed enums like status.
