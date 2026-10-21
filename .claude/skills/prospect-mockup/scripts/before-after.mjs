// Builds a before/after image from the audit screenshots and a mockup HTML file.
//
// Usage (from the repo root):
//   node .claude/skills/prospect-mockup/scripts/before-after.mjs \
//     --mockup <dir>/mockup.html --before-desktop <audit>/screenshots/desktop-top.png \
//     --before-mobile <audit>/screenshots/mobile-top.png --out <dir>/before-after.png
//
// Also writes mockup-desktop.png and mockup-mobile.png next to the mockup.

import { chromium } from 'playwright'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
)
for (const k of ['mockup', 'before-desktop', 'before-mobile']) {
  if (!args[k]) {
    console.error(`Missing --${k}`)
    process.exit(1)
  }
}

const mockup = resolve(args.mockup)
const dir = dirname(mockup)
const out = resolve(args.out || join(dir, 'before-after.png'))
const afterDesktop = join(dir, 'mockup-desktop.png')
const afterMobile = join(dir, 'mockup-mobile.png')

const browser = await chromium.launch()
try {
  for (const [w, h, path, mobile] of [[1440, 900, afterDesktop, false], [390, 844, afterMobile, true]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: false, hasTouch: mobile })
    const page = await ctx.newPage()
    await page.goto(pathToFileURL(mockup).href, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path })
    await ctx.close()
  }

  const img = async (p) => `data:image/png;base64,${(await readFile(resolve(p))).toString('base64')}`
  const [bd, bm, ad, am] = await Promise.all([img(args['before-desktop']), img(args['before-mobile']), img(afterDesktop), img(afterMobile)])

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin:0; background:#F7F5F2; font-family: Inter, "Segoe UI", sans-serif; color:#1E2A2A; }
    .wrap { display:grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 40px; width: 2000px; box-sizing: border-box; }
    h2 { font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif; font-size: 34px; margin: 0 0 16px; letter-spacing:-0.02em; }
    .after h2 { color:#1B6B6B; }
    .pair { display:flex; gap: 20px; align-items:flex-start; }
    .desk { width: 700px; border-radius: 10px; border: 1px solid #D9D3CB; box-shadow: 0 6px 24px rgba(30,42,42,.12); }
    .phone { width: 220px; border-radius: 18px; border: 6px solid #1E2A2A; }
    .note { grid-column: 1 / -1; font-size: 18px; color:#5E6E6E; margin: 0; }
  </style></head><body><div class="wrap">
    <div><h2>Now</h2><div class="pair"><img class="desk" src="${bd}"><img class="phone" src="${bm}"></div></div>
    <div class="after"><h2>Could be</h2><div class="pair"><img class="desk" src="${ad}"><img class="phone" src="${am}"></div></div>
    <p class="note">First screen on a computer and on a phone. The "could be" side is a concept mockup by FieldBourne Digital, not a finished site.</p>
  </div></body></html>`
  const page = await browser.newPage({ viewport: { width: 2000, height: 800 } })
  await page.setContent(html, { waitUntil: 'load' })
  await page.locator('.wrap').screenshot({ path: out })
  console.log(`Wrote ${out}`)
} finally {
  await browser.close()
}
