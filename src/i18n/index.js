import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import tr from './locales/tr/common.json';
import fr from './locales/fr/common.json';
import { defaultLanguage, languages } from './locales.js';
import { initializeLanguage } from './session.js';

i18n.use(initReactI18next).init({
  // Bundled JSON loads synchronously, before React renders.
  initAsync: false,
  lng: initializeLanguage(window),
  fallbackLng: defaultLanguage,
  supportedLngs: languages.map(({ code }) => code),
  defaultNS: 'common',
  ns: ['common'],
  // Interface copy only. Keep listing facts in one property record and
  // retrieve translated descriptions from a CMS/API by property ID + language.
  // These small dictionaries are bundled; editing them requires a rebuild.
  resources: { en: { common: en }, tr: { common: tr }, fr: { common: fr } },
  interpolation: { escapeValue: false },
});

export default i18n;
