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
  Results and a quote from Nick go here once he has confirmed the figures and given his
  written OK (a "What changed" section between "What I built" and the closing band).
  Don't publish numbers he hasn't confirmed.
*/

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

      <section className="bg-ridge-near">
        <RidgeEdge />
        <div className="on-deep mx-auto grid max-w-6xl gap-8 px-5 pt-8 pb-20 md:grid-cols-[1.3fr_1fr] md:px-8">
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-cream">Got admin that eats your evenings?</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-on-deep">
              Most businesses don't need a system like this. Many need one or two jobs to look after themselves. A process audit finds which.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <Link to="/website-review" className="btn btn-sun">Get a free review</Link>
            <Link to="/services" className="link-quiet">About automation and process audits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
