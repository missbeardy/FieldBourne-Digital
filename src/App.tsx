import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView, visitSource } from './analytics';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { HomePage } from './pages/HomePage';

const page = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, name: K) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const WebsiteReviewPage = page(() => import('./pages/WebsiteReviewPage'), 'WebsiteReviewPage');
const ServicesPage = page(() => import('./pages/ServicesPage'), 'ServicesPage');
const BusinessSystemsPage = page(() => import('./pages/BusinessSystemsPage'), 'BusinessSystemsPage');
const PricingPage = page(() => import('./pages/PricingPage'), 'PricingPage');
const WorkPage = page(() => import('./pages/WorkPage'), 'WorkPage');
const CaseStudyPage = page(() => import('./pages/CaseStudyPage'), 'CaseStudyPage');
const ScenicRimPage = page(() => import('./pages/ScenicRimPage'), 'ScenicRimPage');
const AboutPage = page(() => import('./pages/AboutPage'), 'AboutPage');
const PrivacyPage = page(() => import('./pages/PrivacyPage'), 'PrivacyPage');
const TermsPage = page(() => import('./pages/TermsPage'), 'TermsPage');

/** Every real route. scripts/prerender.mjs reads this list to write one HTML file per page. */
export const ROUTES = [
  '/',
  '/website-review',
  '/services',
  '/business-systems',
  '/pricing',
  '/work',
  '/case-study/tvmagic',
  '/scenic-rim',
  '/about',
  '/privacy',
  '/terms',
] as const;

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Lazy pages render a moment after the route changes, so wait briefly for the target to exist.
    let frame = 0;
    let tries = 0;
    const find = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (++tries < 120) frame = requestAnimationFrame(find);
      else window.scrollTo(0, 0);
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

/** Loads analytics once (only if a measurement ID is set) and records which way each visit came in. */
function AnalyticsManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    initAnalytics();
    visitSource();
  }, []);

  useEffect(() => {
    // Wait a beat so the page's own title is set before the view is recorded.
    const t = window.setTimeout(() => trackPageView(pathname), 50);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-dark">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-dark focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <Nav />
      <ScrollManager />
      <AnalyticsManager />
      <main id="main" className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/website-review" element={<WebsiteReviewPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/business-systems" element={<BusinessSystemsPage />} />
            <Route path="/automation" element={<Navigate to="/business-systems" replace />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/case-study/tvmagic" element={<CaseStudyPage />} />
            <Route path="/scenic-rim" element={<ScenicRimPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/fieldbourne" element={<Navigate to="/case-study/tvmagic" replace />} />
            <Route path="/tvmagic" element={<Navigate to="/case-study/tvmagic" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
