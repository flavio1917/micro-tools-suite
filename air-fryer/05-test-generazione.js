import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURAZIONE
const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = 'europe-west1'; // o us-central1
const MODEL_ID = 'imagen-3.0-capability-001';
const RECIPES_FILE = path.join(__dirname, 'src', 'data', 'recipes-it.json');
const IMAGES_DIR = path.join(__dirname, 'public', 'images', 'recipes');

// Autenticazione
const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Supporto per attendere l'input utente
function wait() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question('\n👉 Premi INVIO per elaborare la prossima ricetta...', (ans) => {
        rl.close();
        resolve();
    }));
}

// Salva l'immagine: per la principale usiamo WebP, per gli step JPG
async function saveImage(imageBase64, filePath, isWebp = false) {
    const buffer = Buffer.from(imageBase64, 'base64');
    let sharpInstance = sharp(buffer).resize({ width: 1024, height: 1024, fit: 'inside' });
    
    if (isWebp) {
        await sharpInstance.webp({ quality: 85 }).toFile(filePath);
    } else {
        await sharpInstance.jpeg({ quality: 85 }).toFile(filePath);
    }
}

// ==========================================
// IL CUORE DELLA LOGICA: ANALISI DELLO STATO
// ==========================================
function getContextForStep(recipe, stepIndex) {
    // 1. SCENARIO: IMMAGINE PRINCIPALE (Copertina Click-Bait)
    if (stepIndex === -1) {
        return `
        SCENE CONTEXT: This is the FINAL, PLATED DISH. 
        CRITICAL: DO NOT SHOW THE AIR FRYER. DO NOT SHOW BASKETS.
        The image must be an ultra-appetizing, click-bait style, professional food photography shot.
        Show the beautifully assembled final product on a rustic table with elegant plating.
        Highlight the delicious textures, perfect cooking, and vibrant colors of the fresh ingredients.
        `;
    }

    const currentStepText = recipe.instructions[stepIndex].toLowerCase();
    let isCooking = false;
    let isInBasket = false;

    // Controlliamo gli step dal primo fino a quello attuale per capire "la storia"
    for (let i = 0; i <= stepIndex; i++) {
        const text = recipe.instructions[i].toLowerCase();
        
        // Se si nomina il cestello, il prodotto ci entra
        if (text.includes('cestello') || text.includes('friggitrice')) {
            isInBasket = true;
        }
        
        // Se si parla di gradi o cuocere, la cottura inizia
        if (text.includes('cuocere') || text.includes('gradi') || text.includes('°c') || text.includes('infornare')) {
            isCooking = true;
        }
    }

    // 2. SCENARIO: IN COTTURA NEL CESTELLO
    if (isCooking) {
        return `
        SCENE CONTEXT: COOKING PHASE.
        CRITICAL: The food is currently INSIDE the massive, deep black metal basket of an XXL Air Fryer.
        Show the perforated metal grate. The food is actively cooking, showing heat, browning, and changing textures.
        `;
    } 
    // 3. SCENARIO: MESSO NEL CESTELLO MA ANCORA CRUDO/IN PREPARAZIONE
    else if (isInBasket) {
        return `
        SCENE CONTEXT: PLACED IN AIR FRYER.
        CRITICAL: The food has just been placed INSIDE the black metal basket of an XXL Air Fryer.
        Show the perforated metal grate of the large basket. The food is RAW or just prepped, not cooked yet.
        `;
    } 
    // 4. SCENARIO: PREPARAZIONE SUL BANCONE
    else {
        return `
        SCENE CONTEXT: EARLY PREPARATION.
        CRITICAL: The food is strictly OUTSIDE the air fryer. DO NOT show the air fryer.
        Show a kitchen counter, cutting boards, bowls, or hands preparing the RAW ingredients.
        `;
    }
}

// Costruisce il prompt per l'API
function buildMasterPrompt(recipe, stepIndex) {
    const isFinalImage = stepIndex === -1;
    const actionText = isFinalImage ? "The final plated dish ready to be eaten." : recipe.instructions[stepIndex];
    const sceneContext = getContextForStep(recipe, stepIndex);
    const description = recipe.description ? `RECIPE DESCRIPTION: ${recipe.description}` : "";

    return `
    You are an award-winning food photographer. Create a photorealistic, 8k resolution, cinematic image.

    RECIPE TITLE: ${recipe.title}
    ${description}
    ALL INGREDIENTS INVOLVED: ${recipe.ingredients.join(', ')}
    
    ${sceneContext}

    SPECIFIC ACTION OR STATE TO VISUALIZE: 
    "${actionText}"

    Focus entirely on illustrating the action and context described above, ensuring the ingredients look realistic.
    `;
}

// Chiamata all'API
async function generateImageWithVertex(prompt, baseImageBase64) {
    const client = await auth.getClient();
    const url = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:predict`;

    const payload = {
        instances: [
            {
                prompt: prompt,
                referenceImages: [
                    {
                        referenceId: 1, // ID obbligatorio
                        referenceType: "REFERENCE_TYPE_STYLE", // Usa la foto come guida per luci, set e colori
                        referenceImage: {
                            bytesBase64Encoded: baseImageBase64 // Il Base64 crudo, senza altri oggetti intorno
                        },
                        styleImageConfig: {
                            styleDescription: "fotografia culinaria professionale" // Parametro richiesto da Google quando si usa lo Style
                        }
                    }
                ]
            }
        ],
        parameters: {
            sampleCount: 1,
            outputOptions: {
                mimeType: "image/jpeg"
            }
        }
    };

    try {
        const response = await client.request({ url, method: 'POST', data: payload });
        
        if (response.data && response.data.predictions && response.data.predictions[0].bytesBase64Encoded) {
            return response.data.predictions[0].bytesBase64Encoded;
        } else {
            console.error("Dettaglio Risposta:", JSON.stringify(response.data, null, 2));
            throw new Error("L'API ha risposto ma non ha restituito immagini.");
        }
    } catch (err) {
        console.error("❌ Dettaglio Errore:", JSON.stringify(err.response?.data || err.message, null, 2));
        throw err;
    }
}

// ==========================================
// CICLO PRINCIPALE
// ==========================================
async function runBatchGenerator() {
    console.log("🚀 Avvio Generatore Text-to-Image Completo (Copertina + Step)...");

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.error("❌ ERRORE: Manca GOOGLE_APPLICATION_CREDENTIALS nel file .env");
        return;
    }

    let recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf-8'));

    for (let rIndex = 0; rIndex < recipes.length; rIndex++) {
        let recipe = recipes[rIndex];
        const slug = recipe.slug;

        // Per testare la tua logica, eseguiamo se mancano gli step O se vuoi rigenerare (puoi forzare qui)
        const needsImages = !recipe.step_images || recipe.step_images.includes("") || recipe.step_images.length < recipe.instructions.length;
        
        if (!needsImages) continue;

        console.log(`\n--- 👨‍🍳 Elaborazione: ${recipe.title.toUpperCase()} ---`);
        await wait();

        const recipeDir = path.join(IMAGES_DIR, slug);
        if (!fs.existsSync(recipeDir)) fs.mkdirSync(recipeDir, { recursive: true });

        // --- 1. RIGENERA IMMAGINE PRINCIPALE (COPERTINA) ---
        console.log(`   📸 Generazione Immagine Principale (Click-Bait)...`);
        try {
            const promptCopertina = buildMasterPrompt(recipe, -1);
            const base64Copertina = await generateImageWithVertex(promptCopertina);
            const coverFileName = `${slug}.webp`; // Mantiene la tua estensione
            const coverPath = path.join(IMAGES_DIR, coverFileName);
            
            await saveImage(base64Copertina, coverPath, true);
            recipe.image = `/images/recipes/${coverFileName}`;
            console.log(`   ✅ Sovrascritta copertina: ${coverFileName}`);
            
            await new Promise(res => setTimeout(res, 2000)); // Pausa Rate Limit
        } catch (error) {
            console.error(`   ❌ Errore API Copertina:`, error.message);
            continue; // Se fallisce la copertina, passiamo oltre
        }

        // --- 2. GENERA IMMAGINI STEP-BY-STEP ---
        if (!recipe.step_images) recipe.step_images = new Array(recipe.instructions.length).fill("");

        for (let i = 0; i < recipe.instructions.length; i++) {
            if (recipe.step_images[i] && recipe.step_images[i] !== "") continue;

            console.log(`   📸 Generazione Step ${i + 1}/${recipe.instructions.length}...`);
            
            try {
                const promptStep = buildMasterPrompt(recipe, i);
                const base64Step = await generateImageWithVertex(promptStep);
                
                const fileName = `step_${i + 1}.jpg`;
                const filePath = path.join(recipeDir, fileName);
                
                await saveImage(base64Step, filePath, false);
                recipe.step_images[i] = `/images/recipes/${slug}/${fileName}`;
                console.log(`   ✅ Salvato step_${i + 1}.jpg`);

                fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
                await new Promise(res => setTimeout(res, 2000));
                
            } catch (error) {
                console.error(`   ❌ Errore API nello Step ${i + 1}:`, error.message);
                break;
            }
        }
    }
    console.log("\n✅ Elaborazione terminata.");
}

runBatchGenerator().catch(console.error);