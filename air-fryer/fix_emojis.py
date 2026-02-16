import json
import os
import shutil

FILE_PATH = 'src/data/recipes.json'
BACKUP_PATH = 'src/data/recipes.json.bak_surrogate'

def fix_surrogates_and_save():
    if not os.path.exists(FILE_PATH):
        print(f"❌ Errore: Il file {FILE_PATH} non esiste.")
        return

    # 1. Backup
    print(f"📦 Creo backup in {BACKUP_PATH}...")
    shutil.copy(FILE_PATH, BACKUP_PATH)

    # 2. Leggi come testo RAW
    print("📖 Leggo il file...")
    with open(FILE_PATH, 'r', encoding='utf-8', errors='replace') as f:
        raw_content = f.read()

    # 3. FIX MANUALE DEI CODICI "uXXXX"
    # Sostituiamo i pattern tipo "uD83E" che non hanno il backslash con "\uD83E"
    # Questo è fondamentale perché spesso lo scraping lascia "u" invece di "\u"
    import re
    # Cerca uXXXX solo se non è preceduto da backslash
    fixed_raw = re.sub(r'(?<!\\)u([0-9a-fA-F]{4})', r'\\u\1', raw_content)
    
    # Rimuoviamo doppi backslash errati se si sono creati
    fixed_raw = fixed_raw.replace('\\\\u', '\\u')

    try:
        # Carichiamo in memoria
        data = json.loads(fixed_raw)
        print(f"✅ JSON caricato in memoria. Trovate {len(data)} ricette.")
        
        # 4. PULIZIA PROFONDA (Il trucco anti-crash)
        print("🧹 Pulisco le stringhe dai surrogati rotti...")
        
        def clean_string(text):
            if not isinstance(text, str): return text
            try:
                # TRUCCO MAGICO:
                # 1. Codifica in UTF-16 permettendo i "surrogati" (le mezze emoji)
                # 2. Decodifica subito dopo: questo costringe Python a unire le coppie in un carattere unico
                return text.encode('utf-16', 'surrogatepass').decode('utf-16')
            except UnicodeError:
                # Se proprio non riesce, ELIMINA il carattere corrotto per salvare il file
                # Meglio perdere un'emoji che tutto il file
                print(f"⚠️ Carattere illegale rimosso in: {text[:20]}...")
                return text.encode('utf-8', 'ignore').decode('utf-8')

        # Applichiamo la pulizia a tutti i campi
        for recipe in data:
            if 'emoji' in recipe:
                recipe['emoji'] = clean_string(recipe['emoji'])
            if 'title' in recipe:
                recipe['title'] = clean_string(recipe['title'])
            if 'description' in recipe:
                recipe['description'] = clean_string(recipe['description'])

        # 5. SALVATAGGIO
        print("💾 Salvataggio in corso...")
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            # ensure_ascii=False è cruciale per scrivere le emoji vere e non i codici
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print("🚀 SUCCESSO! File salvato e riparato.")
        print("Ora puoi fare 'npm run build'.")

    except Exception as e:
        print(f"❌ Errore fatale: {e}")
        # Se fallisce json.loads, proviamo a salvare il raw fixato come tentativo disperato
        print("⚠️ Tento il salvataggio del testo grezzo corretto...")
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            f.write(fixed_raw)
        print("💾 Salvato testo grezzo. Controlla il file manualmente.")

if __name__ == "__main__":
    fix_surrogates_and_save()