import React from "react";
import { useTranslation } from "react-i18next";
import { properties } from "../../content/site.js";
import { formattingLocale } from "../../i18n/locales.js";

export default function PropertiesSection() {
  const { t, i18n } = useTranslation();
  const number = new Intl.NumberFormat(formattingLocale(i18n.resolvedLanguage));

  return (
    <section
      id="properties"
      className="section container"
      aria-labelledby="properties-title"
    >
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">{t("properties.eyebrow")}</p>
          <h2 id="properties-title">{t("properties.title")}</h2>
        </div>
        <a className="text-link" href="#contact">
          {t("properties.link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="property-notice">{t("properties.notice")}</p>
      <div className="properties-grid">
        {properties.map((property) => (
          <article className="property-card" key={property.id}>
            <div className="property-image">
              <img
                src={property.image}
                alt={t(`properties.${property.id}.alt`)}
                width="1000"
                height="667"
                loading="lazy"
              />
              <span className="property-tag">
                {t("properties.illustration")}
              </span>
            </div>
            <div className="property-copy">
              <p className="eyebrow">
                {t(`properties.${property.id}.category`)}
              </p>
              <h3>{t(`properties.${property.id}.title`)}</h3>
              <p>{t(`properties.${property.id}.text`)}</p>
              <details>
                <summary>
                  {t("properties.details")} <span aria-hidden="true">+</span>
                </summary>
                <dl>
                  <div>
                    <dt>{t("properties.type")}</dt>
                    <dd>{t(`properties.types.${property.type}`)}</dd>
                  </div>
                  {property.bedrooms !== null && (
                    <>
                      <div>
                        <dt>{t("properties.bedrooms")}</dt>
                        <dd>{number.format(property.bedrooms)}</dd>
                      </div>
                      <div>
                        <dt>{t("properties.area")}</dt>
                        <dd>{number.format(property.area)} m²</dd>
                      </div>
                    </>
                  )}
                  <div>
                    <dt>{t("properties.status")}</dt>
                    <dd>{t("properties.exampleOnly")}</dd>
                  </div>
                </dl>
                <a className="text-link" href="#contact">
                  {t("properties.enquire")} <span aria-hidden="true">↗</span>
                </a>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
