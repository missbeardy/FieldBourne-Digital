import { Link } from 'react-router-dom';
import { FadeIn } from '../components/motion';
import { SITE_CONFIG } from '../config/site';

export function AboutPage() {
  return (
    <div className="px-[5vw] py-16">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">About</div>
          <h1 className="mb-4 font-heading text-4xl font-extrabold text-dark">Built for the job site, not the office.</h1>
          <p className="mb-10 text-lg text-mid">FieldBourne Digital: Australian software that catches missed enquiries and helps trade businesses chase them to booked work.</p>
        </FadeIn>

        <FadeIn className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal font-heading text-2xl font-extrabold text-white">D</div>
          <div>
            <p className="text-lg leading-relaxed text-mid">
              “I started FieldBourne Digital because tradies deserve software that fits how they actually work, not the other way around. Catch the enquiry, keep follow-up moving, and work from the phone, without ripping out the tools you already use.”
            </p>
            <p className="mt-3 text-sm text-mid">Darren, Founder, FieldBourne Digital, Beaudesert, QLD</p>
          </div>
        </FadeIn>

        <FadeIn className="prose-fb space-y-4 text-mid">
          <h2 className="font-heading text-2xl font-extrabold text-dark">What FieldBourne Digital means</h2>
          <p>
            <strong className="text-dark">Field</strong> is where your team works, on the road and on the job.
            <br />
            <strong className="text-dark">Bourne</strong> is where the work flows to: one place everything comes together.
          </p>

          <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">How we're different</h2>
          <p>
            We're not another all-in-one CRM pitch and we're not asking you to migrate everything overnight. FieldBourne is the front door: missed calls, messages and enquiries become organised leads with follow-up that does not rely on memory.
          </p>
          <p>
            Our first live client runs on{' '}
            <Link to="/fieldbourne" className="font-semibold text-teal no-underline hover:text-teal-hover">
              FieldBourne Companion
            </Link>
            , a TV aerial franchise. That's the proof.
          </p>

          <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Who we work with</h2>
          <p>Solo tradies and small teams in field service: antenna/AV, electrical, plumbing, locksmiths, garage doors, pest control, cleaners, lawn and garden, HVAC, and similar trades.</p>

          <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Contact</h2>
          <p>
            📧 <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal no-underline">{SITE_CONFIG.contactEmail}</a>
            <br />
            🇦🇺 Australian owned &amp; operated
            <br />
            ABN {SITE_CONFIG.abn}
          </p>

          <p className="pt-6">
            <a href="/#contact" className="inline-block rounded-lg bg-teal px-5 py-3 font-heading font-bold text-white no-underline hover:bg-teal-hover">
              Book a free chat →
            </a>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
