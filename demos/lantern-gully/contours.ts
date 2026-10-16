/** Generator only. Draws a topographic map of the gully: a height field, then contour lines by marching squares.
 *  Run `node demos/lantern-gully/bake-contours.mjs` to write contours.baked.ts; the page never imports this file. */
export const MAP_W = 1000
export const MAP_H = 700

type Pt = [number, number]

/** Creek centreline, north-west to south-east. */
const CREEK_CTRL: Pt[] = [
  [-40, 60], [120, 120], [250, 215], [330, 330], [430, 400], [545, 430], [660, 520], [790, 585], [940, 690], [1040, 760],
]

function catmull(points: Pt[], samplesPer = 28): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    for (let s = 0; s < samplesPer; s++) {
      const t = s / samplesPer
      const t2 = t * t
      const t3 = t2 * t
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ])
    }
  }
  out.push(points[points.length - 1])
  return out
}

const creekPts = catmull(CREEK_CTRL)
/** A coarser copy keeps the height field cheap to compute at load. */
const creekNear = creekPts.filter((_, i) => i % 4 === 0)

/** x, y, sigma, height */
const HILLS: Array<[number, number, number, number]> = [
  [900, 70, 300, 1.0],
  [340, 70, 140, 0.5],
  [130, 470, 170, 0.45],
  [650, 215, 120, 0.36],
  [520, 650, 140, 0.26],
  [960, 520, 150, 0.4],
]

function height(x: number, y: number): number {
  let h = 0.1 + 0.00018 * (x - y * 0.2)
  for (const [hx, hy, s, a] of HILLS) {
    const dx = x - hx
    const dy = y - hy
    h += a * Math.exp(-(dx * dx + dy * dy) / (2 * s * s))
  }
  let best = 1e9
  for (const [cx, cy] of creekNear) {
    const dx = x - cx
    const dy = y - cy
    const d = dx * dx + dy * dy
    if (d < best) best = d
  }
  h -= 0.42 * Math.exp(-best / (2 * 60 * 60))
  // a little lumpiness so the lines read as drawn by land, not by a compass
  h += 0.022 * Math.sin(x * 0.021 + y * 0.013) + 0.016 * Math.cos(x * 0.0087 - y * 0.027) + 0.01 * Math.sin(x * 0.047 + 1.7) * Math.cos(y * 0.039)
  return h
}

export interface ContourLevel {
  major: boolean
  /** Path data strings, one per polyline. */
  paths: string[]
}

type Seg = [string, string]

function buildLevel(grid: number[][], cols: number, rows: number, cell: number, level: number): string[] {
  const pts = new Map<string, Pt>()
  const segs: Seg[] = []
  const key = (kind: 'h' | 'v', i: number, j: number) => `${kind}${i},${j}`
  const lerp = (a: number, b: number) => (level - a) / (b - a)
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = grid[j][i]
      const b = grid[j][i + 1]
      const c = grid[j + 1][i + 1]
      const d = grid[j + 1][i]
      const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0)
      if (idx === 0 || idx === 15) continue
      const top = key('h', i, j)
      const bottom = key('h', i, j + 1)
      const left = key('v', i, j)
      const right = key('v', i + 1, j)
      if (!pts.has(top)) pts.set(top, [(i + lerp(a, b)) * cell, j * cell])
      if (!pts.has(bottom)) pts.set(bottom, [(i + lerp(d, c)) * cell, (j + 1) * cell])
      if (!pts.has(left)) pts.set(left, [i * cell, (j + lerp(a, d)) * cell])
      if (!pts.has(right)) pts.set(right, [(i + 1) * cell, (j + lerp(b, c)) * cell])
      switch (idx) {
        case 1: case 14: segs.push([left, bottom]); break
        case 2: case 13: segs.push([bottom, right]); break
        case 3: case 12: segs.push([left, right]); break
        case 4: case 11: segs.push([top, right]); break
        case 5: segs.push([top, left], [bottom, right]); break
        case 6: case 9: segs.push([top, bottom]); break
        case 7: case 8: segs.push([top, left]); break
        case 10: segs.push([top, right], [left, bottom]); break
      }
    }
  }
  const adj = new Map<string, string[]>()
  for (const [p, q] of segs) {
    if (!adj.has(p)) adj.set(p, [])
    if (!adj.has(q)) adj.set(q, [])
    adj.get(p)!.push(q)
    adj.get(q)!.push(p)
  }
  const used = new Set<string>()
  const edgeKey = (p: string, q: string) => (p < q ? `${p}|${q}` : `${q}|${p}`)
  const chains: string[][] = []
  const walk = (start: string) => {
    const chain = [start]
    let cur = start
    for (;;) {
      const next = (adj.get(cur) ?? []).find((n) => !used.has(edgeKey(cur, n)))
      if (!next) break
      used.add(edgeKey(cur, next))
      chain.push(next)
      cur = next
    }
    return chain
  }
  for (const [k, n] of adj) {
    if (n.length === 1) {
      const c = walk(k)
      if (c.length > 1) chains.push(c)
    }
  }
  for (const k of adj.keys()) {
    const c = walk(k)
    if (c.length > 1) chains.push(c)
  }
  const f = (n: number) => Math.round(n * 10) / 10
  return chains
    .filter((c) => c.length > 6)
    .map((c) => {
      const all = c.map((k) => pts.get(k)!)
      // Keep every third point: the quadratic smoothing below fills the gaps and the file stays small.
      const p = all.filter((_, i) => i % 3 === 0 || i === all.length - 1)
      let d = `M${f(p[0][0])} ${f(p[0][1])}`
      for (let n = 1; n < p.length - 1; n++) {
        const mx = (p[n][0] + p[n + 1][0]) / 2
        const my = (p[n][1] + p[n + 1][1]) / 2
        d += `Q${f(p[n][0])} ${f(p[n][1])} ${f(mx)} ${f(my)}`
      }
      d += `L${f(p[p.length - 1][0])} ${f(p[p.length - 1][1])}`
      return d
    })
}

function compute(): ContourLevel[] {
  const cell = 9
  const cols = Math.ceil(MAP_W / cell)
  const rows = Math.ceil(MAP_H / cell)
  const grid: number[][] = []
  let lo = 1e9
  let hi = -1e9
  for (let j = 0; j <= rows; j++) {
    const row: number[] = []
    for (let i = 0; i <= cols; i++) {
      const h = height(i * cell, j * cell)
      row.push(h)
      if (h < lo) lo = h
      if (h > hi) hi = h
    }
    grid.push(row)
  }
  const steps = 26
  const levels: ContourLevel[] = []
  for (let s = 1; s < steps; s++) {
    const level = lo + ((hi - lo) * s) / steps
    levels.push({ major: s % 4 === 0, paths: buildLevel(grid, cols, rows, cell, level) })
  }
  return levels
}

export const contourLevels: ContourLevel[] = compute()

/** Smooth creek path for drawing. */
export const creekPath: string = (() => {
  const p = creekPts.filter((_, i) => i % 3 === 0)
  let d = `M${p[0][0]} ${p[0][1]}`
  for (let n = 1; n < p.length - 1; n++) {
    d += `Q${p[n][0].toFixed(1)} ${p[n][1].toFixed(1)} ${((p[n][0] + p[n + 1][0]) / 2).toFixed(1)} ${((p[n][1] + p[n + 1][1]) / 2).toFixed(1)}`
  }
  d += `L${p[p.length - 1][0].toFixed(1)} ${p[p.length - 1][1].toFixed(1)}`
  return d
})()
