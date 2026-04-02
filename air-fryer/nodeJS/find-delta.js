import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurazione per __dirname negli ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorsi dei file
const pathIT = path.join(__dirname, '..', 'src', 'data', 'recipes-it.json');
const pathFR = path.join(__dirname, '..', 'src', 'data', 'recipes-fr.json');
const outputPath = path.join(__dirname, 'delta-fr-it.json');

try {
  console.log('--- Inizio Analisi Delta ---');

  // 1. Caricamento dati
  const recipesIT = JSON.parse(fs.readFileSync(pathIT, 'utf8'));
  const recipesFR = JSON.parse(fs.readFileSync(pathFR, 'utf8'));

  // 2. Creazione Set degli slug italiani per un confronto veloce (O(1))
  const slugsIT = new Set(recipesIT.map(r => r.slug));
  
  // Nota: se gli slug francesi sono tradotti (es: 'pollo' vs 'poulet'), 
  // lo script cercherà corrispondenze esatte. Se invece usi ID o slug identici, funzionerà al 100%.
  
  // 3. Filtriamo le ricette francesi che non esistono in Italia
  const deltaRecipes = recipesFR.filter(r => !slugsIT.has(r.slug));

  // 4. Salvataggio del risultato
  if (deltaRecipes.length > 0) {
    fs.writeFileSync(outputPath, JSON.stringify(deltaRecipes, null, 2), 'utf8');
    
    console.log('\n✅ ANALISI COMPLETATA!');
    console.log(`- Ricette Italiane: ${recipesIT.length}`);
    console.log(`- Ricette Francesi: ${recipesFR.length}`);
    console.log(`- Ricette in più trovate (FR vs IT): ${deltaRecipes.length}`);
    console.log(`\n📂 Il file con i JSON mancanti è stato creato: nodeJs/delta-fr-it.json`);
    
    console.log('\n🔍 ESEMPIO DELLE PRIME 3 RICETTE MANCANTI:');
    deltaRecipes.slice(0, 3).forEach((r, i) => {
      console.log(`  ${i+1}. [${r.slug}] ${r.title}`);
    });
  } else {
    console.log('\n✨ Nessun delta trovato. I file sono già sincronizzati.');
  }

} catch (error) {
  console.error("❌ Errore durante l'elaborazione:", error.message);
}