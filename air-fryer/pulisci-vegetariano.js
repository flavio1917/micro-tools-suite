import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// In ESM __dirname non esiste, dobbiamo ricrearlo così:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso dei tuoi file JSON
const dataDir = path.join(__dirname, 'src', 'data');
const files = ['recipes-it.json', 'recipes-en.json', 'recipes-es.json', 'recipes-fr.json'];

// Dizionario massivo di "trigger" di carne/pesce nelle 4 lingue
const meatTriggers = [
    'carne', 'pesce', 'pollo', 'manzo', 'maiale', 'vitello', 'agnello', 'tacchino', 
    'salsiccia', 'salsicce', 'bacon', 'pancetta', 'guanciale', 'prosciutto', 'speck', 
    'bresaola', 'salame', 'wurstel', 'salmone', 'tonno', 'gamberi', 'gamberetti', 
    'calamari', 'calamaro', 'merluzzo', 'baccalà', 'polpo', 'seppie', 'cozze', 'vongole',
    'meat', 'fish', 'chicken', 'beef', 'pork', 'veal', 'lamb', 'turkey', 
    'sausage', 'sausages', 'ham', 'salami', 'salmon', 'tuna', 'shrimp', 'shrimps', 
    'prawn', 'prawns', 'squid', 'cod', 'octopus', 'mussel', 'mussels', 'clam', 'clams',
    'pescado', 'ternera', 'cerdo', 'cordero', 'pavo', 'salchicha', 'salchichas', 
    'tocino', 'jamón', 'chorizo', 'salmón', 'atún', 'camarón', 'camarones', 
    'langostino', 'langostinos', 'calamar', 'calamares', 'bacalao', 'pulpo',
    'viande', 'poisson', 'poulet', 'boeuf', 'bœuf', 'porc', 'veau', 'agneau', 'dinde', 
    'saucisse', 'saucisses', 'lardon', 'lardons', 'jambon', 'saumon', 'thon', 
    'crevette', 'crevettes', 'calmar', 'calmars', 'cabillaud', 'poulpe'
];

const veggieKeywordsRegex = /\b(vegetariano|vegetariana|vegetarian|veggie|vegan|vegano|vegana|végétarien|végétarienne)\b/gi;

console.log("🧹 INIZIO PULIZIA KEYWORDS VEGETARIANE ERRATE...\n");

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File non trovato: ${file}`);
        return;
    }

    let raw = fs.readFileSync(filePath, 'utf8');
    let recipes = JSON.parse(raw);
    let fixedCount = 0;

    recipes.forEach(recipe => {
        let isMeat = false;
        
        let textToSearch = (recipe.title || "") + " " + (recipe.ingredients ? recipe.ingredients.join(" ") : "");
        textToSearch = textToSearch.toLowerCase();
        
        for (let trigger of meatTriggers) {
            let regex = new RegExp('\\b' + trigger + '\\b', 'i');
            if (regex.test(textToSearch)) {
                isMeat = true;
                break;
            }
        }

        if (isMeat && recipe.keywords) {
            let originalKeywords = recipe.keywords;
            let newKeywords = originalKeywords.replace(veggieKeywordsRegex, '')
                .replace(/,\s*,/g, ',')
                .replace(/^[\s,]+|[\s,]+$/g, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
            
            if (originalKeywords !== newKeywords) {
                recipe.keywords = newKeywords;
                fixedCount++;
            }
        }
    });

    if (fixedCount > 0) {
        fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
        console.log(`✅ ${file}: Ripulite ${fixedCount} ricette di carne/pesce falsamente vegetariane.`);
    } else {
        console.log(`👍 ${file}: Tutte le ricette erano già corrette.`);
    }
});

console.log("\n🚀 OPERAZIONE COMPLETATA! Fai un push per aggiornare Vercel.");