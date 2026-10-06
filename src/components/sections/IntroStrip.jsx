import React from "react";
import { useTranslation } from "react-i18next";

export default function IntroStrip() {
  const { t } = useTranslation();

  return (
    <div className="intro-strip">
      <div className="container intro-strip-inner">
        <span>{t("intro.title")}</span>
        <p>{t("intro.text")}</p>
        <a href="#contact">
          {t("intro.link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
