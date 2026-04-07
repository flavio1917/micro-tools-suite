import fs from 'fs';

// Percorso del file JSON strutturato generato dall'AI
const aiOutputPath = './output-ai-multi.json';

// Array delle lingue da aggiornare
const langs = ['it', 'en', 'es', 'fr'];

try {
    // 1. Leggiamo l'output generato dall'AI
    const rawAiData = fs.readFileSync(aiOutputPath, 'utf8');
    const aiData = JSON.parse(rawAiData);

    console.log("Inizio l'aggiornamento dei file delle ricette...\n");

    // 2. Iteriamo su ogni lingua
    for (const lang of langs) {
        const filePath = `../src/data/recipes-${lang}.json`;
        
        // Controlliamo se il file della lingua esiste
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Attenzione: File non trovato -> ${filePath}. Lo salto.`);
            continue;
        }

        const originalData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let updateCount = 0;

        // 3. Aggiorniamo i dati
        const updatedData = originalData.map(recipe => {
            
            // LA MAGIA È QUI: 
            // Se siamo nel file italiano usiamo 'slug', se siamo negli altri usiamo 'image' come chiave
            const lookupKey = (lang === 'it') ? recipe.slug : recipe.image;

            // Se la chiave non esiste nel file straniero, fa un fallback sullo slug (per vecchie ricette)
            const finalKey = lookupKey || recipe.slug;

            // Controlliamo se nel JSON dell'AI esiste questa chiave
            if (aiData[finalKey]) {
                // Controlliamo se esiste la traduzione per la lingua corrente
                if (aiData[finalKey][lang]) {
                    const optimized = aiData[finalKey][lang];
                    updateCount++;
                    
                    // Restituiamo la ricetta intatta, sovrascrivendo title e description
                    return {
                        ...recipe,
                        title: optimized.title,
                        description: optimized.description
                    };
                } else {
                     // Opzionale: log per vedere se manca la lingua specifica
                     // console.warn(`    -> Traduzione mancante per [${lang}] nella chiave: ${finalKey}`);
                }
            }
            // Se non c'è aggiornamento, restituiamo la ricetta originale
            return recipe;
        });

        // 4. Salviamo il file aggiornato sovrascrivendo l'originale
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        console.log(`✅ Successo! Aggiornate ${updateCount} ricette in ${filePath}`);
    }

    console.log("\n🚀 Iniezione multilingua completata con successo!");

} catch (err) {
    console.error("\n❌ Errore critico durante l'esecuzione dello script:", err.message);
    if (err.name === 'SyntaxError') {
         console.error("   Sembra esserci un errore di sintassi nel file JSON (output-ai-multi.json). Controlla virgole e parentesi.");
    }
}