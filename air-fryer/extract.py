import sys, re, json
from pathlib import Path

def extract_info(file_path):
    p = Path(file_path)
    if not p.exists():
        return {'error': 'File not found'}
    
    html = p.read_text(encoding='utf-8')
    
    title = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
    title = title.group(1).strip() if title else None
    
    # H1s
    h1s = re.findall(r'<h1.*?>(.*?)</h1>', html, re.I | re.S)
    h1s = [re.sub(r'<[^>]+>', '', h1).strip() for h1 in h1s]
    
    # meta description
    desc = re.search(r'<meta\s+name=[\"\']description[\"\']\s+content=[\"\'](.*?)[\"\']\s*/?>', html, re.I | re.S)
    desc = desc.group(1) if desc else None
    
    # canonical
    canon = re.search(r'<link\s+rel=[\"\']canonical[\"\']\s+href=[\"\'](.*?)[\"\']\s*/?>', html, re.I)
    canon = canon.group(1) if canon else None
    
    # hreflang
    hreflangs = re.findall(r'<link\s+rel=[\"\']alternate[\"\']\s+hreflang=[\"\'](.*?)[\"\']\s+href=[\"\'](.*?)[\"\']\s*/?>', html, re.I)
    
    # og:image
    og_img = re.search(r'<meta\s+property=[\"\']og:image[\"\']\s+content=[\"\'](.*?)[\"\']\s*/?>', html, re.I)
    og_img = og_img.group(1) if og_img else None
    
    # hero image (the one with class object-cover)
    hero_img = re.search(r'<img\s+src=[\"\'](.*?)[\"\']\s+alt=[\"\'](.*?)[\"\']\s+class=[\"\'][^\"]*object-cover[^\"]*[\"\']', html, re.I)
    hero_img_src = hero_img.group(1) if hero_img else None
    hero_img_alt = hero_img.group(2) if hero_img else None
    
    # JSON-LD
    schema = re.search(r'<script\s+type=[\"\']application/ld\+json[\"\'].*?>(.*?)</script>', html, re.I | re.S)
    recipe_name = None
    recipe_image = None
    if schema:
        try:
            data = json.loads(schema.group(1))
            if isinstance(data, list):
                for item in data:
                    if item.get('@type') == 'Recipe':
                        recipe_name = item.get('name')
                        recipe_image = item.get('image')
            elif data.get('@type') == 'Recipe':
                recipe_name = data.get('name')
                recipe_image = data.get('image')
        except:
            pass

    return {
        'title': title,
        'h1_count': len(h1s),
        'h1_texts': h1s,
        'desc': desc,
        'canonical': canon,
        'hreflang': hreflangs,
        'og_image': og_img,
        'hero_img_src': hero_img_src,
        'hero_img_alt': hero_img_alt,
        'recipe_name': recipe_name,
        'recipe_image': recipe_image
    }

files_to_check = {
    'IT-A02': 'dist/client/it/recipes/arrosticini-abruzzesi/index.html',
    'EN-A02': 'dist/client/en/recipes/abruzzese-lamb-skewers/index.html',
    'ES-A02': 'dist/client/es/recipes/arrosticini-abruzzesi-freidora-aire/index.html',
    'FR-A02': 'dist/client/fr/recipes/arrosticini-abruzzesi-friteuse-air/index.html',
    'IT-A03': 'dist/client/convertitore/index.html',
    'EN-A03': 'dist/client/en/converter/index.html',
    'ES-A03': 'dist/client/es/convertidor/index.html',
    'FR-A03': 'dist/client/fr/convertisseur/index.html',
    'IT-Sample': 'dist/client/it/recipes/salsiccia-patate-cubetti/index.html'
}

results = {k: extract_info(v) for k, v in files_to_check.items()}
print(json.dumps(results, indent=2))
