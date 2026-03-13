import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from 'node:url';

// ==========================================
// 1. CONFIGURAZIONE E PARAMETRI ECONOMICI
// ==========================================
const API_KEY = process.env.GOOGLE_API_KEY; 
const MODEL_NAME = "gemini-2.5-flash"; // <--- CAMBIATO PER RISPARMIARE

const BUDGET_MAX_DOLLARI = 0.50; // Soglia di sicurezza bassissima

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    generationConfig: { 
        temperature: 0.1, 
        responseMimeType: "application/json" 
    } 
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'src', 'data');

// Consideriamo solo Spagnolo e Inglese (il Francese è già ok)
const targetFiles = [
    { name: 'recipes-en.json', lang: 'Inglese' }
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Monitoraggio costi semplificato per Flash
let totalInputTokens = 0;
let totalOutputTokens = 0;
let totalCostUSD = 0;

// Prezzi Flash (molto più bassi)
const RATE_IN = 0.10 / 1000000; 
const RATE_OUT = 0.40 / 1000000;

// ==========================================
// 2. LOGICA DI REVISIONE
// ==========================================
async function reformatRecipe(recipeStr, targetLang) {
    const prompt = `Sei un revisore editoriale culinario esperto. Riceverai il JSON di una ricetta.
    REGOLA MANDATORIA: Scrivi TUTTI i testi esclusivamente in ${targetLang}.
    REGOLE DI EDITING:
    1. "title": Professionale. RIMUOVI "air fryer" o simili.
    2. "description", "instructions", "tip": Stile tecnico e asciutto.
    3. "keywords": Array di stringhe in ${targetLang}.
    Restituisci esclusivamente un JSON valido.
    JSON Ricetta: ${recipeStr}`;

    try {
        const result = await model.generateContent(prompt);
        const usage = result.response.usageMetadata;
        if (usage) {
            totalInputTokens += usage.promptTokenCount;
            totalOutputTokens += usage.candidatesTokenCount;
            totalCostUSD = (totalInputTokens * RATE_IN) + (totalOutputTokens * RATE_OUT);
        }
        let responseText = result.response.text().replace(/```json/gi, "").replace(/```/g, "").trim();
        return JSON.parse(responseText); 
    } catch (e) {
        console.error(`❌ Errore API: ${e.message}`);
        return null; 
    }
}

// ==========================================
// 3. ESECUZIONE
// ==========================================
async function start() {
    console.log(`🚀 RIPRESA LAVORO CON MODELLO: ${MODEL_NAME}`);
    console.log(`🛡️  Budget di sicurezza per questa sessione: $${BUDGET_MAX_DOLLARI}\n`);

    for (const fileObj of targetFiles) {
        const filePath = path.join(dataDir, fileObj.name);
        if (!fs.existsSync(filePath)) continue;

        let recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`\n--- Analisi file: ${fileObj.name} ---`);

        for (let i = 0; i < recipes.length; i++) {
            if (totalCostUSD >= BUDGET_MAX_DOLLARI) {
                console.error(`🚨 BUDGET SESSIONE RAGGIUNTO: $${totalCostUSD.toFixed(4)}. Fermo per sicurezza.`);
                process.exit(1);
            }

            let recipe = recipes[i];

            // SALTA AUTOMATICAMENTE SE GIÀ SANIFICATO
            if (recipe.is_sanitized === true) {
                continue; 
            }

            console.log(`[${i + 1}/${recipes.length}] Elaborazione: ${recipe.title}...`);
            const updated = await reformatRecipe(JSON.stringify(recipe), fileObj.lang);

            if (updated) {
                recipes[i] = {
                    ...recipe, 
                    title: updated.title || recipe.title,
                    ingredients: updated.ingredients || recipe.ingredients,
                    description: updated.description || recipe.description,
                    instructions: updated.instructions || recipe.instructions,
                    tip: updated.tip || recipe.tip,
                    keywords: updated.keywords || recipe.keywords,
                    is_sanitized: true 
                };
                
                fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), 'utf8');
                console.log(`   ✅ Completato ($${totalCostUSD.toFixed(5)})`);
            }

            // Pausa ridotta per Flash
            await sleep(4000); 
        }
    }
    console.log(`\n🎉 TUTTE LE OPERAZIONI COMPLETATE! SPESA EXTRA: $${totalCostUSD.toFixed(4)}`);
}

start();