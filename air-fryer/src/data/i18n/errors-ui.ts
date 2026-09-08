export type DiagnosticKind = 'error_code' | 'warning' | 'status' | 'feature_message' | 'symptom';

export interface ErrorCode {
  code: string;
  description?: string;
  meaning?: string;
  suggestions?: string[];
  kind?: DiagnosticKind;
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
    heroTitle: "Database Errori & Reset",
    heroSubtitle: "Display bloccato su E1 o E2? Non buttarla! Scopri il vero significato tecnico dei codici di errore e come ripararli in sicurezza.",
    whyErrorTitle: "🧠 Perché compare l'errore?",
    whyErrorText: "Le moderne friggitrici ad aria sono dotate di micro-computer integrati che monitorano costantemente il termistore (sensore di calore) e il flusso della ventola. Quando compare un codice di errore, la scheda madre ha interrotto l'alimentazione per prevenire un principio di incendio. Circa il 60% degli errori sono 'falsi positivi' risolvibili con un reset software, mentre il restante 40% richiede la sostituzione di componenti hardware.",
    howToResetTitle: "Come fare l'Hard Reset (Reset di Fabbrica):",
    resetStep1: "Stacca la spina dalla presa elettrica (non spegnere solo dal pulsante).",
    resetStep2: "Estrai il cestello e lascialo fuori per disattivare il micro-switch di sicurezza.",
    resetStep3: "Attendi almeno 15 minuti per far scaricare completamente i condensatori della scheda madre.",
    resetStep4: "Reinserisci il cestello, ricollega la spina e accendi. Se l'errore persiste, cerca il codice qui sotto.",
    
    brandAll: "Seleziona la Marca...",
    modelAll: "Seleziona il Modello...",
    resetFilters: "Azzera selezione",
    initialInstruction: "Seleziona la marca e il modello della tua friggitrice per visualizzare i codici di errore.",
    emptyState: "Non abbiamo trovato corrispondenze nel database attuale.",
    
    // Labels for the error cards
    diagnosisLabel: "DIAGNOSI:",
    solutionLabel: "SOLUZIONE:",
    brandFrequentLabel: "MODELLO:", // Adattato per il modello specifico
    
    // Action pills
    actionHardware: "RIPARAZIONE HARDWARE",
    actionSoftware: "RESET SOFTWARE",
    actionManual: "CONTROLLO MANUALE",
    actionApp: "ERRORE APP/WIFI",
    actionGeneric: "VERIFICA MANUALE",
    
    noExplicitCodesTitle: "Diagnostica testuale",
    noExplicitCodesMsg: "Il manuale non documenta codici o messaggi di errore sul display.",
    noCodesAtAll: "Nessun codice documentato",
    documentNote: "Verifica sempre il codice modello sull'etichetta dell'apparecchio: le procedure possono variare.",
    openManual: "Apri manuale PDF",
    
    // New section titles
    sectionDisplayCodes: "Codici e avvisi del display",
    sectionStatus: "Messaggi di funzionamento",
    sectionFeatures: "Promemoria durante la cottura",
    sectionSymptoms: "Problemi comuni per questo modello",
    
    initialStateMessage: "Seleziona una marca, cerca un codice o descrivi il problema.",
    otherModelOption: "Altro modello {brand} / Problemi comuni",
    
    // New Actions
    actionCoolDown: "LASCIA RAFFREDDARE",
    actionAssistance: "ASSISTENZA CONSIGLIATA",
    actionQuickCheck: "CONTROLLO RAPIDO",
    actionManualCheck: "CONSULTA IL MANUALE",
    
    // Diagnostic Search
    searchPlaceholder: "Cerca marca, modello, codice o problema",
    searchCatModels: "MODELLI",
    searchCatBrands: "MARCHE",
    searchCatCodes: "CODICI ERRORE",
    searchCatSymptoms: "PROBLEMI COMUNI",
    searchDidYouMean: "FORSE CERCAVI",
    ambiguousVariantWarning: "Abbiamo trovato più varianti possibili. Verifica il riferimento esatto sull'etichetta del prodotto o nel manuale.",
    
    // Symptoms
    symptomLabels: {
      "non-si-accende": "non si accende",
      "fumo-bianco": "fumo bianco"
    } as Record<string, string>,
    
    cardLabels: {
      meaning: "Significato",
      possibleCause: "Causa possibile",
      solution: "Soluzione",
      checklist: "Checklist",
      officialManual: "Consulta il manuale ufficiale",
      page: "Pagina",
      opensInNewTab: "si apre in una nuova scheda"
    },
    
    formLabels: {
      title: "Non hai trovato quello che cercavi?",
      subtitle: "Aiutaci a migliorare! Inviaci i dettagli e aggiungeremo le informazioni mancanti.",
      brand: "Marca",
      model: "Modello",
      code: "Codice Errore (se applicabile)",
      submit: "Invia segnalazione"
    },
    
    statusMessages: {
      initial: "Scegli una marca per vedere i modelli disponibili oppure seleziona 'Altro' per la guida generica.",
      ambiguous: "Abbiamo trovato più varianti possibili. Verifica il riferimento esatto sull'etichetta del prodotto o nel manuale.",
      modelNotFound: "Modello non trovato. Consulta la guida generica o riprova la ricerca.",
      brandSelected: "Hai selezionato {brand}. Puoi consultare i messaggi documentati per i modelli del brand.",
      brandNotFound: "Marca non trovata. Consulta la guida generica.",
      genericGuidance: "Il significato dipende da marca e modello. Seleziona la tua friggitrice per istruzioni più precise. Ecco la guida generica.",
      emptySearch: "Cerca marca, modello, codice o problema per ricevere istruzioni precise."
    },
    
    legacyLabels: {
      typeError: "Errore tecnico",
      typeWarning: "Controllo richiesto",
      typeStatus: "Stato / promemoria",
      typeMessage: "Messaggio",
      actionAssistance: "Contatta assistenza",
      actionStop: "Spegni, scollega e verifica",
      actionCheck: "Verifica e riprendi",
      actionManual: "Verifica il manuale",
      sourceModel: "Modello sorgente:"
    },
    
    diagnosticSearch: {
      noResults: "Nessun risultato trovato.",
      resultsFound: "{n} risultati trovati. Usa le frecce per navigare.",
      otherBrand: "Altro",
      noMatch: "Nessun modello trovato. Puoi consultare la guida generale oppure segnalare la marca/modello.",
      unknownBrand: "Marca non ancora presente nel database. Mostriamo la guida generica e puoi segnalarci il modello.",
      openGuide: "Apri guida generale",
      signalModel: "Segnala marca o modello"
    },
    
    disclaimer: {
      title: "Avvertenza importante",
      text1: "Le informazioni presenti in questa pagina hanno finalità informative e orientative. Il significato dei codici errore può variare in base alla marca, al modello, al mercato e alla versione dell’apparecchio.",
      text2: "Consulta sempre il manuale ufficiale del tuo modello e, in caso di dubbio, contatta il servizio di assistenza autorizzato. Non aprire, modificare o riparare l’apparecchio se non sei qualificato a farlo.",
      text3: "Crispissimo non è affiliato, approvato o autorizzato dai produttori menzionati, salvo diversa indicazione."
    },
    
    modelCard: {
      codesInDoc: "Codici nel documento",
      textualGuide: "Guida problemi testuale",
      mainFeatures: "Caratteristiche principali",
      showAllFeatures: "Mostra tutte le caratteristiche",
      documentedErrors: "Errori e messaggi documentati",
      noDisplayCodes: "Nessun codice display documentato",
      commonProblems: "Problemi comuni e soluzioni",
      docSuggestions: "Suggerimenti dal documento e dalle istruzioni del modello"
    }
  },
  en: {
    heroTitle: "Error Database & Reset",
    heroSubtitle: "Display stuck on E1 or E2? Don't throw it away! Discover the true technical meaning of error codes and how to fix them safely.",
    whyErrorTitle: "🧠 Why does the error appear?",
    whyErrorText: "Modern air fryers feature built-in microcomputers that constantly monitor the thermistor (heat sensor) and fan airflow. When an error code appears, the motherboard has cut power to prevent a potential fire. About 60% of errors are 'false positives' solvable with a software reset, while the remaining 40% require hardware replacement.",
    howToResetTitle: "How to perform a Hard Reset (Factory Reset):",
    resetStep1: "Unplug from the electrical outlet (do not just turn off the button).",
    resetStep2: "Remove the basket and leave it out to deactivate the safety micro-switch.",
    resetStep3: "Wait at least 15 minutes to fully discharge the motherboard capacitors.",
    resetStep4: "Reinsert the basket, plug it back in, and turn it on. If the error persists, search for the code below.",
    
    brandAll: "Select Brand...",
    modelAll: "Select Model...",
    resetFilters: "Reset selection",
    initialInstruction: "Select your air fryer's brand and model to view error codes.",
    emptyState: "No matches found in the current database.",
    
    diagnosisLabel: "DIAGNOSIS:",
    solutionLabel: "SOLUTION:",
    brandFrequentLabel: "MODEL:",
    
    actionHardware: "HARDWARE REPAIR",
    actionSoftware: "SOFTWARE RESET",
    actionManual: "MANUAL CHECK",
    actionApp: "APP/WIFI ERROR",
    actionGeneric: "MANUAL VERIFICATION",
    
    noExplicitCodesTitle: "Textual diagnostics",
    noExplicitCodesMsg: "The manual does not document display error codes or messages.",
    noCodesAtAll: "No documented codes",
    documentNote: "Always check the model code on the device label: procedures may vary.",
    openManual: "Open PDF manual",

    // New section titles
    sectionDisplayCodes: "Display codes and warnings",
    sectionStatus: "Operating messages",
    sectionFeatures: "Cooking reminders",
    sectionSymptoms: "Common problems for this model",
    
    initialStateMessage: "Select a brand, search for a code, or describe the problem.",
    otherModelOption: "Other {brand} model / Common problems",

    // New Actions
    actionCoolDown: "LET IT COOL DOWN",
    actionAssistance: "SERVICE RECOMMENDED",
    actionQuickCheck: "QUICK CHECK",
    actionManualCheck: "CONSULT MANUAL",

    // Diagnostic Search
    searchPlaceholder: "Search a brand, model, code, or problem",
    searchCatModels: "MODELS",
    searchCatBrands: "BRANDS",
    searchCatCodes: "ERROR CODES",
    searchCatSymptoms: "COMMON PROBLEMS",
    searchDidYouMean: "DID YOU MEAN",
    ambiguousVariantWarning: "We found multiple possible variants. Check the exact reference on the product label or in the manual.",
    
    // Symptoms
    symptomLabels: {
      "non-si-accende": "won't turn on",
      "fumo-bianco": "white smoke"
    } as Record<string, string>,

    cardLabels: {
      meaning: "Meaning",
      possibleCause: "Possible cause",
      solution: "Solution",
      checklist: "Checklist",
      officialManual: "View the official manual",
      page: "Page",
      opensInNewTab: "opens in a new tab"
    },

    formLabels: {
      title: "Didn't find what you were looking for?",
      subtitle: "Help us improve! Send us the details and we will add the missing information.",
      brand: "Brand",
      model: "Model",
      code: "Error Code (if applicable)",
      submit: "Send report"
    },
    
    statusMessages: {
      initial: "Choose a brand to see available models or select 'Other' for generic guidance.",
      ambiguous: "We found multiple possible variants. Check the exact reference on the product label or in the manual.",
      modelNotFound: "Model not found. Consult the generic guide or try your search again.",
      brandSelected: "You selected {brand}. You can view the documented messages for this brand's models.",
      brandNotFound: "Brand not found. Consult the generic guide.",
      genericGuidance: "The meaning depends on the brand and model. Select your air fryer for precise instructions. Here is the generic guide.",
      emptySearch: "Search for a brand, model, code, or problem to receive precise instructions."
    },

    legacyLabels: {
      typeError: "Technical error",
      typeWarning: "Check required",
      typeStatus: "Status / reminder",
      typeMessage: "Message",
      actionAssistance: "Contact support",
      actionStop: "Turn off, unplug and check",
      actionCheck: "Check and resume",
      actionManual: "Check the manual",
      sourceModel: "Source model:"
    },

    diagnosticSearch: {
      noResults: "No results found.",
      resultsFound: "{n} results found. Use arrows to navigate.",
      otherBrand: "Other",
      noMatch: "No model found. You can consult the general guide or report the brand/model.",
      unknownBrand: "Brand not yet in our database. We'll show you the generic guide and you can report the model.",
      openGuide: "Open general guide",
      signalModel: "Report brand or model"
    },

    disclaimer: {
      title: "Important Notice",
      text1: "The information on this page is for informational and guidance purposes only. The meaning of error codes can vary based on brand, model, market, and device version.",
      text2: "Always consult your model's official manual and, when in doubt, contact authorized customer service. Do not open, modify, or repair the device unless you are qualified to do so.",
      text3: "Crispissimo is not affiliated, endorsed, or authorized by the mentioned manufacturers, unless otherwise stated."
    },

    modelCard: {
      codesInDoc: "Codes in document",
      textualGuide: "Textual problem guide",
      mainFeatures: "Main features",
      showAllFeatures: "Show all features",
      documentedErrors: "Documented errors and messages",
      noDisplayCodes: "No documented display codes",
      commonProblems: "Common problems and solutions",
      docSuggestions: "Suggestions from document and model instructions"
    }
  },
  es: {
    heroTitle: "Base de Datos de Errores y Reinicio",
    heroSubtitle: "¿Pantalla bloqueada en E1 o E2? ¡No la tires! Descubre el verdadero significado técnico de los códigos de error y cómo solucionarlos de forma segura.",
    whyErrorTitle: "🧠 ¿Por qué aparece el error?",
    whyErrorText: "Las freidoras de aire modernas cuentan con microordenadores integrados que monitorean constantemente el termistor (sensor de calor) y el flujo del ventilador. Cuando aparece un código de error, la placa base ha cortado la energía para prevenir un incendio. Aproximadamente el 60% son 'falsos positivos' que se resuelven con un reinicio de software, mientras que el 40% requiere reemplazo de hardware.",
    howToResetTitle: "Cómo hacer un Hard Reset (Reinicio de Fábrica):",
    resetStep1: "Desconecta el enchufe de la toma de corriente (no solo apagues el botón).",
    resetStep2: "Saca la cesta y déjala fuera para desactivar el microinterruptor de seguridad.",
    resetStep3: "Espera al menos 15 minutos para que los condensadores de la placa base se descarguen.",
    resetStep4: "Vuelve a insertar la cesta, enchufa y enciende. Si el error persiste, busca el código abajo.",
    
    brandAll: "Seleccionar Marca...",
    modelAll: "Seleccionar Modelo...",
    resetFilters: "Restablecer selección",
    initialInstruction: "Selecciona la marca y modelo de tu freidora para ver los códigos de error.",
    emptyState: "No se encontraron coincidencias en la base de datos actual.",
    
    diagnosisLabel: "DIAGNÓSTICO:",
    solutionLabel: "SOLUCIÓN:",
    brandFrequentLabel: "MODELO:",
    
    actionHardware: "REPARACIÓN HARDWARE",
    actionSoftware: "REINICIO SOFTWARE",
    actionManual: "CONTROL MANUAL",
    actionApp: "ERROR APP/WIFI",
    actionGeneric: "VERIFICACIÓN MANUAL",
    
    noExplicitCodesTitle: "Diagnóstico textual",
    noExplicitCodesMsg: "El manual no documenta códigos o mensajes de error en la pantalla.",
    noCodesAtAll: "Sin códigos documentados",
    documentNote: "Comprueba siempre el código del modelo en la etiqueta del aparato: los procedimientos pueden variar.",
    openManual: "Abrir manual PDF",

    // New section titles
    sectionDisplayCodes: "Códigos y advertencias de la pantalla",
    sectionStatus: "Mensajes de funcionamiento",
    sectionFeatures: "Recordatorios durante la cocción",
    sectionSymptoms: "Problemas comunes de este modelo",
    
    initialStateMessage: "Seleccione una marca, busque un código o describa el problema.",
    otherModelOption: "Otro modelo {brand} / Problemas comunes",

    // New Actions
    actionCoolDown: "DEJAR ENFRIAR",
    actionAssistance: "ASISTENCIA RECOMENDADA",
    actionQuickCheck: "CONTROL RÁPIDO",
    actionManualCheck: "CONSULTAR MANUAL",

    // Diagnostic Search
    searchPlaceholder: "Busca una marca, un modelo, un código o un problema",
    searchCatModels: "MODELOS",
    searchCatBrands: "MARCAS",
    searchCatCodes: "CÓDIGOS DE ERROR",
    searchCatSymptoms: "PROBLEMAS COMUNES",
    searchDidYouMean: "QUIZÁS QUISISTE DECIR",
    ambiguousVariantWarning: "Hemos encontrado varias variantes posibles. Comprueba la referencia exacta en la etiqueta del producto o en el manual.",
    
    // Symptoms
    symptomLabels: {
      "non-si-accende": "no se enciende",
      "fumo-bianco": "humo blanco"
    } as Record<string, string>,

    cardLabels: {
      meaning: "Significado",
      possibleCause: "Posible causa",
      solution: "Solución",
      checklist: "Lista de comprobación",
      officialManual: "Consultar el manual oficial",
      page: "Página",
      opensInNewTab: "se abre en una nueva pestaña"
    },

    formLabels: {
      title: "¿No encontraste lo que buscabas?",
      subtitle: "¡Ayúdanos a mejorar! Envíanos los detalles y añadiremos la información faltante.",
      brand: "Marca",
      model: "Modelo",
      code: "Código de Error (si aplica)",
      submit: "Enviar reporte"
    },
    
    statusMessages: {
      initial: "Elige una marca para ver los modelos disponibles o selecciona 'Otra' para la guía genérica.",
      ambiguous: "Hemos encontrado varias variantes posibles. Comprueba la referencia exacta en la etiqueta del producto o en el manual.",
      modelNotFound: "Modelo no encontrado. Consulta la guía genérica o inténtalo de nuevo.",
      brandSelected: "Has seleccionado {brand}. Puedes consultar los mensajes documentados para los modelos de la marca.",
      brandNotFound: "Marca no encontrada. Consulta la guía genérica.",
      genericGuidance: "El significado depende de la marca y modelo. Selecciona tu freidora para obtener instrucciones precisas. Aquí tienes la guía genérica.",
      emptySearch: "Busca una marca, modelo, código o problema para recibir instrucciones precisas."
    },

    legacyLabels: {
      typeError: "Error técnico",
      typeWarning: "Control requerido",
      typeStatus: "Estado / recordatorio",
      typeMessage: "Mensaje",
      actionAssistance: "Contactar soporte",
      actionStop: "Apagar, desconectar y verificar",
      actionCheck: "Verificar y reanudar",
      actionManual: "Verificar el manual",
      sourceModel: "Modelo de origen:"
    },

    diagnosticSearch: {
      noResults: "No se encontraron resultados.",
      resultsFound: "{n} resultados encontrados. Usa las flechas para navegar.",
      otherBrand: "Otra",
      noMatch: "No se ha encontrado el modelo. Puedes consultar la guía general o informar de la marca/modelo.",
      unknownBrand: "La marca aún no está en nuestra base de datos. Te mostramos la guía genérica y puedes informar del modelo.",
      openGuide: "Abrir guía general",
      signalModel: "Informar de marca o modelo"
    },

    disclaimer: {
      title: "Aviso importante",
      text1: "La información de esta página es únicamente orientativa e informativa. El significado de los códigos de error puede variar según la marca, el modelo, el mercado y la versión del aparato.",
      text2: "Consulta siempre el manual oficial de tu modelo y, en caso de duda, ponte en contacto con el servicio técnico autorizado. No abras, modifiques ni repares el aparato si no estás cualificado para ello.",
      text3: "Crispissimo no está afiliado, respaldado ni autorizado por los fabricantes mencionados, salvo que se indique lo contrario."
    },

    modelCard: {
      codesInDoc: "Códigos en el documento",
      textualGuide: "Guía textual de problemas",
      mainFeatures: "Características principales",
      showAllFeatures: "Mostrar todas las características",
      documentedErrors: "Errores y mensajes documentados",
      noDisplayCodes: "Ningún código de pantalla documentado",
      commonProblems: "Problemas comunes y soluciones",
      docSuggestions: "Sugerencias del documento e instrucciones del modelo"
    }
  },
  fr: {
    heroTitle: "Base de Données des Erreurs et Réinitialisation",
    heroSubtitle: "Écran bloqué sur E1 ou E2 ? Ne la jetez pas ! Découvrez la vraie signification des codes et comment les réparer en toute sécurité.",
    whyErrorTitle: "🧠 Pourquoi l'erreur apparaît-elle ?",
    whyErrorText: "Les friteuses modernes intègrent des micro-ordinateurs qui surveillent la thermistance et le flux du ventilateur. Lorsqu'un code d'erreur apparaît, la carte mère a coupé l'alimentation pour éviter un incendie. Environ 60% sont de 'faux positifs' résolubles par une réinitialisation logicielle, le reste nécessite un remplacement matériel.",
    howToResetTitle: "Comment faire un Hard Reset (Réinitialisation d'usine) :",
    resetStep1: "Débranchez la fiche de la prise électrique (ne pas juste éteindre le bouton).",
    resetStep2: "Retirez le panier et laissez-le dehors pour désactiver le micro-interrupteur.",
    resetStep3: "Attendez au moins 15 minutes pour décharger les condensateurs de la carte mère.",
    resetStep4: "Réinsérez le panier, rebranchez et allumez. Si l'erreur persiste, cherchez ci-dessous.",
    
    brandAll: "Sélectionner la Marque...",
    modelAll: "Sélectionner le Modèle...",
    resetFilters: "Réinitialiser",
    initialInstruction: "Sélectionnez la marque et le modèle pour voir les codes d'erreur.",
    emptyState: "Aucune correspondance trouvée.",
    
    diagnosisLabel: "DIAGNOSTIC:",
    solutionLabel: "SOLUTION:",
    brandFrequentLabel: "MODÈLE:",
    
    actionHardware: "RÉPARATION MATÉRIELLE",
    actionSoftware: "RÉINITIALISATION LOGICIELLE",
    actionManual: "CONTRÔLE MANUEL",
    actionApp: "ERREUR APP/WIFI",
    actionGeneric: "VÉRIFICATION MANUELLE",
    
    noExplicitCodesTitle: "Diagnostic textuel",
    noExplicitCodesMsg: "Le manuel ne documente pas les codes ou les messages d'erreur à l'écran.",
    noCodesAtAll: "Aucun code documenté",
    documentNote: "Vérifiez toujours le code du modèle sur l'étiquette de l'appareil : les procédures peuvent varier.",
    openManual: "Ouvrir le manuel PDF",

    // New section titles
    sectionDisplayCodes: "Codes et avertissements de l'écran",
    sectionStatus: "Messages de fonctionnement",
    sectionFeatures: "Rappels de cuisson",
    sectionSymptoms: "Problèmes courants pour ce modèle",
    
    initialStateMessage: "Sélectionnez une marque, recherchez un code ou décrivez le problème.",
    otherModelOption: "Autre modèle {brand} / Problèmes courants",

    // New Actions
    actionCoolDown: "LAISSER REFROIDIR",
    actionAssistance: "ASSISTANCE RECOMMANDÉE",
    actionQuickCheck: "CONTRÔLE RAPIDE",
    actionManualCheck: "CONSULTER LE MANUEL",

    // Diagnostic Search
    searchPlaceholder: "Rechercher une marque, un modèle, un code ou un problème",
    searchCatModels: "MODÈLES",
    searchCatBrands: "MARQUES",
    searchCatCodes: "CODES D'ERREUR",
    searchCatSymptoms: "PROBLÈMES COURANTS",
    searchDidYouMean: "ESSAYEZ-VOUS DE CHERCHER",
    ambiguousVariantWarning: "Nous avons trouvé plusieurs variantes possibles. Vérifiez la référence exacte sur l'étiquette du produit ou dans le manuel.",
    
    // Symptoms
    symptomLabels: {
      "non-si-accende": "ne s'allume pas",
      "fumo-bianco": "fumée blanche"
    } as Record<string, string>,

    cardLabels: {
      meaning: "Signification",
      possibleCause: "Cause possible",
      solution: "Solution",
      checklist: "Liste de contrôle",
      officialManual: "Consulter le manuel officiel",
      page: "Page",
      opensInNewTab: "s’ouvre dans un nouvel onglet"
    },

    formLabels: {
      title: "Vous n'avez pas trouvé ce que vous cherchiez ?",
      subtitle: "Aidez-nous à nous améliorer ! Envoyez-nous les détails et nous ajouterons les informations manquantes.",
      brand: "Marque",
      model: "Modèle",
      code: "Code d'erreur (si applicable)",
      submit: "Envoyer le signalement"
    },
    
    statusMessages: {
      initial: "Choisissez une marque pour voir les modèles disponibles ou sélectionnez 'Autre' pour le guide générique.",
      ambiguous: "Nous avons trouvé plusieurs variantes possibles. Vérifiez la référence exacte sur l'étiquette du produit ou dans le manuel.",
      modelNotFound: "Modèle introuvable. Consultez le guide générique ou réessayez.",
      brandSelected: "Vous avez sélectionné {brand}. Vous pouvez consulter les messages documentés pour les modèles de cette marque.",
      brandNotFound: "Marque introuvable. Consultez le guide générique.",
      genericGuidance: "La signification dépend de la marque et du modèle. Sélectionnez votre friteuse pour des instructions précises. Voici le guide générique.",
      emptySearch: "Recherchez une marque, un modèle, un code ou un problème pour recevoir des instructions précises."
    },

    legacyLabels: {
      typeError: "Erreur technique",
      typeWarning: "Contrôle requis",
      typeStatus: "État / rappel",
      typeMessage: "Message",
      actionAssistance: "Contacter l'assistance",
      actionStop: "Éteindre, débrancher et vérifier",
      actionCheck: "Vérifier et reprendre",
      actionManual: "Vérifier le manuel",
      sourceModel: "Modèle source :"
    },

    diagnosticSearch: {
      noResults: "Aucun résultat trouvé.",
      resultsFound: "{n} résultats trouvés. Utilisez les flèches pour naviguer.",
      otherBrand: "Autre",
      noMatch: "Aucun modèle trouvé. Vous pouvez consulter le guide général ou signaler la marque/le modèle.",
      unknownBrand: "Marque pas encore dans notre base de données. Nous affichons le guide générique et vous pouvez signaler le modèle.",
      openGuide: "Ouvrir le guide général",
      signalModel: "Signaler la marque ou le modèle"
    },

    disclaimer: {
      title: "Avis important",
      text1: "Les informations sur cette page sont fournies à titre indicatif et informatif. La signification des codes d'erreur peut varier selon la marque, le modèle, le marché et la version de l'appareil.",
      text2: "Consultez toujours le manuel officiel de votre modèle et, en cas de doute, contactez le service client autorisé. N'ouvrez pas, ne modifiez pas et ne réparez pas l'appareil si vous n'êtes pas qualifié pour le faire.",
      text3: "Crispissimo n'est pas affilié, soutenu ou autorisé par les fabricants mentionnés, sauf indication contraire."
    },

    modelCard: {
      codesInDoc: "Codes dans le document",
      textualGuide: "Guide textuel des problèmes",
      mainFeatures: "Caractéristiques principales",
      showAllFeatures: "Afficher toutes les caractéristiques",
      documentedErrors: "Erreurs et messages documentés",
      noDisplayCodes: "Aucun code d'affichage documenté",
      commonProblems: "Problèmes courants et solutions",
      docSuggestions: "Suggestions du document et des instructions du modèle"
    }
  }
};
