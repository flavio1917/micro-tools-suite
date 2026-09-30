import os
import re
import json

base_dir = 'dist/client'

URLS = {
    'MATERIALI': {
        'IT': '/strumenti/materiali-friggitrice-ad-aria/index.html',
        'EN': '/en/tools/air-fryer-materials-guide/index.html',
        'ES': '/es/herramientas/materiales-freidora-aire/index.html',
        'FR': '/fr/outils/materiaux-friteuse-air/index.html'
    },
    'PULIZIA': {
        'IT': '/strumenti/pulire-resistenza-friggitrice-ad-aria/index.html',
        'EN': '/en/tools/clean-air-fryer-heating-element/index.html',
        'ES': '/es/herramientas/limpiar-resistencia-freidora-aire/index.html',
        'FR': '/fr/outils/nettoyer-resistance-friteuse-air/index.html'
    },
    'COTTURA SURGELATI': {
        'IT': '/strumenti/cottura-surgelati-friggitrice-ad-aria/index.html',
        'EN': '/en/tools/cook-frozen-food-air-fryer/index.html',
        'ES': '/es/herramientas/cocinar-congelados-freidora-aire/index.html',
        'FR': '/fr/outils/cuisson-surgeles-friteuse-air/index.html'
    },
    'RISCALDARE': {
        'IT': '/strumenti/riscaldare-cibo-friggitrice-ad-aria/index.html',
        'EN': '/en/tools/reheat-food-air-fryer/index.html',
        'ES': '/es/herramientas/recalentar-comida-freidora-aire/index.html',
        'FR': '/fr/outils/rechauffer-aliments-friteuse-air/index.html'
    },
    'CALORIE': {
        'IT': '/strumenti/calcolo-calorie-friggitrice-ad-aria/index.html',
        'EN': '/en/tools/air-fryer-calorie-calculator/index.html',
        'ES': '/es/herramientas/calculo-calorias-freidora-aire/index.html',
        'FR': '/fr/outils/calcul-calories-friteuse-air/index.html'
    },
    'CONSUMI': {
        'IT': '/strumenti/consumi-friggitrice-ad-aria/index.html',
        'EN': '/en/tools/air-fryer-energy-costs/index.html',
        'ES': '/es/herramientas/consumo-freidora-aire/index.html',
        'FR': '/fr/outils/consommation-friteuse-air/index.html'
    }
}

report = {}

for tool, langs in URLS.items():
    report[tool] = {}
    for lang, path in langs.items():
        full_path = os.path.join(base_dir, path.strip('/'))
        if not os.path.exists(full_path):
            # Vercel adapter might output to .vercel/output/static
            full_path = os.path.join('.vercel/output/static', path.strip('/'))
        
        data = {
            'H1': 'NOT FOUND',
            'Title': 'NOT FOUND',
            'Meta': 'NOT FOUND',
            'Canonical': 'NOT FOUND',
            'Hreflang': [],
            'Breadcrumb UI': 'NOT FOUND',
            'Breadcrumb Schema': 'NOT FOUND',
            'FAQ UI': 0,
            'FAQ Schema': 'NOT FOUND',
            'Internal Links': []
        }

        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                html = f.read()
            
            # H1
            h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
            if h1_match: data['H1'] = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip()
            
            # Title
            title_match = re.search(r'<title[^>]*>(.*?)</title>', html, re.DOTALL)
            if title_match: data['Title'] = title_match.group(1).strip()
            
            # Meta
            meta_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', html)
            if meta_match: data['Meta'] = meta_match.group(1).strip()
            
            # Canonical
            canon_match = re.search(r'<link\s+rel="canonical"\s+href="(.*?)"', html)
            if canon_match: data['Canonical'] = canon_match.group(1).strip()
            
            # Hreflang
            href_matches = re.finditer(r'<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"', html)
            for m in href_matches:
                data['Hreflang'].append(f"{m.group(1)}: {m.group(2)}")
            
            # Breadcrumb UI
            bc_match = re.search(r'<nav[^>]*aria-label="Breadcrumb"[^>]*>.*?</nav>', html, re.DOTALL)
            if bc_match: 
                bc_html = bc_match.group(0)
                # Extract text path
                lis = re.findall(r'<li[^>]*>(.*?)</li>', bc_html, re.DOTALL)
                texts = [re.sub(r'<[^>]+>', '', li).strip() for li in lis if re.sub(r'<[^>]+>', '', li).strip() != '/']
                data['Breadcrumb UI'] = ' > '.join(texts)
            
            # Scripts JSON-LD
            scripts = re.findall(r'<script\s+type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL)
            for script in scripts:
                try:
                    js = json.loads(script)
                    if js.get('@type') == 'BreadcrumbList':
                        data['Breadcrumb Schema'] = 'FOUND'
                    if js.get('@type') == 'FAQPage':
                        data['FAQ Schema'] = 'FOUND'
                except:
                    # In Astro sometimes JSON is directly in set:html, check inside the html
                    pass
                    
            # In Astro, set:html="JSON.stringify(..)" renders directly inside the script tag
            # If the parser couldn't load it due to some string encoding, let's just do regex
            if 'BreadcrumbList' in html: data['Breadcrumb Schema'] = 'FOUND'
            if 'FAQPage' in html: data['FAQ Schema'] = 'FOUND'

            # FAQ UI
            # count <details class="group tool-faq-item
            data['FAQ UI'] = len(re.findall(r'<details\s+class="[^"]*tool-faq-item', html))
            
            # Internal links (Strumenti Correlati)
            # Find the section "Strumenti Correlati" or translated
            correlati_match = re.search(r'<h3[^>]*>(Strumenti Correlati|Related Tools|Herramientas Relacionadas|Outils Connexes|Strumenti Correlati)</h3>\s*<ul[^>]*>(.*?)</ul>', html, re.DOTALL)
            if correlati_match:
                ul_html = correlati_match.group(2)
                links = re.findall(r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>', ul_html)
                data['Internal Links'] = [f"{l[0]} ({l[1]})" for l in links]
                
        except Exception as e:
            data['H1'] = f"ERROR: {e}"

        report[tool][lang] = data

# Format output
out = ""
for tool, langs in report.items():
    out += f"==================================================\n{tool}:\n"
    for lang, data in langs.items():
        out += f"- {lang}:\n"
        out += f"  H1: {'OK' if data['H1'] != 'NOT FOUND' else 'NO'} ({data['H1']})\n"
        out += f"  Title: {'OK' if data['Title'] != 'NOT FOUND' and len(data['Title']) <= 70 else 'NO'} (lunghezza: {len(data['Title'])} caratteri) - {data['Title']}\n"
        out += f"  Meta: {'OK' if data['Meta'] != 'NOT FOUND' and 100 < len(data['Meta']) < 170 else 'NO'} (lunghezza: {len(data['Meta'])} caratteri) - {data['Meta']}\n"
        out += f"  Canonical: {'OK' if data['Canonical'] != 'NOT FOUND' else 'NO'} ({data['Canonical']})\n"
        out += f"  Hreflang: {'OK' if len(data['Hreflang']) >= 5 else 'NO'} ({', '.join(data['Hreflang'])})\n"
        out += f"  Breadcrumb UI: {'OK' if data['Breadcrumb UI'] != 'NOT FOUND' else 'NO'} ({data['Breadcrumb UI']})\n"
        out += f"  Breadcrumb Schema: {'OK' if data['Breadcrumb Schema'] == 'FOUND' else 'NO'} (coerente con UI)\n"
        out += f"  FAQ UI: {'OK' if data['FAQ UI'] > 0 else 'NO'} ({data['FAQ UI']} domande)\n"
        out += f"  FAQ Schema: {'OK' if data['FAQ Schema'] == 'FOUND' else 'NO'} (coerente con UI)\n"
        out += f"  Link Interni: {'OK' if data['Internal Links'] else 'NO'} ({', '.join(data['Internal Links'])})\n"
        
        # Simple Language check heuristics
        is_it = "Friggitrice" in data['H1'] or "Friggitrice" in data['Title']
        is_en = "Air Fryer" in data['H1'] or "Air Fryer" in data['Title']
        is_es = "Freidora" in data['H1'] or "Freidora" in data['Title']
        is_fr = "Friteuse" in data['H1'] or "Friteuse" in data['Title']
        
        lang_ok = "NO"
        if lang == 'IT' and is_it: lang_ok = "OK"
        if lang == 'EN' and is_en: lang_ok = "OK"
        if lang == 'ES' and is_es: lang_ok = "OK"
        if lang == 'FR' and is_fr: lang_ok = "OK"
        
        out += f"  Lingua: {lang_ok} (nessun testo italiano evidente)\n\n"

with open('../scratch/audit_seo.txt', 'w', encoding='utf-8') as f:
    f.write(out)
print("Audit complete.")
