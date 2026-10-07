import React from "react";
import { useTranslation } from "react-i18next";
import { services } from "../../content/site.js";

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="bg-cream py-[65px] tablet:py-[104px]"
      aria-labelledby="services-title"
    >
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)]">
        <div className="mb-7 tablet:mb-9 tablet:flex tablet:items-end tablet:justify-between tablet:gap-[50px]">
          <div>
            <p className="mb-[18px] text-[0.68rem] font-semibold leading-[1.8] tracking-[0.21em] text-gold">
              {t("services.eyebrow")}
            </p>
            <h2 className="mb-0" id="services-title">
              {t("services.title")}
            </h2>
          </div>
          <p className="mt-5 mb-0 max-w-[310px] text-[0.83rem] text-muted tablet:mt-0">
            {t("services.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 border border-[#e4dfd5] sm:grid-cols-2 desktop:grid-cols-4">
          {services.map((id, index) => (
            <article
              className="border-[#e4dfd5] bg-white px-6 pt-[30px] pb-6 not-first:border-t sm:not-first:border-t-0 sm:even:border-l sm:[&:nth-child(n+3)]:border-t desktop:not-first:border-l desktop:[&:nth-child(n+3)]:border-t-0"
              key={id}
            >
              <div className="mb-[15px] flex items-start justify-between text-gold sm:mb-[30px]">
                <span className="text-[0.65rem] text-[#8c8b82]">
                  {String(index + 1).padStart(2, "0")}
                </span>
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
              <h3 className="font-display text-2xl">
                {t(`services.${id}.title`)}
              </h3>
              <p className="text-[0.78rem] text-muted sm:min-h-[70px] desktop:min-h-[100px]">
                {t(`services.${id}.text`)}
              </p>
              <a
                className="inline-flex min-h-11 items-center gap-[15px] text-[0.69rem] font-semibold text-[#715322] hover:underline hover:underline-offset-[5px]"
                href="#contact"
              >
                {t("services.link")} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
