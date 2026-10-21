// Usage: node scripts/work-shots.mjs  (run after npm run build)
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 4173
const ORIGIN = `http://localhost:${PORT}`
// Clip heights end each shot on a clean edge, above the next section's first line.
const shots = [
  { slug: 'wirebird', height: 728 },
  { slug: 'sorrel-slate', height: 720 },
  { slug: 'lantern-gully', height: 830 },
]
const webpWidths = [640, 1280]
const outDir = join(root, 'public', 'images', 'work')

async function waitForServer(path) {
  const url = ORIGIN + path
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url)
      if (r.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`preview server did not respond at ${url}`)
}

async function main() {
  await mkdir(outDir, { recursive: true })

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
      waitForServer('/demos/wirebird/'),
      exited.then((c) => {
        throw new Error(`vite preview exited (${c}): ${serverLog.trim()}`)
      }),
    ])

    browser = await chromium.launch()
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()

    const encoder = await ctx.newPage()

    for (const { slug, height } of shots) {
      await page.goto(`${ORIGIN}/demos/${slug}/`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1500)
      const clip = { x: 0, y: 0, width: 1440, height }
      await page.screenshot({
        path: join(outDir, `${slug}.jpg`),
        type: 'jpeg',
        quality: 78,
        clip,
      })
      console.log(`Wrote public/images/work/${slug}.jpg (1440x${height})`)

      // WebP at a few widths, resized in the browser canvas (no extra dependencies).
      const png = (await page.screenshot({ type: 'png', clip })).toString('base64')
      for (const w of webpWidths) {
        const dataUrl = await encoder.evaluate(
          async ({ png, w, height }) => {
            const img = new Image()
            img.src = 'data:image/png;base64,' + png
            await img.decode()
            const c = document.createElement('canvas')
            c.width = w
            c.height = Math.round((height * w) / 1440)
            const x = c.getContext('2d')
            x.imageSmoothingQuality = 'high'
            x.drawImage(img, 0, 0, c.width, c.height)
            return c.toDataURL('image/webp', 0.8)
          },
          { png, w, height },
        )
        await writeFile(join(outDir, `${slug}-${w}.webp`), Buffer.from(dataUrl.split(',')[1], 'base64'))
        console.log(`Wrote public/images/work/${slug}-${w}.webp`)
      }
    }

    await ctx.close()
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
