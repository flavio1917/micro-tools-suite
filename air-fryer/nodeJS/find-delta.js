import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurazione __dirname per ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurazione file da pulire
const filesToClean = [
  { name: 'Inglese', path: path.join(__dirname, '..', 'src', 'data', 'recipes-en.json') },
  { name: 'Francese', path: path.join(__dirname, '..', 'src', 'data', 'recipes-fr.json') }
];

console.log('--- Inizio Pulizia Duplicati per Campo "Image" ---');

filesToClean.forEach(fileInfo => {
  try {
    console.log(`\n📄 Elaborazione file ${fileInfo.name}...`);
    
    if (!fs.existsSync(fileInfo.path)) {
      console.error(`❌ File non trovato: ${fileInfo.path}`);
      return;
    }

    const recipes = JSON.parse(fs.readFileSync(fileInfo.path, 'utf8'));
    const seenImages = new Set();
    const removedList = [];

    const uniqueRecipes = recipes.filter(recipe => {
      // Usiamo il valore del campo 'image' come chiave unica
      const imageKey = recipe.image;

      if (!imageKey) {
        // Se manca l'immagine (non dovrebbe), teniamo la ricetta per sicurezza
        return true;
      }

      if (seenImages.has(imageKey)) {
        // Trovato duplicato (valore image già visto)
        removedList.push(`[Slug: ${recipe.slug}] - Image: ${imageKey}`);
        return false;
      } else {
        // Prima volta che vediamo questa immagine
        seenImages.add(imageKey);
        return true;
      }
    });

    // Salvataggio file sovrascritto
    fs.writeFileSync(fileInfo.path, JSON.stringify(uniqueRecipes, null, 2), 'utf8');

    console.log(`✅ ${fileInfo.name} pulito!`);
    console.log(`   - Originali: ${recipes.length}`);
    console.log(`   - Rimaste:   ${uniqueRecipes.length}`);
    console.log(`   - Rimosse:   ${removedList.length}`);

    if (removedList.length > 0) {
      console.log(`   🗑️ Dettaglio rimosse:`);
      removedList.forEach(item => console.log(`     - ${item}`));
    }

  } catch (error) {
    console.error(`❌ Errore durante l'elaborazione di ${fileInfo.name}:`, error.message);
  }
});

console.log('\n--- Operazione completata ---');