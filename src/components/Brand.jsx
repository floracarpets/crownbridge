import React from "react";
import { useTranslation } from "react-i18next";

export default function Brand() {
  const { t } = useTranslation();
  return (
    <a
      className="inline-flex min-h-11 shrink-0 items-center gap-[9px] [&>svg]:w-8 [&>svg]:shrink-0 [&>svg]:text-gold sm:[&>svg]:w-9 desktop:[&>svg]:w-11 [&>span]:font-display [&>span]:text-base sm:[&>span]:text-[1.05rem] desktop:[&>span]:text-[1.2rem] [&>span]:tracking-[-0.04em] [&_small]:mt-[5px] [&_small]:block [&_small]:text-center [&_small]:font-sans [&_small]:text-brand-caption [&_small]:tracking-[0.36em]"
      href="#home"
      aria-label={t("navigation.home")}
    >
      <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
        <path
          d="M5 33V20l8 5 11-17 11 17 8-5v13M8 39h32M16 33V23m8 10V17m8 16V23"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        CROWN<span className="text-gold">BRIDGE</span>
        <small>REAL ESTATE</small>
      </span>
    </a>
  );
}
