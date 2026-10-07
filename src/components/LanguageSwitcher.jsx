import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { languages, localizedPath } from "../i18n/locales.js";

export default function LanguageSwitcher({ className = "" }) {
  const { t, i18n } = useTranslation();
  // Start with the same URLs as the generated HTML, then preserve browser state.
  const [location, setLocation] = useState({
    pathname: `/${i18n.resolvedLanguage}/`,
    search: "",
    hash: "",
  });
  useEffect(() => {
    const update = () => {
      const { pathname, search, hash } = window.location;
      setLocation({ pathname, search, hash });
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return (
    <nav
      className={`flex flex-wrap gap-0.5 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:p-2 [&>a]:text-[0.8rem] desktop:[&>a]:text-[0.67rem] [&>a[aria-current]]:text-[#715322] [&>a[aria-current]]:underline [&>a[aria-current]]:underline-offset-[6px] ${className}`}
      aria-label={t("navigation.language")}
    >
      {languages.map(({ code, label }) => (
        <a
          key={code}
          href={`${localizedPath(location.pathname, code)}${location.search}${location.hash}`}
          lang={code}
          hrefLang={code}
          aria-current={i18n.resolvedLanguage === code ? "true" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
