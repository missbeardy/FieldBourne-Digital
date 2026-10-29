import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App, { preloadRoute } from './App';
import './index.css';

const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirect);
}

// Load this page's code before the first render. The prerendered HTML stays on screen meanwhile,
// so a slow connection never shows a blank page. If loading fails, render anyway and let Suspense retry.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .finally(() =>
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    ),
  );
