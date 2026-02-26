import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// In ES Modules dobbiamo ricreare __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'data', 'recipes.json');

console.log('⏳ Lettura del file recipes.json in corso...');

try {
  let rawdata = fs.readFileSync(filePath, 'utf-8');
  let recipes = JSON.parse(rawdata);
  let counter = 0;

  // Analizziamo ogni ricetta
  recipes = recipes.map(recipe => {
    // Creiamo un testo unico minuscolo con titolo, desc e ingredienti per la ricerca
    const textToSearch = `${recipe.title} ${recipe.description || ''} ${(recipe.ingredients || []).join(' ')}`.toLowerCase();
    
    // Usiamo un Set per evitare keywords duplicate
    let keywords = new Set();

    // --- REGOLE INTELLIGENTI ---

    // 1. Frittura e Sfiziosità
    if (textToSearch.match(/fritt|patat|calamar|gamber|crocchett|cotolett|panat|panatura|anelli|bastoncini|nuggets|chips/)) {
      keywords.add('frittura');
      keywords.add('fritto');
      keywords.add('croccante');
      keywords.add('sfizioso');
    }

    // 2. Carne
    if (textToSearch.match(/pollo|carne|manzo|hamburger|salsicci|maiale|bistecc|arrost|alette|tacchino|wurstel/)) {
      keywords.add('carne');
      keywords.add('secondo');
      keywords.add('proteico');
    }

    // 3. Pesce
    if (textToSearch.match(/pesce|salmon|branzin|orat|merluzz|calamar|gamber|tonno|polpo|seppia/)) {
      keywords.add('pesce');
      keywords.add('mare');
      keywords.add('secondo');
    }

    // 4. Verdure / Contorni / Vegetariano
    if (textToSearch.match(/zucchine|melanzane|peperon|verdur|broccol|zucca|patat|asparag|cavolfior|carot/)) {
      keywords.add('verdure');
      keywords.add('contorno');
      keywords.add('vegetariano');
    }

    // 5. Dolci e Colazione
    if (textToSearch.match(/tort|muffin|biscott|cioccolat|dolc|zuccher|cornett|sfogli|mele|cacao|crema|nutella/)) {
      keywords.add('dolce');
      keywords.add('dessert');
      keywords.add('colazione');
      keywords.add('merenda');
    }

    // 6. Lievitati / Rustici / Snack
    if (textToSearch.match(/pane|pizz|focacci|rustico|salat|piadina|bruschetta/)) {
      keywords.add('lievitato');
      keywords.add('salato');
      keywords.add('aperitivo');
      keywords.add('snack');
    }

    // 7. Aggiunte generiche basate sul tempo
    if (recipe.time && parseInt(recipe.time) <= 15) {
      keywords.add('veloce');
      keywords.add('facile');
      keywords.add('rapido');
    }

    // Aggiungi le keywords come stringa, separata da virgole
    recipe.keywords = Array.from(keywords).join(', ');
    counter++;

    return recipe;
  });

  // Salviamo le modifiche nel file sovrascrivendolo
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
  
  console.log(`✅ SUCCESSO! Aggiunte o aggiornate le keywords per ${counter} ricette.`);
  console.log(`Ora chi cerca "frittura" o "pesce" o "dolce" troverà risultati accurati!`);

} catch (error) {
  console.error('❌ Errore durante la lettura o scrittura del file:', error.message);
  console.log('Assicurati che il percorso src/data/recipes.json sia corretto.');
}