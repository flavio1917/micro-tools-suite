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
                console.log(`   ⏳ Quota raggiunta o errore. Pausa di 30 secondi prima del prossimo tentativo...`);
                await new Promise(res => setTimeout(res, 30000));
            } else {
                console.error(`   ❌ Fallito dopo ${maxRetries} tentativi.`);
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

    console.log(`📌 Preparazione Pin Pinterest su bacheca: ${boardId}`);

    const seoTags = `#friggitriceadaria #airfryerrecipes #ricetteveloci #cucinasana #${recipe.slug.replace(/-/g, '')}`;
    const description = `✨ ${recipe.title} ✨\n\n${recipe.description}\n\n${seoTags}`;

    try {
        const response = await axios.post('https://api.pinterest.com/v5/pins', {
            board_id: boardId,
            title: recipe.title,
            description: description,
            link: recipeUrl,
            media_source: { source_type: "image_url", url: imageUrl }
        }, {
            headers: { 
                'Authorization': `Bearer ${PINTEREST_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`✅ Pin pubblicato con successo! ID: ${response.data.id}`);
        return true;
    } catch (error) {
        console.error("❌ Errore Pinterest:", error.response?.data?.message || "Errore sconosciuto (probabile problema di token)");
        return false;
    }
}

// ==========================================
// 3. RUNNER PRINCIPALE CON MOTORE DI CONTESTO
// ==========================================
async function runTest() {
    console.log("🚀 AVVIO MOTORE DI REGIA GOOGLE AI (CON MEMORIA DI STATO AVANZATA)...");

    let recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
    let recipe = recipes[0]; // Lavoriamo sulla prima ricetta

    console.log(`\n👨‍🍳 Ricetta in elaborazione: ${recipe.title}`);
    
    const recipeDir = path.join(BASE_IMG_DIR, recipe.slug);
    if (!fs.existsSync(recipeDir)) fs.mkdirSync(recipeDir, { recursive: true });

    recipe.step_images = new Array(recipe.instructions.length).fill("");
    
    const ingredientsContext = "400g raw calamari rings, 100g of fine yellow semolina flour, olive oil spray, salt, lemon wedges.";
    let previousStepText = "None. Ingredients are in their initial state.";

    for (let i = 0; i < recipe.instructions.length; i++) {
        let step = recipe.instructions[i];
        let stepLower = step.toLowerCase();
        console.log(`\n📸 Generazione Step ${i + 1}/${recipe.instructions.length}`);

        // 1. DETERMINA LO STATO DI COTTURA (Memoria Cumulativa)
        let accumulatedSteps = recipe.instructions.slice(0, i + 1).join(" ").toLowerCase();
        let foodState = /(cuocer|cottura|girar|doratura|200°c|sfornar|friggere)/i.test(accumulatedSteps) 
            ? "COOKING/COOKED (Golden brown, crispy, cooked)" 
            : "RAW/PREPPING (Uncooked, fresh)";

        let isInAirFryer = /(cuocer|cottura|girar|doratura|200°c|sfornar|friggere|cestello|posizionar)/i.test(stepLower);
        let environment = isInAirFryer 
            ? "Inside the dark black perforated drawer basket of an air fryer. The food is resting directly on the basket grill." 
            : "On a modern rustic wooden kitchen counter.";

        // 2. LA TUA REGOLA DI ESTRAZIONE DEL CONTESTO (IL CUORE DELL'AGGIORNAMENTO)
        const stateExtractionRule = `CRITICAL STATE INSTRUCTION: You must maintain the physical transformation of the ingredients from the previous step (e.g., if they were breaded, they remain breaded). HOWEVER, you MUST STRICTLY REMOVE AND IGNORE any tools, bags, bowls, or containers used in the previous step. Only render tools if they are explicitly required for the CURRENT action.`;

        // 3. REGOLA FARINA
        let flourRule = "";
        if (/(sacchetto|semola|farina|impanatura|panatura)/i.test(stepLower) && !isInAirFryer) {
            flourRule = `RULE: If using a clear plastic bag, it must contain ONLY a very sparse, thin layer of semolina flour at the bottom (100g max). NO giant bags full of flour.`;
        }

        // 4. COSTRUZIONE PROMPT
        const prompt = `Professional food photography, close-up macro shot.
RECIPE INGREDIENTS: ${ingredientsContext}
PREVIOUS STEP ACTION: ${previousStepText}
CURRENT FOOD STATE: ${foodState}
${stateExtractionRule}

CURRENT ACTION TO RENDER: ${step}
ENVIRONMENT: ${environment}
${flourRule}

STYLE: photorealistic, cinematic lighting, highly detailed.
STRICT NEGATIVE CONSTRAINTS: NO traditional pans, NO pots, NO skillets, NO stovetops, NO text, NO whole squid, MUST be rings.`;

        const imgName = `step_${i + 1}.jpg`;
        const imgPath = path.join(recipeDir, imgName);

        const success = await generateImagen3Image(prompt, imgPath);
        
        if (success) {
            recipe.step_images[i] = `/images/recipes/${recipe.slug}/${imgName}`;
            console.log(`   ✅ Step ${i+1} completato.`);
            previousStepText = step; // Aggiorniamo la memoria con l'azione appena conclusa
        } else {
            console.log(`   ⚠️ Step ${i+1} fallito dopo i retry.`);
        }
        
        console.log(`   ⏳ Pausa 20s...`);
        await new Promise(res => setTimeout(res, 20000));
    }

    console.log(`\n📱 Avvio caricamento su Pinterest...`);
    const pinOk = await publishPin(recipe);
    if (pinOk) recipe.pinterest_pin_published = true;

    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
    console.log(`\n💾 JSON aggiornato correttamente.`);
    console.log(`🎉 FINE PROCESSO.`);
}

runTest();