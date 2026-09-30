import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trova tutti i file .ts in src/i18n/
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.ts') && !fullPath.endsWith('.d.ts')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Analizza un oggetto esportato per verificare le chiavi mancanti rispetto a 'it'
function checkTranslationObject(obj: any, exportName: string, filePath: string): boolean {
  if (!obj || typeof obj !== 'object') return true;

  // L'oggetto dovrebbe avere chiavi per le lingue (es. 'it', 'en', 'es', 'fr')
  const baseLang = 'it';
  const targetLangs = ['en', 'es', 'fr'];
  
  if (!obj[baseLang]) {
    // Non è un oggetto di traduzione standard se non ha 'it', saltiamo o controlliamo in profondità
    return true; 
  }

  let isValid = true;
  
  const isBasePrimitive = typeof obj[baseLang] !== 'object' || obj[baseLang] === null;

  for (const lang of targetLangs) {
    if (obj[lang] === undefined) {
      console.error(`[ERRORE] Manca la lingua '${lang}' in '${exportName}' nel file: ${filePath}`);
      isValid = false;
      continue;
    }

    if (!isBasePrimitive) {
      const baseKeys = Object.keys(obj[baseLang]);
      const langKeys = Object.keys(obj[lang]);
      
      // Controlla se le chiavi in baseLang sono presenti in lang
      const missingKeys = baseKeys.filter(k => !langKeys.includes(k));
      if (missingKeys.length > 0) {
        console.error(`[ERRORE] In '${exportName}' (${filePath}), mancano le seguenti chiavi in '${lang}':`);
        missingKeys.forEach(k => console.error(`  - ${k}`));
        isValid = false;
      }
      
      // (Opzionale) Controlla chiavi extra in lang che non ci sono in baseLang
      const extraKeys = langKeys.filter(k => !baseKeys.includes(k));
      if (extraKeys.length > 0) {
        // console.warn(`[AVVISO] In '${exportName}' (${filePath}), ci sono chiavi extra in '${lang}' non presenti in '${baseLang}':`);
        // extraKeys.forEach(k => console.warn(`  - ${k}`));
      }
    }
  }

  return isValid;
}

async function validateAll() {
  const i18nDir = path.resolve(__dirname, '../src/i18n');
  const files = getAllFiles(i18nDir);
  let allValid = true;

  for (const file of files) {
    try {
      // Importiamo dinamicamente il modulo
      const fileUrl = 'file:///' + file.replace(/\\/g, '/');
      const mod = await import(fileUrl);
      for (const [exportName, exportedItem] of Object.entries(mod)) {
        // Se è un oggetto o un array potremmo analizzarlo, di solito i nostri i18n sono oggetti esportati.
        if (exportedItem && typeof exportedItem === 'object' && !Array.isArray(exportedItem)) {
          const isValid = checkTranslationObject(exportedItem, exportName, file);
          if (!isValid) allValid = false;
        }
      }
    } catch (err) {
      console.error(`[ERRORE] Impossibile caricare il file ${file}:`, err);
    }
  }

  if (allValid) {
    console.log('\n✅ Tutti i file di traduzione in src/i18n sono completi e allineati con la lingua "it".');
    process.exit(0);
  } else {
    console.error('\n❌ Trovati errori nelle traduzioni. Correggi i file sopra e riprova.');
    process.exit(1);
  }
}

validateAll();
