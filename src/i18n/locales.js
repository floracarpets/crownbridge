export const defaultLanguage = "en";

// To add a language: add its entry here, add locales/<code>/common.json,
// and register the JSON in index.js. Existing components need no changes.
// Formatting locales affect display conventions, not a property's currency.
export const languages = [
  { code: "en", label: "English", flag: "🇬🇧", locale: "en-GB" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", locale: "tr-TR" },
  { code: "fr", label: "Français", flag: "🇫🇷", locale: "fr-FR" },
];

export function languageFromPath(pathname) {
  const code = pathname.split("/")[1];
  return languages.some((language) => language.code === code)
    ? code
    : defaultLanguage;
}

export function localizedPath(pathname, language) {
  const target = languages.some(({ code }) => code === language)
    ? language
    : defaultLanguage;
  const segments = pathname.split("/");
  if (languages.some(({ code }) => code === segments[1])) segments.splice(1, 1);
  return `/${target}${segments.join("/") || "/"}`;
}

export function formattingLocale(language) {
  return (
    languages.find(({ code }) => code === language)?.locale ??
    languages.find(({ code }) => code === defaultLanguage).locale
  );
}
