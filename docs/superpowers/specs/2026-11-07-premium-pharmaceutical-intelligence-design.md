# Saksouk Premium Pharmaceutical Intelligence — Design Specification

## Intent

Refine the existing Saksouk website into a coherent, premium pharmaceutical distribution experience. The visual language should feel calm, precise, and commercially credible while giving the medicine explainer a distinctive, agent-like identity. The supplied “Sense” reference is inspiration for component finish and composition—not a template to copy.

## Goals

- Show every product image completely inside catalogue cards and product galleries.
- Replace the current collection of gradients, pills, icon tiles, and glows with one deliberate component system.
- Make product cards easier to scan and more consistent across medicine, cosmetics, and supplements.
- Make Saksouk Intelligence feel like a trustworthy proprietary research assistant rather than a generic AI widget.
- Carry the same design quality through filters, company cards, product details, CTAs, navigation, and supporting information panels.
- Preserve complete English and Arabic behavior, accessible focus states, responsive layouts, and reduced-motion support.

## Non-goals

- No changes to product categorization, catalogue content, medical claims, translations, or WhatsApp behavior.
- No new design library or runtime dependency.
- No imitation of the reference image’s wellness branding, pastel rainbow palette, or dashboard layout.
- No heavy glass blur, excessive animation, decorative 3D objects, or novelty AI imagery.

## Constraints

- Work within the current React, TypeScript, Vite, Framer Motion, Lucide, and CSS stack.
- Preserve existing user changes and the current catalogue data pipeline.
- Retain Saksouk’s logo and brand recognition.
- Components must remain usable with long bilingual product names and incomplete product imagery.

## Approaches Considered

1. **Quiet pharmaceutical intelligence — selected.** Editorial surfaces, restrained color, precise rules, and a focused luminous treatment for Saksouk Intelligence. This best balances pharmaceutical credibility with the requested premium agent-like feel.
2. **Dark executive technology.** Stronger technology character, but too likely to resemble a SaaS or cybersecurity product.
3. **Warm healthcare editorial.** Trustworthy and approachable, but not distinctive enough for the intelligence feature.

## Visual Direction

### Palette

- Warm ivory page: `#F5F5F1`
- Paper surface: `#FCFCF9`
- Ink/navy: `#141829`
- Secondary ink: `#62697A`
- Fine border: `#DEE1E7`
- Saksouk cobalt: `#5967D8`
- Deep cobalt: `#3E4AB5`
- Muted trust green: `#638E78`
- Intelligence aura: controlled cobalt, violet, and cool green light used only on the agent surface and tiny status details.

Large gradients will be removed from ordinary controls. Luminous color is a scarce accent, not a default background.

### Shape and depth

- Cards use 14–18px radii instead of uniformly oversized 20–30px radii.
- Primary surfaces use fine borders and subtle tonal separation; shadows are shallow and neutral.
- Pills are reserved for true status or compact filter values.
- Icon containers become smaller, quieter, and semantically consistent.
- Hover effects use border/tonal changes and 1–2px movement, not scaling glows.

### Typography

- Keep Inter Variable and Noto Sans Arabic Variable.
- Product names use controlled line heights and weight rather than oversized bold text.
- Metadata becomes compact, sentence-case, and low-noise.
- Arabic receives equivalent spacing, alignment, and vertical rhythm.

## Component System

### Product imagery

- Each card receives a fixed, isolated image stage.
- The image is removed from grid sizing and placed inside an absolute inner canvas.
- `object-fit: contain` and fixed insets guarantee the complete asset is visible regardless of aspect ratio.
- Tall, square, and wide images share a consistent optical footprint.
- Image backgrounds become quiet paper/ivory surfaces with a single fine internal frame.
- Missing-image states use a minimal package outline and “Image pending” label, not a floating pill icon.
- Product detail galleries use the same containment logic with more generous margins.

### Product cards

- Clear three-part structure: image stage, product identity, actions.
- Company and category move into a restrained metadata line.
- Product name and one concise description/composition block become the main hierarchy.
- WhatsApp inquiry becomes a simple text action with directional arrow.
- Medicine intelligence becomes a compact secondary action, visually distinct without competing with the product name.
- Cards align consistently even when images or descriptions are missing.

### Saksouk Intelligence trigger

- Rename the visible English treatment to **Saksouk Intelligence** while preserving the Arabic equivalent.
- Replace `Bot` and `Sparkles` with a custom-feeling mark assembled from a restrained Lucide `ScanSearch`, `Atom`, or `BadgeCheck` motif—one icon, not a cluster.
- Use an ink-on-ivory bordered control with a tiny cobalt/green status light and a subtle animated sweep on hover/focus.
- No “magic” sparkles, purple capsule gradient, robot face, or glowing icon bubble.
- On cards, the label stays compact. On product details, it becomes a full-width assistant action with supporting text.

### Saksouk Intelligence panel

- Replace the purple technology hero with a premium agent console:
  - ivory/white structured panel;
  - dark navy header rail;
  - a contained luminous “intelligence lens” using Saksouk cobalt and muted green;
  - clear product title and verification status;
  - modular response blocks inspired by the reference’s polished cards;
  - source and health notice treated as calm evidence panels.
- Keep the existing verified/source distinction explicit. The UI must never imply live AI generation when the content is curated.
- Motion is limited to a brief entrance, status pulse, and optional scanning line; reduced-motion removes all three.

### Filters and company navigation

- Remove the heavy purple filter bar.
- Use one paper toolbar with a strong search field and compact segmented filter controls.
- Dropdowns use thin borders, clear selected states, and restrained icons.
- Company cards become logo-led editorial rows with consistent logo framing and a quiet arrow action.

### Buttons, chips, and information cards

- Establish primary, secondary, text, and status variants.
- Primary CTA: deep cobalt fill, compact round arrow endpoint.
- Secondary CTA: paper surface, navy border/text.
- Status: soft tinted background with no drop shadow.
- Information cards use small semantic icons, a label, and content separated by rhythm rather than gradient tiles.

### Site-wide application

- Reuse the new surface, border, button, icon, and spacing tokens across navigation, capability cards, metrics, testimonials/news, partner sections, CTAs, footer interactions, product-family cards, and expertise panels.
- Preserve the current page structures and photography; this is a refinement pass, not a content or layout rewrite.
- The intelligence aura remains exclusive to Saksouk Intelligence so ordinary site sections stay calm.

## Responsive behavior

- Desktop: three product columns, balanced card heights, compact horizontal actions.
- Tablet: two columns with unchanged image containment.
- Mobile: one column, slightly shorter image stage, stacked actions only when needed.
- The intelligence panel becomes a bottom sheet on mobile with a compact sticky header and scrollable evidence blocks.
- All interactive targets remain at least 44px where appropriate, with visible keyboard focus.

## Motion

- 160–260ms transitions for controls and cards.
- No continuous orbiting decoration.
- Product imagery may rise 1–2px on hover without scaling beyond its safe canvas.
- Intelligence status may use one restrained pulse; scanning effects run once on open.
- `prefers-reduced-motion` removes decorative motion and preserves state changes.

## Verification

- Add a focused regression check proving tall product images cannot exceed their image stage.
- Validate representative tall, square, and landscape product assets at desktop, tablet, and mobile widths.
- Visually inspect medicine, cosmetics, and supplement grids; one product detail from each; the intelligence panel in both languages; filters; CTAs; and the homepage.
- Run catalogue tests, lint, production build, and `git diff --check`.

## Delivery boundary

The implementation will update the shared component markup only where necessary and consolidate the visual system primarily in `app/globals.css`. It will not alter catalogue data or add dependencies.
