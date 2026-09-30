import os
from bs4 import BeautifulSoup
import json

base_dir = r"c:\Users\f.refrigeri\Documents\Documenti Flavio\MicroserviziWeb\micro-tools-suite\air-fryer\.vercel\output\static"

pages = {
    "MATERIALI": {
        "IT": "strumenti/materiali-friggitrice-ad-aria/index.html",
        "EN": "en/tools/air-fryer-materials-guide/index.html",
        "ES": "es/herramientas/materiales-freidora-aire/index.html",
        "FR": "fr/outils/materiaux-friteuse-air/index.html"
    },
    "PULIZIA RESISTENZA": {
        "IT": "strumenti/pulire-resistenza-friggitrice-ad-aria/index.html",
        "EN": "en/tools/clean-air-fryer-heating-element/index.html",
        "ES": "es/herramientas/limpiar-resistencia-freidora-aire/index.html",
        "FR": "fr/outils/nettoyer-resistance-friteuse-air/index.html"
    },
    "COTTURA SURGELATI": {
        "IT": "strumenti/cottura-surgelati-friggitrice-ad-aria/index.html",
        "EN": "en/tools/cook-frozen-food-air-fryer/index.html",
        "ES": "es/herramientas/cocinar-congelados-freidora-aire/index.html",
        "FR": "fr/outils/cuisson-surgeles-friteuse-air/index.html"
    },
    "RISCALDARE CIBO": {
        "IT": "strumenti/riscaldare-cibo-friggitrice-ad-aria/index.html",
        "EN": "en/tools/reheat-food-air-fryer/index.html",
        "ES": "es/herramientas/recalentar-comida-freidora-aire/index.html",
        "FR": "fr/outils/rechauffer-aliments-friteuse-air/index.html"
    },
    "CALCOLO CALORIE": {
        "IT": "strumenti/calcolo-calorie-friggitrice-ad-aria/index.html",
        "EN": "en/tools/air-fryer-calorie-calculator/index.html",
        "ES": "es/herramientas/calculo-calorias-freidora-aire/index.html",
        "FR": "fr/outils/calcul-calories-friteuse-air/index.html"
    },
    "CONSUMI": {
        "IT": "strumenti/consumi-friggitrice-ad-aria/index.html",
        "EN": "en/tools/air-fryer-energy-costs/index.html",
        "ES": "es/herramientas/consumo-freidora-aire/index.html",
        "FR": "fr/outils/consommation-friteuse-air/index.html"
    }
}

def analyze_page(filepath, lang):
    if not os.path.exists(filepath):
        return {"error": f"File not found: {filepath}"}
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    res = {}
    
    # H1
    h1s = soup.find_all('h1')
    if len(h1s) == 1:
        res['h1'] = h1s[0].get_text(strip=True)
        res['h1_ok'] = "OK"
    elif len(h1s) == 0:
        res['h1'] = "MISSING"
        res['h1_ok'] = "NO"
    else:
        res['h1'] = f"MULTIPLE ({len(h1s)})"
        res['h1_ok'] = "NO"

    # Title
    title = soup.find('title')
    if title:
        t_text = title.get_text(strip=True)
        t_len = len(t_text)
        res['title'] = t_text
        res['title_ok'] = "OK" if t_len <= 60 else "NO"
        res['title_len'] = t_len
    else:
        res['title'] = "MISSING"
        res['title_ok'] = "NO"
        res['title_len'] = 0

    # Meta description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc and meta_desc.get('content'):
        m_text = meta_desc['content'].strip()
        m_len = len(m_text)
        res['meta'] = m_text
        res['meta_ok'] = "OK" if 140 <= m_len <= 160 else "NO"
        res['meta_len'] = m_len
    else:
        res['meta'] = "MISSING"
        res['meta_ok'] = "NO"
        res['meta_len'] = 0

    # Canonical
    canonical = soup.find('link', rel='canonical')
    if canonical and canonical.get('href'):
        c_href = canonical['href']
        res['canonical'] = c_href
        res['canonical_ok'] = "OK" # Can check if it matches own URL later manually or roughly here
    else:
        res['canonical'] = "MISSING"
        res['canonical_ok'] = "NO"

    # Hreflang
    hreflangs = soup.find_all('link', rel='alternate')
    href_list = [f"{h.get('hreflang')} -> {h.get('href')}" for h in hreflangs if h.get('hreflang')]
    if len(href_list) >= 4:
        res['hreflang'] = ", ".join(href_list)
        res['hreflang_ok'] = "OK"
    else:
        res['hreflang'] = "MISSING OR INCOMPLETE" if len(href_list) == 0 else ", ".join(href_list)
        res['hreflang_ok'] = "NO"

    # Breadcrumb UI
    bc_nav = soup.find('nav', attrs={'aria-label': 'Breadcrumb'})
    if bc_nav:
        bc_texts = [a.get_text(strip=True) for a in bc_nav.find_all(['a', 'span']) if a.get_text(strip=True)]
        # Filter out empty or svg only
        bc_str = " > ".join(bc_texts)
        res['bc_ui'] = bc_str
        res['bc_ui_ok'] = "OK" if len(bc_texts) >= 2 else "NO"
    else:
        res['bc_ui'] = "MISSING"
        res['bc_ui_ok'] = "NO"

    # JSON-LD
    scripts = soup.find_all('script', type='application/ld+json')
    bc_schema = False
    faq_schema = False
    faq_questions = 0
    
    for s in scripts:
        try:
            data = json.loads(s.string)
            if isinstance(data, dict):
                if data.get('@type') == 'BreadcrumbList':
                    bc_schema = True
                if data.get('@type') == 'FAQPage':
                    faq_schema = True
                    faq_questions = len(data.get('mainEntity', []))
            elif isinstance(data, list):
                for item in data:
                    if item.get('@type') == 'BreadcrumbList':
                        bc_schema = True
                    if item.get('@type') == 'FAQPage':
                        faq_schema = True
                        faq_questions = len(item.get('mainEntity', []))
        except:
            pass

    res['bc_schema'] = "PRESENT" if bc_schema else "MISSING"
    res['bc_schema_ok'] = "OK" if bc_schema else "NO"

    # FAQ UI
    faq_ui_q = soup.find_all('details')
    res['faq_ui'] = f"{len(faq_ui_q)} questions"
    res['faq_ui_ok'] = "OK" if len(faq_ui_q) > 0 else "NO"

    res['faq_schema'] = f"PRESENT ({faq_questions} q)" if faq_schema else "MISSING"
    res['faq_schema_ok'] = "OK" if (faq_schema and faq_questions > 0) else "NO"

    # Links
    links = soup.find_all('a', href=True)
    internal_links = [l['href'] for l in links if l['href'].startswith('/') and not l['href'].startswith('//')]
    res['links'] = f"{len(internal_links)} internal links found"
    res['links_ok'] = "OK" if len(internal_links) > 0 else "NO"
    
    # Lang check
    # Rough check for lang by looking at 'html' tag lang attr
    html_tag = soup.find('html')
    doc_lang = html_tag.get('lang', '') if html_tag else ''
    res['lang'] = f"doc_lang={doc_lang}"
    res['lang_ok'] = "OK" if doc_lang.lower().startswith(lang.lower()) else "NO"

    return res

output = []
for tool, langs in pages.items():
    output.append(f"{tool}:")
    for lang, rel_path in langs.items():
        filepath = os.path.join(base_dir, rel_path.replace('/', os.sep))
        res = analyze_page(filepath, lang)
        
        output.append(f"- {lang}:")
        if 'error' in res:
            output.append(f"  ERROR: {res['error']}")
            continue
            
        output.append(f"  H1: {res['h1_ok']} ({res['h1']})")
        output.append(f"  Title: {res['title_ok']} (lunghezza: {res['title_len']} caratteri) -> {res['title']}")
        output.append(f"  Meta: {res['meta_ok']} (lunghezza: {res['meta_len']} caratteri) -> {res['meta']}")
        output.append(f"  Canonical: {res['canonical_ok']} ({res['canonical']})")
        output.append(f"  Hreflang: {res['hreflang_ok']} ({res['hreflang']})")
        output.append(f"  Breadcrumb UI: {res['bc_ui_ok']} ({res['bc_ui']})")
        output.append(f"  Breadcrumb schema: {res['bc_schema_ok']}")
        output.append(f"  FAQ UI: {res['faq_ui_ok']} ({res['faq_ui']})")
        output.append(f"  FAQ schema: {res['faq_schema_ok']} ({res['faq_schema']})")
        output.append(f"  Link interni: {res['links_ok']} ({res['links']})")
        output.append(f"  Lingua: {res['lang_ok']} ({res['lang']})")
        output.append("")

with open("scratch/audit_seo_tools_output.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output))
