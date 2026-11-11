# Premium Secondary Pages Design

## Objective

Bring the Cosmetics, Nutritional Supplements, About Us, News, and Work With Us pages up to the visual and UX standard established by the medicine page, while preserving Saksouk's bilingual content, existing brand palette, routing, and catalogue behavior.

## Design direction

- Use one shared premium visual language: quiet off-white surfaces, controlled violet accents, strong editorial typography, fine borders, useful iconography, restrained motion, and generous spacing.
- Do not clone the medicine page. Each page receives a purpose-specific composition and imagery while retaining shared proportions, controls, and responsive behavior.
- Keep every section useful. Decorative elements must reinforce product category, company history, editorial reading, or recruitment rather than act as generic filler.
- Preserve English and Arabic parity. Layouts must mirror cleanly in RTL, maintain readable line-height, and avoid presentation-only English strings.

## Page compositions

### Cosmetics

A product-led split hero pairs a concise category statement with the existing quality-control image, a soft violet/rose treatment, four trust points, and operational metrics. The design should communicate dermocosmetic care and professional pharmacy distribution rather than consumer e-commerce.

### Nutritional supplements

A wellness-and-quality split hero uses the existing supplement imagery, a violet/green treatment, four quality and channel points, and metrics. It should read as responsible nutritional product distribution rather than lifestyle advertising.

### About Us

An editorial legacy hero leads into a 1950-to-today timeline, the pharmaceutical warehouse story, vision and operating goal, infrastructure/reach statistics, and the people behind the business. The page must make the relationship between the international group and the pharmaceutical warehouse immediately understandable.

### News & Insights

A newsroom hero highlights one lead story, followed by a well-spaced editorial grid for the remaining sources. Metadata, categories, source attribution, and outbound-link behavior remain visible and accessible.

### Work With Us

A business-focused careers hero presents team imagery beside a clear invitation. Career paths, working principles, and the four-step contact process follow in a structured progression ending in the existing WhatsApp CTA.

## Responsive and motion requirements

- Desktop split layouts collapse to a single-column narrative on tablets and phones.
- Product hero headlines must wrap intentionally without clipping.
- Arabic headings use the established Arabic font and increased line-height; all directional spacing uses logical properties.
- Motion is limited to entrance, image reveal, and subtle hover feedback, and respects `prefers-reduced-motion` through the existing Framer Motion hook.
- Existing catalogue filters, products, links, and page URLs remain unchanged.

## Acceptance criteria

- Cosmetics and supplements no longer use the generic PageHero/product-family composition.
- About, News, and Work With Us each have a distinct, complete first viewport and stronger information hierarchy.
- All new labels and descriptions exist in both English and Arabic.
- No new dependency is introduced.
- Node tests, lint, TypeScript, production build, and `git diff --check` pass.
