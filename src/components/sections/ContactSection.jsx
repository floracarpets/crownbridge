import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../ContactForm.jsx";
import { company } from "../../content/site.js";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="contact-section section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-layout">
        <div>
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h2 id="contact-title">
            {t("contact.title")} <em>{t("contact.accent")}</em>
          </h2>
          <p>{t("contact.description")}</p>
          <dl className="contact-details">
            <div>
              <dt>{t("contact.emailLabel")}</dt>
              <dd>
                {company.email ? (
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                ) : (
                  t("contact.emailPending")
                )}
              </dd>
            </div>
            <div>
              <dt>{t("contact.phoneLabel")}</dt>
              <dd>
                {company.phone ? (
                  <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
                    {company.phone}
                  </a>
                ) : (
                  t("contact.phonePending")
                )}
              </dd>
            </div>
            <div>
              <dt>{t("contact.address")}</dt>
              <dd>{company.address || t("contact.addressPending")}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
