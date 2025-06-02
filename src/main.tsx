
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './i18n'
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

// Get the root element
const rootElement = document.getElementById("root");

// Create a root for React to render into
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <HelmetProvider>
            <ThemeProvider defaultTheme="light">
              <App />
            </ThemeProvider>
          </HelmetProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
