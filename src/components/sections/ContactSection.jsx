import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../ContactForm.jsx";
import { company } from "../../content/site.js";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="border-t border-[#e8e3da] bg-cream py-[65px] tablet:py-[104px]"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)] grid grid-cols-1 gap-10 tablet:grid-cols-[0.9fr_1.1fr] tablet:gap-[60px] desktop:gap-[100px] [&_h2_em]:block [&>div>p:not(:first-child)]:max-w-[365px] [&>div>p:not(:first-child)]:text-[0.86rem] [&>div>p:not(:first-child)]:text-muted">
        <div>
          <p className="mb-[18px] text-[0.68rem] font-semibold leading-[1.8] tracking-[0.21em] text-gold">
            {t("contact.eyebrow")}
          </p>
          <h2 id="contact-title">
            {t("contact.title")} <em>{t("contact.accent")}</em>
          </h2>
          <p>{t("contact.description")}</p>
          <dl className="mt-[35px] mb-4 [&>div]:my-2.5 [&>div]:block [&>div]:pb-[15px] [&_dt]:mb-2 [&_dt]:text-[0.59rem] [&_dt]:tracking-[0.13em] [&_dt]:text-muted [&_dt]:uppercase [&_dd]:text-left [&_dd]:text-[0.82rem] [&_dd]:[overflow-wrap:anywhere] [&_a:hover]:underline">
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
