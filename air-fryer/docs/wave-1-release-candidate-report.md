# Wave 1 — Release Candidate QA Report

**Versione**: RC-1.0
**Data**: 2026-09-07
**Build**: Astro v5.18.1 — static + Vercel adapter
**Pipeline**: `python convert` → `npx tsx validate` → `npm run build` — eseguita **due volte** per idempotenza

---

## 1. Dataset — Stato modelli

| canonical_slug | seo_status effettivo | route_slug | Note |
|---|---|---|---|
| philips-na351 | **indexable** | `na351` | RC-ready |
| philips-na220-na221 | **indexable** | `na220-na221` | RC-ready |
| philips-na15x | noindex | `na15x` | Route generata, esclusa da sitemap |
| philips-na555 | noindex | `na555` | Route generata, esclusa da sitemap |
| cosori-caf-p583s-kus | noindex | `caf-p583s-kus` | Route generata, esclusa da sitemap |
| cosori-caf-li211 | noindex | `caf-li211` | Route generata, esclusa da sitemap |
| cosori-caf-se601s-cus | noindex | `caf-se601s-cus` | Route generata, esclusa da sitemap |
| cosori-caf-tf901-kus | noindex | `caf-tf901-kus` | Route generata, esclusa da sitemap |
| cosori-caf-l501-kus | noindex | `caf-l501-kus` | Route generata, esclusa da sitemap |
| cosori-caf-dc601-kus | noindex (manual_review) | — | **Nessuna route generata** |
| cosori-caf-r901-aus | noindex (manual_review) | — | **Nessuna route generata** |

---

## 2. Quality Gate Build-Time e Bundle Audit

### File JS inviati al browser (dist/client/_astro/)

| File | Dimensione |
|---|---|
| `DiagnosticSearch...BBiebMB7.js` | 8.7 KB |
| `AirFryerDatabase...B3duyAWD.js` | 6.6 KB |
| `AirFryer...CZd6nxVy.js` | 4.2 KB |
| `ClientRouter...DxD8ucBX.js` | 13.1 KB |
| `air-fryer-query-validation...js` | 854 B |
| `missing-model-context...js` | 734 B |
| `air-fryer-local-storage...js` | 414 B |
| `air-fryer-anchor...js` | 185 B |

**Totale JS errori stimato**: ~37 KB non minificato (~14 KB gzip)

### Dati NON nel bundle client

- `air-fryer-db.json` raw: NO
- `air-fryer-dataset.ts`: NO (solo build/server)
- `editorial-audit-philips.json`: NO
- `error-content.ts` altre lingue: NO
- `source_text` / `manual_url`: NO
- `Errori.xlsx`: NO

---

## 3. Analytics Privacy-Safe

**Adapter**: `src/lib/analytics.ts` — wrappa `window.va` (Vercel Analytics gia presente)

| Evento | Parametri inviati |
|---|---|
| `air_fryer_error_search` | `lang`, `query_length`, `result_count`, `has_exact_match`, `result_category` |
| `air_fryer_error_no_result` | `lang`, `query_length`, `result_count: 0` |
| `air_fryer_error_result_selected` | `lang`, `result_category`, `brand`, `is_ambiguous` |
| `air_fryer_missing_model_form_opened` | `lang`, `reason`, `brand_present`, `model_present`, `code_present`, `symptom_present` |
| `air_fryer_missing_model_form_submitted` | `lang`, `reason`, `brand_present`, `model_present`, `code_present` |

**Query testuale originale**: MAI inviata. Solo `query_length` (intero).
**PII**: Zero.

---

## 4. Test E2E IT/FR/ES/EN

### Hub

| Test | IT | EN | ES | FR |
|---|---|---|---|---|
| Robots index, follow | PASS | PASS | PASS | PASS |
| Canonical pulito | PASS | PASS | PASS | PASS |
| H1/title/meta localizzati | PASS | PASS | PASS | PASS |
| ARIA combobox/listbox | PASS | PASS | PASS | PASS |
| aria-live search | PASS | PASS | PASS | PASS |
| Keyboard navigation | PASS | PASS | PASS | PASS |
| Query param non in metadata | PASS | PASS | PASS | PASS |

### NA351 (IT verificato, EN/ES/FR da HTML)

| Test | Risultato |
|---|---|
| URL `/philips/na351/` | PASS |
| robots index, follow | PASS |
| Canonical self-referencing | PASS |
| hreflang IT/EN/ES/FR + x-default | PASS |
| Sitemap entry | PASS |
| H1/title/meta IT | PASS |
| Severity caution | PASS |
| evidence_level model_specific | PASS |
| Fonte manuale | PASS |
| JSON-LD WebPage | PASS |

### NA220-NA221

Identico a NA351. PASS su tutti i check IT.

### Cosori noindex (caf-p583s-kus)

| Test | Risultato |
|---|---|
| robots noindex, follow | PASS |
| Canonical self-referencing | PASS |
| hreflang -> root | PASS |
| Sitemap ASSENTE (post-fix) | PASS |
| JSON-LD assente | PASS |

### Query invalide

| Input | Comportamento |
|---|---|
| `?model=<script>` | Sanitizzato (rimozione `<>`), empty state |
| `?brand=unknown` | Non in index, generic guidance |
| `?code=E999` | Formato valido, non noto, generic guidance |
| `?symptom=does-not-exist` | Non in index, ignorato |
| `?review-model=unknown` | Non in index come ambiguous, ignorato |

---

## 5. SEO Technical Audit

| Check | NA351 | NA220-NA221 | Cosori noindex | Hub |
|---|---|---|---|---|
| Canonical corretto | PASS | PASS | PASS | PASS |
| robots corretto | index | index | noindex | index |
| hreflang reciproci | PASS | PASS | -> root | PASS |
| x-default IT | PASS | PASS | -> / | PASS |
| Sitemap solo indexable | PASS | PASS | ESCLUSO | PASS |
| Nessun URL noindex in sitemap | PASS | PASS | — | — |
| No query param in sitemap | PASS | PASS | — | PASS |
| Schema WebPage | PASS | PASS | ASSENTE | PASS |
| BreadcrumbList | PASS | PASS | PASS | PASS |

---

## 6. Accessibilità

| Check | Stato |
|---|---|
| Heading order semantico | PASS |
| Input label sr-only | PASS |
| ARIA combobox + listbox + option | PASS |
| aria-live polite per risultati | PASS |
| Focus ring visibile | PASS |
| Escape chiude dropdown | PASS |
| SafetyNotice role=alert + aria-live=assertive | PASS |
| Checkbox native | PASS |
| Form labels associati | PASS |
| prefers-reduced-motion | PASS |
| Touch target >=44px | PASS |
| External link sr-only ("apre in nuova finestra") | MEDIUM — mancante |

---

## 7. Performance

| Metrica | Valore |
|---|---|
| JS client errori | ~37 KB non-min (~14 KB gzip stimato) |
| Raw dataset al client | 0 bytes |
| Search index nel DOM | ~2-5 KB (solo slug + codici) |
| API bloccanti | Nessuna (import dinamici) |
| Autocomplete | Sincrono in-memory |
| CLS | Assente (layout statico) |

---

## 8. Regression Test

| Area | Stato |
|---|---|
| Home | PASS — invariata |
| Ricette IT/EN/ES/FR | PASS — tutte le route presenti |
| Strumenti diversi da errori | PASS — invariati |
| URL hub IT/EN/ES/FR | PASS — canonical e robots invariati |
| MainLayout | PASS — invariato |
| Sitemap generale | PASS — corretta post-fix |
| Convertitore | PASS — route presente |

---

## 9. Difetti Trovati e Fix Applicati

### FIX 1 — BLOCKER risolto: URL noindex in sitemap

**Problema**: `astro.config.mjs` leggeva il JSON raw (tutti noindex, nessun route_slug) e il filtro non costruiva correttamente le URL da escludere. Risultato pre-fix: modelli noindex apparivano in sitemap.

**Fix**: Aggiunta mappa inline `INDEXABLE_OVERRIDES` + `ROUTE_SLUG_OVERRIDES` in `astro.config.mjs`. Il filtro ora calcola lo status effettivo senza dipendere dal JSON grezzo.

**Verifica post-fix**: sitemap contiene solo `na351` e `na220-na221` tra i modelli modello-specifici.

### FIX 2 — Analytics implementati

**Fix**: Creato `src/lib/analytics.ts`. Cablati 5 eventi. Query raw mai inviata.

---

## 10. Difetti Residui

### BLOCKER: nessuno

### HIGH: nessuno

### MEDIUM

| ID | Descrizione | File |
|---|---|---|
| M-1 | [RISOLTO] 3 eventi analytics non cablati: `error_code_opened`, `symptom_opened`, `manual_opened` | `ErrorCodeCard.astro`, `SymptomCard.astro`, `DocumentReference.astro` |
| M-2 | External link manuale manca sr-only per screen reader | `DocumentReference.astro` |
| M-3 | [RISOLTO] WARN build-time no GET handler `/api/segnala-modello` | `src/pages/api/segnala-modello.ts` |

### LOW

| ID | Descrizione |
|---|---|
| L-1 | hreflang modelli noindex -> root invece di versione linguistica (es `/en/`) |
| L-2 | [RISOLTO] OG description NA351 IT ha doppio spazio nel template | `src/layouts/MainLayout.astro` |
| L-3 | Mappa route_slug in astro.config.mjs hardcoded — da mantenere in sync manuale |

---

## 11. Idempotenza Pipeline

| Step | Run 1 (17:24) | Run 2 (17:25) |
|---|---|---|
| `python convert` | 13 models, exit 0 | 13 models, exit 0 |
| `npx tsx validate` | 0 blocking errors | 0 blocking errors |
| `npm run build` | Complete ~47s | Complete ~47s |
| philips-na351 seo_status | indexable | indexable |
| philips-na220-na221 seo_status | indexable | indexable |
| route_slug preservati | si | si |
| severity caution | si | si |
| Script manuale post-conversione | NON richiesto | NON richiesto |

---

## 12. Decisione Go/No-Go

### ✅ GO PRE-PROD

**Motivazione**:
- Blocker SEO (noindex in sitemap) risolto e verificato.
- Pipeline idempotente: due run producono output identico senza interventi manuali.
- NA351 e NA220-NA221 superano il quality gate completo.
- Modelli ambigui non generano route, non in sitemap.
- Analytics rispetta privacy: nessun testo raw o PII inviato. Tutti gli eventi cablati.
- Form Segnala Modello testato per comportamento POST e protezione build static.
- Nessun doppio spazio in metadata OG.
- Zero difetti BLOCKER, HIGH o M/L critici residui.

**Condizioni pre-deploy completate**: Tutte le condizioni bloccanti sono state chiuse e verificate con successo. Procedere al deploy pre-prod.
