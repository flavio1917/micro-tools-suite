import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Cerca il file .env nella cartella principale
import axios from 'axios';

const PINTEREST_TOKEN = process.env.PINTEREST_TOKEN;

console.log(`🕵️ Debug Token: inizia per "${PINTEREST_TOKEN?.substring(0, 6)}...", lunghezza totale: ${PINTEREST_TOKEN?.length} caratteri`);

async function run() {
    try {
        console.log("🔍 Cerco le tue bacheche Pinterest...");
        const response = await axios.get('https://api.pinterest.com/v5/boards', {
            headers: { 'Authorization': `Bearer ${PINTEREST_TOKEN}` }
        });
        
        console.log("\n✅ ECCO I TUOI ID DA COPIARE:");
        response.data.items.forEach(board => {
            console.log(`- Nome: "${board.name}" -> ID: ${board.id}`);
        });
    } catch (error) {
        console.error("❌ Errore:", error.response?.data || error.message);
    }
}
run();