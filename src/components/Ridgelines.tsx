import { useEffect, useRef } from 'react';

/*
  The Scenic Rim from the Beaudesert side, farthest to nearest, in a 1600 x 300 frame:
  the Main Range (with Mount Cordeaux's spike), then Mount Maroon, Mount Barney's two peaks
  and flat-topped Mount Lindesay, then the foothills, a near hill and the paddock.
  Shapes are simplified, not surveyed.
*/
export const RIDGES = {
  range:
    'M0 150 C80 140 150 146 230 128 C300 112 340 120 400 104 C430 96 445 70 460 66 C474 62 482 84 500 92 C560 110 640 96 720 104 C800 112 860 92 940 98 C1020 104 1090 88 1170 94 C1260 100 1330 84 1420 92 C1500 99 1560 92 1600 90 L1600 300 L0 300 Z',
  barney:
    'M0 190 C80 184 160 176 230 160 C270 150 300 124 330 118 C355 113 372 132 400 150 C470 186 600 182 700 176 C800 170 870 160 930 120 C960 98 985 66 1005 52 C1020 42 1034 46 1044 62 C1052 74 1062 74 1072 60 C1084 44 1100 42 1112 58 C1150 104 1210 150 1290 164 C1330 170 1360 160 1380 148 L1396 116 C1420 110 1450 110 1474 114 L1490 146 C1520 160 1570 166 1600 166 L1600 300 L0 300 Z',
  foothills:
    'M0 222 C150 200 290 214 420 196 C540 180 640 204 770 194 C900 184 1000 206 1130 192 C1250 180 1360 202 1480 192 C1540 188 1580 190 1600 190 L1600 300 L0 300 Z',
  near: 'M0 246 C190 226 360 246 560 228 C760 210 900 238 1080 226 C1260 214 1430 236 1600 222 L1600 300 L0 300 Z',
  paddock: 'M0 282 C260 270 520 282 820 270 C1100 260 1360 276 1600 266 L1600 300 L0 300 Z',
} as const;

type Layer = { key: string; d?: string; fill?: string; lag: number; drift: number; sun?: boolean };

/*
  How far each layer lags behind the page as you scroll (0 = moves with the page).
  Far ridges lag most, so they sink behind the nearer hills. The sun lags less than
  Mount Barney, so it climbs out from behind the peaks, and sinks back on the way up.
*/
const LAYERS: Layer[] = [
  { key: 'range', d: RIDGES.range, fill: 'var(--color-ridge-far)', lag: 0.5, drift: 6 },
  { key: 'sun', lag: 0.2, drift: 0, sun: true },
  { key: 'barney', d: RIDGES.barney, fill: 'var(--color-ridge-2)', lag: 0.38, drift: 14 },
  { key: 'foothills', d: RIDGES.foothills, fill: 'var(--color-ridge-3)', lag: 0.24, drift: 24 },
  { key: 'near', d: RIDGES.near, fill: 'var(--color-teal)', lag: 0.1, drift: 36 },
  { key: 'paddock', d: RIDGES.paddock, fill: 'var(--color-ridge-near)', lag: 0, drift: 0 },
];

/**
 * The hero landscape. Sits along the bottom of its (relative, overflow-hidden) parent.
 * Moves only while on screen, only via transforms, and not at all for reduced-motion users.
 */
export function Ridgelines() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const host = root.parentElement ?? root;
    let visible = true;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), rect.height);
      const progress = rect.height ? scrolled / rect.height : 0;
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        el.style.transform = `translate3d(${(-progress * layer.drift).toFixed(2)}px, ${(scrolled * layer.lag).toFixed(2)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(host);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /*
    --rh is the landscape's height. Each layer keeps the drawing's true 16:3 shape (width = 5.33 x height)
    and is placed so Mount Barney sits about 60% across the screen, on a phone or a wide monitor.
  */
  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--rh)] overflow-hidden"
    >
      {LAYERS.map((layer, i) => (
        <div
          key={layer.key}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className="absolute bottom-0 h-full w-[max(112%,calc(var(--rh)*5.334))] left-[min(-6%,calc(60%-var(--rh)*3.52))] will-change-transform"
        >
          <svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" className="block h-full w-full">
            {layer.sun ? (
              <circle cx="1150" cy="112" r="40" fill="var(--color-amber)" />
            ) : (
              <path d={layer.d} fill={layer.fill} />
            )}
          </svg>
        </div>
      ))}
    </div>
  );
}

/**
 * A still ridgeline used as the top edge of a deep section, so sections meet like hills
 * against the sky instead of with a hard line. Place it as the first child of a relative
 * section whose background is --color-ridge-near.
 */
export function RidgeEdge({ ground = 'var(--color-cream)' }: { ground?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative -mb-px h-[clamp(70px,11vw,150px)]" style={{ background: ground }}>
      <svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 block h-full w-full">
        <path d={RIDGES.foothills} fill="var(--color-ridge-3)" opacity="0.55" />
        <path d={RIDGES.near} fill="var(--color-teal)" opacity="0.85" />
        <path d={RIDGES.paddock} fill="var(--color-ridge-near)" />
        <rect x="0" y="282" width="1600" height="18" fill="var(--color-ridge-near)" />
      </svg>
    </div>
  );
}
