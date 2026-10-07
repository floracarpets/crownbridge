import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { company, services } from "../content/site.js";

export function enquiryMailto(email, fields) {
  const body = `${fields.name}\n${fields.email}\n${fields.phone || ""}\n\n${fields.message}`;
  return `mailto:${email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const { t } = useTranslation();
  const [prepared, setPrepared] = useState(false);
  function submit(event) {
    event.preventDefault();
    if (!company.email) return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    window.location.href = enquiryMailto(company.email, fields);
    setPrepared(true);
  }
  return (
    <form
      className="border border-[#e8e3da] bg-white p-5 sm:p-[26px] tablet:p-9 [&_label]:mb-5 [&_label]:block [&_label]:text-[0.72rem] [&_button]:w-full"
      onSubmit={submit}
    >
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-[22px]">
        <label>
          {t("contact.name")}
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          {t("contact.email")}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-[22px]">
        <label>
          {t("contact.phone")}
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label>
          {t("contact.interest")}
          <select name="subject">
            {services.map((id) => (
              <option key={id} value={t(`services.${id}.title`)}>
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
          placeholder={t("contact.placeholder")}
        />
      </label>
      <p className="text-[0.68rem] text-muted" id="email-note">
        {t(company.email ? "contact.emailNote" : "contact.pendingNote")}
      </p>
      <button
        className="inline-flex min-h-[54px] items-center justify-between gap-7 border border-transparent px-[25px] py-4 text-[0.82rem] font-semibold transition-colors duration-200 motion-reduce:transition-none bg-[#bd965a] text-[#161611] hover:bg-[#d0ad76]"
        type="submit"
        disabled={!company.email}
        aria-describedby="email-note"
      >
        {t("contact.send")} <span aria-hidden="true">↗</span>
      </button>
      {prepared && <p role="status">{t("contact.prepared")}</p>}
    </form>
  );
}
