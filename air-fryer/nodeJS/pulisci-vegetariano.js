import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'src', 'data');
const files = ['recipes-it.json', 'recipes-en.json', 'recipes-es.json', 'recipes-fr.json'];

// TRIGGER "SACRI": Se trova queste parole, la ricetta è SICURAMENTE un dolce.
// NOTA: Ho TOLTO 'dolce' e 'dessert' da qui per evitare falsi positivi!
const dessertTriggers = {
    it: ['muffin', 'sfoglia', 'cocco', 'biscotti', 'torta', 'plumcake', 'fragole', 'mirtilli', 'dolcetti', 'limone', 'banana', 'marmellata', 'nutella', 'cioccolato', 'cacao', 'croissant', 'vaniglia', 'lievito'],
    en: ['muffin', 'pastry', 'coconut', 'cookies', 'cake', 'plumcake', 'strawberries', 'blueberries', 'lemon', 'banana', 'jam', 'nutella', 'chocolate', 'cocoa', 'croissant', 'vanilla', 'baking powder'],
    es: ['muffin', 'hojaldre', 'coco', 'galletas', 'tarta', 'limón', 'plátano', 'fresas', 'mermelada', 'nutella', 'chocolate', 'cacao', 'croissant', 'vainilla', 'levadura'],
    fr: ['muffin', 'feuilletée', 'coco', 'biscuits', 'gâteau', 'citron', 'banane', 'fraises', 'confiture', 'nutella', 'chocolat', 'cacao', 'croissant', 'vanille', 'levure']
};

const forbiddenTags = {
    it: ['dolce', 'dessert', 'colazione', 'merenda'],
    en: ['sweet', 'dessert', 'breakfast', 'snack'],
    es: ['dulce', 'postre', 'desayuno', 'merienda'],
    fr: ['sucré', 'dessert', 'petit déjeuner', 'goûter']
};

console.log("🚀 AVVIO PULIZIA FINALE (Niente più inganni)...");

files.forEach(file => {
    const lang = file.split('-')[1].replace('.json', '');
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) return;

    let raw = fs.readFileSync(filePath, 'utf8');
    let recipes = JSON.parse(raw);
    let changed = 0;

    recipes.forEach(recipe => {
        const textToSearch = (recipe.title + " " + (recipe.ingredients || []).join(" ") + " " + recipe.description).toLowerCase();
        
        // Controlliamo se è un vero dolce usando la lista "sacra" (senza parole ambigue)
        const isRealDessert = dessertTriggers[lang].some(t => textToSearch.includes(t));

        // Se NON è un vero dolce, puliamo i tag
        if (!isRealDessert && recipe.keywords) {
            let tags = recipe.keywords.split(',').map(k => k.trim());
            let originalCount = tags.length;

            tags = tags.filter(t => !forbiddenTags[lang].includes(t.toLowerCase()));

            if (tags.length !== originalCount) {
                recipe.keywords = tags.join(', ');
                changed++;
                console.log(`🧹 Pulita: "${recipe.title}" (Rimossi tag dolci da ricetta salata/neutra)`);
            }
        }
    });

    if (changed > 0) {
        fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
        console.log(`✅ ${file}: Corrette ${changed} ricette.`);
    } else {
        console.log(`👍 ${file}: Nessuna ricetta da pulire.`);
    }
});