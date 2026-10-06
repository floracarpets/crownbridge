import test from 'node:test';
import assert from 'node:assert/strict';
import { initializeLanguage } from '../src/i18n/session.js';

function browserAt(path, saved = null) {
  const values = new Map(saved === null ? [] : [['crownbridge.language', saved]]);
  const browser = {
    location: new URL(path, 'https://example.test'),
    sessionStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
    history: {
      replaceState: (_state, _title, url) => {
        browser.location = new URL(url, browser.location);
      },
    },
  };
  return browser;
}

test('root restores the session preference before rendering and retains query and anchor', () => {
  const browser = browserAt('/?campaign=summer#main-content', 'tr');
  assert.equal(initializeLanguage(browser), 'tr');
  assert.equal(browser.location.pathname, '/tr/');
  assert.equal(browser.location.search, '?campaign=summer');
  assert.equal(browser.location.hash, '#main-content');
});

test('explicit language URLs take priority and persist across refresh and root visits', () => {
  const browser = browserAt('/fr/', 'tr');
  assert.equal(initializeLanguage(browser), 'fr');
  assert.equal(browser.sessionStorage.getItem('crownbridge.language'), 'fr');
  assert.equal(initializeLanguage(browser), 'fr');
  browser.location = new URL('/', browser.location);
  assert.equal(initializeLanguage(browser), 'fr');
  assert.equal(browser.location.pathname, '/fr/');
});

test('missing or unsupported session values fall back to English', () => {
  for (const saved of [null, 'unknown', '']) {
    const browser = browserAt('/', saved);
    assert.equal(initializeLanguage(browser), 'en');
    assert.equal(browser.location.pathname, '/en/');
  }
});

test('blocked session storage does not prevent language loading', () => {
  for (const path of ['/', '/tr/']) {
    const browser = browserAt(path);
    Object.defineProperty(browser, 'sessionStorage', {
      get() { throw new Error('Storage blocked'); },
    });
    assert.equal(initializeLanguage(browser), path === '/' ? 'en' : 'tr');
  }
});
