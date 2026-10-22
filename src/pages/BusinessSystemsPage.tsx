import { Link } from 'react-router-dom';
import { AdminCheckForm } from '../components/AdminCheckForm';
import { Faq } from '../components/Faq';
import { PageIntro } from '../components/PageIntro';
import { RidgeEdge } from '../components/Ridgelines';
import { SITE_CONFIG } from '../config/site';
import { ServiceLd } from '../components/JsonLd';
import { usePageMeta } from '../hooks/usePageMeta';

const values = [
  {
    title: 'A clear picture first',
    body: 'A 45-minute process audit and a short written plan: what is worth fixing, what isn\'t, and what it would cost. $149, taken off the job if you go ahead.',
  },
  {
    title: 'Small, tested steps',
    body: 'Each change starts as a two-week pilot in the apps you already use, usually $390 to $990. If it doesn\'t save you time, you\'ll know before you spend more.',
  },
  {
    title: "Someone local who's done it",
    body: 'I built the system TV Magic South Brisbane uses to sort and book every lead. You deal with me directly, and I\'m a phone call away when something changes.',
  },
] as const;

const jobs = [
  'Enquiries that get an answer out of hours',
  'Jobs booked into the right person\'s calendar',
  'A text back for every missed call',
  'Booking confirmations and reminders',
  'Following up quotes that went quiet',
  'Invoice reminders, so you are not chasing',
  'Asking happy customers for a Google review',
];

const steps = [
  ['Free admin check', `A ${SITE_CONFIG.adminCheckMinutes}-minute phone call about how your week runs and where the time goes.`, 'Free'],
  ['Process audit', '45 minutes going through how enquiries, quotes, bookings and invoices move, then a short written plan.', '$149, taken off the job'],
  ['Two-week pilot', 'The first fix, set up in your own accounts and tested on real work before you commit to more.', 'Usually $390 to $990'],
  ['Ongoing support', 'Monitoring, fixes when an app changes, and small tweaks as the business grows.', 'From $49 a month, optional'],
] as const;

const faqs = [
  {
    q: 'Do I need a new website for this?',
    a: 'No. Plenty of businesses have a website that is fine. This is about how the work moves once someone gets in touch.',
  },
  {
    q: 'Who owns the accounts?',
    a: 'You do. I set things up in accounts in your name, such as Make, your email and your booking app. If you ever move on, everything keeps running without me.',
  },
  {
    q: 'What apps does it work with?',
    a: 'Most of the common ones: Gmail and Outlook, Google Calendar, Xero, booking and job apps, and text messaging. I use Make by default, and only write custom code when a ready-made tool can\'t do the job.',
  },
  {
    q: 'What if it turns out not to be worth it?',
    a: "Then I'll say so. The admin check is free, and the written plan from the audit tells you what isn't worth automating as well as what is.",
  },
  {
    q: 'Do you give general business advice?',
    a: 'I stick to how the work runs: enquiries, quotes, bookings, follow-ups and the paperwork around them. For tax, legal or financial advice, talk to your accountant or solicitor.',
  },
] as const;

export function BusinessSystemsPage() {
  usePageMeta(
    'Business automation consultant for small businesses | FieldBourne Digital, Beaudesert',
    'Spend less of your week on admin. A free admin check, then a written plan and small tested automations for enquiries, quotes, bookings and invoices. From Darren in Beaudesert.',
  );

  return (
    <>
      <ServiceLd name="Business systems and automation for small businesses" type="Business process automation" path="/business-systems" description="A free admin check, then a written plan and small tested automations for enquiries, quotes, bookings and invoices." />
      <PageIntro
        title="Spend less of your week on admin."
        lead={
          <p className="m-0">
            I look at how enquiries, quotes, bookings and invoices move through your business, show you where time is being lost, and set up the tools to handle the repeat work. You get a written plan before anything is built, and every account stays in your name.
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#admin-check" className="btn btn-primary">Book my free admin check</a>
          <a href={SITE_CONFIG.phoneHref} className="link-quiet">Or call {SITE_CONFIG.phoneDisplay}</a>
        </div>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <ul className="grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
          {values.map((v) => (
            <li key={v.title}>
              <h2 className="text-[1.45rem] text-dark">{v.title}</h2>
              <p className="mt-3 leading-relaxed text-mid">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sky">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.15fr] md:px-8">
          <div>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] text-dark">What it can take off your hands</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              Plenty of small business admin is the same job, done by hand, over and over. A lot of it can run on its own.
            </p>
            <ul className="mt-5 list-none space-y-3 p-0">
              {jobs.map((x) => (
                <li key={x} className="grid grid-cols-[1.25rem_1fr] gap-3 leading-relaxed text-dark">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 text-teal" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] text-dark">How it works</h2>
            <ol className="mt-6 list-none space-y-6 p-0">
              {steps.map(([title, body, price], i) => (
                <li key={title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-heading text-2xl leading-none text-teal" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="text-lg text-dark">{title}</h3>
                    <p className="mt-1 leading-relaxed text-mid">{body}</p>
                    <p className="nums mt-1 font-semibold text-dark">{price}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Link to="/pricing" className="link-quiet">See all prices</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Real proof: the one client, with figures from Darren. Nick's written OK is needed before this goes to main. */}
      <section className="bg-ridge-near">
        <RidgeEdge />
        <div className="on-deep mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-20 md:grid-cols-[1.2fr_1fr] md:px-8">
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-cream">Real work: TV Magic South Brisbane</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-on-deep">
              Every call, text and email now comes into one app, goes to the right technician and is booked into a free slot in their calendar.
            </p>
            <Link to="/case-study/tvmagic" className="link-quiet mt-6 inline-block">Read the TV Magic story</Link>
          </div>
          <dl className="nums m-0 grid gap-6 self-center">
            <div>
              <dt className="font-heading text-3xl text-cream">About 14 hours a week</dt>
              <dd className="m-0 mt-1 text-on-deep-soft">no longer spent sorting and booking leads by hand</dd>
            </div>
            <div>
              <dt className="font-heading text-3xl text-cream">Up to 15 missed calls a week</dt>
              <dd className="m-0 mt-1 text-on-deep-soft">now each get a text straight away and a call back</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-dark">Questions people ask</h2>
        <Faq items={faqs} />
      </section>

      <section id="admin-check" className="bg-ridge-near">
        <RidgeEdge />
        <div className="on-deep mx-auto max-w-4xl px-5 pt-10 pb-24 md:px-8">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] text-cream">Book your free admin check</h2>
          <p className="measure mt-4 mb-9 text-lg leading-relaxed text-on-deep">
            {SITE_CONFIG.adminCheckMinutes} minutes on the phone about how your week runs. Free, and no obligation. I'll be in touch within {SITE_CONFIG.replyDays} business days to set a time.
          </p>
          <AdminCheckForm />
        </div>
      </section>
    </>
  );
}
