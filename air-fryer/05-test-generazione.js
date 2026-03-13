import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Cerca il file .env nella cartella principale
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';

const RECIPES_FILE = './src/data/recipes-it.json';
const BASE_IMG_DIR = './public/images/recipes';
const DOMAIN = 'https://www.convertitorefriggitrice.it';
const PINTEREST_TOKEN = process.env.PINTEREST_TOKEN;

async function generateImagen3Image(prompt, filepath) {
    try {
        console.log(`   ⏳ Contatto Google Vertex AI (Imagen 3)...`);
        
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
        console.error(`   ❌ Errore Google API:`, e.response?.data?.error?.message || e.message);
        return false;
    }
}

function getTargetBoard(recipe) {
    const text = (recipe.title + " " + recipe.keywords.join(' ')).toLowerCase();
    if (text.includes('snack') || text.includes('contorno') || text.includes('antipasto') || text.includes('calamari')) {
        return process.env.BOARD_ANTIPASTI;
    }
    if (text.includes('carne') || text.includes('secondo') || text.includes('hamburger') || text.includes('pesce')) {
        return process.env.BOARD_SECONDI;
    }
    return process.env.BOARD_GENERALI;
}

async function publishPin(recipe) {
    const boardId = getTargetBoard(recipe);
    const imageUrl = `${DOMAIN}/images/recipes/${recipe.image || recipe.slug}.webp`;
    const recipeUrl = `${DOMAIN}/it/recipes/${recipe.slug}`;

    console.log(`📌 Preparazione Pin Pinterest...`);

    const seoTags = `#friggitriceadaria #airfryerrecipes #ricetteveloci #cucinasana #${recipe.slug.replace(/-/g, '')}`;
    const description = `✨ ${recipe.title} ✨\n\n${recipe.description}\n\nTempi e temperature perfette per la tua friggitrice ad aria! Clicca sul link per scoprire le dosi esatte e il procedimento passo-passo. 👇\n\n${seoTags}`;

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
        
        console.log(`✅ Pin pubblicato! ID: ${response.data.id}`);
        return true;
    } catch (error) {
        console.error("❌ Errore Pinterest:", error.response?.data || error.message);
        return false;
    }
}

async function runTest() {
    console.log("🚀 AVVIO TEST GOOGLE VERTEX AI E PINTEREST...");

    let recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
    let recipe = recipes[0]; // LA PRIMA RICETTA

    console.log(`\n👨‍🍳 Elaborazione Ricetta: ${recipe.title}`);
    
    const recipeDir = path.join(BASE_IMG_DIR, recipe.slug);
    if (!fs.existsSync(recipeDir)) fs.mkdirSync(recipeDir, { recursive: true });

    recipe.step_images = [];
    
    for (let i = 0; i < recipe.instructions.length; i++) {
        let step = recipe.instructions[i];
        console.log(`\n📸 Step ${i + 1}: ${step.substring(0, 60)}...`);

        let prompt = "";

        // Regole di prompt iper-specifiche per i calamari per evitare gli errori di prima
        if (i === 0 && recipe.slug.includes('calamari')) {
            prompt = `Professional close-up macro food photography, photorealistic. Clean hands are gently patting fresh, translucent calamari rings using thick white absorbent paper towels. The paper is clearly absorbing moisture. Arranged on a clean, rustic wooden counter. Focus on the texture of the moisture and the absorbent paper. STRICTLY NO SEMOLINA. NO FLOUR. NO POTS. NO TEXT.`;
        } else if (i === 1 && recipe.slug.includes('calamari')) {
            prompt = `Close-up macro shot on a rustic wooden counter. Calamari rings are being carefully added to a clean, clear, food-grade plastic zip-top bag already containing some fine semolina flour. Clean hands are holding the bag open. Focus on the action of inserting the rings inside the clear bag. STRICTLY NO POTS, NO PANS, NO WOODEN SPOONS. Soft warm cinematic lighting.`;
        } else {
            // Prompt generico per tutte le altre ricette/step
            const isCookingContext = /(cuocer|cottura|girar|cestello|gradi|°C|°F|spruzzar|friggitrice|fonder|posizionar)/i.test(step);
            const environment = isCookingContext 
                ? "Action happening strictly inside the black basket of an air fryer." 
                : "Action happening on a modern, well-lit wooden kitchen counter.";
            
            prompt = `Professional food photography, close-up macro shot. Step-by-step cooking instruction for '${recipe.title}'. 
Action taking place: ${step}. 
Environment: ${environment}. 
Style: photorealistic, highly detailed, soft warm cinematic kitchen lighting, appetizing, no text, no watermarks, no abstract elements.`;
        }

        const imgName = `step_${i + 1}.jpg`;
        const imgPath = path.join(recipeDir, imgName);

        const success = await generateImagen3Image(prompt, imgPath);
        if (success) {
            recipe.step_images.push(`/images/recipes/${recipe.slug}/${imgName}`);
            console.log(`   ✅ Foto generata e salvata: ${imgName}`);
        }
        
        // Pausa salvavita per le Quote di Google (15 SECONDI)
        console.log(`   ⏳ Attendo 15 secondi per rispettare i limiti di velocità di Google...`);
        await new Promise(res => setTimeout(res, 15000));
    }

    console.log(`\n📱 Avvio pubblicazione Pinterest...`);
    const pinSuccess = await publishPin(recipe);
    if (pinSuccess) recipe.pinterest_pin_published = true;

    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
    console.log(`\n💾 Dati salvati in recipes-it.json`);
    console.log(`🎉 TEST COMPLETATO!`);
}

runTest();