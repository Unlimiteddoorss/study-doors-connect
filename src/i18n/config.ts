
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';
import frTranslations from './locales/fr.json';
import trTranslations from './locales/tr.json';

// Safe function to get from localStorage
const getSavedLanguage = () => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language');
    }
  } catch (error) {
    console.warn('Could not access localStorage:', error);
  }
  return null;
};

// Safe function to get browser language
const getBrowserLanguage = () => {
  try {
    if (typeof navigator !== 'undefined') {
      return navigator.language.split('-')[0];
    }
  } catch (error) {
    console.warn('Could not access navigator:', error);
  }
  return 'en';
};

// Get language safely
const savedLanguage = getSavedLanguage() || getBrowserLanguage();
const defaultLanguage = ['ar', 'en', 'fr', 'tr'].includes(savedLanguage) ? savedLanguage : 'en';

// Determine direction based on language
const isRtlLanguage = (lang: string) => ['ar'].includes(lang);

// Safe function to set document properties
const setDocumentProperties = (lang: string) => {
  try {
    if (typeof document !== 'undefined') {
      const isRtl = isRtlLanguage(lang);
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      document.documentElement.classList.remove('rtl', 'ltr');
      document.documentElement.classList.add(isRtl ? 'rtl' : 'ltr');
    }
  } catch (error) {
    console.warn('Could not set document properties:', error);
  }
};

// Set initial document direction
setDocumentProperties(defaultLanguage);

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
        translation: frTranslations
      },
      tr: {
        translation: trTranslations
      }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Function to change language safely
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng).then(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lng);
      }
    } catch (error) {
      console.warn('Could not save language to localStorage:', error);
    }
    
    // Update document direction
    setDocumentProperties(lng);
    
    // Force re-render of RTL/LTR sensitive components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('languagechange'));
    }
  });
};

// Export language utility functions
export const isRTL = () => {
  try {
    if (typeof document !== 'undefined') {
      return document.documentElement.dir === 'rtl';
    }
  } catch (error) {
    console.warn('Could not check RTL status:', error);
  }
  return false;
};

export const getCurrentLanguage = () => i18n.language || 'en';

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
