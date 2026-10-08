import React from "react";
import { useTranslation } from "react-i18next";
import Brand from "./Brand.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { company, sections, services } from "../content/site.js";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#111411] pt-16 text-[#d4d6d0] [&_h2]:mt-2 [&_h2]:mb-5 [&_h2]:font-sans [&_h2]:text-ui [&_h2]:font-medium [&_h2]:text-white [&_a:not([hreflang]):hover]:text-[#dbb982] [&_address]:mb-[14px] [&_address]:text-ui [&_address]:leading-[1.8] [&_address]:text-[#a6ab9f] [&_address]:not-italic">
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)] grid grid-cols-2 gap-x-5 gap-y-[30px] pb-[50px] sm:gap-10 desktop:grid-cols-[1.4fr_0.75fr_0.9fr_1.2fr] desktop:gap-[50px] max-sm:[&>div:last-child]:col-span-full [&>div:last-child>a]:block [&>div:last-child>a]:py-2 [&>div:last-child>a]:text-ui [&>div:last-child>a]:[overflow-wrap:anywhere]">
        <div className="max-sm:col-span-full [&>a]:text-white [&>a>svg]:text-[#ceaa72] [&>a>span>span]:text-[#ceaa72] [&>p]:mt-[22px] [&>p]:max-w-[260px] [&>p]:text-ui [&>p]:text-[#a6ab9f]">
          <Brand />
          <p>{t("footer.description")}</p>
          <LanguageSwitcher placement="top" />
        </div>
        <div>
          <h2>{t("footer.explore")}</h2>
          <nav
            className="flex flex-col items-start [&>a]:flex [&>a]:min-h-11 [&>a]:items-center [&>a]:text-ui [&>a]:text-[#a6ab9f]"
            aria-label={t("footer.navigation")}
          >
            {sections.map((id) => (
              <a key={id} href={`#${id}`}>
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>{t("footer.services")}</h2>
          <nav
            className="flex flex-col items-start [&>a]:flex [&>a]:min-h-11 [&>a]:items-center [&>a]:text-ui [&>a]:text-[#a6ab9f]"
            aria-label={t("footer.services")}
          >
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
            <p className="mt-3 text-ui text-[#a6ab9f]">
              {t("contact.phonePending")}
            </p>
          )}
          <div className="mt-[18px] flex flex-wrap gap-[14px] text-caption [&>span]:text-[#a6ab9f] [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center">
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
            <p className="mt-2 text-caption text-[#a6ab9f]">
              {t("footer.socialPending")}
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)] flex flex-col items-start justify-between gap-2 border-t border-[#ffffff19] py-[22px] text-caption text-[#a6ab9f] sm:flex-row sm:gap-5 tablet:items-center [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center">
        <span>
          © {new Date().getFullYear()} Crownbridge Real Estate.{" "}
          {t("footer.rights")}
        </span>
        <a href="#home">{t("footer.top")} ↑</a>
      </div>
    </footer>
  );
}
