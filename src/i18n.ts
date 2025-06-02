
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import enTranslations from './i18n/locales/en.json';
import arTranslations from './i18n/locales/ar.json';
import frTranslations from './i18n/locales/fr.json';
import trTranslations from './i18n/locales/tr.json';

const resources = {
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
