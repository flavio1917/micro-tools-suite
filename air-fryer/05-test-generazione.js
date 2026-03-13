import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';

const RECIPES_FILE = './src/data/recipes-it.json';
const BASE_IMG_DIR = './public/images/recipes';
const DOMAIN = 'https://www.convertitorefriggitrice.it';
const PINTEREST_TOKEN = process.env.PINTEREST_TOKEN;

// ==========================================
// 1. GENERAZIONE IMMAGINE CON RETRY
// ==========================================
async function generateImagen3Image(prompt, filepath, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`   ⏳ Google Vertex AI... [Tentativo ${attempt}/${maxRetries}]`);
            
            const auth = new GoogleAuth({
                keyFile: '../credenziali-google.json',
                scopes: ['https://www.googleapis.com/auth/cloud-platform']
            });
            
            const client = await auth.getClient();
            const projectId = await auth.getProjectId();
            const token = await client.getAccessToken();

            const endpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/publishers/google/models/imagen-3.0-generate-001:predict`;

            const requestBody = {
                instances: [ { prompt: prompt } ],
                parameters: {
                    sampleCount: 1,
                    aspectRatio: "4:3",
                    outputOptions: { mimeType: "image/jpeg" }
                }
            };

            const response = await axios.post(endpoint, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const base64Image = response.data.predictions[0].bytesBase64Encoded;
            const buffer = Buffer.from(base64Image, 'base64');
            
            fs.writeFileSync(filepath, buffer);
            return true;

        } catch (e) {
            const errorMsg = e.response?.data?.error?.message || e.message;
            console.warn(`   ⚠️ Errore (Tentativo ${attempt}): ${errorMsg.substring(0, 100)}`);
            
            if (attempt < maxRetries) {
                console.log(`   ⏳ Pausa 30s prima del prossimo tentativo...`);
                await new Promise(res => setTimeout(res, 30000));
            } else {
                console.error(`   ❌ Fallito dopo ${maxRetries} tentativi.`);
                return false;
            }
        }
    }
}

// ==========================================
// 2. LOGICA PINTEREST (Opzionale)
// ==========================================
async function publishPin(recipe) {
    // Mantieni qui la tua logica Pinterest se necessaria, 
    // omessa per brevità ma gestita nel runner
    return true; 
}

// ==========================================
// 3. RUNNER PRINCIPALE CON LOGICA DI POSIZIONE
// ==========================================
async function runTest() {
    console.log("🚀 AVVIO MOTORE DI REGIA CON PERSISTENZA DI POSIZIONE...");

    let recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
    let recipe = recipes[0]; 

    console.log(`\n👨‍🍳 Ricetta: ${recipe.title}`);
    
    const recipeDir = path.join(BASE_IMG_DIR, recipe.slug);
    if (!fs.existsSync(recipeDir)) fs.mkdirSync(recipeDir, { recursive: true });

    recipe.step_images = new Array(recipe.instructions.length).fill("");
    
    // Contesto ingredienti base
    const ingredientsBase = "400g calamari rings, 100g fine yellow semolina, olive oil spray, lemon.";

    for (let i = 0; i < recipe.instructions.length; i++) {
        let step = recipe.instructions[i];
        let stepLower = step.toLowerCase();
        console.log(`\n📸 Generazione Step ${i + 1}/${recipe.instructions.length}`);

        // --- 1. ANALISI STORICA (PER CAPIRE DOVE SI TROVA IL CIBO) ---
        let history = recipe.instructions.slice(0, i + 1).join(" ").toLowerCase();
        
        // Se in passato o ora si parla di cestello/cottura, il cibo è NELLA friggitrice
        let isInAirFryer = /(cestello|posizionar|cuocer|cottura|200°c|friggitrice|friggere)/i.test(history);
        
        let currentLocation = isInAirFryer 
            ? "STRICTLY INSIDE the dark black perforated air fryer basket. The rings are resting on the metal grill." 
            : "On a rustic wooden kitchen counter.";

        // --- 2. STATO DI COTTURA ---
        let isCooking = /(cuocer|cottura|200°c|doratura|friggere)/i.test(history);
        let foodState = isCooking ? "COOKED (Golden brown and crispy)" : "RAW (Translucent white)";

        // --- 3. GESTIONE INGREDIENTI (EVITA ANTICIPAZIONI) ---
        let currentIngredientsContext = ingredientsBase;
        if (i === 0) {
            // Nello step 1 i calamari devono essere NUDI e la farina SEPARATA
            currentIngredientsContext = "400g raw, naked, translucent calamari rings. 100g of yellow semolina is SEPARATE in a small bowl. The squid is NOT yet breaded.";
        } else if (i > 0) {
            // Dallo step 2 in poi sono impanati
            currentIngredientsContext = "Calamari rings evenly coated in a thin layer of yellow semolina.";
        }

        // --- 4. REGOLE DI ESTRAZIONE E VINCOLI ---
        const logicRules = `
            - BREADING PERSISTENCE: If breaded in previous steps, they must stay breaded now.
            - TOOL RESET: Ignore previous tools (bags/bowls) unless needed for CURRENT ACTION.
            - POSITION LOCK: If the food reached the air fryer basket in previous steps, it MUST stay in the basket.
            - FLOUR QUANTITY: If a bag is used, ONLY a tiny amount of flour at the bottom. NO full bags.
        `;

        // --- 5. COSTRUZIONE PROMPT ---
        const prompt = `
            Professional food photography, macro shot.
            INGREDIENTS STATE: ${currentIngredientsContext}
            FOOD STATE: ${foodState}
            LOCATION: ${currentLocation}
            ${logicRules}

            CURRENT ACTION TO RENDER: ${step}
            
            STYLE: photorealistic, cinematic lighting, 8k resolution.
            STRICT NEGATIVE CONSTRAINTS: NO traditional pans, NO skillets, NO stovetops, NO text, NO whole squid, NO breadcrumbs. ${isInAirFryer ? 'NO plates, NO tables.' : ''}
        `;

        const imgName = `step_${i + 1}.jpg`;
        const imgPath = path.join(recipeDir, imgName);

        const success = await generateImagen3Image(prompt, imgPath);
        
        if (success) {
            recipe.step_images[i] = `/images/recipes/${recipe.slug}/${imgName}`;
            console.log(`   ✅ Step ${i+1} salvato.`);
        }
        
        console.log(`   ⏳ Pausa 20s...`);
        await new Promise(res => setTimeout(res, 20000));
    }

    // Salvataggio finale JSON
    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
    console.log(`\n💾 JSON aggiornato. 🎉 FINE.`);
}

runTest();