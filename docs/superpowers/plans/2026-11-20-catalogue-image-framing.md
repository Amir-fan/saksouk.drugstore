# Catalogue Image Framing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restrict Advance to Supplements, add the supplied social links, and make all image-bearing product cards and detail galleries preserve complete product imagery with consistent safe framing.

**Architecture:** Keep classification and image normalization in the existing Python catalogue builder, while the React/CSS presentation layer supplies a consistent inner image stage. Add regression coverage at the generated-data and presentation-metadata boundaries so rebuilds cannot reintroduce the defects.

**Tech Stack:** Python 3/Pillow catalogue builder, React 19, TypeScript, CSS, Node test runner, unittest

**Spec:** `docs/superpowers/specs/2026-11-20-catalogue-image-framing-design.md`

## Global Constraints

- Do not add dependencies.
- Preserve unrelated user changes.
- Advance must exist only in Supplements.
- Product imagery must remain fully visible rather than cropped to fill its frame.
- Use the exact supplied Facebook and Instagram URLs.

## Review Focus

- Tightly cropped transparent pack shots retain a visible safety margin.
- Opaque portrait and landscape images remain fully visible.
- Rebuilding the catalogue does not restore Advance to Cosmetics.
- Missing product images continue to use the existing placeholder.
- Disabled social channels remain non-clickable.

---

### Task 1: Catalogue taxonomy and social metadata

**Files:**
- Modify: `tests/test_new_company_catalogues.py`
- Modify: `tests/site-presentation.test.mjs`
- Modify: `scripts/build_product_catalogue.py`
- Modify: `lib/site-presentation.ts`
- Modify: `content/catalogue-classification-notes.md`
- Generated: `public/data/products-*.json`
- Generated: `content/product-data-audit.json`

**Interfaces:**
- Consumes: existing `category_for(company_en, name)` and `SOCIAL_CHANNELS`
- Produces: all 17 Advance records in supplements; exact Facebook/Instagram link metadata

- [ ] Write failing assertions that all Advance records are supplements, none appear elsewhere, and the exact supplied social URLs are exposed.
- [ ] Run the targeted Python and Node tests and confirm the current 12/5 split and null URLs fail.
- [ ] Make `category_for` classify all Advance records as supplements and set the two social URLs.
- [ ] Rebuild the catalogues and update the classification notes.
- [ ] Run the targeted tests and confirm they pass.

### Task 2: Safe product-image normalization

**Files:**
- Modify: `tests/test_new_company_catalogues.py`
- Modify: `scripts/build_product_catalogue.py`
- Generated: `public/images/products/product-*.webp`

**Interfaces:**
- Consumes: supplied source images handled by `optimize_supplied_image`
- Produces: optimized WebP images with a consistent safety canvas and no product-edge contact

- [ ] Add a failing image-safety regression test covering representative Tanium and Advance optimized images.
- [ ] Run the focused test and confirm current tightly trimmed assets fail.
- [ ] Add bounded canvas normalization to `optimize_supplied_image`, preserving transparency and opaque artwork without cropping.
- [ ] Force stale generated assets to rebuild when the normalization version changes.
- [ ] Rebuild and run the image-safety test.

### Task 3: Unified card and gallery framing

**Files:**
- Modify: `app/globals.css`
- Test: `tests/catalogue-presentation.test.mjs`

**Interfaces:**
- Consumes: `.product-image-canvas`, `.product-gallery-canvas`, and generated product images
- Produces: consistent safe framing across cards, galleries, and thumbnails

- [ ] Add a failing source-level presentation test asserting contain-based sizing, safe padding, and no cover-based product cropping.
- [ ] Run the focused Node test and confirm it fails against the current inconsistent rules.
- [ ] Consolidate image-stage rules with responsive safe insets and neutral backgrounds.
- [ ] Run the focused test and confirm it passes.

### Task 4: Verification

**Files:**
- Review: all modified and generated files

**Interfaces:**
- Consumes: Tasks 1–3
- Produces: verified catalogue and build output

- [ ] Run all Python catalogue tests.
- [ ] Run all Node tests, lint, and production build.
- [ ] Inspect representative portrait, square, landscape, transparent, and opaque product assets.
- [ ] Review `git diff` for unintended generated or unrelated changes.
