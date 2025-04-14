
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
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  });
};

export default i18n;
