import assert from 'node:assert/strict';
import test from 'node:test';

import { expandedPages } from '../content/pages.ts';

function compareTranslationShape(english, arabic, path = 'expandedPages') {
  assert.equal(Array.isArray(arabic), Array.isArray(english), `${path} must use the same collection type`);

  if (Array.isArray(english)) {
    assert.equal(arabic.length, english.length, `${path} must have the same item count`);
    english.forEach((value, index) => compareTranslationShape(value, arabic[index], `${path}[${index}]`));
    return;
  }

  if (english && typeof english === 'object') {
    assert.ok(arabic && typeof arabic === 'object', `${path} must exist in both languages`);
    const englishKeys = Object.keys(english).sort();
    const arabicKeys = Object.keys(arabic).sort();
    assert.deepEqual(arabicKeys, englishKeys, `${path} must have matching keys`);
    englishKeys.forEach((key) => compareTranslationShape(english[key], arabic[key], `${path}.${key}`));
    return;
  }

  if (typeof english === 'string') {
    assert.equal(typeof arabic, 'string', `${path} must be translated`);
    assert.ok(english.trim(), `${path} English text must not be empty`);
    assert.ok(arabic.trim(), `${path} Arabic text must not be empty`);
  }
}

test('English and Arabic page content keep the same complete structure', () => {
  compareTranslationShape(expandedPages.en, expandedPages.ar);
});
