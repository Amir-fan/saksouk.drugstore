# Premium Secondary Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Cosmetics, Supplements, About, News, and Work With Us page experiences to match the medicine page's premium quality without cloning its composition.

**Architecture:** Add a small typed page-experience model for bilingual labels and metrics, then compose purpose-built React sections in the existing `expanded-pages.tsx` module. Extend the current global stylesheet with scoped page classes and responsive/RTL rules while leaving catalogue logic and routing intact.

**Tech Stack:** React 19, TypeScript 5.9, Framer Motion, Lucide React, Vite 8, plain CSS.

**Spec:** `docs/superpowers/specs/2026-11-11-premium-secondary-pages-design.md`

## Global Constraints

- Preserve all existing user changes in the dirty worktree.
- Keep English and Arabic content and RTL behavior equivalent.
- Do not add dependencies or change routes, catalogue behavior, product data, or WhatsApp destinations.
- Use only existing repository image assets.
- Respect reduced-motion preferences through existing animation utilities.

## Review Focus

- Long Arabic headings: must wrap with readable line-height and no clipping.
- Narrow mobile screens: split heroes and editorial grids must become one column without horizontal overflow.
- Missing/short news data: featured and secondary cards must render without relying on a fixed paragraph length.
- Reduced-motion users: initial page content remains visible without animation.
- Existing product catalogue navigation: new heroes must retain the correct catalogue anchor and category content.

---

### Task 1: Bilingual page-experience model

**Files:**
- Create: `lib/secondary-page-experience.ts`
- Create: `tests/secondary-page-experience.test.mjs`

**Interfaces:**
- Produces: `getProductExperience(kind, lang)`, `getAboutMilestones(lang)`, `getWorkPrinciples(lang)`.
- Consumes: none.

- [ ] **Step 1: Write a failing Node test** asserting both product experiences expose four points and three metrics, About exposes three chronological milestones, Work exposes three principles, and neither locale returns blank strings.
- [ ] **Step 2: Run `node --test tests/secondary-page-experience.test.mjs` and verify it fails because the module does not exist.**
- [ ] **Step 3: Implement the typed bilingual model in `lib/secondary-page-experience.ts` with only the copy and values required by the approved design.**
- [ ] **Step 4: Run `node --test tests/secondary-page-experience.test.mjs` and verify it passes.**

### Task 2: Tailored cosmetics and supplements heroes

**Files:**
- Modify: `components/expanded-pages.tsx`
- Modify: `app/globals.css`
- Test: `tests/secondary-page-experience.test.mjs`

**Interfaces:**
- Consumes: `getProductExperience(kind, lang)` from Task 1.
- Produces: `ProductCategoryHero` used only for `cosmetics` and `supplements`; existing medicine hero remains unchanged.

- [ ] **Step 1: Extend the failing test with source-level assertions that non-medicine products use `ProductCategoryHero`, catalogue anchors remain present, and the generic product-family branch is removed.**
- [ ] **Step 2: Run the targeted test and verify the new assertions fail.**
- [ ] **Step 3: Implement the split product hero, category-specific art direction, trust strip, metrics, catalogue CTA, responsive CSS, RTL CSS, and reduced-motion behavior.**
- [ ] **Step 4: Run the targeted test and verify it passes.**

### Task 3: About Us editorial company story

**Files:**
- Modify: `components/expanded-pages.tsx`
- Modify: `app/globals.css`
- Test: `tests/secondary-page-experience.test.mjs`

**Interfaces:**
- Consumes: `getAboutMilestones(lang)` from Task 1 and existing `expandedPages[lang].about` content.
- Produces: distinct About hero, legacy timeline, story, vision/goal, reach, and team sections.

- [ ] **Step 1: Add failing assertions for About's new hero, timeline, and existing bilingual vision/team content.**
- [ ] **Step 2: Run the targeted test and verify the assertions fail.**
- [ ] **Step 3: Replace the generic About hero and legacy layout with the approved editorial composition and scoped responsive/RTL styles.**
- [ ] **Step 4: Run the targeted test and verify it passes.**

### Task 4: Newsroom and Work With Us experiences

**Files:**
- Modify: `components/expanded-pages.tsx`
- Modify: `app/globals.css`
- Test: `tests/secondary-page-experience.test.mjs`

**Interfaces:**
- Consumes: `getWorkPrinciples(lang)` from Task 1 and existing News/Work content.
- Produces: featured-news hero, secondary news grid, recruitment hero, principles, paths, and process.

- [ ] **Step 1: Add failing assertions for the newsroom feature, careers hero, three work principles, and bilingual labels.**
- [ ] **Step 2: Run the targeted test and verify the assertions fail.**
- [ ] **Step 3: Implement the two page compositions and their responsive/RTL states without changing outbound article URLs or WhatsApp behavior.**
- [ ] **Step 4: Run the targeted test and verify it passes.**

### Task 5: Whole-site verification and review

**Files:**
- Review: all changed files.

**Interfaces:**
- Consumes: Tasks 1–4.
- Produces: verified build-ready local source.

- [ ] **Step 1: Run all Node tests with `node --test tests/*.test.mjs`.**
- [ ] **Step 2: Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.**
- [ ] **Step 3: Run `git diff --check` and review the final diff for unrelated edits, broken links, and bilingual parity.**
- [ ] **Step 4: Perform the required final code-quality review and address any Critical or Important findings through RED→GREEN tests.**
