# Audit SEO Read-Only: Trailing Slash & Internal Linking

## 1. Trailing slash — audit puntuale aggiuntivo

Questa tabella esamina puntualmente le 4 URL del campione GSC (scansionate e non indicizzate) che terminano con lo slash finale. Poiché non è attivo un redirect globale, il server Astro/Vercel risponde "200 OK" a entrambe le varianti (servendo il file `index.html` contenuto nella directory). 

| URL con slash (GSC) | URL canonica senza slash | Status HTTP con slash | Status HTTP senza slash | Canonical Dichiarata | Sitemap per slash? | Sitemap per non-slash? | Link interni verso quale variante? |
|---|---|---|---|---|---|---|---|
| `/fr/outils/calcul-calories-friteuse-air/` | `/fr/outils/calcul-calories-friteuse-air` | 200 OK | 200 OK | Senza slash | No | Sì | Senza slash |
| `/fr/outils/materiaux-friteuse-air/` | `/fr/outils/materiaux-friteuse-air` | 200 OK | 200 OK | Senza slash | No | Sì | Senza slash |
| `/fr/outils/rechauffer-aliments-friteuse-air/` | `/fr/outils/rechauffer-aliments-friteuse-air` | 200 OK | 200 OK | Senza slash | No | Sì | Senza slash |
| `/es/recipes/bacon-wrapped-stuffed-jalapenos/` | `/es/recipes/bacon-wrapped-stuffed-jalapenos` | 200 OK | 200 OK | Senza slash | No | Sì | Senza slash |

**Diagnosi del problema**: 
Google ha scansionato la versione con trailing slash (forse a causa di un link esterno errato o un precedente internal link sporco) e ha letto il tag `<link rel="canonical" href="...senza-slash">`. Avendo ricevuto l'istruzione di canonizzare l'altra versione, ha escluso giustamente la versione con slash dall'indice ("Scansionata, ma non indicizzata"). La versione canonica (senza slash) seguirà il suo normale corso di indicizzazione a parte. Un redirect 301/308 puntuale eviterebbe a Googlebot di sprecare risorse su queste 4 URL specifiche.

---

## 2. Internal linking FR — proposta read-only

Le ricette francesi del campione (es. `chapeaux-de-champignons...`, `mini-pastiera...`, `blancs-de-poulet...`) faticano a indicizzarsi perché mancano di un'impalcatura profonda di link (Deep Linking).

**Asset Attuali (Identificazione):**
- **Home FR (`/fr/`)**: È l'unico hub in cui sono linkate le ricette. Usa il componente `HomePageTemplate.astro` che renderizza la barra di ricerca e la griglia.
- **Hub Ricette FR**: Non esiste una pagina dedicata separata (es. `/fr/recettes/`); tutto è gestito dall'ancora `/#ricettario` in Home.
- **Categorie FR**: Gestite tramite i filtri JavaScript in Home (UI), che Googlebot fa più fatica a seguire rispetto a URL fisiche.
- **Componente Ricette Correlate**: **Assente**. Il template `src/pages/[...lang]/recipes/[slug].astro` finisce il contenuto principale senza suggerire altre ricette, trasformando ogni ricetta in un ramo cieco per il crawler.
- **Pagine tag/ingrediente**: Assenti.

### Tabella Suggerimenti di Linking

| Ricetta FR (Campione) | URL | Link interni attuali | Pagine da cui dovrebbe ricevere link | Componente coinvolto | Suggerimento di collegamento | Rischio |
|---|---|---|---|---|---|---|
| Chapeaux de champignons | `/fr/recipes/chapeaux...` | Solo Home (JS Grid) | Altre ricette (es. contorni/antipasti) | `[slug].astro` | Creare un carosello "Recettes Similaires" a fine pagina | Nullo (solo UI) |
| Mini pastiera napoletana | `/fr/recipes/mini-pastiera...` | Solo Home (JS Grid) | Altre ricette di dolci / FAQ dolci | `[slug].astro` | Creare un blocco di correlati per la stessa categoria | Nullo |
| Blancs de poulet simples | `/fr/recipes/blancs-de-poulet...`| Solo Home (JS Grid) | Ricette a base di pollo (es. nuggets) | `[slug].astro` | Inserire un `<RelatedRecipes />` che pesca dal JSON | Nullo |
| Tutte le altre 21 ricette FR | `/fr/recipes/...` | Solo Home (JS Grid) | Sottopagine o network a ragnatela | Menu Footer o Sidebar | Aggiungere "Top 5 Recettes" nel Footer globale | Basso |

**Proposta tecnica minima (NON implementata)**:
Per sbloccare l'indicizzazione, il metodo meno invasivo e più efficace è creare un micro-componente `<RelatedRecipes />` da inserire in fondo a `src/pages/[...lang]/recipes/[slug].astro`. Questo componente pescherebbe 3-4 URL casuali (o della stessa categoria) dal JSON della stessa lingua, costruendo istantaneamente migliaia di link interni (una rete a maglie) senza alterare le route esistenti, robots o sitemap.

---

## 3. Nessuna modifica per pagine sane

Confermo che queste 3 URL non presentano alcun errore strutturale, canonico o di linking. Rispondono 200, sono in sitemap, hanno Hreflang perfetto e link diretti dalla Home.

- `/en/tools/reheat-food-air-fryer`
- `/fr/outils/materiaux-friteuse-air`
- `/es/info`

**Azione**: Sono pronte per essere inviate allo strumento "Richiedi Indicizzazione" di Search Console senza toccare il codice. Non richiederanno interventi ingegneristici.
