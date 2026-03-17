import Redis from 'ioredis';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const redis = new Redis(undefined                         );
async function POST({ request }) {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
