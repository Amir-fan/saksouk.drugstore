from __future__ import annotations

import hashlib
from io import BytesIO
import json
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path
from typing import Any

from docx import Document
from docx.oxml.ns import qn
from openpyxl import load_workbook
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "medecines"
OUTPUT_DIR = ROOT / "public" / "data"
AUDIT_PATH = ROOT / "content" / "product-data-audit.json"
IMAGE_DIR = ROOT / "public" / "images" / "products"
sys.stdout.reconfigure(encoding="utf-8")

COMPANIES = {
    "أدفانس": ("Advance", "أدفانس"),
    "المشرق": ("Almashreq", "المشرق"),
    "ابن حيان": ("Ibn Hayan", "ابن حيان"),
    "انفليس": ("Infelis", "إنفليس"),
    "بيوكسين": ("Bioxin", "بيوكسين"),
    "بيوميد": ("Biomed", "بيوميد"),
    "تانيوم": ("Tanium", "تانيوم"),
    "راشا": ("Rasha", "راشا"),
    "زاروزا": ("Zaroza", "زاروزا"),
    "زين فارما": ("Zein Pharma", "زين فارما"),
    "حماه فارما": ("Hama Pharma", "حماة فارما"),
    "ميديكو": ("Medico", "ميديكو"),
    "شفا": ("Shifa", "شفا"),
    "كيمي": ("Kimi", "كيمي"),
}

COSMETIC_MARKERS = ("كوزمتك", "تانيوم", "أدفانس")
ARABIC_RE = re.compile(r"[\u0600-\u06ff]")
ZERO_WIDTH_RE = re.compile(r"[\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]")


def clean(value: object) -> str:
    if value is None:
        return ""
    text = unicodedata.normalize("NFKC", str(value))
    text = ZERO_WIDTH_RE.sub(" ", text)
    text = text.replace("\n", " ").replace("\r", " ")
    return " ".join(text.split()).strip(" -–—|،,")


def key_text(value: str) -> str:
    value = clean(value).casefold()
    value = value.translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))
    return re.sub(r"[^0-9a-z\u0600-\u06ff]+", "", value)


def company_for(path: Path) -> tuple[str, str]:
    normalized = clean(path.stem)
    for marker, company in COMPANIES.items():
        if marker in normalized:
            return company
    raise ValueError(f"No company mapping for {path.name}")


def is_cosmetic(path: Path) -> bool:
    normalized = clean(path.stem)
    return any(marker in normalized for marker in COSMETIC_MARKERS)


def latin_prefix(value: str) -> str:
    match = ARABIC_RE.search(value)
    if not match:
        return clean(value)
    prefix = clean(value[: match.start()])
    return prefix if len(prefix) >= 2 else clean(value)


def make_product(
    path: Path,
    raw_name: str,
    *,
    display_name: str = "",
    description: str = "",
    composition: str = "",
    indication: str = "",
) -> dict[str, Any] | None:
    raw_name = clean(raw_name)
    if not raw_name:
        return None
    company_en, company_ar = company_for(path)
    category = "cosmetics" if is_cosmetic(path) else "medicine"
    concise_name = clean(display_name) or (latin_prefix(raw_name) if category == "cosmetics" else raw_name)
    concise_name = concise_name or raw_name
    identity = f"{category}|{company_en}|{key_text(concise_name)}"
    return {
        "id": hashlib.sha1(identity.encode("utf-8")).hexdigest()[:12],
        "name": concise_name,
        "officialName": raw_name,
        "company": {"en": company_en, "ar": company_ar},
        "category": category,
        "group": "cosmetics" if category == "cosmetics" else "national",
        "description": clean(description),
        "composition": clean(composition),
        "indication": clean(indication),
        "source": path.name,
    }


def image_map_for_sheet(sheet: Any) -> dict[int, bytes]:
    images: dict[int, bytes] = {}
    for image in getattr(sheet, "_images", []):
        anchor = getattr(image, "anchor", None)
        start = getattr(anchor, "_from", None)
        if start is None:
            continue
        try:
            images.setdefault(start.row + 1, image._data())
        except Exception:
            continue
    return images


def attach_image(product: dict[str, Any] | None, image_bytes: bytes | None) -> None:
    if not product or not image_bytes:
        return
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    relative_path = f"/images/products/catalog-{product['id']}.webp"
    output_path = ROOT / "public" / relative_path.lstrip("/")
    try:
        with Image.open(BytesIO(image_bytes)) as source:
            source.thumbnail((720, 720), Image.Resampling.LANCZOS)
            if source.mode not in {"RGB", "RGBA"}:
                source = source.convert("RGBA" if "transparency" in source.info else "RGB")
            source.save(output_path, "WEBP", quality=84, method=6)
        product["image"] = relative_path
    except Exception:
        return


def first_sheet_rows(path: Path) -> list[tuple[Any, ...]]:
    workbook = load_workbook(path, data_only=True, read_only=True)
    return list(workbook.worksheets[0].iter_rows(values_only=True))


def extract_advance(path: Path) -> list[dict[str, Any]]:
    workbook = load_workbook(path, data_only=True, read_only=False)
    sheet = workbook.worksheets[0]
    images = image_map_for_sheet(sheet)
    products = []
    for row_number, row in enumerate(sheet.iter_rows(values_only=True), start=1):
        if row_number < 3:
            continue
        name = clean(row[1] if len(row) > 1 else "")
        if not name:
            continue
        product = make_product(
            path,
            name,
            composition=row[2] if len(row) > 2 else "",
            indication=row[3] if len(row) > 3 else "",
        )
        if product:
            attach_image(product, images.get(row_number))
            products.append(product)
    return products


def extract_described_cosmetics(path: Path) -> list[dict[str, Any]]:
    workbook = load_workbook(path, data_only=True, read_only=False)
    sheet = workbook.worksheets[0]
    images = image_map_for_sheet(sheet)
    products = []
    for row_number, row in enumerate(sheet.iter_rows(values_only=True), start=1):
        value = clean(row[0] if row else "")
        if not value or value in {"اسم المنتج", "الصنف"}:
            continue
        product = make_product(path, value, description=value)
        if product:
            attach_image(product, images.get(row_number))
            products.append(product)
    return products


def extract_zaroza(path: Path) -> list[dict[str, Any]]:
    workbook = load_workbook(path, data_only=True, read_only=False)
    products = []
    for sheet in workbook.worksheets:
        images = image_map_for_sheet(sheet)
        for row_number, row in enumerate(sheet.iter_rows(values_only=True), start=1):
            values = [clean(value) for value in row]
            if not any(values):
                continue
            candidate = values[2] if len(values) > 2 else values[-1]
            numbered = bool(values and re.fullmatch(r"\d+", values[0]))
            if not numbered and sheet.title != "Table 2":
                continue
            if not candidate:
                continue
            product = make_product(path, candidate, description=candidate)
            if product:
                attach_image(product, images.get(row_number))
                products.append(product)
    return products


def extract_tanium(path: Path) -> list[dict[str, Any]]:
    document = Document(path)
    products = []
    for table in document.tables:
        for row in table.rows[1:]:
            value = clean(row.cells[0].text)
            if not value:
                continue
            product = make_product(path, value, display_name=value, description=value)
            if product:
                image_bytes = None
                for blip in row._tr.xpath(".//a:blip"):
                    relationship_id = blip.get(qn("r:embed"))
                    related_part = document.part.related_parts.get(relationship_id)
                    if related_part is not None and hasattr(related_part, "blob"):
                        image_bytes = related_part.blob
                        break
                attach_image(product, image_bytes)
                products.append(product)
    return products


def extract_medico(path: Path) -> list[dict[str, Any]]:
    workbook = load_workbook(path, data_only=True, read_only=True)
    products = []
    for sheet in workbook.worksheets:
        rows = list(sheet.iter_rows(values_only=True))
        name_column = None
        composition_column = None
        for row in rows[:15]:
            for index, value in enumerate(row):
                text = clean(value)
                if "اسم المستحضر" in text or "اسم الصنف" in text:
                    name_column = index
                if "التركيب والعيار" in text:
                    composition_column = index
        if name_column is None:
            nonempty_columns = Counter(
                index
                for row in rows[:15]
                for index, value in enumerate(row)
                if clean(value)
            )
            if not nonempty_columns:
                continue
            name_column = max(nonempty_columns)
        for row in rows:
            if name_column >= len(row):
                continue
            name = clean(row[name_column])
            if not name:
                continue
            if any(
                phrase in name
                for phrase in (
                    "اسم المستحضر",
                    "اسم الصنف",
                    "تاريخ الترخيص",
                    "لائحة بالأصناف",
                )
            ):
                continue
            nonempty = [clean(value) for value in row if clean(value)]
            if len(nonempty) < 2:
                continue
            composition = ""
            if composition_column is not None and composition_column < len(row):
                composition = clean(row[composition_column])
            product = make_product(path, name, composition=composition)
            if product:
                products.append(product)
    return products


def extract_simple(path: Path) -> list[dict[str, Any]]:
    rows = first_sheet_rows(path)
    start = 0
    stem = clean(path.stem)
    if "زين فارما" in stem:
        start = 5
    elif "حماه فارما" in stem:
        start = 2
    products = []
    headers = {"Issue No.", "Issue Date", "اسم الصنف", "الصنف", "اسم المنتج"}
    for row in rows[start:]:
        name = clean(row[0] if row else "")
        if not name or name in headers:
            continue
        product = make_product(path, name)
        if product:
            products.append(product)
    return products


def extract(path: Path) -> list[dict[str, Any]]:
    stem = clean(path.stem)
    if "أدفانس" in stem:
        return extract_advance(path)
    if path.suffix.lower() == ".docx":
        return extract_tanium(path)
    if "ميديكو" in stem:
        return extract_medico(path)
    if "زاروزا" in stem:
        return extract_zaroza(path)
    if "كوزمتك" in stem:
        return extract_described_cosmetics(path)
    return extract_simple(path)


all_products: list[dict[str, Any]] = []
source_audit: list[dict[str, Any]] = []
IMAGE_DIR.mkdir(parents=True, exist_ok=True)
for old_image in IMAGE_DIR.glob("catalog-*.webp"):
    old_image.unlink()
for source_path in sorted(SOURCE_DIR.iterdir(), key=lambda item: item.name):
    if source_path.suffix.lower() not in {".xlsx", ".docx"}:
        continue
    extracted = extract(source_path)
    all_products.extend(extracted)
    source_audit.append(
        {
            "source": source_path.name,
            "category": "cosmetics" if is_cosmetic(source_path) else "medicine",
            "extractedRows": len(extracted),
        }
    )

deduplicated: list[dict[str, Any]] = []
duplicates: list[dict[str, str]] = []
seen: dict[str, dict[str, Any]] = {}
for product in all_products:
    duplicate_key = f"{product['category']}|{product['company']['en']}|{key_text(product['name'])}"
    if duplicate_key in seen:
        duplicates.append(
            {
                "source": product["source"],
                "name": product["name"],
                "keptId": seen[duplicate_key]["id"],
            }
        )
        continue
    seen[duplicate_key] = product
    deduplicated.append(product)

for product in deduplicated:
    product.pop("source", None)
    if product["officialName"] == product["name"]:
        product["officialName"] = ""
    for field in ("officialName", "description", "composition", "indication"):
        if not product[field]:
            product.pop(field)

referenced_images = {product.get("image") for product in deduplicated if product.get("image")}
for generated_image in IMAGE_DIR.glob("catalog-*.webp"):
    relative_image = f"/images/products/{generated_image.name}"
    if relative_image not in referenced_images:
        generated_image.unlink()

deduplicated.sort(key=lambda product: (product["category"], product["company"]["en"], product["name"].casefold()))
catalogue = {
    "medicine": [product for product in deduplicated if product["category"] == "medicine"],
    "cosmetics": [product for product in deduplicated if product["category"] == "cosmetics"],
    "supplements": [],
}
audit = {
    "sources": source_audit,
    "rawExtractedRows": len(all_products),
    "duplicateRowsRemoved": len(duplicates),
    "uniqueProducts": len(deduplicated),
    "categoryCounts": {category: len(products) for category, products in catalogue.items()},
    "productsWithImages": sum(1 for product in deduplicated if product.get("image")),
    "duplicates": duplicates,
}

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
for category, products in catalogue.items():
    (OUTPUT_DIR / f"products-{category}.json").write_text(
        json.dumps(products, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
AUDIT_PATH.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({key: value for key, value in audit.items() if key != "duplicates"}, ensure_ascii=False, indent=2))
