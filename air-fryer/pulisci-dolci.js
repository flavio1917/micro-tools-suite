import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'src', 'data');
const files = ['recipes-it.json', 'recipes-en.json', 'recipes-es.json', 'recipes-fr.json'];

// Parole che indicano che una ricetta è VERAMENTE un dolce
const sweetTriggers = [
    'zucchero', 'farina', 'cacao', 'cioccolato', 'dolce', 'dessert', 'muffin', 'biscotti', 'torta', 'vaniglia', 'lievito per dolci',
    'sugar', 'flour', 'cocoa', 'chocolate', 'dessert', 'sweet', 'cookie', 'cake', 'vanilla', 'baking powder',
    'azúcar', 'harina', 'cacao', 'chocolate', 'postre', 'dulce', 'galletas', 'tarta', 'vainilla', 'levadura',
    'sucre', 'farine', 'cacao', 'chocolat', 'dessert', 'sucré', 'gâteau', 'vanille', 'levure'
];

// Parole da rimuovere se la ricetta NON è un dolce
const forbiddenKeywords = [
    'dolce', 'dessert', 'colazione', 'merenda', 
    'sweet', 'breakfast', 'snack', 
    'postre', 'dulce', 'desayuno', 'merienda', 
    'dessert', 'sucré', 'petit déjeuner', 'goûter'
];

console.log("🧁 INIZIO RIMOZIONE KEYWORDS DOLCI DA RICETTE SALATE...\n");

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) return;

    let raw = fs.readFileSync(filePath, 'utf8');
    let recipes = JSON.parse(raw);
    let fixedCount = 0;

    recipes.forEach(recipe => {
        const textToSearch = (recipe.title + " " + (recipe.ingredients || []).join(" ")).toLowerCase();
        
        // Controlliamo se la ricetta è DAVVERO un dolce
        const isSweet = sweetTriggers.some(trigger => textToSearch.includes(trigger));

        if (!isSweet && recipe.keywords) {
            let originalKeywords = recipe.keywords;
            let keywordArray = originalKeywords.split(',').map(k => k.trim());
            
            // Filtriamo solo le parole che NON sono nella lista proibita
            const newKeywordsArray = keywordArray.filter(k => 
                !forbiddenKeywords.includes(k.toLowerCase())
            );

            if (newKeywordsArray.length !== keywordArray.length) {
                recipe.keywords = newKeywordsArray.join(', ');
                fixedCount++;
            }
        }
    });

    if (fixedCount > 0) {
        fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
        console.log(`✅ ${file}: Ripulite ${fixedCount} ricette salate da tag "dolci/colazione".`);
    } else {
        console.log(`👍 ${file}: Nessuna ricetta da pulire.`);
    }
});

console.log("\n🚀 OPERAZIONE COMPLETATA!");