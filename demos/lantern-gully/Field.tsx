import { MAP_H, MAP_W, heroMarkup } from './contours.baked.ts'

/** Contour lines only. A quiet backdrop for the hero and the contact band. The markup is baked ahead of time. */
export function ContourField({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`field ${className}`}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: heroMarkup }}
    />
  )
}
