import fs from 'fs';

// Usiamo l'italiano come file Master per estrarre il contesto
const inputFile = `../src/data/recipes-it.json`;
const outputFile = `./da-ottimizzare-master.json`;

try {
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const recipes = JSON.parse(rawData);

    // Estraiamo il contesto utile
    const lightweight = recipes.map(r => ({
        slug: r.slug,
        old_title: r.title,
        time: r.time,
        ingredients: r.ingredients,
        keywords: r.keywords,
        old_description: r.description
    }));

    fs.writeFileSync(outputFile, JSON.stringify(lightweight, null, 2));
    console.log(`✅ Estratto il contesto Master di ${lightweight.length} ricette in ${outputFile}`);
} catch (err) {
    console.error("❌ Errore:", err.message);
}