import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'src', 'data');
const files = ['recipes-it.json', 'recipes-en.json', 'recipes-es.json', 'recipes-fr.json'];

// TRIGGER SALATI FORTI: se c'è uno di questi, la ricetta è al 99% salata, NON un dessert.
const saltyTriggers = [
    'sale', 'pepe', 'aglio', 'cipolla', 'carne', 'pollo', 'manzo', 'maiale', 'pesce', 
    'salmone', 'tonno', 'patate', 'zucchine', 'melanzane', 'peperoni', 'salsiccia', 
    'bacon', 'pancetta', 'parmigiano', 'pecorino', 'mozzarella', 'pomodoro', 'brodo',
    'salt', 'pepper', 'garlic', 'onion', 'meat', 'chicken', 'beef', 'pork', 'fish',
    'sal', 'pimienta', 'ajo', 'cebolla', 'carne', 'pollo', 'cerdo', 'pescado',
    'sel', 'poivre', 'ail', 'oignon', 'viande', 'poulet', 'boeuf', 'porc', 'poisson'
];

// TRIGGER DOLCI FORTI: per evitare i "falsi positivi" salati (es. "Torta" Salata).
// Se c'è uno di questi ingredienti in abbondanza, è davvero un dolce.
const realSweetTriggers = [
    'zucchero', 'cacao', 'cioccolato', 'marmellata', 'nutella', 'vaniglia', 'lievito per dolci',
    'sugar', 'cocoa', 'chocolate', 'jam', 'vanilla', 'baking powder',
    'azúcar', 'cacao', 'chocolate', 'mermelada', 'vainilla', 'levadura',
    'sucre', 'cacao', 'chocolat', 'confiture', 'vanille', 'levure'
];

// PAROLE DA CANCELLARE
const forbiddenKeywords = [
    'dolce', 'dessert', 'colazione', 'merenda', 'sweet', 'breakfast', 'snack',
    'postre', 'dulce', 'desayuno', 'merienda', 'dessert', 'sucré', 'petit déjeuner', 'goûter'
];

console.log("🧹 INIZIO PULIZIA DEFINITIVA ANTI-ALLUCINAZIONI...\n");

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) return;

    let raw = fs.readFileSync(filePath, 'utf8');
    let recipes = JSON.parse(raw);
    let changed = 0;

    recipes.forEach(recipe => {
        const titleAndIng = (recipe.title + " " + (recipe.ingredients || []).join(" ")).toLowerCase();
        
        const isSalty = saltyTriggers.some(t => titleAndIng.includes(t));
        const isRealSweet = realSweetTriggers.some(t => titleAndIng.includes(t));

        // LA REGOLA D'ORO: Se ha ingredienti salati E NON ha ingredienti prettamente da pasticceria
        if (isSalty && !isRealSweet && recipe.keywords) {
            
            let tags = recipe.keywords.split(',').map(k => k.trim());
            let originalLength = tags.length;

            // Rimuovi tutti i tag dolci
            tags = tags.filter(t => !forbiddenKeywords.includes(t.toLowerCase()));

            if (tags.length !== originalLength) {
                recipe.keywords = tags.join(', ');
                changed++;
                console.log(`Corretta: ${recipe.title}`);
            }
        }
    });

    if (changed > 0) {
        fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
        console.log(`✅ ${file}: Rimosse keyword "dolci" errate da ${changed} ricette salate.\n`);
    } else {
        console.log(`👍 ${file}: Nessuna modifica necessaria.\n`);
    }
});