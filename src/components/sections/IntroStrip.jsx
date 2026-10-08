import React from "react";
import { useTranslation } from "react-i18next";

export default function IntroStrip() {
  const { t } = useTranslation();

  return (
    <div className="border-b border-[#e5e1d9] bg-cream [&_span]:font-display [&_span]:text-[1.2rem] [&_a]:flex [&_a]:min-h-11 [&_a]:items-center [&_a]:gap-5 [&_a]:text-ui [&_a_span]:text-gold">
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)] py-6 tablet:flex tablet:flex-wrap tablet:items-center tablet:justify-between tablet:gap-x-[30px] tablet:gap-y-[5px] tablet:py-7 desktop:flex-nowrap desktop:gap-6 [&>p]:my-2 [&>p]:text-ui [&>p]:text-muted tablet:[&>p]:m-0 tablet:[&>p]:basis-[55%] desktop:[&>p]:basis-auto">
        <span>{t("intro.title")}</span>
        <p>{t("intro.text")}</p>
        <a href="#contact">
          {t("intro.link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
