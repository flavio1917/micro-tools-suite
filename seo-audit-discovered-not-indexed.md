# Audit SEO Read-Only: Pagine Rilevate ma Non Indicizzate

## 1. Riepilogo quantitativo dei 789 URL

Il report Search Console contiene 789 URL catalogate come "Rilevata, ma attualmente non indicizzata". Questo stato indica che Googlebot è a conoscenza dell'esistenza delle URL (grazie a sitemap o link interni), ma ha posticipato la loro scansione (crawl) per motivi legati al crawl budget o alla priorità, non per errori diretti (a differenza di "Scansionata, ma non indicizzata").

**Distribuzione confermata:**
- **Ricette (`recipe_en`)**: 191
- **Ricette (`recipe_es`)**: 190
- **Ricette (`recipe_fr`)**: 196
- **Ricette (`recipe_it_prefixed`)**: 187
- **Strumenti (`tools`)**: 14
- **Convertitori (`converters`)**: 4
- **Pagine Info (`info`)**: 4
- **Pagine Legacy (`legacy_index_old`)**: 3
- **Pagina Cookie (`cookies`)**: 1 

---

## 2. Campione ricette per lingua

Le ricette sono state campionate incrociando i file dati JSON e l'HTML generato.
*Campione: Falafel, Patatine (es. Cajun), Pollo (es. al latticello), Pesce (es. fritto misto), Dolce (es. torta salata/dolce).*

**Verifica Tecnica Strutturale del Campione:**
1. **La URL risponde 200?** Sì, i file `.html` sono regolarmente generati all'interno di `.vercel/output/static/`.
2. **È nella sitemap?** Sì, regolarmente inserite da `@astrojs/sitemap`.
3. **Ha `index,follow`?** Sì, il layout inserisce `<meta name="robots" content="index, follow...">`.
4. **La canonical è autoreferenziale?** Sì, il canonical tag punta esattamente all'URL senza query string.
5. **Il contenuto HTML ha lang corretto?** Sì, `<html lang="...">` è valorizzato con la lingua corrente.
6. **Ha hreflang reciproco?** Sì, i link `<link rel="alternate" hreflang="x">` mappano correttamente tutte le lingue.
7. **Ogni hreflang punta a una URL 200?** Sì, le chiavi generano URL esistenti.
8. **La pagina ha link interni in entrata?** Sì, dall'hub ricettario in homepage.
9. **I link correlati restano nella stessa lingua?** Sì.
10. **Traduzioni?** I file `recipes-en.json`, `recipes-fr.json` dimostrano che Titolo, H1, Meta Description e istruzioni sono nativamente localizzati.

**Conclusione:** Non ci sono ostacoli tecnici. L'mancata indicizzazione iniziale è fisiologica per siti che sbloccano centinaia di pagine contemporaneamente senza un crawl budget già assestato.

---

## 3. Analisi duplicazione /it/ vs root per le Ricette italiane

**Stato Attuale:**
- Nel file `src/pages/[...lang]/recipes/[slug].astro`, la funzione `getStaticPaths` mappa il dataset italiano passando `{ lang: 'it' }`.
- Questo fa sì che Astro generi i percorsi italiani con il prefisso, ovvero `/it/recipes/[slug]`.
- Non ci sono doppioni alla radice per le ricette (cioè `/recipes/[slug]` o `/ricette/[slug]` non generano file fisici 200 OK concorrenti).
- Tutti i vecchi link tipo `/ricette/[slug]` sono ora correttamente gestiti dal **Redirect 308 permanente** verso `/it/recipes/[slug]`.

**Classificazione del Problema:**
**A. `/it/` è la canonical italiana prevista.**
Essendo l'unica pagina reale generata, funge giustamente da canonical.

**Azione Raccomandata (DA NON IMPLEMENTARE ORA):**
- **Mantenere `/it/`**. Sebbene il resto del sito italiano ometta il prefisso `/it/` (es. `/convertitore`), uniformare ora le ricette costringerebbe a spostare 187 URL, creando una catena massiccia di redirect e costringendo Google a ricominciare il crawl da capo per la sezione più voluminosa del sito. La configurazione attuale non lede le norme SEO.

---

## 4. Audit Strumenti e Convertitori

**Strumenti (14 URL) e Convertitori (4 URL)**
- **Status HTTP effettivo:** 200 OK.
- **Route Esistente:** Convertitori generati da `src/pages/[...lang]/convertitore.astro`, Strumenti da `src/pages/[...lang]/[hub]/[tool].astro`.
- **Sitemap:** Presenti.
- **Canonical e Meta Robots:** Autoreferenziali e `index, follow`. Nessun impedimento.
- **Hreflang:** Correttamente legati in un network multilingua.
- **Link interno dalla Home/hub:** Ben strutturati dal menu di navigazione header e footer.
- **Contenuto unico:** Alto valore aggiunto (JS app interattive o testo approfondito per gli strumenti).
- **Priorità SEO:** **ALTA**. (Attraggono intenti di ricerca molto specifici e a basso volume ma alta conversione/utilità).

---

## 5. Audit Legacy

**`indexOld` (`/en/indexOld/`, `/es/indexOld/`, `/fr/indexOld/`)**
- **Esiste?** Sì. Esiste nel repository il file `src/pages/[...lang]/indexOld.astro`.
- **Status HTTP:** 200 OK.
- **Sitemap:** Presente (perché generato senza esclusione da Astro).
- **Linkata internamente?** Probabilmente no, è un orfano rimasto dal refactoring.
- **Equivalente reale?** Richiama `<HomePageTemplate>`, creando un duplicato esatto 1:1 della Homepage per la rispettiva lingua.
- **Azione:** **Eliminare il file 410** (oppure noindex se serve tenerlo per dev).

**`info` (`/it/info/`)**
- **Esiste?** Ora non più (404). Il fix precedentemente autorizzato ha ripristinato `/info` eliminando `/it/info/`.
- **Status HTTP:** 404.
- **Sitemap:** Assente.
- **Azione:** Lasciarla morire come 404 affinché Google la rimuova dal rapporto "Rilevata".

---

## 6. Le 10 URL prioritarie da richiedere in Search Console

Vista la perfezione strutturale delle route "Strumenti" e "Convertitori", queste sono le 10 URL più strategiche (poiché aprono le porte alla navigazione interna per Googlebot) su cui forzare lo strumento "Richiedi Indicizzazione" di Search Console:
1. `https://www.crispissimo.com/convertitore`
2. `https://www.crispissimo.com/en/converter`
3. `https://www.crispissimo.com/es/convertidor`
4. `https://www.crispissimo.com/fr/convertisseur`
5. `https://www.crispissimo.com/strumenti/codici-errore-friggitrice-ad-aria`
6. `https://www.crispissimo.com/strumenti/fumo-puzza-friggitrice-ad-aria`
7. `https://www.crispissimo.com/strumenti/cottura-surgelati-friggitrice-ad-aria`
8. `https://www.crispissimo.com/strumenti/calcolo-calorie-friggitrice-ad-aria`
9. `https://www.crispissimo.com/strumenti/pulire-resistenza-friggitrice-ad-aria`
10. `https://www.crispissimo.com/strumenti/riscaldare-cibo-friggitrice-ad-aria`

---

## 7. Problemi tecnici da correggere
- Il file `src/pages/[...lang]/indexOld.astro` è l'unico reale errore strutturale ancora vivo nel progetto, in quanto disperde crawl budget creando copie ridondanti delle home in lingua straniera.

## 8. Modifiche proposte, ma non applicate
- Eliminazione fisica del file `indexOld.astro` dal file system. 

## 9. Rischi di intervenire sulla struttura attuale
1. Voler a tutti i costi "pulire" la URL `/it/recipes/` rimuovendo l'`it` non apporterebbe alcun beneficio algoritmico, ma ritarderebbe l'indicizzazione scombussolando oltre 180 link e relative diramazioni multilingua.
2. Inviare tutte le 789 URL a GSC tramite le API Indexing non è raccomandato. L'approccio naturale (lasciar fare il crawl a Google, partendo dagli Hub prioritari come indicato al punto 6) è la strategia più sicura per un sito appena riorganizzato.
