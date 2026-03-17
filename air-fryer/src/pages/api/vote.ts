export const prerender = false; // Questo dice ad Astro di eseguire questo file in tempo reale sul server

import Redis from 'ioredis';

// Si collega al tuo database Vercel
const redis = new Redis(import.meta.env.REDIS_URL);

export async function POST({ request }) {
  try {
    // Riceve i dati dal clic dell'utente (es. ricetta "pollo", voto "4")
    const body = await request.json();
    const { slug, rating } = body;

    // Controllo di sicurezza
    if (!slug || !rating || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: "Dati non validi" }), { status: 400 });
    }

    // Crea i "cassetti" nel database per questa specifica ricetta
    const votesKey = `recipe:${slug}:votes`; // Cassetto per il numero di persone che hanno votato
    const sumKey = `recipe:${slug}:sum`;     // Cassetto per la somma totale dei voti

    // Aggiunge il voto al database
    const totalVotes = await redis.incr(votesKey); // +1 persona
    const sumVotes = await redis.incrby(sumKey, rating); // + voto (es. +4)

    // Calcola la nuova media matematica (arrotondata a 1 decimale)
    const average = (sumVotes / totalVotes).toFixed(1);

    // Risponde al browser con i nuovi dati aggiornati
    return new Response(JSON.stringify({
      success: true,
      average: Number(average),
      count: totalVotes
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Errore Database:", error);
    return new Response(JSON.stringify({ error: "Errore interno" }), { status: 500 });
  }
}