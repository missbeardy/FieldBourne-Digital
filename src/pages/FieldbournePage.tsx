import { FadeIn, Stagger, StaggerItem } from '../components/motion';
import { Showcase } from '../components/Showcase';
import { usePageMeta } from '../hooks/usePageMeta';

const beforeProblems = [
  [
    'Website enquiries',
    'Customer contact form became an email, then an SMS to Nick. He had to read it and manually forward it to the right technician.',
  ],
  [
    'Missed calls on 3CX',
    'If the first person missed the call, voicemail lived on desktop only. Someone had to listen, write it up, and send it on by hand.',
  ],
  [
    'Fifteen leads a day',
    'Volume was high enough that manual allocation and callbacks became a daily grind, not a side task.',
  ],
];

const nowFlow = [
  [
    'SMS',
    'Messages hit a Twilio number via automation, land as a lead in the app, and auto-assign to the best-suited technician based on franchise rules like job capability and location.',
  ],
  [
    'Voicemail',
    'Voicemail is auto-forwarded by email to an API that extracts it, adds a summary and transcription in the app, then runs automated assignment.',
  ],
  [
    'Email',
    'Forwarded inbox mail is extracted and pushed into the app as an organised lead, ready for follow-up.',
  ],
];

const outcomes = [
  ['Zero manual allocation', 'Within 90 days, Nick no longer allocates and assigns leads by hand. That work is automated.'],
  ['~12 hours / week', 'Placeholder outcome: roughly 12 hours a week back from admin grind. To be confirmed on recording.'],
  ['Ack on arrival', 'Placeholder outcome: customer is acknowledged as soon as the lead comes in.'],
  ['~45 minutes', 'Placeholder outcome: assignments and callbacks move within about 45 minutes. To be confirmed on recording.'],
];

export function FieldbournePage() {
  usePageMeta(
    'TVMagic Case Study | FieldBourne Companion',
    'How Nick at TVMagic stopped manually forwarding leads. Missed calls, SMS and email now land in FieldBourne Companion and auto-assign to the right tech.',
  );

  return (
    <>
      <section className="border-b border-grey/50 px-[5vw] py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <div className="mb-4 inline-block rounded bg-amber-lt px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-amber">
              Case study · TVMagic
            </div>
            <h1 className="mb-4 font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-dark">
              From manual SMS forwards to auto-assigned leads
            </h1>
            <p className="mb-3 max-w-xl text-lg leading-relaxed text-mid">
              Nick, TVMagic Franchisee, was the bottleneck between every enquiry and every technician. FieldBourne Companion became the front door.
            </p>
            <p className="mb-6 text-sm text-mid">FieldBourne Digital's first live deployment.</p>
            <a href="/#contact" className="inline-block rounded-lg bg-teal px-5 py-3 font-heading text-sm font-bold text-white no-underline hover:bg-teal-hover">
              Book a free chat →
            </a>
          </FadeIn>
          <FadeIn delay={0.12}>
            <Showcase />
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Before</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Every lead ran through Nick by hand
            </h2>
            <p className="mb-10 max-w-3xl text-mid">
              Around 15 leads a day. Multiple channels. No single place that turned an enquiry into an assigned job without Nick in the middle.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {beforeProblems.map(([title, body]) => (
              <StaggerItem key={title} className="rounded-xl border border-grey bg-white p-6">
                <h3 className="mb-2 font-heading text-lg font-bold text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Now</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Enquiries land in the app and assign themselves
            </h2>
            <p className="mb-10 max-w-3xl text-mid">
              FieldBourne Companion captures the channel, organises the lead, and routes it using TVMagic franchise rules.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {nowFlow.map(([title, body]) => (
              <StaggerItem key={title} className="rounded-xl border border-grey bg-cream p-6">
                <h3 className="mb-2 font-heading text-lg font-bold text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Outcomes</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Within 90 days, lead allocation stopped being Nick's job
            </h2>
            <p className="mb-10 max-w-3xl text-sm text-mid">
              Some figures below are early placeholders until Nick's recording and final numbers are locked in.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {outcomes.map(([title, body]) => (
              <StaggerItem key={title} className="rounded-xl border border-grey bg-white p-6">
                <h3 className="mb-2 font-heading text-lg font-bold text-teal">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="rounded-2xl border border-grey bg-cream p-8 md:p-10">
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Day in the life</div>
            <h2 className="mb-4 font-heading text-2xl font-extrabold text-dark md:text-3xl">On the tools, still on top of the funnel</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-dark">
              “As a technician on the tools, leads come in and I can track where they are in the funnel and book via the app. Notifications hit my phone by app notification and SMS. No need to find my laptop. I can update when I am out of range. My leads, calendar and bookings are all in one spot.”
            </p>
            <p className="mt-4 text-sm text-mid">How the team works day to day on FieldBourne Companion</p>
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Who uses it</div>
            <h2 className="mb-8 font-heading text-3xl font-extrabold text-dark">Franchisee overview. Technician daily driver.</h2>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-2">
            <StaggerItem className="rounded-xl border border-grey bg-white p-6">
              <h3 className="mb-2 font-heading text-lg font-bold text-dark">Nick, TVMagic Franchisee</h3>
              <p className="text-sm leading-relaxed text-mid">
                Sees everyone's workload and calendar. Stops being the manual switchboard for 15 leads a day.
              </p>
            </StaggerItem>
            <StaggerItem className="rounded-xl border border-grey bg-white p-6">
              <h3 className="mb-2 font-heading text-lg font-bold text-dark">Technicians, every day</h3>
              <p className="text-sm leading-relaxed text-mid">
                Phone, tablet and desktop when needed. Leads, bookings and updates without hunting for a laptop between jobs.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="bg-dark px-[5vw] py-16 text-center md:py-20">
        <FadeIn>
          <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Want to see it?</div>
          <h2 className="mx-auto mb-4 max-w-2xl font-heading text-3xl font-extrabold text-white">
            Book a free chat and walk through Companion live
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-grey">
            We will show you how TVMagic runs today, then map what the same front-door approach would look like for your trade. Nick's full recording will land here when it is ready.
          </p>
          <a href="/#contact" className="inline-block rounded-lg bg-teal px-6 py-3 font-heading font-bold text-white no-underline hover:bg-teal-hover">
            Book a free chat →
          </a>
          <p className="mt-4 text-sm text-grey">No credit card. We respond within one business day.</p>
        </FadeIn>
      </section>
    </>
  );
}
