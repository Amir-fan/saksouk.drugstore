# Premium Pharmaceutical Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the shared catalogue and medicine intelligence UI into a calm, premium pharmaceutical experience while guaranteeing that every supplied product image is fully visible.

**Architecture:** Keep the existing React catalogue, product data, URLs, translations, and WhatsApp behavior intact. Add a small static UI-contract regression suite, then update the shared catalogue markup and global component styles so one implementation serves category, brand, product-detail, RTL, and responsive views.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS, Framer Motion, Lucide React, Python `unittest`

**Spec:** `docs/superpowers/specs/2026-11-07-premium-pharmaceutical-intelligence-design.md`

## Global Constraints

- Do not change catalogue data, product classification, translations unrelated to this UI, URLs, or WhatsApp behavior.
- Add no dependency and do not introduce a new design framework.
- Use ivory paper surfaces, ink typography, cobalt and trust-green accents, shallow neutral shadows, and 14–18px primary radii.
- Reserve luminous gradient/aura treatment for Saksouk Intelligence; ordinary controls stay quiet and solid.
- Product imagery must use an isolated, bounded `object-fit: contain` canvas in cards, gallery stages, and thumbnails.
- Support English, Arabic/RTL, desktop, tablet, mobile, keyboard use, focus visibility, and reduced motion.
- Do not commit or push unless the user explicitly requests it; use review checkpoints instead.

## Review Focus

- Very tall and very wide source images must remain entirely inside their stage at desktop and mobile sizes.
- Missing product images must retain an intentional placeholder without inheriting image-only dimensions.
- Long Arabic and English product names must wrap without covering actions or overflowing cards.
- The intelligence panel must remain usable when data is verified, catalogue-sourced, or still pending.
- Keyboard focus, Escape close, backdrop close, reduced motion, and RTL direction must continue working.

---

### Task 1: Catalogue visual-contract regression tests

**Files:**
- Create: `tests/test_catalogue_ui_contract.py`
- Test: `tests/test_catalogue_ui_contract.py`

**Interfaces:**
- Consumes: CSS class names and catalogue markup in `app/globals.css` and `components/expanded-pages.tsx`.
- Produces: static regression tests for bounded image canvases, intelligence naming/iconography, and reduced-motion-safe styling.

- [ ] **Step 1: Write failing tests for the approved contracts**

  Add focused assertions that card and gallery images use absolute bounded canvases; `Saksouk Intelligence` replaces `Saksouk AI Guide`; Bot/Sparkles are absent from medicine intelligence controls; and the obsolete orbit animation is absent.

- [ ] **Step 2: Run the tests to verify the new assertions fail**

  Run: `python -m unittest tests.test_catalogue_ui_contract -v`

  Expected: FAIL on the current percentage-sized images, AI copy/icons, and orbit animation.

- [ ] **Step 3: Review checkpoint**

  Confirm failures are limited to the intended catalogue presentation contracts.

### Task 2: Bounded image stages and premium product cards

**Files:**
- Modify: `components/expanded-pages.tsx:284-323`
- Modify: `app/globals.css:658-720`
- Test: `tests/test_catalogue_ui_contract.py`

**Interfaces:**
- Consumes: existing `CatalogProduct`, `ProductKind`, `copy`, catalogue URL, and WhatsApp inquiry URL.
- Produces: `.product-media-canvas`, `.product-card-identity`, `.product-card-actions`, and bounded `.product-gallery-stage` behavior shared by all categories.

- [ ] **Step 1: Add the isolated image-canvas markup**

  Wrap supplied card images in `.product-media-canvas`; keep placeholders separate; preserve anchors, click handlers, alt text, lazy loading, and product URLs.

- [ ] **Step 2: Implement bounded image CSS**

  Position card and detail images inside fixed inset canvases with `width`/`height` based on the parent stage and `object-fit: contain`; remove percentage grid sizing and category overrides that reintroduce intrinsic-size overflow.

- [ ] **Step 3: Refine card information hierarchy**

  Give the company/category row, product title, concise description, intelligence control, and inquiry link distinct roles with consistent spacing, shallow depth, restrained hover, and no oversized pills.

- [ ] **Step 4: Run the UI-contract tests**

  Run: `python -m unittest tests.test_catalogue_ui_contract -v`

  Expected: image containment assertions PASS; intelligence assertions may remain FAIL until Task 4.

- [ ] **Step 5: Runtime geometry check**

  In the browser, compare every rendered `.product-card-image img` and `.product-gallery-stage img` rectangle with its parent at desktop and mobile widths; expected: every image rectangle stays within its parent.

### Task 3: Catalogue navigation, filters, and brand surfaces

**Files:**
- Modify: `app/globals.css:595-657`
- Modify: `app/globals.css:817-875`

**Interfaces:**
- Consumes: existing `CatalogueFilter`, brand directory markup, active-filter chips, and pagination.
- Produces: a shared premium control surface using the approved paper, border, ink, cobalt, and green tokens.

- [ ] **Step 1: Add catalogue-specific design tokens**

  Add the approved paper, ink, secondary text, border, cobalt, deep cobalt, trust green, radius, and shadow tokens under `:root` without changing established variable names used outside the catalogue.

- [ ] **Step 2: Restyle brand and filter surfaces**

  Replace the saturated toolbar gradient and inflated controls with paper surfaces, clear labels, compact icon wells, stronger focus states, and shallow neutral elevation.

- [ ] **Step 3: Align responsive behavior**

  Keep three/two/one product columns at desktop/tablet/mobile; keep brand and filter controls usable without horizontal overflow; preserve RTL alignment.

- [ ] **Step 4: Review checkpoint**

  Inspect medicine, cosmetics, and supplements category and brand views at 1440px, 768px, and 390px widths.

### Task 4: Saksouk Intelligence trigger and panel

**Files:**
- Modify: `components/expanded-pages.tsx:4-31`
- Modify: `components/expanded-pages.tsx:156-220`
- Modify: `components/expanded-pages.tsx:284-320`
- Modify: `components/expanded-pages.tsx:345-357`
- Modify: `app/globals.css:679-682`
- Modify: `app/globals.css:721-787`
- Test: `tests/test_catalogue_ui_contract.py`

**Interfaces:**
- Consumes: existing `MedicineGuide`, `guideText`, modal state, source links, verification statuses, Escape/backdrop close behavior, and bilingual copy.
- Produces: a single `ScanSearch`-style intelligence mark, `Saksouk Intelligence` / `ذكاء سكسوك الدوائي` labels, and a calm evidence panel with verification, facts, source, and notice regions.

- [ ] **Step 1: Replace novelty iconography and naming**

  Replace Bot/Sparkles intelligence controls with one `ScanSearch` mark plus a quiet status dot; change English and Arabic labels to the approved intelligence names.

- [ ] **Step 2: Restructure the panel header**

  Use a dark ink header rail, contained cobalt/green luminous lens, product title, verification-oriented subtitle, and accessible close control; remove decorative orbiting dots.

- [ ] **Step 3: Restyle evidence and notice regions**

  Use ivory/paper cards, restrained status colors, consistent fact rows, a distinct source strip, and a quiet health notice while preserving all existing text and source behavior.

- [ ] **Step 4: Preserve interaction and accessibility**

  Retain dialog semantics, focus-on-open, Escape close, backdrop close, readable mobile sheet behavior, RTL, and reduced-motion-safe transitions.

- [ ] **Step 5: Run the UI-contract tests**

  Run: `python -m unittest tests.test_catalogue_ui_contract -v`

  Expected: all tests PASS.

### Task 5: Product-detail and site-wide catalogue polish

**Files:**
- Modify: `app/globals.css:684-720`
- Modify: `app/globals.css:789-875`

**Interfaces:**
- Consumes: existing breadcrumb, gallery thumbnails, brand chip, fact grid, related products, empty/loading states, and pagination markup.
- Produces: one cohesive visual language across card, detail, related, empty, loading, and pagination states.

- [ ] **Step 1: Refine product-detail hierarchy**

  Harmonize the gallery stage, thumbnails, brand chip, title, fact rows, primary WhatsApp action, intelligence action, and related-product heading with the shared component tokens.

- [ ] **Step 2: Refine supporting states**

  Apply the same quiet surfaces and restrained icon treatments to loading, no-results, empty, active-filter, and pagination states.

- [ ] **Step 3: Add reduced-motion guards**

  Ensure catalogue and intelligence hover/entry effects do not depend on continuous animation and are suppressed under `prefers-reduced-motion: reduce`.

- [ ] **Step 4: Review checkpoint**

  Confirm no ordinary card/control uses the intelligence-only aura treatment and no UI controls visually resemble novelty AI widgets.

### Task 6: Verification and final diff review

**Files:**
- Verify: `components/expanded-pages.tsx`
- Verify: `app/globals.css`
- Verify: `tests/test_catalogue_ui_contract.py`

**Interfaces:**
- Consumes: completed implementation.
- Produces: evidence that the redesign builds, lints, passes regressions, and behaves correctly in representative browser views.

- [ ] **Step 1: Run targeted regressions**

  Run: `python -m unittest tests.test_catalogue_ui_contract tests.test_product_catalogue_images -v`

  Expected: PASS.

- [ ] **Step 2: Run repository checks**

  Run: `npm run lint`

  Expected: exit code 0.

  Run: `npm run build`

  Expected: exit code 0.

- [ ] **Step 3: Perform browser verification**

  Inspect medicine, cosmetics, supplements, a brand view, a product detail, and both verified/pending intelligence panels in English and Arabic at desktop and mobile widths. Confirm full image visibility, readable wrapping, keyboard focus, close behavior, RTL alignment, and no overflow.

- [ ] **Step 4: Review the final diff**

  Run: `git diff --check` and `git diff --stat`.

  Expected: no whitespace errors and no unrelated product-data/content changes introduced by this redesign.
