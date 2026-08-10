import { SITE_CONFIG } from '../config/site';

export function TermsPage() {
  return (
    <div className="px-[5vw] py-16">
      <div className="mx-auto max-w-3xl space-y-4 text-mid">
        <h1 className="font-heading text-4xl font-extrabold text-dark">Terms of Service</h1>
        <p className="text-sm">Last updated: June 2025</p>
        <p>
          These terms apply to services provided by FieldBourne Digital (ABN {SITE_CONFIG.abn}). By using our website or engaging our services, you agree to these terms.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Services</h2>
        <p>
          FieldBourne Digital provides lead-capture and follow-up software and related configuration, integration, and support services for trade businesses. Specific scope, pricing, and deliverables are agreed in writing before work begins.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Pricing and payment</h2>
        <p>
          Setup fees and monthly subscription rates are quoted during your consultation. Invoices are payable as agreed in your service agreement. We do not lock you into long-term contracts unless explicitly stated.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Your data</h2>
        <p>
          You retain ownership of your business data. We process it only to provide the agreed services. See our Privacy Policy for more detail.
        </p>
        <h2 className="pt-4 font-heading text-2xl font-extrabold text-dark">Contact</h2>
        <p>
          Questions about these terms:{' '}
          <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal no-underline">
            {SITE_CONFIG.contactEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
