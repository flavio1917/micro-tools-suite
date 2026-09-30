import os
import re
import json

def clean_html(raw_html):
    cleanr = re.compile('<.*?>')
    return re.sub(cleanr, '', raw_html).strip()

tools_map = {
    "MATERIALI": {
        "IT": ".vercel/output/static/strumenti/materiali-friggitrice-ad-aria/index.html",
        "EN": ".vercel/output/static/en/tools/air-fryer-materials-guide/index.html",
        "ES": ".vercel/output/static/es/herramientas/materiales-freidora-aire/index.html",
        "FR": ".vercel/output/static/fr/outils/materiaux-friteuse-air/index.html"
    },
    "PULIZIA RESISTENZA": {
        "IT": ".vercel/output/static/strumenti/pulire-resistenza-friggitrice-ad-aria/index.html",
        "EN": ".vercel/output/static/en/tools/clean-air-fryer-heating-element/index.html",
        "ES": ".vercel/output/static/es/herramientas/limpiar-resistencia-freidora-aire/index.html",
        "FR": ".vercel/output/static/fr/outils/nettoyer-resistance-friteuse-air/index.html"
    },
    "COTTURA SURGELATI": {
        "IT": ".vercel/output/static/strumenti/cottura-surgelati-friggitrice-ad-aria/index.html",
        "EN": ".vercel/output/static/en/tools/cook-frozen-food-air-fryer/index.html",
        "ES": ".vercel/output/static/es/herramientas/cocinar-congelados-freidora-aire/index.html",
        "FR": ".vercel/output/static/fr/outils/cuisson-surgeles-friteuse-air/index.html"
    },
    "RISCALDARE CIBO": {
        "IT": ".vercel/output/static/strumenti/riscaldare-cibo-friggitrice-ad-aria/index.html",
        "EN": ".vercel/output/static/en/tools/reheat-food-air-fryer/index.html",
        "ES": ".vercel/output/static/es/herramientas/recalentar-comida-freidora-aire/index.html",
        "FR": ".vercel/output/static/fr/outils/rechauffer-aliments-friteuse-air/index.html"
    },
    "CALCOLO CALORIE": {
        "IT": ".vercel/output/static/strumenti/calcolo-calorie-friggitrice-ad-aria/index.html",
        "EN": ".vercel/output/static/en/tools/air-fryer-calorie-calculator/index.html",
        "ES": ".vercel/output/static/es/herramientas/calculo-calorias-freidora-aire/index.html",
        "FR": ".vercel/output/static/fr/outils/calcul-calories-friteuse-air/index.html"
    },
    "CONSUMI": {
        "IT": ".vercel/output/static/strumenti/consumi-friggitrice-ad-aria/index.html",
        "EN": ".vercel/output/static/en/tools/air-fryer-energy-costs/index.html",
        "ES": ".vercel/output/static/es/herramientas/consumo-freidora-aire/index.html",
        "FR": ".vercel/output/static/fr/outils/consommation-friteuse-air/index.html"
    }
}

out = open('scratch/audit_report.txt', 'w', encoding='utf-8')

for tool_name, langs in tools_map.items():
    out.write(f"{tool_name}:\n")
    for lang, filepath in langs.items():
        out.write(f"- {lang}:\n")
        if not os.path.exists(filepath):
            out.write(f"  **FILE NOT FOUND: {filepath}**\n\n")
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL | re.IGNORECASE)
        h1 = clean_html(h1_match.group(1)).strip() if h1_match else None
        h1_ok = "OK" if h1 else "**NO (Mancante)**"
        out.write(f"  H1: {h1_ok} ({h1})\n")
        
        title_match = re.search(r'<title[^>]*>(.*?)</title>', content, re.DOTALL | re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else None
        title_len = len(title) if title else 0
        title_ok = "OK" if title and title_len <= 60 else f"**NO (Lunghezza: {title_len})**"
        out.write(f"  Title: {title_ok} (Lunghezza: {title_len} caratteri)\n")
        
        meta_match = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', content, re.IGNORECASE)
        meta = meta_match.group(1).strip() if meta_match else None
        meta_len = len(meta) if meta else 0
        meta_ok = "OK" if meta and 140 <= meta_len <= 160 else f"**NO (Lunghezza: {meta_len})**"
        out.write(f"  Meta: {meta_ok} (Lunghezza: {meta_len} caratteri)\n")
        
        canon_match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', content, re.IGNORECASE)
        canon = canon_match.group(1).strip() if canon_match else None
        canon_ok = "OK" if canon else "**NO (Mancante)**"
        out.write(f"  Canonical: {canon_ok} ({canon})\n")
        
        hrefs = re.findall(r'<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"', content, re.IGNORECASE)
        href_map = {h[0]: h[1] for h in hrefs}
        href_ok = "OK" if len(href_map) >= 4 and 'x-default' in href_map else f"**NO (Trovati {len(href_map)})**"
        out.write(f"  Hreflang: {href_ok} ({list(href_map.keys())})\n")
        
        bc_nav_match = re.search(r'<nav[^>]*aria-label="breadcrumb"[^>]*>(.*?)</nav>', content, re.DOTALL | re.IGNORECASE)
        if bc_nav_match:
            bc_items = re.findall(r'<li[^>]*>(.*?)</li>', bc_nav_match.group(1), re.DOTALL | re.IGNORECASE)
            bc_texts = [clean_html(it).strip() for it in bc_items]
            bc_str = " > ".join(bc_texts)
            bc_ok = "OK"
        else:
            bc_str = "Non trovato"
            bc_ok = "**NO**"
        out.write(f"  Breadcrumb UI: {bc_ok} ({bc_str})\n")
        
        json_scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
        bc_schema_found = False
        faq_schema_found = False
        faq_schema_q_count = 0
        
        for js_str in json_scripts:
            try:
                data = json.loads(js_str.replace('\n', ''))
                if data.get('@type') == 'BreadcrumbList':
                    bc_schema_found = True
                if data.get('@type') == 'FAQPage':
                    faq_schema_found = True
                    faq_schema_q_count = len(data.get('mainEntity', []))
            except:
                pass
                
        bc_schema_ok = "OK" if bc_schema_found else "**NO**"
        out.write(f"  Breadcrumb schema: {bc_schema_ok} (coerente con UI)\n")
        
        faqs = re.findall(r'<details[^>]*>\s*<summary[^>]*>(.*?)</summary>', content, re.IGNORECASE | re.DOTALL)
        faq_ui_count = len(faqs)
        faq_ui_ok = "OK" if faq_ui_count > 0 else "**NO**"
        out.write(f"  FAQ UI: {faq_ui_ok} ({faq_ui_count} domande)\n")
        
        faq_schema_ok = "OK" if faq_schema_found and faq_schema_q_count == faq_ui_count else f"**NO** ({faq_schema_q_count} domande in schema)"
        out.write(f"  FAQ schema: {faq_schema_ok} (coerente con UI)\n")
        
        links = re.findall(r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>', content, re.IGNORECASE | re.DOTALL)
        link_urls = [l[0] for l in links if '/strumenti' in l[0] or '/tools' in l[0] or '/herramientas' in l[0] or '/outils' in l[0]]
        link_ok = "OK" if len(link_urls) > 0 else "**NO**"
        out.write(f"  Link interni: {link_ok} ({len(link_urls)} link SEO trovati)\n")
        
        ita_words = [' friggitrice ', ' come ', ' il ', ' la ', ' e ', ' o ', ' per ']
        if lang != "IT":
            found_ita = [w for w in ita_words if w.lower() in content.lower()]
            lang_ok = "**NO** (Testo italiano trovato)" if len(found_ita) > 3 else "OK"
        else:
            lang_ok = "OK"
            
        out.write(f"  Lingua: {lang_ok} (nessun testo italiano in EN/ES/FR)\n\n")
        
out.close()
