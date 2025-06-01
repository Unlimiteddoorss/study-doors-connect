
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import enTranslations from './i18n/locales/en.json';
import arTranslations from './i18n/locales/ar.json';

const resources = {
  en: {
    translation: enTranslations
  },
  ar: {
    translation: arTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
