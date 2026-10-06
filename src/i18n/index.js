import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initializeLanguage } from "./session.js";
import { translationOptions } from "./resources.js";

i18n.use(initReactI18next).init({
  ...translationOptions,
  lng: initializeLanguage(window),
});

export default i18n;
