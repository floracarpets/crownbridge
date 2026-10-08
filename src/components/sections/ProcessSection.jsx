import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../SectionHeading.jsx";

export default function ProcessSection() {
  const { t } = useTranslation();

  return (
    <section
      id="process"
      className="py-[65px] tablet:py-[104px] mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)]"
      aria-labelledby="process-title"
    >
      <SectionHeading
        className="mx-auto mb-[45px] max-w-[660px] text-center"
        eyebrow={t("process.eyebrow")}
        title={<span id="process-title">{t("process.title")}</span>}
      />
      <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-3 tablet:gap-[65px]">
        {["listen", "explore", "move"].map((id, index) => (
          <article
            className="text-center max-sm:mx-auto max-sm:max-w-[280px]"
            key={id}
          >
            <span className="mb-[22px] inline-grid size-[62px] place-items-center rounded-full border border-[#dccbb1] font-display text-gold">
              0{index + 1}
            </span>
            <h3 className="text-base tablet:text-xl">
              {t(`process.${id}.title`)}
            </h3>
            <p className="text-body text-muted">
              {t(`process.${id}.text`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
