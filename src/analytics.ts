import { SITE_CONFIG } from './config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** The prerender script drives a headless browser; nothing here should run or be saved into the HTML then. */
const prerendering = typeof navigator !== 'undefined' && navigator.webdriver;

function store(key: string, value?: string): string | null {
  try {
    if (value === undefined) return sessionStorage.getItem(key);
    sessionStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: the site works without it.
  }
  return null;
}

/** Loads Google Analytics once, only when a measurement ID is set in SITE_CONFIG. Page views are sent by trackPageView. */
export function initAnalytics() {
  if (!SITE_CONFIG.gaId || prerendering || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', SITE_CONFIG.gaId, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`;
  document.head.appendChild(s);

  // Every phone and email link counts, wherever it sits on the page.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
    const where = a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : 'page';
    track(a.getAttribute('href')!.startsWith('tel:') ? 'phone_click' : 'email_click', { location: where });
  });
}

/** One page view per route change (this is a single-page app, so the browser doesn't load new pages). */
export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
}

export function track(name: string, params: Record<string, string | number> = {}) {
  window.gtag?.('event', name, { ...params, page: window.location.pathname });
}

/**
 * How this visit found the site, worked out once per session from the tracking tags and the referring site.
 * It goes out with each form so the review queue shows what's bringing people in.
 */
export function visitSource(): string {
  const saved = store('src');
  if (saved || prerendering) return saved ?? '';
  const q = new URLSearchParams(window.location.search);
  let ref = '';
  try {
    ref = document.referrer ? new URL(document.referrer).hostname : '';
  } catch {
    ref = '';
  }
  if (ref === window.location.hostname) ref = '';
  const how =
    q.get('utm_campaign') === 'gbp' ? 'Google Business Profile'
    : q.get('gclid') ? 'Google ad'
    : q.get('utm_source') ? [q.get('utm_source'), q.get('utm_medium'), q.get('utm_campaign')].filter(Boolean).join(' / ')
    : /(^|\.)google\./.test(ref) ? 'Google search'
    : /(^|\.)bing\.com$/.test(ref) ? 'Bing search'
    : /chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google|copilot\.microsoft/.test(ref) ? `AI assistant (${ref})`
    : /facebook\.com|instagram\.com/.test(ref) ? 'Facebook or Instagram'
    : /linkedin\.com/.test(ref) ? 'LinkedIn'
    : ref || 'Direct (typed in, a bookmark or a shared link)';
  const value = `${how}, first page: ${window.location.pathname}`;
  store('src', value);
  return value;
}
