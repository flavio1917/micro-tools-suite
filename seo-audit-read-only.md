# Audit SEO Read-Only: Analisi e Piano di Azione

## 1. Stato della struttura attuale

L'applicazione è sviluppata con Astro ed esportata in modalità `static` su Vercel. Il sistema di routing è multilingua (Italiano, Inglese, Spagnolo, Francese) e utilizza le route dinamiche `[...lang]` e `[lang]`. La lingua principale (Italiano) viene servita senza il prefisso lingua (es. `/strumenti/...`), mentre le altre lingue utilizzano il prefisso corretto (es. `/en/tools/...`).

## 2. Inventario route correnti

- **Italiano (default)**
  - Home: `/`
  - Strumenti SEO: `/strumenti/[nome-strumento]` (es. `/strumenti/materiali-friggitrice-ad-aria`)
  - Ricette: `/recipes/[slug]`
  - Pagine fisse: `/convertitore`, `/privacy`, `/cookies`, `/info`
- **Inglese**
  - Home: `/en/`
  - Strumenti SEO: `/en/tools/[nome-strumento]` (es. `/en/tools/air-fryer-materials-guide`)
  - Ricette: `/en/recipes/[slug]`
  - Pagine fisse: `/en/converter`
- **Spagnolo**
  - Home: `/es/`
  - Strumenti SEO: `/es/herramientas/[nome-strumento]`
  - Ricette: `/es/recipes/[slug]`
  - Pagine fisse: `/es/convertidor`
- **Francese**
  - Home: `/fr/`
  - Strumenti SEO: `/fr/outils/[nome-strumento]`
  - Ricette: `/fr/recipes/[slug]`
  - Pagine fisse: `/fr/convertisseur`

Tutte le pagine sono generate staticamente (indexable), eccetto specifiche varianti dei tool SEO o specifici modelli della friggitrice ad aria che sono stati esplicitamente impostati in `noindex` tramite le configurazioni di build (es. in `astro.config.mjs`).

## 3. Tabella completa delle 30 URL 404

| Vecchio URL | Lingua | Tema | Esiste link interno? | Esiste sitemap? | Esiste una destinazione attuale equivalente? | Destinazione proposta | Azione proposta | Rischio | Note |
|---|---|---|---|---|---|---|---|---|---|
| `/es/problemas` | ES | Problemi | No | No | Sì | `/es/herramientas/humo-olor-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/es/calorias` | ES | Calorie | No | No | Sì | `/es/herramientas/calculo-calorias-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/consommation` | FR | Consumi | No | No | Sì | `/fr/outils/consommation-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/calories` | EN | Calorie | No | No | Sì | `/en/tools/air-fryer-calorie-calculator` | Redirect 301 | Basso | Rinominato per SEO |
| `/es/errores` | ES | Errori | No | No | Sì | `/es/herramientas/codigos-error-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/problems` | EN | Problemi | No | No | Sì | `/en/tools/air-fryer-smoke-smell` | Redirect 301 | Basso | Rinominato per SEO |
| `/es/congelados` | ES | Surgelati | No | No | Sì | `/es/herramientas/cocinar-congelados-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/problemes` | FR | Problemi | No | No | Sì | `/fr/outils/fumee-odeur-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/surgelati` | IT | Surgelati | No | No | Sì | `/strumenti/cottura-surgelati-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/frozen` | EN | Surgelati | No | No | Sì | `/en/tools/cook-frozen-food-air-fryer` | Redirect 301 | Basso | Rinominato per SEO |
| `/es/recalentar` | ES | Riscaldare | No | No | Sì | `/es/herramientas/recalentar-comida-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/surgeles` | FR | Surgelati | No | No | Sì | `/fr/outils/cuisson-surgeles-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/cleaning` | EN | Pulizia | No | No | Sì | `/en/tools/clean-air-fryer-heating-element` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/nettoyage` | FR | Pulizia | No | No | Sì | `/fr/outils/nettoyer-resistance-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/materials` | EN | Materiali | No | No | Sì | `/en/tools/air-fryer-materials-guide` | Redirect 301 | Basso | Rinominato per SEO |
| `/es/limpieza` | ES | Pulizia | No | No | Sì | `/es/herramientas/limpiar-resistencia-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/errors` | EN | Errori | No | No | Sì | `/en/tools/air-fryer-error-codes` | Redirect 301 | Basso | Rinominato per SEO |
| `/consumi` | IT | Consumi | No | No | Sì | `/strumenti/consumi-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |
| `/en/reheating` | EN | Riscaldare | No | No | Sì | `/en/tools/reheat-food-air-fryer` | Redirect 301 | Basso | Rinominato per SEO |
| `/calorie` | IT | Calorie | No | No | Sì | `/strumenti/calcolo-calorie-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |
| `/es/consumo` | ES | Consumi | No | No | Sì | `/es/herramientas/consumo-freidora-aire` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/calories` | FR | Calorie | No | No | Sì | `/fr/outils/calcul-calories-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/materiaux` | FR | Materiali | No | No | Sì | `/fr/outils/materiaux-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/rechauffer` | FR | Riscaldare | No | No | Sì | `/fr/outils/rechauffer-aliments-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/materiali` | IT | Materiali | No | No | Sì | `/strumenti/materiali-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |
| `/fr/erreurs` | FR | Errori | No | No | Sì | `/fr/outils/codes-erreur-friteuse-air` | Redirect 301 | Basso | Rinominato per SEO |
| `/riscaldare` | IT | Riscaldare | No | No | Sì | `/strumenti/riscaldare-cibo-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |
| `/info` | IT | Info | Sì | Sì | Sì | N/A (La pagina `/info` esiste ancora nel routing Astro!) | Nessuna azione / Verificare manuale | Basso | Possibile falso positivo o problema di build. |
| `/pulizia` | IT | Pulizia | No | No | Sì | `/strumenti/pulire-resistenza-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |
| `/problemi` | IT | Problemi | No | No | Sì | `/strumenti/fumo-puzza-friggitrice-ad-aria` | Redirect 301 | Basso | Rinominato per SEO |

## 4. Proposte redirect, senza implementazione

Tutte le URL (eccetto `/info` che sembra esistere e necessita di analisi manuale) appartengono alla categoria **A. Redirect permanente consigliato**. È raccomandato configurare dei **Redirect 301** (permanenti) mappando esattamente la rotta obsoleta verso la rispettiva nuova rotta del cluster SEO.

## 5. URL da lasciare 404/410

Non ci sono URL obsolete da lasciare scoperte/404. Tutti i 29 URL problematici (escludendo info) corrispondono a contenuti che sono stati semplicemente migrati con nomi e strutture di cartelle più descrittive (es. `/[hub]/[tool]`).

## 6. URL da verificare manualmente

- **`/info`**: La pagina si trova nel codice e genera una route. E' necessario indagare se Google Search Console si riferisce a un momento in cui la build è andata in errore o se eventuali configurazioni lato middleware la oscurino accidentalmente in specifiche circostanze.

## 7. Audit sitemap

La sitemap generata da `@astrojs/sitemap` (`.vercel/output/static/sitemap-0.xml`):
- Include correttamente tutte le nuove URL per gli strumenti (es. `/strumenti/codici-errore-friggitrice-ad-aria`).
- Include correttamente le ricette.
- **NON** include le URL 404, segno che la build statica le ha escluse automaticamente in quanto i percorsi vecchi non vengono più creati.
- Non contiene URL di preview Vercel (base `site` corretta).
- **Da rimuovere dalla sitemap**: Nessuna. Le 404 non ci sono già.
- **Da aggiungere alla sitemap**: Nessuna.

## 8. Audit canonical/hreflang

- I tag hreflang puntano correttamente alle route attive in seguito all'ultima revisione e i canonici rispettano l'URL assoluto corretto. 
- **URL con canonical sospetto**: Nessuno.
- **URL con hreflang sospetto**: Nessuno.

## 9. Rischi identificati

L'unico rischio reale per la SEO è la **dispersione di PageRank** (link juice) derivante da vecchi backlink o dalle SERP già consolidate di Google sulle vecchie rotte (es. `/materiali` o `/es/problemas`). Se Googlebot incontra ripetutamente questi 404, nel tempo le rimuoverà dall'indice senza trasferire il "valore" SEO acquisito alle nuove pagine equivalenti, causando perdita di traffico.

## 10. Piano in tre fasi (DA APPROVARE):

- **Fase 1: Correzioni tecniche minime**
  Configurare i redirect 301 per le 29 URL modificate all'interno di `vercel.json` o nel config di Astro, mappando esattamente dal vecchio path al nuovo path ottimizzato, e prevendendo eventuali redirect a catena.
- **Fase 2: Pulizia sitemap**
  Non sono necessari interventi diretti: la sitemap generata esclude già correttamente i 404.
- **Fase 3: Miglioramento pagine indicizzabili**
  Gestire le query string (es. `?brand=`, `?model=`, `?spec=`, `?view=symptoms`): verificare che l'interfaccia utente (UI) per la selezione di questi filtri utilizzi aggiornamenti asincroni (es. `history.replaceState` senza reload completi o links indexable classici) e bloccare queste parametrizzazioni inutili nel `robots.txt` (`Disallow: /*?brand=*`) per evitare spreco di crawl budget da parte di Google, mantenendo i modelli veri generati a livello statico (ssg) sicuri e scansionabili.
