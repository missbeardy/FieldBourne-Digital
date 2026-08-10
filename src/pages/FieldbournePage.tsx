import { FadeIn } from '../components/motion';

export function FieldbournePage() {
  return (
    <div className="px-[5vw] py-16">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Case study</div>
          <h1 className="mb-4 font-heading text-4xl font-extrabold text-dark">FieldBourne Companion</h1>
          <p className="mb-10 text-lg text-mid">A national TV aerial and satellite franchise. FieldBourne Digital's first live deployment.</p>
        </FadeIn>

        <FadeIn className="space-y-4 text-mid">
          <h2 className="font-heading text-2xl font-extrabold text-dark">The problem</h2>
          <p>
            Leads came in via phone, SMS, email and web forms, often while technicians were on the tools. Jobs were tracked in spreadsheets. The franchise owner had no single view of what was open, assigned, or overdue across the team. Missed calls and slow follow-up meant jobs slipped away.
          </p>

          <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">What we built</h2>
          <p>
            FieldBourne Companion runs on the FieldBourne Digital platform, configured for aerial and satellite work. The front door catches enquiries; the board keeps follow-up and jobs moving.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Lead board with status tracking</li>
            <li>Inbound SMS, email and missed-call capture as leads</li>
            <li>Calendar booking that creates and assigns jobs</li>
            <li>Team view: manager sees every tech's pipeline</li>
            <li>Automated SMS follow-ups and Google review requests</li>
            <li>Quote composer and job completion workflows</li>
          </ul>

          <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Connected tools</h2>
          <p>
            SMS and phone via Twilio, inbound email parsing, built-in calendar, Stripe billing for franchise tiers, and Google review link integration. The point is not a forced migration. It is catching the enquiry before it disappears.
          </p>

          <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">The result</h2>
          <p>
            Missed calls are captured as leads automatically. Jobs are assigned with one click. The owner checks live job status from any device, with no more chasing technicians for updates.
          </p>

          <div className="mt-8 rounded-2xl border border-grey bg-teal-lt p-6">
            <p className="font-medium text-dark">
              <strong>Want to see it?</strong> Book a free chat and we'll walk you through FieldBourne Companion live, then map out what the same front-door approach would look like for your trade.
            </p>
            <a href="/#contact" className="mt-4 inline-block rounded-lg bg-teal px-5 py-3 font-heading font-bold text-white no-underline hover:bg-teal-hover">
              Book a free chat →
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
