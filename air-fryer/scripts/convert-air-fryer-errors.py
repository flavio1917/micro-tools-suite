import pandas as pd
import json
import re
import os
from datetime import datetime

# Input and output paths
INPUT_FILE = 'src/data/i18n/Errori.xlsx'
OUTPUT_DB = 'src/data/air-fryer-db.json'
REPORT_FILE = 'scripts/conversion_report.json'

def normalize_slug(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clean_model_spec(spec):
    if not isinstance(spec, str):
        return ""
    # Remove spurious text like "Power Supply" etc, but keep it simple for now
    spec = spec.replace("Power Supply", "").strip()
    return spec

def parse_specs(specs_text):
    if not isinstance(specs_text, str):
        return {}
    
    specs = {}
    lines = specs_text.split('\n')
    for line in lines:
        line = line.strip()
        if ':' in line:
            key, val = line.split(':', 1)
            key = key.strip().lower()
            val = val.strip()
            
            if 'assorbimento' in key or 'watt' in key:
                match = re.search(r'(\d+)', val)
                if match: specs['wattage'] = int(match.group(1))
            elif 'voltaggio' in key:
                specs['voltage'] = val
            elif 'frequenza' in key:
                match = re.search(r'(\d+)', val)
                if match: specs['frequency_hz'] = int(match.group(1))
            elif 'capacit' in key:
                match = re.search(r'(\d+[.,]?\d*)', val)
                if match: specs['capacity_liters'] = float(match.group(1).replace(',', '.'))
            elif 'peso' in key:
                match = re.search(r'(\d+[.,]?\d*)', val)
                if match: specs['weight_kg'] = float(match.group(1).replace(',', '.'))
            elif 'cestell' in key and 'numero' in key:
                match = re.search(r'(\d+)', val)
                if match: specs['basket_count'] = int(match.group(1))
            elif 'temperatura massima' in key:
                match = re.search(r'(\d+)', val)
                if match: specs['max_temp_celsius'] = int(match.group(1))
            elif 'connettivit' in key:
                if 'non' in val.lower() or 'no' in val.lower():
                    specs['connectivity'] = False
                elif 's' in val.lower():
                    specs['connectivity'] = True
    return specs

def parse_error_codes(errors_text):
    if not isinstance(errors_text, str):
        return []
    
    codes = []
    matches = re.finditer(r'"(E\d+)"', errors_text)
    found_codes = set()
    for match in matches:
        code = match.group(1)
        if code not in found_codes:
            codes.append({
                "code": code,
                "severity": "stop_and_support", # default to highest safety unless known, or mark for review
                "evidence_level": "model_specific",
                "diy_fixable": False,
                "source": {} # to be filled by caller
            })
            found_codes.add(code)
    return codes

def main():
    try:
        df = pd.read_excel(INPUT_FILE)
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return

    models = []
    
    counts = {
        "total_records": 0,
        "unique_model_specs": 0,
        "potential_duplicates": 0,
        "unresolved_variants": 0,
        "indexable_records": 0,
        "noindex_records": 0,
        "fallback_only_records": 0,
        "missing_severity": 0,
        "missing_evidence_level": 0,
        "missing_sources": 0,
        "missing_translations": 0,
        "manual_review_records": 0
    }

    report = {
        "incomplete_records": [],
        "potential_duplicates": [],
        "variants_to_review": [],
        "manual_review_needed": [],
        "counts": counts
    }

    seen_slugs = {}
    unique_specs = set()
    
    # Pre-process to identify duplicates (which means we have multiple rows with same canonical_slug)
    slug_counts = {}
    for idx, row in df.iterrows():
        brand = row.get('Marca', '')
        model_name = row.get('Modello', '')
        model_spec = clean_model_spec(row.get('Model Spec', ''))
        brand_slug = normalize_slug(brand)
        canonical_slug = f"{brand_slug}-{normalize_slug(model_spec) or normalize_slug(model_name)}"
        slug_counts[canonical_slug] = slug_counts.get(canonical_slug, 0) + 1

    for idx, row in df.iterrows():
        counts["total_records"] += 1
        
        brand = row.get('Marca', '')
        model_name = row.get('Modello', '')
        raw_model_spec = str(row.get('Model Spec', ''))
        model_spec = clean_model_spec(raw_model_spec)
        specs_text = row.get('Specifiche', '')
        errors_text = row.get('Errori', '')
        symptoms_text = row.get('SintomoUtente', '')
        manual_url = row.get('Link Manuale Utente', '')
        specs_url = row.get('Link Specifiche', '')

        brand_slug = normalize_slug(brand)
        canonical_slug = f"{brand_slug}-{normalize_slug(model_spec) or normalize_slug(model_name)}"
        
        if model_spec:
            unique_specs.add(normalize_slug(model_spec))

        if not brand or not model_name:
            report["incomplete_records"].append(f"Row {idx+2}: Missing brand or model name")
            # We don't continue so we can still output a fallback_only record maybe, but for now let's just create it with empty names
            
        specs = parse_specs(specs_text)
        
        source_ref = {
            "manual_url": manual_url if pd.notna(manual_url) else None,
            "specs_url": specs_url if pd.notna(specs_url) else None,
            "source_language": "it", # Assuming italian as default from this excel
            "retrieved_at": datetime.now().isoformat() + "Z"
        }

        error_codes = parse_error_codes(errors_text)
        for ec in error_codes:
            ec["source"] = source_ref

        is_dup = slug_counts.get(canonical_slug, 0) > 1
        parsing_status = 'parsed'
        review_status = 'approved'
        is_deduplication_validated = True
        
        if is_dup:
            counts["potential_duplicates"] += 1
            is_deduplication_validated = False
            parsing_status = 'manual_review'
            review_status = 'pending'
            
        # specifically requested groups
        if canonical_slug in ["cosori-caf-dc601-kus", "cosori-caf-r901-aus"]:
            is_deduplication_validated = False
            parsing_status = 'manual_review'
            review_status = 'pending'
            counts["unresolved_variants"] += 1

        if pd.notna(errors_text) and str(errors_text).strip() and not error_codes:
            parsing_status = 'manual_review'
            review_status = 'pending'

        if parsing_status == 'manual_review':
            counts["manual_review_records"] += 1

        # We assume noindex for all because translations are missing for the new dataset usually
        # But let's evaluate SEO status
        seo_status = 'noindex'
        
        has_source = bool(source_ref["manual_url"] or source_ref["specs_url"])
        if not has_source:
            counts["missing_sources"] += 1
            
        has_all_evidence = True
        has_all_severity = True
        for ec in error_codes:
            if not ec.get("severity"):
                has_all_severity = False
                counts["missing_severity"] += 1
            if not ec.get("evidence_level"):
                has_all_evidence = False
                counts["missing_evidence_level"] += 1

        # For milestone 1.1 we assume translations are missing because they aren't generated by Python
        counts["missing_translations"] += 1
        translations_complete = False 
        
        indexable_conds = [
            bool(model_spec),
            bool(canonical_slug),
            bool(model_name),
            len(specs) >= 2,
            len(error_codes) >= 1,
            has_all_severity,
            has_all_evidence,
            has_source,
            is_deduplication_validated,
            translations_complete
        ]
        
        if all(indexable_conds):
            seo_status = 'indexable'
            counts["indexable_records"] += 1
        elif bool(model_name) and bool(canonical_slug):
            seo_status = 'noindex'
            counts["noindex_records"] += 1
        else:
            seo_status = 'fallback_only'
            counts["fallback_only_records"] += 1
            
        metadata = {
            "source_row_numbers": [idx + 2],
            "raw_model_spec": raw_model_spec if pd.notna(raw_model_spec) else "",
            "parsing_status": parsing_status,
            "review_status": review_status,
            "duplicate_group": canonical_slug if is_dup else None
        }

        # Handle appending dupes as distinct variants for now, modify canonical slug slightly for JSON output if not deduplicated?
        # The instructions say: "Non unirli automaticamente. Mantienili bloccati o marcati manual_review finché l’equivalenza non è validata."
        # If we keep them with the SAME canonical_slug, the JSON will have duplicates. The validator TS will block it!
        # This is exactly what is required: "Rendi bloccante la deduplicazione non validata." 
        # So we keep the identical canonical slug for duplicates.

        model_record = {
            "canonical_slug": canonical_slug,
            "model_spec": model_spec,
            "primary_display_name": model_name,
            "display_names": [model_name],
            "brand_slug": brand_slug,
            "specs": specs,
            "error_codes": error_codes,
            "symptoms": [], # to be extracted later if needed
            "source": source_ref,
            "seo_status": seo_status,
            "is_deduplication_validated": is_deduplication_validated,
            "metadata": metadata,
            "updated_at": datetime.now().isoformat() + "Z"
        }

        if pd.notna(errors_text):
            model_record["_raw_errors"] = errors_text
        if pd.notna(symptoms_text):
            model_record["_raw_symptoms"] = symptoms_text

        models.append(model_record)

    counts["unique_model_specs"] = len(unique_specs)

    os.makedirs(os.path.dirname(OUTPUT_DB), exist_ok=True)
    with open(OUTPUT_DB, 'w', encoding='utf-8') as f:
        json.dump(models, f, indent=2, ensure_ascii=False)

    os.makedirs(os.path.dirname(REPORT_FILE), exist_ok=True)
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"Conversion complete. Generated {len(models)} models.")
    print(f"Report written to {REPORT_FILE}")

if __name__ == '__main__':
    main()
