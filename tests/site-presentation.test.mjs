import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { siteContent } from '../content/site.ts';

test('footer addresses list Damascus above Idlib in both languages', () => {
  assert.equal(
    siteContent.en.footer.address,
    'Syria, Damascus, Dummar Project\nSyria, Idlib, Qusour Street\nNear Carlton Hotel',
  );
  assert.equal(
    siteContent.ar.footer.address,
    'سوريا، دمشق، مشروع دمر\nسوريا، إدلب، شارع القصور\nقرب فندق كارلتون',
  );
});
test('trusted partner and social metadata uses supplied assets and exact social links', async () => {
  const moduleUrl = new URL('../lib/site-presentation.ts', import.meta.url);
  assert.ok(
    existsSync(fileURLToPath(moduleUrl)),
    'site presentation metadata must exist',
  );

  const { SOCIAL_CHANNELS, TRUSTED_PARTNER_LOGOS } = await import(
    moduleUrl.href
  );
  assert.ok(
    TRUSTED_PARTNER_LOGOS.some(
      (partner) =>
        partner.name === 'Domina Pharmaceuticals' &&
        partner.logo === '/images/brands/domina.webp',
    ),
  );
  assert.ok(
    TRUSTED_PARTNER_LOGOS.some(
      (partner) =>
        partner.name === 'Golden Med Pharma' &&
        partner.logo === '/images/brands/golden-med-pharma.webp',
    ),
  );
  assert.equal(
    new Set(TRUSTED_PARTNER_LOGOS.map((partner) => partner.logo)).size,
    TRUSTED_PARTNER_LOGOS.length,
  );
  assert.deepEqual(SOCIAL_CHANNELS, [
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1ACkatqqrW/',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/saksok_drugstore?dmpr=MWszMzZkcm82eGVqdw==',
    },
    { id: 'linkedin', label: 'LinkedIn', href: null },
    { id: 'youtube', label: 'YouTube', href: null },
  ]);
});
