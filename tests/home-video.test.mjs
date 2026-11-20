import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const component = await readFile(
  new URL('../components/saksouk-site.tsx', import.meta.url),
  'utf8',
);
const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

test('homepage pharmacy film is localized, accessible and placed after the company story', () => {
  assert.match(component, /function PharmacyFilm\(\)/);
  assert.match(component, /Where products meet people/);
  assert.match(component, /حيث تلتقي المنتجات بالناس/);
  assert.match(component, /<video[^>]*autoPlay[^>]*muted[^>]*loop[^>]*playsInline[^>]*controls/s);
  assert.match(component, /\/media\/pharmacy-walkthrough\.mp4/);
  assert.match(component, /<About \/>\s*<PharmacyFilm \/>\s*<Metrics \/>/s);
});

test('homepage pharmacy film preserves the supplied vertical framing', () => {
  assert.match(css, /\.pharmacy-film-media\s*\{[^}]*aspect-ratio:9\s*\/\s*16/s);
  assert.match(css, /\.pharmacy-film-media video\s*\{[^}]*object-fit:contain/s);
});
