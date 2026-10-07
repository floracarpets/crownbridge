import React from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative flex min-h-[630px] items-center overflow-hidden text-white tablet:h-[min(760px,85vh)] tablet:min-h-[660px]"
      id="home"
      aria-labelledby="home-title"
    >
      <img
        className="absolute inset-0 h-full object-[center_52%]"
        src="/images/skyline.jpg"
        alt=""
        width="1920"
        height="1280"
        fetchPriority="high"
      />
      <div className="absolute inset-0 h-full bg-[linear-gradient(90deg,#08141bd9,#08141b70),linear-gradient(0deg,#08141b99,transparent)] tablet:bg-[linear-gradient(90deg,rgba(8,20,26,0.85),rgba(8,20,26,0.43)_55%,rgba(8,20,26,0.12)),linear-gradient(0deg,rgba(8,20,26,0.65),transparent_35%)]" />
      <div className="relative z-1 pt-[70px] pb-[130px] tablet:pb-[100px] [&>p:first-child]:text-[#e9c991] [&_h1]:mb-[25px] [&_h1]:max-w-[910px] [&_h1]:text-[clamp(2.8rem,8vw,4rem)] tablet:[&_h1]:text-[clamp(3.1rem,5.3vw,5rem)] [&_h1]:leading-[1.17] [&_h1]:tracking-[-0.035em] [&_h1_em]:block [&_h1_em]:font-normal [&_h1_em]:text-[#e5c18a] mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)]">
        <p className="mb-[18px] text-[0.68rem] font-semibold leading-[1.8] tracking-[0.21em] text-gold">
          {t("hero.eyebrow")}
        </p>
        <h1 id="home-title">
          {t("hero.title")}
          <em>{t("hero.accent")}</em>
        </h1>
        <p className="mb-8 max-w-[460px] text-[0.85rem] text-[#e1e4e2] sm:text-[0.9rem]">
          {t("hero.description")}
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <a
            className="inline-flex min-h-[54px] items-center justify-between gap-7 border border-transparent px-[25px] py-4 text-[0.82rem] font-semibold transition-colors duration-200 motion-reduce:transition-none bg-[#bd965a] text-[#161611] hover:bg-[#d0ad76] max-sm:px-5 max-sm:py-[14px]"
            href="#properties"
          >
            {t("hero.explore")} <span aria-hidden="true">↗</span>
          </a>
          <a
            className="flex min-h-11 items-center gap-4 text-[0.82rem]"
            href="#contact"
          >
            {t("hero.talk")} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <a
        className="absolute bottom-[25px] left-5 flex min-h-11 items-center gap-[15px] text-[0.66rem] tracking-[0.05em] tablet:bottom-[30px] tablet:left-[max(48px,calc((100vw-1280px)/2))] [&>span]:grid [&>span]:size-8 [&>span]:place-items-center [&>span]:rounded-full [&>span]:border [&>span]:border-[#ffffff60]"
        href="#about"
      >
        <span aria-hidden="true">↓</span>
        {t("hero.scroll")}
      </a>
      <span className="absolute right-[max(48px,calc((100vw-1280px)/2))] bottom-11 hidden text-[0.65rem] tracking-[0.1em] text-[#ddd] tablet:block">
        {t("hero.caption")}
      </span>
    </section>
  );
}
