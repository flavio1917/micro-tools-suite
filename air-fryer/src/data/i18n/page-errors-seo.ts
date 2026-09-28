export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageErrorsSeoData {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  modelMetaTitle?: string;
  modelMetaDescription?: string;
  modelH1?: string;
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
    metaTitle: "Codici errore friggitrice ad aria: E1, E2, E3, E4 e reset | Crispissimo",
    metaDescription: "Scopri il significato dei codici di errore della friggitrice ad aria, come fare un riavvio sicuro e dove trovare errori documentati per Philips, Cosori e Xiaomi.",
    h1: "Codici errore friggitrice ad aria: significato e soluzioni",
    modelMetaTitle: "{brand} {model}: Codici Errore e Soluzioni | Crispissimo",
    modelMetaDescription: "Scopri codici errore, problemi comuni, controlli sicuri e manuale ufficiale di {brand} {model}.",
    modelH1: "Codici errore e problemi {brand} {model}",
    introParagraph: "Questa pagina ti aiuta a interpretare i codici e messaggi di errore della tua friggitrice ad aria. Selezionando marca e modello potrai consultare informazioni documentate; la guida generica serve per orientamento se il modello non è presente. Ricorda che lo stesso codice può cambiare fra marche e modelli.",
    usefulResourcesTitle: "Risorse Utili",
    linkCleaning: "Come pulire la friggitrice ad aria",
    linkCleaningUrl: "/strumenti/pulire-resistenza-friggitrice-ad-aria",
    linkConverter: "Convertitore tempi e gradi forno",
    linkConverterUrl: "/convertitore",
    linkRecipes: "Ricette base per iniziare",
    linkRecipesUrl: "/#ricettario",
    breadcrumbHome: "Home",
    breadcrumbTools: "Strumenti",
    breadcrumbCurrent: "Codici Errore",
    faqs: [
      {
        question: "Cosa può significare un codice E1, E2, E3 o E4?",
        answer: "Questi codici indicano spesso anomalie nei sensori termici (circuito aperto o in corto) o malfunzionamenti. È sconsigliato l'uso finché non viene risolto il problema."
      },
      {
        question: "Perché lo stesso codice può cambiare da una marca all’altra?",
        answer: "Perché ogni produttore usa schede e software differenti. Ad esempio, E1 potrebbe essere il sensore per una marca e un errore ventola per un'altra."
      },
      {
        question: "Come fare un riavvio sicuro?",
        answer: "Scollega la friggitrice dalla presa elettrica, aspetta che si raffreddi per almeno 15-20 minuti, poi ricollegala e verifica se l'errore scompare."
      },
      {
        question: "Quando contattare l’assistenza?",
        answer: "Se l'errore persiste dopo il riavvio, se si verificano fumo anomalo o se si avvertono odori persistenti di componenti bruciati."
      }
    ]
  },
  en: {
    metaTitle: "Air Fryer Error Codes: E1, E2, E3, E4 Meanings and Reset | Crispissimo",
    metaDescription: "Understand air fryer error codes, learn how to perform a safe restart, and check documented errors for Philips, Cosori and Xiaomi models.",
    h1: "Air Fryer Error Codes: Meanings and Solutions",
    modelMetaTitle: "{brand} {model}: Error Codes and Solutions | Crispissimo",
    modelMetaDescription: "Discover error codes, common problems, safety checks and official manual for {brand} {model}.",
    modelH1: "{brand} {model} Error Codes and Problems",
    introParagraph: "This page helps you interpret error codes and messages on your air fryer. By selecting the brand and model, you can check documented information; our generic guide can help you navigate if your model is not listed. Remember that the same code can have different meanings depending on the manufacturer.",
    usefulResourcesTitle: "Useful Resources",
    linkCleaning: "How to clean the air fryer",
    linkCleaningUrl: "/en/tools/clean-air-fryer-heating-element",
    linkConverter: "Oven time and temperature converter",
    linkConverterUrl: "/en/converter",
    linkRecipes: "Basic recipes to get started",
    linkRecipesUrl: "/en/#ricettario",
    breadcrumbHome: "Home",
    breadcrumbTools: "Tools",
    breadcrumbCurrent: "Error Codes",
    faqs: [
      {
        question: "What can an E1, E2, E3 or E4 code mean?",
        answer: "These codes often indicate anomalies in the thermal sensors (open or short circuit) or malfunctions. It is not recommended to use the appliance until the issue is resolved."
      },
      {
        question: "Why can the same code vary from one brand to another?",
        answer: "Because each manufacturer uses different boards and software. For example, E1 could mean a sensor issue for one brand and a fan error for another."
      },
      {
        question: "How to perform a safe restart?",
        answer: "Unplug the air fryer from the electrical outlet, wait for it to cool down for at least 15-20 minutes, then plug it back in and see if the error disappears."
      },
      {
        question: "When to contact customer support?",
        answer: "If the error persists after a restart, if there is abnormal smoke, or if you notice persistent smells of burnt components."
      }
    ]
  },
  es: {
    metaTitle: "Códigos de error freidora de aire: E1, E2, E3, E4 y reinicio | Crispissimo",
    metaDescription: "Consulta qué significan los códigos de error de la freidora de aire, cómo reiniciarla de forma segura y errores documentados de Philips, Cosori y Xiaomi.",
    h1: "Códigos de error de freidora de aire: significado y soluciones",
    modelMetaTitle: "{brand} {model}: Códigos de error y soluciones | Crispissimo",
    modelMetaDescription: "Descubra los códigos de error, problemas comunes, controles de seguridad y manual oficial de {brand} {model}.",
    modelH1: "Códigos de error y problemas de {brand} {model}",
    introParagraph: "Esta página te ayuda a interpretar los códigos y mensajes de error de tu freidora de aire. Seleccionando la marca y el modelo podrás consultar información documentada; la guía genérica sirve de orientación si tu modelo no está presente. Recuerda que el mismo código puede cambiar entre marcas y modelos.",
    usefulResourcesTitle: "Recursos Útiles",
    linkCleaning: "Cómo limpiar la freidora de aire",
    linkCleaningUrl: "/es/herramientas/limpiar-resistencia-freidora-aire",
    linkConverter: "Conversor de tiempos y temperaturas",
    linkConverterUrl: "/es/convertidor",
    linkRecipes: "Recetas básicas para empezar",
    linkRecipesUrl: "/es/#ricettario",
    breadcrumbHome: "Inicio",
    breadcrumbTools: "Herramientas",
    breadcrumbCurrent: "Códigos de Error",
    faqs: [
      {
        question: "¿Qué puede significar un código E1, E2, E3 o E4?",
        answer: "Estos códigos indican a menudo anomalías en los sensores térmicos o fallos de funcionamiento. Se desaconseja el uso hasta que se resuelva el problema."
      },
      {
        question: "¿Por qué el mismo código puede cambiar de una marca a otra?",
        answer: "Porque cada fabricante utiliza componentes y software diferentes. Por ejemplo, E1 podría referirse a un sensor para una marca y a un ventilador para otra."
      },
      {
        question: "¿Cómo hacer un reinicio seguro?",
        answer: "Desenchufa la freidora de la toma eléctrica, espera a que se enfríe durante al menos 15-20 minutos, luego vuelve a conectarla y verifica si el error desaparece."
      },
      {
        question: "¿Cuándo contactar al servicio de asistencia?",
        answer: "Si el error persiste después del reinicio, si hay humo anormal, o si notas olores persistentes a componentes quemados."
      }
    ]
  },
  fr: {
    metaTitle: "Codes d’erreur friteuse à air : E1, E2, E3, E4 et réinitialisation | Crispissimo",
    metaDescription: "Découvrez la signification des codes d’erreur de votre friteuse à air, comment la réinitialiser en sécurité et les erreurs documentées Philips, Cosori et Xiaomi.",
    h1: "Codes d’erreur friteuse à air : signification et solutions",
    modelMetaTitle: "{brand} {model} : Codes d'erreur et Solutions | Crispissimo",
    modelMetaDescription: "Découvrez les codes d'erreur, problèmes courants, contrôles de sécurité et le manuel officiel de {brand} {model}.",
    modelH1: "Codes d'erreur et problèmes {brand} {model}",
    introParagraph: "Cette page vous aide à interpréter les codes et messages d'erreur de votre friteuse à air. En sélectionnant la marque et le modèle, vous pourrez consulter des informations documentées ; le guide générique sert d'orientation si le modèle n'est pas présent. Rappelez-vous que le même code peut changer entre les marques et les modèles.",
    usefulResourcesTitle: "Ressources Utiles",
    linkCleaning: "Comment nettoyer la friteuse à air",
    linkCleaningUrl: "/fr/outils/nettoyer-resistance-friteuse-air",
    linkConverter: "Convertisseur de temps et température",
    linkConverterUrl: "/fr/convertisseur",
    linkRecipes: "Recettes de base pour commencer",
    linkRecipesUrl: "/fr/#ricettario",
    breadcrumbHome: "Accueil",
    breadcrumbTools: "Outils",
    breadcrumbCurrent: "Codes d'Erreur",
    faqs: [
      {
        question: "Que peut signifier un code E1, E2, E3 ou E4 ?",
        answer: "Ces codes indiquent souvent des anomalies des capteurs thermiques ou des courts-circuits. L'utilisation est déconseillée jusqu'à ce que le problème soit résolu."
      },
      {
        question: "Pourquoi le même code peut-il changer d'une marque à l'autre ?",
        answer: "Parce que chaque fabricant utilise des composants et des logiciels différents. Par exemple, E1 pourrait indiquer un capteur pour une marque et un problème de ventilateur pour une autre."
      },
      {
        question: "Comment effectuer un redémarrage en toute sécurité ?",
        answer: "Débranchez la friteuse de la prise électrique, attendez au moins 15 à 20 minutes qu'elle refroidisse, puis rebranchez-la pour voir si l'erreur disparaît."
      },
      {
        question: "Quand contacter le service client ?",
        answer: "Si l'erreur persiste après un redémarrage, s'il y a de la fumée anormale, ou si vous remarquez des odeurs persistantes de composants brûlés."
      }
    ]
  }
};
