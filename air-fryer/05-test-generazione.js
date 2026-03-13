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
    
    // Variabili di contesto persistenti tra i vari step
    let previousVisualContext = "None. This is the very first step.";
    let currentFoodAppearance = "";
    
    // Lista ingredienti e proporzioni da passare come contesto all'IA
    const ingredientsContext = "Quantities: 400g raw calamari rings, ONLY 100g of fine yellow semolina flour (a very small amount), olive oil spray, salt, lemon wedges.";

    for (let i = 0; i < recipe.instructions.length; i++) {
        let step = recipe.instructions[i];
        let stepLower = step.toLowerCase();
        console.log(`\n📸 Generazione Step ${i + 1}/${recipe.instructions.length}`);

        // --- 1. DETERMINA LO STATO DI COTTURA (Memoria Cumulativa) ---
        // Uniamo il testo di tutti gli step fino a quello corrente per capire se abbiamo già iniziato a cuocere
        let accumulatedSteps = recipe.instructions.slice(0, i + 1).join(" ").toLowerCase();
        
        let foodState = "RAW (Crudo)";
        if (/(cuocer|cottura|girar|doratura|200°c|sfornar|friggere)/i.test(accumulatedSteps)) {
            foodState = "COOKING/COOKED (Golden brown, crispy, cooked)";
        }

        // --- 2. REGOLA FERREA PER FARINA E SACCHETTI ---
        let flourRule = "";
        if (/(sacchetto|semola|farina|impanatura|panatura)/i.test(stepLower)) {
            flourRule = `CRITICAL RULE: The clear plastic bag MUST NOT be full of flour. It must contain ONLY a very thin, sparse layer of semolina flour at the bottom (representing 100g of flour vs 400g of squid). The raw squid rings must be clearly visible inside. NO giant bags of flour.`;
        }

        // --- 3. LOGICA UNIVERSALE DI NEGATIVE PROMPT ---
        const universalNegative = `STRICT NEGATIVE CONSTRAINTS: NO traditional pans, NO pots, NO skillets, NO stovetops, NO text, NO breadcrumbs, NO whole squid, MUST be rings, NO bags full to the brim with flour.`;

        // --- 4. MOTORE DI REGIA PER CALAMARI ---
        let prompt = "";
        let environment = "";
        let actionOverride = step;

        if (recipe.slug.includes('calamari')) {
            if (i === 0) {
                currentFoodAppearance = "raw, fresh, moist, translucent white calamari rings";
                environment = "Rustic wooden counter.";
                actionOverride = "Clean hands gently patting the raw squid rings dry using white absorbent paper towels.";
            } 
            else if (i === 1) {
                currentFoodAppearance = "raw calamari rings being mixed with a tiny dusting of fine yellow semolina flour";
                environment = "Rustic wooden counter.";
                actionOverride = "Hands holding open a clear plastic ziplock food bag. Adding the raw rings into the bag which contains just a tiny bit of yellow semolina.";
            } 
            else if (i === 2) {
                currentFoodAppearance = "raw calamari rings evenly coated with a light layer of fine yellow semolina flour";
                environment = "Action happening STRICTLY INSIDE the dark, perforated black drawer basket of an air fryer.";
                actionOverride = "Arranging the flour-coated raw rings in a single layer inside the air fryer basket.";
            }
            else if (i === 3) {
                currentFoodAppearance = "raw calamari rings evenly coated with fine yellow semolina flour, sitting in the basket";
                environment = "Action happening STRICTLY INSIDE the dark, perforated black drawer basket of an air fryer.";
                actionOverride = "A hand using a glass oil spray bottle to mist cooking oil evenly over the coated raw rings.";
            }
            else {
                currentFoodAppearance = "perfectly cooked, golden-brown, crispy fried calamari rings";
                environment = "Action happening STRICTLY INSIDE the dark, perforated black drawer basket of an air fryer.";
                actionOverride = "The fully cooked crispy rings resting inside the air fryer basket, showing a perfect golden texture.";
            }
        } else {
            // Fallback per altre ricette
            let isInAirFryer = /(cuocer|cottura|girar|cestello|gradi|°c|°f|friggitrice|posizionar)/i.test(stepLower);
            environment = isInAirFryer 
                ? "Action happening STRICTLY INSIDE the dark black perforated drawer basket of an air fryer." 
                : "Action happening on a modern wooden kitchen counter.";
            currentFoodAppearance = `Subject matter corresponding to recipe: ${recipe.title}`;
        }

        // --- 5. COSTRUZIONE PROMPT FINALE STRUTTURATO ---
        prompt = `Professional food photography, close-up macro shot.
CONTEXT:
- Ingredients present: ${ingredientsContext}
- Previous visual state: ${previousVisualContext}
- Current Food State: ${foodState}
- Current Appearance: ${currentFoodAppearance}
ACTION: ${actionOverride}
ENVIRONMENT: ${environment}
${flourRule}
STYLE: photorealistic, cinematic lighting, highly detailed.
${universalNegative}`;

        const imgName = `step_${i + 1}.jpg`;
        const imgPath = path.join(recipeDir, imgName);

        // Generiamo l'immagine
        const success = await generateImagen3Image(prompt, imgPath);
        
        if (success) {
            recipe.step_images[i] = `/images/recipes/${recipe.slug}/${imgName}`;
            console.log(`   ✅ Step ${i+1} completato.`);
            // Aggiorniamo la memoria per lo step successivo
            previousVisualContext = currentFoodAppearance;
        } else {
            console.log(`   ⚠️ Step ${i+1} fallito dopo i retry.`);
        }
        
        // Pausa cautelativa tra gli step
        console.log(`   ⏳ Pausa 20s...`);
        await new Promise(res => setTimeout(res, 20000));
    }

    console.log(`\n📱 Avvio caricamento su Pinterest...`);
    const pinOk = await publishPin(recipe);
    if (pinOk) recipe.pinterest_pin_published = true;

    // Salvataggio finale
    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
    console.log(`\n💾 JSON aggiornato correttamente.`);
    console.log(`🎉 FINE PROCESSO.`);
}

runTest();