import json
import re

FILE_PATH = 'src/data/recipes.json'

# --- 1. CONFIGURAZIONE PRIORITÀ ---
PRIORITY_KEYWORDS = {
    # TIER 1: Il motivo per cui si compra l'Air Fryer (Fritto & Pollo)
    'patatine': 1, 'fritte': 1, 'fritto': 1, 'stick': 1,
    'pollo': 2, 'ali': 2, 'cosce': 2, 'alette': 2, 'crocchette': 2, 'nuggets': 2, 'cotoletta': 2,
    # TIER 2: Carne Rossa (Main Course)
    'hamburger': 3, 'salsiccia': 3, 'salsicce': 3, 'manzo': 3, 'maiale': 3, 'bistecca': 3, 'agnello': 3, 'polpette': 3, 'costine': 3,
    # TIER 3: Pesce & Uova (Light)
    'pesce': 4, 'gamberi': 4, 'salmone': 4, 'merluzzo': 4, 'orata': 4, 'calamari': 4, 'uovo': 4, 'uova': 4,
    # TIER 4: Dolci (Advanced Users)
    'muffin': 5, 'torta': 5, 'dolce': 5, 'biscotti': 5, 'cioccolato': 5, 'brioche': 5, 'french toast': 5,
    # TIER 5: Verdure (Contorni)
    'zucchine': 6, 'melanzane': 6, 'verdure': 6, 'cavolfiore': 6, 'broccoli': 6, 'carote': 6, 'patate': 6, 'peperoni': 6, 'asparagi': 6, 'funghi': 6
}

# --- 2. FUNZIONE DI PULIZIA (ANTI-CRASH) ---
def clean_surrogates(text):
    if not isinstance(text, str): return text
    try:
        # Trucco per unire le coppie di surrogati (le mezze emoji)
        return text.encode('utf-16', 'surrogatepass').decode('utf-16')
    except UnicodeError:
        # Se è irrecuperabile, lo rimuoviamo per salvare il file
        return text.encode('utf-8', 'ignore').decode('utf-8')

def get_priority(recipe):
    text = (str(recipe.get('title', '')) + " " + " ".join(recipe.get('ingredients', []))).lower()
    best_priority = 7 # Default (Generico)
    
    for word, priority in PRIORITY_KEYWORDS.items():
        if word in text:
            if priority < best_priority:
                best_priority = priority
    return best_priority

def sort_and_fix_json():
    print("🔄 Leggo il file delle ricette...")
    
    # Leggiamo permettendo i surrogati in memoria
    try:
        with open(FILE_PATH, 'r', encoding='utf-8', errors='replace') as f:
            # Carichiamo il raw text prima
            raw_content = f.read()
            # Fix manuale per i literal "uXXXX"
            fixed_raw = re.sub(r'(?<!\\)u([0-9a-fA-F]{4})', r'\\u\1', raw_content)
            data = json.loads(fixed_raw)
    except Exception as e:
        print(f"❌ Errore in lettura: {e}")
        return

    print("🧹 Pulisco i dati corrotti in memoria...")
    # Applichiamo la pulizia a tutti i campi stringa PRIMA di ordinare e salvare
    for recipe in data:
        for key, val in recipe.items():
            if isinstance(val, str):
                recipe[key] = clean_surrogates(val)

    print("⚖️ Riordino le ricette (Priorità 1-7)...")
    # Ordina prima per Priorità (Crescente), poi per Titolo
    data.sort(key=lambda x: (get_priority(x), x.get('title', '')))

    # Statistiche
    counts = {i: 0 for i in range(1, 8)}
    for r in data:
        p = get_priority(r)
        counts[p] += 1
    
    print(f"📊 Distribuzione:\n  Tier 1-2 (Top): {counts[1]+counts[2]}\n  Tier 3-4 (Main): {counts[3]+counts[4]}\n  Tier 5-6-7 (Altri): {counts[5]+counts[6]+counts[7]}")

    print("💾 Salvataggio BLINDATO...")
    try:
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("✅ Fatto! Database riordinato e pulito.")
    except Exception as e:
        print(f"❌ Errore critico nel salvataggio: {e}")

if __name__ == "__main__":
    sort_and_fix_json()