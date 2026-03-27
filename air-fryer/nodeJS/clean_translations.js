import fs from 'fs';
import path from 'path';

// Assumiamo che lo script venga lanciato dalla root del progetto o dalla cartella nodeJS
const baseDir = process.cwd().includes('nodeJS') ? path.join(process.cwd(), '../src/data') : path.join(process.cwd(), 'src/data');
const langs = ['it', 'en', 'es', 'fr'];

// Il dizionario delle "brutture" da piallare
const badPatterns = [
    { regex: /\bminutes min\b/gi, replacement: 'minutes' },
    { regex: /\bmins min\b/gi, replacement: 'mins' },
    { regex: /\bminutes minutes\b/gi, replacement: 'minutes' },
    { regex: /\bminutos min\b/gi, replacement: 'minutos' },
    { regex: /\bminutes mins\b/gi, replacement: 'minutes' }
];

console.log('🧹 Avvio bonifica artefatti di traduzione...');

let totalFixes = 0;

// Funzione ricorsiva per pulire tutte le stringhe, ovunque si trovino (anche negli array di istruzioni)
function cleanObject(obj) {
    let localFixes = 0;
    
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            badPatterns.forEach(pattern => {
                if (obj[key].match(pattern.regex)) {
                    obj[key] = obj[key].replace(pattern.regex, pattern.replacement);
                    localFixes++;
                }
            });
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item, index) => {
                if (typeof item === 'string') {
                    badPatterns.forEach(pattern => {
                        if (item.match(pattern.regex)) {
                            obj[key][index] = item.replace(pattern.regex, pattern.replacement);
                            localFixes++;
                        }
                    });
                }
            });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            localFixes += cleanObject(obj[key]);
        }
    }
    return localFixes;
}

langs.forEach(lang => {
    const filePath = path.join(baseDir, `recipes-${lang}.json`);
    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const recipes = JSON.parse(fileContent);
            
            const fixesCount = cleanObject(recipes);
            totalFixes += fixesCount;

            if (fixesCount > 0) {
                fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
                console.log(`✅ [${lang.toUpperCase()}] Bonifica completata: ${fixesCount} errori corretti.`);
            } else {
                console.log(`✅ [${lang.toUpperCase()}] Nessun errore trovato. Perfetto.`);
            }
        } catch (error) {
            console.error(`❌ [${lang.toUpperCase()}] Errore critico nel parsing o salvataggio:`, error.message);
        }
    }
});

console.log(`🚀 Bonifica totale terminata. Sono stati polverizzati ${totalFixes} artefatti di traduzione.`);