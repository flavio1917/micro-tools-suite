# Piano di Mappatura Locale per PT e ZH (Wave 2)

Per l'estensione internazionale di Crispissimo.com a Portoghese e Cinese, è fondamentale definire la strategia di mercato per evitare problemi di SEO e frammentazione dell'audience.

## 1. Portoghese (PT)
**Contesto:** Il portoghese si divide principalmente in Portoghese Europeo (Portogallo, ~10M) e Portoghese Brasiliano (Brasile, ~215M). Il Brasile rappresenta un mercato enorme per le "Air Fryer" (spesso chiamate anche "Fritadeira elétrica" o "Fritadeira sem óleo").
*   **URL Prefix:** `/pt/` (Non `/pt-br/`, per mantenere la URL corta e catturare tutto il traffico lusofono).
*   **Hreflang:** `pt` (Target globale per la lingua portoghese).
*   **HTML Lang:** `pt` oppure `pt-BR`.
*   **Scrittura:** Utilizzare il vocabolario del **Portoghese Brasiliano** (essendo il mercato predominante), mantenendo un tono sufficientemente neutro per essere compreso anche in Portogallo.

## 2. Cinese (ZH)
**Contesto:** Il mercato di lingua cinese su Google è particolare perché Google è bloccato nella Cina continentale (dove si usa il Cinese Semplificato, `zh-Hans`). Il traffico SEO Google in lingua cinese proviene principalmente da:
1.  **Taiwan e Hong Kong** (Cinese Tradizionale, `zh-Hant` o `zh-TW` / `zh-HK`).
2.  **Diaspora asiatica** (Nord America, Europa, Sud-Est Asiatico) che cerca in entrambe le varianti.
Il termine per friggitrice ad aria a Taiwan è **氣炸鍋** (Qì zhà guō). Taiwan è un mercato con un'alta adozione di piccoli elettrodomestici.
*   **URL Prefix:** `/zh/` (Per mantenere consistenza con i prefissi a due lettere).
*   **Hreflang:** `zh-Hant` (Oppure `zh-TW` se si vuole targettizzare esplicitamente Taiwan). Per la massima copertura, si può usare `zh-Hant` come hreflang per indicare il Cinese Tradizionale.
*   **Scrittura:** **Cinese Tradizionale**. È il formato più indicato per il traffico organico su Google proveniente da Taiwan e Hong Kong.

## Raccomandazioni Tecniche per la Wave 2
1.  In `src/i18n/ui.ts`, aggiornare il tipo `ValidLocale` per includere `'pt'` e `'zh'`.
2.  Nei file di dizionario (es. `ui.ts`, `hub.ts`, `recipe.ts`), aggiungere le chiavi `pt` e `zh`.
3.  Nei file di routing dinamico come `[hub]/[tool].astro` e `[routeSlug].astro`, aggiungere le traduzioni degli URL per `pt` e `zh` (es. `/pt/ferramentas/` e `/zh/tools/`).
4.  Le traduzioni cinesi dovranno prestare particolare attenzione ai font: assicurarsi che i font scelti (Montserrat/Raleway) abbiano un buon fallback per i caratteri CJK (es. `Noto Sans TC`), altrimenti la UI potrebbe rompersi o risultare esteticamente non gradevole (un problema comune chiamato "tofu" o variazioni di peso incontrollate).
