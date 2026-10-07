import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Brand from "./Brand.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { sections } from "../content/site.js";

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  function close(returnFocus = false) {
    setOpen(false);
    if (returnFocus) toggle.current?.focus();
  }
  return (
    <header
      className="sticky top-0 z-20 border-b border-[#e8e5df] bg-white"
      onKeyDown={(event) => {
        if (event.key === "Escape") close(true);
      }}
    >
      <div className="flex min-h-20 flex-wrap items-center justify-between gap-0 desktop:min-h-[94px] desktop:flex-nowrap desktop:gap-[30px] mx-auto w-[calc(100%-40px)] max-w-[1280px] tablet:w-[calc(100%-64px)] desktop:w-[calc(100%-96px)]">
        <Brand />
        <button
          ref={toggle}
          className="flex min-h-11 items-center gap-3 border border-[#ddd8ce] bg-transparent px-3 py-2 text-[0.75rem] sm:text-base desktop:hidden"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{t(open ? "navigation.close" : "navigation.menu")}</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <div
          id="main-navigation"
          className={`w-full flex-col items-stretch gap-[15px] pt-4 pb-6 desktop:flex desktop:w-auto desktop:flex-row desktop:items-center desktop:gap-7 desktop:p-0 ${open ? "flex" : "hidden"}`}
        >
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-1 desktop:flex-nowrap desktop:gap-[21px] [&>a]:flex [&>a]:min-h-11 [&>a]:items-center [&>a]:text-[0.85rem] desktop:[&>a]:text-[0.72rem] desktop:[&>a]:whitespace-nowrap [&>a:hover]:text-[#715322]"
            aria-label={t("navigation.primary")}
          >
            {sections.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => close()}>
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher className="border-t border-[#e2dfd8] pt-2.5 desktop:border-t-0 desktop:border-l desktop:pt-0 desktop:pl-[15px]" />
        </div>
      </div>
    </header>
  );
}
