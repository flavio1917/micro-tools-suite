export const defaultTitles = {
  it: "Crispissimo | Ricette in Friggitrice ad Aria Facili e Croccanti",
  en: "Crispissimo | Easy & Crispy Air Fryer Recipes",
  es: "Crispissimo | Recetas en Freidora de Aire Fáciles y Crujientes",
  fr: "Crispissimo | Recettes à la Friteuse à Air Faciles et Croustillantes",
};

export const defaultDescriptions = {
  it: "Scopri ricette facili, gustose e croccanti per la friggitrice ad aria, con consigli pratici, categorie e strumenti utili firmati Crispissimo.",
  en: "Discover easy, tasty, crispy air fryer recipes, practical tips, categories, and useful tools from Crispissimo.",
  es: "Descubre recetas fáciles, sabrosas y crujientes para freidora de aire, con consejos prácticos, categorías y herramientas útiles de Crispissimo.",
  fr: "Découvrez des recettes faciles, savoureuses et croustillantes pour friteuse à air, avec des conseils pratiques, des catégories et des outils utiles signés Crispissimo.",
};

export const locales = {
  it: "it_IT",
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

export const routeMap = {
  it: { home: "/", categories: "/#ricettario-container", converter: "/convertitore", tools: "/strumenti" },
  en: { home: "/en/", categories: "/en/#ricettario-container", converter: "/en/converter", tools: "/en/tools" },
  es: { home: "/es/", categories: "/es/#ricettario-container", converter: "/es/convertidor", tools: "/es/herramientas" },
  fr: { home: "/fr/", categories: "/fr/#ricettario-container", converter: "/fr/convertisseur", tools: "/fr/outils" },
};

export const navLabels = {
  it: {
    brandTagline: "Ricette facili e super croccanti per la friggitrice ad aria.",
    recipes: "Ricette", categories: "Categorie", converter: "Convertitore", tools: "Strumenti", themeToggle: "Cambia tema", language: "Lingua",
    footerNote: "Crispissimo è il nuovo nome di Convertitore Friggitrice.",
    disclaimer: "Trasparenza: in qualità di Affiliato Amazon, questo sito può ricevere una commissione dagli acquisti idonei. I risultati del convertitore sono indicativi e vanno sempre verificati in cottura.",
    privacy: "Privacy", cookies: "Cookie",
  },
  en: {
    brandTagline: "Easy and crispy air fryer recipes for everyday cooking.",
    recipes: "Recipes", categories: "Categories", converter: "Converter", tools: "Tools", themeToggle: "Toggle theme", language: "Language",
    footerNote: "Crispissimo is the new name of Convertitore Friggitrice.",
    disclaimer: "Transparency: as an Amazon Associate, this site may earn from qualifying purchases. Converter results are estimates and should always be checked while cooking.",
    privacy: "Privacy", cookies: "Cookies",
  },
  es: {
    brandTagline: "Recetas fáciles y crujientes para freidora de aire cada día.",
    recipes: "Recetas", categories: "Categorías", converter: "Convertidor", tools: "Herramientas", themeToggle: "Cambiar tema", language: "Idioma",
    footerNote: "Crispissimo es el nuevo nombre de Convertitore Friggitrice.",
    disclaimer: "Transparencia: como Afiliado de Amazon, este sitio puede recibir una comisión por compras válidas. Los resultados del convertidor son estimaciones y deben comprobarse durante la cocción.",
    privacy: "Privacidad", cookies: "Cookies",
  },
  fr: {
    brandTagline: "Des recettes faciles et croustillantes pour la friteuse à air.",
    recipes: "Recettes", categories: "Catégories", converter: "Convertisseur", tools: "Outils", themeToggle: "Changer le thème", language: "Langue",
    footerNote: "Crispissimo est le nouveau nom de Convertitore Friggitrice.",
    disclaimer: "Transparence : en tant que Partenaire Amazon, ce site peut percevoir une commission sur les achats éligibles. Les résultats du convertisseur sont indicatifs et doivent toujours être vérifiés pendant la cuisson.",
    privacy: "Confidentialité", cookies: "Cookies",
  },
};

export const seoPhrases = {
  it: { pro: "Proteine", fast: "Pronto in", light: "Solo", kcal: "Kcal", read: "Ricetta testata. Leggi la guida per la cottura perfetta.", searchBack: 'Torna alla ricerca' },
  en: { pro: "Protein", fast: "Ready in", light: "Only", kcal: "Kcal", read: "Tested recipe. Read the guide for perfect cooking.", searchBack: 'Back to search' },
  es: { pro: "Proteínas", fast: "Listo en", light: "Solo", kcal: "Kcal", read: "Receta probada. Lee la guía para una cocción perfecta.", searchBack: 'Volver a buscar' },
  fr: { pro: "Protéines", fast: "Prêt en", light: "Seulement", kcal: "Kcal", read: "Recette testée. Lisez le guide pour une cuisson parfaite.", searchBack: 'Retour à la recherche' }
};

export type ValidLocale = "it" | "en" | "es" | "fr";

export function getLang(lang: unknown): ValidLocale {
  if (typeof lang === 'string' && (lang === 'en' || lang === 'es' || lang === 'fr')) {
    return lang;
  }
  return 'it';
}

export function useTranslations(lang: unknown) {
  const safeLang = getLang(lang);
  return {
    title: defaultTitles[safeLang],
    description: defaultDescriptions[safeLang],
    locale: locales[safeLang],
    nav: navLabels[safeLang],
    route: routeMap[safeLang],
    seo: seoPhrases[safeLang]
  };
}
