import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { RidgeEdge } from '../components/Ridgelines';
import { usePageMeta } from '../hooks/usePageMeta';

const before = [
  ['Website enquiries', 'The contact form became an email, then a text to Nick. He read each one and forwarded it to the right technician by hand.'],
  ['Missed calls', 'Voicemail lived on a desktop phone system. Someone had to listen, write it up and send it on.'],
  ['Every day', 'Sorting and handing out leads became a daily job of its own, on top of running the business.'],
] as const;

const built = [
  ['Texts', 'Messages to the business number arrive in the app as a lead and go to the best-suited technician, using the franchise rules for job type and area.'],
  ['Voicemail', 'Voicemails are forwarded automatically, transcribed and summarised in the app, then assigned the same way.'],
  ['Email', 'Enquiries by email are pulled into the app as tidy leads, ready to follow up.'],
] as const;

/*
  Figures from Darren, October 2026. Nick's written OK is needed before this goes to main.
  The same figures appear on the services and business systems pages. A quote from Nick can
  go under these once he gives one.
*/
const changed = [
  ['About 14 hours a week back', 'Nick used to spend around 14 hours a week sorting leads and booking them in. The system does that now.'],
  ['No more ringing round', 'Nick used to call each technician to find out when they were free. Now the app sees everyone\'s calendar and books the job into a free slot.'],
  ['Missed calls get answered', 'The business was missing up to 15 calls a week. Now every missed call gets a text straight away, then a call back.'],
] as const;

export function CaseStudyPage() {
  usePageMeta(
    'TV Magic South Brisbane case study | FieldBourne Digital',
    'How TV Magic South Brisbane stopped forwarding every lead by hand, with a custom system built by FieldBourne Digital that sorts calls, texts and email.',
  );

  return (
    <>
      <PageIntro
        title="How TV Magic South Brisbane stopped forwarding every lead by hand"
        lead={
          <p className="m-0">
            This one isn't a website. It's a custom system I built for a real business, TV Magic South Brisbane, that catches every enquiry and sends it to the right technician.
          </p>
        }
      />

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-dark">Before: every lead went through Nick</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {before.map(([t, b]) => (
            <div key={t}>
              <h3 className="text-xl text-dark">{t}</h3>
              <p className="mt-2 leading-relaxed text-mid">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sky">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-dark">What I built: enquiries that sort themselves</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {built.map(([t, b]) => (
              <div key={t}>
                <h3 className="text-xl text-dark">{t}</h3>
                <p className="mt-2 leading-relaxed text-mid">{b}</p>
              </div>
            ))}
          </div>
          <p className="measure mt-10 text-lg leading-relaxed text-dark/85">
            Nick sees everyone's workload in one place. The technicians get their leads and bookings on their phones, between jobs, without hunting for a laptop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-dark">What changed</h2>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {changed.map(([t, b]) => (
            <div key={t}>
              <h3 className="text-xl text-dark">{t}</h3>
              <p className="mt-2 leading-relaxed text-mid">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ridge-near">
        <RidgeEdge />
        <div className="on-deep mx-auto grid max-w-6xl gap-8 px-5 pt-8 pb-20 md:grid-cols-[1.3fr_1fr] md:px-8">
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-cream">Want to know what your business could hand off?</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-on-deep">
              Most businesses don't need a system like this. Many need one or two jobs to run on their own. Start with a free admin check: 20 minutes on the phone about how your week runs.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <Link to="/business-systems#admin-check" className="btn btn-sun">Book my free admin check</Link>
            <Link to="/business-systems" className="link-quiet">About business systems</Link>
          </div>
        </div>
      </section>
    </>
  );
}
