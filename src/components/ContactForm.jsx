import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { company, services } from "../content/site.js";

export default function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle");
  const submitting = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    submitting.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        signal: controller.signal,
      });
      const result = await response.json();
      if (response.ok && result.ok === true) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus(response.status === 429 ? "rateLimited" : "error");
      }
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }
  return (
    <form
      className="border border-[#e8e3da] bg-white p-5 sm:p-[26px] tablet:p-9 [&_label]:mb-5 [&_label]:block [&_label]:text-ui [&_button]:w-full"
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-[22px]">
        <label>
          {t("contact.name")}
          <input name="name" autoComplete="name" required maxLength={120} readOnly={status === "sending"} />
        </label>
        <label>
          {t("contact.email")}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            readOnly={status === "sending"}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-[22px]">
        <label>
          {t("contact.phone")}
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} readOnly={status === "sending"} />
        </label>
        <label>
          {t("contact.interest")}
          <select name="subject" disabled={status === "sending"}>
            {services.map((id) => (
              <option key={id} value={id}>
                {t(`services.${id}.title`)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {t("contact.message")}
        <textarea
          name="message"
          rows={4}
          required
          maxLength={3000}
          readOnly={status === "sending"}
          placeholder={t("contact.placeholder")}
        />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
      </div>
      <p className="text-caption text-muted" id="email-note">
        {t("contact.emailNote")}
      </p>
      <button
        className="inline-flex min-h-[54px] items-center justify-between gap-7 border border-transparent px-[25px] py-4 text-body font-semibold transition-colors duration-200 motion-reduce:transition-none bg-[#bd965a] text-[#161611] hover:bg-[#d0ad76]"
        type="submit"
        disabled={status === "sending"}
        aria-describedby="email-note"
      >
        {t(status === "sending" ? "contact.sending" : "contact.send")} <span aria-hidden="true">↗</span>
      </button>
      <p role="status" aria-live="polite" aria-atomic="true" className="mt-4 mb-0 text-ui">
        {status !== "idle" && t(`contact.${status}`)}
      </p>
      {(status === "error" || status === "rateLimited") && company.email && (
        <a className="inline-flex min-h-11 items-center text-ui text-gold underline" href={`mailto:${company.email}`}>
          {t("contact.emailInstead")}
        </a>
      )}
    </form>
  );
}
