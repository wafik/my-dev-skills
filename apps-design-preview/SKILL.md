---
name: apps-design-preview
description: Use this skill whenever the user asks to create, draft, preview, mock up, or redesign an app interface, mobile app UI, product concept, dashboard preview, onboarding flow, admin app screen set, or SaaS/mobile UI mockup. By default, this skill outputs one polished, modern, clean, self-contained HTML file containing many labeled screens shown side by side in phone frames, even when the user does not explicitly say "HTML", "CSS", "one file", or "many screens". Every screen must have a stable HTML id so it can be exported later by id. All main colors and brand styling must be easy to customize from CSS variables in :root by default. This is especially relevant for requests mentioning app design, preview UI, custom colors, themes, palettes, phone frames, or customizable branding. Prefer this skill when the desired output is a visual design preview rather than production app logic.
---

# Apps Design Preview

Create a polished app design preview as one self-contained HTML file by default. The goal is to help the user see many screens of an app at once, similar to a design board: each screen sits inside a phone frame, the screens share one visual system, and all main colors can be customized by editing CSS variables at the top of the file.

Use this for static visual previews, not production implementation. Make the result feel like a real app concept, with realistic data, states, labels, and interactions represented visually.

The default behavior matters: if the user asks for an app design preview, UI mockup, mobile app concept, or redesign without specifying format, still create one standalone HTML file with multiple screens and complete CSS. Do not wait for the user to say "HTML", "CSS", "satu HTML saja", "banyak screen", "customable warna", or "modern clean". Those are already default expectations. Only choose another format when the user explicitly asks for React, Figma-style notes, screenshots, separate files, or implementation inside an existing app.

## Output Contract

Produce one `.html` file unless the user explicitly asks for another format.

Treat multi-screen output as mandatory by default:
- If the user names specific screens, include those screens.
- If the user gives only an app idea, infer a useful 4 screen set.
- If the user asks for a single screen explicitly, create only that screen, but keep the same standalone HTML preview style.
- If the user asks for production code in an existing project, follow the project format instead of this static preview output.

Treat modern, clean visual quality and theme fit as mandatory by default:
- If the user gives a theme, domain, brand, or color, translate it into the visual direction automatically.
- If the user does not give colors, choose a tasteful palette that matches the app domain.
- Build the HTML and CSS fully; do not ask the user to provide CSS details unless a brand guideline is required.
- Make the result look like a presentable design preview on the first attempt, not a rough wireframe.

The file should include:
- A single `<style>` block near the top.
- A `:root` token section with customizable colors, radii, shadows, spacing, and fonts.
- A responsive preview canvas that displays many screen mockups side by side and wraps on smaller widths.
- Reusable phone-frame markup for every screen.
- A stable `id` on every screen block so each screen can be targeted for server-side image export.
- A label under each screen.
- Static HTML/CSS only by default. Add tiny inline JavaScript only when it helps demonstrate overlays, tabs, modals, or state changes.

## Core Pattern

Use this structure for every screen:

```html
<div class="preview-screen-block" id="screen-dashboard">
  <div class="phone-frame">
    <div class="notch"></div>
    <div class="phone-screen">
      <div class="screen-content">
        <!-- screen-specific UI -->
      </div>
      <!-- optional fixed bottom nav or floating action -->
    </div>
  </div>
  <div class="screen-label">Screen Name</div>
</div>
```

Use one wrapper around all screens:

```html
<div class="screen-wrapper">
  <!-- preview-screen-block items -->
</div>
```

## Screen IDs

Every screen block must have a stable, descriptive HTML `id`. This enables later export of a specific screen div into an image from the server side.

Use this naming pattern:
- Prefix with `screen-`.
- Use lowercase kebab-case.
- Base the id on the screen purpose, not visual order.
- Keep ids stable when editing an existing preview unless the screen meaning changes.

Good examples:
- `screen-dashboard`
- `screen-order-list`
- `screen-order-detail`
- `screen-create-order`
- `screen-payment-success`
- `screen-profile`

Avoid ids like `screen-1`, `pageA`, `mockup`, or random generated ids because they are hard to target later.

Put the id on `.preview-screen-block` by default. If the user specifically wants to export only the device frame without the label, also add an inner id to the `.phone-frame`, for example `id="frame-dashboard"`. Do not duplicate the same id on multiple elements.

Keep the visual preview readable at a glance:
- Phone width around `320px` works well.
- Screen height around `620px` works well.
- Let `.screen-wrapper` use `display:flex`, `gap`, `overflow-x:auto`, `flex-wrap:wrap`, and `align-items:flex-start`.
- Use `overflow:hidden` inside phone screens so every mockup stays framed.
- If a screen has bottom navigation, position it fixed inside the phone mockup: use `position:absolute; bottom:14px; left:14px; right:14px; z-index` on the nav, and add enough bottom padding to scroll/content areas so content does not hide behind it.

## Customizable Theme

Put all important color choices in `:root` so the user can quickly re-theme the whole preview. This is required by default, even if the user never mentions CSS variables or customization.

Start with tokens like these and rename only if a product-specific naming scheme is clearer:

```css
:root {
  --app-primary: #4A7C59;
  --app-primary-soft: #E8F0EA;
  --app-primary-strong: #315C3D;
  --app-secondary: #8B7355;
  --app-secondary-soft: #F5F0E8;
  --app-accent: #D4A84B;
  --app-danger: #C45C5C;
  --app-success: #4A7C59;
  --app-bg: #FEFCFA;
  --app-canvas: #E8E4DF;
  --app-surface: #FFFFFF;
  --app-card: #F8F6F2;
  --app-text: #2D2A26;
  --app-text-muted: #9C9690;
  --app-border: #E5E2DC;
  --app-radius-sm: 10px;
  --app-radius: 14px;
  --app-radius-lg: 20px;
  --app-radius-xl: 28px;
  --app-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

Then use only variables for repeated UI colors. Avoid hard-coded accent colors scattered through the file, because it makes customization painful. Hard-code only neutral frame colors like the black phone bezel when needed.

At minimum, make these color areas customizable through variables:
- Primary brand color.
- Primary soft/background color.
- Secondary or accent color.
- App background and preview canvas.
- Surface/card color.
- Text, secondary text, and muted text.
- Border and divider color.
- Success, warning, and danger colors when status states exist.
- Header gradient colors if gradients are used.

If the user provides brand colors, convert them into a complete palette:
- Primary for buttons, active nav, header gradients, selected cards.
- Soft primary for selected backgrounds and icon containers.
- Accent for highlights or secondary metrics.
- Danger/success/warning for status states.
- Surface, card, border, muted text, and canvas colors.

If the user provides no brand colors, choose a palette that fits the product category:
- Finance/admin: navy, slate, emerald, restrained neutrals.
- Health/clinic: soft purple, blue, teal, mint, clean whites.
- Food/warung/POS: warm green, cream, orange, earthy neutrals.
- Education: blue, indigo, yellow accents, calm neutrals.
- Religious/community: green, warm beige, muted gold, gentle neutrals.
- Creative/event: orange, violet, electric blue, dark slate.

## Screen Set

Create enough screens to show the app as a system, not just isolated cards. If the user does not specify screen count, make exactly 4 screens by default. Add more only when the user names more screens or the app concept clearly needs them.

Good screen mix:
- Home or dashboard.
- List/index screen.
- Detail screen.
- Create/edit form, checkout/action, profile/settings, or status screen depending on the app domain.
- Empty, loading, modal, success, or error state where useful within those screens.

For each screen, vary layout while preserving the same visual language. Avoid duplicating the same list screen with only text changed.

## Visual Quality

Make the preview production-grade by default, even for short prompts:
- Use a clear typography scale, strong spacing rhythm, and consistent radius.
- Design headers, cards, badges, buttons, list rows, tabs, nav bars, and overlays as reusable patterns.
- Include realistic microcopy and sample data from the user's domain.
- Use inline SVG icons when helpful; keep icons consistent in stroke width and style.
- Use gradients sparingly for important hero/header areas.
- Represent active, selected, disabled, empty, and modal states when they help communicate the product.

Use a modern, clean style unless the user asks for a different aesthetic:
- Prefer generous spacing, clear hierarchy, soft shadows, subtle borders, and readable type.
- Keep surfaces calm and uncluttered.
- Make primary actions obvious.
- Match components to the domain: clinical apps should feel calm and trustworthy, POS apps fast and practical, community apps warm and approachable, admin tools precise and information-dense.
- Avoid over-decorating with random gradients, glassmorphism, emoji overload, or mismatched icons.

When using bottom navigation:
- Keep it fixed at the bottom inside each phone screen rather than flowing after content.
- Use `position:absolute` relative to `.phone-screen`.
- Keep it above content with `z-index` and a subtle shadow/border.
- Add bottom padding to `.screen-content` or scroll containers so the last content remains visible.
- Keep active nav state consistent with the current screen label.

Avoid generic placeholder text like `Lorem ipsum`, `Item 1`, or `User Name` unless the user explicitly wants placeholders. Realistic content makes design decisions easier to judge.

## Responsiveness

The preview itself should be comfortable on desktop and mobile:
- Desktop: screens can wrap in rows and stay centered.
- Narrow widths: allow horizontal scroll or single-column wrapping without clipping the phone frames.
- Use `min-width` on `.phone-frame` to preserve the screen shape.

The app screens are mobile-first by default. If the user asks for tablet or desktop app previews, replace the phone frame with an appropriate frame while keeping the same multi-screen board concept.

## Interaction Demos

Static HTML is enough for most previews. If showing an overlay or transient state improves the concept, add minimal JavaScript directly in the file.

Good interactive demos:
- Click a card to show a bottom sheet.
- Click a button to reveal a success modal.
- Toggle a selected tab or chip.

Keep interactions optional and obvious. The preview should still communicate well as a static screenshot.

## Implementation Notes

When editing an existing preview:
- Preserve the user's existing product content and visual intent unless asked to redesign it.
- Move repeated hard-coded colors into `:root` variables.
- Normalize inconsistent variable names and update references.
- Keep all screens in the same file unless the user asks to split files.

When creating a new preview:
- Ask a short clarifying question only if the app domain or required screens are unclear.
- If the user gives enough context, proceed and create the HTML file directly.
- Name the output file clearly, such as `app-design-preview.html`, `mobile-preview.html`, or a product-specific name.

For minimal prompts, infer the missing design details instead of asking for them. For example, if the user says "buat preview app kasir laundry", create the HTML preview with 4 suitable screens, a fitting palette, complete CSS variables, realistic content, and a modern clean layout.

## Quality Checklist

Before finishing, check that:
- The file opens standalone in a browser.
- There are multiple labeled screens in one HTML file, with 4 screens by default when the user does not specify a count.
- Every `.preview-screen-block` has a unique stable id using the `screen-*` pattern.
- The screens use shared theme variables from `:root`.
- All main colors can be customized by editing a small token block.
- The visual style is modern, clean, and appropriate for the app theme.
- The phone frames are consistent.
- Bottom navigation, if present, is fixed to the bottom of the phone screen and does not cover content.
- Content does not overflow awkwardly outside the mockup.
- The preview includes enough domain-specific data to feel realistic.
- The final response tells the user where the HTML file was created and which CSS variables control the colors.
