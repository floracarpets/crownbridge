import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import i18n from "./i18n/index.js";
import "./style.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (root.hasChildNodes() && root.dataset.language === i18n.resolvedLanguage) {
  hydrateRoot(root, app);
} else {
  // Development and root visits restoring a different session language.
  createRoot(root).render(app);
}
