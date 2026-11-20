# Catalogue and Footer Update Design

## Intent

Align the public catalogue and shared company presentation with Saksouk's current commercial structure: Advance is the only company presented under nutritional supplements, every Golden Med product is presented under human medicines, Domina and Golden Med appear as trusted partners, the Damascus office is listed above Idlib, and the footer introduces social channels without publishing invented account URLs.

## Goals

- Generate all 113 Golden Med products under `medicine`.
- Generate the public supplements catalogue with Advance products only while preserving supplied source files and non-public records.
- Add the existing optimized Domina and Golden Med logos to the Trusted Partners grid.
- Present `Damascus, Dummar Project` / `دمشق، مشروع دمر` above the existing Idlib address.
- Add Facebook, Instagram, LinkedIn, and YouTube marks to the footer as clearly disabled placeholders until URLs are supplied.
- Preserve bilingual behavior, responsive layout, accessibility, and the existing visual language.

## Non-goals

- Do not invent or search for social account URLs.
- Do not delete supplier files or unrelated product imagery.
- Do not redesign the catalogue, partner section, or footer beyond the requested additions.
- Do not add dependencies.

## Approach

The catalogue generator remains the source of truth. Golden Med classification changes at `category_for`, while the public catalogue output applies an explicit supplements visibility policy allowing only Advance. This is preferred over manual JSON edits because rebuilds remain deterministic. Shared partner and social metadata moves into a small framework-independent module so behavior can be regression-tested without importing React.

The alternative of filtering only in React was rejected because raw category JSON, deep links, counts, and future consumers would still expose the wrong public structure. Deleting non-Advance source rows was rejected because it would destroy supplied catalogue evidence.

## Constraints and risks

- Social marks must not behave like links until real URLs are provided.
- Existing Golden Med imagery and product IDs should remain stable where possible; moving category changes IDs because category is part of the current deterministic identity.
- Tests and classification notes that encode the old 100/13 Golden Med split must be updated together with the generator.
