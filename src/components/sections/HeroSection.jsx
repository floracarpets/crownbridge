import React from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home" aria-labelledby="home-title">
      <img
        className="hero-image"
        src="/images/skyline.jpg"
        alt=""
        width="1920"
        height="1280"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="hero-content container">
        <p className="eyebrow">{t("hero.eyebrow")}</p>
        <h1 id="home-title">
          {t("hero.title")}
          <em>{t("hero.accent")}</em>
        </h1>
        <p className="hero-description">{t("hero.description")}</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#properties">
            {t("hero.explore")} <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-secondary" href="#contact">
            {t("hero.talk")} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <a className="hero-scroll" href="#about">
        <span aria-hidden="true">↓</span>
        {t("hero.scroll")}
      </a>
      <span className="hero-caption">{t("hero.caption")}</span>
    </section>
  );
}
