import { useId, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_TYPES, SITE_CONFIG } from '../config/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const field =
  'w-full rounded-[0.6rem] border border-line bg-white px-3.5 py-3 text-base text-dark outline-none transition-colors placeholder:text-mid focus:border-teal focus:ring-2 focus:ring-teal/20';
export const label = 'mb-1.5 block text-[0.95rem] font-semibold text-dark';

/**
 * The free website review request. Ticking the first box is express consent to email
 * (Spam Act 2003); the wording version, page and time go with every submission.
 */
export function ReviewForm({ id = 'review-form' }: { id?: string }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [noSite, setNoSite] = useState(false);
  const [sentTo, setSentTo] = useState<{ name: string; email: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    const payload = {
      _subject: `Free website review request: ${get('business')}`,
      name: get('name'),
      business: get('business'),
      website: noSite ? '(no website yet)' : get('website'),
      town: get('town'),
      businessType: get('businessType'),
      email: get('email'),
      phone: get('phone'),
      notes: get('notes'),
      consentReview: data.get('consentReview') ? 'yes' : 'no',
      consentTips: data.get('consentTips') ? 'yes' : 'no',
      consentVersion: SITE_CONFIG.consentVersion,
      page: window.location.href,
      submittedAt: new Date().toISOString(),
      _gotcha: get('_gotcha'),
    };

    setStatus('sending');
    try {
      const res = await fetch(SITE_CONFIG.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Form returned ${res.status}`);
      setSentTo({ name: payload.name.split(' ')[0], email: payload.email });
      setStatus('sent');
      form.reset();
      setNoSite(false);
    } catch {
      // Keep what they typed so nothing is lost; offer two other ways to reach Darren.
      setStatus('error');
    }
  }

  if (status === 'sent' && sentTo) {
    return (
      <div id={id} role="status" className="rounded-2xl bg-white p-7 shadow-[0_18px_40px_-28px_rgba(30,42,42,0.45)] md:p-9">
        <h3 className="mb-3 text-2xl text-dark">Thanks, {sentTo.name}. It's on my list.</h3>
        <p className="measure leading-relaxed text-mid">
          I'll go through your website and email the review and mockup to <strong className="text-dark">{sentTo.email}</strong> within {SITE_CONFIG.replyDays} business days. If anything's unclear I might give you a quick call first.
        </p>
        <p className="mt-4 text-mid">Darren</p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate={false}
      className="rounded-2xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(30,42,42,0.45)] md:p-9"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>Your name</label>
          <input id={`${uid}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-business`} className={label}>Business name</label>
          <input id={`${uid}-business`} name="business" required autoComplete="organization" className={field} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor={`${uid}-website`} className={label}>Website address</label>
          <input
            id={`${uid}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="e.g. yourbusiness.com.au"
            required={!noSite}
            disabled={noSite}
            className={`${field} disabled:bg-sky disabled:text-mid`}
          />
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[0.95rem] text-mid">
            <input type="checkbox" checked={noSite} onChange={(e) => setNoSite(e.target.checked)} className="h-5 w-5 shrink-0 accent-teal" />
            I don't have a website yet
          </label>
        </div>

        <div>
          <label htmlFor={`${uid}-town`} className={label}>Town</label>
          <input id={`${uid}-town`} name="town" required autoComplete="address-level2" placeholder="e.g. Beaudesert" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-type`} className={label}>What kind of business?</label>
          <select id={`${uid}-type`} name="businessType" required defaultValue="" className={`${field} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat`}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 8'%3E%3Cpath d='M1 1l6 6 6-6' fill='none' stroke='%2355625F' stroke-width='1.6'/%3E%3C/svg%3E\")" }}>
            <option value="" disabled>Choose one</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className={label}>Email</label>
          <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" className={field} />
          <p className="mt-1.5 text-sm text-mid">Your review comes by email.</p>
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>
            Phone <span className="font-normal text-mid">(optional)</span>
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor={`${uid}-notes`} className={label}>
            Anything you'd like me to look at? <span className="font-normal text-mid">(optional)</span>
          </label>
          <textarea id={`${uid}-notes`} name="notes" rows={3} className={field} />
        </div>

        {/* Spam trap: hidden from people, filled in by bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Leave this empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[0.98rem] leading-snug text-dark">
            <input type="checkbox" name="consentReview" required className="mt-0.5 h-5 w-5 shrink-0 accent-teal" />
            <span>Email me my free review, and follow up about it. I can unsubscribe any time.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 text-[0.98rem] leading-snug text-mid">
            <input type="checkbox" name="consentTips" className="mt-0.5 h-5 w-5 shrink-0 accent-teal" />
            <span>Also send me the occasional tip about websites and local marketing (a few times a year).</span>
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending your request…' : 'Get my free review'}
        </button>
        <p className="m-0 text-sm text-mid sm:max-w-[22rem] sm:text-right">
          I'll reply within {SITE_CONFIG.replyDays} business days. Your details are only used for your review. See the{' '}
          <Link to="/privacy" className="text-teal">privacy policy</Link>.
        </p>
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-5 rounded-xl bg-sky p-4 text-dark">
          <p className="m-0 font-semibold">That didn't send, sorry. Your details are still in the form.</p>
          <p className="mt-1 mb-0 text-mid">
            Try again in a minute, or email{' '}
            <a href={`mailto:${SITE_CONFIG.contactEmail}?subject=Free%20website%20review`} className="text-teal">{SITE_CONFIG.contactEmail}</a>{' '}
            or call <a href={SITE_CONFIG.phoneHref} className="text-teal">{SITE_CONFIG.phoneDisplay}</a>.
          </p>
        </div>
      )}
    </form>
  );
}
