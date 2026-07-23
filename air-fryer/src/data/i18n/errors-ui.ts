export interface ErrorCode {
  code: string;
  description?: string;
  meaning?: string;
  suggestions?: string[];
}

export interface AirFryerDBItem {
  brand: string;
  user_label?: string;
  actual_model?: string;
  pdf_url?: string;
  pdf_type?: 'manual' | 'spec_sheet' | 'recipe_book' | 'safety_sheet' | string;
  pdf_matches_label?: boolean;
  capacity_l?: number | null;
  capacity_kg_fries?: number | null;
  dual_zone?: boolean;
  notes?: string;
  notable_features?: string[];
  error_codes?: ErrorCode[];
  error_note?: string;
  generic_suggestions?: string[];
}

export const errorsUiTranslations = {
  it: {
    heroTitle: "Diagnostica e Codici Errore",
    heroSubtitle: "Trova il significato dei codici e la procedura ufficiale per la tua friggitrice ad aria.",
    searchPlaceholder: "Cerca E1, Pot, fumo bianco, non si accende o il tuo modello",
    brandAll: "Tutte le marche",
    onlyDualBasket: "Solo Dual Basket",
    resetFilters: "Azzera filtri",
    initialInstruction: "Cerca marca, modello, codice o sintomo per iniziare",
    emptyState: "Non abbiamo trovato corrispondenze nel database attuale. Prova a cercare solo la marca, il codice visualizzato o una parte del modello.",
    quickResponse: "Risposta rapida",
    quickResponseCount: "Compatibile con {count} modelli",
    assistanceRecommended: "Assistenza consigliata",
    letItCool: "Lascia raffreddare",
    quickCheck: "Controllo rapido",
    connectionApp: "Connessione/App",
    consultManual: "Consulta il manuale",
    explicitCodeMeaning: "Il manuale indica:",
    noExplicitCodesTitle: "Diagnostica testuale",
    noExplicitCodesMsg: "Il documento disponibile non riporta codici display espliciti per questo modello. Puoi però consultare i problemi comuni e le verifiche consigliate.",
    noCodesAtAll: "Nessun codice documentato",
    documentNote: "Documento di riferimento: verifica sempre il codice modello riportato sull'etichetta della tua friggitrice.",
    openManual: "Apri manuale",
    openSpecSheet: "Apri scheda tecnica",
    openRecipeBook: "Apri ricettario",
    openSafetySheet: "Apri documento di sicurezza",
    openGenericDoc: "Apri documento di riferimento",
    capacityLiters: "L",
    dualBasket: "Dual Basket",
    codesFound: "{count} codici rilevati",
    meaningLabel: "Significato:",
    suggestionsLabel: "Azione consigliata:"
  },
  en: {
    heroTitle: "Diagnostics & Error Codes",
    heroSubtitle: "Find the meaning of codes and the official procedure for your air fryer.",
    searchPlaceholder: "Search E1, Pot, white smoke, won't turn on or your model",
    brandAll: "All brands",
    onlyDualBasket: "Dual Basket Only",
    resetFilters: "Reset filters",
    initialInstruction: "Search for a brand, model, code, or symptom to get started",
    emptyState: "We didn't find any matches in the current database. Try searching only for the brand, the displayed code, or a part of the model.",
    quickResponse: "Quick response",
    quickResponseCount: "Compatible with {count} models",
    assistanceRecommended: "Assistance recommended",
    letItCool: "Let it cool down",
    quickCheck: "Quick check",
    connectionApp: "Connection/App",
    consultManual: "Consult the manual",
    explicitCodeMeaning: "The manual states:",
    noExplicitCodesTitle: "Textual diagnostics",
    noExplicitCodesMsg: "The available document does not report explicit display codes for this model. However, you can consult common problems and recommended checks.",
    noCodesAtAll: "No documented codes",
    documentNote: "Reference document: always check the model code on the label of your air fryer.",
    openManual: "Open manual",
    openSpecSheet: "Open spec sheet",
    openRecipeBook: "Open recipe book",
    openSafetySheet: "Open safety document",
    openGenericDoc: "Open reference document",
    capacityLiters: "L",
    dualBasket: "Dual Basket",
    codesFound: "{count} codes found",
    meaningLabel: "Meaning:",
    suggestionsLabel: "Recommended action:"
  },
  es: {
    heroTitle: "Diagnóstico y Códigos de Error",
    heroSubtitle: "Encuentre el significado de los códigos y el procedimiento oficial para su freidora de aire.",
    searchPlaceholder: "Busca E1, Pot, humo blanco, no enciende o tu modelo",
    brandAll: "Todas las marcas",
    onlyDualBasket: "Solo Dual Basket",
    resetFilters: "Restablecer filtros",
    initialInstruction: "Busque una marca, modelo, código o síntoma para comenzar",
    emptyState: "No encontramos coincidencias en la base de datos actual. Intente buscar solo la marca, el código mostrado o una parte del modelo.",
    quickResponse: "Respuesta rápida",
    quickResponseCount: "Compatible con {count} modelos",
    assistanceRecommended: "Asistencia recomendada",
    letItCool: "Dejar enfriar",
    quickCheck: "Control rápido",
    connectionApp: "Conexión/App",
    consultManual: "Consultar el manual",
    explicitCodeMeaning: "El manual indica:",
    noExplicitCodesTitle: "Diagnóstico textual",
    noExplicitCodesMsg: "El documento disponible no informa códigos de pantalla explícitos para este modelo. Sin embargo, puede consultar problemas comunes y verificaciones recomendadas.",
    noCodesAtAll: "Sin códigos documentados",
    documentNote: "Documento de referencia: compruebe siempre el código de modelo en la etiqueta de su freidora.",
    openManual: "Abrir manual",
    openSpecSheet: "Abrir ficha técnica",
    openRecipeBook: "Abrir recetario",
    openSafetySheet: "Abrir documento de seguridad",
    openGenericDoc: "Abrir documento de referencia",
    capacityLiters: "L",
    dualBasket: "Dual Basket",
    codesFound: "{count} códigos encontrados",
    meaningLabel: "Significado:",
    suggestionsLabel: "Acción recomendada:"
  },
  fr: {
    heroTitle: "Diagnostic et Codes d'Erreur",
    heroSubtitle: "Trouvez la signification des codes et la procédure officielle pour votre friteuse à air.",
    searchPlaceholder: "Recherchez E1, Pot, fumée blanche, ne s'allume pas ou votre modèle",
    brandAll: "Toutes les marques",
    onlyDualBasket: "Seulement Dual Basket",
    resetFilters: "Réinitialiser les filtres",
    initialInstruction: "Recherchez une marque, un modèle, un code ou un symptôme pour commencer",
    emptyState: "Nous n'avons trouvé aucune correspondance dans la base de données actuelle. Essayez de rechercher uniquement la marque, le code affiché ou une partie du modèle.",
    quickResponse: "Réponse rapide",
    quickResponseCount: "Compatible avec {count} modèles",
    assistanceRecommended: "Assistance recommandée",
    letItCool: "Laisser refroidir",
    quickCheck: "Contrôle rapide",
    connectionApp: "Connexion/App",
    consultManual: "Consulter le manuel",
    explicitCodeMeaning: "Le manuel indique:",
    noExplicitCodesTitle: "Diagnostic textuel",
    noExplicitCodesMsg: "Le document disponible ne signale pas de codes d'affichage explicites pour ce modèle. Vous pouvez cependant consulter les problèmes courants et les vérifications recommandées.",
    noCodesAtAll: "Aucun code documenté",
    documentNote: "Document de référence: vérifiez toujours le code modèle sur l'étiquette de votre friteuse.",
    openManual: "Ouvrir le manuel",
    openSpecSheet: "Ouvrir la fiche technique",
    openRecipeBook: "Ouvrir le livre de recettes",
    openSafetySheet: "Ouvrir le document de sécurité",
    openGenericDoc: "Ouvrir le document de référence",
    capacityLiters: "L",
    dualBasket: "Dual Basket",
    codesFound: "{count} codes trouvés",
    meaningLabel: "Signification:",
    suggestionsLabel: "Action recommandée:"
  }
};
