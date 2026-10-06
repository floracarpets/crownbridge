import en from "./locales/en/common.json";
import tr from "./locales/tr/common.json";
import fr from "./locales/fr/common.json";
import { defaultLanguage, languages } from "./locales.js";

// Register new language JSON here and in locales.js. Components stay the same.
export const translationOptions = {
  initAsync: false,
  fallbackLng: defaultLanguage,
  supportedLngs: languages.map(({ code }) => code),
  defaultNS: "common",
  ns: ["common"],
  resources: { en: { common: en }, tr: { common: tr }, fr: { common: fr } },
  interpolation: { escapeValue: false },
};
