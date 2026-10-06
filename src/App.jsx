import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header.jsx";
import Brand from "./components/Brand.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import ContactForm from "./components/ContactForm.jsx";
import { company, sections, services, properties } from "./content/site.js";
import { formattingLocale } from "./i18n/locales.js";

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-description">{text}</p>}
    </div>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const number = new Intl.NumberFormat(formattingLocale(i18n.resolvedLanguage));
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
    document.title = t("meta.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("meta.description"));
  }, [i18n.resolvedLanguage, t]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("navigation.skipToContent")}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="home" aria-labelledby="home-title">
          <img
            className="hero-image"
            src="/images/skyline.jpg"
            alt=""
            width="1920"
            height="1280"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content container">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 id="home-title">
              {t("hero.title")}
              <em>{t("hero.accent")}</em>
            </h1>
            <p className="hero-description">{t("hero.description")}</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#properties">
                {t("hero.explore")} <span aria-hidden="true">↗</span>
              </a>
              <a className="hero-secondary" href="#contact">
                {t("hero.talk")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <a className="hero-scroll" href="#about">
            <span aria-hidden="true">↓</span>
            {t("hero.scroll")}
          </a>
          <span className="hero-caption">{t("hero.caption")}</span>
        </section>
        <div className="intro-strip">
          <div className="container intro-strip-inner">
            <span>{t("intro.title")}</span>
            <p>{t("intro.text")}</p>
            <a href="#contact">
              {t("intro.link")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <section
          id="about"
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <div className="about-visual">
            <img
              src="/images/interior.jpg"
              alt={t("images.interior")}
              width="1000"
              height="667"
              loading="lazy"
            />
            <div className="image-label">
              <span className="label-line" />
              <span>{t("about.imageLabel")}</span>
            </div>
            <div className="about-stamp" aria-hidden="true">
              CB<span>REAL ESTATE</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <h2 id="about-title">
              {t("about.title")} <em>{t("about.accent")}</em>
            </h2>
            <p>{t("about.text")}</p>
            <p>{t("about.text2")}</p>
            <div className="about-values">
              <span>{t("about.value1")}</span>
              <span>{t("about.value2")}</span>
              <span>{t("about.value3")}</span>
            </div>
            <a className="text-link" href="#why">
              {t("about.link")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section
          id="services"
          className="services-section section"
          aria-labelledby="services-title"
        >
          <div className="container">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">{t("services.eyebrow")}</p>
                <h2 id="services-title">{t("services.title")}</h2>
              </div>
              <p>{t("services.description")}</p>
            </div>
            <div className="services-grid">
              {services.map((id, index) => (
                <article className="service-card" key={id}>
                  <div className="service-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <svg
                      viewBox="0 0 48 48"
                      width="42"
                      height="42"
                      aria-hidden="true"
                    >
                      <path
                        d={
                          [
                            "M8 24 24 10l16 14M13 21v19h22V21M21 40V28h7v12",
                            "M10 38h28M14 38V16h20v22M20 22h8m-8 7h8M24 8v8",
                            "M9 25h30M14 25v15h20V25M24 8l15 17H9L24 8Z",
                            "M8 40h32M12 40V22h9v18m6 0V9h9v31M15 27h3m12-11h3m-3 7h3",
                          ][index]
                        }
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>{t(`services.${id}.title`)}</h3>
                  <p>{t(`services.${id}.text`)}</p>
                  <a className="text-link" href="#contact">
                    {t("services.link")} <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="properties"
          className="section container"
          aria-labelledby="properties-title"
        >
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">{t("properties.eyebrow")}</p>
              <h2 id="properties-title">{t("properties.title")}</h2>
            </div>
            <a className="text-link" href="#contact">
              {t("properties.link")} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="property-notice">{t("properties.notice")}</p>
          <div className="properties-grid">
            {properties.map((property) => (
              <article className="property-card" key={property.id}>
                <div className="property-image">
                  <img
                    src={property.image}
                    alt={t(`properties.${property.id}.alt`)}
                    width="1000"
                    height="667"
                    loading="lazy"
                  />
                  <span className="property-tag">
                    {t("properties.illustration")}
                  </span>
                </div>
                <div className="property-copy">
                  <p className="eyebrow">
                    {t(`properties.${property.id}.category`)}
                  </p>
                  <h3>{t(`properties.${property.id}.title`)}</h3>
                  <p>{t(`properties.${property.id}.text`)}</p>
                  <details>
                    <summary>
                      {t("properties.details")}{" "}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <dl>
                      <div>
                        <dt>{t("properties.type")}</dt>
                        <dd>{t(`properties.types.${property.type}`)}</dd>
                      </div>
                      {property.bedrooms !== null && (
                        <>
                          <div>
                            <dt>{t("properties.bedrooms")}</dt>
                            <dd>{number.format(property.bedrooms)}</dd>
                          </div>
                          <div>
                            <dt>{t("properties.area")}</dt>
                            <dd>{number.format(property.area)} m²</dd>
                          </div>
                        </>
                      )}
                      <div>
                        <dt>{t("properties.status")}</dt>
                        <dd>{t("properties.exampleOnly")}</dd>
                      </div>
                    </dl>
                    <a className="text-link" href="#contact">
                      {t("properties.enquire")}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          id="why"
          className="why-section section"
          aria-labelledby="why-title"
        >
          <div className="container why-layout">
            <div>
              <p className="eyebrow">{t("why.eyebrow")}</p>
              <h2 id="why-title">
                {t("why.title")} <em>{t("why.accent")}</em>
              </h2>
              <p className="section-description">{t("why.description")}</p>
              <a className="button button-outline" href="#contact">
                {t("why.link")} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="why-list">
              {["personal", "clarity", "communication"].map((id, index) => (
                <article key={id}>
                  <span className="why-number">0{index + 1}</span>
                  <div>
                    <h3>{t(`why.${id}.title`)}</h3>
                    <p>{t(`why.${id}.text`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="process"
          className="section container process-section"
          aria-labelledby="process-title"
        >
          <SectionHeading
            eyebrow={t("process.eyebrow")}
            title={<span id="process-title">{t("process.title")}</span>}
          />
          <div className="process-grid">
            {["listen", "explore", "move"].map((id, index) => (
              <article key={id}>
                <span>0{index + 1}</span>
                <h3>{t(`process.${id}.title`)}</h3>
                <p>{t(`process.${id}.text`)}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="contact"
          className="contact-section section"
          aria-labelledby="contact-title"
        >
          <div className="container contact-layout">
            <div>
              <p className="eyebrow">{t("contact.eyebrow")}</p>
              <h2 id="contact-title">
                {t("contact.title")} <em>{t("contact.accent")}</em>
              </h2>
              <p>{t("contact.description")}</p>
              <dl className="contact-details">
                <div>
                  <dt>{t("contact.emailLabel")}</dt>
                  <dd>
                    {company.email ? (
                      <a href={`mailto:${company.email}`}>{company.email}</a>
                    ) : (
                      t("contact.emailPending")
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{t("contact.phoneLabel")}</dt>
                  <dd>
                    {company.phone ? (
                      <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
                        {company.phone}
                      </a>
                    ) : (
                      t("contact.phonePending")
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{t("contact.address")}</dt>
                  <dd>{company.address || t("contact.addressPending")}</dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
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
    </>
  );
}
