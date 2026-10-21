// Renders a one-page A4 PDF from a report.json written by the website-audit-report skill.
//
// Usage (from the repo root):
//   node tools/audit/render-report.mjs --in <dir>/report.json [--out <dir>/website-review.pdf]
//
// Exits with code 2 if the content does not fit on one page, so the writer can shorten it.

import { chromium } from 'playwright'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve, isAbsolute } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..')

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
)
if (!args.in) {
  console.error('Usage: node tools/audit/render-report.mjs --in <report.json> [--out <file.pdf>]')
  process.exit(1)
}

const inPath = resolve(args.in)
const baseDir = dirname(inPath)
const outPath = resolve(args.out || join(baseDir, 'website-review.pdf'))
const report = JSON.parse(await readFile(inPath, 'utf8'))
const studio = JSON.parse(await readFile(join(here, 'studio.json'), 'utf8'))

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
// Allow **bold** in plain text fields, nothing else
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
const fileUrl = (p) => pathToFileURL(isAbsolute(p) ? p : join(baseDir, p)).href

// Guard the house rules before anything is printed
const allText = JSON.stringify(report)
const problems = []
if (/[—–]/.test(allText)) problems.push('contains an em dash or en dash')
const banned = /\b(revolutioni[sz]e|game.?changer|disrupt|unlock|supercharge|10x|leverage|seamless|synergy|best.in.class|cutting.edge|empower|elevate|streamline)\b/i
const hit = allText.match(banned)
if (hit) problems.push(`uses the banned word "${hit[0]}"`)
if (problems.length) {
  console.error(`report.json ${problems.join(' and ')}. Fix the wording and rerun.`)
  process.exit(3)
}

const band = (n) => (n === null || n === undefined ? 'na' : n >= 80 ? 'good' : n >= 50 ? 'ok' : 'poor')
const outOf10 = (n) => (n === null || n === undefined ? 'Not checked' : `${Math.floor(n / 10)}/10`)

const scoreRows = report.scores
  .map(
    (s) => `
    <div class="score ${band(s.score)}">
      <div class="score-head">
        <span class="label">${esc(s.label)}</span>
        <span class="value">${outOf10(s.score)}</span>
      </div>
      <div class="bar"><span style="width:${s.score ?? 0}%"></span></div>
      <p>${rich(s.line)}</p>
    </div>`,
  )
  .join('')

const fixes = report.fixes.map((f) => `<li>${rich(f)}</li>`).join('')

const shots = report.screenshots
  ? `<div class="shots">
      <figure class="desk"><img src="${fileUrl(report.screenshots.desktop)}" alt=""><figcaption>On a computer</figcaption></figure>
      <figure class="phone"><img src="${fileUrl(report.screenshots.mobile)}" alt=""><figcaption>On a phone</figcaption></figure>
    </div>`
  : ''

const fonts = pathToFileURL(join(repoRoot, 'public', 'fonts')).href

const html = `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8">
<style>
@font-face { font-family: "Plus Jakarta Sans"; font-weight: 400 800; src: url("${fonts}/plus-jakarta-sans-latin.woff2") format("woff2"); }
@font-face { font-family: "Inter"; font-weight: 400 600; src: url("${fonts}/inter-latin.woff2") format("woff2"); }
@page { size: A4; margin: 0; }
:root { --teal:#1B6B6B; --amber:#E8943A; --charcoal:#1E2A2A; --cream:#F7F5F2; --muted:#5E6E6E; --line:#D9D3CB; --good:#1B6B6B; --ok:#C77A22; --poor:#B4432F; }
* { box-sizing: border-box; }
html, body { margin:0; padding:0; }
body { font-family: Inter, "Segoe UI", sans-serif; color: var(--charcoal); background:#fff; font-size: 9.6pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; padding: 0 13mm 10mm; display:flex; flex-direction:column; overflow:hidden; }
header { background: var(--cream); border-top: 6px solid var(--teal); margin: 0 -13mm; padding: 7mm 13mm 5mm; display:flex; justify-content:space-between; align-items:flex-end; gap: 8mm; }
.brand { font-family: "Plus Jakarta Sans", sans-serif; font-weight: 800; font-size: 12.5pt; letter-spacing: -0.02em; }
.brand span { color: var(--amber); }
h1 { font-family: "Plus Jakarta Sans", sans-serif; font-weight: 800; font-size: 19pt; line-height:1.1; letter-spacing:-0.02em; margin: 3mm 0 0; }
.meta { text-align:right; font-size: 8.8pt; color: var(--muted); line-height:1.5; }
.meta strong { color: var(--charcoal); }
.intro { margin: 4.5mm 0 3.5mm; font-size: 10.2pt; }
.top { display:grid; grid-template-columns: 1fr 52mm; gap: 6mm; }
.scores { display:grid; grid-template-columns: 1fr 1fr; gap: 3.2mm 5mm; align-content: start; }
.score .score-head { display:flex; justify-content:space-between; align-items:baseline; }
.score .label { font-family:"Plus Jakarta Sans", sans-serif; font-weight:700; font-size:9.8pt; }
.score .value { font-family:"Plus Jakarta Sans", sans-serif; font-weight:800; font-size:10.5pt; }
.score.good .value { color: var(--good); } .score.ok .value { color: var(--ok); } .score.poor .value { color: var(--poor); } .score.na .value { color: var(--muted); font-size: 8.6pt; }
.bar { height: 1.6mm; background: #ECE7E1; border-radius: 1mm; margin: 0.8mm 0 1.2mm; overflow:hidden; }
.bar span { display:block; height:100%; background: var(--teal); }
.score.ok .bar span { background: var(--ok); } .score.poor .bar span { background: var(--poor); }
.score p { margin:0; font-size: 8.6pt; color: #33403F; line-height:1.35; }
.shots { display:flex; flex-direction:column; gap: 2.5mm; }
.shots figure { margin:0; }
.shots img { display:block; width:100%; border:1px solid var(--line); border-radius: 1.5mm; object-fit: cover; object-position: top; }
.shots .desk img { height: 33mm; }
.shots .phone img { height: 70mm; width: 33mm; margin: 0 auto; }
.shots figcaption { font-size: 7.6pt; color: var(--muted); margin-top: 0.8mm; text-align:center; }
h2 { font-family:"Plus Jakarta Sans", sans-serif; font-weight:800; font-size: 12.5pt; margin: 5mm 0 2mm; letter-spacing:-0.01em; }
ol { margin:0; padding-left: 5.5mm; }
ol li { margin: 0 0 1.6mm; padding-left: 1mm; font-size: 9.6pt; }
ol li::marker { font-family:"Plus Jakarta Sans", sans-serif; font-weight:800; color: var(--teal); }
.closing { margin: 3mm 0 0; font-size: 9.8pt; }
footer { margin-top:auto; border-top: 1px solid var(--line); padding-top: 3mm; display:flex; justify-content:space-between; gap: 6mm; font-size: 8.4pt; color: var(--muted); }
footer strong { color: var(--charcoal); font-family:"Plus Jakarta Sans", sans-serif; }
footer a { color: var(--teal); text-decoration:none; }
.fine { max-width: 95mm; text-align:right; font-size: 7.4pt; line-height:1.4; }
</style></head>
<body><div class="page" id="page">
<header>
  <div>
    <div class="brand">Field<span>bourne</span> Digital</div>
    <h1>${esc(report.title || 'A straight look at your website')}</h1>
  </div>
  <div class="meta">
    <strong>Prepared for</strong> ${esc(report.business)}<br>
    <strong>Site</strong> ${esc(report.site)}<br>
    <strong>Date</strong> ${esc(report.date)}
  </div>
</header>
<p class="intro">${rich(report.intro)}</p>
<div class="top">
  <div class="scores">${scoreRows}</div>
  ${shots}
</div>
<h2>The five things I would fix first</h2>
<ol>${fixes}</ol>
${report.closing ? `<p class="closing">${rich(report.closing)}</p>` : ''}
<footer>
  <div><strong>${esc(studio.person)}</strong>, ${esc(studio.business)}, ${esc(studio.town)}<br>
  ${studio.phone ? `${esc(studio.phone)} &middot; ` : ''}<a href="mailto:${esc(studio.email)}">${esc(studio.email)}</a> &middot; <a href="https://${esc(studio.site)}">${esc(studio.site)}</a> &middot; ABN ${esc(studio.abn)}</div>
  <div class="fine">Measured on ${esc(report.date)} from the public website${report.googleAttribution ? ' and Google' : ''}. Scores are out of 10 and are a guide, not a guarantee. These notes are yours to use however you like.</div>
</footer>
</div></body></html>`

const htmlPath = join(baseDir, 'report.html')
await writeFile(htmlPath, html)

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const overflow = await page.evaluate(() => {
    const el = document.getElementById('page')
    return el.scrollHeight - el.clientHeight
  })
  await page.pdf({ path: outPath, format: 'A4', printBackground: true, preferCSSPageSize: true })
  if (overflow > 2) {
    console.error(`Content runs ${overflow}px past one A4 page. Shorten the intro, score lines or fixes, then rerun.`)
    process.exitCode = 2
  } else {
    console.log(`Wrote ${outPath}`)
  }
} finally {
  await browser.close()
}
