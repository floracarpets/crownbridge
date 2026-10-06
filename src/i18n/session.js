import { defaultLanguage, languages, languageFromPath, localizedPath } from './locales.js';

const storageKey = 'crownbridge.language';

export function initializeLanguage(browser) {
  const { pathname, search, hash } = browser.location;
  let language = languageFromPath(pathname);

  if (pathname === '/') {
    try {
      const saved = browser.sessionStorage.getItem(storageKey);
      language = languages.some(({ code }) => code === saved) ? saved : defaultLanguage;
    } catch {
      // Language URLs still work when the browser blocks storage.
    }
    browser.history.replaceState(null, '', `${localizedPath(pathname, language)}${search}${hash}`);
  }

  try {
    browser.sessionStorage.setItem(storageKey, language);
  } catch {
    // Remembering a preference is optional; rendering must still work.
  }

  return language;
}
