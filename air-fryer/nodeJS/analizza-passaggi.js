import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, 'src', 'data', 'recipes-it.json');

// Definiamo le "Macro-Azioni" che corrispondono alle tue future foto
const actionCategories = {
    'PRERISCALDAMENTO': ['preriscalda', 'riscalda'],
    'AGITARE/SHAKE': ['scuoti', 'agita', 'muovi', 'mescola'],
    'GIRARE': ['gira', 'rivolta', 'capovolgi'],
    'OLIARE/SPRUZZARE': ['olio', 'spray', 'ungi', 'spennella'],
    'IMPACCIATURA/PANATURA': ['uovo', 'pangrattato', 'impana', 'farina'],
    'COTTURA/TIMER': ['cuoci', 'lascia cuocere', 'attendi', 'minuti'],
    'CONTROLLO/APERTURA': ['apri', 'estrae', 'estrai', 'controllo']
};

try {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const recipes = JSON.parse(rawData);
    
    const stats = {};
    Object.keys(actionCategories).forEach(cat => stats[cat] = 0);

    recipes.forEach(recipe => {
        if (recipe.instructions && Array.isArray(recipe.instructions)) {
            recipe.instructions.forEach(step => {
                const stepLower = step.toLowerCase();
                
                // Controlliamo se il passaggio contiene una delle parole chiave
                for (const [category, keywords] of Object.entries(actionCategories)) {
                    if (keywords.some(keyword => stepLower.includes(keyword))) {
                        stats[category]++;
                        // Trovata una categoria, non cerchiamo le altre per questo step
                        break; 
                    }
                }
            });
        }
    });

    console.log("\n📊 ANALISI AZIONI COMUNI (Macro-categorie) 📊\n");
    Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .forEach(([cat, count]) => {
            console.log(`${cat.padEnd(25)}: ${count} occorrenze`);
        });

    console.log("\n💡 Consiglio: Genera 1 foto Master per ogni categoria con più di 10-20 occorrenze!");

} catch (error) {
    console.error("Errore:", error.message);
}