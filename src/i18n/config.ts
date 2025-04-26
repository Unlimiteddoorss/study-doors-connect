
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';
import frTranslations from './locales/fr.json';
import trTranslations from './locales/tr.json';

// Get language from localStorage or default to browser language
const savedLanguage = localStorage.getItem('language') || navigator.language.split('-')[0];
const defaultLanguage = ['ar', 'en', 'fr', 'tr'].includes(savedLanguage) ? savedLanguage : 'en';

// Determine direction based on language
const isRtlLanguage = (lang: string) => ['ar'].includes(lang);

// Set document direction based on language
document.documentElement.dir = isRtlLanguage(defaultLanguage) ? 'rtl' : 'ltr';
document.documentElement.lang = defaultLanguage;
document.documentElement.classList.add(isRtlLanguage(defaultLanguage) ? 'rtl' : 'ltr');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      },
      fr: {
        translation: frTranslations || {}
      },
      tr: {
        translation: trTranslations || {}
      }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Function to change language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng).then(() => {
    localStorage.setItem('language', lng);
    
    // Update document direction
    const isRtl = isRtlLanguage(lng);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Update CSS classes for RTL support
    if (isRtl) {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
    
    // Force re-render of RTL/LTR sensitive components
    window.dispatchEvent(new Event('languagechange'));
    
    // Refresh page for comprehensive RTL/LTR adjustment if needed
    // Uncomment if you encounter layout issues when switching languages
    // window.location.reload();
  });
};

// Export language utility functions
export const isRTL = () => document.documentElement.dir === 'rtl';
export const getCurrentLanguage = () => i18n.language;
export const getLanguageName = (code: string) => {
  const names: Record<string, string> = {
    en: 'English',
    ar: 'العربية',
    fr: 'Français',
    tr: 'Türkçe'
  };
  return names[code] || code;
};

export default i18n;
