import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';

export default function App() {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')
      .setAttribute('content', t('meta.description'));
  }, [i18n.resolvedLanguage, t]);

  return (
    <>
      <a className="skip-link" href="#main-content">{t('navigation.skipToContent')}</a>
      <header className="site-header">
        <a className="brand" href={`/${i18n.resolvedLanguage}/`} aria-label={t('navigation.home')}>
          Crownbridge
        </a>
        <LanguageSwitcher />
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="intro" aria-labelledby="home-title">
          <p className="eyebrow">{t('home.eyebrow')}</p>
          <h1 id="home-title">{t('home.title')}</h1>
          <p className="description">{t('home.description')}</p>
        </section>
      </main>
    </>
  );
}
