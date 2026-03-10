import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'src', 'data');
const files = ['recipes-it.json', 'recipes-en.json', 'recipes-es.json', 'recipes-fr.json'];

// 1. Definiamo i trigger per capire la NATURA della ricetta
const triggers = {
    meat: ['carne', 'pollo', 'manzo', 'maiale', 'bistecca', 'ali', 'salsiccia', 'meat', 'chicken', 'beef', 'pork', 'steak', 'viande', 'poulet'],
    sweet: ['zucchero', 'farina', 'cacao', 'cioccolato', 'muffin', 'biscotti', 'torta', 'dolce', 'sugar', 'flour', 'chocolate', 'cake', 'sweet', 'sucre', 'gâteau'],
    fish: ['pesce', 'tonno', 'salmone', 'gamberi', 'fish', 'salmon', 'tuna', 'shrimp', 'poisson', 'saumon']
};

// 2. Definiamo quali tag sono proibiti se la natura è X
const conflicts = {
    meat: ['dolce', 'dessert', 'colazione', 'merenda', 'vegetariano', 'vegano', 'vegan', 'veggie', 'sweet', 'breakfast', 'snack', 'sucré', 'végétarien'],
    sweet: ['carne', 'secondo', 'proteico', 'pollo', 'manzo', 'maiale', 'salato', 'aperitivo', 'meat', 'fish', 'salt', 'aperitif'],
    fish: ['carne', 'pollo', 'maiale', 'manzo', 'meat', 'chicken', 'beef', 'pork']
};

console.log("🛠️ INIZIO PULIZIA LOGICA... (Rimuovo tag contraddittori)\n");

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) return;

    let raw = fs.readFileSync(filePath, 'utf8');
    let recipes = JSON.parse(raw);
    let changed = 0;

    recipes.forEach(recipe => {
        const textContent = (recipe.title + " " + (recipe.ingredients || []).join(" ")).toLowerCase();
        
        // Determiniamo la natura della ricetta
        const isMeat = triggers.meat.some(t => textContent.includes(t));
        const isSweet = triggers.sweet.some(t => textContent.includes(t));
        const isFish = triggers.fish.some(t => textContent.includes(t));

        if (recipe.keywords) {
            let tags = recipe.keywords.split(',').map(k => k.trim());
            let originalLength = tags.length;

            // Applichiamo i conflitti
            if (isMeat) tags = tags.filter(t => !conflicts.meat.includes(t.toLowerCase()));
            if (isSweet) tags = tags.filter(t => !conflicts.sweet.includes(t.toLowerCase()));
            if (isFish) tags = tags.filter(t => !conflicts.fish.includes(t.toLowerCase()));

            if (tags.length !== originalLength) {
                recipe.keywords = tags.join(', ');
                changed++;
                // console.log(`Corretta: ${recipe.title}`);
            }
        }
    });

    if (changed > 0) {
        fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
        console.log(`✅ ${file}: Corrette ${changed} ricette.`);
    } else {
        console.log(`👍 ${file}: Tutto ok.`);
    }
});