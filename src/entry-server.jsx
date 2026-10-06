import React from "react";
import { renderToString } from "react-dom/server";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import { translationOptions } from "./i18n/resources.js";
import App from "./App.jsx";

export async function render(language) {
  const i18n = createInstance();
  await i18n.init({ ...translationOptions, lng: language });
  return {
    markup: renderToString(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
    ),
    title: i18n.t("meta.title"),
    description: i18n.t("meta.description"),
  };
}
