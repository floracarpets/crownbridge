import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Brand from "./Brand.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { sections } from "../content/site.js";

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 73.75rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const menu = dialog.current;
    const previousOverflow = document.body.style.overflow;
    menu.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      menu.close();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8e5df] bg-white">
      <div className="mx-auto flex min-h-20 w-[calc(100%-32px)] max-w-[1280px] items-center justify-between gap-2 tablet:w-[calc(100%-64px)] desktop:min-h-[94px] desktop:w-[calc(100%-96px)] desktop:gap-[30px]">
        <div className="min-w-0 max-sm:[&>a]:gap-1.5 max-sm:[&>a>svg]:w-7 max-sm:[&>a>span]:text-[0.85rem]">
          <Brand />
        </div>
        <nav
          className="ml-auto hidden items-center gap-[21px] desktop:flex"
          aria-label={t("navigation.primary")}
        >
          {sections.map((id) => (
            <a
              className="flex min-h-11 items-center text-[0.72rem] whitespace-nowrap hover:text-[#715322]"
              key={id}
              href={`#${id}`}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-4">
          <LanguageSwitcher align="right" />
          <button
            type="button"
            className="flex min-h-11 shrink-0 items-center bg-transparent p-0 text-dark hover:text-gold desktop:hidden"
            aria-label={t("navigation.menu")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-cream p-0 text-dark transition-transform duration-300 ease-out backdrop:bg-dark/30 open:translate-x-0 starting:open:-translate-x-full motion-reduce:transition-none"
        aria-label={t("navigation.primary")}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = [
            ...event.currentTarget.querySelectorAll(
              "a[href], button:not([disabled]), summary",
            ),
          ].filter((element) => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClose={(event) => {
          if (!event.currentTarget.open) setOpen(false);
        }}
      >
        <div className="flex min-h-full flex-col">
          <div className="border-b border-[#e8e5df] bg-white">
            <div className="mx-auto flex min-h-20 w-[calc(100%-32px)] max-w-[1280px] items-center justify-between gap-2 tablet:w-[calc(100%-64px)]">
              <div
                className="min-w-0 max-sm:[&>a]:gap-1.5 max-sm:[&>a>svg]:w-7 max-sm:[&>a>span]:text-[0.85rem]"
                onClick={() => setOpen(false)}
              >
                <Brand />
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <LanguageSwitcher align="right" />
                <button
                  type="button"
                  autoFocus
                  className="flex min-h-11 shrink-0 items-center bg-transparent p-0 text-dark hover:text-gold"
                  aria-label={t("navigation.close")}
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="size-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 6 12 12M18 6 6 18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav
            className="mx-auto flex w-[calc(100%-40px)] max-w-[640px] flex-1 flex-col justify-center gap-1 py-8 tablet:gap-2"
            aria-label={t("navigation.primary")}
          >
            {sections.map((id, index) => (
              <a
                className="flex min-h-14 items-center justify-between gap-4 rounded-lg px-4 py-3 font-display text-[clamp(1.5rem,4vw,2.25rem)] hover:bg-white hover:text-gold focus-visible:outline-offset-0"
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
              >
                <span>{t(`nav.${id}`)}</span>
                <span
                  className="font-sans text-[0.7rem] tracking-wider text-gold"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </dialog>
    </header>
  );
}
