// Turns a quote.json into a quote PDF, doing all the money maths in one place.
//
// Usage (from the repo root):
//   node .claude/skills/client-proposal/scripts/render-quote.mjs --in <dir>/quote.json [--out <dir>/quote.pdf]
//
// Prices in quote.json are always ex GST. GST (10%) is added only when gstRegistered is true.
// Exit codes: 1 bad input, 3 wording problem (em dash or banned word).

import { chromium } from 'playwright'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..', '..', '..', '..')
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
)
if (!args.in) {
  console.error('Usage: render-quote.mjs --in <quote.json> [--out <quote.pdf>]')
  process.exit(1)
}
const inPath = resolve(args.in)
const outPath = resolve(args.out || join(dirname(inPath), `${'quote'}.pdf`))
const q = JSON.parse(await readFile(inPath, 'utf8'))
const studio = JSON.parse(await readFile(join(repoRoot, 'tools', 'audit', 'studio.json'), 'utf8'))

// ---------- checks ----------
const fail = (msg, code = 1) => {
  console.error(msg)
  process.exit(code)
}
if (typeof q.gstRegistered !== 'boolean') fail('quote.json needs "gstRegistered": true or false. Check docs/pricing.md.')
if (!Array.isArray(q.items) || !q.items.length) fail('quote.json needs at least one item.')
for (const it of q.items) {
  if (typeof it.unitPriceExGst !== 'number' || it.unitPriceExGst < 0) fail(`Item "${it.description}" needs a numeric unitPriceExGst.`)
}
const pctTotal = (q.milestones || []).reduce((s, m) => s + (m.percent || 0), 0)
if (q.milestones?.length && Math.abs(pctTotal - 100) > 0.01) fail(`Milestone percentages add up to ${pctTotal}, not 100.`)
const text = JSON.stringify(q)
if (/[—–]/.test(text)) fail('quote.json contains an em dash or en dash. Reword it.', 3)
const banned = text.match(/\b(revolutioni[sz]e|game.?changer|disrupt|unlock|supercharge|10x|leverage|seamless|synergy|best.in.class|cutting.edge|empower|elevate|streamline)\b/i)
if (banned) fail(`quote.json uses the banned word "${banned[0]}". Reword it.`, 3)

// ---------- maths, in cents ----------
const cents = (n) => Math.round(n * 100)
const money = (c) => `$${(c / 100).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const gstRate = q.gstRegistered ? 0.1 : 0
const lines = q.items.map((it) => {
  const qty = it.qty ?? 1
  const lineEx = cents(it.unitPriceExGst) * qty
  return { ...it, qty, lineEx }
})
const subtotal = lines.reduce((s, l) => s + l.lineEx, 0)
const gst = Math.round(subtotal * gstRate)
const total = subtotal + gst

// Milestones: split the total by percent, put any rounding cent on the last one
let allocated = 0
const milestones = (q.milestones || []).map((m, i, all) => {
  const amt = i === all.length - 1 ? total - allocated : Math.round((total * m.percent) / 100)
  allocated += amt
  return { ...m, amount: amt }
})

const care = q.carePlan
const careEx = care ? cents(care.monthlyExGst) : 0
const careGst = Math.round(careEx * gstRate)

// ---------- html ----------
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const list = (arr) => (arr?.length ? `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '')
const fonts = pathToFileURL(join(repoRoot, 'public', 'fonts')).href
const incl = q.gstRegistered ? 'inc. GST' : ''
const exLabel = q.gstRegistered ? ' ex GST' : ''
const validUntil = (() => {
  const d = new Date(q.date)
  if (isNaN(d)) return ''
  d.setDate(d.getDate() + (q.validDays || 30))
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
})()
const dateText = isNaN(new Date(q.date)) ? esc(q.date) : new Date(q.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })

const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><style>
@font-face { font-family: "Plus Jakarta Sans"; font-weight: 400 800; src: url("${fonts}/plus-jakarta-sans-latin.woff2") format("woff2"); }
@font-face { font-family: "Inter"; font-weight: 400 600; src: url("${fonts}/inter-latin.woff2") format("woff2"); }
@page { size: A4; margin: 16mm 15mm 18mm; }
:root { --teal:#1B6B6B; --amber:#E8943A; --charcoal:#1E2A2A; --cream:#F7F5F2; --muted:#5E6E6E; --line:#D9D3CB; }
body { font-family: Inter, "Segoe UI", sans-serif; color: var(--charcoal); font-size: 10pt; line-height: 1.45; margin:0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
header { display:flex; justify-content:space-between; align-items:flex-start; border-top: 6px solid var(--teal); background: var(--cream); padding: 6mm 6mm 5mm; margin-bottom: 6mm; }
.brand { font-family:"Plus Jakarta Sans",sans-serif; font-weight:800; font-size:13pt; letter-spacing:-0.02em; }
.brand span { color: var(--amber); }
.studio { color: var(--muted); font-size: 8.8pt; margin-top: 1.5mm; line-height:1.5; }
h1 { font-family:"Plus Jakarta Sans",sans-serif; font-weight:800; font-size: 22pt; margin:0; letter-spacing:-0.02em; text-align:right; }
.meta { text-align:right; font-size: 9pt; color: var(--muted); margin-top: 1.5mm; line-height:1.5; }
.meta strong, .for strong { color: var(--charcoal); }
h2 { font-family:"Plus Jakarta Sans",sans-serif; font-weight:800; font-size: 12.5pt; margin: 7mm 0 2.5mm; letter-spacing:-0.01em; break-after: avoid; }
table { width:100%; border-collapse: collapse; }
th { text-align:left; font-size: 8.6pt; color: var(--muted); font-weight:600; border-bottom: 1.5px solid var(--charcoal); padding: 1.8mm 2mm; }
td { padding: 2mm; border-bottom: 1px solid var(--line); vertical-align: top; }
td.num, th.num { text-align:right; white-space:nowrap; }
.desc small { display:block; color: var(--muted); font-size: 8.8pt; margin-top: 0.5mm; }
.totals td { border:none; padding: 1.2mm 2mm; }
.totals tr.grand td { font-family:"Plus Jakarta Sans",sans-serif; font-weight:800; font-size: 12pt; border-top: 1.5px solid var(--charcoal); padding-top: 2.5mm; }
.box { background: var(--cream); border-left: 4px solid var(--teal); padding: 3.5mm 5mm; }
ul { margin: 1mm 0 0; padding-left: 5mm; } li { margin: 0 0 1mm; }
.two { display:grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
.accept { margin-top: 8mm; border: 1px solid var(--line); padding: 5mm; break-inside: avoid; }
.sig { display:grid; grid-template-columns: 2fr 2fr 1fr; gap: 6mm; margin-top: 9mm; font-size: 8.6pt; color: var(--muted); }
.sig div { border-top: 1px solid var(--charcoal); padding-top: 1.5mm; }
.fine { color: var(--muted); font-size: 8.4pt; margin-top: 5mm; }
</style></head><body>
<header>
  <div><div class="brand">Field<span>bourne</span> Digital</div>
  <div class="studio">${esc(studio.person)}, ${esc(studio.town)}<br>${studio.phone ? `${esc(studio.phone)} &middot; ` : ''}${esc(studio.email)} &middot; ${esc(studio.site)}<br>ABN ${esc(studio.abn)}</div></div>
  <div><h1>Quote</h1><div class="meta"><strong>Quote</strong> ${esc(q.quoteNumber)}<br><strong>Date</strong> ${dateText}<br><strong>Valid until</strong> ${validUntil}</div></div>
</header>
<div class="for"><strong>Prepared for</strong> ${esc(q.client?.business)}${q.client?.contact ? `, attention ${esc(q.client.contact)}` : ''}${q.client?.abn ? `<br>ABN ${esc(q.client.abn)}` : ''}</div>
${q.summary ? `<h2>What this covers</h2><p>${esc(q.summary)}</p>` : ''}
<h2>The work</h2>
<table><thead><tr><th>Item</th><th class="num">Qty</th><th class="num">Price${exLabel}</th><th class="num">Amount${exLabel}</th></tr></thead><tbody>
${lines.map((l) => `<tr><td class="desc">${esc(l.description)}${l.detail ? `<small>${esc(l.detail)}</small>` : ''}</td><td class="num">${l.qty}</td><td class="num">${money(cents(l.unitPriceExGst))}</td><td class="num">${money(l.lineEx)}</td></tr>`).join('')}
</tbody></table>
<table class="totals" style="width:60%; margin-left:auto; margin-top:2mm">
${q.gstRegistered ? `<tr><td>Subtotal (ex GST)</td><td class="num">${money(subtotal)}</td></tr>` : ''}
${q.gstRegistered ? `<tr><td>GST (10%)</td><td class="num">${money(gst)}</td></tr>` : ''}
<tr class="grand"><td>Total ${incl}</td><td class="num">${money(total)}</td></tr>
</table>
${q.gstRegistered ? '' : '<p class="fine">FieldBourne Digital is not registered for GST, so no GST is charged.</p>'}
${milestones.length ? `<h2>When you pay</h2><table><thead><tr><th>Milestone</th><th>When</th><th class="num">Share</th><th class="num">Amount ${incl}</th></tr></thead><tbody>
${milestones.map((m) => `<tr><td>${esc(m.name)}</td><td>${esc(m.when)}</td><td class="num">${m.percent}%</td><td class="num">${money(m.amount)}</td></tr>`).join('')}</tbody></table>` : ''}
${care ? `<h2>Care plan after launch</h2><div class="box"><strong>${esc(care.name)}: ${money(careEx + careGst)} a month ${incl}</strong>${q.gstRegistered ? ` (${money(careEx)} ex GST)` : ''}${care.minimumMonths ? `, minimum ${care.minimumMonths} months` : ''}${list(care.includes)}${care.notIncluded?.length ? `<p style="margin:2mm 0 0"><strong>Not included</strong></p>${list(care.notIncluded)}` : ''}</div>` : ''}
<div class="two">
  <div><h2>Assumptions</h2>${list(q.assumptions)}</div>
  <div><h2>Not included</h2>${list(q.exclusions)}</div>
</div>
${q.hosting ? `<h2>Hosting and ownership</h2><p>${esc(q.hosting)}</p>` : ''}
<div class="accept"><strong>To go ahead</strong>, sign below or reply to the email this came with saying you accept quote ${esc(q.quoteNumber)}. Work starts once the first payment is in.
<div class="sig"><div>Name</div><div>Signature</div><div>Date</div></div></div>
<p class="fine">This is a quote, not a tax invoice. Prices are in Australian dollars. ${q.terms ? esc(q.terms) : ''}</p>
</body></html>`

const htmlPath = join(dirname(outPath), 'quote.html')
await writeFile(htmlPath, html)
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: outPath, format: 'A4', printBackground: true, preferCSSPageSize: true })
} finally {
  await browser.close()
}
console.log(`Wrote ${outPath}`)
console.log(JSON.stringify({ subtotalExGst: money(subtotal), gst: money(gst), total: money(total), carePlanMonthly: care ? money(careEx + careGst) : null }))
