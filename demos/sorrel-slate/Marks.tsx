import type { ReactNode, SVGProps } from 'react'

/**
 * Hand-drawn produce marks. Each mark is drawn twice: a flat colour layer that is
 * nudged off register (like a two-pass print) and an ink outline on top.
 * Classes: f-g sorrel green, f-y butter yellow, f-r beet rose, f-t crust tan,
 * f-w egg white, f-s slate. "d" paths are detail lines (outline layer only).
 */
export type MarkName = 'leaf' | 'egg' | 'lemon' | 'beet' | 'pumpkin' | 'loaf' | 'tomato' | 'cup'

const SHAPES: Record<MarkName, ReactNode> = {
  leaf: (
    <>
      <path className="f-g" d="M50 6 C66 22 68 44 58 62 C66 62 76 66 84 76 C72 82 62 80 54 74 L53 90 L47 90 L46 74 C38 80 28 82 16 76 C24 66 34 62 42 62 C32 44 34 22 50 6 Z" />
      <path className="d" d="M50 16 L50 90" />
      <path className="d" d="M50 34 L59 27 M50 34 L41 27 M50 48 L61 39 M50 48 L39 39 M50 62 L61 55 M50 62 L39 55" />
    </>
  ),
  egg: (
    <>
      <path className="f-w" d="M20 50 C17 32 38 16 56 21 C74 19 86 34 81 51 C88 66 75 83 58 80 C48 90 27 85 25 70 C14 66 15 56 20 50 Z" />
      <circle className="f-y" cx="52" cy="50" r="15" />
      <path className="d" d="M44 44 C46 40 50 38 54 39" />
    </>
  ),
  lemon: (
    <>
      <circle className="f-y" cx="50" cy="50" r="37" />
      <circle className="d" cx="50" cy="50" r="30" fill="none" />
      <path className="d" d="M50 50 L50 22 M50 50 L74 36 M50 50 L74 64 M50 50 L50 78 M50 50 L26 64 M50 50 L26 36" />
    </>
  ),
  beet: (
    <>
      <path className="f-g" d="M50 8 C60 14 60 25 50 33 C40 25 40 14 50 8 Z" />
      <path className="f-g" d="M28 12 C37 12 42 20 41 30 C32 28 26 21 28 12 Z" />
      <path className="f-g" d="M73 14 C74 22 69 29 60 31 C58 22 64 14 73 14 Z" />
      <path className="f-r" d="M50 34 C73 34 86 52 79 69 C74 81 62 89 52 89 C40 89 24 81 21 65 C19 48 32 34 50 34 Z" />
      <path className="d" d="M52 89 C52 94 56 96 61 98" />
      <path className="d" d="M36 52 C40 46 46 43 52 43 M34 62 C34 60 35 58 36 56" />
    </>
  ),
  pumpkin: (
    <>
      <path className="f-y" d="M50 30 C30 28 13 44 13 62 C13 80 30 91 50 91 C70 91 87 80 87 62 C87 44 70 28 50 30 Z" />
      <path className="d" d="M50 30 C39 46 39 76 50 91 M50 30 C61 46 61 76 50 91 M32 36 C22 50 24 76 38 89 M68 36 C78 50 76 76 62 89" />
      <path className="f-g" d="M47 31 C46 22 50 14 60 11 C60 19 56 27 53 31 Z" />
    </>
  ),
  loaf: (
    <>
      <path className="f-t" d="M10 62 C10 35 31 19 50 19 C69 19 90 35 90 62 C90 77 77 84 50 84 C23 84 10 77 10 62 Z" />
      <path className="d" d="M30 34 L42 62 M46 28 L58 62 M62 32 L73 58" />
      <path className="d" d="M16 70 C34 76 66 76 84 70" />
    </>
  ),
  tomato: (
    <>
      <path className="f-r" d="M50 28 C74 20 91 39 87 61 C83 82 65 91 50 91 C35 91 17 82 13 61 C9 39 26 20 50 28 Z" />
      <path className="f-g" d="M50 30 L38 18 L48 24 L50 10 L53 24 L63 17 L52 30 Z" />
      <path className="d" d="M30 52 C30 46 33 42 38 40" />
    </>
  ),
  cup: (
    <>
      <path className="f-w" d="M16 44 H74 V62 C74 78 62 87 45 87 C28 87 16 78 16 62 Z" />
      <path className="d" d="M74 50 C90 50 90 70 72 70" />
      <path className="f-s" d="M22 44 H68 C68 49 62 52 45 52 C28 52 22 49 22 44 Z" />
      <path className="d" d="M34 34 C30 28 38 26 34 18 M48 34 C44 28 52 26 48 18 M62 34 C58 28 66 26 62 18" />
    </>
  ),
}

type Props = Omit<SVGProps<SVGSVGElement>, 'name'> & { name: MarkName; title?: string }

export function Mark({ name, title, className, ...rest }: Props) {
  const shape = SHAPES[name]
  return (
    <svg
      viewBox="0 0 100 100"
      className={`mark${className ? ' ' + className : ''}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      <g className="mk-fill" transform="translate(3.5 3)">
        {shape}
      </g>
      <g className="mk-line">{shape}</g>
    </svg>
  )
}

/** Four seats a side, drawn top-down: tables for forty, two long benches of twenty. */
export function FloorPlan() {
  const tables = [
    { x: 40, y: 34 },{ x: 40, y: 152 },{ x: 40, y: 270 },{ x: 40, y: 388 },
  ]
  return (
    <svg
      viewBox="0 0 400 500"
      className="floorplan"
      role="img"
      aria-label="Floor plan: four long tables, ten seats each, forty in all."
    >
      {tables.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y})`}>
          <rect className="fp-top" x="0" y="0" width="320" height="52" />
          <rect className="fp-top-line" x="0" y="0" width="320" height="52" />
          {Array.from({ length: 5 }, (_, s) => (
            <g key={s}>
              <circle className="fp-seat" cx={36 + s * 62} cy="-14" r="9" />
              <circle className="fp-seat" cx={36 + s * 62} cy="66" r="9" />
            </g>
          ))}
          <path className="fp-runner" d="M20 26 H300" />
        </g>
      ))}
    </svg>
  )
}
