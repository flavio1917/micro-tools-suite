export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageErrorsSeoData {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introParagraph: string;
  usefulResourcesTitle: string;
  linkCleaning: string;
  linkCleaningUrl: string;
  linkConverter: string;
  linkConverterUrl: string;
  linkRecipes: string;
  linkRecipesUrl: string;
  breadcrumbHome: string;
  breadcrumbTools: string;
  breadcrumbCurrent: string;
  faqs: FAQItem[];
}

export const pageErrorsSeoTranslations: Record<string, PageErrorsSeoData> = {
  it: {
    metaTitle: "Codici errore friggitrice ad aria: significato, reset e soluzioni | Crispissimo",
    metaDescription: "Scopri il significato dei codici di errore (E1, E2, Pot, ecc.) della tua friggitrice ad aria. Diagnostica i problemi più comuni e trova la soluzione ufficiale.",
    h1: "Diagnostica e Codici Errore Friggitrice ad Aria",
    introParagraph: "La tua friggitrice ad aria mostra un codice sul display, emette fumo bianco o semplicemente non si accende? Usa il nostro motore di ricerca per trovare il significato dell'errore, le cause più comuni e la procedura di reset o soluzione suggerita dal produttore.",
    usefulResourcesTitle: "Risorse Utili",
    linkCleaning: "Come pulire la friggitrice ad aria",
    linkCleaningUrl: "/it/guide/pulizia",
    linkConverter: "Convertitore tempi e gradi forno",
    linkConverterUrl: "/it/strumenti/convertitore",
    linkRecipes: "Ricette base per iniziare",
    linkRecipesUrl: "/it/ricette/base",
    breadcrumbHome: "Home",
    breadcrumbTools: "Strumenti",
    breadcrumbCurrent: "Codici Errore",
    faqs: [
      {
        question: "Cosa fare se compare l'errore E1 o E2?",
        answer: "I codici E1 ed E2 indicano generalmente un'anomalia nel circuito del sensore termico (circuito aperto o cortocircuito). È sconsigliato l'uso e si raccomanda di scollegare la presa e contattare il centro assistenza."
      },
      {
        question: "Perché esce fumo bianco dalla friggitrice ad aria?",
        answer: "Il fumo bianco è tipicamente causato da grasso o olio in eccesso che cola sul fondo del cestello e brucia. Si consiglia di spegnere l'apparecchio, pulire il cestello e riprendere la cottura senza cibi eccessivamente grassi."
      },
      {
        question: "Cosa indica il messaggio 'Pot' sul display?",
        answer: "In molti modelli il messaggio 'Pot' segnala che il cestello non è inserito correttamente o non è chiuso fino in fondo. Controlla e reinserisci il cestello con decisione fino allo scatto."
      }
    ]
  },
  en: {
    metaTitle: "Air Fryer Error Codes: Meaning, Reset and Solutions | Crispissimo",
    metaDescription: "Discover the meaning of error codes (E1, E2, Pot, etc.) of your air fryer. Diagnose common problems and find the official solution.",
    h1: "Air Fryer Diagnostics and Error Codes",
    introParagraph: "Does your air fryer show a code on the display, emit white smoke or simply won't turn on? Use our search engine to find the meaning of the error, the most common causes and the reset or solution procedure suggested by the manufacturer.",
    usefulResourcesTitle: "Useful Resources",
    linkCleaning: "How to clean the air fryer",
    linkCleaningUrl: "/en/guides/cleaning",
    linkConverter: "Oven time and temperature converter",
    linkConverterUrl: "/en/tools/converter",
    linkRecipes: "Basic recipes to get started",
    linkRecipesUrl: "/en/recipes/basics",
    breadcrumbHome: "Home",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "Error Codes",
    faqs: [
      {
        question: "What to do if E1 or E2 error appears?",
        answer: "Codes E1 and E2 generally indicate an anomaly in the thermal sensor circuit (open or short circuit). It is not recommended to use the appliance; you should unplug it and contact customer service."
      },
      {
        question: "Why is white smoke coming out of the air fryer?",
        answer: "White smoke is typically caused by excess fat or oil dripping to the bottom of the basket and burning. It is advisable to turn off the appliance, clean the basket and resume cooking without excessively greasy foods."
      },
      {
        question: "What does the 'Pot' message on the display indicate?",
        answer: "In many models, the 'Pot' message indicates that the basket is not inserted correctly or is not completely closed. Check and firmly reinsert the basket until it clicks."
      }
    ]
  },
  es: {
    metaTitle: "Códigos de error de la freidora de aire: significado y soluciones | Crispissimo",
    metaDescription: "Descubra el significado de los códigos de error (E1, E2, Pot, etc.) de su freidora de aire. Diagnostique problemas comunes y encuentre la solución.",
    h1: "Diagnóstico y Códigos de Error de Freidora de Aire",
    introParagraph: "¿Tu freidora de aire muestra un código en la pantalla, emite humo blanco o simplemente no enciende? Usa nuestro buscador para encontrar el significado del error, las causas más comunes y el procedimiento de reinicio o solución sugerido.",
    usefulResourcesTitle: "Recursos Útiles",
    linkCleaning: "Cómo limpiar la freidora de aire",
    linkCleaningUrl: "/es/guias/limpieza",
    linkConverter: "Conversor de tiempos y temperaturas",
    linkConverterUrl: "/es/herramientas/conversor",
    linkRecipes: "Recetas básicas para empezar",
    linkRecipesUrl: "/es/recetas/basicas",
    breadcrumbHome: "Inicio",
    breadcrumbTools: "Herramientas",
    breadcrumbCurrent: "Códigos de Error",
    faqs: [
      {
        question: "¿Qué hacer si aparece el error E1 o E2?",
        answer: "Los códigos E1 y E2 indican generalmente una anomalía en el circuito del sensor térmico. Se recomienda no usar el aparato, desenchufarlo y contactar al centro de asistencia."
      },
      {
        question: "¿Por qué sale humo blanco de la freidora?",
        answer: "El humo blanco suele ser causado por el exceso de grasa o aceite que gotea en el fondo y se quema. Se recomienda apagar, limpiar la cesta y evitar alimentos demasiado grasos."
      },
      {
        question: "¿Qué indica el mensaje 'Pot' en la pantalla?",
        answer: "En muchos modelos el mensaje 'Pot' señala que la cesta no está bien insertada o cerrada. Revise y vuelva a insertar la cesta firmemente hasta que encaje."
      }
    ]
  },
  fr: {
    metaTitle: "Codes d'erreur de la friteuse à air : signification et solutions | Crispissimo",
    metaDescription: "Découvrez la signification des codes d'erreur (E1, E2, Pot, etc.) de votre friteuse à air. Diagnostiquez les problèmes et trouvez la solution officielle.",
    h1: "Diagnostic et Codes d'Erreur Friteuse à Air",
    introParagraph: "Votre friteuse à air affiche un code sur l'écran, émet de la fumée blanche ou ne s'allume pas ? Utilisez notre moteur de recherche pour trouver la signification de l'erreur, les causes les plus courantes et la procédure de réinitialisation ou la solution.",
    usefulResourcesTitle: "Ressources Utiles",
    linkCleaning: "Comment nettoyer la friteuse à air",
    linkCleaningUrl: "/fr/guides/nettoyage",
    linkConverter: "Convertisseur de temps et température",
    linkConverterUrl: "/fr/outils/convertisseur",
    linkRecipes: "Recettes de base pour commencer",
    linkRecipesUrl: "/fr/recettes/base",
    breadcrumbHome: "Accueil",
    breadcrumbTools: "Outils",
    breadcrumbCurrent: "Codes d'Erreur",
    faqs: [
      {
        question: "Que faire si l'erreur E1 ou E2 apparaît ?",
        answer: "Les codes E1 et E2 indiquent généralement une anomalie dans le circuit du capteur thermique. Il n'est pas recommandé d'utiliser l'appareil ; débranchez-le et contactez le service client."
      },
      {
        question: "Pourquoi de la fumée blanche sort-elle de la friteuse à air ?",
        answer: "La fumée blanche est généralement causée par un excès de graisse ou d'huile qui coule au fond et brûle. Il est conseillé d'éteindre l'appareil, de nettoyer le panier et de reprendre la cuisson avec des aliments moins gras."
      },
      {
        question: "Que signifie le message 'Pot' sur l'écran ?",
        answer: "Dans de nombreux modèles, le message 'Pot' indique que le panier n'est pas inséré correctement ou n'est pas complètement fermé. Vérifiez et réinsérez fermement le panier jusqu'au clic."
      }
    ]
  }
};
