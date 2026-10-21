import { LegalPage } from '../components/LegalPage';
import { SITE_CONFIG } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPage() {
  usePageMeta(
    'Privacy policy | FieldBourne Digital',
    'How FieldBourne Digital collects, uses and stores personal information through this website, the free website review form, and its services.',
  );

  return (
    <LegalPage
      title="Privacy policy"
      updated="21 October 2026"
      other={{ to: '/terms', label: 'terms of service' }}
      intro={
        <p className="m-0">
          FieldBourne Digital (ABN {SITE_CONFIG.abn}) is a small web studio run by Darren in Beaudesert, Queensland. This policy explains how I collect, use, store and share personal information when you visit {SITE_CONFIG.siteUrl.replace('https://', '')}, ask for a free website review, or deal with me about my services. I follow the Australian Privacy Principles.
        </p>
      }
      sections={[
        {
          title: 'What I collect',
          body: (
            <>
              <p>When you ask for a free website review, I collect your name, business name, website address, town, type of business, email address, and, if you give them, your phone number and any notes.</p>
              <p>I also record which consent boxes you ticked, the version of the consent wording, the page you sent it from, and the time, so there is a record of what you agreed to.</p>
              <p>If you contact me by phone or email, I keep what you send.</p>
              <p>This website does not use analytics, advertising or tracking cookies.</p>
            </>
          ),
        },
        {
          title: 'Business contact details from public sources',
          body: (
            <p>To offer free reviews to local businesses, I sometimes note a business's contact details where the business has published them itself, such as on its own website. I record where and when I found them, only contact the business about something relevant to it, and stop straight away if asked.</p>
          ),
        },
        {
          title: 'How I use it',
          body: (
            <>
              <p>To prepare your website review, send it to you, and follow up about it. To answer enquiries, quote, provide my services, and keep the business and tax records the law requires.</p>
              <p>I only send you marketing email, such as occasional tips, if you ticked the box to get them. I never sell your personal information.</p>
            </>
          ),
        },
        {
          title: 'Email and unsubscribing',
          body: (
            <p>Every email I send includes my name, ABN and a way to unsubscribe. Reply "no thanks", or email or call me, and I'll stop. I action unsubscribe requests within 5 business days.</p>
          ),
        },
        {
          title: 'Services I use',
          body: (
            <>
              <p>Depending on how you deal with me, your information may be handled by:</p>
              <ul>
                <li>Formspree, which receives the website review form</li>
                <li>Make, which copies review requests into a private Google Sheet so I can keep track of them</li>
                <li>Google (Gmail and Google Sheets), for email and for keeping track of review requests</li>
                <li>Twilio, for text messages and calls, where used</li>
                <li>Supabase and Resend, for systems I build and run for clients, where used</li>
                <li>OpenAI and Anthropic, AI tools I may use to help prepare reviews, summarise, or draft replies</li>
              </ul>
              <p>Some of these store or process information outside Australia. I take reasonable steps to choose providers that protect it.</p>
            </>
          ),
        },
        {
          title: 'Storage, security and how long I keep it',
          body: (
            <p>I take reasonable steps to protect personal information from misuse, loss and unauthorised access, though nothing sent over the internet is completely secure. I keep enquiry and business records for up to 5 years where I need them for business or legal reasons, then delete or de-identify them.</p>
          ),
        },
        {
          title: 'Systems I build for clients',
          body: (
            <p>Systems I build and run for clients, such as the FieldBourne Companion app, have their own privacy notices for the information inside them.</p>
          ),
        },
        {
          title: 'Your rights',
          body: (
            <p>You can ask to see, correct or delete the personal information I hold about you by emailing <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal">{SITE_CONFIG.contactEmail}</a>. If you're not happy with how I've handled your information, tell me first. You can also contact the Office of the Australian Information Commissioner (oaic.gov.au).</p>
          ),
        },
      ]}
    />
  );
}
