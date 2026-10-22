export const SITE_CONFIG = {
  formEndpoint: 'https://formspree.io/f/mlgyjqgv',
  tvmagicAppUrl: 'https://tv-magic-companion.vercel.app',
  contactEmail: 'admin@fieldbournedigital.com.au',
  phoneDisplay: '0451 177 893',
  phoneHref: 'tel:+61451177893',
  siteUrl: 'https://fieldbournedigital.com.au',
  clientVideoYoutubeId: 'NpEaa2P7qZI',
  clientVideoFirstName: 'Nick',
  abn: '22 324 219 568',
  replyDays: 2,
  /** Bump when the consent wording on the review form changes, so each submission records what was agreed to. */
  consentVersion: 'consent-v1-2026-10',
  /** Same idea for the admin check form. The "admin-check" prefix also keeps these out of the review queue. */
  adminCheckConsentVersion: 'admin-check-consent-v1-2026-10',
  adminCheckMinutes: 20,
} as const;

/** "What kind of business?" options on the free review form. */
export const BUSINESS_TYPES = [
  'Trade or service',
  'Accommodation or tourism',
  'Food or drink',
  'Shop or maker',
  'Health or wellness',
  'Something else',
] as const;

/** Towns served, nearest first. Used on the homepage, the Scenic Rim page and in the page's business details. */
export const SCENIC_RIM_TOWNS = [
  'Beaudesert',
  'Canungra',
  'Tamborine Mountain',
  'Boonah',
  'Kalbar',
  'Rathdowney',
  'Aratula',
  'Harrisville',
] as const;

export const FURTHER_AREAS = ['Lockyer Valley', 'Ipswich', 'Logan', 'Greater Brisbane'] as const;
