# Saksouk medicine intelligence research report

Generated: 2026-09-11

## Scope and safety standard

This research powers a static bilingual product-information guide. It prioritizes exact manufacturer pages and the supplied Medico catalogue. It intentionally excludes dosing advice, diagnosis, contraindication interpretation, interactions, and personalized treatment guidance.

A medicine is marked **manufacturer verified** only when the catalogue item was conservatively matched to an official manufacturer product record containing an active ingredient or composition. Items without a reliable primary-source match remain **under verification** and expose no inferred ingredient claim.

## Coverage

- Total catalogue medicines: 1041
- Manufacturer verified: 279
- Supplied-catalogue verified: 415
- Under verification: 347

## Coverage by manufacturer

| Manufacturer | Total | Manufacturer verified | Catalogue verified | Under verification |
|---|---:|---:|---:|---:|
| Almashreq | 4 | 0 | 0 | 4 |
| Biomed | 102 | 27 | 0 | 75 |
| Hama Pharma | 173 | 142 | 0 | 31 |
| Ibn Hayan | 116 | 0 | 0 | 116 |
| Kimi | 37 | 16 | 0 | 21 |
| Medico | 433 | 0 | 415 | 18 |
| Rasha | 42 | 0 | 0 | 42 |
| Shifa | 55 | 23 | 0 | 32 |
| Zein Pharma | 79 | 71 | 0 | 8 |

## Primary sources

- [BioMed official products](https://www.biomedpharma-sy.com/Products/s_b/En)
- [Hama Pharma official medicines](https://hama-pharma.com/all-medicines/?lang=en)
- [Kimi official products](https://www.kimi-pharma.com/en/products)
- [Shifa official product catalogue](https://www.shifapharma.com/all-products)
- [Zein Pharma official products](https://www.zein-pharma.com/products/)
- Supplied file: `public/medecines/جميع اصناف شركة ميديكو.xlsx`

## Limitations

- Manufacturer catalogues may omit discontinued products, legacy brand variants, or export-only packs.
- Brand spelling and pack-size differences are common. The matcher rejects weak or numerically conflicting matches.
- English-only manufacturer data remains in its official scientific wording inside the Arabic interface rather than being medically reinterpreted.
- Rasha, Ibn Hayan, and Almashreq records stay under verification unless their supplied catalogue contains a composition or an authoritative product source becomes available.
