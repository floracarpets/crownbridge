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
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") close(true);
      }}
    >
      <div className="header-inner container">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{t(open ? "navigation.close" : "navigation.menu")}</span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <div
          id="main-navigation"
          className={`header-navigation ${open ? "is-open" : ""}`}
        >
          <nav aria-label={t("navigation.primary")}>
            {sections.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => close()}>
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
