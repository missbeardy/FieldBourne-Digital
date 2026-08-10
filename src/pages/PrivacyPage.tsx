import { Link } from 'react-router-dom';
import { FadeIn } from '../components/motion';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPage() {
  usePageMeta(
    'Privacy Policy | FieldBourne Digital',
    'How FieldBourne Digital collects, uses and stores personal information for the marketing website and related services.',
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
              Privacy Policy
            </h1>
            <p className="text-sm text-mid">Last updated: 11 August 2026</p>
            <p className="mt-6 text-mid">
              FieldBourne Digital (ABN {SITE_CONFIG.abn}) respects your privacy. This policy explains how we collect, use, store and disclose personal information when you visit our marketing website at {SITE_CONFIG.siteUrl.replace('https://', '')}, submit our contact form, or otherwise deal with us about our services.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-[5vw] py-12 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Separate notice for the product app</h2>
            <p className="text-sm leading-relaxed text-mid">
              This page covers the FieldBourne Digital marketing website and related sales enquiries. The FieldBourne Companion product app has its own privacy notice and terms. When you or your team use the app, that in-app privacy statement applies to product data and account activity.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Information we collect</h2>
            <p className="mb-3 text-sm leading-relaxed text-mid">
              When you submit our contact form, we collect your name, phone number, email address (if provided), trade or business type, and message.
            </p>
            <p className="text-sm leading-relaxed text-mid">
              Website analytics is on. Through PostHog we may collect pages visited, device and browser information, approximate location derived from IP, referral source, and usage events so we can understand how the site is used and improve it. Through Sentry we may receive technical error and performance data if something breaks in the browser.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">How we use it</h2>
            <p className="text-sm leading-relaxed text-mid">
              We use your information to respond to enquiries, arrange free chats, provide consultations and services, operate and improve the website, diagnose errors, and meet our legal and record-keeping obligations. We do not sell your personal information.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Service providers (processors)</h2>
            <p className="mb-3 text-sm leading-relaxed text-mid">
              We use trusted providers to run the website and related services. Depending on how you interact with us, personal information may be processed by:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-mid">
              <li>Formspree: contact form submissions</li>
              <li>Gmail (Google): email hosting and enquiry correspondence</li>
              <li>Resend: transactional or notification email where used</li>
              <li>Twilio: SMS and phone-related messaging where used</li>
              <li>Supabase: application and data infrastructure where used</li>
              <li>PostHog: product and website analytics</li>
              <li>Sentry: error monitoring and diagnostics</li>
              <li>OpenAI and Anthropic: AI tooling that may process text you send us when we use those tools to help draft replies, summarise, or support delivery of our services</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-mid">
              Some providers may store or process data outside Australia. Where that happens, we take reasonable steps appropriate to the service and the sensitivity of the information.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Cookies and similar technologies</h2>
            <p className="text-sm leading-relaxed text-mid">
              Our site may use cookies and similar technologies that are needed for hosting and security, and for analytics via PostHog. You can control cookies through your browser settings. Blocking analytics cookies may limit how useful our usage data is, but you can still use the site.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Storage, security and retention</h2>
            <p className="mb-3 text-sm leading-relaxed text-mid">
              Contact form submissions are processed via our form provider and email. We take reasonable steps to protect personal information against misuse, interference, loss, and unauthorised access. No method of transmission or storage over the internet is completely secure.
            </p>
            <p className="text-sm leading-relaxed text-mid">
              We keep enquiry and related business records for up to 5 years where needed for our business and legal record-keeping obligations under Australian law, then delete or de-identify them when no longer required, unless a longer period is needed for an ongoing matter.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-white p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Your rights</h2>
            <p className="text-sm leading-relaxed text-mid">
              You may request access to, correction of, or deletion of your personal information by emailing{' '}
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="font-semibold text-teal no-underline hover:text-teal-hover">
                {SITE_CONFIG.contactEmail}
              </a>
              . We will respond within a reasonable time. Some requests may be limited where we are required to keep records.
            </p>
          </FadeIn>

          <FadeIn className="rounded-xl border border-grey bg-cream p-6 md:p-7">
            <h2 className="mb-2 font-heading text-xl font-extrabold text-dark">Contact</h2>
            <p className="text-sm leading-relaxed text-mid">
              FieldBourne Digital
              <br />
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="font-semibold text-teal no-underline hover:text-teal-hover">
                {SITE_CONFIG.contactEmail}
              </a>
              <br />
              ABN {SITE_CONFIG.abn}
            </p>
            <p className="mt-3 text-sm text-mid">
              See also our{' '}
              <Link to="/terms" className="font-semibold text-teal no-underline hover:text-teal-hover">
                Terms of Service
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
