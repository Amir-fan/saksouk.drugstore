# Catalogue classification notes

The generated catalogue is based on the files in `public/medecines` and the supplied product photographs in `public/images/products` and `public/images/p.zoroza`. The importer in `scripts/build_product_catalogue.py` is the source of truth for category assignment, duplicate handling, brand slugs, logos, and image matching.

## Category decisions

- Products from the nine supplied Syrian pharmaceutical manufacturers remain under **Human medicines**.
- **Infless** products are under **Food supplements**. The manufacturer's own catalogue presents Acticobal, Cocomega, D3 K2, Digestaz, Ferolac, Fibrovia+, Inflegard, Infrelax, Magnesio, and Regista as supplement products: <https://infless.com/tum-urunler>.
- Ingestible **Bioxcin** tablets and sachets are under **Food supplements**. Bioxcin's official supplement catalogue identifies Women's Skin, Biotin, Keratin Complex, Beauty Collagen, Beauty Booster, Women's Hair, and Men's Hair as food supplements: <https://bioxcin.com.tr/gida-takviyesi/gida-takviyesi>.
- Bioxcin shampoos, conditioners, oils, creams, topical serums, cleansers, sunscreens, and roll-ons remain under **Cosmetics**. The manufacturer's hair-care catalogue is the reference for these topical lines: <https://bioxcin.com.tr/sac-bakimi>.
- **Zaroza Hair Vitamin 60 Tablets** is under **Food supplements**, following the manufacturer's product listing: <https://zaroza.com/hair-vitamin-biotin-saw-palmetto-zinc-sac-derisi-ve-sac-sagligi-vitamin---60-tablet>. Other supplied Zaroza products remain under **Cosmetics**.
- Six Zaroza products that were absent from the spreadsheet are identified directly from the supplied manufacturer packaging: four Collagen Wrapping Gel Masks, the 2 Months Hair Care Set, and the Sensitive Shampoo + 8 Ampoules set. Their catalogue records contain only packaging-visible names, ingredients, and contents; no unsupported efficacy claims were added.
- Ingestible **Advance** formulas are under **Food supplements**. Supplied OzoCare topical products and Lily Douche remain under **Cosmetics**, based on the supplied compositions, indications, and packaging.
- Supplied **Tanium** products are topical skin, hair, oral-care, sun-care, or roll-on products and remain under **Cosmetics**.
- All 274 supplied **Domina Pharmaceuticals** rows remain under **Human medicines**. The source workbook identifies them as pharmaceutical products, supplies a composition for every row, and supplies an indication for 273 rows. The one blank source indication is preserved as blank rather than inferred.
- The **Golden Med Pharma** PDF contributes 113 variants: 100 remain under **Human medicines**, while 13 are assigned to **Food supplements** because their source packaging or indication explicitly identifies them as dietary/food supplements. Medicinal vitamin products carrying prescription or therapeutic labeling remain under Human medicines.

## Source integrity

- Golden Med Pharma product names and English compositions are extracted from the PDF. Its Arabic indication text is not imported because the PDF stores that column in reversed character order; omitting corrupted copy is safer than presenting unreliable medical information.
- All 68 non-logo product visuals embedded in the Golden Med Pharma PDF are extracted as optimized WebP assets and mapped by their table-row geometry. Product families with multiple strengths share the family artwork, while strength-specific packaging such as Flocosept remains individually mapped.
- Domina product names, compositions, packaging, product nature, and indications are imported directly from the first worksheet. Price columns are intentionally excluded because the website does not publish prices and those values are time-sensitive.

## Duplicate and image rules

- Product duplicates are removed within the same category and company after Unicode, punctuation, and spacing normalization.
- Known duplicate labels such as `BIOXCIN FORTE SERUM 1x50` and `ZAROZA WASHING FOAM` are merged into their canonical product.
- The three Tanium Sun variants are retained separately because the supplied packaging identifies White Tinted, Pink Tinted, and Beige Tinted products.
- Exact duplicate photographs are skipped by SHA-256 hash. Different views of the same product are retained as a gallery.
- Supplied photographs are converted to optimized WebP assets for product cards and galleries. The older `WhatsApp Image*.jpeg` captures remain excluded from version control; the explicitly mapped Infless and Zaroza source files are retained so their mappings can be rebuilt and audited.
