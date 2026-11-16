// Titolo e H1 delle ricette per i risultati di ricerca.
//
// Regole (valgono per tutte le ricette senza seoTitle/seoH1 scritti a mano):
//  - il titolo contiene sempre la parola chiave che l'utente digita
//    ("in friggitrice ad aria", "air fryer", ...);
//  - resta entro 60 caratteri, così Google non lo tronca;
//  - usa solo dati veri della ricetta (nome, gancio tra parentesi già presente
//    nel titolo, tempo e temperatura): nessuna promessa inventata.

type Lang = 'it' | 'en' | 'es' | 'fr';

const MAX_TITLE = 60;

const KEYWORD: Record<Lang, { detect: RegExp; add: (name: string) => string; addLower: (name: string) => string; stat: (time: string, temp: string | number) => string }> = {
  it: {
    detect: /friggitrice ad aria/i,
    add: (n) => `${n} in Friggitrice ad Aria`,
    addLower: (n) => `${n} in friggitrice ad aria`,
    stat: (time, temp) => `${time} Min a ${temp}°C`,
  },
  en: {
    detect: /air[\s-]?fr(yer|ied|y)/i,
    add: (n) => `Air Fryer ${n}`,
    addLower: (n) => `Air Fryer ${n}`,
    stat: (time, temp) => `${time} Min at ${temp}°F`,
  },
  es: {
    detect: /freidora de aire/i,
    add: (n) => `${n} en Freidora de Aire`,
    addLower: (n) => `${n} en freidora de aire`,
    stat: (time, temp) => `${time} Min a ${temp} °C`,
  },
  fr: {
    detect: /air fryer|friteuse à air/i,
    add: (n) => `${n} au Air Fryer`,
    addLower: (n) => `${n} au air fryer`,
    stat: (time, temp) => `${time} Min à ${temp} °C`,
  },
};

// "Filetti di Pollo Cajun (Panatura Extra Crunch)" -> nome + gancio
function splitTitle(title: string): { name: string; hook: string } {
  const m = title.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
  return m ? { name: m[1].trim(), hook: m[2].trim() } : { name: title.trim(), hook: '' };
}

export function buildRecipeSeoTitle(recipe: any, lang: string): string {
  if (recipe.seoTitle) return recipe.seoTitle;
  const k = KEYWORD[(lang as Lang)] || KEYWORD.it;
  const { name, hook } = splitTitle(recipe.title || '');
  const base = k.detect.test(name) ? name : k.add(name);
  const time = String(recipe.time ?? '').match(/\d+/)?.[0];
  const candidates = [
    hook && !k.detect.test(hook) ? `${base} (${hook})` : '',
    time && recipe.temp ? `${base}${lang === 'fr' ? ' :' : ':'} ${k.stat(time, recipe.temp)}` : '',
    base,
    name,
  ].filter(Boolean);
  return candidates.find((c) => c.length <= MAX_TITLE) || candidates[candidates.length - 1];
}

export function buildRecipeH1(recipe: any, lang: string): string {
  if (recipe.seoH1) return recipe.seoH1;
  const k = KEYWORD[(lang as Lang)] || KEYWORD.it;
  const { name, hook } = splitTitle(recipe.title || '');
  if (k.detect.test(recipe.title || '')) return recipe.title;
  return hook ? `${k.addLower(name)} (${hook})` : k.addLower(name);
}

// Description delle ricette per i risultati di ricerca.
//
// Regole (per le ricette senza seoDescription scritta a mano):
//  - solo frasi intere, mai tagliate con "…";
//  - tra 120 e 155 caratteri quando i dati lo permettono;
//  - apre con la parola chiave e i dati veri della ricetta (tempo, temperatura,
//    proteine), poi le frasi della descrizione della ricetta.
const MAX_DESC = 155;
const MIN_DESC = 120;

const DESC: Record<Lang, {
  lead: (name: string) => string;
  stat: (time: string, temp: string | number) => string;
  pro: (g: number | string) => string;
  closing: string;
}> = {
  it: {
    lead: (n) => KEYWORD.it.addLower(n),
    stat: (time, temp) => `${temp}°C per ${time} minuti`,
    pro: (g) => `${g} g di proteine`,
    closing: 'Ingredienti, passaggi e consigli per una cottura perfetta.',
  },
  en: {
    lead: (n) => KEYWORD.en.addLower(n),
    stat: (time, temp) => `${time} minutes at ${temp}°F`,
    pro: (g) => `${g} g protein`,
    closing: 'Ingredients, step-by-step method and tips for perfect results.',
  },
  es: {
    lead: (n) => KEYWORD.es.addLower(n),
    stat: (time, temp) => `${time} minutos a ${temp} °C`,
    pro: (g) => `${g} g de proteína`,
    closing: 'Ingredientes, pasos y consejos para un resultado perfecto.',
  },
  fr: {
    lead: (n) => KEYWORD.fr.addLower(n),
    stat: (time, temp) => `${time} minutes à ${temp} °C`,
    pro: (g) => `${g} g de protéines`,
    closing: 'Ingrédients, étapes et astuces pour une cuisson parfaite.',
  },
};

function sentencesOf(text: string): string[] {
  return (text.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g) || [])
    .map((s) => s.trim())
    .filter(Boolean);
}

export function buildRecipeSeoDescription(recipe: any, lang: string): string {
  if (recipe.seoDescription) return recipe.seoDescription;
  const l = ((lang as Lang) in DESC ? lang : 'it') as Lang;
  const k = KEYWORD[l];
  const d = DESC[l];
  const colon = l === 'fr' ? ' :' : ':';
  const { name } = splitTitle(recipe.title || '');
  const lead = k.detect.test(name) ? name : d.lead(name);
  const time = String(recipe.time ?? '').match(/\d+/)?.[0];
  const stat = time && recipe.temp ? d.stat(time, recipe.temp) : '';
  const pro = recipe.nutrition?.proteins_g ? d.pro(recipe.nutrition.proteins_g) : '';

  const leads = [
    stat && pro ? `${lead}${colon} ${stat}, ${pro}.` : '',
    stat ? `${lead}${colon} ${stat}.` : '',
    `${lead}.`,
  ].filter(Boolean);
  const body = sentencesOf(recipe.description || '');

  // Per ogni apertura: quante frasi della ricetta entrano, poi eventuale
  // frase di chiusura per arrivare ad almeno 120 caratteri.
  const fill = (start: string) => {
    let out = start;
    let own = 0;
    for (const s of body) {
      if (`${out} ${s}`.length > MAX_DESC) break;
      out = `${out} ${s}`;
      own++;
    }
    if (out.length < MIN_DESC && `${out} ${d.closing}`.length <= MAX_DESC) out = `${out} ${d.closing}`;
    return { out, own };
  };

  // Preferenza: testo proprio della ricetta e lunghezza piena, poi solo
  // testo proprio, poi lunghezza piena; a parità vince l'apertura più ricca.
  const results = leads.filter((x) => x.length <= MAX_DESC).map(fill);
  const pick =
    results.find((r) => r.own > 0 && r.out.length >= MIN_DESC) ||
    results.find((r) => r.own > 0 && r.out.length >= 100) ||
    results.find((r) => r.out.length >= MIN_DESC) ||
    results.sort((a, b) => b.out.length - a.out.length)[0];
  return pick ? pick.out : lead;
}
