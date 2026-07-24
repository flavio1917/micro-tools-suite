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
    actionManualCheck: "CONSULTA IL MANUALE"
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
    actionManualCheck: "CONSULT MANUAL"
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
    actionManualCheck: "CONSULTAR MANUAL"
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
    actionManualCheck: "CONSULTER LE MANUEL"
  }
};
