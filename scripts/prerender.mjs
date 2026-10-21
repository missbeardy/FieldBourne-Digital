// Saves every route as its own HTML file after `vite build`, so search engines get a real
// page (HTTP 200 with its own title, description and content) instead of GitHub Pages' 404.
//
// Runs as the last step of `npm run build`. Routes come from ROUTES in src/App.tsx.
// Output: dist/index.html for "/", dist/<route>.html for the rest (GitHub Pages serves
// /about from about.html).

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const port = 4179
const base = `http://localhost:${port}`

const appSource = await readFile(join(root, 'src', 'App.tsx'), 'utf8')
const block = appSource.match(/export const ROUTES = \[([\s\S]*?)\]/)
if (!block) throw new Error('Could not find ROUTES in src/App.tsx')
const routes = [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1])

const vite = join(root, 'node_modules', 'vite', 'bin', 'vite.js')
const server = spawn(process.execPath, [vite, 'preview', '--port', String(port), '--strictPort'], { stdio: 'pipe' })
let serverLog = ''
server.stdout.on('data', (d) => (serverLog += d))
server.stderr.on('data', (d) => (serverLog += d))

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(base)
      if (r.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`vite preview did not start:\n${serverLog}`)
}

let browser
try {
  await waitForServer()
  browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.waitForSelector('main h1', { timeout: 15000 })
    // Leave the page as a first-time visitor sees it: top of page, nothing scrolled or open.
    await page.evaluate(() => window.scrollTo(0, 0))
    // Lazy-loaded page code is preloaded with the preview server's full address; make it relative.
    const html = ('<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))).replaceAll(base, '')
    const file = route === '/' ? join(dist, 'index.html') : join(dist, `${route.slice(1)}.html`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
    const title = await page.title()
    console.log(`prerendered ${route.padEnd(22)} ${title}`)
  }
} finally {
  if (browser) await browser.close()
  server.kill()
}
