import { useEffect, useRef, useState } from 'react'
import { cabins } from './availability.ts'
import type { Cabin } from './availability.ts'
import { MAP_H, MAP_W } from './contours.baked.ts'
import { mapMarkup } from './contours.map.ts'

const px = (v: number, total: number) => (v / 100) * total

/** Gate to Bottlebrush, then spurs up to Ironbark and across to Spotted Gum. */
function trackFor(): string {
  const [i, b, s] = cabins.map((c) => [px(c.x, MAP_W), px(c.y, MAP_H)] as const)
  return [
    `M70 640 Q250 600 ${b[0] - 120} ${b[1] + 80} T${b[0]} ${b[1]}`,
    `M${b[0]} ${b[1]} Q${b[0] - 60} ${b[1] - 110} ${i[0]} ${i[1]}`,
    `M${b[0]} ${b[1]} Q${b[0] + 120} ${b[1] + 40} ${s[0]} ${s[1]}`,
  ].join(' ')
}
const track = trackFor()

export default function MapView({ selected, onSelect }: { selected: Cabin['id']; onSelect: (id: Cabin['id']) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setDrawn(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`map ${drawn ? 'is-drawn' : ''}`} ref={ref}>
      <svg
        className="map-svg field"
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Hand-drawn contour map of the gully. The creek runs from the north-west to the south-east, with Ironbark on the ridge, Bottlebrush by the creek and Spotted Gum on the flat."
      >
        <g dangerouslySetInnerHTML={{ __html: mapMarkup }} />
        <path className="track" d={track} />
      </svg>

      <span aria-hidden="true" className="place place-gate" style={{ left: '7%', top: '91%' }}>Gate</span>
      <span aria-hidden="true" className="place place-creek" style={{ left: '15%', top: '20%' }}>The creek</span>
      <span aria-hidden="true" className="place place-hole" style={{ left: '63%', top: '75%' }}>Swimming hole</span>
      <span aria-hidden="true" className="place place-paddock" style={{ left: '86%', top: '58%' }}>Star paddock</span>
      <span aria-hidden="true" className="place place-barney" style={{ left: '95%', top: '7%' }}>Toward Mount Barney</span>
      <span aria-hidden="true" className="place place-note" style={{ left: '95%', top: '94%' }}>Sketch, not to scale</span>

      {cabins.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`pin pin-${c.side}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          aria-pressed={selected === c.id}
          aria-label={`${c.name}, sleeps ${c.sleeps}`}
          onClick={() => onSelect(c.id)}
        >
          <span className="pin-mark" aria-hidden="true" />
          <span className="pin-name" aria-hidden="true">{c.name}</span>
        </button>
      ))}
    </div>
  )
}
