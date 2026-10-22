import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { RidgeEdge } from '../components/Ridgelines';
import { ServiceLd } from '../components/JsonLd';
import { usePageMeta } from '../hooks/usePageMeta';

const included = [
  'Works on a phone first, because that is where most people will see it',
  'One clear thing to do on every page: call, book or enquire',
  'Set up so Google knows your town and the area you cover',
  'A privacy policy for any form on the site',
  'Your domain in your name, and your words and photos stay yours',
];

const hosting = [
  {
    title: 'Keep your own builder',
    body: "On Squarespace, Wix or Shopify already? You keep the account and the subscription. I fix up what's there, or build a new site inside it.",
  },
  {
    title: 'A fast site I host',
    body: 'Quick to load, and little for you to look after. I make the small updates. Good for most small businesses.',
  },
  {
    title: 'WordPress on an Australian host',
    body: 'Managed WordPress on VentraIP, for people who want to edit a lot themselves or need a particular plugin.',
  },
];

const automations = [
  'Enquiries that get an answer out of hours',
  'Booking confirmations and reminders',
  'Following up quotes that went quiet',
  'Invoice reminders, so you are not chasing',
  'Asking happy customers for a Google review',
];

export function ServicesPage() {
  usePageMeta(
    'Web design, care plans and business automation | FieldBourne Digital',
    'Websites for small local businesses, monthly care plans, and business systems that take repeat admin off your plate. From Darren at FieldBourne Digital in Beaudesert.',
  );

  return (
    <>
      <ServiceLd name="Websites for small local businesses" type="Web design" path="/services" description="Websites built for small local businesses, phone first, with the domain in the business's own name." />
      <ServiceLd name="Website care plans" type="Website maintenance" path="/services" description="A monthly care plan with hosting, backups, a monthly check that forms and bookings still work, and small changes like new hours or a price update." />
      <PageIntro
        title="Websites, care plans and business systems"
        lead={
          <p className="m-0">
            There are two ways to start. If it's your website, start with a free website review. If it's the admin behind the business, start with a free admin check.
          </p>
        }
      />

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] text-dark">Websites</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              Built for how your customers actually find and contact you. Every site includes:
            </p>
            <ul className="mt-5 list-none space-y-3 p-0">
              {included.map((x) => (
                <li key={x} className="grid grid-cols-[1.25rem_1fr] gap-3 leading-relaxed text-dark">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 text-teal" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-dark">
              <span className="font-semibold">From $790</span> for a one-page site, <span className="font-semibold">$1,490</span> for a small business site.{' '}
              <Link to="/pricing" className="text-teal">All prices</Link>
            </p>
          </div>
          <div>
            <h3 className="text-xl text-dark">Three ways to host it</h3>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {hosting.map((h) => (
                <div key={h.title} className="py-5">
                  <h4 className="text-lg text-dark">{h.title}</h4>
                  <p className="mt-1.5 leading-relaxed text-mid">{h.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-mid">
              How it goes: free review, a written quote, the build, launch, then the care plan if you want it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sky">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.1fr] md:px-8">
          <div>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] text-dark">Care plans</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              A website is never quite finished. A care plan keeps it working while you get on with the business.
            </p>
            <p className="mt-6 text-dark"><span className="font-semibold">From $49 a month.</span> Month to month after the first three months.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg text-dark">Included</h3>
              <p className="mt-2 leading-relaxed text-mid">Hosting, backups, a monthly check that your forms and bookings still work, and small changes like new hours or a price update.</p>
            </div>
            <div>
              <h3 className="text-lg text-dark">Not included</h3>
              <p className="mt-2 leading-relaxed text-mid">New pages, big changes and paid apps. Those get a quick quote first.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)] text-dark">Automation</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-mid">
              Plenty of small business admin is the same job, done by hand, over and over. A lot of it can look after itself.
            </p>
            <ul className="mt-5 list-none space-y-3 p-0">
              {automations.map((x) => (
                <li key={x} className="grid grid-cols-[1.25rem_1fr] gap-3 leading-relaxed text-dark">
                  <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 text-teal" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-dark">How it starts</h3>
            <p className="mt-3 leading-relaxed text-mid">
              A free 20-minute admin check on the phone. If there's something worth fixing, a 45-minute process audit and a short written plan of what is worth automating and what isn't. Then I try it as a two-week pilot first.
            </p>
            <p className="mt-4 text-dark"><span className="font-semibold">Admin check free. Process audit $149</span>, taken off the job if you go ahead. Pilots usually $390 to $990.</p>
            <p className="mt-4 leading-relaxed text-mid">
              You own the accounts. I set the automations up in them, and I only write custom code when a ready-made tool can't do the job.
            </p>
            <Link to="/business-systems" className="link-quiet mt-5 inline-block">More about business systems</Link>
          </div>
        </div>
      </section>

      <section className="bg-ridge-near">
        <RidgeEdge />
        <div className="on-deep mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-20 md:grid-cols-[1.2fr_1fr] md:px-8">
          <div>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.4rem)] text-cream">When off-the-shelf tools don't fit</h2>
            <p className="measure mt-4 text-lg leading-relaxed text-on-deep">
              Sometimes a business needs its own system. TV Magic South Brisbane runs on a CRM I built that catches every enquiry, from calls, texts and email, and books it in with the right technician. It saves the owner about 14 hours a week.
            </p>
            <p className="measure mt-4 leading-relaxed text-on-deep-soft">
              For trade businesses that need a proper front door for leads and jobs, the same system is available as a tradie bundle. Quoted per business.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <Link to="/business-systems#admin-check" className="btn btn-sun">Book my free admin check</Link>
            <Link to="/case-study/tvmagic" className="link-quiet">Read the TV Magic story</Link>
          </div>
        </div>
      </section>
    </>
  );
}
