
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Get language from localStorage or default to browser language
const savedLanguage = localStorage.getItem('language') || navigator.language.split('-')[0];
const defaultLanguage = ['ar', 'en'].includes(savedLanguage) ? savedLanguage : 'en';

// Set document direction based on language
document.documentElement.dir = defaultLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = defaultLanguage;
document.documentElement.classList.add(defaultLanguage === 'ar' ? 'rtl' : 'ltr');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
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
    const isRtl = lng === 'ar';
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
  });
};

export default i18n;
