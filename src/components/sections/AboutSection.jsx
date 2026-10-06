import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="section container about-section"
      aria-labelledby="about-title"
    >
      <div className="about-visual">
        <img
          src="/images/interior.jpg"
          alt={t("images.interior")}
          width="1000"
          height="667"
          loading="lazy"
        />
        <div className="image-label">
          <span className="label-line" />
          <span>{t("about.imageLabel")}</span>
        </div>
        <div className="about-stamp" aria-hidden="true">
          CB<span>REAL ESTATE</span>
        </div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">{t("about.eyebrow")}</p>
        <h2 id="about-title">
          {t("about.title")} <em>{t("about.accent")}</em>
        </h2>
        <p>{t("about.text")}</p>
        <p>{t("about.text2")}</p>
        <div className="about-values">
          <span>{t("about.value1")}</span>
          <span>{t("about.value2")}</span>
          <span>{t("about.value3")}</span>
        </div>
        <a className="text-link" href="#why">
          {t("about.link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
