# Catalogue and Footer Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the public company/category structure and add the requested bilingual partner, address, and social-footer content.

**Architecture:** Keep product categorization deterministic in the existing Python generator and expose presentation metadata through a small TypeScript module consumed by the shared React site shell. Tests pin both generated catalogue behavior and bilingual/footer metadata.

**Tech Stack:** Python 3, Node test runner, TypeScript, React 19, Vite, CSS

**Spec:** `docs/superpowers/specs/2026-11-20-catalogue-footer-update-design.md`

## Global Constraints

- Preserve supplied source files and unrelated products.
- Do not publish guessed social URLs.
- Do not add dependencies.
- Keep English and Arabic content structurally equivalent.
- Do not commit or push without a separate user request.

## Review Focus

- Rebuilding the catalogue must keep all 113 Golden Med variants and place every one in medicine.
- The public supplements JSON must contain Advance only and must not contain hidden-company deep links.
- Trusted partner logo paths must resolve to existing assets without duplicating entries.
- Both language addresses must place Damascus before Idlib and retain Carlton spelling.
- Disabled social marks must not be focusable or imply active navigation.

---

### Task 1: Catalogue business rules

**Files:**
- Modify: `tests/test_new_company_catalogues.py`
- Modify: `scripts/build_product_catalogue.py`
- Modify: `content/catalogue-classification-notes.md`
- Generated: `public/data/products-medicine.json`
- Generated: `public/data/products-supplements.json`
- Generated: `content/product-data-audit.json`

**Interfaces:**
- Consumes: supplied files under `public/medecines`
- Produces: deterministic category JSON with all Golden Med products in medicine and Advance-only public supplements

- [ ] **Step 1: Update catalogue tests to assert 113 Golden Med medicines and an Advance-only supplements output.**
- [ ] **Step 2: Run `python -m unittest tests.test_new_company_catalogues` and confirm it fails on the old 100/13 split and multiple supplement companies.**
- [ ] **Step 3: Update `category_for` and public catalogue filtering with the minimal explicit business rules.**
- [ ] **Step 4: Rebuild and rerun the focused test until it passes.**
- [ ] **Step 5: Update classification notes to describe the client-directed public taxonomy.**

### Task 2: Partner, address, and social metadata

**Files:**
- Create: `lib/site-presentation.ts`
- Create: `tests/site-presentation.test.mjs`
- Modify: `content/site.ts`

**Interfaces:**
- Produces: `TRUSTED_PARTNER_LOGOS`, `SOCIAL_CHANNELS`, and bilingual footer addresses
- Consumed by: Task 3 shared site components

- [ ] **Step 1: Write tests for the two new trusted logos, disabled social destinations, and bilingual address ordering.**
- [ ] **Step 2: Run the new Node test and confirm it fails because the metadata/content is absent.**
- [ ] **Step 3: Add the presentation module and update both address translations.**
- [ ] **Step 4: Run the focused Node test and confirm it passes.**

### Task 3: Shared partner and footer UI

**Files:**
- Modify: `components/saksouk-site.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `TRUSTED_PARTNER_LOGOS` and `SOCIAL_CHANNELS` from Task 2
- Produces: partner grid additions and responsive, accessible disabled social marks

- [ ] **Step 1: Replace the component-local partner list with shared metadata and render meaningful partner names.**
- [ ] **Step 2: Add compact brand-mark SVGs and a bilingual social row beneath contact information.**
- [ ] **Step 3: Style partner logos, two-location address copy, social states, RTL, and mobile layout consistently with the current footer.**
- [ ] **Step 4: Run all Node and Python tests, lint, TypeScript, production build, and `git diff --check`.**
