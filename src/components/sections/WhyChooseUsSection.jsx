import React from "react";
import { useTranslation } from "react-i18next";

export default function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="why"
      className="bg-dark text-white py-[65px] tablet:py-[104px]"
      aria-labelledby="why-title"
    >
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)] grid grid-cols-1 gap-10 tablet:grid-cols-2 tablet:gap-[60px] desktop:gap-[100px]">
        <div>
          <p className="mb-[18px] text-caption font-semibold leading-[1.8] tracking-[0.21em] text-[#ceaa72]">
            {t("why.eyebrow")}
          </p>
          <h2 id="why-title">
            {t("why.title")}{" "}
            <em className="block text-[#ceaa72]">{t("why.accent")}</em>
          </h2>
          <p className="mb-[30px] max-w-[420px] text-body text-[#b2b6ac]">
            {t("why.description")}
          </p>
          <a
            className="inline-flex min-h-[54px] items-center justify-between gap-7 border px-[25px] py-4 text-body font-semibold transition-colors duration-200 motion-reduce:transition-none border-[#898b7e] text-white hover:bg-[#30332e]"
            href="#contact"
          >
            {t("why.link")} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div>
          {["personal", "clarity", "communication"].map((id, index) => (
            <article
              className="flex gap-[25px] border-b border-[#ffffff20] py-6 first:pt-0"
              key={id}
            >
              <span className="font-display text-2xl text-[#ceaa72]">
                0{index + 1}
              </span>
              <div>
                <h3 className="mb-2.5 text-[1.1rem]">{t(`why.${id}.title`)}</h3>
                <p className="m-0 text-body text-[#b2b6ac]">
                  {t(`why.${id}.text`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
