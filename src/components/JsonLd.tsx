import { SITE_CONFIG } from '../config/site';

/** Structured data for search engines and AI answer tools. Rendered into the page, so the prerendered HTML carries it. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here apart from a closing script tag, which is escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c') }}
    />
  );
}

/** A service FieldBourne Digital offers, linked to the business details in index.html. */
export function ServiceLd({ name, type, description, path }: { name: string; type: string; description: string; path: string }) {
  return (
    <JsonLd
      data={{
        '@type': 'Service',
        name,
        serviceType: type,
        description,
        url: `${SITE_CONFIG.siteUrl}${path}`,
        provider: { '@id': `${SITE_CONFIG.siteUrl}/#business` },
        areaServed: ['Scenic Rim Region', 'Lockyer Valley', 'Ipswich', 'Logan', 'Brisbane'].map((name) => ({ '@type': 'Place', name })),
      }}
    />
  );
}
