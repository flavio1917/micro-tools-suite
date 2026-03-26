import fs from 'fs';
import path from 'path';

const langs = ['it', 'en', 'es', 'fr'];
const dataDir = path.join(process.cwd(), 'src', 'data');
const outDir = path.join(process.cwd(), 'seo_batches');
const CHUNK_SIZE = 20; 

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

langs.forEach(lang => {
    const filePath = path.join(dataDir, `recipes-${lang}.json`);
    if (fs.existsSync(filePath)) {
        const recipes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        const extracted = recipes.map(recipe => ({
            slug: recipe.slug,
            title: recipe.title,
            description: recipe.description,
            keywords: recipe.keywords || []
        }));

        for (let i = 0; i < extracted.length; i += CHUNK_SIZE) {
            const chunk = extracted.slice(i, i + CHUNK_SIZE);
            const batchNum = Math.floor(i / CHUNK_SIZE) + 1;
            const outPath = path.join(outDir, `batch_${lang}_${batchNum}.json`);
            
            // Creiamo la struttura con la chiave della lingua, es: { "it": [ ... ] }
            const chunkObj = { [lang]: chunk };
            
            fs.writeFileSync(outPath, JSON.stringify(chunkObj, null, 2));
        }
        console.log(`✅ Estrazione ${lang.toUpperCase()}: creati ${Math.ceil(extracted.length / CHUNK_SIZE)} pacchetti.`);
    }
});
console.log('🚀 Estrazione completata! Trovi i file nella cartella "seo_batches".');