import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

console.log("--- DEBUG: Script avviato correttamente! ---");

// 1. INSERISCI LA TUA CHIAVE API QUI (Generane una nuova su Google AI Studio!)
const API_KEY = "AIzaSyBYrH0-t8L3LCifLXbjAZ4gUCmxjRqFBiw";
// 2. LINGUA DI DESTINAZIONE
const TARGET_LANG = 'fr'; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Percorsi dei file
const inputPath = './src/data/recipes-it.json'; 
const outputPath = `./src/data/recipes-${TARGET_LANG}.json`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTranslation() {
  console.log(`🚀 Avvio traduzione in lingua: ${TARGET_LANG.toUpperCase()}...`);

  const originalRecipes = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  
  let translatedRecipes = [];
  if (fs.existsSync(outputPath)) {
    translatedRecipes = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    console.log(`✅ Trovate ${translatedRecipes.length} ricette già tradotte. Riprendo il lavoro...`);
  }

  for (let i = translatedRecipes.length; i < originalRecipes.length; i++) {
    const recipe = originalRecipes[i];
    console.log(`⏳ Traduco [${i + 1}/${originalRecipes.length}]: ${recipe.title}`);

    let languageRules = "";
    if (TARGET_LANG === 'en') {
      languageRules = `- Traduci in Inglese Americano (US).\n- CONVERTI gradi Celsius in Fahrenheit (200°C -> 400°F).\n- CONVERTI grammi in once (oz).\n- Riscrivi lo 'slug' in inglese (trattini).`;
    } else if (TARGET_LANG === 'es') {
      languageRules = `- Traduci in Spagnolo.\n- MANTIENI gradi Celsius e grammi.\n- Riscrivi lo 'slug' in spagnolo (trattini).`;
    } else if (TARGET_LANG === 'fr') {
      languageRules = `- Traduci in Francese.\n- MANTIENI gradi Celsius e grammi.\n- Riscrivi lo 'slug' in francese (trattini).`;
    }

    const prompt = `
    Sei un traduttore culinario esperto SEO.
    Traduci questo oggetto JSON di una ricetta per friggitrice ad aria.
    
    REGOLE TASSATIVE:
    ${languageRules}
    - Mantieni le chiavi del JSON invariate.
    - Se è un piatto tipicamente italiano, aggiungi "isItalian": true, altrimenti false.
    - RESTITUISCI SOLO JSON VALIDO (nessun markdown, nessun commento).

    JSON:
    ${JSON.stringify(recipe, null, 2)}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemma-3-27b-it',
         contents: prompt,
      });

      let rawText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const translatedRecipe = JSON.parse(rawText);
      
      translatedRecipe.image = recipe.slug;
      translatedRecipes.push(translatedRecipe);
      fs.writeFileSync(outputPath, JSON.stringify(translatedRecipes, null, 2));

      console.log(`✅ Fatto! (isItalian: ${translatedRecipe.isItalian})`);
      await sleep(10000); // 10 secondi di pausa tra le ricette

    } catch (error) {
      console.error(`❌ Errore alla ricetta ${recipe.title}:`, error.message);
      console.log("⚠️ Attendo 60 secondi prima di riprovare questa ricetta...");
      await sleep(60000); // Se va in errore, aspetta 60 secondi e riprova lo stesso indice
      i--; // Decrementiamo i per riprovare la stessa ricetta nel prossimo ciclo
    }
  }

  console.log(`🎉 Traduzione in ${TARGET_LANG.toUpperCase()} completata!`);
}

runTranslation();