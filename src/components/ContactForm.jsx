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
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
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
      <div className="form-row">
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
      <p className="form-note" id="email-note">
        {t(company.email ? "contact.emailNote" : "contact.pendingNote")}
      </p>
      <button
        className="button button-gold"
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
