import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_API_KEY; 
const recipesPath = './src/data/recipes-it.json';
const baseImagePath = './public/images/recipes'; 

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Nuova funzione che chiama direttamente l'API ufficiale Imagen 3
async function generateImageDirectly(prompt, destPath) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GOOGLE_API_KEY}`;
    
    const payload = {
        instances: [{ prompt: prompt }],
        parameters: { sampleCount: 1, aspectRatio: "16:9" } // Formato orizzontale per il sito
    };

    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json' } });
    
    // Estraiamo l'immagine in Base64 e la salviamo direttamente come file JPG
    const base64Data = response.data.predictions[0].bytesBase64Encoded;
    fs.writeFileSync(destPath, Buffer.from(base64Data, 'base64'));
}

async function run() {
    const LIMITE_RICETTE_GIORNALIERE = 10; 
    console.log(`🚀 AVVIO JOB IMMAGINI PROCEDIMENTO (Limite: ${LIMITE_RICETTE_GIORNALIERE} Ricette)`);
    
    let recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
    let toProcess = recipes.filter(r => !r.step_images || r.step_images.length === 0).slice(0, LIMITE_RICETTE_GIORNALIERE);
    
    if (toProcess.length === 0) return console.log("🎉 Tutte le ricette hanno già le immagini degli step!");

    for (let recipe of toProcess) {
        console.log(`\n📸 Elaborazione ricetta: ${recipe.title}`);
        const recipeFolder = path.join(baseImagePath, recipe.slug);
        if (!fs.existsSync(recipeFolder)) fs.mkdirSync(recipeFolder, { recursive: true });

        const indexInFile = recipes.findIndex(r => r.slug === recipe.slug);
        recipes[indexInFile].step_images = [];

        for (let i = 0; i < recipe.instructions.length; i++) {
            console.log(`   ⏳ Generazione step ${i + 1}/${recipe.instructions.length}...`);
            const prompt = `Professional food photography, cooking step in progress. Action: ${recipe.instructions[i]}. Dish: ${recipe.title}. Bright, rustic wood kitchen, high quality.`;
            
            try {
                const fileName = `step_${i + 1}.jpg`;
                const localPath = path.join(recipeFolder, fileName);
                
                // Genera e salva in un colpo solo
                await generateImageDirectly(prompt, localPath);
                
                recipes[indexInFile].step_images.push(`/images/recipes/${recipe.slug}/${fileName}`);
                console.log(`   ✅ Immagine creata: ${localPath}`);
            } catch (e) {
                console.error(`   ❌ Errore step ${i+1}:`, e.response?.data?.error?.message || e.message);
            }
            
            await sleep(6000); // Pausa di sicurezza per i limiti API
        }

        fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));
        console.log(`💾 Salvato JSON per: ${recipe.title}`);
    }
    console.log(`\n🎉 Lavoro giornaliero completato!`);
}

run();