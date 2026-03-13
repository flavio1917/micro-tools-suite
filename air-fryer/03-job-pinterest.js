import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Il "../" gli dice di cercare nella cartella superiore
import fs from 'node:fs';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_API_KEY; 
const PINTEREST_TOKEN = process.env.PINTEREST_TOKEN;

// I TUOI ID REALI
const BOARDS = {
    antipasti: "INSERISCI_ID_ANTIPASTI",
    sane_veloci: "INSERISCI_ID_SANE_VELOCI",
    secondi_carne: "INSERISCI_ID_SECONDI"
};

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Il testo va benissimo con l'SDK

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
    const LIMITE_PIN_GIORNALIERI = 3;
    console.log(`🚀 AVVIO JOB PINTEREST (Limite: ${LIMITE_PIN_GIORNALIERI} Pin)`);
    
    let recipes = JSON.parse(fs.readFileSync('./src/data/recipes-it.json', 'utf8'));
    let toPin = recipes.filter(r => !r.pinterest_done).slice(0, LIMITE_PIN_GIORNALIERI);
    
    if (toPin.length === 0) return console.log("🎉 Tutte le ricette sono già su Pinterest!");

    let logs = [];

    for (let recipe of toPin) {
        console.log(`\n📌 Creazione Pin per: ${recipe.title}`);

        try {
            console.log("   ✍️ Generazione testi SEO...");
            const textPrompt = `Genera un JSON per Pinterest per la ricetta: ${recipe.title}. Descrizione: ${recipe.description}. Campi: "title" (max 100), "description" (usa hashtag), "alt_text".`;
            const textRes = await textModel.generateContent(textPrompt);
            const meta = JSON.parse(textRes.response.text().replace(/```json/gi, "").replace(/```/g, "").trim());

            console.log("   🎨 Generazione immagine verticale (9:16)...");
            const imgPrompt = `Vertical 9:16 Pinterest Pin, professional food photography. Dish: ${recipe.title}. Vibrant, bright, rustic wooden table.`;
            const imgUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GOOGLE_API_KEY}`;
            const imgRes = await axios.post(imgUrl, {
                instances: [{ prompt: imgPrompt }],
                parameters: { sampleCount: 1, aspectRatio: "9:16" }
            });
            const base64Data = imgRes.data.predictions[0].bytesBase64Encoded;
            
            // Salviamo temporaneamente l'immagine del pin
            const tempImgPath = `./temp_pin_${recipe.slug}.jpg`;
            fs.writeFileSync(tempImgPath, Buffer.from(base64Data, 'base64'));

            // NOTA PER PINTEREST: le API di Pinterest accettano URL pubblici o Base64 string per le immagini. 
            // Inviamogli direttamente i dati Base64!
            const boardId = recipe.keywords && recipe.keywords.join("").match(/antipasto|snack|contorno/i) ? BOARDS.antipasti : 
                           (recipe.keywords && recipe.keywords.join("").match(/secondo|carne|pesce/i) ? BOARDS.secondi_carne : BOARDS.sane_veloci);

            console.log("   ☁️ Pubblicazione su Pinterest in corso...");
            const response = await axios.post('https://api.pinterest.com/v5/pins', {
                title: meta.title,
                description: meta.description,
                link: `https://tuosito.it/ricette/${recipe.slug}`,
                board_id: boardId,
                media_source: { 
                    source_type: "image_base64", 
                    content_type: "image/jpeg",
                    data: base64Data 
                },
                alt_text: meta.alt_text
            }, {
                headers: { 'Authorization': `Bearer ${PINTEREST_TOKEN}`, 'Content-Type': 'application/json' }
            });

            const index = recipes.findIndex(r => r.slug === recipe.slug);
            recipes[index].pinterest_done = true;
            fs.writeFileSync('./src/data/recipes-it.json', JSON.stringify(recipes, null, 2));
            fs.unlinkSync(tempImgPath); // pulizia file temporaneo

            console.log("   ✅ PIN PUBBLICATO CON SUCCESSO!");
            logs.push({ title: meta.title, board: boardId, link: `https://www.pinterest.it/pin/${response.data.id}/` });
            
            await sleep(8000); 
            
        } catch (e) {
            console.error("\n❌ ERRORE:", e.response?.data?.error?.message || e.response?.data || e.message);
        }
    }
    console.table(logs);
}

run();