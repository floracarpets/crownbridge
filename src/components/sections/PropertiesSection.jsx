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
      className="py-[65px] tablet:py-[104px] mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)]"
      aria-labelledby="properties-title"
    >
      <div className="mb-7 tablet:mb-9 tablet:flex tablet:items-end tablet:justify-between tablet:gap-[50px]">
        <div>
          <p className="mb-[18px] text-[0.68rem] font-semibold leading-[1.8] tracking-[0.21em] text-gold">
            {t("properties.eyebrow")}
          </p>
          <h2 className="mb-0" id="properties-title">
            {t("properties.title")}
          </h2>
        </div>
        <a
          className="mt-5 tablet:mt-0 inline-flex min-h-11 items-center gap-6 text-[0.8rem] font-semibold text-[#715322] hover:underline hover:underline-offset-[5px]"
          href="#contact"
        >
          {t("properties.link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="mb-7 max-w-[800px] text-[0.75rem] text-muted">
        {t("properties.notice")}
      </p>
      <div className="grid grid-cols-1 gap-7 tablet:grid-cols-3 tablet:gap-4 desktop:gap-[26px]">
        {properties.map((property) => (
          <article className="group border border-[#e8e3da]" key={property.id}>
            <div className="relative overflow-hidden">
              <img
                className="aspect-[1.5] h-auto transition-transform duration-[350ms] group-hover:scale-[1.035] motion-reduce:transition-none tablet:aspect-auto tablet:h-[225px] desktop:h-[275px]"
                src={property.image}
                alt={t(`properties.${property.id}.alt`)}
                width="1000"
                height="667"
                loading="lazy"
              />
              <span className="absolute top-[18px] left-[18px] bg-[#ffffffed] px-3 py-2 text-[0.61rem] text-[#574321]">
                {t("properties.illustration")}
              </span>
            </div>
            <div className="p-5 desktop:p-[25px]">
              <p className="mb-2.5 text-[0.59rem] font-semibold leading-[1.8] tracking-[0.21em] text-gold">
                {t(`properties.${property.id}.category`)}
              </p>
              <h3 className="mb-3 font-display text-[1.6rem] tablet:text-[1.3rem] desktop:text-[1.6rem]">
                {t(`properties.${property.id}.title`)}
              </h3>
              <p className="text-[0.8rem] text-muted">
                {t(`properties.${property.id}.text`)}
              </p>
              <details className="group/details">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between border-t border-[#e8e3da] pt-4 pb-[5px] text-[0.75rem] [&::-webkit-details-marker]:hidden">
                  {t("properties.details")}{" "}
                  <span
                    className="text-[1.2rem] text-gold group-open/details:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <dl className="my-4">
                  <div className="my-2.5 flex justify-between gap-4 text-[0.75rem]">
                    <dt className="text-muted">{t("properties.type")}</dt>
                    <dd className="text-right">
                      {t(`properties.types.${property.type}`)}
                    </dd>
                  </div>
                  {property.bedrooms !== null && (
                    <>
                      <div className="my-2.5 flex justify-between gap-4 text-[0.75rem]">
                        <dt className="text-muted">
                          {t("properties.bedrooms")}
                        </dt>
                        <dd className="text-right">
                          {number.format(property.bedrooms)}
                        </dd>
                      </div>
                      <div className="my-2.5 flex justify-between gap-4 text-[0.75rem]">
                        <dt className="text-muted">{t("properties.area")}</dt>
                        <dd className="text-right">
                          {number.format(property.area)} m²
                        </dd>
                      </div>
                    </>
                  )}
                  <div className="my-2.5 flex justify-between gap-4 text-[0.75rem]">
                    <dt className="text-muted">{t("properties.status")}</dt>
                    <dd className="text-right">
                      {t("properties.exampleOnly")}
                    </dd>
                  </div>
                </dl>
                <a
                  className="inline-flex min-h-11 items-center gap-6 text-[0.8rem] font-semibold text-[#715322] hover:underline hover:underline-offset-[5px]"
                  href="#contact"
                >
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
