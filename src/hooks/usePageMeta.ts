import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Set the page title, description, canonical address and social preview text per route. */
export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    const url = `${SITE_CONFIG.siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    const meta = (name: string) => () => {
      const m = document.createElement('meta');
      m.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
      return m;
    };
    upsert('meta[name="description"]', meta('description'), 'content', description);
    upsert('meta[property="og:title"]', meta('og:title'), 'content', title);
    upsert('meta[property="og:description"]', meta('og:description'), 'content', description);
    upsert('meta[property="og:url"]', meta('og:url'), 'content', url);
    upsert(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link');
        l.rel = 'canonical';
        return l;
      },
      'href',
      url,
    );
  }, [title, description, pathname]);
}
