import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definiamo i file da controllare
const files = ['recipes-it.json', 'recipes-en.json', 'recipes-es.json', 'recipes-fr.json'];

// Costruiamo il percorso verso la cartella data partendo da nodeJS
// Saliamo di uno (..) per uscire da nodeJS ed entrare in air-fryer, poi src/data
const dataDir = path.join(__dirname, '..', 'src', 'data');

console.log('\n======================================================');
console.log('🔍 ANALISI QUALITÀ DATI - RICERCA TEMPI SPORCHI');
console.log(`📂 Cartella target: ${dataDir}`);
console.log('======================================================\n');

// Check se la directory esiste
if (!fs.existsSync(dataDir)) {
  console.error(`❌ ERRORE: La cartella non esiste al percorso: ${dataDir}`);
  console.log('💡 Verifica la struttura delle cartelle o esegui lo script dalla posizione corretta.');
  process.exit(1);
}

let totalDirty = 0;

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File saltato (non trovato): ${file}`);
    return;
  }

  console.log(`📄 Analisi di ${file}...`);
  const recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let fileDirtyCount = 0;
  
  recipes.forEach(recipe => {
    const time = recipe.time ? recipe.time.toString() : '';
    const prep = recipe.prep_time ? recipe.prep_time.toString() : '';

    // Considera "sporco" se contiene lettere o simboli strani oltre a numeri e trattini
    const isDirty = (str) => {
      const lower = str.toLowerCase().trim();
      if (lower === "non presente" || lower === "null" || lower === "" || lower === "--") return false;
      // Regex: se contiene qualcosa che NON è un numero, un trattino o uno spazio
      return /[^0-9\-\s]/.test(lower);
    };

    if (isDirty(time) || isDirty(prep)) {
      console.log(`\n   🚨 RICETTA SPORCA TROVATA:`);
      console.log(`      Slug: ${recipe.slug}`);
      if (isDirty(time)) console.log(`      ❌ Cottura: "${time}"`);
      if (isDirty(prep)) console.log(`      ❌ Prep:    "${prep}"`);
      fileDirtyCount++;
      totalDirty++;
    }
  });

  if (fileDirtyCount === 0) {
    console.log(`   ✅ Nessun problema trovato in questo file.`);
  }
});

console.log('\n======================================================');
if (totalDirty > 0) {
  console.log(`⚠️  RILEVATE ${totalDirty} ANOMALIE.`);
  console.log('👉 Pulisci i JSON lasciando solo i numeri (es. "5-10").');
  console.log('👉 Le note testuali vanno spostate nel campo "tip".');
} else {
  console.log('✨ TUTTI I TEMPI SONO OTTIMIZZATI PER LA SEO!');
}
console.log('======================================================\n');