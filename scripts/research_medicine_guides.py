from __future__ import annotations

import argparse
import json
import re
import sys
import time
import unicodedata
from dataclasses import dataclass, asdict
from datetime import date
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Callable
from urllib.parse import urljoin
from urllib.request import Request, urlopen

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_PATH = ROOT / "public" / "data" / "products-medicine.json"
OUTPUT_PATH = ROOT / "public" / "data" / "medicine-guides.json"
AUDIT_PATH = ROOT / "content" / "medicine-research-audit.json"
REPORT_PATH = ROOT / "content" / "medicine-research-report.md"
CACHE_DIR = ROOT / ".cache" / "medicine-research"
TODAY = date.today().isoformat()
USER_AGENT = "Mozilla/5.0 (compatible; SaksoukMedicineCatalogue/1.0; +https://github.com/Amir-fan/saksouk.drugstore)"
OFFLINE = False
sys.stdout.reconfigure(encoding="utf-8")

ARABIC_MARKS = re.compile(r"[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed]")
NON_WORD = re.compile(r"[^0-9a-z\u0600-\u06ff]+")
PACK_WORDS = re.compile(
    r"\b(?:tab(?:lets?)?|cap(?:sules?)?|syr(?:up)?|susp(?:ension)?|amp(?:oules?)?|vials?|drops?|cream|gel|spray|sachets?|suppositor(?:y|ies)|solution|film coated|f\.?c\.?)\b",
    re.I,
)


def clean(value: Any) -> str:
    if value is None:
        return ""
    value = unicodedata.normalize("NFKC", str(value)).replace("\xa0", " ")
    return " ".join(value.replace("\r", " ").replace("\n", " ").split()).strip(" -–—|،,")


def key(value: str, *, strip_pack: bool = False) -> str:
    value = clean(value).casefold().translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))
    value = ARABIC_MARKS.sub("", value)
    value = value.translate(str.maketrans({"أ": "ا", "إ": "ا", "آ": "ا", "ى": "ي", "ة": "ه", "ؤ": "و", "ئ": "ي"}))
    if strip_pack:
        value = PACK_WORDS.sub(" ", value)
        value = re.sub(r"\b\d+\s*(?:x|×|حبه|حبة)\b", " ", value, flags=re.I)
    return NON_WORD.sub("", value)


def words(value: str) -> set[str]:
    value = clean(value).casefold().translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))
    value = ARABIC_MARKS.sub("", value)
    return {part for part in NON_WORD.sub(" ", value).split() if len(part) > 1}


def numbers(value: str) -> set[str]:
    return set(re.findall(r"\d+(?:[.,]\d+)?", value.translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))))


FORM_MARKERS = {
    "tablet": ("tablet", "tab", "اقراص", "أقراص", "قرص"),
    "capsule": ("capsule", "cap", "كبسول", "كبسولة"),
    "syrup": ("syrup", "syr", "شراب"),
    "suppository": ("suppository", "suppositories", "تحاميل", "تحميلة"),
    "ampoule": ("ampoule", "ampoules", "amp", "امبول", "أمبول"),
    "ovule": ("ovule", "ovules", "بيوض", "بويضات"),
    "suspension": ("suspension", "susp", "معلق", "معلّق"),
    "drops": ("drops", "drop", "قطرة", "قطرات"),
    "cream": ("cream", "كريم"),
    "gel": ("gel", "جل", "هلام"),
    "spray": ("spray", "بخاخ", "رذاذ"),
    "vial": ("vial", "فيال", "قارورة"),
}


def form_keys(value: str) -> set[str]:
    normalized = clean(value).casefold().translate(str.maketrans({"إ": "ا", "أ": "ا", "آ": "ا"}))
    return {form for form, markers in FORM_MARKERS.items() if any(marker.casefold().translate(str.maketrans({"إ": "ا", "أ": "ا", "آ": "ا"})) in normalized for marker in markers)}


def fetch(url: str, *, binary: bool = False, refresh: bool = False) -> bytes | str:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_key = re.sub(r"[^a-zA-Z0-9._-]+", "_", url)[:170]
    cache_path = CACHE_DIR / cache_key
    if cache_path.exists() and not refresh:
        payload = cache_path.read_bytes()
    else:
        if OFFLINE:
            raise FileNotFoundError(f"No cached response for {url}")
        request = Request(url, headers={"User-Agent": USER_AGENT, "Accept-Language": "en,ar;q=0.9"})
        with urlopen(request, timeout=35) as response:
            payload = response.read()
        cache_path.write_bytes(payload)
        time.sleep(0.08)
    if binary:
        return payload
    return payload.decode("utf-8", errors="replace")


def tree(url: str, *, refresh: bool = False) -> html.HtmlElement:
    return html.fromstring(fetch(url, refresh=refresh), base_url=url)


def node_text(node: Any) -> str:
    return clean(" ".join(node.itertext())) if node is not None else ""


def first_text(doc: html.HtmlElement, selectors: list[str]) -> str:
    for selector in selectors:
        if selector.startswith("."):
            class_name = selector[1:]
            xpath = f'//*[contains(concat(" ", normalize-space(@class), " "), " {class_name} ")]'
        elif "." in selector:
            tag, class_name = selector.split(".", 1)
            xpath = f'//{tag}[contains(concat(" ", normalize-space(@class), " "), " {class_name} ")]'
        else:
            xpath = f"//{selector}"
        nodes = doc.xpath(xpath)
        if nodes:
            value = node_text(nodes[0])
            if value:
                return value
    return ""


@dataclass
class SourceRecord:
    manufacturer: str
    name_en: str
    name_ar: str = ""
    active_en: str = ""
    active_ar: str = ""
    strength_en: str = ""
    strength_ar: str = ""
    form_en: str = ""
    form_ar: str = ""
    use_en: str = ""
    use_ar: str = ""
    source_url: str = ""
    source_label_en: str = "Official manufacturer product page"
    source_label_ar: str = "صفحة المنتج الرسمية للشركة المصنّعة"


def labelled_value(doc: html.HtmlElement, labels: tuple[str, ...]) -> str:
    labels_lower = tuple(label.casefold() for label in labels)
    for element in doc.xpath("//*[self::p or self::div or self::li or self::td or self::span]"):
        text_value = node_text(element)
        lowered = text_value.casefold()
        for label in labels_lower:
            if lowered.startswith(label):
                value = clean(text_value[len(label):].lstrip(" :：-"))
                if value and value.casefold() not in labels_lower:
                    return value
    return ""


def scrape_biomed(refresh: bool) -> list[SourceRecord]:
    records: list[SourceRecord] = []
    links: dict[str, str] = {}
    for page in range(1, 5):
        url = "https://www.biomedpharma-sy.com/Products/s_b/En" + (f"/{page}" if page > 1 else "")
        try:
            doc = tree(url, refresh=refresh)
        except Exception as exc:
            print(f"  BioMed index page {page} skipped: {exc}")
            continue
        for anchor in doc.xpath('//a[contains(@href,"/Products/") and contains(@href,".htm/En")]'):
            href = urljoin(url, anchor.get("href"))
            title = first_text(anchor, ["h4", "h3", ".title"]) or node_text(anchor)
            if title:
                links[href] = title
    for index, (url, index_name) in enumerate(links.items(), 1):
        try:
            doc = tree(url, refresh=refresh)
        except Exception as exc:
            print(f"  BioMed product skipped: {url} ({exc})")
            continue
        name = first_text(doc, ["h2.product-title", "h1", "h2.title", "h3.title", "h4.title"]) or index_name
        meta_description = doc.xpath('//meta[@name="description"]/@content | //meta[@property="og:description"]/@content')
        composition = clean(meta_description[0]) if meta_description else ""
        if composition:
            composition = clean(re.split(r"(?i)\b(?:description(?:\s+and\s+usage)?|properties|indications?|used|mechanism\s+of\s+action|pharmacology)\s*:", composition, maxsplit=1)[0])
            composition = clean(re.sub(r"(?i)^composition\s*:\s*", "", composition))
        if not composition:
            composition = labelled_value(doc, ("composition", "each tablet contains", "each capsule contains", "each 5 ml contains"))
        form = labelled_value(doc, ("pharmaceutical form", "dosage form"))
        use = labelled_value(doc, ("used", "indications", "indication"))
        scientific = ""
        cards = doc.xpath('//h5[contains(@class,"sub-title")]')
        if cards:
            scientific = node_text(cards[0])
        records.append(SourceRecord("Biomed", name_en=name, active_en=composition or scientific, form_en=form, use_en=use, source_url=url))
        if index % 25 == 0:
            print(f"  BioMed {index}/{len(links)}")
    return records


def scrape_hama(refresh: bool) -> list[SourceRecord]:
    links: dict[str, str] = {}
    for page in range(1, 9):
        url = "https://hama-pharma.com/all-medicines/" if page == 1 else f"https://hama-pharma.com/all-medicines/page/{page}/"
        doc = tree(url + "?lang=en", refresh=refresh)
        for anchor in doc.xpath('//a[contains(@href,"/product/")]'):
            href = anchor.get("href", "").split("?")[0]
            title = node_text(anchor)
            if href and title:
                links[href] = title
    records: list[SourceRecord] = []
    for index, (base_url, index_name) in enumerate(links.items(), 1):
        url_en = base_url + "?lang=en"
        doc_en = tree(url_en, refresh=refresh)
        name_en = first_text(doc_en, ["h1.product-title", "h1.entry-title", "h1"]) or index_name
        active_en = labelled_value(doc_en, ("chemical composition", "composition", "active ingredient"))
        use_en = labelled_value(doc_en, ("indications", "indication"))
        short = first_text(doc_en, [".product-short-description", ".woocommerce-product-details__short-description"])
        if not active_en and short:
            match = re.search(r"(?is)chemical composition\s*:?\s*(.+?)(?:indications?|dosage|pack|$)", short)
            active_en = clean(match.group(1)) if match else ""
        url_ar = base_url + "?lang=ar"
        try:
            doc_ar = tree(url_ar, refresh=refresh)
            name_ar = first_text(doc_ar, ["h1.product-title", "h1.entry-title", "h1"])
            active_ar = labelled_value(doc_ar, ("التركيب الكيميائي", "التركيب", "المادة الفعالة"))
            use_ar = labelled_value(doc_ar, ("الاستطبابات", "الاستطباب", "الاستخدامات"))
        except Exception:
            name_ar = active_ar = use_ar = ""
        records.append(SourceRecord("Hama Pharma", name_en=name_en, name_ar=name_ar, active_en=active_en, active_ar=active_ar, use_en=use_en, use_ar=use_ar, source_url=url_en))
        if index % 20 == 0:
            print(f"  Hama Pharma {index}/{len(links)}")
    return records


def scrape_kimi(refresh: bool) -> list[SourceRecord]:
    index_url = "https://www.kimi-pharma.com/en/products"
    doc = tree(index_url, refresh=refresh)
    links = sorted({urljoin(index_url, href) for href in doc.xpath('//a[contains(@href,"/en/products/")]/@href') if re.search(r"/products/\d+", href)})
    records: list[SourceRecord] = []
    for url_en in links:
        product_id = url_en.rstrip("/").split("/")[-1]
        url_ar = f"https://www.kimi-pharma.com/ar/products/{product_id}"
        try:
            doc_en = tree(url_en, refresh=refresh)
            doc_ar = tree(url_ar, refresh=refresh)
        except Exception as exc:
            print(f"  Kimi product {product_id} skipped: {exc}")
            continue
        name_en = first_text(doc_en, [".item-detail-title", "h1", "h2"])
        name_ar = first_text(doc_ar, [".item-detail-title", "h1", "h2"])
        records.append(SourceRecord(
            "Kimi", name_en=name_en, name_ar=name_ar,
            active_en=labelled_value(doc_en, ("chemical composition",)),
            active_ar=labelled_value(doc_ar, ("التركيب الكيميائي",)),
            strength_en=labelled_value(doc_en, ("concentrations", "concentration")),
            strength_ar=labelled_value(doc_ar, ("التركيز",)),
            form_en=labelled_value(doc_en, ("dosage form",)),
            form_ar=labelled_value(doc_ar, ("الشكل الصيدلي",)),
            use_en=labelled_value(doc_en, ("indications", "indication")),
            use_ar=labelled_value(doc_ar, ("الاستطباب", "الاستطبابات")),
            source_url=url_en,
        ))
    return records


def scrape_zein(refresh: bool) -> list[SourceRecord]:
    index_url = "https://www.zein-pharma.com/products/"
    links: set[str] = set()
    for page in range(1, 15):
        page_url = index_url if page == 1 else f"https://www.zein-pharma.com/products/page/{page}/"
        try:
            doc = tree(page_url, refresh=refresh)
        except Exception:
            break
        page_links = {urljoin(index_url, href) for href in doc.xpath('//a[contains(@href,"/product/")]/@href')}
        if not page_links or page_links.issubset(links):
            break
        links.update(page_links)
    records: list[SourceRecord] = []
    for index, url in enumerate(sorted(links), 1):
        try:
            product = tree(url, refresh=refresh)
        except Exception as exc:
            print(f"  Zein product skipped: {url} ({exc})")
            continue
        records.append(SourceRecord(
            "Zein Pharma",
            name_en=first_text(product, ["h1", ".product_title", ".entry-title"]),
            active_en=labelled_value(product, ("active ingredient(s)", "active ingredients", "active ingredient")),
            strength_en=labelled_value(product, ("dosage", "strength")),
            form_en=labelled_value(product, ("form & pack size", "dosage form")),
            use_en=labelled_value(product, ("indication", "indications")),
            source_url=url,
        ))
        if index % 25 == 0:
            print(f"  Zein Pharma {index}/{len(links)}")
    return records


def scrape_shifa(refresh: bool) -> list[SourceRecord]:
    records: list[SourceRecord] = []
    for page in range(1, 60):
        url = f"https://www.shifapharma.com/get-products?page={page}"
        payload = json.loads(fetch(url, refresh=refresh))
        fragment = payload.get("productsHtml", "")
        if not clean(fragment):
            break
        doc = html.fromstring(f"<main>{fragment}</main>", base_url="https://www.shifapharma.com/all-products")
        buttons = doc.xpath('//*[@data-title or @data-composition]')
        before = len(records)
        for item in buttons:
            name_ar = clean(item.get("data-title"))
            if not name_ar:
                continue
            raw_composition = item.get("data-composition", "")
            active_en = active_ar = ""
            try:
                compositions = json.loads(raw_composition)
                active_en = " + ".join(filter(None, (clean(part.get("title_en")) for part in compositions)))
                active_ar = " + ".join(filter(None, (clean(part.get("title_ar")) for part in compositions)))
            except Exception:
                active_ar = clean(raw_composition)
            records.append(SourceRecord(
                "Shifa", name_en=clean(item.get("data-title-en")), name_ar=name_ar,
                active_en=active_en, active_ar=active_ar,
                strength_ar=clean(item.get("data-pharmacitical")),
                form_ar=clean(item.get("data-type")),
                use_ar=clean(item.get("data-description")),
                source_url="https://www.shifapharma.com/all-products",
            ))
        if len(records) == before:
            break
    deduped: dict[str, SourceRecord] = {}
    for record in records:
        deduped[key(record.name_ar)] = record
    return list(deduped.values())


SCRAPERS: dict[str, Callable[[bool], list[SourceRecord]]] = {
    "Biomed": scrape_biomed,
    "Hama Pharma": scrape_hama,
    "Kimi": scrape_kimi,
    "Zein Pharma": scrape_zein,
    "Shifa": scrape_shifa,
}


def match_score(product: dict[str, Any], source: SourceRecord) -> float:
    candidates = [product.get("name", ""), product.get("officialName", "")]
    source_names = [source.name_en, source.name_ar]
    best = 0.0
    for product_name in candidates:
        for source_name in source_names:
            if not product_name or not source_name:
                continue
            exact_a, exact_b = key(product_name), key(source_name)
            base_a, base_b = key(product_name, strip_pack=True), key(source_name, strip_pack=True)
            if exact_a == exact_b:
                score = 1.0
            elif base_a == base_b and len(base_a) >= 4:
                score = 0.97
            else:
                score = max(SequenceMatcher(None, exact_a, exact_b).ratio(), SequenceMatcher(None, base_a, base_b).ratio())
                shared = words(product_name) & words(source_name)
                if shared:
                    score = max(score, len(shared) / max(1, min(len(words(product_name)), len(words(source_name)))))
            product_numbers, source_numbers = numbers(product_name), numbers(source_name)
            if product_numbers and source_numbers and not product_numbers.intersection(source_numbers):
                score -= 0.18
            product_forms = form_keys(product_name)
            source_forms = form_keys(" ".join((source.form_en, source.form_ar)))
            if product_forms and source_forms:
                score += 0.04 if product_forms.intersection(source_forms) else -0.12
            best = max(best, score)
    return max(0.0, min(1.0, best))


def localized(en: str = "", ar: str = "") -> dict[str, str]:
    en, ar = clean(en), clean(ar)
    result: dict[str, str] = {}
    if en:
        result["en"] = en
    if ar:
        result["ar"] = ar
    return result


def build_guide(product: dict[str, Any], source: SourceRecord | None, score: float = 0.0) -> dict[str, Any]:
    company = product["company"]
    composition = clean(product.get("composition"))
    if source and (source.active_en or source.active_ar):
        status = "manufacturer-verified"
        active = localized(source.active_en, source.active_ar)
        guide: dict[str, Any] = {
            "status": status,
            "manufacturer": company,
            "activeIngredients": active,
            "source": {
                "label": localized(source.source_label_en, source.source_label_ar),
                "url": source.source_url,
                "type": "official-manufacturer",
                "accessed": TODAY,
            },
            "match": {"sourceProduct": localized(source.name_en, source.name_ar), "confidence": round(score, 3)},
        }
        product_forms = form_keys(" ".join((clean(product.get("name")), clean(product.get("officialName")))))
        source_forms = form_keys(" ".join((source.form_en, source.form_ar)))
        safe_form = not product_forms or not source_forms or bool(product_forms.intersection(source_forms))
        for field, value in (
            ("strength", localized(source.strength_en, source.strength_ar)),
            ("dosageForm", localized(source.form_en, source.form_ar) if safe_form else {}),
            ("recognizedUse", localized(source.use_en, source.use_ar)),
        ):
            if value:
                guide[field] = value
        return guide
    if composition:
        return {
            "status": "catalogue-verified",
            "manufacturer": company,
            "activeIngredients": localized(composition, composition),
            "source": {
                "label": localized("Supplied Medico product catalogue", "كتالوج ميديكو المورّد"),
                "type": "supplied-catalogue",
                "accessed": TODAY,
            },
        }
    return {"status": "under-verification", "manufacturer": company}


def render_report(audit: dict[str, Any]) -> str:
    coverage = audit["coverage"]
    lines = [
        "# Saksouk medicine intelligence research report",
        "",
        f"Generated: {audit['generatedAt']}",
        "",
        "## Scope and safety standard",
        "",
        "This research powers a static bilingual product-information guide. It prioritizes exact manufacturer pages and the supplied Medico catalogue. It intentionally excludes dosing advice, diagnosis, contraindication interpretation, interactions, and personalized treatment guidance.",
        "",
        "A medicine is marked **manufacturer verified** only when the catalogue item was conservatively matched to an official manufacturer product record containing an active ingredient or composition. Items without a reliable primary-source match remain **under verification** and expose no inferred ingredient claim.",
        "",
        "## Coverage",
        "",
        f"- Total catalogue medicines: {coverage['total']}",
        f"- Manufacturer verified: {coverage['manufacturerVerified']}",
        f"- Supplied-catalogue verified: {coverage['catalogueVerified']}",
        f"- Under verification: {coverage['underVerification']}",
        "",
        "## Coverage by manufacturer",
        "",
        "| Manufacturer | Total | Manufacturer verified | Catalogue verified | Under verification |",
        "|---|---:|---:|---:|---:|",
    ]
    for company, row in audit["byManufacturer"].items():
        lines.append(f"| {company} | {row['total']} | {row['manufacturerVerified']} | {row['catalogueVerified']} | {row['underVerification']} |")
    lines.extend([
        "",
        "## Primary sources",
        "",
        "- [BioMed official products](https://www.biomedpharma-sy.com/Products/s_b/En)",
        "- [Hama Pharma official medicines](https://hama-pharma.com/all-medicines/?lang=en)",
        "- [Kimi official products](https://www.kimi-pharma.com/en/products)",
        "- [Shifa official product catalogue](https://www.shifapharma.com/all-products)",
        "- [Zein Pharma official products](https://www.zein-pharma.com/products/)",
        "- Supplied file: `public/medecines/جميع اصناف شركة ميديكو.xlsx`",
        "",
        "## Limitations",
        "",
        "- Manufacturer catalogues may omit discontinued products, legacy brand variants, or export-only packs.",
        "- Brand spelling and pack-size differences are common. The matcher rejects weak or numerically conflicting matches.",
        "- English-only manufacturer data remains in its official scientific wording inside the Arabic interface rather than being medically reinterpreted.",
        "- Rasha, Ibn Hayan, and Almashreq records stay under verification unless their supplied catalogue contains a composition or an authoritative product source becomes available.",
        "",
    ])
    return "\n".join(lines)


def main() -> None:
    global OFFLINE
    parser = argparse.ArgumentParser()
    parser.add_argument("--refresh", action="store_true", help="Ignore cached manufacturer pages")
    parser.add_argument("--offline", action="store_true", help="Build only from already cached manufacturer pages")
    args = parser.parse_args()
    OFFLINE = args.offline
    products: list[dict[str, Any]] = json.loads(PRODUCTS_PATH.read_text(encoding="utf-8"))
    sources: dict[str, list[SourceRecord]] = {}
    errors: dict[str, str] = {}
    for manufacturer, scraper in SCRAPERS.items():
        print(f"Researching {manufacturer}…")
        try:
            sources[manufacturer] = scraper(args.refresh)
            print(f"  {len(sources[manufacturer])} official records")
        except Exception as exc:
            errors[manufacturer] = f"{type(exc).__name__}: {exc}"
            sources[manufacturer] = []
            print(f"  ERROR: {errors[manufacturer]}")

    guides: dict[str, dict[str, Any]] = {}
    review: list[dict[str, Any]] = []
    threshold = 0.78
    for product in products:
        company = product["company"]["en"]
        candidates = sorted(((match_score(product, record), record) for record in sources.get(company, [])), key=lambda pair: pair[0], reverse=True)
        best_score, best_source = candidates[0] if candidates else (0.0, None)
        runner_up = candidates[1][0] if len(candidates) > 1 else 0.0
        # Require a strong match and reject ambiguous alternatives. Exact matches are always accepted.
        accepted = best_source if best_score >= threshold and (best_score >= 0.97 or best_score - runner_up >= 0.055) else None
        guide = build_guide(product, accepted, best_score)
        guides[product["id"]] = guide
        if best_source and not accepted and best_score >= 0.55:
            review.append({
                "id": product["id"], "product": product["name"], "manufacturer": company,
                "candidate": best_source.name_en or best_source.name_ar, "score": round(best_score, 3), "runnerUp": round(runner_up, 3),
            })

    by_manufacturer: dict[str, dict[str, int]] = {}
    for product in products:
        company = product["company"]["en"]
        row = by_manufacturer.setdefault(company, {"total": 0, "manufacturerVerified": 0, "catalogueVerified": 0, "underVerification": 0})
        row["total"] += 1
        status = guides[product["id"]]["status"]
        row[{"manufacturer-verified": "manufacturerVerified", "catalogue-verified": "catalogueVerified", "under-verification": "underVerification"}[status]] += 1
    statuses = [guide["status"] for guide in guides.values()]
    audit = {
        "generatedAt": TODAY,
        "coverage": {
            "total": len(products),
            "manufacturerVerified": statuses.count("manufacturer-verified"),
            "catalogueVerified": statuses.count("catalogue-verified"),
            "underVerification": statuses.count("under-verification"),
        },
        "byManufacturer": dict(sorted(by_manufacturer.items())),
        "officialSourceRecords": {manufacturer: len(records) for manufacturer, records in sources.items()},
        "sourceErrors": errors,
        "manualReviewCandidates": review,
    }
    OUTPUT_PATH.write_text(json.dumps(guides, ensure_ascii=False, indent=2), encoding="utf-8")
    AUDIT_PATH.write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")
    REPORT_PATH.write_text(render_report(audit), encoding="utf-8")
    print(json.dumps(audit["coverage"], ensure_ascii=False))


if __name__ == "__main__":
    main()
