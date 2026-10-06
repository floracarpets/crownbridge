import React from "react";
import { useTranslation } from "react-i18next";

export default function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="why"
      className="why-section section"
      aria-labelledby="why-title"
    >
      <div className="container why-layout">
        <div>
          <p className="eyebrow">{t("why.eyebrow")}</p>
          <h2 id="why-title">
            {t("why.title")} <em>{t("why.accent")}</em>
          </h2>
          <p className="section-description">{t("why.description")}</p>
          <a className="button button-outline" href="#contact">
            {t("why.link")} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="why-list">
          {["personal", "clarity", "communication"].map((id, index) => (
            <article key={id}>
              <span className="why-number">0{index + 1}</span>
              <div>
                <h3>{t(`why.${id}.title`)}</h3>
                <p>{t(`why.${id}.text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
