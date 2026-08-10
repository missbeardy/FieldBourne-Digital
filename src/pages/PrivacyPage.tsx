import { SITE_CONFIG } from '../config/site';

export function PrivacyPage() {
  return (
    <div className="px-[5vw] py-16">
      <div className="mx-auto max-w-3xl space-y-4 text-mid">
        <h1 className="font-heading text-4xl font-extrabold text-dark">Privacy Policy</h1>
        <p className="text-sm">Last updated: June 2025</p>
        <p>
          FieldBourne Digital (ABN {SITE_CONFIG.abn}) respects your privacy. This policy explains how we collect and use personal information when you visit our website or contact us.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Information we collect</h2>
        <p>
          When you submit our contact form, we collect your name, email address, phone number, business type, and message. We may also collect standard website analytics (pages visited, browser type) if analytics are enabled.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">How we use it</h2>
        <p>
          We use your information to respond to enquiries, provide consultations, and deliver our services. We do not sell your personal information to third parties.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Storage and security</h2>
        <p>
          Contact form submissions are processed via our form provider and email. We take reasonable steps to protect your information. No method of transmission over the internet is completely secure.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Contact</h2>
        <p>
          Questions about privacy:{' '}
          <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal no-underline">
            {SITE_CONFIG.contactEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
