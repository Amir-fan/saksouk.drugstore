from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess
import sys
import unittest

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "public" / "data"
IMAGE_DIR = ROOT / "public" / "images"

NEW_ZAROZA_PRODUCTS = {
    "ZAROZA ANTI-BLEMISH COLLAGEN WRAPPING GEL MASK 50ml",
    "ZAROZA COLLAGEN WRAPPING GEL MASK 50ml",
    "ZAROZA MOISTURISING COLLAGEN WRAPPING GEL MASK 50ml",
    "ZAROZA BRIGHTENING COLLAGEN WRAPPING GEL MASK 50ml",
    "ZAROZA 2 MONTHS HAIR CARE SET",
    "ZAROZA HAIR CARE SET — SENSITIVE SHAMPOO + 8 AMPOULES",
}

INFLess_PRODUCTS = {
    "Magnesio",
    "Inflegard",
    "Digestaz",
    "Acticobal",
    "Cocomega",
    "Infrelax",
}

ZAROZA_PRODUCTS_WITH_NEW_IMAGES = NEW_ZAROZA_PRODUCTS | {
    "Acid( Special for Dry Skin UVA UVB SPF50 + Sunscreen 50 ML )Hyaluronic",
    "CREAM 50ml ZAROZA ANTI-WRINKLE & LIFTING DAILY",
    "CREAM 50ml ZAROZA ANTI-WRINKLE & LIFTING NIGHT",
    "Niacinamide( Special for Oily and Mixed Skin Mattifying UVA UVB SPF50+ Sunscreen 50 ML)",
    "VITAMIN ZAROZA 6 MONTHS HAIR CARE SET PLUS",
    "ZAROZA 3 IN 1 ELIXIR OIL 100ml",
    "ZAROZA ALOE VERA GEL 200ml",
    "ZAROZA ANTI - CELLULITE CARE GEL 150ml",
    "ZAROZA ANTI - HAIR LOSS SHAMPOO 200ml",
    "ZAROZA ANTI - STRETCH CARE CREAM 100ml",
    "ZAROZA ANTI - WRINKLE & LIFTING SERUM 30ml",
    "ZAROZA ANTI-ACNE SERUM 30ml",
    "ZAROZA ANTI-AGING CREAM 50ml",
    "ZAROZA ANTI-AGING EYE SERUM 30ml",
    "ZAROZA ANTI-OX HIGHLIGHTER SERUM 30ml",
    "ZAROZA ANTIHAIR LOSS SHAMPOO 600ml",
    "ZAROZA COFFE PEELING 150ml",
    "ZAROZA CURE INTENSE OZONIZED OIL 30ml",
    "ZAROZA FACE CLEANSING FOAM 150 ml",
    "ZAROZA FACE CLEANSING GEL 200ml",
    "ZAROZA FACE WHITENING CREAM 50ml",
    "ZAROZA GOLDEN SERUM 30ml",
    "ZAROZA HAIR CONDITIONER 250ml",
    "ZAROZA HAIR SPRAY SERUM 60ml",
    "ZAROZA LIGHTENIN EYE SERUM 30ml",
    "ZAROZA MASSAGE GEL 150ml",
    "ZAROZA OZONIZED HAIR OIL 30ml",
    "ZAROZA PORE MINIMIZING SERUM 30ml",
    "ZAROZA PURIFYING TONER 200ml",
    "ZAROZA ROLLON MEN 75ml",
    "ZAROZA ROLLON WOMEN 75ml",
    "ZAROZA SENSITIVE SHAMPOO 200ml",
    "ZAROZA SOOTHING TONER 200ml .",
    "ZAROZA HAIR VITAMIN 60 TABLETS .",
}


class ProductCatalogueImageTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        if os.environ.get("SKIP_CATALOG_BUILD") != "1":
            subprocess.run(
                [sys.executable, str(ROOT / "scripts" / "build_product_catalogue.py")],
                cwd=ROOT,
                check=True,
                capture_output=True,
                text=True,
                encoding="utf-8",
            )
        cls.products = []
        for category in ("medicine", "cosmetics", "supplements"):
            cls.products.extend(
                json.loads((DATA_DIR / f"products-{category}.json").read_text(encoding="utf-8"))
            )
        cls.audit = json.loads(
            (ROOT / "content" / "product-data-audit.json").read_text(encoding="utf-8")
        )

    def product(self, company: str, name: str) -> dict:
        return next(
            product
            for product in self.products
            if product["company"]["en"] == company and product["name"] == name
        )

    def test_adds_every_missing_zaroza_product(self) -> None:
        zaroza_names = {
            product["name"]
            for product in self.products
            if product["company"]["en"] == "Zaroza"
        }
        self.assertTrue(NEW_ZAROZA_PRODUCTS <= zaroza_names)

    def test_accounts_for_every_new_source_image(self) -> None:
        source_files = {
            path.name for path in (IMAGE_DIR / "p.zoroza").iterdir() if path.is_file()
        }
        source_files.update(
            path.name for path in (IMAGE_DIR / "products").glob("infless*.jpeg")
        )
        audited = {
            item["source"]
            for item in self.audit["suppliedImageMatches"]
            if item.get("source")
        }
        self.assertEqual(63, len(source_files))
        self.assertEqual(source_files, audited)

    def test_new_images_resolve_to_generated_assets(self) -> None:
        targets = ZAROZA_PRODUCTS_WITH_NEW_IMAGES | INFLess_PRODUCTS
        for product in self.products:
            if product["company"]["en"] not in {"Zaroza", "Infless"}:
                continue
            if product["name"] not in targets:
                continue
            self.assertTrue(product["image"].startswith("/images/products/product-"))
            for relative_path in product["images"]:
                self.assertTrue((ROOT / "public" / relative_path.lstrip("/")).is_file())

    def test_infless_photos_are_normalized_to_portrait_orientation(self) -> None:
        for name in INFLess_PRODUCTS:
            product = self.product("Infless", name)
            image_path = ROOT / "public" / product["image"].lstrip("/")
            with Image.open(image_path) as image:
                self.assertGreaterEqual(image.height, image.width, name)

    def test_exact_duplicate_source_is_not_added_twice(self) -> None:
        product = self.product("Zaroza", "ZAROZA ANTI - WRINKLE & LIFTING SERUM 30ml")
        supplied = [image for image in product["images"] if "/product-" in image]
        self.assertEqual(1, len(supplied))
        duplicate_records = [
            item
            for item in self.audit["suppliedImageMatches"]
            if item.get("status") == "exact-duplicate-skipped" and item.get("source")
        ]
        self.assertEqual(["unnamed.png"], [item["source"] for item in duplicate_records])


if __name__ == "__main__":
    unittest.main()
