import React from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../SectionHeading.jsx";

export default function ProcessSection() {
  const { t } = useTranslation();

  return (
    <section
      id="process"
      className="section container process-section"
      aria-labelledby="process-title"
    >
      <SectionHeading
        eyebrow={t("process.eyebrow")}
        title={<span id="process-title">{t("process.title")}</span>}
      />
      <div className="process-grid">
        {["listen", "explore", "move"].map((id, index) => (
          <article key={id}>
            <span>0{index + 1}</span>
            <h3>{t(`process.${id}.title`)}</h3>
            <p>{t(`process.${id}.text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
