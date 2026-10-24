# Catalogue classification notes

The generated catalogue is based on the files in `public/medecines` and the supplied product photographs in `public/images/products`. The importer in `scripts/build_product_catalogue.py` is the source of truth for category assignment, duplicate handling, brand slugs, logos, and image matching.

## Category decisions

- Products from the nine supplied Syrian pharmaceutical manufacturers remain under **Human medicines**.
- **Infless** products are under **Food supplements**. The manufacturer's own catalogue presents Acticobal, Cocomega, D3 K2, Digestaz, Ferolac, Fibrovia+, Inflegard, Infrelax, Magnesio, and Regista as supplement products: <https://infless.com/tum-urunler>.
- Ingestible **Bioxcin** tablets and sachets are under **Food supplements**. Bioxcin's official supplement catalogue identifies Women's Skin, Biotin, Keratin Complex, Beauty Collagen, Beauty Booster, Women's Hair, and Men's Hair as food supplements: <https://bioxcin.com.tr/gida-takviyesi/gida-takviyesi>.
- Bioxcin shampoos, conditioners, oils, creams, topical serums, cleansers, sunscreens, and roll-ons remain under **Cosmetics**. The manufacturer's hair-care catalogue is the reference for these topical lines: <https://bioxcin.com.tr/sac-bakimi>.
- **Zaroza Hair Vitamin 60 Tablets** is under **Food supplements**, following the manufacturer's product listing: <https://zaroza.com/hair-vitamin-biotin-saw-palmetto-zinc-sac-derisi-ve-sac-sagligi-vitamin---60-tablet>. Other supplied Zaroza products remain under **Cosmetics**.
- Ingestible **Advance** formulas are under **Food supplements**. Supplied OzoCare topical products and Lily Douche remain under **Cosmetics**, based on the supplied compositions, indications, and packaging.
- Supplied **Tanium** products are topical skin, hair, oral-care, sun-care, or roll-on products and remain under **Cosmetics**.

## Duplicate and image rules

- Product duplicates are removed within the same category and company after Unicode, punctuation, and spacing normalization.
- Known duplicate labels such as `BIOXCIN FORTE SERUM 1x50` and `ZAROZA WASHING FOAM` are merged into their canonical product.
- The three Tanium Sun variants are retained separately because the supplied packaging identifies White Tinted, Pink Tinted, and Beige Tinted products.
- Exact duplicate photographs are skipped by SHA-256 hash. Different views of the same product are retained as a gallery.
- Supplied WhatsApp images are converted to optimized WebP files; the local source JPEGs are intentionally excluded from version control.
