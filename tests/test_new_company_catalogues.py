from __future__ import annotations

from collections import Counter
import json
import re
import unicodedata
from pathlib import Path
import subprocess
import sys
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "public" / "data"

GOLDEN_MED_SUPPLEMENTS = {
    "Joint Build 120 F.C.Tablets",
    "Joint Build 30 F.C.Tablets",
    "Bone Aid 30 Caplets",
    "Amino Acid Golden 300 Caplets",
    "Body Max BCAA 250 Capsules",
    "Creatine Golden 250 Capsules",
    "Glutamine Golden 250 Capsules",
    "Golden B12 30 Sublingual tablets",
    "B Mix Golden 30 F.C. Tablets",
    "Golden Diabevit 30 F.C. Tablets",
    "Ferbin 30 Slow Release Capsules",
    "Ferbin Fort 30 Tablets",
    "Elenatal 30 F.C.Tablets",
}


def normalized(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).casefold()
    value = value.translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))
    return re.sub(r"[^0-9a-z\u0600-\u06ff]+", "", value)


class NewCompanyCatalogueTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "build_product_catalogue.py")],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )
        cls.by_category = {
            category: json.loads(
                (DATA_DIR / f"products-{category}.json").read_text(encoding="utf-8")
            )
            for category in ("medicine", "cosmetics", "supplements")
        }
        cls.audit = json.loads(
            (ROOT / "content" / "product-data-audit.json").read_text(encoding="utf-8")
        )

    def company_products(self, company: str) -> list[dict]:
        return [
            product
            for products in self.by_category.values()
            for product in products
            if product["company"]["en"] == company
        ]

    def test_imports_all_domina_rows_as_human_medicines(self) -> None:
        products = self.company_products("Domina Pharmaceuticals")
        self.assertEqual(274, len(products))
        self.assertEqual({"medicine"}, {product["category"] for product in products})
        self.assertTrue(all(product.get("composition") for product in products))
        self.assertEqual(273, sum(bool(product.get("indication")) for product in products))

    def test_imports_every_golden_med_variant_into_source_supported_category(self) -> None:
        products = self.company_products("Golden Med Pharma")
        self.assertEqual(113, len(products))
        counts = Counter(product["category"] for product in products)
        self.assertEqual({"medicine": 100, "supplements": 13}, dict(counts))
        supplement_names = {
            product["name"]
            for product in products
            if product["category"] == "supplements"
        }
        self.assertEqual(GOLDEN_MED_SUPPLEMENTS, supplement_names)

    def test_keeps_golden_med_medicinal_vitamins_in_medicine(self) -> None:
        medicine_names = {
            product["name"]
            for product in self.company_products("Golden Med Pharma")
            if product["category"] == "medicine"
        }
        self.assertIn("F-Z- Gold 20 Capsules", medicine_names)
        self.assertIn("Gold D3-5000 IU 30 F.C.Tab", medicine_names)
        self.assertIn("Melatonin-Golden 5 30 Sublingual Tablets", medicine_names)

    def test_preserves_clean_source_fields(self) -> None:
        golden = next(
            product
            for product in self.company_products("Golden Med Pharma")
            if product["name"] == "Atorvamib 10/10 mg 30F.C.Tab"
        )
        self.assertEqual("Ezetimibe: 10 mg Atorvastatin: 10 mg", golden["composition"])
        self.assertNotIn("indication", golden)

        domina = next(
            product
            for product in self.company_products("Domina Pharmaceuticals")
            if product["name"] == "اريترو-جل جل"
        )
        self.assertEqual("أريترومايسين 4%", domina["composition"])
        self.assertIn("للانتانات الجلدية", domina["indication"])

    def test_uses_supplied_company_logos(self) -> None:
        expected = {
            "Golden Med Pharma": "/images/brands/golden-med-pharma.webp",
            "Domina Pharmaceuticals": "/images/brands/domina.webp",
        }
        for company, logo in expected.items():
            products = self.company_products(company)
            self.assertTrue(products)
            self.assertEqual({logo}, {product["company"].get("logo") for product in products})
            self.assertTrue((ROOT / "public" / logo.lstrip("/")).is_file())

    def test_extracts_and_resolves_every_golden_med_product_image(self) -> None:
        products = self.company_products("Golden Med Pharma")
        self.assertEqual(113, len(products))
        self.assertTrue(all(product.get("image") for product in products))
        self.assertTrue(all(product.get("images") for product in products))

        unique_images = {product["image"] for product in products}
        self.assertEqual(68, len(unique_images))
        for relative_path in unique_images:
            self.assertRegex(relative_path, r"^/images/products/gmp-p\d{2}-[a-z0-9-]+\.webp$")
            image_path = ROOT / "public" / relative_path.lstrip("/")
            self.assertTrue(image_path.is_file(), relative_path)
            with Image.open(image_path) as image:
                self.assertEqual("WEBP", image.format)
                self.assertGreaterEqual(image.width, 150)
                self.assertGreaterEqual(image.height, 100)

    def test_maps_shared_and_strength_specific_golden_med_artwork(self) -> None:
        products = self.company_products("Golden Med Pharma")
        by_name = {product["name"]: product for product in products}

        atorvamib_images = {
            by_name[name]["image"]
            for name in (
                "Atorvamib 10/10 mg 30F.C.Tab",
                "Atorvamib 10/20 mg 30F.C.Tab",
                "Atorvamib 10/40 mg 30F.C.Tab",
                "Atorvamib 10/80 mg 30F.C.Tab",
            )
        }
        self.assertEqual(1, len(atorvamib_images))

        flocosept_images = {
            by_name[name]["image"]
            for name in (
                "Flocosept-50 mg 30 & 10 Cap",
                "Flocosept-100 mg 30 & 10 Cap",
                "Flocosept-150 mg 10 & 1 Cap",
                "Flocosept-200 mg 30 & 10 Cap",
            )
        }
        self.assertEqual(4, len(flocosept_images))

        vancomycin_images = {
            by_name[name]["image"]
            for name in (
                "Vancomycin Golden 500 mg Dry powder vial for I.V infusion",
                "Vancomycin Golden 1000 mg Dry powder vial for I.V infusion",
            )
        }
        self.assertEqual(1, len(vancomycin_images))

    def test_new_company_products_have_no_normalized_duplicates(self) -> None:
        for company in ("Golden Med Pharma", "Domina Pharmaceuticals"):
            products = self.company_products(company)
            identities = [
                (product["category"], normalized(product["name"])) for product in products
            ]
            self.assertEqual(len(identities), len(set(identities)), company)

    def test_audit_reconciles_each_source_count(self) -> None:
        source_rows = {item["source"]: item for item in self.audit["sources"]}
        gmp = next(item for name, item in source_rows.items() if "GMP" in name)
        domina = next(item for name, item in source_rows.items() if "دومنا" in name)
        self.assertEqual(113, gmp["extractedRows"])
        self.assertEqual({"medicine": 100, "supplements": 13}, gmp["categoryBreakdown"])
        self.assertEqual(274, domina["extractedRows"])
        self.assertEqual({"medicine": 274}, domina["categoryBreakdown"])


if __name__ == "__main__":
    unittest.main()
