
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './i18n/config'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import ErrorBoundary from '@/components/shared/ErrorBoundary'

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(error => {
        console.log('SW registration failed: ', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
