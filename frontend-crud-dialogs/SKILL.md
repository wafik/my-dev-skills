---
name: frontend-crud-dialogs
description: Use this skill whenever building or changing frontend CRUD flows, create forms, update forms, edit forms, modal popup dialogs, delete/remove/hapus actions, confirmation popups, toast success messages, realtime form validation, Zod schemas, or short forms with fewer than 7 inputs. It focuses on modal dialogs for create/update forms below 7 inputs, confirmation dialogs for delete/hapus, Zod-style realtime validation, and success toasts after create, update, or delete.
---

# Frontend CRUD Dialogs

Use this skill for focused frontend create, update, delete, form validation, dialog, confirmation, and toast behavior. Keep broader frontend planning in `planning-frontend`.

## Create and Update Forms

Use a modal popup/dialog for create and update forms when the form has fewer than 7 input fields. This keeps short CRUD flows fast and avoids unnecessary page navigation.

If the form has 7 or more input fields, consider a dedicated page, drawer, or multi-section layout unless the project already standardizes on large dialogs.

Use the same form component for create and update when fields and validation rules are mostly the same. Pass initial values and submit handlers from the feature container.

## Validation

Use schema-based validation when available. Prefer Zod when the project uses or allows it.

Validate in real time when it improves feedback: on change, on blur, or using the existing form library mode. Avoid showing errors too early unless the project already does that.

Keep feature-specific schemas near the feature. Put reusable validation helpers in shared schema/validation utilities.

Recommended React pattern when available:

```text
react-hook-form + zod resolver + feature schema + reusable FormField components
```

## Delete or Hapus

Use a confirmation popup for delete actions. This applies to `delete`, `remove`, and Indonesian wording such as `hapus`.

The confirmation should clearly show what will be deleted when possible, such as name, title, email, or record id. Use destructive styling for the confirm action and provide a cancel action.

## Toast Feedback

After successful create, update, or delete actions, show a toast success message. Use the project's existing toast library or notification system. Do not add a new toast dependency if one already exists.

Show error feedback near the failed action or as an error toast according to existing conventions.

## Output Expectations

Mention dialog behavior, why the form belongs in a dialog or page, validation schema location, delete confirmation behavior, and toast success behavior.
