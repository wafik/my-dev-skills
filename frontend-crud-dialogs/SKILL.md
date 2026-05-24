---
name: frontend-crud-dialogs
description: Use this skill whenever building or changing frontend CRUD flows, create forms, update forms, edit forms, password fields, password inputs with eye/eye-off visibility toggles, modal popup dialogs, shadcn/ui dialogs, dropdown/select form fields, reusable searchable dropdowns, delete/remove/hapus actions, confirmation popups, toast success messages, realtime form validation, Zod schemas, or short forms with fewer than 7 inputs. It focuses on shadcn/ui modal dialogs for create/update forms below 7 inputs, reusable searchable dropdowns for dropdown/select fields, reusable password input components for every password field, confirmation dialogs for delete/hapus, Zod-style realtime validation, and success toasts after create, update, or delete.
---

# Frontend CRUD Dialogs

Use this skill for focused frontend create, update, delete, form validation, dialog, confirmation, and toast behavior. Keep broader frontend planning in `planning-frontend`.

Use shadcn/ui components by default when the project already has shadcn configured or the user allows adding it. Prefer shadcn `Dialog`, `AlertDialog`, `Button`, `Input`, `Label`, form wrappers, `Popover`, `Command`, `Select`, and toast/sonner equivalents over hand-rolled form/dialog primitives. If the project uses another established design system, follow it instead of forcing shadcn.

## Create and Update Forms

Use a modal popup/dialog for create and update forms when the form has fewer than 7 input fields. Prefer shadcn `Dialog` for this when available. This keeps short CRUD flows fast and avoids unnecessary page navigation.

If the form has 7 or more input fields, consider a dedicated page, drawer, or multi-section layout unless the project already standardizes on large dialogs.

Use the same form component for create and update when fields and validation rules are mostly the same. Pass initial values and submit handlers from the feature container.

Keep dialog form components focused on UI and validation display. Do not put raw `fetch`, `axios`, endpoint strings, or full mutation workflows directly inside reusable form components. Put API calls in feature services and orchestration in feature hooks or parent containers, then pass submit callbacks into the form.

## Dropdowns and Selects in Forms

For dropdown/select fields, use a reusable searchable dropdown by default, preferably built with shadcn `Popover` and `Command`.

Use the searchable dropdown for relational or potentially long option lists, such as customer, user, product, category, role, supplier, warehouse, doctor, class, location, and similar fields.

Use plain shadcn `Select` only for very small fixed enums with 2-5 stable options, such as status or type, when search would be unnecessary. Keep it reusable if the pattern repeats.

The reusable searchable dropdown should integrate with the form library and validation errors. It should support `value`, `onChange`, placeholder, search placeholder, empty text, disabled state, loading state, optional clear selection, and option objects with `label` and `value`.

If dropdown options are loaded from an API, fetch them through feature hooks/services or the project's query layer. Avoid loading options directly inside generic dropdown components unless the component is explicitly designed as a data-aware feature component.

## Password Fields in Forms

Every form field that represents a password must use a reusable password input component with a working visibility toggle. Do not leave repeated raw `<input type="password">` elements or plain shadcn `Input` password fields scattered across login, register, reset password, change password, confirm password, or admin user forms.

Prefer the project's existing `PasswordInput`, `InputPassword`, or shared form password field. If none exists, create a reusable component in the shared form/input component location and use it anywhere password fields appear.

The reusable password input should:
- Start hidden with `type="password"`.
- Show an eye icon when hidden and an eye-off icon when visible, or follow the project's existing icon convention.
- Toggle to `type="text"` and back correctly without clearing the field or breaking form registration.
- Use `button type="button"` for the icon control so clicking it does not submit the dialog/form.
- Preserve disabled state, validation state, helper/error text integration, `autoComplete`, placeholder, `name`, value, and `onChange` behavior.
- Include accessible labels such as `Show password` and `Hide password`.

Use context-appropriate `autoComplete` values when possible: `current-password` for login/current password, and `new-password` for new password and confirm password fields.

## Validation

Use schema-based validation when available. Prefer Zod when the project uses or allows it.

Validate in real time when it improves feedback: on change, on blur, or using the existing form library mode. Avoid showing errors too early unless the project already does that.

Keep feature-specific schemas near the feature. Put reusable validation helpers in shared schema/validation utilities.

Recommended React pattern when available:

```text
react-hook-form + zod resolver + feature schema + reusable FormField components
```

## Delete or Hapus

Use a confirmation popup for delete actions. Prefer shadcn `AlertDialog` when available. This applies to `delete`, `remove`, and Indonesian wording such as `hapus`.

The confirmation should clearly show what will be deleted when possible, such as name, title, email, or record id. Use destructive styling for the confirm action and provide a cancel action.

## Toast Feedback

After successful create, update, or delete actions, show a toast success message. Use the project's existing toast library or notification system. Do not add a new toast dependency if one already exists.

Show error feedback near the failed action or as an error toast according to existing conventions.

## Output Expectations

Mention shadcn/ui components used or added, dialog behavior, why the form belongs in a dialog or page, password field handling with reusable eye/eye-off toggle behavior when password fields are present, dropdown/select handling with reusable searchable dropdowns, where API calls and mutation orchestration live, validation schema location, delete confirmation behavior, toast success behavior, and any optimization choices such as cached option loading or avoiding duplicate requests.
