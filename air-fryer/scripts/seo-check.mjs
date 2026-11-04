#!/usr/bin/env node
// Controllo SEO della build statica (da eseguire dopo `astro build`).
//
// Verifica le regole che proteggono l'indicizzazione:
//  1. ogni URL della sitemap esiste, non è noindex e coincide ESATTAMENTE con il canonical della pagina;
//  2. ogni link interno <a href="/..."> punta a una pagina esistente e al suo URL canonico;
//  3. ogni <img src="/..."> punta a un file esistente;
//  4. ogni hreflang punta a una pagina esistente il cui canonical coincide con l'URL dichiarato;
//  5. nessun dato strutturato Recipe dichiara date (non abbiamo date reali di pubblicazione/revisione).
//
// Uso:  node scripts/seo-check.mjs [cartella-build]   (default: dist/client)
// Esce con codice 1 se trova errori.

import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://www.crispissimo.com';
const root = path.resolve(process.argv[2] || 'dist/client');

if (!fs.existsSync(path.join(root, 'sitemap-index.xml'))) {
  console.error(`seo-check: sitemap-index.xml non trovato in ${root}. Esegui prima la build.`);
  process.exit(1);
}

const errors = new Map(); // categoria -> Set di messaggi
const addError = (category, message) => {
  if (!errors.has(category)) errors.set(category, new Set());
  errors.get(category).add(message);
};
const warnings = new Map(); // avvisi: segnalati ma non bloccano la build
const addWarning = (category, message) => {
  if (!warnings.has(category)) warnings.set(category, new Set());
  warnings.get(category).add(message);
};

// ---- Raccolta pagine HTML ---------------------------------------------------
const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
})(root);

const decode = (p) => { try { return decodeURI(p); } catch { return p; } };

// Percorso URL (decodificato) -> file HTML, se esiste.
function fileForPath(urlPath) {
  const clean = decode(urlPath.split('#')[0].split('?')[0]);
  const candidates = [
    path.join(root, clean, 'index.html'),
    path.join(root, clean.replace(/\/$/, '') + '.html'),
    path.join(root, clean),
  ];
  return candidates.find((c) => c.startsWith(root) && fs.existsSync(c) && fs.statSync(c).isFile()) || null;
}

const pageCache = new Map();
function pageInfo(file) {
  if (pageCache.has(file)) return pageCache.get(file);
  const html = fs.readFileSync(file, 'utf8');
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || null;
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const info = { html, canonical: canonical && decode(canonical), noindex: /noindex/i.test(robots) };
  pageCache.set(file, info);
  return info;
}

const toPath = (url) => decode(url.replace(SITE, ''));

// ---- 1. Sitemap ---------------------------------------------------------------
const sitemapIndex = fs.readFileSync(path.join(root, 'sitemap-index.xml'), 'utf8');
const sitemapUrls = [];
for (const loc of sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const file = path.join(root, new URL(loc[1]).pathname);
  if (!fs.existsSync(file)) { addError('sitemap', `sitemap figlia mancante: ${loc[1]}`); continue; }
  const xml = fs.readFileSync(file, 'utf8');
  if (/<lastmod>|<changefreq>|<priority>/.test(xml)) addError('sitemap', `${loc[1]} contiene lastmod/changefreq/priority non affidabili`);
  for (const u of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.push(u[1]);
}
for (const url of sitemapUrls) {
  const file = fileForPath(new URL(url).pathname);
  if (!file) { addError('sitemap', `URL senza pagina: ${url}`); continue; }
  const info = pageInfo(file);
  if (info.noindex) addError('sitemap', `URL noindex in sitemap: ${url}`);
  if (info.canonical !== decode(url)) addError('sitemap', `URL diverso dal canonical: ${url} -> ${info.canonical}`);
}

// ---- 2-5. Controlli per pagina --------------------------------------------------
const IGNORED_LINK = /^\/(api|_astro|_vercel)\//;
for (const file of htmlFiles) {
  const info = pageInfo(file);
  const from = '/' + path.relative(root, file).replace(/index\.html$/, '');
  // Nota: anche le pagine noindex vengono controllate, perché Google ne segue i link.

  // Link relativi (es. testo copiato al posto di un URL): il browser li risolve
  // rispetto alla pagina corrente e producono URL inesistenti.
  for (const m of info.html.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/g)) {
    const href = m[1].trim();
    if (href && !/^(\/|#|\?|https?:|mailto:|tel:|javascript:)/i.test(href)) {
      addError('link relativi non validi', `"${href.slice(0, 80)}"  (da ${from})`);
    }
  }

  for (const m of info.html.matchAll(/<a\b[^>]*?\bhref="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//') || IGNORED_LINK.test(href)) continue;
    const target = href.split('#')[0].split('?')[0];
    if (!target) continue;
    const targetFile = fileForPath(target);
    if (!targetFile) { addError('link interni rotti', `${href}  (da ${from})`); continue; }
    if (!/\.html$/.test(targetFile)) continue; // file statici (pdf, immagini…)
    const t = pageInfo(targetFile);
    if (t.canonical && toPath(t.canonical) !== decode(target)) {
      addError('link interni a URL non canonico', `${target} -> ${toPath(t.canonical)}`);
    }
  }

  for (const m of info.html.matchAll(/<img\b[^>]*?\bsrc="(\/[^"]*)"/g)) {
    if (m[1].startsWith('//')) continue;
    if (!fileForPath(m[1])) addError('immagini mancanti', `${m[1]}  (da ${from})`);
  }

  for (const m of info.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    const [, lang, url] = m;
    if (!url.startsWith(SITE)) { addError('hreflang', `${lang} fuori dominio: ${url} (da ${from})`); continue; }
    const targetFile = fileForPath(new URL(url).pathname);
    if (!targetFile) { addError('hreflang', `${lang} verso pagina inesistente: ${url} (da ${from})`); continue; }
    const t = pageInfo(targetFile);
    if (t.canonical !== decode(url)) addError('hreflang', `${lang} verso URL non canonico: ${url} -> ${t.canonical} (da ${from})`);
    if (!info.noindex && t.noindex) addError('hreflang', `${lang} verso pagina noindex: ${url} (da ${from})`);
  }

  for (const m of info.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { addError('dati strutturati', `JSON-LD non valido (da ${from})`); continue; }
    for (const node of [].concat(data)) {
      if (node && node['@type'] === 'Recipe' && (node.datePublished || node.dateModified)) {
        addError('dati strutturati', `Recipe con date dichiarate (da ${from})`);
      }
    }
    // URL del sito citati nel JSON-LD: dominio www, pagina/file esistente, forma canonica.
    for (const u of new Set(m[1].match(/https?:\/\/(?:www\.)?(?:crispissimo\.com|convertitorefriggitrice\.it)[^"\s\\]*/g) || [])) {
      if (u !== SITE && !u.startsWith(SITE + '/')) { addError('dati strutturati', `dominio non canonico: ${u} (da ${from})`); continue; }
      const p = new URL(u).pathname;
      const targetFile = fileForPath(p);
      if (!targetFile) { addError('dati strutturati', `URL inesistente: ${u} (da ${from})`); continue; }
      if (!/\.html$/.test(targetFile)) continue;
      const t = pageInfo(targetFile);
      if (t.canonical && t.canonical !== decode(u.split('#')[0].split('?')[0])) {
        addError('dati strutturati', `URL non canonico: ${p} -> ${toPath(t.canonical)}`);
      }
    }
  }
}

// ---- 7. hreflang reciproci, title e description unici (pagine indicizzabili) ----
const indexable = htmlFiles.filter((f) => {
  const i = pageInfo(f);
  if (i.noindex || !i.canonical || path.basename(f) === '404.html') return false;
  const own = decode(SITE + '/' + path.relative(root, f).replace(/index\.html$/, ''));
  return i.canonical.replace(/\/$/, '') === own.replace(/\/$/, '');
});
const hreflangOf = (f) => new Map([...pageInfo(f).html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], decode(m[2])]));
const titles = new Map();
const descriptions = new Map();
for (const f of indexable) {
  const i = pageInfo(f);
  for (const [lang, url] of hreflangOf(f)) {
    if (lang === 'x-default') continue;
    const tf = fileForPath(new URL(url).pathname);
    if (!tf || tf === f) continue;
    const back = [...hreflangOf(tf).values()];
    if (!back.includes(i.canonical)) addError('hreflang', `non reciproco: ${toPath(i.canonical)} -> ${toPath(url)}`);
  }
  const title = (i.html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim() || '';
  const desc = (i.html.match(/<meta name="description" content="([^"]*)"/) || [])[1]?.trim() || '';
  if (!title) addError('title/description', `title mancante: ${toPath(i.canonical)}`);
  if (!desc) addError('title/description', `description mancante: ${toPath(i.canonical)}`);
  titles.set(title, [...(titles.get(title) || []), toPath(i.canonical)]);
  if (desc) descriptions.set(desc, [...(descriptions.get(desc) || []), toPath(i.canonical)]);
}
for (const [t, pages] of titles) if (t && pages.length > 1) addWarning('title duplicati', `${pages.length}x "${t.slice(0, 70)}": ${pages.slice(0, 3).join(', ')}`);
for (const [d, pages] of descriptions) if (pages.length > 1) addWarning('description duplicate', `${pages.length}x "${d.slice(0, 60)}…": ${pages.slice(0, 3).join(', ')}`);

// ---- 6. Ogni pagina indicizzabile con canonical verso se stessa deve stare in sitemap ----
const sitemapSet = new Set(sitemapUrls.map((u) => decode(u)));
for (const file of htmlFiles) {
  if (path.basename(file) === '404.html') continue;
  const info = pageInfo(file);
  if (info.noindex || !info.canonical) continue;
  const own = decode(SITE + '/' + path.relative(root, file).replace(/index\.html$/, ''));
  if (info.canonical.replace(/\/$/, '') !== own.replace(/\/$/, '')) continue; // duplicato: canonical altrove
  if (!sitemapSet.has(info.canonical)) addError('sitemap', `pagina indicizzabile assente dalla sitemap: ${info.canonical}`);
}

// ---- Report -------------------------------------------------------------------------
console.log(`seo-check: ${htmlFiles.length} pagine HTML, ${sitemapUrls.length} URL in sitemap`);
for (const [category, messages] of warnings) {
  console.log(`\n⚠ avviso – ${category}: ${messages.size}`);
  [...messages].slice(0, 10).forEach((msg) => console.log(`   - ${msg}`));
}
if (errors.size === 0) {
  console.log('seo-check: OK, nessun problema trovato.');
  process.exit(0);
}
let total = 0;
for (const [category, messages] of errors) {
  total += messages.size;
  console.log(`\n✗ ${category}: ${messages.size}`);
  [...messages].slice(0, Number(process.env.SEO_CHECK_MAX || 15)).forEach((msg) => console.log(`   - ${msg}`));
  if (messages.size > Number(process.env.SEO_CHECK_MAX || 15)) console.log(`   … e altri ${messages.size - Number(process.env.SEO_CHECK_MAX || 15)}`);
}
console.log(`\nseo-check: ${total} problemi trovati.`);
process.exit(1);
