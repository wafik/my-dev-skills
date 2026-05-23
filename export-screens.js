const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 900 });

  const htmlPath = 'file://' + path.resolve('koperasi-app-preview.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const screens = await page.evaluate(() => {
    const blocks = document.querySelectorAll('[id^="screen-"]');
    return Array.from(blocks).map(block => {
      const labelEl = block.querySelector('.screen-label');
      const label = labelEl ? labelEl.textContent.replace('⬇ PNG', '').trim() : block.id;
      return {
        id: block.id,
        label: label.toLowerCase().replace(/\s+/g, '-'),
      };
    });
  });

  for (const screen of screens) {
    const selector = `#${screen.id} .phone-frame`;
    const el = await page.$(selector);
    if (!el) {
      console.log(`  [SKIP] ${screen.id} — element not found`);
      continue;
    }

    const clip = await el.boundingBox();
    if (!clip) {
      console.log(`  [SKIP] ${screen.id} — no bounding box`);
      continue;
    }

    const filename = `koperasi-${screen.label}.png`;
    const filepath = path.join('exports', filename);

    await page.screenshot({
      path: filepath,
      clip: { x: clip.x, y: clip.y, width: clip.width, height: clip.height },
    });

    console.log(`  [OK] ${filename}`);
  }

  await browser.close();
  console.log('\nDone! All screens exported to exports/');
})();
