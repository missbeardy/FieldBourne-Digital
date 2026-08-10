import { useState, type FormEvent } from 'react';
import { BUSINESS_TYPES, SITE_CONFIG } from '../config/site';

export function ContactForm() {
  const [businessType, setBusinessType] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !phone) return;

    const payload = {
      name,
      phone,
      email,
      businessType,
      message,
      intent: 'consult',
    };

    setStatus('sending');

    if (SITE_CONFIG.formEndpoint) {
      try {
        const res = await fetch(SITE_CONFIG.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Form failed');
        setStatus('sent');
        form.reset();
        setBusinessType('');
        return;
      } catch {
        setStatus('error');
        return;
      }
    }

    const subject = encodeURIComponent(`FieldBourne Free chat request from ${name}`);
    const body = encodeURIComponent(
      `Intent: Free chat request\nName: ${name}\nPhone: ${phone}\nEmail: ${email || '(not provided)'}\nBusiness type: ${businessType || '(not selected)'}\n\nMessage:\n${message || '(none)'}`,
    );
    window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-grey bg-white p-6 shadow-sm">
      <p className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-amber">Book a free chat</p>
      <div className="flex flex-col gap-3">
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          className="rounded-lg border border-grey bg-cream px-3 py-2.5 text-sm outline-none focus:border-teal"
        />
        <input
          name="phone"
          required
          autoComplete="tel"
          placeholder="Phone number"
          className="rounded-lg border border-grey bg-cream px-3 py-2.5 text-sm outline-none focus:border-teal"
        />
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email (optional)"
          className="rounded-lg border border-grey bg-cream px-3 py-2.5 text-sm outline-none focus:border-teal"
        />

        <div>
          <span className="mb-2 block text-xs font-medium text-mid">Trade type (optional)</span>
          <div className="flex flex-wrap gap-2">
            {BUSINESS_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setBusinessType(type)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  businessType === type
                    ? 'border-teal bg-teal-lt text-teal'
                    : 'border-grey bg-cream text-mid hover:border-teal'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="message"
          rows={3}
          placeholder="Where do missed calls or enquiries fall through right now?"
          className="rounded-lg border border-grey bg-cream px-3 py-2.5 text-sm outline-none focus:border-teal"
        />

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="rounded-lg bg-teal px-4 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-teal-hover disabled:opacity-80"
        >
          {status === 'sent'
            ? 'Sent. Darren will be in touch within one business day'
            : status === 'sending'
              ? 'Sending…'
              : status === 'error'
                ? 'Something went wrong. Please email us directly'
                : 'Send message →'}
        </button>
        <p className="text-xs text-mid">Name and phone required. Darren will email you within one business day to arrange a chat.</p>
      </div>
    </form>
  );
}
