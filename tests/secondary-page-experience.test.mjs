import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getAboutMilestones,
  getProductExperience,
  getWorkPrinciples,
} from '../lib/secondary-page-experience.ts';

function assertNoBlankValues(value, path = 'value') {
  if (Array.isArray(value)) {
    assert.ok(value.length > 0, `${path} must not be empty`);
    value.forEach((item, index) => assertNoBlankValues(item, `${path}[${index}]`));
    return;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => assertNoBlankValues(item, `${path}.${key}`));
    return;
  }

  if (typeof value === 'string') assert.ok(value.trim(), `${path} must not be blank`);
}

test('product experiences expose complete localized trust and reach information', () => {
  for (const lang of ['en', 'ar']) {
    for (const kind of ['cosmetics', 'supplements']) {
      const experience = getProductExperience(kind, lang);
      assert.equal(experience.points.length, 4);
      assert.equal(experience.metrics.length, 3);
      assert.equal(experience.kind, kind);
      assertNoBlankValues(experience, `${lang}.${kind}`);
    }
  }
});

test('about milestones remain chronological and fully localized', () => {
  for (const lang of ['en', 'ar']) {
    const milestones = getAboutMilestones(lang);
    assert.deepEqual(milestones.map((milestone) => milestone.year), ['1950', '2000', lang === 'ar' ? 'اليوم' : 'Today']);
    assertNoBlankValues(milestones, `${lang}.aboutMilestones`);
  }
});

test('work principles provide three localized reasons to join', () => {
  for (const lang of ['en', 'ar']) {
    const principles = getWorkPrinciples(lang);
    assert.equal(principles.length, 3);
    assertNoBlankValues(principles, `${lang}.workPrinciples`);
  }
});
