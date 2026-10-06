import React from "react";
import { useTranslation } from "react-i18next";

export default function Brand() {
  const { t } = useTranslation();
  return (
    <a className="brand" href="#home" aria-label={t("navigation.home")}>
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
        CROWN<span className="brand-gold">BRIDGE</span>
        <small>REAL ESTATE</small>
      </span>
    </a>
  );
}
