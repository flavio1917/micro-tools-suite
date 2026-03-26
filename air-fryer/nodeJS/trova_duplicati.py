import json
import os
from collections import defaultdict

# Imposta il percorso del tuo file recipes.json
# Adattalo se necessario. Di default cerca in src/data/recipes.json
percorso_file = os.path.join('src', 'data', 'recipes.json')

# Se lo script è nella stessa cartella del file json, usa questa riga:
if not os.path.exists(percorso_file):
    percorso_file = 'recipes.json'

def trova_duplicati():
    try:
        with open(percorso_file, 'r', encoding='utf-8') as f:
            ricette = json.load(f)
            
        # Dizionario per raggruppare le ricette in base allo slug
        slug_visti = defaultdict(list)
        
        for indice, ricetta in enumerate(ricette):
            slug = ricetta.get('slug')
            titolo = ricetta.get('title', 'Senza Titolo')
            if slug:
                slug_visti[slug].append({"indice": indice, "titolo": titolo})
                
        # Filtra solo quelli che compaiono più di una volta
        duplicati = {slug: dati for slug, dati in slug_visti.items() if len(dati) > 1}
        
        if duplicati:
            print(f"⚠️ ATTENZIONE: Trovati {len(duplicati)} slug duplicati nel file JSON!\n")
            for slug, occorrenze in duplicati.items():
                print(f"🔴 Slug duplicato: '{slug}'")
                for occorrenza in occorrenze:
                    print(f"   -> Ricetta N° {occorrenza['indice'] + 1} | Titolo: \"{occorrenza['titolo']}\"")
                print("-" * 50)
            
            print("\n💡 AZIONE RICHIESTA: Apri il tuo file recipes.json, cerca gli slug indicati qui sopra e cancella la versione sbagliata (quella poetica). Assicurati che ogni blocco ricetta termini con una virgola (tranne l'ultimo).")
        else:
            print("✅ OTTIMO! Non ci sono duplicati. Tutti gli slug sono unici.")

    except FileNotFoundError:
        print(f"❌ Errore: Impossibile trovare il file {percorso_file}.")
    except json.JSONDecodeError as e:
        print(f"❌ Errore: Il file JSON non è formattato correttamente. Controlla virgole e parentesi. Dettagli: {e}")

if __name__ == "__main__":
    trova_duplicati()