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
