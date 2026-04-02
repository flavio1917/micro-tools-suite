import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurazione __dirname per ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso del file italiano
const filePath = path.join(__dirname, '..', 'src', 'data', 'recipes-it.json');

console.log('--- Inizio Pulizia Definitiva per SLUG ---');

try {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File non trovato: ${filePath}`);
    process.exit(1);
  }

  const recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const seenSlugs = new Set();
  const removedList = [];

  const uniqueRecipes = recipes.filter(recipe => {
    const slug = recipe.slug;

    if (!slug) return true; // Sicurezza: se manca lo slug lo tiene

    if (seenSlugs.has(slug)) {
      // Trovato slug duplicato (seconda, terza volta...)
      removedList.push(`[Eliminato] - Slug: ${slug} (Titolo: ${recipe.title})`);
      return false; // Scarta
    } else {
      // Prima volta che vediamo questo slug
      seenSlugs.add(slug);
      return true; // Mantieni
    }
  });

  // Salvataggio file sovrascritto
  fs.writeFileSync(filePath, JSON.stringify(uniqueRecipes, null, 2), 'utf8');

  console.log(`✅ Database Italiano ripulito dai cloni!`);
  console.log(`   - Ricette Originali: ${recipes.length}`);
  console.log(`   - Ricette Rimaste:   ${uniqueRecipes.length}`);
  console.log(`   - Duplicati Rimossi: ${removedList.length}\n`);

  if (removedList.length > 0) {
    console.log(`🗑️ Dettaglio cloni eliminati:`);
    removedList.forEach(item => console.log(`     ${item}`));
  } else {
    console.log(`✨ Nessun duplicato trovato.`);
  }

} catch (error) {
  console.error(`❌ Errore durante l'elaborazione:`, error.message);
}