#!/usr/bin/env python3
"""
rebuild-air-fryer-db-i18n.py
─────────────────────────────
Build the air-fryer runtime database from four localized spreadsheets:
  ../errori-it.xlsx  ../errori-en.xlsx  ../errori-fr.xlsx  ../errori-es.xlsx

Run from:  micro-tools-suite/air-fryer/

Output:
  src/data/air-fryer-db.json
  scripts/air-fryer-import-report.json
"""

import json
import os
import re
import unicodedata
from collections import Counter, OrderedDict
from datetime import datetime, timezone
from pathlib import Path

from openpyxl import load_workbook

# ─── Configuration ───────────────────────────────────────────────────────────

LANGUAGES = ["it", "en", "fr", "es"]

EXCEL_FILES = {
    "it": "../errori-it.xlsx",
    "en": "../errori-en.xlsx",
    "fr": "../errori-fr.xlsx",
    "es": "../errori-es.xlsx",
}

OUTPUT_DB = "src/data/air-fryer-db.json"
OUTPUT_REPORT = "scripts/air-fryer-import-report.json"
IMAGES_DIR = "public/images/air-fryers"

# Header aliases per language → canonical internal name
HEADER_ALIASES = {
    # Brand
    "Marca": "brand", "Brand": "brand", "Marque": "brand",
    # Model (display name)
    "Modello": "model", "Model": "model", "Modèle": "model", "Modelo": "model",
    # Model Spec (always same header)
    "Model Spec": "model_spec",
    # Specifications
    "Specifiche": "specs", "Specifications": "specs",
    "Spécifications": "specs", "Especificaciones": "specs",
    # Errors
    "Errori": "errors", "Errors": "errors",
    "Erreurs": "errors", "Errores": "errors",
    # User Symptom
    "SintomoUtente": "user_symptom", "User Symptom": "user_symptom",
    "Symptôme Utilisateur": "user_symptom", "SíntomaUsuario": "user_symptom",
    # Manual URL
    "Link Manuale Utente": "manual_url", "User Manual Link": "manual_url",
    "Lien Manuel Utilisateur": "manual_url", "Enlace Manual Usuario": "manual_url",
    # Specs URL
    "Link Specifiche": "specs_url", "Specifications Link": "specs_url",
    "Lien Spécifications": "specs_url", "Enlace Especificaciones": "specs_url",
    # Classification
    "Classificazione": "classification", "Classification": "classification",
    "Clasificación": "classification",
}

# Severity normalization
SEVERITY_MAP = {
    # low
    "bassa": "low", "low": "low", "basse": "low", "baja": "low",
    # medium
    "media": "medium", "medium": "medium", "moyenne": "medium",
    # high
    "alta": "high", "high": "high", "haute": "high",
}

COLOR_MAP = {
    "low": "green",
    "medium": "yellow",
    "high": "red",
    "unknown": "unknown",
}

# ─── Helpers ─────────────────────────────────────────────────────────────────

def clean(value):
    if value is None:
        return ""
    return str(value).replace("\r\n", "\n").replace("\r", "\n").strip()


def slugify(value):
    value = unicodedata.normalize("NFKD", clean(value)).encode("ascii", "ignore").decode("ascii")
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value


def normalize_code(code):
    """Normalize an error code: strip spaces, uppercase, unify dashes."""
    return re.sub(r"\s+", "", code.upper().replace("–", "-").replace("—", "-"))


def parse_specs(raw):
    """Extract capacity_liters and wattage from spec text."""
    text = clean(raw)
    specs = {}
    capacity = re.search(
        r"(?:capacit[àa]|capacity)\s*:\s*([\d.,]+)\s*(?:l|litri|qt)",
        text, re.IGNORECASE
    )
    watts = re.search(
        r"(?:assorbimento|rated power|power|consumo|puissance)\s*:\s*([\d.,]+)\s*w",
        text, re.IGNORECASE
    )
    baskets = re.search(
        r"(?:numero di cestelli|basket count|nombre de paniers|número de cestas)\s*:\s*(\d+)",
        text, re.IGNORECASE
    )
    if capacity:
        specs["capacity_liters"] = float(capacity.group(1).replace(",", "."))
    if watts:
        specs["wattage"] = float(watts.group(1).replace(",", "."))
    if baskets:
        specs["basket_count"] = int(baskets.group(1))
    return specs


# ─── Error block parsing ────────────────────────────────────────────────────

# Regex to match error code markers like "E1", "E02", "E12", "E021"
ERROR_MARKER_RE = re.compile(
    r'^\s*(?:il\s+display\s+mostra\s+il\s+codice\s+errore\s*)?'
    r'["""\u201c\u201d]*\s*'
    r'(E\d{1,3})'
    r'\s*["""\u201c\u201d]*\s*[:.]?\s*$',
    re.IGNORECASE | re.MULTILINE,
)


def split_error_blocks(raw_text):
    """
    Split the Errors column into individual {code: ..., text: ...} blocks.
    Returns a list of dicts with 'code' and 'text' keys.
    """
    raw = clean(raw_text)
    if not raw:
        return []

    matches = list(ERROR_MARKER_RE.finditer(raw))
    if not matches:
        return []

    blocks = []
    for i, match in enumerate(matches):
        code = normalize_code(match.group(1))
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(raw)
        text = raw[start:end].strip(" \n\t.-")
        # Remove trailing quote artifacts
        text = re.sub(r'^["""\u201c\u201d]+\s*', '', text)
        text = re.sub(r'\s*["""\u201c\u201d]+$', '', text)
        if text:
            blocks.append({"code": code, "text": text})

    return blocks


# ─── Classification parsing ─────────────────────────────────────────────────

CLASSIFICATION_MARKER_RE = re.compile(
    r'["""\u201c\u201d]*\s*(E\d{1,3})\s*["""\u201c\u201d]*',
    re.IGNORECASE,
)

CLASSIFICATION_LABEL_RE = re.compile(
    r'(?:Classificazione|Classification|Clasificaci[oó]n)\s*:\s*(.+)',
    re.IGNORECASE,
)

SEVERITY_LABEL_RE = re.compile(
    r'(?:Gravit[àa]|Severity|Gravit[eé]|Gravedad)\s*:\s*(.+)',
    re.IGNORECASE,
)


def parse_classification_column(raw_text):
    """
    Parse the Classification column into a dict: {code: {classification, severity_label, severity_level, color}}.
    
    Expected format:
      "E1"
      Classificazione: Ripristino Termico Ambientale
      Gravità: Media
      
      "E2"
      ...
    """
    raw = clean(raw_text)
    if not raw:
        return {}

    result = {}
    lines = raw.split("\n")
    current_code = None
    current_classification = ""
    current_severity_label = ""

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Check for error code marker: a line that is mostly just an error code
        # Handle triple quotes, spaces, etc.
        stripped = line.strip(' \t""\u201c\u201d\'')
        code_match = re.match(r'^(E\d{1,3})\s*$', stripped, re.IGNORECASE)
        if code_match:
            # Save previous if exists
            if current_code:
                sev_level = SEVERITY_MAP.get(current_severity_label.lower().strip(), "unknown")
                result[current_code] = {
                    "classification": current_classification.strip(),
                    "severity_label": current_severity_label.strip(),
                    "severity_level": sev_level,
                    "color": COLOR_MAP.get(sev_level, "unknown"),
                }
            current_code = normalize_code(code_match.group(1))
            current_classification = ""
            current_severity_label = ""
            continue

        # Check for classification label
        cls_match = CLASSIFICATION_LABEL_RE.match(line)
        if cls_match:
            current_classification = cls_match.group(1).strip()
            continue

        # Check for severity label
        sev_match = SEVERITY_LABEL_RE.match(line)
        if sev_match:
            current_severity_label = sev_match.group(1).strip()
            continue

        # If we have a current code and no classification yet, this line might be
        # the classification without the "Classificazione:" prefix (e.g. "Errore Alimentazione Elettrica")
        if current_code and not current_classification:
            current_classification = line.strip()

    # Save last entry
    if current_code:
        sev_level = SEVERITY_MAP.get(current_severity_label.lower().strip(), "unknown")
        result[current_code] = {
            "classification": current_classification.strip(),
            "severity_label": current_severity_label.strip(),
            "severity_level": sev_level,
            "color": COLOR_MAP.get(sev_level, "unknown"),
        }

    return result


# ─── User symptom parsing ───────────────────────────────────────────────────

def parse_user_symptom(raw_text):
    """Return cleaned symptom text, or empty string if blank."""
    text = clean(raw_text)
    if not text:
        return ""
    # Remove surrounding quotes
    text = re.sub(r'^["""\u201c\u201d]+\s*', '', text)
    text = re.sub(r'\s*["""\u201c\u201d]+$', '', text)
    return text.strip()


# ─── Excel reading ──────────────────────────────────────────────────────────

def read_excel(filepath, lang):
    """
    Read an Excel file and return a list of row dicts with canonical keys.
    Each row also carries its 'lang' tag.
    """
    wb = load_workbook(filepath, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        raise SystemExit(f"The workbook {filepath} is empty.")

    # Map headers
    raw_headers = rows[0]
    headers = {}
    for idx, h in enumerate(raw_headers):
        h_clean = clean(str(h)) if h else ""
        canonical = HEADER_ALIASES.get(h_clean)
        if canonical:
            headers[canonical] = idx

    required = {"brand", "model", "model_spec", "errors"}
    missing = required - set(headers)
    if missing:
        raise SystemExit(f"[{lang}] Missing required columns in {filepath}: {', '.join(sorted(missing))}")

    data_rows = []
    for row_idx, row in enumerate(rows[1:], start=2):
        brand = clean(row[headers["brand"]]) if "brand" in headers else ""
        model = clean(row[headers["model"]]) if "model" in headers else ""
        model_spec = clean(row[headers["model_spec"]]) if "model_spec" in headers else ""
        if not brand or not model:
            continue

        data_rows.append({
            "lang": lang,
            "row_number": row_idx,
            "brand": brand,
            "model": model,
            "model_spec": model_spec,
            "specs_raw": clean(row[headers["specs"]]) if "specs" in headers else "",
            "errors_raw": clean(row[headers["errors"]]) if "errors" in headers else "",
            "user_symptom_raw": clean(row[headers["user_symptom"]]) if "user_symptom" in headers else "",
            "manual_url": clean(row[headers["manual_url"]]) if "manual_url" in headers else "",
            "specs_url": clean(row[headers["specs_url"]]) if "specs_url" in headers else "",
            "classification_raw": clean(row[headers["classification"]]) if "classification" in headers else "",
        })

    return data_rows


# ─── Reconciliation key ─────────────────────────────────────────────────────

def make_model_key(row):
    """
    Create a reconciliation key from brand_slug + model_spec.
    For models with duplicate model_specs (e.g. TurboBlaze vs TurboBlaze Smart),
    we append a slugified model name suffix.
    """
    brand_slug = slugify(row["brand"])
    spec_slug = slugify(row["model_spec"])
    return f"{brand_slug}:{spec_slug}"


def make_canonical_slug(brand, model_spec, model_name, disambiguate=False):
    """Build the canonical slug. Include model name if disambiguation is needed."""
    brand_slug = slugify(brand)
    spec_slug = slugify(model_spec or model_name)
    if disambiguate:
        name_slug = slugify(model_name)
        return f"{brand_slug}-{spec_slug}-{name_slug}"
    return f"{brand_slug}-{spec_slug}"


def make_route_slug(model_name_it):
    """Create a URL-friendly route slug from the IT model name."""
    return slugify(model_name_it)


# ─── Main build logic ───────────────────────────────────────────────────────

def build_database():
    """Main function: reads all Excel files, reconciles, outputs JSON."""
    
    # 1. Read all Excel files
    all_rows = {}  # lang -> list of row dicts
    for lang in LANGUAGES:
        filepath = EXCEL_FILES[lang]
        if not os.path.exists(filepath):
            raise SystemExit(f"Excel file not found: {filepath}")
        all_rows[lang] = read_excel(filepath, lang)
        print(f"  [{lang}] Read {len(all_rows[lang])} rows from {filepath}")

    # 2. Detect which model_specs need disambiguation
    # Check within each SINGLE language for multiple rows with same brand+model_spec.
    # This avoids treating translated names (IT vs EN) as different models.
    ambiguous_specs = set()
    for lang in LANGUAGES:
        spec_to_names = {}  # (brand_slug, spec_slug) -> set of model name slugs
        for row in all_rows[lang]:
            key = (slugify(row["brand"]), slugify(row["model_spec"]))
            if key not in spec_to_names:
                spec_to_names[key] = set()
            spec_to_names[key].add(slugify(row["model"]))
        for k, v in spec_to_names.items():
            if len(v) > 1:
                ambiguous_specs.add(k)
    
    if ambiguous_specs:
        print(f"  Ambiguous model_specs (need disambiguation): {ambiguous_specs}")

    # 3. Group rows by reconciliation key (brand_slug:spec_slug:name_slug)
    # For ambiguous specs, add the model name to the key
    def row_key(row):
        brand_slug = slugify(row["brand"])
        spec_slug = slugify(row["model_spec"])
        key_pair = (brand_slug, spec_slug)
        if key_pair in ambiguous_specs:
            name_slug = slugify(row["model"])
            return f"{brand_slug}:{spec_slug}:{name_slug}"
        return f"{brand_slug}:{spec_slug}"

    # Group: key -> {lang: row}
    grouped = OrderedDict()
    for lang in LANGUAGES:
        for row in all_rows[lang]:
            k = row_key(row)
            if k not in grouped:
                grouped[k] = {}
            grouped[k][lang] = row

    print(f"  Total unique models after reconciliation: {len(grouped)}")

    # 4. Build the database
    models = []
    report_rows = []
    parsing_errors = []
    symptom_stats = []

    for model_key, lang_rows in grouped.items():
        # Use IT as primary, fallback to first available
        primary_lang = "it" if "it" in lang_rows else next(iter(lang_rows))
        primary = lang_rows[primary_lang]

        brand = primary["brand"]
        brand_slug = slugify(brand)
        model_spec = primary["model_spec"]
        
        # Check if disambiguation is needed
        key_pair = (brand_slug, slugify(model_spec))
        needs_disambig = key_pair in ambiguous_specs
        
        canonical_slug = make_canonical_slug(
            brand, model_spec, primary["model"], disambiguate=needs_disambig
        )

        # Model names per language
        model_names = {}
        for lang in LANGUAGES:
            if lang in lang_rows:
                raw_name = lang_rows[lang]["model"]
                if brand.lower() == "philips":
                    raw_name = re.sub(
                        r'^(?:La\s+friggitrice\s+ad\s+aria|La\s+friteuse\s+[àa]\s+air|La\s+freidora\s+de\s+aire)\b', 
                        'Airfryer', 
                        raw_name, 
                        flags=re.IGNORECASE
                    )
                model_names[lang] = raw_name

        # Route slug from IT name, fallback to first available
        route_slug_name = model_names.get("it", next(iter(model_names.values())))
        route_slug = make_route_slug(route_slug_name)

        # Specs from IT (or first available)
        specs = parse_specs(primary.get("specs_raw", ""))

        # Source URLs from IT
        source = {
            "manual_url": primary.get("manual_url", ""),
            "specs_url": primary.get("specs_url", ""),
        }

        # 4a. Parse error blocks per language
        error_blocks_by_lang = {}  # lang -> {code: text}
        for lang in LANGUAGES:
            if lang not in lang_rows:
                continue
            blocks = split_error_blocks(lang_rows[lang]["errors_raw"])
            error_blocks_by_lang[lang] = {b["code"]: b["text"] for b in blocks}

        # 4b. Parse classification per language
        classification_by_lang = {}  # lang -> {code: {classification, severity_label, severity_level, color}}
        for lang in LANGUAGES:
            if lang not in lang_rows:
                continue
            cls = parse_classification_column(lang_rows[lang]["classification_raw"])
            classification_by_lang[lang] = cls

        # 4c. Parse user symptoms per language
        user_symptoms_by_lang = {}
        for lang in LANGUAGES:
            if lang not in lang_rows:
                continue
            sym = parse_user_symptom(lang_rows[lang]["user_symptom_raw"])
            if sym:
                user_symptoms_by_lang[lang] = sym

        # 4d. Collect all unique error codes across languages
        all_codes = set()
        for lang_blocks in error_blocks_by_lang.values():
            all_codes.update(lang_blocks.keys())
        
        # Sort codes naturally: E1, E2, E3, E4, E01, E02, E12, E21, E22, ...
        def code_sort_key(c):
            num = re.sub(r"[^0-9]", "", c)
            return (int(num) if num else 999, c)
        
        sorted_codes = sorted(all_codes, key=code_sort_key)

        # 4e. Build error_codes array
        error_codes = []
        for code in sorted_codes:
            localized = {}
            for lang in LANGUAGES:
                diag = error_blocks_by_lang.get(lang, {}).get(code, "")
                cls_data = classification_by_lang.get(lang, {}).get(code, {})
                sym = user_symptoms_by_lang.get(lang, "")
                
                localized[lang] = {
                    "diagnosis": diag,
                    "user_symptom": sym,
                    "classification": cls_data.get("classification", ""),
                    "severity_label": cls_data.get("severity_label", ""),
                }

            # Determine severity_level: prefer IT classification, then first non-empty
            severity_level = "unknown"
            color = "unknown"
            source_language = primary_lang
            for lang in LANGUAGES:
                cls_data = classification_by_lang.get(lang, {}).get(code, {})
                if cls_data.get("severity_level") and cls_data["severity_level"] != "unknown":
                    severity_level = cls_data["severity_level"]
                    color = cls_data.get("color", COLOR_MAP.get(severity_level, "unknown"))
                    source_language = lang
                    break

            # Find aliases: codes from same display group (e.g. E01/E21)
            aliases = []

            error_codes.append({
                "code": code,
                "display_code": code,
                "aliases": aliases,
                "localized": localized,
                "severity_level": severity_level,
                "color": color,
                "source_language": source_language,
                "source": source,
            })

            # Report row
            for lang in LANGUAGES:
                diag_text = localized[lang]["diagnosis"]
                report_rows.append({
                    "brand": brand,
                    "model_spec": model_spec,
                    "canonical_slug": canonical_slug,
                    "code": code,
                    "lang": lang,
                    "has_diagnosis": bool(diag_text),
                    "diagnosis_length": len(diag_text),
                    "has_classification": bool(localized[lang]["classification"]),
                    "classification": localized[lang]["classification"],
                    "severity_label": localized[lang]["severity_label"],
                    "severity_level": severity_level,
                    "color": color,
                })

            # Track parsing errors
            if severity_level == "unknown":
                parsing_errors.append({
                    "canonical_slug": canonical_slug,
                    "code": code,
                    "issue": "severity_level is unknown (classification parsing may have failed)",
                })

        # 4f. Check image
        image_path = f"/images/air-fryers/{brand_slug}/{canonical_slug}.webp"
        image_full_path = os.path.join(IMAGES_DIR, brand_slug, f"{canonical_slug}.webp")
        image_exists = os.path.exists(image_full_path)

        # Symptom stats
        for lang, sym in user_symptoms_by_lang.items():
            symptom_stats.append({
                "canonical_slug": canonical_slug,
                "lang": lang,
                "symptom_length": len(sym),
            })

        # Build model record
        model_record = {
            "canonical_slug": canonical_slug,
            "route_slug": route_slug,
            "brand_slug": brand_slug,
            "brand": brand,
            "model_names": model_names,
            "model_spec": model_spec,
            "specs": specs,
            "source": source,
            "image_path": image_path,
            "error_codes": error_codes,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }

        models.append(model_record)

    # 5. Image audit
    image_audit = []
    for model in models:
        brand_slug = model["brand_slug"]
        canonical_slug = model["canonical_slug"]
        img_file = os.path.join(IMAGES_DIR, brand_slug, f"{canonical_slug}.webp")
        exists = os.path.exists(img_file)
        image_audit.append({
            "canonical_slug": canonical_slug,
            "image_path": model["image_path"],
            "image_exists": exists,
            "image_status": "ok" if exists else "missing",
        })

    # 6. Duplicate slug check
    slug_counts = Counter(m["canonical_slug"] for m in models)
    duplicate_slugs = [slug for slug, count in slug_counts.items() if count > 1]

    # 7. Build report
    severity_counts = Counter(r["severity_level"] for r in report_rows)
    lang_counts = Counter(r["lang"] for r in report_rows if r["has_diagnosis"])

    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "input_files": {lang: EXCEL_FILES[lang] for lang in LANGUAGES},
        "model_count": len(models),
        "error_code_count": len(set((r["canonical_slug"], r["code"]) for r in report_rows)),
        "codes_per_model": {
            m["canonical_slug"]: [ec["code"] for ec in m["error_codes"]]
            for m in models
        },
        "languages_imported": LANGUAGES,
        "diagnosis_by_language": dict(lang_counts),
        "severity_distribution": dict(severity_counts),
        "duplicate_canonical_slugs": duplicate_slugs,
        "parsing_errors": parsing_errors,
        "image_audit": image_audit,
        "images_missing": [ia for ia in image_audit if not ia["image_exists"]],
        "user_symptom_stats": symptom_stats,
        "detail_rows": report_rows,
    }

    # 8. Write outputs
    output_path = Path(OUTPUT_DB)
    report_path = Path(OUTPUT_REPORT)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.parent.mkdir(parents=True, exist_ok=True)

    output_path.write_text(
        json.dumps(models, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    report_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    # 9. Summary
    print(f"\n{'='*60}")
    print(f"Generated {output_path}: {len(models)} models")
    print(f"Generated {report_path}")
    print(f"  Error codes total: {report['error_code_count']}")
    print(f"  Languages: {', '.join(LANGUAGES)}")
    print(f"  Severity distribution: {dict(severity_counts)}")
    print(f"  Parsing errors: {len(parsing_errors)}")
    print(f"  Images missing: {len(report['images_missing'])}")
    print(f"  User symptoms populated: {len(symptom_stats)}")
    if duplicate_slugs:
        print(f"  WARNING: Duplicate slugs: {', '.join(duplicate_slugs)}")
    if parsing_errors:
        print(f"  WARNING: Parsing errors:")
        for pe in parsing_errors:
            print(f"    - {pe['canonical_slug']} / {pe['code']}: {pe['issue']}")
    print(f"{'='*60}")

    if duplicate_slugs:
        raise SystemExit(f"FATAL: Duplicate canonical slugs found: {', '.join(duplicate_slugs)}")


if __name__ == "__main__":
    build_database()
