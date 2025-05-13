
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './i18n/config'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </BrowserRouter>
);
