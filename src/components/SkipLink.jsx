import React from "react";
import { useTranslation } from "react-i18next";

export default function SkipLink() {
  const { t } = useTranslation();

  return (
    <a
      className="fixed top-2 left-2 z-100 -translate-y-[160%] bg-white p-3 focus:translate-y-0"
      href="#main-content"
    >
      {t("navigation.skipToContent")}
    </a>
  );
}
