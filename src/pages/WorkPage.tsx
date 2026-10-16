import { Link } from 'react-router-dom';
import { FadeIn } from '../components/motion';
import { usePageMeta } from '../hooks/usePageMeta';

const demos = [
  {
    slug: 'wirebird',
    name: 'Wirebird Electrical',
    trade: 'Electrician, Beaudesert',
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
    trade: 'Cafe and function room, Boonah',
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
    trade: 'Off-grid cabins, under Mount Barney',
    height: 830,
    blurb: 'Three cabins and one question guests always ask: is the weekend free?',
    note: 'The page shifts from dawn to night, because that is what the gully does.',
    tryAsk: 'Is the weekend of the 14th free?',
    perf: 99,
    a11y: 100,
  },
] as const;

export function WorkPage() {
  usePageMeta(
    'Work | FieldBourne Digital',
    'Three fictional local business demos plus the TVMagic case study. See how FieldBourne sites handle enquiries on the phone.',
  );

  return (
    <>
      <section className="border-b border-grey/50 px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="mb-4 inline-block rounded bg-teal-lt px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-teal">
              Work
            </div>
            <h1 className="mb-5 max-w-3xl font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-dark">
              Sites we&apos;ve built
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-dark">
              These three are made-up local businesses, built to show what a site from me looks like. Open one, ask its assistant a question, and see where the enquiry goes.
            </p>
            <p className="mt-4 max-w-2xl text-sm text-dark">
              These businesses are fictional. The sites are real.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          {demos.map((demo, i) => {
            const card = (
              <article className="overflow-hidden rounded-2xl border border-grey bg-white">
                <div
                  className={`grid gap-0 md:items-stretch ${
                    i % 2 === 0
                      ? 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]'
                      : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]'
                  }`}
                >
                  <div className={`bg-cream p-3 md:p-4 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <img
                      src={`/work/${demo.slug}.jpg`}
                      srcSet={`/work/${demo.slug}-640.webp 640w, /work/${demo.slug}-1280.webp 1280w`}
                      sizes="(min-width: 1152px) 616px, (min-width: 768px) 53vw, calc(90vw - 24px)"
                      width={1440}
                      height={demo.height}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : 'auto'}
                      decoding={i === 0 ? 'sync' : 'async'}
                      alt={`Screenshot of the ${demo.name} demo site`}
                      className="h-auto w-full rounded-lg border border-grey shadow-[0_1px_2px_rgba(30,42,42,0.08)]"
                    />
                  </div>
                  <div className={`flex flex-col justify-center gap-4 p-6 md:p-10 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <p className="flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-dark">
                      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-amber" />
                      {demo.trade}
                    </p>
                    <h2 className="font-heading text-2xl font-extrabold text-dark md:text-3xl">{demo.name}</h2>
                    <p className="text-base leading-relaxed text-dark">{demo.blurb}</p>
                    <p className="border-l-4 border-amber pl-4 text-base leading-relaxed text-dark">{demo.note}</p>
                    <p className="text-base text-dark">
                      <span className="font-semibold">Try asking:</span> &ldquo;{demo.tryAsk}&rdquo;
                    </p>
                    <dl className="flex gap-3">
                      <div className="rounded-lg bg-teal-lt px-4 py-2">
                        <dt className="text-sm text-dark">Performance</dt>
                        <dd className="font-heading text-3xl font-extrabold leading-none text-teal">{demo.perf}</dd>
                      </div>
                      <div className="rounded-lg bg-teal-lt px-4 py-2">
                        <dt className="text-sm text-dark">Accessibility</dt>
                        <dd className="font-heading text-3xl font-extrabold leading-none text-teal">{demo.a11y}</dd>
                      </div>
                    </dl>
                    <p className="-mt-2 text-sm text-dark">Mobile Lighthouse scores for the demo.</p>
                    <a
                      href={`/demos/${demo.slug}/`}
                      className="mt-2 inline-flex min-h-11 w-fit items-center rounded-lg bg-teal px-5 py-2.5 font-heading text-sm font-bold text-white no-underline transition hover:bg-teal-hover"
                    >
                      Open the demo
                    </a>
                  </div>
                </div>
              </article>
            );
            if (i === 0) return <div key={demo.slug}>{card}</div>;
            return (
              <FadeIn key={demo.slug} delay={i * 0.06}>
                {card}
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="border-t border-grey/50 bg-white px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-teal">Real client</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">TVMagic South Brisbane</h2>
            <p className="mb-4 max-w-3xl text-lg leading-relaxed text-dark">
              Nick, TVMagic Franchisee, was the bottleneck between every enquiry and every technician. FieldBourne Companion became the front door: SMS, voicemail and email now land as leads and auto-assign to the right tech.
            </p>
            <p className="mb-6 text-sm text-dark">FieldBourne Digital&apos;s first live deployment.</p>
            <Link
              to="/case-study/tvmagic"
              className="font-heading text-sm font-semibold text-teal no-underline hover:text-teal-hover"
            >
              Read the case study →
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <h2 className="mb-4 font-heading text-2xl font-extrabold text-dark md:text-3xl">Want something like this for your trade?</h2>
            <p className="mb-8 text-dark">No credit card. I respond within one business day.</p>
            <a
              href="/#contact"
              className="inline-block rounded-lg bg-teal px-6 py-3 font-heading font-bold text-white no-underline transition hover:bg-teal-hover"
            >
              Book a free chat
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
