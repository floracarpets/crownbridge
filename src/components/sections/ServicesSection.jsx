import React from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../content/site.js";

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="services-section section"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{t("services.eyebrow")}</p>
            <h2 id="services-title">{t("services.title")}</h2>
          </div>
          <p>{t("services.description")}</p>
        </div>
        <div className="services-grid">
          {services.map((id, index) => (
            <article className="service-card" key={id}>
              <div className="service-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <svg
                  viewBox="0 0 48 48"
                  width="42"
                  height="42"
                  aria-hidden="true"
                >
                  <path
                    d={
                      [
                        "M8 24 24 10l16 14M13 21v19h22V21M21 40V28h7v12",
                        "M10 38h28M14 38V16h20v22M20 22h8m-8 7h8M24 8v8",
                        "M9 25h30M14 25v15h20V25M24 8l15 17H9L24 8Z",
                        "M8 40h32M12 40V22h9v18m6 0V9h9v31M15 27h3m12-11h3m-3 7h3",
                      ][index]
                    }
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>{t(`services.${id}.title`)}</h3>
              <p>{t(`services.${id}.text`)}</p>
              <a className="text-link" href="#contact">
                {t("services.link")} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
