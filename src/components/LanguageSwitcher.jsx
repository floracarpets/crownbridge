import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultLanguage, languages, localizedPath } from "../i18n/locales.js";

export default function LanguageSwitcher({
  className = "",
  placement = "bottom",
  align = "left",
}) {
  const { t, i18n } = useTranslation();
  const disclosure = useRef(null);
  const current =
    languages.find(({ code }) => code === i18n.resolvedLanguage) ??
    languages.find(({ code }) => code === defaultLanguage);
  // Match the generated HTML initially, then preserve the browser's URL.
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
    const closeOutside = (event) => {
      if (disclosure.current && !disclosure.current.contains(event.target)) {
        disclosure.current.open = false;
      }
    };
    update();
    window.addEventListener("hashchange", update);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      window.removeEventListener("hashchange", update);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <nav className={className} aria-label={t("navigation.language")}>
      <details
        ref={disclosure}
        className="group relative w-fit"
        onKeyDown={(event) => {
          if (event.key === "Escape" && disclosure.current.open) {
            event.preventDefault();
            event.stopPropagation();
            disclosure.current.open = false;
            disclosure.current.querySelector("summary").focus();
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.open = false;
          }
        }}
      >
        <summary
          className="flex min-h-11 cursor-pointer list-none items-center gap-2 bg-transparent p-0 text-[0.72rem] font-medium text-current transition-colors hover:text-gold motion-reduce:transition-none [&::-webkit-details-marker]:hidden"
          aria-label={`${t("navigation.language")}: ${current.label}`}
        >
          <span className="text-base leading-none" aria-hidden="true">
            {current.flag}
          </span>
          <span>{current.code.toUpperCase()}</span>
          <svg
            className="size-3 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <ul
          className={`absolute z-30 w-44 rounded-xl border border-[#e8e5df] bg-white p-1.5 text-dark shadow-lg ${placement === "top" ? "bottom-full left-0 mb-2" : `${align === "right" ? "right-0" : "left-0 desktop:right-0 desktop:left-auto"} top-full mt-2`}`}
        >
          {languages.map(({ code, label, flag }) => (
            <li key={code}>
              <a
                className={`flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2 text-[0.78rem] hover:bg-cream focus-visible:outline-offset-0 ${current.code === code ? "bg-cream font-semibold text-[#715322]" : "text-dark"}`}
                href={`${localizedPath(location.pathname, code)}${location.search}${location.hash}`}
                lang={code}
                hrefLang={code}
                aria-current={current.code === code ? "true" : undefined}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {flag}
                </span>
                <span>{label}</span>
                {current.code === code && (
                  <span className="ml-auto text-gold" aria-hidden="true">
                    ✓
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
