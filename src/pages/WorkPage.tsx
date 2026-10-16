import { Link } from 'react-router-dom';
import { FadeIn } from '../components/motion';
import { usePageMeta } from '../hooks/usePageMeta';

const demos = [
  {
    slug: 'wirebird',
    name: 'Wirebird Electrical',
    blurb: 'Electrician in Beaudesert. Quotes start in a chat and land on the owner\'s phone.',
    tryAsk: 'How much is a switchboard upgrade?',
    perf: 97,
    a11y: 100,
  },
  {
    slug: 'sorrel-slate',
    name: 'Sorrel & Slate',
    blurb: 'Cafe and function room in Boonah. The menu changes with the time of day.',
    tryAsk: '30 people, Saturday, 2pm?',
    perf: 99,
    a11y: 100,
  },
  {
    slug: 'lantern-gully',
    name: 'Lantern Gully Cabins',
    blurb: 'Three off-grid cabins under Mount Barney. Ask if a weekend is free.',
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
                <div className="grid gap-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                  <img
                    src={`/work/${demo.slug}.jpg`}
                    width={1440}
                    height={900}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    alt={`Screenshot of the ${demo.name} demo site`}
                    className="order-2 aspect-[8/5] h-auto w-full border-b border-grey object-cover object-top md:order-1 md:border-b-0 md:border-r"
                  />
                  <div className="order-1 flex flex-col justify-center gap-4 p-8 md:order-2 md:p-10">
                    <h2 className="font-heading text-2xl font-extrabold text-dark md:text-3xl">{demo.name}</h2>
                    <p className="leading-relaxed text-dark">{demo.blurb}</p>
                    <p className="text-sm text-dark">
                      <span className="font-semibold">Try asking:</span> &ldquo;{demo.tryAsk}&rdquo;
                    </p>
                    <p className="text-sm text-dark">
                      Mobile Lighthouse: performance {demo.perf}, accessibility {demo.a11y}
                    </p>
                    <a
                      href={`/demos/${demo.slug}/`}
                      className="mt-2 inline-flex w-fit rounded-lg bg-teal px-5 py-2.5 font-heading text-sm font-bold text-white no-underline transition hover:bg-teal-hover"
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
