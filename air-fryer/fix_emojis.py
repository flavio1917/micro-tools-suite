import json
import re

# Percorso del tuo file JSON
FILE_PATH = 'src/data/recipes.json'

def fix_unicode_string(s):
    # Se la stringa inizia con 'u' seguito da esadecimali (es. uD83C...)
    # Sostituiamo ogni 'u' che precede 4 cifre esadecimali con '\u'
    if s and isinstance(s, str) and s.startswith('u') and len(s) > 4:
        # Aggiunge il backslash per creare una sequenza unicode escape valida
        escaped_str = re.sub(r'u([0-9a-fA-F]{4})', r'\\u\1', s)
        try:
            # Decodifica la sequenza (es. \uD83C\uDF55 -> 🍕)
            return escaped_str.encode('latin1').decode('unicode-escape')
        except:
            return s
    return s

try:
    print(f"🔄 Leggo {FILE_PATH}...")
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    count = 0
    for recipe in data:
        original_emoji = recipe.get('emoji', '')
        # Tenta il fix
        fixed_emoji = fix_unicode_string(original_emoji)
        
        # Se è cambiato qualcosa, aggiorna
        if original_emoji != fixed_emoji:
            recipe['emoji'] = fixed_emoji
            count += 1

    print(f"✅ Corrette {count} emoji.")

    # Salva il file con le EMOJI VERE (non codici)
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("💾 File salvato correttamente! Ora dovresti vedere le icone.")

except Exception as e:
    print(f"❌ Errore: {e}")