import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="py-[65px] tablet:py-[104px] mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)] grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-[60px] desktop:gap-[100px]"
      aria-labelledby="about-title"
    >
      <div className="relative mr-[14px] pr-[22px] pb-[22px] tablet:mr-0 before:absolute before:inset-[30px_0_0_30px] before:-z-1 before:border before:border-[#c5a66e] before:content-[''] [&>img]:h-[300px] sm:[&>img]:h-[365px] tablet:[&>img]:h-[465px]">
        <img
          src="/images/interior.jpg"
          alt={t("images.interior")}
          width="1000"
          height="667"
          loading="lazy"
        />
        <div className="absolute right-9 bottom-9 left-[14px] flex items-center gap-3 bg-[#ffffffed] p-3 text-ui sm:right-12 sm:bottom-[45px] sm:left-6 sm:px-5 sm:py-[17px]">
          <span className="h-px w-[22px] shrink-0 bg-gold" />
          <span>{t("about.imageLabel")}</span>
        </div>
        <div
          className="absolute top-10 -right-[14px] bg-dark p-6 text-center font-display text-[2.3rem] text-[#dbc298] tablet:-right-[23px] [&>span]:mt-2 [&>span]:block [&>span]:font-sans [&>span]:text-caption [&>span]:tracking-[0.2em]"
          aria-hidden="true"
        >
          CB<span>REAL ESTATE</span>
        </div>
      </div>
      <div className="[&>p:not(:first-child)]:text-body [&>p:not(:first-child)]:text-muted max-tablet:[&_h2]:max-w-[480px]">
        <p className="mb-[18px] text-caption font-semibold leading-[1.8] tracking-[0.21em] text-gold">
          {t("about.eyebrow")}
        </p>
        <h2 id="about-title">
          {t("about.title")} <em>{t("about.accent")}</em>
        </h2>
        <p>{t("about.text")}</p>
        <p>{t("about.text2")}</p>
        <div className="mt-7 mb-3 flex flex-wrap gap-x-[22px] gap-y-2.5 border-y border-[#e8e3da] py-5 text-caption [&>span]:before:mr-1.5 [&>span]:before:text-gold [&>span]:before:content-['✧']">
          <span>{t("about.value1")}</span>
          <span>{t("about.value2")}</span>
          <span>{t("about.value3")}</span>
        </div>
        <a
          className="inline-flex min-h-11 items-center gap-6 text-body font-semibold text-[#715322] hover:underline hover:underline-offset-[5px]"
          href="#why"
        >
          {t("about.link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
