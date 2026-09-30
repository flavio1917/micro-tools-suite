import sys
from bs4 import BeautifulSoup

files = {
    'IT': 'dist/client/strumenti/codici-errore-friggitrice-ad-aria/index.html',
    'EN': 'dist/client/en/tools/air-fryer-error-codes/index.html',
    'ES': 'dist/client/es/herramientas/codigos-error-freidora-aire/index.html',
    'FR': 'dist/client/fr/outils/codes-erreur-friteuse-air/index.html'
}

for lang, filepath in files.items():
    print(f'\n--- {lang} ---')
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
            # Title
            title = soup.find('title')
            print('TITLE:', title.text if title else 'Missing')
            
            # Meta description
            meta = soup.find('meta', attrs={'name': 'description'})
            print('META:', meta['content'] if meta else 'Missing')
            
            # H1
            h1s = soup.find_all('h1')
            print(f'H1 COUNT: {len(h1s)}')
            for i, h1 in enumerate(h1s):
                print(f'H1 [{i}]: {h1.text.strip()}')
                
            # Intro
            intro = soup.select_one('h1 + p')
            print('INTRO:', intro.text.strip() if intro else 'Missing')
            
            # Hreflangs
            links = soup.find_all('link', rel='alternate', hreflang=True)
            for link in links:
                print(f"HREFLANG {link['hreflang']}: {link['href']}")
                
            # FAQs
            faqs = soup.select('details')
            print(f'FAQ COUNT (visual): {len(faqs)}')
            
            # JSON-LD
            scripts = soup.find_all('script', type='application/ld+json')
            has_faq_schema = False
            for s in scripts:
                if 'FAQPage' in s.string:
                    has_faq_schema = True
                    break
            print('FAQ SCHEMA:', has_faq_schema)
            
    except Exception as e:
        print(f'Error reading {lang}: {e}')
