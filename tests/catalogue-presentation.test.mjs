import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

test('product imagery uses contain framing with a responsive safe inset', () => {
  assert.match(
    css,
    /\.product-image-canvas\s*\{[^}]*padding:clamp\(18px,2\.4vw,26px\)/s,
  );
  assert.match(
    css,
    /\.product-card-image img,[^{]*\{[^}]*object-fit:contain/s,
  );
  assert.match(
    css,
    /\.product-card-image img,[^{]*\{[^}]*width:auto;[^}]*height:auto;[^}]*max-width:100%;[^}]*max-height:100%/s,
    'portrait product photos must size from their intrinsic aspect ratio instead of overflowing the card frame',
  );
  assert.match(
    css,
    /\.product-gallery-stage img\s*\{[^}]*object-fit:contain/s,
  );
  assert.match(
    css,
    /\.product-gallery-thumbs button\s*\{[^}]*padding:10px/s,
  );
});

test('product-card hover motion does not scale imagery into its clipping edge', () => {
  const hoverRule = css.match(
    /\.catalogue-product-card:hover \.product-card-image img,[^{]*\{([^}]*)\}/s,
  );
  assert.ok(hoverRule, 'product image hover rule should exist');
  assert.doesNotMatch(hoverRule[1], /scale\(/);
});
