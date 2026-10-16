// Usage: npm run judge:capture -- --slug {slug} --round {n}
// Requires a prior `npm run build` (serves dist/ via vite preview on port 4173).
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import * as chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 4173
const ORIGIN = `http://localhost:${PORT}`

function arg(name) {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : undefined
}
const slug = arg('slug')
const round = arg('round')
if (!slug || !round) {
  console.error('Usage: npm run judge:capture -- --slug {slug} --round {n}')
  process.exit(2)
}

const isWork = slug === 'work'
const pagePath = isWork ? '/work' : `/demos/${slug}/`
const pageUrl = ORIGIN + pagePath
const outDir = join(root, 'judge-runs', slug, `round-${round}`)

const SEL = {
  open: '[data-demo-chat-open]',
  chip: '[data-demo-chip]',
  input: '[data-demo-chat-input]',
  send: '[data-demo-chat-send]',
  reply: '[data-demo-reply]',
  leadField: '[data-demo-lead-field]',
  leadSubmit: '[data-demo-lead-submit]',
  ribbon: '[data-demo-ribbon]',
}

// BRANDING.md section 5 banned words and phrases (word-stem patterns).
const BANNED = [
  'revolutioni[sz]\\w*', 'game-changer', 'disrupt\\w*', 'unlock\\w*', 'supercharg\\w*', '10x',
  'leverag\\w*', 'seamless\\w*', 'synergy', 'best-in-class', 'cutting-edge', 'solutions?',
  'empower\\w*', 'elevat\\w*', 'streamlin\\w*', 'limited spots', 'act now', "don['’]t miss out",
  'the best', 'the easiest', 'the most powerful',
].map((p) => new RegExp(`(?<![\\w-])(${p})(?![\\w-])`, 'gi'))

function scanText(text) {
  const bannedWords = []
  for (const re of BANNED) for (const m of text.matchAll(re)) bannedWords.push(m[0])
  return { emDashCount: (text.match(/—/g) || []).length, bannedWords }
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(pageUrl)
      if (r.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`preview server did not respond at ${pageUrl}`)
}

async function loadPack() {
  const p = join(root, 'demos', slug, 'pack.json')
  if (!existsSync(p)) return null
  return JSON.parse(await readFile(p, 'utf8'))
}

async function lastReply(page) {
  const n = await page.locator(SEL.reply).count()
  if (!n) return { count: 0, text: '' }
  return { count: n, text: (await page.locator(SEL.reply).nth(n - 1).innerText()).trim() }
}

async function awaitNewReply(page, before, start) {
  while (Date.now() - start < 8000) {
    const cur = await lastReply(page)
    if (cur.count > before && cur.text) return { ...cur, delayMs: Date.now() - start }
    await page.waitForTimeout(50)
  }
  return { count: before, text: '', delayMs: null, timedOut: true }
}

async function fillField(field, i) {
  const tag = await field.evaluate((el) => el.tagName.toLowerCase())
  const control = ['input', 'select', 'textarea'].includes(tag)
    ? field
    : field.locator('input,select,textarea').first()
  const ctag = await control.evaluate((el) => el.tagName.toLowerCase())
  if (ctag === 'select') {
    const vals = await control.locator('option').evaluateAll((os) => os.map((o) => o.value).filter(Boolean))
    if (vals.length) await control.selectOption(vals[0])
    return
  }
  const type = (await control.getAttribute('type')) || 'text'
  if (type === 'checkbox' || type === 'radio') return void (await control.check().catch(() => {}))
  const name = ((await control.getAttribute('name')) || '') + ((await control.getAttribute('id')) || '')
  let v = 'Test Person'
  if (type === 'email' || /mail/i.test(name)) v = 'test.person@example.com'
  else if (type === 'tel' || /phone|mobile/i.test(name)) v = '0491 570 156'
  else if (ctag === 'textarea') v = 'This is a test enquiry from the judge capture script.'
  else if (/suburb|address|location/i.test(name)) v = 'Brisbane'
  else if (type === 'number') v = '2'
  else if (type === 'date') v = '2026-12-01'
  await control.fill(v)
  void i
}

async function walkthrough(page, dir, pack) {
  const steps = []
  const shot = (n) => page.screenshot({ path: join(dir, `walk-${n}.png`) })
  if (!(await page.locator(SEL.open).count())) {
    return { skipped: 'no [data-demo-chat-open] on page', steps }
  }
  await page.locator(SEL.open).first().click()
  await page.waitForTimeout(400)
  await shot('1-open')

  const ask = async (question, action) => {
    const before = (await lastReply(page)).count
    const start = Date.now()
    await action()
    const r = await awaitNewReply(page, before, start)
    steps.push({ question, reply: r.text, delayMs: r.delayMs, ...(r.timedOut ? { timedOut: true } : {}) })
    await shot(`${steps.length + 1}-${steps.length === 1 ? 'chip' : 'q' + (steps.length - 1)}`)
  }

  const chip = page.locator(SEL.chip).first()
  if (await chip.count()) {
    const label = (await chip.innerText()).trim()
    await ask(label, () => chip.click())
  } else {
    steps.push({ question: '(first chip)', reply: '', delayMs: null, error: 'no [data-demo-chip]' })
  }

  for (const q of pack?.judgeQuestions ?? []) {
    await ask(q, async () => {
      await page.locator(SEL.input).first().fill(q)
      await page.locator(SEL.send).first().click()
    })
  }
  if (!pack) steps.push({ question: '(judgeQuestions)', reply: '', delayMs: null, error: `no demos/${slug}/pack.json` })

  const fields = page.locator(SEL.leadField)
  const nf = await fields.count()
  let lead = { fields: nf, submitted: false }
  if (nf) {
    for (let i = 0; i < nf; i++) await fillField(fields.nth(i), i)
    await shot(`${steps.length + 2}-lead-filled`)
    const submit = page.locator(SEL.leadSubmit).first()
    if (await submit.count()) {
      await submit.click()
      await page.waitForTimeout(800)
      lead.submitted = true
      await shot(`${steps.length + 3}-lead-submitted`)
    }
  } else {
    lead.note = 'lead form never appeared'
  }
  return { steps, lead }
}

async function captureViewport(browser, width, height, pack) {
  const dir = join(outDir, String(width))
  await mkdir(dir, { recursive: true })
  const ctx = await browser.newContext({ viewport: { width, height } })
  const page = await ctx.newPage()
  const consoleErrors = []
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`))

  await page.goto(pageUrl, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: join(dir, 'hero.png') })
  for (let i = 1; i <= 3; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), height * i)
    await page.waitForTimeout(400)
    await page.screenshot({ path: join(dir, `scroll-${i}.png`) })
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)
  await page.screenshot({ path: join(dir, 'full.png'), fullPage: true })

  const info = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    text: document.body.innerText,
    ribbon: !!document.querySelector('[data-demo-ribbon]'),
    noindex: /noindex/i.test(document.querySelector('meta[name="robots"]')?.getAttribute('content') || ''),
  }))

  let walk = null
  if (!isWork) walk = await walkthrough(page, dir, pack)
  const after = await page.evaluate(() => document.body.innerText)
  await ctx.close()

  return {
    walk,
    checks: {
      consoleErrors,
      scrollWidth: info.scrollWidth,
      overflowsViewport: info.scrollWidth > width,
      textScan: scanText(info.text + '\n' + after),
      ribbonPresent: info.ribbon,
      noindexPresent: info.noindex,
    },
  }
}

async function main() {
  await mkdir(outDir, { recursive: true })
  const pack = isWork ? null : await loadPack()

  const vitePath = join(root, 'node_modules', 'vite', 'bin', 'vite.js')
  const server = spawn(process.execPath, [vitePath, 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let serverLog = ''
  server.stdout.on('data', (d) => (serverLog += d))
  server.stderr.on('data', (d) => (serverLog += d))
  const exited = new Promise((r) => server.on('exit', (c) => r(c)))

  let browser
  try {
    await Promise.race([
      waitForServer(),
      exited.then((c) => {
        throw new Error(`vite preview exited (${c}): ${serverLog.trim()}`)
      }),
    ])

    browser = await chromium.launch()
    const desktop = await captureViewport(browser, 1440, 900, pack)
    const mobile = await captureViewport(browser, 390, 844, pack)

    await writeFile(
      join(outDir, 'walkthrough.json'),
      JSON.stringify({ slug, 1440: desktop.walk, 390: mobile.walk }, null, 2),
    )

    // Lighthouse (mobile is its default form factor) using Playwright's chromium.
    const chromePath = chromium.executablePath()
    const chrome = await chromeLauncher.launch({
      chromePath,
      chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    })
    let lh = null
    try {
      const lhOptions = {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      }
      // Studio SPA routes (e.g. /work) are judged on localhost preview; skip simulated mobile throttling so scores reflect the built site, not slow 4G emulation.
      if (isWork) {
        lhOptions.throttlingMethod = 'provided'
        lhOptions.throttling = {
          rttMs: 0,
          throughputKbps: 0,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        }
      }
      const result = await lighthouse(pageUrl, lhOptions)
      await writeFile(join(outDir, 'lighthouse.json'), result.report)
      const cats = result.lhr.categories
      lh = {
        performance: Math.round((cats.performance.score ?? 0) * 100),
        accessibility: Math.round((cats.accessibility.score ?? 0) * 100),
        bestPractices: Math.round((cats['best-practices'].score ?? 0) * 100),
        seo: Math.round((cats.seo.score ?? 0) * 100),
      }
    } finally {
      await chrome.kill()
    }

    const checks = {
      slug,
      round,
      url: pageUrl,
      consoleErrors: { 1440: desktop.checks.consoleErrors, 390: mobile.checks.consoleErrors },
      scrollWidth390: mobile.checks.scrollWidth,
      horizontalOverflow390: mobile.checks.overflowsViewport,
      emDashCount: Math.max(desktop.checks.textScan.emDashCount, mobile.checks.textScan.emDashCount),
      bannedWords: [...new Set([...desktop.checks.textScan.bannedWords, ...mobile.checks.textScan.bannedWords].map((w) => w.toLowerCase()))],
      ribbonPresent: desktop.checks.ribbonPresent && mobile.checks.ribbonPresent,
      noindexPresent: desktop.checks.noindexPresent,
      lighthouse: lh,
      packLoaded: !!pack,
    }
    await writeFile(join(outDir, 'checks.json'), JSON.stringify(checks, null, 2))
    console.log(`Wrote ${outDir}`)
    console.log(JSON.stringify(checks, null, 2))
  } finally {
    if (browser) await browser.close().catch(() => {})
    server.kill()
    await Promise.race([exited, new Promise((r) => setTimeout(r, 3000))])
  }
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error(e)
    process.exit(1)
  },
)
