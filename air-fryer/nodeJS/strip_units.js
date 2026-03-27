import fs from 'fs';
import path from 'path';

const baseDir = process.cwd().includes('nodeJS') ? path.join(process.cwd(), '../src/data') : path.join(process.cwd(), 'src/data');
const langs = ['it', 'en', 'es', 'fr'];

// Regex implacabile: cerca qualsiasi variante di "minuti" e la polverizza
const wordsToRemove = /\s*(minuti|minutes min|minutes|mins|minutos|min)\s*/gi;

console.log('🧹 Avvio estrazione dati puri (rimozione unità di misura)...');

let totalCleaned = 0;

langs.forEach(lang => {
    const filePath = path.join(baseDir, `recipes-${lang}.json`);
    if (!fs.existsSync(filePath)) return;

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const recipes = JSON.parse(fileContent);
        let fileChanged = false;

        recipes.forEach(recipe => {
            // Pialla il campo time
            if (recipe.time && typeof recipe.time === 'string' && recipe.time.match(wordsToRemove)) {
                recipe.time = recipe.time.replace(wordsToRemove, '').trim();
                fileChanged = true;
                totalCleaned++;
            }
            // Pialla il campo prep_time
            if (recipe.prep_time && typeof recipe.prep_time === 'string' && recipe.prep_time.match(wordsToRemove)) {
                recipe.prep_time = recipe.prep_time.replace(wordsToRemove, '').trim();
                fileChanged = true;
                totalCleaned++;
            }
        });

        if (fileChanged) {
            fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
            console.log(`✅ [${lang.toUpperCase()}] Puliti i tempi. Ora i JSON contengono solo i numeri.`);
        } else {
            console.log(`✅ [${lang.toUpperCase()}] Nessuna unità di misura trovata. Già pulito.`);
        }
    } catch (error) {
        console.error(`❌ [${lang.toUpperCase()}] Errore:`, error.message);
    }
});

console.log(`🚀 Bonifica completata! Modificati ${totalCleaned} campi tempo.`);