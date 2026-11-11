# Footer Credit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible bilingual Fanari Labs footer credit and contact sheet, then remove the clearest AI-style excess from the newly redesigned secondary pages.

**Architecture:** Keep Fanari contact copy and URLs in a small typed bilingual model, and render the interaction inside the shared `SiteFooter` so every page inherits it. Use React state, refs, and effects for dialog behavior; use scoped CSS for presentation and limited targeted edits in `expanded-pages.tsx` for the anti-pattern cleanup.

**Tech Stack:** React 19, TypeScript 5.9, Framer Motion, Lucide React, Vite 8, plain CSS.

**Spec:** `docs/superpowers/specs/2026-11-11-footer-credit-design.md`

## Global Constraints

- Preserve all existing user changes in the dirty worktree.
- Do not add dependencies, change routes, alter product data, or change Saksouk contact destinations.
- Fanari contact values are exactly `https://fanarilabs.com`, `+90 537 929 51 63`, and `fanarilabs@gmail.com`.
- English and Arabic must expose equivalent content and RTL behavior.
- Motion must respect the existing reduced-motion preference.
- Do not commit or push without explicit user authorization.

## Review Focus

- Keyboard users: Escape closes, focus moves to Close when opened, and returns to the trigger after close.
- Repeated footers across routes: only one modal renders per page and body scroll is restored after close/unmount.
- External contact actions: website, telephone, and email links use valid protocols and safe external-link attributes.
- Mobile/RTL: contact rows remain readable and the footer bottom does not overflow.
- Reduced motion: the sheet is immediately usable without transform animation.

---

### Task 1: Fanari contact model

**Files:**
- Create: `lib/fanari-contact.ts`
- Create: `tests/fanari-contact.test.mjs`

**Interfaces:**
- Produces: `FANARI_CONTACT`, `getFanariCopy(lang)`.
- Consumes: none.

- [ ] Write a failing test asserting exact URL, telephone URI, email URI, complete English/Arabic copy, and absence of blank values.
- [ ] Run `node --test tests/fanari-contact.test.mjs`; expect module-not-found failure.
- [ ] Implement the typed contact model.
- [ ] Run the targeted test; expect all cases to pass.

### Task 2: Accessible footer credit and contact sheet

**Files:**
- Modify: `components/saksouk-site.tsx`
- Modify: `app/globals.css`
- Test: `tests/fanari-contact.test.mjs`

**Interfaces:**
- Consumes: `FANARI_CONTACT`, `getFanariCopy(lang)` from Task 1.
- Produces: shared `FooterCredit` interaction rendered once by `SiteFooter`.

- [ ] Add the trigger, dialog markup, focus lifecycle, Escape/backdrop closing, body-scroll restoration, external actions, and reduced-motion animation.
- [ ] Add restrained desktop/mobile/RTL styles matching the approved design without using a pill container or ornamental gradient.
- [ ] Run targeted tests, lint, and TypeScript.

### Task 3: Targeted anti-pattern cleanup

**Files:**
- Modify: `components/expanded-pages.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing secondary-page components.
- Produces: cleaner display headings and reduced ornamental presentation without structural redesign.

- [ ] Remove terminal periods from newly added display headings while preserving question marks and body punctuation.
- [ ] Remove decorative numbering from Work principles/path cards; retain numbers only for the real application process.
- [ ] Convert newly added all-caps ornamental microcopy and the featured-news category pill to quieter sentence-case labels.
- [ ] Run translation tests, lint, and TypeScript.

### Task 4: Verification and review

**Files:**
- Review all changed files.

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: verified local source.

- [ ] Run `node --test tests/*.test.mjs`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `git diff --check`.
- [ ] Review correctness, accessibility, readability, architecture, security, and performance.
- [ ] Perform browser QA if the local browser surface is available; otherwise record the limitation.
