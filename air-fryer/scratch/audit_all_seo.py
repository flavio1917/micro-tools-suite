import os
import re
import json

base_dir = '.vercel/output/static'

pages = {
    'HUB GENERICO': {
        'IT': 'strumenti/index.html',
        'EN': 'en/tools/index.html',
        'ES': 'es/herramientas/index.html',
        'FR': 'fr/outils/index.html'
    },
    'HUB ERRORI': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/air-fryer-error-codes/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/index.html'
    },
    'BRAND PHILIPS': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/philips/index.html',
        'EN': 'en/tools/air-fryer-error-codes/philips/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/philips/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/philips/index.html'
    },
    'BRAND COSORI': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/cosori/index.html',
        'EN': 'en/tools/air-fryer-error-codes/cosori/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/cosori/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/cosori/index.html'
    },
    'BRAND XIAOMI': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/xiaomi/index.html',
        'EN': 'en/tools/air-fryer-error-codes/xiaomi/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/xiaomi/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/xiaomi/index.html'
    },
    'MODEL PHILIPS XXL': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/philips/premium-airfryer-xxl/index.html',
        'EN': 'en/tools/air-fryer-error-codes/philips/premium-airfryer-xxl/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/philips/premium-airfryer-xxl/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/philips/premium-airfryer-xxl/index.html'
    },
    'MODEL PHILIPS ESSENTIAL': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/philips/essential-airfryer/index.html',
        'EN': 'en/tools/air-fryer-error-codes/philips/essential-airfryer/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/philips/essential-airfryer/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/philips/essential-airfryer/index.html'
    },
    'MODEL COSORI LE 5.0': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/cosori/pro-le-5-0-quart-air-fryer/index.html',
        'EN': 'en/tools/air-fryer-error-codes/cosori/pro-le-5-0-quart-air-fryer/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/cosori/pro-le-5-0-quart-air-fryer/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/cosori/pro-le-5-0-quart-air-fryer/index.html'
    },
    'MODEL XIAOMI D1001': {
        'IT': 'strumenti/codici-errore-friggitrice-ad-aria/xiaomi/maf-d1001/index.html',
        'EN': 'en/tools/air-fryer-error-codes/xiaomi/maf-d1001/index.html',
        'ES': 'es/herramientas/codigos-error-freidora-aire/xiaomi/maf-d1001/index.html',
        'FR': 'fr/outils/codes-erreur-friteuse-air/xiaomi/maf-d1001/index.html'
    },
    'GUIDA RESET': {
        'IT': 'strumenti/reset-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/air-fryer-reset/index.html',
        'ES': 'es/herramientas/reset-freidora-aire/index.html',
        'FR': 'fr/outils/reset-friteuse-air/index.html'
    },
    'GUIDA FUMO PUZZA': {
        'IT': 'strumenti/fumo-puzza-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/air-fryer-smoke-smell/index.html',
        'ES': 'es/herramientas/humo-olor-freidora-aire/index.html',
        'FR': 'fr/outils/fumee-odeur-friteuse-air/index.html'
    },
    'GUIDA NON SI ACCENDE': {
        'IT': 'strumenti/friggitrice-ad-aria-non-si-accende/index.html',
        'EN': 'en/tools/air-fryer-wont-turn-on/index.html',
        'ES': 'es/herramientas/freidora-aire-no-enciende/index.html',
        'FR': 'fr/outils/friteuse-air-ne-sallume-pas/index.html'
    },
    'GUIDA NON SCALDA': {
        'IT': 'strumenti/friggitrice-ad-aria-non-scalda/index.html',
        'EN': 'en/tools/air-fryer-not-heating/index.html',
        'ES': 'es/herramientas/freidora-aire-no-calienta/index.html',
        'FR': 'fr/outils/friteuse-air-ne-chauffe-pas/index.html'
    },
    'GUIDA VENTOLA': {
        'IT': 'strumenti/ventola-friggitrice-ad-aria-non-gira/index.html',
        'EN': 'en/tools/air-fryer-fan-not-working/index.html',
        'ES': 'es/herramientas/freidora-aire-ventilador-no-funciona/index.html',
        'FR': 'fr/outils/friteuse-air-ventilateur-ne-marche-pas/index.html'
    },
    'STRUMENTO MATERIALI': {
        'IT': 'strumenti/materiali-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/air-fryer-materials-guide/index.html',
        'ES': 'es/herramientas/materiales-freidora-aire/index.html',
        'FR': 'fr/outils/materiaux-friteuse-air/index.html'
    },
    'STRUMENTO PULIZIA': {
        'IT': 'strumenti/pulire-resistenza-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/clean-air-fryer-heating-element/index.html',
        'ES': 'es/herramientas/limpiar-resistencia-freidora-aire/index.html',
        'FR': 'fr/outils/nettoyer-resistance-friteuse-air/index.html'
    },
    'STRUMENTO SURGELATI': {
        'IT': 'strumenti/cottura-surgelati-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/cook-frozen-food-air-fryer/index.html',
        'ES': 'es/herramientas/cocinar-congelados-freidora-aire/index.html',
        'FR': 'fr/outils/cuisson-surgeles-friteuse-air/index.html'
    },
    'STRUMENTO RISCALDARE': {
        'IT': 'strumenti/riscaldare-cibo-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/reheat-food-air-fryer/index.html',
        'ES': 'es/herramientas/recalentar-comida-freidora-aire/index.html',
        'FR': 'fr/outils/rechauffer-aliments-friteuse-air/index.html'
    },
    'STRUMENTO CALORIE': {
        'IT': 'strumenti/calcolo-calorie-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/air-fryer-calorie-calculator/index.html',
        'ES': 'es/herramientas/calculo-calorias-freidora-aire/index.html',
        'FR': 'fr/outils/calcul-calories-friteuse-air/index.html'
    },
    'STRUMENTO CONSUMI': {
        'IT': 'strumenti/consumi-friggitrice-ad-aria/index.html',
        'EN': 'en/tools/air-fryer-energy-costs/index.html',
        'ES': 'es/herramientas/consumo-freidora-aire/index.html',
        'FR': 'fr/outils/consommation-friteuse-air/index.html'
    }
}

report = ""

for category, langs in pages.items():
    report += f"{category}:\n"
    for lang, path in langs.items():
        full_path = os.path.join(base_dir, path)
        if not os.path.exists(full_path):
            full_path = os.path.join('dist/client', path) # Fallback to dist/client
            
        if not os.path.exists(full_path):
            report += f"- {lang}: FILE NON TROVATO ({full_path})\n"
            continue
            
        with open(full_path, 'r', encoding='utf-8') as f:
            html = f.read()

        # H1
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
        h1 = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip() if h1_match else "NOT FOUND"
        h1_ok = "OK" if h1 != "NOT FOUND" else "**NO**"
        
        # Title
        title_match = re.search(r'<title[^>]*>(.*?)</title>', html, re.DOTALL)
        title = title_match.group(1).strip() if title_match else "NOT FOUND"
        title_ok = "OK" if title != "NOT FOUND" and len(title) <= 75 else f"**NO**"
        
        # Meta
        meta_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', html)
        meta = meta_match.group(1).strip() if meta_match else "NOT FOUND"
        meta_ok = "OK" if meta != "NOT FOUND" and 100 < len(meta) < 170 else f"**NO**"
        
        # Canonical
        canon_match = re.search(r'<link\s+rel="canonical"\s+href="(.*?)"', html)
        canonical = canon_match.group(1).strip() if canon_match else "NOT FOUND"
        canon_ok = "OK" if canonical != "NOT FOUND" else "**NO**"
        
        # Hreflang
        href_matches = re.finditer(r'<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"', html)
        hreflangs = [f"{m.group(1)}" for m in href_matches]
        href_ok = "OK" if len(hreflangs) >= 5 else "**NO**"
        
        # Breadcrumb UI
        bc_match = re.search(r'<nav[^>]*aria-label="Breadcrumb"[^>]*>.*?</nav>', html, re.DOTALL)
        bc_ui = "NOT FOUND"
        if bc_match: 
            lis = re.findall(r'<li[^>]*>(.*?)</li>', bc_match.group(0), re.DOTALL)
            texts = [re.sub(r'<[^>]+>', '', li).strip() for li in lis if re.sub(r'<[^>]+>', '', li).strip() != '/']
            bc_ui = ' > '.join(texts)
        bc_ui_ok = "OK" if bc_ui != "NOT FOUND" else "**NO**"
        
        # JSON-LD Schema
        bc_schema = "NOT FOUND"
        faq_schema = "NOT FOUND"
        if 'BreadcrumbList' in html: bc_schema = "FOUND"
        if 'FAQPage' in html: faq_schema = "FOUND"
        
        bc_schema_ok = "OK" if bc_schema == "FOUND" else "**NO**"
        
        # FAQ UI
        faq_ui = len(re.findall(r'<details\s+class="[^"]*tool-faq-item', html))
        if faq_ui == 0:
            # Fallback for ErrorFaq format which might be different
            faq_ui = len(re.findall(r'<div[^>]*class="[^"]*faq-item', html))
        # Another fallback for generic details tags that are FAQs
        if faq_ui == 0:
            faq_ui = len(re.findall(r'<details class="group bg-white', html))
        faq_ui_ok = "OK" if faq_ui > 0 else "NO (0)"
        faq_schema_ok = "OK" if faq_schema == "FOUND" else "NO"
        
        # Internal Links
        internal_links = "FOUND" if 'href="/strumenti/' in html or 'href="/en/tools/' in html else "NO"
        links_ok = "OK" if internal_links == "FOUND" else "**NO**"
        
        # Language Heuristic
        lang_ok = "OK"
        if lang in ['EN', 'ES', 'FR'] and ('Strumenti' in title or 'Friggitrice' in title):
            lang_ok = "**NO** (Italian found)"
            
        report += f"- {lang}:\n"
        report += f"  H1: {h1_ok} ({h1})\n"
        report += f"  Title: {title_ok} (lunghezza: {len(title)}) - {title}\n"
        report += f"  Meta: {meta_ok} (lunghezza: {len(meta)})\n"
        report += f"  Canonical: {canon_ok} ({canonical})\n"
        report += f"  Hreflang: {href_ok} ({', '.join(hreflangs)})\n"
        report += f"  Breadcrumb UI: {bc_ui_ok} ({bc_ui})\n"
        report += f"  Breadcrumb schema: {bc_schema_ok}\n"
        report += f"  FAQ UI: {faq_ui_ok}\n"
        report += f"  FAQ schema: {faq_schema_ok}\n"
        report += f"  Link interni: {links_ok}\n"
        report += f"  Lingua: {lang_ok}\n\n"

with open('../scratch/audit_all.txt', 'w', encoding='utf-8') as f:
    f.write(report)
print("Audit complete!")
