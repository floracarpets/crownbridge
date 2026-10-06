import React from "react";
import { useTranslation } from "react-i18next";
import Brand from "./Brand.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { company, sections, services } from "../content/site.js";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand />
          <p>{t("footer.description")}</p>
          <LanguageSwitcher />
        </div>
        <div>
          <h2>{t("footer.explore")}</h2>
          <nav aria-label={t("footer.navigation")}>
            {sections.map((id) => (
              <a key={id} href={`#${id}`}>
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>{t("footer.services")}</h2>
          <nav aria-label={t("footer.services")}>
            {services.map((id) => (
              <a key={id} href="#services">
                {t(`services.${id}.title`)}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>{t("footer.connect")}</h2>
          <address>{company.address || t("contact.addressPending")}</address>
          {company.email && (
            <a href={`mailto:${company.email}`}>{company.email}</a>
          )}
          {company.phone ? (
            <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
              {company.phone}
            </a>
          ) : (
            <p className="footer-phone">{t("contact.phonePending")}</p>
          )}
          <div className="social-links">
            {Object.entries(company.social).map(([id, url]) =>
              url ? (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(`footer.${id}`)} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span key={id}>{t(`footer.${id}`)}</span>
              ),
            )}
          </div>
          {!Object.values(company.social).some(Boolean) && (
            <p className="social-pending">{t("footer.socialPending")}</p>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Crownbridge Real Estate.{" "}
          {t("footer.rights")}
        </span>
        <a href="#home">{t("footer.top")} ↑</a>
      </div>
    </footer>
  );
}
