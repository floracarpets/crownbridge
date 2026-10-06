import { useTranslation } from 'react-i18next';
import { languages, localizedPath } from '../i18n/locales.js';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation('common');
  const { pathname, search, hash } = window.location;

  return (
    <nav className="language-switcher" aria-label={t('navigation.language')}>
      {languages.map(({ code, label }) => (
        <a
          key={code}
          href={`${localizedPath(pathname, code)}${search}${hash}`}
          lang={code}
          hrefLang={code}
          aria-current={i18n.resolvedLanguage === code ? 'true' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
