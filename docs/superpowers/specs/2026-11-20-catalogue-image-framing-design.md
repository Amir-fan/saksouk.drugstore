# Catalogue Image Framing Design

## Goal

Keep Advance exclusively in Nutritional Supplements, connect the supplied Facebook and Instagram profiles, and present every product image without clipping or awkward edge contact across catalogue cards and product detail views.

## Catalogue behavior

- Every Advance product is classified as `supplements`.
- No Advance product is emitted in `medicine` or `cosmetics`.
- The public supplements catalogue remains Advance-only and contains all supplied Advance records.
- Tanium remains in Cosmetics.

## Image behavior

- Product imagery uses a neutral inner stage with a visible safe margin.
- Pack-shot cutouts use `object-fit: contain` and never touch or cross the stage boundary.
- Editorial and catalogue images also remain fully visible; the site must not crop supplied product information merely to fill the card.
- The same framing model is used by cards, detail galleries, and thumbnails.
- Portrait, landscape, square, transparent, and opaque source files must all render predictably.
- Generated supplied-image assets receive a small transparent or neutral safety canvas so tightly trimmed source files do not appear clipped in the interface.

## Social behavior

- Facebook links to `https://www.facebook.com/share/1ACkatqqrW/`.
- Instagram links to `https://www.instagram.com/saksok_drugstore?dmpr=MWszMzZkcm82eGVqdw==`.
- LinkedIn and YouTube remain visually disabled until real URLs are supplied.

## Constraints

- Reuse the existing catalogue builder, product data model, and image assets.
- Do not add dependencies.
- Preserve unrelated content and layout behavior.
- Verify with catalogue tests, metadata tests, lint, build, and representative asset inspection.
