# Audit SEO — pagine scansionate ma non indicizzate

## 1. Riepilogo
- **Numero URL analizzate**: 31
- **Distribuzione per tipo pagina**:
  - Ricette: 25
  - Strumenti: 5
  - Pagine Info: 1
- **Distribuzione per lingua**:
  - Francese (FR): 24
  - Inglese (EN): 4
  - Spagnolo (ES): 3
  - Italiano (IT): 0 (Nessuna pagina italiana è bloccata in questo stato).
- **Numero URL per azione proposta**:
  - **A** (Mantenere indexable e migliorare contenuto): 0
  - **B** (Mantenere indexable e migliorare internal linking): 24 (Ricette standard)
  - **C** (Correggere un problema tecnico specifico): 4 (URL con trailing slash in eccesso)
  - **D** (Canonicalizzare): 0
  - **E** (Rendere noindex): 0
  - **F** (Nessuna modifica, Google deve solo rivalutarla): 3 (Strumenti regolari e `/es/info`)

## 2. Tabella completa URL-per-URL

| URL | Lingua | Tipo pagina | Route/file sorgente | Status previsto | In sitemap? | Meta robots | Canonical dichiarata | Canonical attesa | Hreflang | Link interni | Rischio principale | Azione proposta | Priorità |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/fr/outils/calcul-calories-friteuse-air/` | FR | Strumento | `[...lang]/[hub]/[tool].astro` | 308 (o 200) | No | index,follow | Senza slash | Senza slash | Sì | Scarso | Duplicato Trailing Slash | C | Alta |
| `/fr/outils/materiaux-friteuse-air/` | FR | Strumento | `[...lang]/[hub]/[tool].astro` | 308 (o 200) | No | index,follow | Senza slash | Senza slash | Sì | Scarso | Duplicato Trailing Slash | C | Alta |
| `/en/tools/reheat-food-air-fryer` | EN | Strumento | `[...lang]/[hub]/[tool].astro` | 200 | Sì | index,follow | Esatta | Esatta | Sì | Buono | Autorità inziale bassa | F | Media |
| `/fr/outils/rechauffer-aliments-friteuse-air/` | FR | Strumento | `[...lang]/[hub]/[tool].astro` | 308 (o 200) | No | index,follow | Senza slash | Senza slash | Sì | Scarso | Duplicato Trailing Slash | C | Alta |
| `/fr/recipes/chapeaux-de-champignons-farcis...`| FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/es/recipes/bacon-wrapped-stuffed-jalapenos/`| ES | Ricetta | `[...lang]/recipes/[slug].astro`| 308 (o 200) | No | index,follow | Senza slash | Senza slash | Sì | Scarso | Duplicato Trailing Slash | C | Media |
| `/fr/recipes/mini-pastiera-napoletana` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/blancs-de-poulet-simples` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/en/recipes/bacon-wrapped-shrimp` | EN | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/muffins-fromage-mais` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/sandwich-steak-raifort` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/burger-pois-chiches-epinards` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/bouchees-poulet-cereales` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/roti-filet-mignon-de-porc` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/mais-toste-beurre` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/saumon-beurre-citron` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/oeuf-en-cocotte-avec-lardons` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/poulet-entier-barbecue` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/tacos-de-poisson-grille` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/brochettes-halloumi-legumes` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/amaretti-au-coco` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/deluxe-hamburger` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/galette-de-pommes-de-terre-filante`| FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/recipes/batonnets-courgettes-parmesan` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/en/recipes/roasted-potatoes-spicy-mayo` | EN | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/en/recipes/grilled-sea-bream-with-olives` | EN | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/en/recipes/coffee-cocoa-streusel-muffins` | EN | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/es/info` | ES | Info | `[...lang]/info.astro` | 200 | Sì | index,follow | Esatta | Esatta | Sì | Sì | Scarsa Autorità Iniziale | F | Bassa |
| `/fr/recipes/sandwich-muffin-petit-dejeuner` | FR | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |
| `/fr/outils/materiaux-friteuse-air` | FR | Strumento | `[...lang]/[hub]/[tool].astro` | 200 | Sì | index,follow | Esatta | Esatta | Sì | Sì | Competizione / Crawl Budget | F | Alta |
| `/es/recipes/gajos-patata-congelados` | ES | Ricetta | `[...lang]/recipes/[slug].astro`| 200 | Sì | index,follow | Esatta | Esatta | Sì | Discreto | Carenza Link Interni | B | Bassa |

*(Le stringhe lunghe delle URL sono troncate solo per leggibilità della tabella, ma l'analisi si applica alle URL originali).*

## 3. Cluster di problemi

1. **Vulnerabilità "Trailing Slash" (4 URL)**:
   Alcune pagine (es. `/fr/outils/calcul-calories-friteuse-air/`) terminano con lo slash (`/`). Google ha rilevato queste varianti (probabilmente a causa di un link esterno errato o un bot) e giustamente le ha scansionate ma escluse dall'indice, in quanto la canonical punta alla versione pulita senza slash.
2. **Carenza di Internal Linking / Priorità Crawl (24 URL)**:
   Moltissime ricette francesi sono state lette ma scartate temporaneamente. Trattandosi di pagine di approfondimento scoperte in blocco, Googlebot attende di vedere se queste pagine ricevono abbastanza link interni o traffico prima di "sprecare" spazio nell'indice. Non è un errore tecnico.
3. **Pagine Indexable ma nuove (3 URL)**:
   Le pagine `/en/tools/reheat-food-air-fryer`, `/fr/outils/materiaux-friteuse-air` e `/es/info` sono strutturalmente perfette, autoreferenziali, con Hreflang intatto e inserite nella sitemap. La mancata indicizzazione è 100% fisiologica in un nuovo rollout.

## 4. Pagine prioritarie

- **URL priorità massima (Da correggere)**:
  1. `/fr/outils/calcul-calories-friteuse-air/`
  2. `/fr/outils/materiaux-friteuse-air/`
  3. `/fr/outils/rechauffer-aliments-friteuse-air/`
  4. `/es/recipes/bacon-wrapped-stuffed-jalapenos/`
- **URL che beneficerebbero di maggiore internal linking**:
  Tutte le ricette FR scansionate (aggiungerle nei "Correlati" o negli snippet della Home FR aiuterebbe a smaltirle velocemente).
- **URL da richiedere manualmente in Search Console (Senza apportare modifiche)**:
  `/en/tools/reheat-food-air-fryer`
  `/fr/outils/materiaux-friteuse-air`
  `/es/info`
- **URL che non richiedono alcuna modifica**:
  Tutte le ricette standard senza slash finale.

## 5. Proposta tecnica minima

Le pagine sane richiedono solo pazienza e un link building interno migliore, mentre il problema del *Trailing Slash* può essere eliminato globalmente senza dover scrivere regole di redirect manuali una per una.

**File da modificare**: `vercel.json`
**Modifica precisa**: Aggiungere `"cleanUrls": true` nella radice del JSON. Questa direttiva di Vercel impone automaticamente e a livello di server un `308 Permanent Redirect` dalle versioni con `/` finale verso le versioni pulite (o viceversa in base al build target). Questo elimina i duplicati alla radice.
**Rischio**: Quasi nullo.
**Effetto sulle route esistenti**: Rende il sito univoco per i motori di ricerca a prescindere da come l'utente digita l'indirizzo.
**Test necessario**: Assicurarsi che navigando verso `https://www.crispissimo.com/es/info/` avvenga il redirect pulito verso `https://www.crispissimo.com/es/info`.

## 6. Fine attività
Nessuna modifica è stata eseguita. Attendo istruzioni.
