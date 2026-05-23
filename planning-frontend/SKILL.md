---
name: planning-frontend
description: Use this skill whenever planning or implementing frontend work in a frontend folder, React or Next.js UI, page, component, form, table, modal dialog, search, filter, pagination, toast, Tailwind CSS styling, Zod validation, reusable frontend service, formatted dates, formatted prices, formatted totals, formatted quantities, numeric inputs, nominal inputs, amount inputs, or frontend refactor. It guides Claude to build modular reusable components, use Tailwind CSS consistently, format displayed tanggal/harga/total/jumlah values correctly, format nominal/jumlah/amount/total inputs with thousands separators, validate forms in real time with schemas such as Zod, keep API/client logic in shared services, and use dialogs/toasts for create, update, delete, and success flows. Use it even when the user simply asks to add or fix frontend code because these patterns keep UI code reusable, maintainable, and user-friendly.
---

# Planning Frontend

Use this skill to plan, build, or refactor frontend code into modular, reusable components with Tailwind CSS, validated forms, shared services, consistent tables, and predictable feedback patterns.

## Core Approach

Start by reading the existing frontend structure before editing. Preserve the framework, routing style, component library, state management, naming conventions, validation approach, and existing Tailwind patterns.

Prefer the smallest correct change. Reuse existing components and services before creating new ones.

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

## Reusable Components

Create reusable components when a pattern is likely to appear across screens or already appears more than once.

Good reusable components include:

1. Data table wrapper.
2. Pagination control.
3. Search input with debounced callback when appropriate.
4. Filter bar or filter popover.
5. Form field wrappers with labels, helper text, and errors.
6. Modal/dialog wrappers for create and update forms.
7. Confirmation dialog for delete actions.
8. Empty, loading, and error states.
9. Toast or notification helpers.

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

## Shared Services

Keep API calls, HTTP clients, storage clients, auth/session helpers, and reusable data access functions in shared services or feature services based on scope.

Use feature services when the service is specific to one domain, such as `usersService` or `productsService`.

Use shared services when the logic is cross-cutting, such as `apiClient`, `uploadService`, `authTokenService`, `toastService`, or `queryClient` helpers.

Avoid calling `fetch`, `axios`, or backend endpoints directly from deeply nested UI components when the project has a service layer. Components should receive callbacks or use feature hooks/services.

Keep request/response types close to the service or feature. Reuse shared types only when they are genuinely shared.

## Implementation Workflow

1. Inspect the frontend folders, component conventions, Tailwind setup, form libraries, validation libraries, toast system, dialog components, and service layer.
2. Identify the feature or page affected by the request.
3. Reuse existing shared components before creating new ones.
4. Place domain-specific UI, schemas, hooks, and services inside the feature.
5. Place reusable UI primitives, cross-cutting hooks, and shared API clients in shared folders.
6. Use Tailwind CSS for layout, responsive behavior, state styles, and visual polish.
7. For list screens, provide reusable table, pagination, search, and filter composition where appropriate.
8. Format displayed `tanggal`, `harga`, `total`, `jumlah`, `nominal`, and `amount` values with shared formatters.
9. Format numeric inputs for `nominal`, `jumlah`, `amount`, `total`, and `harga` with dot thousands separators while submitting clean numeric values.
10. For create/update with fewer than 7 inputs, prefer a modal/dialog form.
11. For delete or hapus, use a confirmation popup before mutation.
12. On successful create, update, or delete, show a toast success message.
13. Add or update validation with Zod or the project's existing schema validation approach.
14. Run the narrowest relevant validation command available, such as frontend tests, typecheck, lint, or build.

## Refactoring Guidance

Refactor incrementally. Avoid turning a small UI change into a broad design-system rewrite.

When extracting reusable components, start from repeated UI and preserve behavior. A good extraction removes duplication while keeping feature-specific copy, data mapping, and business rules in the feature.

When moving API logic to services, keep the public service methods named by user intent, such as `getUsers`, `createUser`, `updateUser`, and `deleteUser`.

When adding validation, align field names, error messages, and schema rules with the backend contract when visible in the codebase.

When adding formatting, align with existing locale and currency conventions first. If there is no existing convention and fields use Indonesian names such as `tanggal`, `harga`, `jumlah`, or `nominal`, use `id-ID` formatting and dot thousands separators.

## Output Expectations

When making frontend changes, briefly explain:

1. Which feature or page was changed.
2. Which reusable components or shared services were added or reused.
3. How form validation works and where the schema lives.
4. How date, price, total, quantity, nominal, or amount values are formatted for display and input.
5. How create, update, delete, confirmation, and toast feedback are handled.
6. What validation was run, or why validation could not be run.

If the user asks for a proposed structure instead of code changes, provide a concise folder tree and explain which pieces are feature-specific versus shared.

## Examples

**CRUD user page**

Use `features/users` for user columns, user schema, user form, and user service methods. Use shared `DataTable`, `Pagination`, `SearchInput`, `FilterBar`, `FormField`, `EntityDialog`, `ConfirmDialog`, and toast helper if they already exist or are broadly useful.

**Create or update with 5 fields**

Use one dialog form component for both create and update. Validate with a Zod schema in real time. On success, close the dialog, refresh the list, and show a success toast.

**Displaying transaction data**

Format `tanggal` using the project's date style or Indonesian locale. Format `harga`, `jumlah`, `nominal`, `amount`, and `total` with dot thousands separators, such as `1.000` and `1.250.000`, instead of raw values like `1000` or `1250000`.

**Nominal or jumlah input**

Show the input value with thousands separators while the user types or on blur, such as `10.000`. Parse it back to a clean numeric value before Zod validation and API submission.

**Delete or hapus product**

Open a confirmation popup before deleting. Show the product name in the message when available. After successful deletion, refresh the table and show a success toast.

**Repeated filters across pages**

Extract reusable filter controls only for generic behavior. Keep domain-specific filter options and labels inside each feature.
