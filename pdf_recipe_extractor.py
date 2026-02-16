import pdfplumber
import re
import json
import os
from difflib import SequenceMatcher

# --- CONFIGURAZIONE ---
FILES = {
    "ninja": "RicetteFriggitriceAria_2.pdf",
    "cosori": "RicetteFriggitriceAria_1.pdf",
    "tefal": "RicetteFriggitriceAria_3.pdf"
}
OUTPUT_JSON = "src/data/recipes.json"

# --- UTILS ---
def clean_text(text):
    if not text: return ""
    # Rimuovi numeri di pagina e pattern file
    text = re.sub(r'PAGE \d+', '', text)
    text = re.sub(r'\d+\.\d+_ERB_.*', '', text)
    # Rimuovi metadati
    text = re.sub(r'(PRODUCE|PORZIONI|TEMPO DI PREPARAZIONE|TEMPO DI COTTURA).*?(:|\n)', '', text, flags=re.IGNORECASE)
    text = text.replace('\n', ' ').strip()
    return re.sub(r'\s+', ' ', text)

def is_ingredient_line(line):
    # Rileva se una riga inizia con un numero o una quantità
    return re.match(r'^\d+|^\d+\/\d+|^½|^¼|^\d+g|^\d+ml|^un|^una|^mezzo', line.strip().lower())

def parse_numbers(text):
    temp_match = re.search(r'(\d{2,3})\s*(?:°|gradi|C)', text, re.IGNORECASE)
    temp = int(temp_match.group(1)) if temp_match else 180

    time_match = re.search(r'(\d+)(?:-(\d+))?\s*(?:min|m\.|minuti)', text.lower())
    time_str = "15-20"
    if time_match:
        t1 = int(time_match.group(1))
        t2 = int(time_match.group(2)) if time_match.group(2) else None
        base_time = (t1 + t2) / 2 if t2 else t1
        low = int(base_time * 0.9)
        high = int(base_time * 1.1)
        if low == high: high += 1
        time_str = f"{low}-{high}"
    
    return temp, time_str

def get_emoji(title):
    t = title.lower()
    if 'patat' in t or 'chips' in t: return "🍟"
    if 'pollo' in t or 'ali' in t or 'cosce' in t or 'tacchino' in t: return "🍗"
    if 'manzo' in t or 'bistecca' in t or 'carne' in t or 'maiale' in t or 'salsiccia' in t or 'agnello' in t: return "🥩"
    if 'pesce' in t or 'salmone' in t or 'gamber' in t or 'merluzzo' in t: return "🐟"
    if 'dolce' in t or 'torta' in t or 'muffin' in t or 'biscott' in t or 'fragole' in t or 'brownies' in t: return "🧁"
    if 'verdura' in t or 'zucchine' in t or 'broccoli' in t or 'funghi' in t or 'fagiolini' in t or 'cavolfiore' in t: return "🥦"
    if 'pane' in t or 'pizza' in t or 'toast' in t or 'sandwich' in t: return "🥪"
    return "🥘"

# --- MOTORE 1: NINJA (Tabelle) ---
def extract_ninja(path):
    recipes = []
    print(f"🥷 Analisi NINJA ({path})...")
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                for row in table:
                    row_str = " ".join([str(c) for c in row if c])
                    if re.search(r'\d+', row_str) and len(row) >= 3:
                        title = clean_text(row[0])
                        # Filtri spazzatura
                        if title.count(',') > 1 or len(title) < 4 or "ingrediente" in title.lower(): continue
                        
                        temp, time_str = parse_numbers(row_str)
                        if temp < 100: continue 
                        
                        # Per le tabelle Ninja, il titolo E' l'ingrediente principale
                        recipes.append({
                            "title": title.title(),
                            "temp": temp,
                            "time": time_str,
                            "source": "Ninja",
                            "desc": f"Cottura perfetta per {title.lower()} usando programma Max Crisp/Air Fry.",
                            "ingredients": [title], # Ingrediente dedotto dal titolo
                            "raw_text": ""
                        })
    return recipes

# --- MOTORE 2: TEFAL (Parser "Ancora") ---
def extract_tefal(path):
    recipes = []
    print(f"🍳 Analisi TEFAL ({path})...")
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text: continue
            
            # Cerca pattern: TITOLO ... INGREDIENTI ... Versione digitale
            if "INGREDIENTI" in text and "Versione digitale" in text:
                try:
                    # 1. Trova i dati cottura (i più affidabili sono nella versione digitale)
                    parts = text.split("Versione digitale")
                    digital_data = parts[1].split("\n")[:3]
                    temp, time_str = parse_numbers(" ".join(digital_data))
                    if temp < 100: continue

                    # 2. Trova il Titolo (Prima di Ingredienti)
                    header_part = text.split("INGREDIENTI")[0]
                    lines = header_part.strip().split('\n')
                    # Il titolo è spesso l'ultima riga maiuscola o la prima della pagina
                    title = "Ricetta Tefal"
                    for line in reversed(lines):
                        if len(line) > 4 and not line.isdigit() and line.isupper():
                            title = line
                            break
                    
                    # 3. Estrai Ingredienti (Tra INGREDIENTI e RICETTA/Versione)
                    ing_part = text.split("INGREDIENTI")[1]
                    # Taglia dove inizia la preparazione
                    if "RICETTA" in ing_part:
                        ing_part = ing_part.split("RICETTA")[0]
                    elif "Versione" in ing_part:
                        ing_part = ing_part.split("Versione")[0]
                    
                    ingredients = [clean_text(line) for line in ing_part.split('\n') if len(line) > 3]

                    recipes.append({
                        "title": clean_text(title).title(),
                        "temp": temp,
                        "time": time_str,
                        "source": "Tefal",
                        "desc": f"Ricetta Easy Fry per {clean_text(title).lower()}.",
                        "ingredients": ingredients[:8], # Max 8 ingredienti
                        "raw_text": text
                    })
                except Exception as e:
                    pass
    return recipes

# --- MOTORE 3: COSORI (Parser a Blocchi) ---
def extract_cosori(path):
    recipes = []
    print(f"📕 Analisi COSORI ({path})...")
    with pdfplumber.open(path) as pdf:
        for i, page in enumerate(pdf.pages):
            if i < 6: continue 
            text = page.extract_text()
            if not text: continue
            
            # Filtro Pagine Indice (troppi numeri = indice)
            if text.count("...") > 3 or text.count("°C") > 5: continue

            # Cosori ha layout: TITOLO -> METADATI -> Ingredienti -> Istruzioni
            # Spezziamo su "Ingredienti"
            if "Ingredienti" in text:
                parts = text.split("Ingredienti")
                header = parts[0] # Contiene Titolo
                body = parts[1]   # Contiene Ingredienti + Istruzioni
                
                # 1. Estrai Titolo
                lines = header.strip().split('\n')
                title = ""
                # Cerca la riga più promettente (Maiuscola, no numeri)
                for line in lines:
                    if line.isupper() and len(line) > 5 and not any(c.isdigit() for c in line):
                        if "SOMMARIO" not in line and "INTRODUZIONE" not in line:
                            title = line
                            # Non brekko subito, a volte il titolo è su due righe, prendo l'ultima valida o la prima?
                            # Di solito è la prima riga grande.
                            break
                
                if not title: continue

                # 2. Estrai Temp/Tempo (cerca in tutto il testo per sicurezza)
                temp, time_str = parse_numbers(text)
                if temp < 100: continue

                # 3. Estrai Ingredienti
                # Prendi le righe subito dopo la parola "Ingredienti"
                body_lines = body.strip().split('\n')
                ingredients = []
                instructions = []
                capture_ingredients = True
                
                for line in body_lines:
                    # Se troviamo numeri di lista (1., 2.) passiamo alle istruzioni
                    if re.match(r'^\d+\.', line):
                        capture_ingredients = False
                    
                    if capture_ingredients:
                        if is_ingredient_line(line) or len(ingredients) < 2: # Euristica lasca all'inizio
                            ingredients.append(clean_text(line))
                    else:
                        instructions.append(line)
                
                # Pulizia lista ingredienti
                ingredients = [i for i in ingredients if len(i) > 3 and "Dosi" not in i]

                # 4. Crea Descrizione (usa le prime righe delle istruzioni o genera)
                desc = " ".join(instructions[:2]) 
                if len(desc) < 10: desc = f"Ricetta completa per {clean_text(title)} con friggitrice Cosori."

                recipes.append({
                    "title": clean_text(title).title(),
                    "temp": temp,
                    "time": time_str,
                    "source": "Cosori",
                    "desc": clean_text(desc)[:200] + "...",
                    "ingredients": ingredients[:8],
                    "raw_text": ""
                })

    return recipes

# --- MAIN ---
if __name__ == "__main__":
    all_data = []
    # Eseguiamo
    if os.path.exists(FILES['ninja']): all_data.extend(extract_ninja(FILES['ninja']))
    if os.path.exists(FILES['tefal']): all_data.extend(extract_tefal(FILES['tefal']))
    if os.path.exists(FILES['cosori']): all_data.extend(extract_cosori(FILES['cosori']))
    
    print(f"🔄 Deduplica di {len(all_data)} elementi...")
    
    final = []
    # Ordina per qualità dati (chi ha ingredienti vince)
    all_data.sort(key=lambda x: (len(x['ingredients']), len(x['title'])), reverse=True)

    for r in all_data:
        clean_t = r['title'].lower().replace("ricetta", "").strip()
        if len(clean_t) < 3: continue
        
        is_dup = False
        for existing in final:
            ex_clean = existing['title'].lower().replace("ricetta", "").strip()
            
            # Match Fuzzy molto stretto
            if SequenceMatcher(None, clean_t, ex_clean).ratio() > 0.85 or clean_t == ex_clean:
                # Se il nuovo ha ingredienti e il vecchio no, SOVRASCRIVI
                if not existing['ingredients'] and r['ingredients']:
                    existing['ingredients'] = r['ingredients']
                    existing['desc'] = r['desc'] # Spesso la descrizione segue gli ingredienti
                
                # Media valori
                existing['temp'] = (existing['temp'] + r['temp']) // 2
                existing['tip'] = f"Media verificata tra {existing['source']} e {r['source']}"
                is_dup = True
                break
        
        if not is_dup:
            r['slug'] = clean_t.replace(" ", "-").replace("'", "")
            r['emoji'] = get_emoji(r['title'])
            if 'tip' not in r: r['tip'] = "Controlla la doratura a metà cottura."
            # Rimuovi campi tecnici
            if 'raw_text' in r: del r['raw_text']
            final.append(r)

    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(final, f, indent=2, ensure_ascii=False)
        
    print(f"✅ SALVATO: {len(final)} ricette in {OUTPUT_JSON}")