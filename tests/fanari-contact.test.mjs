import assert from 'node:assert/strict';
import test from 'node:test';

import { FANARI_CONTACT, getFanariCopy } from '../lib/fanari-contact.ts';

function assertCompleteCopy(copy, language) {
  const expectedKeys = [
    'creditLead',
    'creditAction',
    'dialogTitle',
    'tagline',
    'description',
    'websiteLabel',
    'phoneLabel',
    'emailLabel',
    'closeLabel',
  ];
  assert.deepEqual(Object.keys(copy).sort(), expectedKeys.sort());
  for (const [key, value] of Object.entries(copy)) {
    assert.equal(typeof value, 'string', `${language}.${key} must be text`);
    assert.ok(value.trim(), `${language}.${key} must not be blank`);
  }
}

test('Fanari contact actions use the supplied destinations', () => {
  assert.deepEqual(FANARI_CONTACT, {
    website: 'https://fanarilabs.com',
    phoneDisplay: '+90 537 929 51 63',
    phoneHref: 'tel:+905379295163',
    email: 'fanarilabs@gmail.com',
    emailHref: 'mailto:fanarilabs@gmail.com',
  });
});

test('Fanari footer and dialog copy is complete in both languages', () => {
  assertCompleteCopy(getFanariCopy('en'), 'en');
  assertCompleteCopy(getFanariCopy('ar'), 'ar');
  assert.equal(getFanariCopy('en').creditLead, 'Developed by');
  assert.equal(getFanariCopy('ar').creditLead, 'تطوير');
});
