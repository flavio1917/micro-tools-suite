export const prerender = false; 

import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// 1. GESTISCE IL SALVATAGGIO DEL VOTO (Quello che avevi già)
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { slug, rating } = body;

    if (!slug || !rating || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: "Dati non validi" }), { status: 400 });
    }

    const votesKey = `recipe:${slug}:votes`;
    const sumKey = `recipe:${slug}:sum`;

    const totalVotes = await redis.incr(votesKey);
    const sumVotes = await redis.incrby(sumKey, rating);
    const average = (sumVotes / totalVotes).toFixed(1);

    return new Response(JSON.stringify({ success: true, average: Number(average), count: totalVotes }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Errore interno" }), { status: 500 });
  }
}

// 2. NUOVO: GESTISCE LA LETTURA DEI VOTI ALL'APERTURA DELLA PAGINA
export async function GET({ request }) {
  try {
    // Prende il nome della ricetta dall'URL (es: /api/vote?slug=pollo)
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (!slug) return new Response(JSON.stringify({ error: "Slug mancante" }), { status: 400 });

    const votesKey = `recipe:${slug}:votes`;
    const sumKey = `recipe:${slug}:sum`;

    // Legge i dati da Redis
    const [countStr, sumStr] = await Promise.all([redis.get(votesKey), redis.get(sumKey)]);
    
    const count = countStr ? parseInt(countStr) : 0;
    const sum = sumStr ? parseInt(sumStr) : 0;
    const average = count > 0 ? Number((sum / count).toFixed(1)) : 0;

    return new Response(JSON.stringify({ count, average }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Errore lettura" }), { status: 500 });
  }
}