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
            console.warn(`   ⚠️ Errore API: ${errorMsg.substring(0, 100)}`);
            
            if (attempt < maxRetries) {
                console.log(`   ⏳ Pausa tecnica di 30 secondi prima del prossimo tentativo...`);
                await new Promise(res => setTimeout(res, 30000));
            } else {
                console.error(`   ❌ Generazione fallita definitivamente.`);
                return false;
            }
        }
    }
}

// ==========================================
// 2. LOGICA PINTEREST
// ==========================================
function getTargetBoard(recipe) {
    const text = (recipe.title + " " + (recipe.keywords?.join(' ') || "")).toLowerCase();
    if (/(snack|contorno|antipasto|calamari)/i.test(text)) return process.env.BOARD_ANTIPASTI;
    if (/(carne|secondo|hamburger|pesce)/i.test(text)) return process.env.BOARD_SECONDI;
    return process.env.BOARD_GENERALI;
}

async function publishPin(recipe) {
    const boardId = getTargetBoard(recipe);
    const imageUrl = `${DOMAIN}/images/recipes/${recipe.image || recipe.slug}.webp`;
    const recipeUrl = `${DOMAIN}/it/recipes/${recipe.slug}`;

    console.log(`📌 Pubblicazione Pin su bacheca: ${boardId}`);

    const seoTags = `#friggitriceadaria #airfryerrecipes #ricetteveloci #${recipe.slug.replace(/-/g, '')}`;
    const description = `✨ ${recipe.title} ✨\n\n${recipe.description}\n\n${seoTags}`;

    try {
        const response = await axios.post('https://api.pinterest.com/v5/pins', {
            board_id: boardId,
            title: recipe.title,
            description: description,
            link: recipeUrl,
            media_source: { source_type: "image_url", url: imageUrl }
        }, {
            headers: { 'Authorization': `Bearer ${PINTEREST_TOKEN}` }
        });
        
        console.log(`✅ Pin pubblicato! ID: ${response.data.id}`);
        return true;
    } catch (error) {
        console.error("❌ Errore Pinterest (Token non valido o permessi insufficienti)");
        return false;
    }
}

// ==========================================
// 3. RUNNER PRINCIPALE (DIRETTORE DI REGIA)
// ==========================================
async function runTest() {
    console.log("🚀 AVVIO PROCESSO DI GENERAZIONE FOTOREALISTICA...");

    let recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
    let recipe = recipes[1]; 

    console.log(`\n👨‍🍳 In lavorazione: ${recipe.title.toUpperCase()}`);
    
    const recipeDir = path.join(BASE_IMG_DIR, recipe.slug);
    if (!fs.existsSync(recipeDir)) fs.mkdirSync(recipeDir, { recursive: true });

    recipe.step_images = new Array(recipe.instructions.length).fill("");
    const ingredientsList = recipe.ingredients ? recipe.ingredients.join(", ") : "";

    let isInAirFryer = false;
    let foodMaturity = "RAW"; 

    for (let i = 0; i < recipe.instructions.length; i++) {
        let step = recipe.instructions[i];
        let stepLower = step.toLowerCase();
        console.log(`\n📸 Elaborazione Step ${i + 1}/${recipe.instructions.length}`);

        // --- A. TRIGGER CESTELLO CORRETTO ---
        // 1. Controlla prima se esce (in modo specifico, non un "estrarre dal sacchetto")
        if (/(sfornare|servire|impiattare|dal cestello|dalla friggitrice)/i.test(stepLower) && i > 0) {
            isInAirFryer = false;
        }
        // 2. Poi controlla se entra (così vince sempre se c'è scritto "estrarre dal sacchetto e mettere nel cestello")
        if (/(nel cestello|il cestello|friggitrice)/i.test(stepLower)) {
            isInAirFryer = true;
        }

        // --- B. TRIGGER MATURAZIONE CIBO ---
        if (/\d+°c|gradi|cuocere a/i.test(stepLower)) {
            foodMaturity = "START_COOKING";
        } else if (/(agitare|ruotare|girare|metà cottura)/i.test(stepLower) && foodMaturity !== "RAW") {
            foodMaturity = "MID_COOKING";
        } 
        
        if (i === recipe.instructions.length - 1 || /(doratura|pronto|servire|cotti)/i.test(stepLower)) {
            foodMaturity = "COOKED";
        }

        // --- C. TRADUZIONE STATI IN DESCRIZIONI VISIVE ---
        let visualState = "";
        if (foodMaturity === "RAW") visualState = "RAW (completely raw, uncooked, natural cold colors, no steam, no smoke)";
        else if (foodMaturity === "START_COOKING") visualState = "STARTING TO COOK (glistening with oil, still pale, slightly warm)";
        else if (foodMaturity === "MID_COOKING") visualState = "HALF-COOKED (sizzling, turning golden brown, slight steam)";
        else visualState = "PERFECTLY COOKED (deep golden brown, crispy texture, fully done)";

        let locationDesc = isInAirFryer 
            ? "STRICTLY INSIDE A DARK AIR FRYER BASKET. The background MUST be the black perforated metal grate of the air fryer." 
            : "On a clean wooden kitchen counter.";

        // --- D. COSTRUZIONE PROMPT ---
        const universalNegative = `STRICT NEGATIVE: NO pans, NO pots, NO skillets, NO stove burners, NO text, NO breadcrumbs if not in recipe, NO massive piles of ingredients, NO mountains of flour${isInAirFryer ? ', NO wooden boards, NO tables, NO counters' : ''}.`;

        let prompt = "";

        if (recipe.slug.includes('calamari')) {
            if (i === 0) {
                prompt = `Professional macro food photography. 
                    MAIN SUBJECT & ACTION: VISIBLE HUMAN HANDS gently patting dry raw white calamari rings using white paper towels. 
                    SCENE: ${locationDesc}
                    FOOD STATE: ${visualState}.
                    STYLE: Photorealistic, cinematic lighting, 8k.
                    ${universalNegative} NO FLOUR, NO SEMOLINA, NO BAGS IN THIS STEP.`;
            } 
            else if (i === 1) {
                prompt = `Professional macro food photography. 
                    MAIN SUBJECT & ACTION: A clear transparent plastic ziplock bag held open. Inside the bag are raw calamari rings and a VERY SMALL AMOUNT of yellow semolina flour (just a light dusting, DO NOT overfill). 
                    SCENE: ${locationDesc}
                    FOOD STATE: ${visualState}.
                    INGREDIENTS SCALE: ${ingredientsList}.
                    STYLE: Photorealistic, cinematic lighting, 8k.
                    ${universalNegative}`;
            } 
            else {
                let actionOverride = step;
                if (/(nebulizzare|spruzzare|spray)/i.test(stepLower)) {
                    actionOverride = `A hand using a glass oil spray bottle to mist the food.`;
                }

                prompt = `Professional macro food photography. 
                    ACTION TO RENDER: "${actionOverride}"
                    SCENE SETUP: ${locationDesc}
                    SUBJECT STATE: ${visualState}. 
                    APPEARANCE: Calamari rings coated in fine yellow semolina.
                    INGREDIENTS SCALE: ${ingredientsList}. 
                    STYLE: Photorealistic, cinematic lighting, 8k.
                    ${universalNegative}`;
            }
        } else {
            prompt = `Professional macro food photography. 
                ACTION TO RENDER: "${step}"
                SCENE SETUP: ${locationDesc}
                SUBJECT STATE: ${visualState}. 
                APPEARANCE: ${recipe.title}. 
                INGREDIENTS SCALE: ${ingredientsList}.
                STYLE: Photorealistic, cinematic lighting, 8k.
                ${universalNegative}`;
        }

        const imgName = `step_${i + 1}.jpg`;
        const imgPath = path.join(recipeDir, imgName);

        const success = await generateImagen3Image(prompt, imgPath);
        
        if (success) {
            recipe.step_images[i] = `/images/recipes/${recipe.slug}/${imgName}`;
            console.log(`   ✅ Completato: ${imgName} [Stato: ${foodMaturity}] [Loc: ${isInAirFryer ? 'CEST' : 'BANCO'}]`);
        }
        
        console.log(`   ⏳ Pausa 20s per quote API...`);
        await new Promise(res => setTimeout(res, 20000));
    }

    console.log(`\n📱 Avvio Pinterest...`);
    await publishPin(recipe);

    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
    console.log(`\n💾 Dati salvati in recipes-it.json. 🎉`);
}

runTest();