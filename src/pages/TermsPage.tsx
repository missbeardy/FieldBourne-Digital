import { Link } from 'react-router-dom';
import { FadeIn } from '../components/motion';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const sections = [
  {
    title: 'Services',
    body: 'FieldBourne Digital provides lead-capture and follow-up software and related configuration, integration, and support services for trade businesses. Specific scope, pricing, and deliverables are agreed in writing before work begins.',
  },
  {
    title: 'Pricing and payment',
    body: 'Setup fees and monthly subscription rates are quoted during your consultation. Invoices are payable as agreed in your service agreement. We do not lock you into long-term contracts unless explicitly stated.',
  },
  {
    title: 'Your data',
    body: 'You retain ownership of your business data. We provide export capabilities and do not hold your data hostage. You are responsible for the accuracy of data you provide and for complying with applicable privacy laws regarding your customers.',
  },
  {
    title: 'Availability',
    body: 'We aim for high availability but do not guarantee uninterrupted service. Planned maintenance will be communicated where possible.',
  },
  {
    title: 'Limitation of liability',
    body: "To the extent permitted by Australian law, FieldBourne Digital's liability is limited to the fees paid for the relevant service period. We are not liable for indirect or consequential losses.",
  },
];

export function TermsPage() {
  usePageMeta(
    'Terms of Service | FieldBourne Digital',
    'Terms of service for FieldBourne Digital software and related services for Australian trade businesses.',
  );

  return (
    <>
      <section className="border-b border-grey/50 px-[5vw] py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="mb-4 inline-block rounded bg-amber-lt px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-amber">
              Legal
            </div>
            <h1 className="mb-3 font-heading text-[clamp(2.2rem,4vw,3rem)] font-extrabold tracking-tight text-dark">
              Terms of Service
            </h1>
            <p className="text-sm text-mid">Last updated: June 2025</p>
            <p className="mt-6 text-mid">
              These terms apply to services provided by FieldBourne Digital (ABN {SITE_CONFIG.abn}). By using our website or engaging our services, you agree to these terms.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-12 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {sections.map((section) => (
            <FadeIn key={section.title} className="rounded-xl border border-grey bg-white p-6 md:p-7">
              <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">{section.title}</h2>
              <p className="text-sm leading-relaxed text-mid">{section.body}</p>
            </FadeIn>
          ))}

          <FadeIn className="rounded-xl border border-grey bg-cream p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Contact</h2>
            <p className="text-sm leading-relaxed text-mid">
              Questions about these terms:{' '}
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="font-semibold text-teal no-underline hover:text-teal-hover">
                {SITE_CONFIG.contactEmail}
              </a>
            </p>
            <p className="mt-3 text-sm text-mid">
              See also our{' '}
              <Link to="/privacy" className="font-semibold text-teal no-underline hover:text-teal-hover">
                Privacy Policy
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
