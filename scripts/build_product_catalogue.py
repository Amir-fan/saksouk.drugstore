from __future__ import annotations

import hashlib
from dataclasses import dataclass
from io import BytesIO
import json
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path
from typing import Any

import pdfplumber
from docx import Document
from docx.oxml.ns import qn
from openpyxl import load_workbook
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "medecines"
OUTPUT_DIR = ROOT / "public" / "data"
AUDIT_PATH = ROOT / "content" / "product-data-audit.json"
IMAGE_DIR = ROOT / "public" / "images" / "products"
BRAND_DIR = ROOT / "public" / "images" / "brands"
sys.stdout.reconfigure(encoding="utf-8")

COMPANIES = {
    "GMP Products": ("Golden Med Pharma", "غولدن ميد فارما", "golden-med-pharma", "golden-med-pharma-logo.jpeg"),
    "أدفانس": ("Advance", "أدفانس", "advance", "companies (2).jpeg"),
    "المشرق": ("Almashreq", "المشرق", "almashreq", ""),
    "ابن حيان": ("Ibn Hayan", "ابن حيان", "ibn-hayan", "companies (9).jpeg"),
    "انفليس": ("Infless", "إنفليس", "infless", "companies (1).png"),
    "بيوكسين": ("Bioxcin", "بيوكسين", "bioxcin", "companies (7).jpeg"),
    "بيوميد": ("Biomed", "بيوميد", "biomed", ""),
    "تانيوم": ("Tanium", "تانيوم", "tanium", "companies (8).jpeg"),
    "راشا": ("Rasha", "راشا", "rasha", "companies (3).png"),
    "زاروزا": ("Zaroza", "زاروزا", "zaroza", "companies (5).png"),
    "زين فارما": ("Zein Pharma", "زين فارما", "zein-pharma", "companies (6).jpeg"),
    "حماه فارما": ("Hama Pharma", "حماة فارما", "hama-pharma", "companies (3).jpeg"),
    "ميديكو": ("Medico", "ميديكو", "medico", "companies (1).jpeg"),
    "شفا": ("Shifa", "شفا", "shifa", "companies (10).jpeg"),
    "كيمي": ("Kimi", "كيمي", "kimi", "companies (4).png"),
    "دومنا": ("Domina Pharmaceuticals", "دومنا للصناعات الدوائية", "domina", "domina-pharmaceuticals-logo.jpeg"),
}

COSMETIC_COMPANIES = {"Bioxcin", "Tanium", "Zaroza"}
SUPPLEMENT_BIOXCIN_MARKERS = ("TABLET", "SACHET", "5000MCG", "حبوب للشعر")
ADVANCE_COSMETIC_MARKERS = ("اوزوكير", "ليلي دوش")
GOLDEN_MED_SUPPLEMENT_NAMES = {
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

# Supplied WhatsApp photos are deliberately mapped to catalogue names instead of
# relying on OCR. This keeps the import deterministic and makes repeated views a
# gallery on one product rather than duplicate products.
SUPPLIED_IMAGE_GROUPS: list[tuple[str, str, list[str]]] = [
    ("Advance", "بنتازايم", ["12.10.54 PM.jpeg", "12.10.57 PM (1).jpeg"]),
    ("Advance", "ادفا اوفاريا", ["12.10.55 PM (1).jpeg", "12.10.57 PM (3).jpeg"]),
    ("Advance", "ادفا غار", ["12.10.55 PM (2).jpeg", "12.10.55 PM.jpeg"]),
    ("Advance", "اوزوكير H PLUS", ["12.10.55 PM (3).jpeg"]),
    ("Advance", "ادفانسيد N.A.C", ["12.10.56 PM (1).jpeg"]),
    ("Advance", "اوزوكير M PLUS", ["12.10.56 PM (2).jpeg"]),
    ("Advance", "اوزوكير D PLUS", ["12.10.56 PM (3).jpeg"]),
    ("Advance", "ادفا مغنزيوم بلس", ["12.10.56 PM (4).jpeg"]),
    ("Advance", "الجيا كير", ["12.10.56 PM.jpeg"]),
    ("Advance", "اوزوكير R PLUS", ["12.10.57 PM (2).jpeg"]),
    ("Advance", "فومي رايت", ["12.10.57 PM (4).jpeg"]),
    ("Advance", "فيرو كير شراب", ["12.10.57 PM.jpeg"]),
    ("Bioxcin", "AQUA THERMAL ANTI DANDRUFF SHAMPOO", ["12.13.10 PM (1).jpeg"]),
    ("Bioxcin", "ATOPICARE NOURISHING FACE CREAM", ["12.13.10 PM (2).jpeg", "12.13.13 PM (4).jpeg"]),
    ("Bioxcin", "بلسم سائل", ["12.13.10 PM (3).jpeg", "12.13.11 PM.jpeg"]),
    ("Bioxcin", "FORTE SERUM", ["12.13.10 PM.jpeg", "12.13.14 PM (2).jpeg"]),
    ("Bioxcin", "BIOTIN SHAMPOO", ["12.13.11 PM (1).jpeg"]),
    ("Bioxcin", "COLLAGEN-BIOTIN LIQUID HAIR CONDITIONER", ["12.13.11 PM (2).jpeg", "12.13.11 PM (3).jpeg"]),
    ("Bioxcin", "COLD SKIN FACE CREAM", ["12.13.12 PM (1).jpeg", "12.13.17 PM (1).jpeg"]),
    ("Bioxcin", "QUANTUM OILY HAIR SHAMPOO", ["12.13.12 PM (2).jpeg"]),
    ("Bioxcin", "QUANTUM DRY/NORMAL HAIR SHAMPOO", ["12.13.12 PM (3).jpeg"]),
    ("Bioxcin", "COLLAGEN-BIOTIN HAIR CARE CREAM", ["12.13.12 PM.jpeg"]),
    ("Bioxcin", "COLLAGEN-BIOTIN HAIR SERUM", ["12.13.13 PM (1).jpeg"]),
    ("Bioxcin", "COLLAGEN-BIOTIN SHAMPOO", ["12.13.13 PM (2).jpeg", "12.13.14 PM.jpeg"]),
    ("Bioxcin", "KERATIN-ARGAN LIQUID CONDITIONER", ["12.13.13 PM (3).jpeg"]),
    ("Bioxcin", "WOMEN'S SKİN TABLET", ["12.13.13 PM.jpeg"]),
    ("Bioxcin", "KERATIN COMPLEX TABLET", ["12.13.14 PM (1).jpeg"]),
    ("Bioxcin", "FORTE SHAMPOO", ["12.13.15 PM (1).jpeg"]),
    ("Bioxcin", "MEN+SPORT SHAMPOO", ["12.13.15 PM (2).jpeg"]),
    ("Bioxcin", "DRY/NORMAL HAIR SHAMPOO", ["12.13.15 PM (3).jpeg"]),
    ("Bioxcin", "BLACK GARLIC SHAMPOO", ["12.13.15 PM.jpeg"]),
    ("Bioxcin", "KERATIN-ARGAN CARE OIL", ["12.13.16 PM (1).jpeg"]),
    ("Bioxcin", "QUANTUM SERUM", ["12.13.16 PM (2).jpeg"]),
    ("Bioxcin", "NOURISHING OILS SHAMPOO", ["12.13.16 PM (3).jpeg"]),
    ("Bioxcin", "KERATIN-ARGAN SHAMPOO", ["12.13.16 PM.jpeg"]),
    ("Bioxcin", "KERATIN-ARGAN HAIR CARE CREAM", ["12.13.17 PM (2).jpeg"]),
    ("Bioxcin", "DS AQUA THERMAL ANTI DANDRUFF SHAMPOO", ["12.13.17 PM.jpeg"]),
    ("Tanium", "Procapil", ["2.35.41 PM (1).jpeg"]),
    ("Tanium", "Avokado", ["2.35.41 PM (2).jpeg"]),
    ("Tanium", "Retinol", ["2.35.41 PM.jpeg"]),
    ("Tanium", "Glutathione", ["2.35.42 PM (1).jpeg"]),
    ("Tanium", "Caffein", ["2.35.42 PM (2).jpeg"]),
    ("Tanium", "Protein", ["2.35.42 PM (3).jpeg"]),
    ("Tanium", "Arbutin", ["2.35.42 PM.jpeg"]),
    ("Tanium", "Acne Care", ["2.35.43 PM (1).jpeg"]),
    ("Tanium", "Intensive تانيوم انتينسيف Mouth Wash", ["2.35.43 PM (2).jpeg"]),
    ("Tanium", "White Tinted", ["2.35.43 PM (3).jpeg"]),
    ("Tanium", "Hydra Fresh", ["2.35.43 PM.jpeg"]),
    ("Tanium", "Collagen", ["2.35.44 PM (1).jpeg"]),
    ("Tanium", "Intensive تانيوم انتينسيف معجون", ["2.35.44 PM (2).jpeg"]),
    ("Tanium", "Niacinamide", ["2.35.44 PM (3).jpeg"]),
    ("Tanium", "Sure Fresh", ["2.35.44 PM (4).jpeg"]),
    ("Tanium", "Pink Tinted", ["2.35.44 PM.jpeg"]),
    ("Tanium", "Hyaluronic", ["2.35.45 PM (1).jpeg"]),
    ("Tanium", "Beige Tinted", ["2.35.45 PM (2).jpeg"]),
    ("Tanium", "AHA-BHA", ["2.35.45 PM (3).jpeg"]),
    ("Tanium", "Light Skin", ["2.35.45 PM.jpeg"]),
    ("Tanium", "Gingivel تانيوم جينجيفال معجون", ["2.35.46 PM (1).jpeg"]),
    ("Tanium", "Sure Whitning", ["2.35.46 PM (2).jpeg"]),
    ("Tanium", "Vitamin-C", ["2.35.46 PM (3).jpeg"]),
    ("Tanium", "Gingivel تانيوم جينجيفال Mouth Wash", ["2.35.46 PM.jpeg"]),
]


@dataclass(frozen=True)
class SuppliedImageSource:
    relative_path: str
    rotation: int = 0


# New product photography is mapped explicitly so a catalogue rebuild remains
# deterministic. The first source in each group is the card/detail primary;
# following sources are retained as alternate gallery views.
ADDITIONAL_IMAGE_GROUPS: list[tuple[str, str, list[SuppliedImageSource]]] = [
    ("Infless", "Magnesio", [SuppliedImageSource("products/infless  (1).jpeg")]),
    ("Infless", "Inflegard", [SuppliedImageSource("products/infless  (2).jpeg", 90)]),
    ("Infless", "Digestaz", [SuppliedImageSource("products/infless  (3).jpeg", 90)]),
    ("Infless", "Acticobal", [SuppliedImageSource("products/infless  (4).jpeg", 90)]),
    ("Infless", "Cocomega", [SuppliedImageSource("products/infless  (5).jpeg", -90)]),
    ("Infless", "Infrelax", [SuppliedImageSource("products/infless  (6).jpeg")]),
    ("Zaroza", "LIGHTENIN EYE SERUM", [
        SuppliedImageSource("p.zoroza/1_org_zoom (1).webp"),
        SuppliedImageSource("p.zoroza/schermafbeelding-2024-10-28-141554-high.webp"),
    ]),
    ("Zaroza", "3 IN 1 ELIXIR OIL", [SuppliedImageSource("p.zoroza/1_org_zoom (10).webp")]),
    ("Zaroza", "SENSITIVE SHAMPOO", [
        SuppliedImageSource("p.zoroza/1_org_zoom (12).webp"),
        SuppliedImageSource("p.zoroza/sensivite shampoo amz-1.png"),
    ]),
    ("Zaroza", "HAIR SPRAY SERUM", [
        SuppliedImageSource("p.zoroza/1_org_zoom (13).webp"),
        SuppliedImageSource("p.zoroza/image_1080 (9).webp"),
        SuppliedImageSource("p.zoroza/images (2).jfif"),
    ]),
    ("Zaroza", "HAIR VITAMIN 60", [SuppliedImageSource("p.zoroza/1_org_zoom (14).webp")]),
    ("Zaroza", "FACE CLEANSING GEL", [SuppliedImageSource("p.zoroza/1_org_zoom (15).webp")]),
    ("Zaroza", "ANTI-OX HIGHLIGHTER SERUM", [
        SuppliedImageSource("p.zoroza/1_org_zoom (2).webp"),
        SuppliedImageSource("p.zoroza/61AmRUgiJ8L.jpg"),
    ]),
    ("Zaroza", "FACE WHITENING CREAM", [
        SuppliedImageSource("p.zoroza/1_org_zoom (3).webp"),
        SuppliedImageSource("p.zoroza/image_3840 (1).webp"),
    ]),
    ("Zaroza", "GOLDEN SERUM", [SuppliedImageSource("p.zoroza/1_org_zoom (7).webp")]),
    ("Zaroza", "Special for Oily and Mixed Skin", [SuppliedImageSource("p.zoroza/1_org_zoom-25.jpg")]),
    ("Zaroza", "ANTI - STRETCH CARE CREAM", [SuppliedImageSource("p.zoroza/23.webp")]),
    ("Zaroza", "LIFTING NIGHT", [
        SuppliedImageSource("p.zoroza/517gY72b7WL._AC_UF1000,1000_QL80_.jpg"),
        SuppliedImageSource("p.zoroza/image_1080 (4).webp"),
    ]),
    ("Zaroza", "ANTI-AGING CREAM", [
        SuppliedImageSource("p.zoroza/530fd348-1d34-470f-be24-1bf93abf7e91-1000x1000-YOv0mCDBYi8yAnOT6F3St07L33EQPZvzkU2nN9dE.webp"),
        SuppliedImageSource("p.zoroza/51yoSsMQJUL._AC_UF1000,1000_QL80_.jpg"),
    ]),
    ("Zaroza", "ANTI-ACNE SERUM", [SuppliedImageSource("p.zoroza/61oL5Y93RbL._AC_UF1000,1000_QL80_.jpg")]),
    ("Zaroza", "LIFTING DAILY", [
        SuppliedImageSource("p.zoroza/a0ebea49-130f-4d73-b689-f002fd218c97.jpg"),
        SuppliedImageSource("p.zoroza/image_3840 (2).webp"),
    ]),
    ("Zaroza", "ALOE VERA GEL", [SuppliedImageSource("p.zoroza/amazon_aloevera_1 copy.png")]),
    ("Zaroza", "HAIR LOSS SHAMPOO 200", [SuppliedImageSource("p.zoroza/amazon_anti_hair_loss_1.png")]),
    ("Zaroza", "ANTIHAIR LOSS SHAMPOO 600", [SuppliedImageSource("p.zoroza/anti hair loss shampoo amz-1 (1).png")]),
    ("Zaroza", "ANTI-AGING EYE SERUM", [SuppliedImageSource("p.zoroza/b637e4f7-50f6-401d-a9bd-7cac49289f48-thumbnail-500x500-70.jpg")]),
    ("Zaroza", "COFFE PEELING", [
        SuppliedImageSource("p.zoroza/image.jfif"),
        SuppliedImageSource("p.zoroza/ChatGPT Image 26 يونيو 2026، 05_28_48 م.png"),
    ]),
    ("Zaroza", "FACE CLEANSING FOAM", [
        SuppliedImageSource("p.zoroza/face cleasing foam amz-1 copy.png"),
        SuppliedImageSource("p.zoroza/image_3840 (5).webp"),
    ]),
    ("Zaroza", "HAIR CONDITIONER", [SuppliedImageSource("p.zoroza/hair conditioner amz-1 copy.png")]),
    ("Zaroza", "MASSAGE GEL", [SuppliedImageSource("p.zoroza/image_1080 (5).webp")]),
    ("Zaroza", "ANTI - CELLULITE", [
        SuppliedImageSource("p.zoroza/image_1080 (6).webp"),
        SuppliedImageSource("p.zoroza/zaroza-anti-cellulite-care-gel-732.png"),
    ]),
    ("Zaroza", "CURE INTENSE OZONIZED OIL", [SuppliedImageSource("p.zoroza/image_1080 (7).webp")]),
    ("Zaroza", "OZONIZED HAIR OIL", [SuppliedImageSource("p.zoroza/image_1080 (8).webp")]),
    ("Zaroza", "PURIFYING TONER", [SuppliedImageSource("p.zoroza/image_3840 (4).webp")]),
    ("Zaroza", "PORE MINIMIZING SERUM", [SuppliedImageSource("p.zoroza/image_3840.webp")]),
    ("Zaroza", "ROLLON MEN", [SuppliedImageSource("p.zoroza/rollon men amz-1 copy.png")]),
    ("Zaroza", "ROLLON WOMEN", [SuppliedImageSource("p.zoroza/rollon women amz-1 copy.png")]),
    ("Zaroza", "SOOTHING TONER", [SuppliedImageSource("p.zoroza/soothing toner amz-1 (1) copy.png")]),
    ("Zaroza", "ANTI - WRINKLE & LIFTING SERUM", [
        SuppliedImageSource("p.zoroza/unnamed (1).png"),
        SuppliedImageSource("p.zoroza/unnamed.png"),
    ]),
    ("Zaroza", "6 MONTHS HAIR CARE SET", [SuppliedImageSource("p.zoroza/ZAROZA_EN-29.jpg")]),
    ("Zaroza", "Special for Dry Skin", [SuppliedImageSource("p.zoroza/ت.webp")]),
    ("Zaroza", "ANTI-BLEMISH COLLAGEN WRAPPING GEL MASK", [
        SuppliedImageSource("p.zoroza/1_org_zoom.webp"),
        SuppliedImageSource("p.zoroza/image_1080.webp"),
    ]),
    ("Zaroza", "COLLAGEN WRAPPING GEL MASK", [
        SuppliedImageSource("p.zoroza/3.webp"),
        SuppliedImageSource("p.zoroza/image_1080 (1).webp"),
    ]),
    ("Zaroza", "MOISTURISING COLLAGEN WRAPPING GEL MASK", [
        SuppliedImageSource("p.zoroza/images (1).jfif"),
        SuppliedImageSource("p.zoroza/MTc3NDk0NDcxNDY5Y2I4MWNhYjVkOWM=.png"),
    ]),
    ("Zaroza", "BRIGHTENING COLLAGEN WRAPPING GEL MASK", [
        SuppliedImageSource("p.zoroza/images.jfif"),
        SuppliedImageSource("p.zoroza/MTc3NDk0NDYyOTY5Y2I4MTc1MDNjN2Q=.png"),
    ]),
    ("Zaroza", "2 MONTHS HAIR CARE SET", [SuppliedImageSource("p.zoroza/ZAROZA_EN-28.jpg")]),
    ("Zaroza", "SENSITIVE SHAMPOO + 8 AMPOULES", [SuppliedImageSource("p.zoroza/IMG_3659.JPG")]),
]
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


def company_for(path: Path) -> tuple[str, str, str, str]:
    normalized = clean(path.stem)
    for marker, company in COMPANIES.items():
        if marker in normalized:
            return company
    raise ValueError(f"No company mapping for {path.name}")


def category_for(company_en: str, name: str) -> str:
    upper_name = clean(name).upper()
    if company_en == "Golden Med Pharma":
        normalized_name = key_text(name)
        return (
            "supplements"
            if any(normalized_name == key_text(item) for item in GOLDEN_MED_SUPPLEMENT_NAMES)
            else "medicine"
        )
    if company_en == "Infless":
        return "supplements"
    if company_en == "Advance":
        return "cosmetics" if any(marker in clean(name) for marker in ADVANCE_COSMETIC_MARKERS) else "supplements"
    if company_en == "Bioxcin":
        return "supplements" if any(marker in upper_name for marker in SUPPLEMENT_BIOXCIN_MARKERS) else "cosmetics"
    if company_en == "Zaroza" and "HAIR VITAMIN" in upper_name:
        return "supplements"
    if company_en in COSMETIC_COMPANIES:
        return "cosmetics"
    return "medicine"


def canonical_name(company_en: str, name: str) -> str:
    normalized = clean(name)
    upper_name = normalized.upper()
    if company_en == "Bioxcin" and upper_name == "BIOXCIN FORTE SERUM 1X50":
        return "BIOXCIN FORTE SERUM"
    if company_en == "Zaroza" and "WASHING FOAM" in upper_name:
        return "ZAROZA FACE CLEANSING FOAM 150 ml"
    if company_en == "Tanium":
        if "(بيج" in normalized:
            return "Tanium Sun SPF 50+ — Beige Tinted تانيوم سن بيج"
        if normalized == "Tanium Sun تانيوم سن":
            return "Tanium Sun SPF 50+ — Pink Tinted تانيوم سن وردي"
        if normalized == "Tanium Sun":
            return "Tanium Sun SPF 50+ — White Tinted تانيوم سن أبيض"
    return normalized


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
    company_en, company_ar, company_slug, company_logo = company_for(path)
    category = category_for(company_en, raw_name)
    concise_name = clean(display_name) or (latin_prefix(raw_name) if category != "medicine" else raw_name)
    concise_name = concise_name or raw_name
    concise_name = canonical_name(company_en, concise_name)
    identity = f"{category}|{company_en}|{key_text(concise_name)}"
    return {
        "id": hashlib.sha1(identity.encode("utf-8")).hexdigest()[:12],
        "name": concise_name,
        "officialName": raw_name,
        "company": {
            "en": company_en,
            "ar": company_ar,
            "slug": company_slug,
            **({"logo": f"/images/brands/{company_slug}.webp"} if company_logo else {}),
        },
        "category": category,
        "group": "national" if category == "medicine" else category,
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
        product["images"] = [relative_path]
    except Exception:
        return


def longest_true_run(flags: list[bool]) -> tuple[int, int] | None:
    """Return the longest meaningful run, bridging tiny compression gaps."""
    best: tuple[int, int] | None = None
    start: int | None = None
    last_true: int | None = None
    for index, flag in enumerate(flags):
        if flag:
            if start is None:
                start = index
            last_true = index
        elif start is not None and last_true is not None and index - last_true > 3:
            candidate = (start, last_true + 1)
            if best is None or candidate[1] - candidate[0] > best[1] - best[0]:
                best = candidate
            start = None
            last_true = None
    if start is not None and last_true is not None:
        candidate = (start, last_true + 1)
        if best is None or candidate[1] - candidate[0] > best[1] - best[0]:
            best = candidate
    return best


def trim_capture_bands(source: Image.Image) -> Image.Image:
    """Remove black phone/gallery chrome without cropping normal product photos.

    Supplied product imagery sometimes arrives as a screenshot whose actual photo
    occupies the middle of a black canvas. We find the longest region containing
    real image information and only crop when a substantial outer band is present.
    """
    image = source.convert("RGB")
    width, height = image.size
    if width < 80 or height < 80:
        return image

    preview = image.copy()
    preview.thumbnail((260, 260), Image.Resampling.BILINEAR)
    sample_width, sample_height = preview.size
    pixels = preview.load()

    def visible(pixel: tuple[int, int, int]) -> bool:
        return max(pixel) > 28

    row_flags = [
        sum(1 for x in range(sample_width) if visible(pixels[x, y])) / sample_width >= .12
        for y in range(sample_height)
    ]
    row_run = longest_true_run(row_flags)
    if row_run is None or row_run[1] - row_run[0] < sample_height * .18:
        return image

    top = max(0, round(row_run[0] / sample_height * height) - round(height * .004))
    bottom = min(height, round(row_run[1] / sample_height * height) + round(height * .004))
    vertical_crop = image.crop((0, top, width, bottom))

    column_preview = vertical_crop.copy()
    column_preview.thumbnail((260, 260), Image.Resampling.BILINEAR)
    column_width, column_height = column_preview.size
    column_pixels = column_preview.load()
    column_flags = [
        sum(1 for y in range(column_height) if visible(column_pixels[x, y])) / column_height >= .12
        for x in range(column_width)
    ]
    column_run = longest_true_run(column_flags)
    if column_run is None or column_run[1] - column_run[0] < column_width * .18:
        return vertical_crop if vertical_crop.height < height * .94 else image

    left = max(0, round(column_run[0] / column_width * width) - round(width * .004))
    right = min(width, round(column_run[1] / column_width * width) + round(width * .004))
    cropped = image.crop((left, top, right, bottom))

    removed_fraction = 1 - (cropped.width * cropped.height) / (width * height)
    return cropped if removed_fraction >= .06 else image


def remove_connected_dark_background(source: Image.Image) -> Image.Image:
    """Turn a solid black outer canvas transparent while retaining dark label art."""
    image = source.convert("RGBA")
    width, height = image.size
    preview = image.convert("RGB")
    preview.thumbnail((180, 180), Image.Resampling.BILINEAR)
    preview_width, preview_height = preview.size
    preview_pixels = preview.load()
    perimeter = [preview_pixels[x, 0] for x in range(preview_width)]
    perimeter += [preview_pixels[x, preview_height - 1] for x in range(preview_width)]
    perimeter += [preview_pixels[0, y] for y in range(preview_height)]
    perimeter += [preview_pixels[preview_width - 1, y] for y in range(preview_height)]
    if sum(1 for pixel in perimeter if max(pixel) < 55) / len(perimeter) < .18:
        return image

    rgb = image.convert("RGB")
    dark = Image.eval(rgb.convert("L"), lambda value: 255 if value < 48 else 0)
    # A one-pixel dark border joins every outside-connected component, allowing
    # one flood fill instead of scanning/filling thousands of perimeter seeds.
    padded = Image.new("L", (width + 2, height + 2), 255)
    padded.paste(dark, (1, 1))
    ImageDraw.floodfill(padded, (0, 0), 128)
    connected_background = padded.crop((1, 1, width + 1, height + 1))
    connected_background = connected_background.point(lambda value: 255 if value == 128 else 0)
    connected_background = connected_background.filter(ImageFilter.GaussianBlur(radius=1.1))
    image.putalpha(ImageChops.invert(connected_background))
    return image


def optimize_supplied_image(
    source_path: Path,
    product: dict[str, Any],
    index: int,
    rotation: int = 0,
) -> str | None:
    output_name = f"product-{product['id']}-{index + 1}.webp"
    output_path = IMAGE_DIR / output_name
    if output_path.exists() and output_path.stat().st_mtime >= source_path.stat().st_mtime:
        return f"/images/products/{output_name}"
    try:
        with Image.open(source_path) as source:
            source = ImageOps.exif_transpose(source)
            if rotation:
                source = source.rotate(rotation, expand=True)
            source = trim_capture_bands(source)
            source = remove_connected_dark_background(source)
            source.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            source.save(output_path, "WEBP", quality=88, method=6)
        return f"/images/products/{output_name}"
    except Exception:
        return None


def supplied_image_path(suffix: str) -> Path | None:
    matches = sorted(IMAGE_DIR.glob(f"WhatsApp Image 2026-10-* at {suffix}"))
    return matches[0] if matches else None


def explicit_image_path(source: SuppliedImageSource) -> Path | None:
    path = ROOT / "public" / "images" / source.relative_path
    return path if path.is_file() else None


def attach_supplied_images(products: list[dict[str, Any]]) -> list[dict[str, str]]:
    exact_hashes: set[str] = set()
    audit: list[dict[str, str]] = []
    image_groups: list[tuple[str, str, list[str | SuppliedImageSource]]] = [
        (company, marker, list(suffixes))
        for company, marker, suffixes in SUPPLIED_IMAGE_GROUPS
    ]
    image_groups.extend(ADDITIONAL_IMAGE_GROUPS)
    for company, product_marker, sources in image_groups:
        marker_key = key_text(product_marker)
        candidates = [
            item
            for item in products
            if item["company"]["en"] == company
            and marker_key in key_text(f"{item['name']} {item.get('officialName', '')}")
        ]
        product = min(
            candidates,
            key=lambda item: (
                0 if marker_key in key_text(item["name"]) else 1,
                abs(len(key_text(item["name"])) - len(marker_key)),
                len(key_text(f"{item['name']} {item.get('officialName', '')}")),
            ),
            default=None,
        )
        if product is None:
            audit.append({"company": company, "product": product_marker, "status": "product-not-found"})
            continue
        supplied: list[str] = []
        for image_source in sources:
            explicit = isinstance(image_source, SuppliedImageSource)
            source = (
                explicit_image_path(image_source)
                if explicit
                else supplied_image_path(image_source)
            )
            source_name = (
                Path(image_source.relative_path).name
                if explicit
                else str(image_source)
            )
            if source is None:
                existing_name = f"product-{product['id']}-{len(supplied) + 1}.webp"
                if (IMAGE_DIR / existing_name).exists():
                    supplied.append(f"/images/products/{existing_name}")
                    entry = {"company": company, "product": product_marker, "status": f"using-optimized: {existing_name}"}
                else:
                    status = "image-not-found" if explicit else f"image-not-found: {source_name}"
                    entry = {"company": company, "product": product_marker, "status": status}
                if explicit:
                    entry["source"] = source_name
                audit.append(entry)
                continue
            digest = hashlib.sha256(source.read_bytes()).hexdigest()
            if digest in exact_hashes:
                status = "exact-duplicate-skipped" if explicit else f"exact-duplicate-skipped: {source.name}"
                entry = {"company": company, "product": product_marker, "status": status}
                if explicit:
                    entry["source"] = source_name
                audit.append(entry)
                continue
            exact_hashes.add(digest)
            rotation = image_source.rotation if explicit else 0
            optimized = optimize_supplied_image(source, product, len(supplied), rotation)
            if optimized:
                supplied.append(optimized)
                entry = {"company": company, "product": product_marker, "status": "matched"}
            else:
                entry = {"company": company, "product": product_marker, "status": "optimization-failed"}
            if explicit:
                entry["source"] = source_name
                audit.append(entry)
        if supplied:
            embedded = [path for path in product.get("images", []) if path not in supplied]
            product["images"] = supplied + embedded
            product["image"] = supplied[0]
            if sources and not isinstance(sources[0], SuppliedImageSource):
                audit.append({"company": company, "product": product["name"], "status": f"matched-{len(supplied)}"})
    return audit


def build_brand_logos() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    source_dir = ROOT / "public" / "images"
    for _, (_, _, slug, source_name) in COMPANIES.items():
        if not source_name:
            continue
        source_path = source_dir / source_name
        output_path = BRAND_DIR / f"{slug}.webp"
        with Image.open(source_path) as source:
            source = source.convert("RGBA")
            if slug == "golden-med-pharma":
                rgb = source.convert("RGB")
                white = Image.new("RGB", rgb.size, "white")
                difference = ImageChops.difference(rgb, white).convert("L")
                content_box = difference.point(lambda value: 255 if value > 18 else 0).getbbox()
                if content_box:
                    left, top, right, bottom = content_box
                    pad = max(12, round(max(right - left, bottom - top) * .04))
                    source = source.crop(
                        (
                            max(0, left - pad),
                            max(0, top - pad),
                            min(source.width, right + pad),
                            min(source.height, bottom + pad),
                        )
                    )
            source.thumbnail((640, 260), Image.Resampling.LANCZOS)
            background = Image.new("RGBA", source.size, "white")
            background.alpha_composite(source)
            background.convert("RGB").save(output_path, "WEBP", quality=92, method=6)


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


def extract_domina(path: Path) -> list[dict[str, Any]]:
    rows = first_sheet_rows(path)
    products = []
    for row in rows[1:]:
        values = list(row) + [None] * max(0, 8 - len(row))
        name = clean(values[1])
        composition = clean(values[2])
        if not name or not composition:
            continue
        package = clean(values[3])
        nature = clean(values[4])
        description_parts = []
        if package:
            description_parts.append(f"التعبئة: {package}")
        if nature:
            description_parts.append(f"طبيعة الصنف: {nature}")
        product = make_product(
            path,
            name,
            description=" · ".join(description_parts),
            composition=composition,
            indication=values[5],
        )
        if product:
            products.append(product)
    return products


def attach_image_path(product: dict[str, Any], relative_path: str) -> None:
    product.setdefault("images", [])
    if relative_path not in product["images"]:
        product["images"].append(relative_path)
    product.setdefault("image", relative_path)


def save_golden_med_image(
    image: Any,
    page_number: int,
    source_modified_at: float,
) -> str:
    image_name = Path(image.name).stem
    safe_name = re.sub(r"[^a-z0-9]+", "-", image_name.casefold()).strip("-")
    output_name = f"gmp-p{page_number:02d}-{safe_name}.webp"
    output_path = IMAGE_DIR / output_name
    if output_path.exists() and output_path.stat().st_mtime >= source_modified_at:
        try:
            with Image.open(output_path) as cached_image:
                cached_image.verify()
            return f"/images/products/{output_name}"
        except Exception:
            output_path.unlink(missing_ok=True)
    source = ImageOps.exif_transpose(image.image.copy())
    source.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    if source.mode not in {"RGB", "RGBA"}:
        source = source.convert("RGBA" if "transparency" in source.info else "RGB")
    source.save(output_path, "WEBP", quality=90, method=4)
    return f"/images/products/{output_name}"


def golden_med_product_images(
    plumber_page: Any,
    pypdf_page: Any,
    page_number: int,
    source_modified_at: float,
) -> list[dict[str, Any]]:
    embedded_by_name = {
        Path(image.name).stem: image
        for image in pypdf_page.images
    }
    images = []
    for placement in plumber_page.images:
        # The repeated company logo is the only image in the upper-right header.
        if placement["x0"] > 600 and placement["top"] < 70:
            continue
        embedded = embedded_by_name.get(placement.get("name", ""))
        if embedded is None:
            continue
        images.append(
            {
                "name": placement["name"],
                "x0": placement["x0"],
                "top": placement["top"],
                "bottom": placement["bottom"],
                "path": save_golden_med_image(
                    embedded,
                    page_number,
                    source_modified_at,
                ),
            }
        )
    return images


def attach_golden_med_page_images(
    page_number: int,
    rows: list[dict[str, Any]],
    images: list[dict[str, Any]],
) -> None:
    remaining_images = list(images)
    if page_number == 17:
        flocosept_rows = rows[:4]
        flocosept_images = [image for image in images if image["bottom"] <= 312.6]
        flocosept_images.sort(
            key=lambda image: (
                0 if image["top"] < 180 else 1,
                image["x0"],
            )
        )
        if len(flocosept_rows) != 4 or len(flocosept_images) != 4:
            raise ValueError("Unexpected Golden Med Flocosept image layout on PDF page 17")
        for row, image in zip(flocosept_rows, flocosept_images):
            attach_image_path(row["product"], image["path"])
        remaining_images = [image for image in images if image not in flocosept_images]

    for image in remaining_images:
        matched_rows = [
            row
            for row in rows
            if image["top"] - 8 <= row["name_center"] <= image["bottom"] + 8
        ]
        if not matched_rows:
            raise ValueError(
                f"Could not map Golden Med image {image['name']} on PDF page {page_number}"
            )
        for row in matched_rows:
            attach_image_path(row["product"], image["path"])


def extract_golden_med(path: Path) -> list[dict[str, Any]]:
    reader = PdfReader(path)
    source_modified_at = path.stat().st_mtime
    products = []
    with pdfplumber.open(path) as document:
        for page_number, (plumber_page, pypdf_page) in enumerate(
            zip(document.pages, reader.pages), start=1
        ):
            tables = plumber_page.find_tables()
            if not tables:
                raise ValueError(f"Golden Med product table missing on PDF page {page_number}")
            product_table = max(tables, key=lambda table: table.bbox[2] - table.bbox[0])
            extracted_rows = product_table.extract()
            page_rows = []
            for table_row, values in zip(product_table.rows, extracted_rows):
                if len(values) < 3:
                    continue
                # The last three logical columns are indication, composition,
                # and product name. Some pages expose a fourth image column.
                _, raw_composition, raw_name = values[-3:]
                name = clean(raw_name)
                composition = clean(raw_composition)
                if not name or not composition:
                    continue
                if name in {"ج تنملا مسا", "اسم المنتج"}:
                    continue
                if "Golden Med Pharma" in name or "Pharmaceutical Industries" in name:
                    continue
                name_cells = [cell for cell in table_row.cells if cell]
                if not name_cells:
                    continue
                name_cell = max(name_cells, key=lambda cell: cell[0])
                product = make_product(path, name, composition=composition)
                if product:
                    page_rows.append(
                        {
                            "product": product,
                            "name_center": (name_cell[1] + name_cell[3]) / 2,
                        }
                    )
                    products.append(product)

            page_images = golden_med_product_images(
                plumber_page,
                pypdf_page,
                page_number,
                source_modified_at,
            )
            if page_rows and not page_images:
                raise ValueError(f"Golden Med product images missing on PDF page {page_number}")
            attach_golden_med_page_images(page_number, page_rows, page_images)
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
    if "GMP Products" in stem:
        return extract_golden_med(path)
    if "دومنا" in stem:
        return extract_domina(path)
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
    if source_path.suffix.lower() not in {".xlsx", ".docx", ".pdf"}:
        continue
    extracted = extract(source_path)
    all_products.extend(extracted)
    source_audit.append(
        {
            "source": source_path.name,
            "categoryBreakdown": dict(Counter(item["category"] for item in extracted)),
            "extractedRows": len(extracted),
        }
    )

# Two photographed products were not listed as text rows in the supplied files.
# Adding them here keeps the images and catalogue connected without inventing
# formulations or claims that were not provided.
advance_source = next(path for path in SOURCE_DIR.iterdir() if "أدفانس" in path.stem)
tanium_source = next(path for path in SOURCE_DIR.iterdir() if "تانيوم" in path.stem)
zaroza_source = next(path for path in SOURCE_DIR.iterdir() if "زاروزا" in path.stem)
all_products.extend(
    product
    for product in (
        make_product(advance_source, "اوزوكير D PLUS"),
        make_product(tanium_source, "Tanium Procapil Hair Serum سيروم بروكابيل للشعر"),
    )
    if product
)

# These products are clearly identified by the newly supplied manufacturer
# packaging but are absent from the spreadsheet. Only label-visible names and
# ingredients are recorded; no unsupported efficacy claims are introduced.
all_products.extend(
    product
    for product in (
        make_product(
            zaroza_source,
            "ZAROZA ANTI-BLEMISH COLLAGEN WRAPPING GEL MASK 50ml",
            composition="Mango, Alpha-Arbutin, Botanical Collagen, Hyaluronic Acid",
        ),
        make_product(
            zaroza_source,
            "ZAROZA COLLAGEN WRAPPING GEL MASK 50ml",
            composition="Vitamin C, Ceramide NP, Botanical Collagen, Hyaluronic Acid",
        ),
        make_product(
            zaroza_source,
            "ZAROZA MOISTURISING COLLAGEN WRAPPING GEL MASK 50ml",
            composition="Blueberry, Botanical Collagen, Hyaluronic Acid",
        ),
        make_product(
            zaroza_source,
            "ZAROZA BRIGHTENING COLLAGEN WRAPPING GEL MASK 50ml",
            composition="Lemon, Mandarin, Vitamin C, Botanical Collagen, Hyaluronic Acid",
        ),
        make_product(
            zaroza_source,
            "ZAROZA 2 MONTHS HAIR CARE SET",
            description="Two-month Zaroza hair-care set shown in the supplied manufacturer packaging.",
        ),
        make_product(
            zaroza_source,
            "ZAROZA HAIR CARE SET — SENSITIVE SHAMPOO + 8 AMPOULES",
            description="Boxed Zaroza hair-care set containing Sensitive Shampoo and eight ampoules.",
        ),
    )
    if product
)

deduplicated: list[dict[str, Any]] = []
duplicates: list[dict[str, str]] = []
seen: dict[str, dict[str, Any]] = {}
for product in all_products:
    duplicate_key = f"{product['category']}|{product['company']['en']}|{key_text(product['name'])}"
    if duplicate_key in seen:
        kept = seen[duplicate_key]
        for image in product.get("images", []):
            kept.setdefault("images", [])
            if image not in kept["images"]:
                kept["images"].append(image)
        for field in ("description", "composition", "indication"):
            if not kept.get(field) and product.get(field):
                kept[field] = product[field]
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

image_matches = attach_supplied_images(deduplicated)
build_brand_logos()

for product in deduplicated:
    product.pop("source", None)
    if product["officialName"] == product["name"]:
        product["officialName"] = ""
    for field in ("officialName", "description", "composition", "indication"):
        if not product[field]:
            product.pop(field)
    if product.get("images"):
        product["images"] = list(dict.fromkeys(product["images"]))

referenced_images = {product.get("image") for product in deduplicated if product.get("image")}
referenced_images.update(
    image for product in deduplicated for image in product.get("images", [])
)
for generated_image in IMAGE_DIR.glob("catalog-*.webp"):
    relative_image = f"/images/products/{generated_image.name}"
    if relative_image not in referenced_images:
        generated_image.unlink()
for generated_image in IMAGE_DIR.glob("product-*.webp"):
    relative_image = f"/images/products/{generated_image.name}"
    if relative_image not in referenced_images:
        generated_image.unlink()
for generated_image in IMAGE_DIR.glob("gmp-*.webp"):
    relative_image = f"/images/products/{generated_image.name}"
    if relative_image not in referenced_images:
        generated_image.unlink()

deduplicated.sort(key=lambda product: (product["category"], product["company"]["en"], product["name"].casefold()))
catalogue = {
    "medicine": [product for product in deduplicated if product["category"] == "medicine"],
    "cosmetics": [product for product in deduplicated if product["category"] == "cosmetics"],
    "supplements": [product for product in deduplicated if product["category"] == "supplements"],
}
audit = {
    "sources": source_audit,
    "rawExtractedRows": len(all_products),
    "duplicateRowsRemoved": len(duplicates),
    "uniqueProducts": len(deduplicated),
    "categoryCounts": {category: len(products) for category, products in catalogue.items()},
    "productsWithImages": sum(1 for product in deduplicated if product.get("image")),
    "duplicates": duplicates,
    "suppliedImageMatches": image_matches,
}

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
for category, products in catalogue.items():
    (OUTPUT_DIR / f"products-{category}.json").write_text(
        json.dumps(products, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
AUDIT_PATH.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({key: value for key, value in audit.items() if key != "duplicates"}, ensure_ascii=False, indent=2))
