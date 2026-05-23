---
name: html-screen-export
description: Use this skill whenever the user wants to export, capture, screenshot, render, or convert a specific HTML div, app preview screen, phone mockup, or element id into an image on the server side. This skill is especially relevant for HTML files produced by apps-design-preview where each screen has an id like screen-dashboard, screen-order-list, or screen-profile. Prefer this skill for server-side PNG/JPEG export from HTML by element id using a headless browser, not for manual browser screenshots.
---

# HTML Screen Export

Export one or more elements from an HTML file into image files on the server side. Target elements by stable HTML id, render the page in a headless browser, locate each element, and save a clipped screenshot as PNG or JPEG.

Use this when the user wants a generated HTML preview turned into image assets, especially app screen mockups created by `apps-design-preview`.

## Default Behavior

If the user provides an HTML file and one or more ids, export those ids.

If the user provides an HTML file but no ids, inspect the HTML and export elements whose ids start with `screen-`. If no `screen-*` ids exist, ask one short question or suggest adding stable ids first.

Default output:
- Format: PNG.
- Target: full element bounding box for each requested id.
- Output directory: `exports/` beside the HTML file unless the user specifies another path.
- File names: use the id, for example `screen-dashboard.png`.

This is a server-side workflow. Do not instruct the user to manually open DevTools or take screenshots. Create or use a script that runs headless rendering.

## Recommended Tooling

Prefer Playwright when available because it accurately renders modern CSS, web fonts, shadows, gradients, and responsive layout.

Use one of these approaches based on the project environment:
- Existing Node project with Playwright: add or run a small Node script using `playwright`.
- No existing setup but Node available: create a small local script and install/use Playwright only if acceptable in that workspace.
- Python project with Playwright installed: use Python Playwright.
- If Playwright is unavailable, Puppeteer is acceptable.

Avoid canvas-based HTML parsers for this task because they often fail on CSS fidelity. A headless browser gives the closest result to what the user sees.

## Export Script Pattern

A minimal Node Playwright script should:
- Accept an HTML file path.
- Accept ids from CLI args or auto-detect `screen-*` ids.
- Open the file with a `file://` URL or serve it locally if relative assets require it.
- Wait for fonts and network idle when possible.
- For each id, query `#id`, get its bounding box, and screenshot only that element.
- Save images to the output directory.
- Fail clearly if an id is missing.

Use this structure:

```js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

function cssString(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function main() {
  const htmlPath = process.argv[2];
  const outDir = process.argv[3] || path.join(path.dirname(htmlPath), 'exports');
  const ids = process.argv.slice(4);

  if (!htmlPath) {
    throw new Error('Usage: node export-screens.js <file.html> [out-dir] [screen-id...]');
  }

  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(path.resolve(htmlPath)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);

  const targetIds = ids.length
    ? ids
    : await page.$$eval('[id^="screen-"]', nodes => nodes.map(node => node.id));

  if (!targetIds.length) {
    throw new Error('No ids provided and no elements with id starting screen- were found.');
  }

  for (const id of targetIds) {
    const locator = page.locator(`[id="${cssString(id)}"]`);
    const count = await locator.count();
    if (!count) throw new Error(`Element not found: #${id}`);

    await locator.first().screenshot({ path: path.join(outDir, `${id}.png`) });
  }

  await browser.close();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
```

Use simple lowercase kebab-case ids from `apps-design-preview` when possible. If an existing id contains unusual selector characters, target it with an attribute selector or `document.getElementById` rather than raw `#id` selectors.

## Element Targeting

For app preview HTML, prefer exporting `.preview-screen-block#screen-*` because it includes the phone frame and label. If the user wants only the phone mockup without the label, target an inner id like `frame-dashboard` if present.

If the HTML was created without ids:
- Add stable ids to screen containers if the user asked you to modify the HTML.
- Otherwise ask which element should be exported.

Do not export the full page when the user asked for a specific screen id.

## Image Quality

Use `deviceScaleFactor: 2` by default for crisp output. Use `3` for high-resolution marketing images if export time and file size are acceptable.

Use PNG by default for UI mockups because it preserves sharp text and transparent edges. Use JPEG only if the user asks for smaller files or photo-like outputs.

Wait for rendering before screenshot:
- `networkidle` for page load.
- `document.fonts.ready` for web fonts.
- A short timeout only if animations or lazy rendering need it.

Disable or settle animations if they make exports inconsistent. For static app previews, prefer CSS that is already stable.

## Output Report

After exporting, tell the user:
- Which HTML file was rendered.
- Which ids were exported.
- Where the image files were saved.
- Any ids that were missing or skipped.

Keep the response concise. Include exact paths.

## Quality Checklist

Before finishing, verify that:
- The export ran server-side with a headless browser.
- Each requested id exists exactly once or the first match is intentionally used.
- Output images were created in the expected directory.
- The screenshots capture the target element, not the full page.
- Fonts and CSS rendered correctly enough for the intended preview.
