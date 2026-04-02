import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ricreiamo __dirname per gli ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ INSERISCI QUI IL NOME ESATTO DELLA CARTELLA DEL TUO PROGETTO
const nomeCartellaProgetto = 'air-fryer'; 

// Percorso aggiornato
const filePath = path.join(__dirname, '..', 'src', 'data', 'recipes-en.json');

try {
  console.log('Lettura del file in corso...');
  const rawData = fs.readFileSync(filePath, 'utf8');
  const recipes = JSON.parse(rawData);

  const seenSlugs = new Set();
  const duplicatesRemoved = [];
  
  const uniqueRecipes = recipes.filter(recipe => {
    const identifier = recipe.slug || recipe.title;

    if (seenSlugs.has(identifier)) {
      duplicatesRemoved.push(identifier);
      return false; 
    } else {
      seenSlugs.add(identifier);
      return true; 
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(uniqueRecipes, null, 2), 'utf8');

  console.log('\n✅ PULIZIA COMPLETATA CON SUCCESSO!\n');
  console.log(`📊 STATISTICHE:`);
  console.log(`- Ricette totali (prima): ${recipes.length}`);
  console.log(`- Ricette uniche (dopo):  ${uniqueRecipes.length}`);
  console.log(`- Duplicati rimossi:      ${duplicatesRemoved.length}\n`);

  if (duplicatesRemoved.length > 0) {
    console.log(`🗑️ RICETTE ELIMINATE:`);
    duplicatesRemoved.forEach((slug, index) => {
      console.log(`  ${index + 1}. ${slug}`);
    });
  } else {
    console.log(`✨ Nessun duplicato trovato.`);
  }

} catch (error) {
  console.error("❌ Errore durante l'elaborazione del file:", error.message);
  console.error("💡 Verifica che il percorso del file JSON sia corretto rispetto alla posizione dello script.");
}