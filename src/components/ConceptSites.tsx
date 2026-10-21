export const CONCEPT_SITES = [
  {
    slug: 'wirebird',
    name: 'Wirebird Electrical',
    kind: 'Trade',
    where: 'Electrician, Beaudesert',
    height: 728,
    blurb: "Quotes start in a chat and land on the owner's phone.",
    note: 'I built this one around the job docket Cal would hand over at the end of a day.',
    tryAsk: 'How much is a switchboard upgrade?',
    perf: 97,
    a11y: 100,
  },
  {
    slug: 'sorrel-slate',
    name: 'Sorrel & Slate',
    kind: 'Food',
    where: 'Cafe and function room, Boonah',
    height: 720,
    blurb: 'The menu changes with the time of day, so the page is never out of date.',
    note: 'Mel gets function enquiries with the date and head count already filled in.',
    tryAsk: '30 people, Saturday, 2pm?',
    perf: 99,
    a11y: 100,
  },
  {
    slug: 'lantern-gully',
    name: 'Lantern Gully Cabins',
    kind: 'Accommodation',
    where: 'Off-grid cabins under Mount Barney, Rathdowney',
    height: 830,
    blurb: 'Three cabins and one question guests always ask: is the weekend free?',
    note: 'The page shifts from dawn to night, because that is what the gully does.',
    tryAsk: 'Is the weekend of the 14th free?',
    perf: 99,
    a11y: 100,
  },
] as const;

function Shot({ slug, name, height, eager }: { slug: string; name: string; height: number; eager?: boolean }) {
  return (
    <img
      src={`/images/work/${slug}.jpg`}
      srcSet={`/images/work/${slug}-640.webp 640w, /images/work/${slug}-1280.webp 1280w`}
      sizes="(min-width: 1152px) 560px, (min-width: 768px) 48vw, 92vw"
      width={1280}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      alt={`The first screen of the ${name} concept site`}
      className="block h-auto w-full"
    />
  );
}

/** The label every concept site carries wherever it appears. */
export function ConceptBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-mist px-2.5 py-1 text-[0.8rem] font-semibold text-teal">
      Concept site
    </span>
  );
}

/** compact: three cards for the homepage. Otherwise: the full write-up for /work. */
export function ConceptSites({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="mt-10 grid list-none gap-8 p-0 md:grid-cols-3">
        {CONCEPT_SITES.map((d) => (
          <li key={d.slug}>
            <a href={`/demos/${d.slug}/`} className="group block no-underline">
              <div className="overflow-hidden rounded-xl bg-white shadow-[0_16px_36px_-26px_rgba(30,42,42,0.55)] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <div className="aspect-[16/10] overflow-hidden">
                  <Shot slug={d.slug} name={d.name} height={d.height} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <ConceptBadge />
                <span className="text-sm text-mid">{d.kind}</span>
              </div>
              <h3 className="mt-2 text-xl text-dark group-hover:text-teal">{d.name}</h3>
              <p className="mt-1 text-mid">{d.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-14 space-y-20 md:space-y-28">
      {CONCEPT_SITES.map((d, i) => (
        <article key={d.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <a
            href={`/demos/${d.slug}/`}
            className={`block overflow-hidden rounded-xl bg-white shadow-[0_22px_50px_-30px_rgba(30,42,42,0.55)] ${i % 2 ? 'md:order-2' : ''}`}
            aria-label={`Open the ${d.name} concept site`}
          >
            <Shot slug={d.slug} name={d.name} height={d.height} eager={i === 0} />
          </a>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <ConceptBadge />
              <span className="text-sm text-mid">{d.where}</span>
            </div>
            <h2 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] text-dark">{d.name}</h2>
            <p className="measure mt-3 text-lg leading-relaxed text-dark/85">{d.blurb}</p>
            <p className="measure mt-5 text-lg leading-relaxed text-mid">{d.note}</p>
            <p className="mt-5 text-mid">
              <span className="font-semibold text-dark">Try asking:</span> “{d.tryAsk}”
            </p>
            <dl className="nums mt-6 flex gap-10">
              <div>
                <dt className="text-sm text-mid">Speed on a phone</dt>
                <dd className="m-0 font-heading text-3xl text-teal">{d.perf}</dd>
              </div>
              <div>
                <dt className="text-sm text-mid">Accessibility</dt>
                <dd className="m-0 font-heading text-3xl text-teal">{d.a11y}</dd>
              </div>
            </dl>
            <p className="-mt-1 text-sm text-mid">Lighthouse scores out of 100, measured on a phone.</p>
            <a href={`/demos/${d.slug}/`} className="btn btn-primary mt-6">Open the concept site</a>
          </div>
        </article>
      ))}
    </div>
  );
}
