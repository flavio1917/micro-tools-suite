 air-fryer/astro.config.mjs                         |   47 [32m+[m[31m-[m
 air-fryer/docs/wave-1-release-candidate-report.md  |  260 [32m+++[m
 .../recipes/chips-zucchine-parmigiano/step_1.jpg   |  Bin [31m0[m -> [32m238324[m bytes
 .../recipes/chips-zucchine-parmigiano/step_2.jpg   |  Bin [31m0[m -> [32m175075[m bytes
 .../recipes/chips-zucchine-parmigiano/step_3.jpg   |  Bin [31m0[m -> [32m164447[m bytes
 .../recipes/chips-zucchine-parmigiano/step_4.jpg   |  Bin [31m0[m -> [32m175080[m bytes
 .../recipes/chips-zucchine-parmigiano/step_5.jpg   |  Bin [31m0[m -> [32m210499[m bytes
 .../recipes/gamberi-dorati-fritti/step_1.jpg       |  Bin [31m0[m -> [32m99758[m bytes
 .../recipes/gamberi-dorati-fritti/step_2.jpg       |  Bin [31m0[m -> [32m123589[m bytes
 .../recipes/gamberi-dorati-fritti/step_3.jpg       |  Bin [31m0[m -> [32m116057[m bytes
 .../recipes/gamberi-dorati-fritti/step_4.jpg       |  Bin [31m0[m -> [32m119300[m bytes
 .../recipes/gamberi-dorati-fritti/step_5.jpg       |  Bin [31m0[m -> [32m114565[m bytes
 air-fryer/scripts/conversion_report.json           |   20 [32m+[m
 air-fryer/scripts/convert-air-fryer-errors.py      |  288 [32m+++[m
 air-fryer/scripts/editorial-audit-philips.json     |  204 [32m++[m
 air-fryer/scripts/validate-air-fryer-errors.ts     |  136 [32m++[m
 .../air-fryer-errors/AirFryerDatabase.astro        |  435 [32m++[m[31m--[m
 .../air-fryer-errors/AirFryerModelCard.astro       |   99 [32m+[m[31m-[m
 .../air-fryer-errors/DiagnosticSearch.astro        |  326 [32m+++[m
 .../air-fryer-errors/ErrorCodeCard.astro           |  199 [32m+[m[31m-[m
 .../air-fryer-errors/EvidenceLabel.astro           |   39 [32m+[m
 .../air-fryer-errors/MissingModelForm.astro        |   50 [32m+[m
 .../components/air-fryer-errors/SafetyNotice.astro |   23 [32m+[m
 .../air-fryer-errors/SeverityBadge.astro           |   50 [32m+[m
 .../components/air-fryer-errors/SymptomCard.astro  |  137 [32m++[m
 air-fryer/src/components/seo-tools/errori.astro    |    2 [32m+[m[31m-[m
 air-fryer/src/data/air-fryer-dataset.ts            |   95 [32m+[m
 air-fryer/src/data/air-fryer-db.json               | 2369 [32m++++++++[m[31m------------[m
 air-fryer/src/data/air-fryer-overrides.ts          |   38 [32m+[m
 air-fryer/src/data/i18n/Errori.xlsx                |  Bin [31m0[m -> [32m19583[m bytes
 air-fryer/src/data/i18n/error-content.ts           |  343 [32m+++[m
 air-fryer/src/data/i18n/errors-ui.ts               |  296 [32m++[m[31m-[m
 air-fryer/src/data/i18n/page-errors-seo.ts         |   15 [32m+[m
 air-fryer/src/layouts/MainLayout.astro             |   18 [32m+[m[31m-[m
 air-fryer/src/lib/air-fryer-anchor.ts              |   10 [32m+[m
 air-fryer/src/lib/air-fryer-db.ts                  |   86 [32m+[m[31m-[m
 air-fryer/src/lib/air-fryer-error-routes.ts        |   49 [32m+[m
 air-fryer/src/lib/air-fryer-local-storage.ts       |   27 [32m+[m
 air-fryer/src/lib/air-fryer-query-validation.ts    |   72 [32m+[m
 air-fryer/src/lib/air-fryer-search-index.ts        |   43 [32m+[m
 air-fryer/src/lib/air-fryer-search.ts              |  151 [32m++[m
 air-fryer/src/lib/analytics.ts                     |   77 [32m+[m
 air-fryer/src/lib/missing-model-context.ts         |   29 [32m+[m
 .../[hub]/[tool]/[brand]/[routeSlug].astro         |  264 [32m+++[m
 .../codici-errore-friggitrice-ad-aria.astro        |    6 [32m+[m[31m-[m
 air-fryer/src/pages/api/segnala-modello.ts         |  248 [32m+[m[31m-[m
 air-fryer/src/types/air-fryer-v2.ts                |   97 [32m+[m
 air-fryer/src/types/missing-model-context.ts       |   14 [32m+[m
 48 files changed, 4951 insertions(+), 1711 deletions(-)
