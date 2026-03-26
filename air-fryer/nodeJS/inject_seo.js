import fs from 'fs';
import path from 'path';

const langs = ['it', 'en', 'es', 'fr'];
const dataDir = path.join(process.cwd(), 'src', 'data');
const batchesDir = path.join(process.cwd(), 'seo_batches');

if (!fs.existsSync(batchesDir)) {
    console.error('❌ Errore: Cartella seo_batches non trovata!');
    process.exit(1);
}

// 1. Unisce tutti i pacchetti modificati in memoria
let allNewData = { it: [], en: [], es: [], fr: [] };
const files = fs.readdirSync(batchesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const batchData = JSON.parse(fs.readFileSync(path.join(batchesDir, file), 'utf-8'));
    Object.keys(batchData).forEach(lang => {
        if (allNewData[lang]) {
            allNewData[lang] = allNewData[lang].concat(batchData[lang]);
        }
    });
});

// 2. Inietta i nuovi testi nei file originali
langs.forEach(lang => {
    const filePath = path.join(dataDir, `recipes-${lang}.json`);
    
    if (fs.existsSync(filePath) && allNewData[lang].length > 0) {
        let originalRecipes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let updatedCount = 0;

        originalRecipes = originalRecipes.map(recipe => {
            const updatedSeo = allNewData[lang].find(item => item.slug === recipe.slug);
            if (updatedSeo) {
                updatedCount++;
                return {
                    ...recipe,
                    title: updatedSeo.title,
                    description: updatedSeo.description,
                    keywords: updatedSeo.keywords
                };
            }
            return recipe;
        });

        fs.writeFileSync(filePath, JSON.stringify(originalRecipes, null, 2));
        console.log(`✅ Aggiornato recipes-${lang}.json (${updatedCount} ricette modificate).`);
    }
});
console.log('🚀 Iniezione completata con successo!');