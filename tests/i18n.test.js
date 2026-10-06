import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createInstance } from 'i18next';
import { languages, languageFromPath, localizedPath, formattingLocale } from '../src/i18n/locales.js';

const resources = Object.fromEntries(await Promise.all(languages.map(async ({ code }) => [
  code,
  { common: JSON.parse(await readFile(new URL(`../src/i18n/locales/${code}/common.json`, import.meta.url), 'utf8')) },
])));

function keys(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === 'object' ? keys(child, path) : [path];
  }).sort();
}

test('every configured language has complete, nonempty translations', () => {
  const expected = keys(resources.en.common);
  for (const { code } of languages) {
    assert.deepEqual(keys(resources[code].common), expected, code);
    for (const key of expected) {
      const value = key.split('.').reduce((item, part) => item[part], resources[code].common);
      assert.equal(typeof value, 'string');
      assert.ok(value.trim(), `${code}: ${key}`);
    }
  }
});

test('language URLs preserve property paths and support default-language fallback', () => {
  assert.equal(languageFromPath('/tr/properties/123'), 'tr');
  assert.equal(languageFromPath('/fr/'), 'fr');
  assert.equal(languageFromPath('/'), 'en');
  assert.equal(languageFromPath('/unknown/'), 'en');
  assert.equal(localizedPath('/tr/properties/123', 'fr'), '/fr/properties/123');
  assert.equal(localizedPath('/en/', 'tr'), '/tr/');
  assert.equal(localizedPath('/', 'fr'), '/fr/');
  assert.equal(localizedPath('/properties/123', 'tr'), '/tr/properties/123');
  assert.equal(localizedPath('/fr/', 'unknown'), '/en/');
  assert.equal(formattingLocale('tr'), 'tr-TR');
  assert.equal(formattingLocale('unknown'), 'en-GB');
});

test('i18next uses English for missing interface translations', async () => {
  const instance = createInstance();
  await instance.init({
    lng: 'tr', fallbackLng: 'en', defaultNS: 'common',
    resources: { en: resources.en, tr: { common: {} } },
  });
  assert.equal(instance.t('home.title'), resources.en.common.home.title);
});
