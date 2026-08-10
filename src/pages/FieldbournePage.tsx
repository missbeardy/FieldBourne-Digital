import { FadeIn, Stagger, StaggerItem } from '../components/motion';
import { Showcase } from '../components/Showcase';
import { usePageMeta } from '../hooks/usePageMeta';

const problems = [
  ['Missed while on the tools', 'Phone, SMS, email and web forms landed while techs were working. Callbacks were late or forgotten.'],
  ['Jobs in spreadsheets', 'No single board for what was open, assigned or overdue across the team.'],
  ['Owner flying blind', 'Chasing technicians for updates instead of seeing live status from any device.'],
];

const built = [
  ['Lead board', 'Status tracking so new enquiries do not disappear into texts and voicemail.'],
  ['Missed-call capture', 'Inbound SMS, email and missed calls become organised leads automatically.'],
  ['Booking that assigns', 'Calendar booking creates and assigns jobs without retyping the same details.'],
  ['Team view', 'Manager sees every tech pipeline in one place, not five group chats.'],
  ['Follow-up and reviews', 'SMS follow-ups and Google review requests that do not rely on memory.'],
  ['Quote to complete', 'Quote composer and job completion workflows that keep the job moving.'],
];

const tools = [
  ['Twilio', 'SMS & phone'],
  ['Email', 'Inbound parsing'],
  ['Calendar', 'Bookings'],
  ['Stripe', 'Franchise billing'],
  ['Google', 'Review links'],
];

export function FieldbournePage() {
  usePageMeta(
    'FieldBourne Companion Case Study | FieldBourne Digital',
    'How a TV aerial franchise went from missed calls and spreadsheets to FieldBourne Companion: organised leads, follow-up and live job status.',
  );

  return (
    <>
      <section className="border-b border-grey/50 px-[5vw] py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <div className="mb-4 inline-block rounded bg-amber-lt px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-amber">
              Case study
            </div>
            <h1 className="mb-4 font-heading text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold tracking-tight text-dark">
              FieldBourne Companion
            </h1>
            <p className="mb-6 max-w-xl text-lg leading-relaxed text-mid">
              A national TV aerial and satellite franchise. FieldBourne Digital's first live deployment, and the proof that the front door works.
            </p>
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
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">The problem</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Enquiries came in. Follow-up did not keep up.
            </h2>
            <p className="mb-10 max-w-3xl text-mid">
              Leads arrived while technicians were on the tools. Jobs lived in spreadsheets. The owner had no clear view of what was open, assigned or overdue. Missed calls and slow follow-up meant jobs slipped away.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {problems.map(([title, body]) => (
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
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">What we built</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Front door for enquiries. Board for the work.
            </h2>
            <p className="mb-10 max-w-3xl text-mid">
              FieldBourne Companion is configured for aerial and satellite work. It catches new enquiries, keeps follow-up moving, and gives the owner a live view across the team.
            </p>
          </FadeIn>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {built.map(([title, body]) => (
              <StaggerItem key={title} className="rounded-xl border border-grey bg-cream p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-mid">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Connected tools</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Wired to how they already work
            </h2>
            <p className="mb-8 max-w-3xl text-mid">
              The point is not a forced migration. It is catching the enquiry before it disappears, then moving it through booking and follow-up.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {tools.map(([name, role]) => (
              <StaggerItem key={name} className="rounded-xl border border-grey bg-white px-4 py-5 text-center">
                <div className="font-heading text-sm font-extrabold text-dark">{name}</div>
                <div className="mt-1 text-xs text-mid">{role}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="rounded-2xl border border-grey bg-teal-lt p-8 md:p-10">
            <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">The result</div>
            <h2 className="mb-4 max-w-3xl font-heading text-3xl font-extrabold text-dark">
              Missed calls become leads. Jobs get assigned. The owner sees the board.
            </h2>
            <p className="max-w-3xl text-mid">
              Missed calls are captured as leads automatically. Jobs are assigned with one click. The owner checks live job status from any device, with no more chasing technicians for updates.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-dark px-[5vw] py-16 text-center md:py-20">
        <FadeIn>
          <div className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-amber">Want to see it?</div>
          <h2 className="mx-auto mb-4 max-w-2xl font-heading text-3xl font-extrabold text-white">
            Book a free chat and walk through Companion live
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-grey">
            We will show you FieldBourne Companion, then map what the same front-door approach would look like for your trade.
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
