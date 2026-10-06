import React from "react";
import { useTranslation } from "react-i18next";

export default function SkipLink() {
  const { t } = useTranslation();

  return (
    <a className="skip-link" href="#main-content">
      {t("navigation.skipToContent")}
    </a>
  );
}
