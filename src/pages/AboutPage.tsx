import { Link } from 'react-router-dom';
import { FadeIn, Stagger, StaggerItem } from '../components/motion';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const trades = [
  'Antenna / AV',
  'Electrical',
  'Plumbing',
  'Locksmiths',
  'Garage doors',
  'Pest control',
  'Cleaners',
  'Lawn & garden',
  'HVAC',
  'Solar',
];

export function AboutPage() {
  usePageMeta(
    'About | FieldBourne Digital',
    'FieldBourne Digital builds front-door lead capture for Australian tradies. Founded by Darren in Beaudesert, QLD.',
  );

  return (
    <>
      <section className="border-b border-grey/50 px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-4 inline-block rounded bg-amber-lt px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-amber">
              About
            </div>
            <h1 className="mb-5 max-w-3xl font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-dark">
              Built for the job site.
              <br />
              <span className="text-teal">Not the office.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-mid">
              FieldBourne Digital helps Aussie tradies stop losing jobs to missed calls and slow follow-up. Practical software. Phone-first. Built in Beaudesert, QLD.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="rounded-2xl border border-grey bg-cream p-8 md:flex md:items-start md:gap-8 md:p-10">
            <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-2xl font-extrabold text-white md:mb-0">
              D
            </div>
            <div>
              <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">From the founder</div>
              <p className="text-lg leading-relaxed text-dark md:text-xl">
                “I started FieldBourne Digital because tradies deserve software that fits how they actually work, not the other way around. Catch the enquiry, keep follow-up moving, and work from the phone, without ripping out the tools you already use.”
              </p>
              <p className="mt-4 text-sm text-mid">Darren, Founder, FieldBourne Digital, Beaudesert, QLD</p>
              <p className="mt-2 text-sm text-mid">Darren personally responds. No call centre, no hand-off.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">The name</div>
            <h2 className="mb-8 max-w-2xl font-heading text-3xl font-extrabold text-dark">What FieldBourne means</h2>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-2">
            <StaggerItem className="rounded-xl border border-grey bg-white p-7">
              <div className="mb-2 font-heading text-sm font-extrabold text-teal">Field</div>
              <h3 className="mb-2 font-heading text-xl font-bold text-dark">Where the work happens</h3>
              <p className="text-sm leading-relaxed text-mid">
                On the road, on the tools, between jobs. Software has to work from a phone in a van, not only from a desk.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-xl border border-grey bg-white p-7">
              <div className="mb-2 font-heading text-sm font-extrabold text-amber">Bourne</div>
              <h3 className="mb-2 font-heading text-xl font-bold text-dark">Where the work flows to</h3>
              <p className="text-sm leading-relaxed text-mid">
                One place for missed calls, messages and enquiries to land, so follow-up does not live in your head.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">How we're different</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">Front door first. Not a forced migration.</h2>
            <p className="mb-10 max-w-3xl text-mid">
              We're not another all-in-one CRM pitch. FieldBourne catches new enquiries and helps chase them toward booked, paid work, beside the tools you already use.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {[
              ['Catch the leak', 'Missed calls, SMS, email, voicemail and Facebook become organised lead cards before the customer rings someone else.'],
              ['Keep your tools', 'No major rip-and-replace of ServiceM8, Tradify, calendars or accounting. Sit beside what already runs the job.'],
              ['One live proof', 'Nick at TVMagic runs FieldBourne Companion today. Specific, real, and working.'],
            ].map(([title, body]) => (
              <StaggerItem key={title} className="rounded-xl border border-grey bg-cream p-6">
                <h3 className="mb-2 font-heading text-lg font-bold text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-8">
            <Link to="/case-study/tvmagic" className="font-heading font-semibold text-teal no-underline hover:text-teal-hover">
              Read the FieldBourne Companion case study →
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Who we work with</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">Solo tradies and small service teams</h2>
            <p className="mb-8 max-w-3xl text-mid">
              Busy operators who live on their phone. They miss calls while working, and they do not want complicated software.
            </p>
          </FadeIn>
          <Stagger className="flex flex-wrap gap-2">
            {trades.map((trade) => (
              <StaggerItem
                key={trade}
                className="rounded-full border border-grey bg-white px-4 py-2 font-heading text-sm font-semibold text-dark"
              >
                {trade}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-dark px-[5vw] py-16 text-center md:py-20">
        <FadeIn>
          <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Ready to talk?</div>
          <h2 className="mx-auto mb-4 max-w-2xl font-heading text-3xl font-extrabold text-white">
            Book a free chat with Darren
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-grey">
            Bring a real week of missed calls and late follow-ups. We will look at where jobs disappear and whether FieldBourne fits.
          </p>
          <a href="/#contact" className="inline-block rounded-lg bg-teal px-6 py-3 font-heading font-bold text-white no-underline hover:bg-teal-hover">
            Book a free chat →
          </a>
          <p className="mt-4 text-sm text-grey">
            {SITE_CONFIG.contactEmail} · ABN {SITE_CONFIG.abn}
          </p>
        </FadeIn>
      </section>
    </>
  );
}
