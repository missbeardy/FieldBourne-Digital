import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

export type LegalSection = { title: string; body: ReactNode };

/** Shared layout for Privacy and Terms: plain reading page, one column, no cards. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
  other,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
  other: { to: string; label: string };
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-14 pb-24 md:px-8 md:pt-20">
      <h1 className="text-[clamp(2.2rem,4.5vw,3.2rem)] text-dark">{title}</h1>
      <p className="mt-3 text-mid">Last updated: {updated}</p>
      <div className="mt-6 text-lg leading-relaxed text-dark/85">{intro}</div>
      {sections.map((s) => (
        <section key={s.title} className="mt-10">
          <h2 className="text-2xl text-dark">{s.title}</h2>
          <div className="mt-3 space-y-3 leading-relaxed text-mid [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">{s.body}</div>
        </section>
      ))}
      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-2xl text-dark">Contact</h2>
        <p className="mt-3 leading-relaxed text-mid">
          Darren, FieldBourne Digital, Beaudesert QLD 4285
          <br />
          <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal">{SITE_CONFIG.contactEmail}</a> or{' '}
          <a href={SITE_CONFIG.phoneHref} className="text-teal">{SITE_CONFIG.phoneDisplay}</a>
          <br />
          ABN {SITE_CONFIG.abn}
        </p>
        <p className="mt-4 text-mid">
          See also the <Link to={other.to} className="text-teal">{other.label}</Link>.
        </p>
      </section>
    </article>
  );
}
