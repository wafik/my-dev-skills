---
name: frontend-formatting-inputs
description: Use this skill whenever frontend data displays or inputs involve tanggal/date, harga/price, total, jumlah/quantity, nominal, amount, currency-like values, numeric formatting, thousands separators, Indonesian locale formatting, table value formatting, or formatted form inputs. It focuses on formatting displayed values correctly and formatting nominal/jumlah/amount/total/harga inputs with dot thousands separators while submitting clean numeric values.
---

# Frontend Formatting Inputs

Use this skill for frontend display and input formatting. Keep broader frontend planning in `planning-frontend`.

## Display Formatting

Every displayed value for `tanggal`, date, `harga`, price, `total`, `jumlah`, quantity, `nominal`, and `amount` should use a user-facing format instead of raw backend values.

For Indonesian projects or Indonesian field names, prefer Indonesian locale formatting:

```text
tanggal/date -> 23 Mei 2026 or the project's existing date style
harga/price/nominal/amount/total -> 1.000, 25.000, 1.250.000
jumlah/quantity -> 1.000 when large
```

Use `Intl.NumberFormat('id-ID')` or existing formatters. Use `Rp` only when the project or field label expects currency display.

## Input Formatting

For inputs named or labeled `nominal`, `jumlah`, `amount`, `total`, `harga`, or price-like fields, format the visible input value with dot thousands separators. The user should see `1.000` instead of `1000`.

Keep form state and API payloads clean. Submit numeric values or unformatted numeric strings according to the API contract, not display strings with separators, unless the backend explicitly expects formatted strings.

For formatted numeric inputs:

1. Strip non-digit characters before validation and submission, except decimals if supported.
2. Reformat visible value while typing or on blur based on existing UX conventions.
3. Keep caret behavior reasonable.
4. Validate parsed numeric values with Zod or the existing schema library.
5. Show validation errors near the field.

## Shared Helpers

Do not scatter formatting logic inside table cells and form components. Prefer reusable helpers like `formatDate`, `formatNumber`, `formatCurrency`, `parseFormattedNumber`, or a reusable `NumericFormatInput`.

## Output Expectations

Mention which fields are formatted, which shared helpers or components were used, how parsing works, and what clean value is submitted.
