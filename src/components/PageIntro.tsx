import type { ReactNode } from 'react';
import { RIDGES } from './Ridgelines';

/** The top of every inner page: heading and lead on the morning sky, a low still range underneath. */
export function PageIntro({ title, lead, children }: { title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream)_0%,var(--color-sky)_70%,var(--color-mist)_100%)]">
      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-14 pb-[clamp(90px,12vw,150px)] md:px-8 md:pt-20">
        <h1 className="max-w-[18ch] text-[clamp(2.3rem,5vw,3.8rem)] leading-[1.04] text-dark">{title}</h1>
        {lead && <div className="measure mt-5 text-[1.15rem] leading-relaxed text-mid">{lead}</div>}
        {children}
      </div>
      <svg
        viewBox="0 160 1600 140"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 block h-[clamp(70px,9vw,120px)] w-full"
      >
        <path d={RIDGES.foothills} fill="var(--color-ridge-far)" />
        <path d={RIDGES.near} fill="var(--color-ridge-2)" opacity="0.6" />
        <path d={RIDGES.paddock} fill="var(--color-cream)" />
      </svg>
    </section>
  );
}
