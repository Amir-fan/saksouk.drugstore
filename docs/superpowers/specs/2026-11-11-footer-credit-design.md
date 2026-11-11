# Footer Credit and Contact Sheet Design

## Intent

Add a refined Fanari Labs credit at the visual center of the Saksouk footer. The credit gives the developer appropriate visibility without competing with Saksouk, and opens a compact contact sheet rather than navigating visitors away immediately.

## Goals

- Display `Developed by Fanari Labs · Click to contact` in English and an equivalent Arabic label in Arabic mode.
- Open a polished contact sheet containing `fanarilabs.com`, `+90 537 929 51 63`, and `fanarilabs@gmail.com` as working links.
- Support mouse, keyboard, Escape-to-close, backdrop dismissal, focus restoration, and reduced-motion preferences.
- Keep the interaction responsive and correctly mirrored in RTL.
- Audit the recently added secondary-page components against the supplied anti-pattern list and remove clear excess: ornamental pills, needless all-caps labels, numbered-decoration patterns, excessive gradients, title-ending periods, and border-heavy grouping.

## Non-goals

- Do not redesign the entire established Saksouk visual system.
- Do not alter page content, product data, catalogue behavior, routes, or existing contact destinations.
- Do not introduce a dependency or use a third-party modal package.

## Approaches considered

1. **Centered credit with modal contact sheet — selected.** Matches the supplied references, keeps the footer composed, and allows all contact methods to remain visible without leaving the site.
2. Direct external link from the footer credit. Lower implementation cost, but weaker presentation and fewer contact choices.
3. Permanent Fanari contact block inside the footer. Strong visibility, but adds clutter and competes with Saksouk's own footer information.

## Interaction and visual treatment

- The closed credit is a quiet horizontal text control placed between the footer legal copy and location link, with a restrained circular arrow affordance rather than a full pill container.
- The modal is a dark, near-black rectangular sheet with moderate corner radius, one fine boundary, clear typographic hierarchy, and three full-width contact rows.
- Motion is limited to a short fade, vertical settle, arrow shift, and contact-row hover response. Reduced-motion users see the final state immediately.
- The component uses a native dialog-like structure with `role="dialog"`, `aria-modal`, an accessible title, initial focus on Close, body-scroll locking, Escape handling, and focus restoration.

## Verification

- Add behavior tests for the bilingual contact model and link values before implementation.
- Run all Node tests, lint, TypeScript, production build, and `git diff --check`.
- Perform local browser QA when the browser surface is available; otherwise report the limitation.
