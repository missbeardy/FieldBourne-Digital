# SEO, GEO and reporting

What the site does for search, AI answer tools and measurement, and what still needs an account.

## In the site

- **Sitemap.** Built by `scripts/prerender.mjs` from `ROUTES` in `src/App.tsx`, with the build date as `lastmod`. Don't edit a sitemap by hand.
- **robots.txt** (`public/robots.txt`) lets every search engine and AI crawler in.
- **Titles, descriptions and canonical addresses** per page, from `usePageMeta`.
- **Share image** (`public/images/share-card.png`, 1200x630) on every page, for link previews in texts, Facebook and LinkedIn.
- **Structured data:**
  - ProfessionalService (business details) in `index.html`, on every page.
  - Service on `/website-review`, `/services` (websites and care plans) and `/business-systems`, from `ServiceLd` in `src/components/JsonLd.tsx`.
  - FAQPage wherever the `Faq` component is used (home and business systems).
- **Visit source on every form.** Both forms send a `source` field, for example "Google search, first page: /website-review". `src/analytics.ts` works it out once per visit from tracking tags and the referring site.
- **Tracking events**, sent only when `gaId` is set in `src/config/site.ts`:

| Event | When |
|---|---|
| `page_view` | Each page change |
| `generate_lead` | A form sends (`form_type`: `website_review` or `admin_check`) |
| `form_start` | Someone starts filling in a form |
| `form_error` | A form fails to send |
| `phone_click` | A phone link is tapped (records header, footer or page) |
| `email_click` | An email link is tapped |

- **Privacy page.** It always mentions the visit source. It switches between "no analytics" and the Google Analytics wording based on `gaId`, so it stays true.

## Needs an account or a decision

1. **Google Analytics 4.** Create a property and put the `G-...` ID in `gaId`. In GA4, mark `generate_lead` and `phone_click` as key events.
2. **Search Console.** Verify the domain and submit `/sitemap.xml`.
3. **Bing Webmaster Tools.** Import from Search Console. It feeds ChatGPT search and Copilot.
4. **Google Business Profile.** Set up as a service-area business in Beaudesert. Use this as the website link: `https://fieldbournedigital.com.au/?utm_source=google&utm_medium=organic&utm_campaign=gbp`. Then add the profile URL as `sameAs` in the business schema in `index.html`.
5. **Directories and LinkedIn.** Same name, phone and area everywhere. Add each profile URL to `sameAs`.
6. **Make scenario.** Map the new `source` field to a column in the review requests Google Sheet, or it won't be kept.

## Monthly report

A free Looker Studio dashboard covering:

- **GA4:** visits, forms sent and phone taps, by source.
- **Search Console:** searches, impressions and clicks.
- **Google Business Profile:** calls and website clicks.
- **Review requests Google Sheet:** the `source` column, to see which channels bring in review requests and paid work.
