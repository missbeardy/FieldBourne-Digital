import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/** Holds back below-the-fold code until it is near the screen, or the browser has been idle for a while. */
export function Defer({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || ready) return
    const go = () => setReady(true)
    let io: IntersectionObserver | undefined
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && go(), { rootMargin: '600px 0px' })
      io.observe(el)
    }
    const timer = window.setTimeout(go, 4500)
    return () => {
      io?.disconnect()
      window.clearTimeout(timer)
    }
  }, [ready])

  return (
    <div ref={ref} className={`${className}${ready ? '' : ' is-pending'}`}>
      {ready ? children : null}
    </div>
  )
}
