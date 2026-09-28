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
  brandMetaTitle?: string;
  brandMetaDescription?: string;
  brandH1?: string;
  brandIntro?: string;
  brandsTitle?: string;
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
  brandFaqsTemplate?: FAQItem[];
  modelFaqsTemplate?: FAQItem[];
}

export const pageErrorsSeoTranslations: Record<string, PageErrorsSeoData> = {
  it: {
    metaTitle: "Codici errore friggitrice ad aria: E1, E2, E3, E4 e reset | Crispissimo",
    metaDescription: "Scopri il significato dei codici di errore della friggitrice ad aria, come fare un riavvio sicuro e dove trovare errori documentati per Philips, Cosori e Xiaomi.",
    h1: "Codici errore friggitrice ad aria: significato e soluzioni",
    modelMetaTitle: "{brand} {model}: Codici Errore e Soluzioni | Crispissimo",
    modelMetaDescription: "Scopri codici errore, problemi comuni, controlli sicuri e manuale ufficiale di {brand} {model}.",
    modelH1: "Codici errore e problemi {brand} {model}",
    brandMetaTitle: "Codici errore friggitrice ad aria {brand} e soluzioni | Crispissimo",
    brandMetaDescription: "Scopri cosa significano i codici di errore delle friggitrici {brand}, come eseguire un riavvio sicuro e quali modelli sono documentati.",
    brandH1: "Soluzioni per codici errore e problemi delle friggitrici {brand}",
    brandIntro: "Questa guida raccoglie i principali codici di errore documentati per le friggitrici ad aria {brand}. I dati derivano da fonti neutrali e manuali: seleziona il tuo modello per diagnosticare problemi e scoprire come forzare un riavvio sicuro, senza finte promesse di riparazioni fai-da-te.",
    brandsTitle: "Marche Documentate",
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
    ],
    brandFaqsTemplate: [
      {
        question: "Cosa significa il codice E1 su una friggitrice {brand}?",
        answer: "Il codice E1 su {brand} indica solitamente un problema al sensore di temperatura (circuito interrotto o in corto). Verifica il manuale specifico e contatta l'assistenza se l'errore persiste."
      },
      {
        question: "Come posso resettare la mia friggitrice ad aria {brand}?",
        answer: "Per resettare la tua friggitrice {brand}, scollega la spina dalla presa elettrica per almeno 15-20 minuti, poi ricollegala. Questo hard reset risolve molti errori temporanei."
      },
      {
        question: "Perché la friggitrice {brand} fa fumo bianco?",
        answer: "Il fumo bianco è spesso causato da cibi troppo grassi. Aggiungi un paio di cucchiai d'acqua sul fondo del cestello della tua {brand} prima della cottura per evitare che il grasso bruci."
      },
      {
        question: "Quanto dura la garanzia per le friggitrici {brand}?",
        answer: "Generalmente {brand} offre 2 anni di garanzia sui propri elettrodomestici, ma ti consigliamo di verificare lo scontrino o il sito ufficiale per i termini esatti."
      }
    ],
    modelFaqsTemplate: [
      {
        question: "Cosa significa E1 o E2 su {brand} {model}?",
        answer: "I codici E1 e E2 su {brand} {model} segnalano solitamente un'anomalia o un guasto al sensore termico. Evita l'uso e scollega il dispositivo prima di richiedere assistenza."
      },
      {
        question: "Come pulire la resistenza di {brand} {model}?",
        answer: "Capovolgi la friggitrice {brand} {model} a freddo e scollegata. Usa una spugna morbida con acqua calda e pochissimo detersivo per piatti per pulire delicatamente la resistenza."
      },
      {
        question: "Posso usare la carta forno in {brand} {model}?",
        answer: "Sì, puoi usare la carta forno in {brand} {model}, ma non inserirla mai vuota durante il preriscaldamento. Metti sempre del cibo pesante sopra per evitare che voli contro la resistenza."
      },
      {
        question: "Dove trovare il manuale di {brand} {model}?",
        answer: "Puoi trovare il manuale originale di {brand} {model} sul sito ufficiale del produttore o controllare le guide specifiche per il tuo modello in questa pagina per risolvere problemi comuni."
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
    brandMetaTitle: "{brand} Air Fryer Error Codes and Solutions | Crispissimo",
    brandMetaDescription: "Find out what the error codes mean for {brand} air fryers, how to safely reset your appliance, and the list of documented models.",
    brandH1: "{brand} Air Fryers Error Codes and Troubleshooting",
    brandIntro: "This guide collects the main documented error codes for {brand} air fryers. The data comes from neutral sources and manuals: select your model to diagnose problems and find out how to safely restart the unit.",
    brandsTitle: "Documented Brands",
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
    brandMetaTitle: "Códigos de error freidora de aire {brand} y soluciones | Crispissimo",
    brandMetaDescription: "Descubre qué significan los errores y códigos de las freidoras {brand}, cómo realizar un reinicio seguro y qué modelos están documentados.",
    brandH1: "Soluciones a códigos de error y problemas en freidoras {brand}",
    brandIntro: "Esta guía recopila los principales códigos de error documentados para freidoras de aire {brand}. Los datos provienen de fuentes neutrales: selecciona tu modelo para diagnosticar problemas y descubrir cómo forzar un reinicio seguro.",
    brandsTitle: "Marcas Documentadas",
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
    ],
    brandFaqsTemplate: [
      {
        question: "¿Qué significa el código E1 en una freidora {brand}?",
        answer: "El código E1 en {brand} suele indicar un problema con el sensor de temperatura. Revisa tu manual específico y contacta al servicio técnico si persiste."
      },
      {
        question: "¿Cómo puedo reiniciar mi freidora de aire {brand}?",
        answer: "Para reiniciar tu freidora {brand}, desenchúfala de la toma de corriente durante al menos 15-20 minutos y vuelve a conectarla. Este reinicio soluciona muchos errores temporales."
      },
      {
        question: "¿Por qué mi freidora {brand} echa humo blanco?",
        answer: "El humo blanco suele deberse a alimentos muy grasos. Añade un par de cucharadas de agua en el fondo de la cesta de tu {brand} antes de cocinar para evitar que la grasa se queme."
      },
      {
        question: "¿Cuánto dura la garantía de las freidoras {brand}?",
        answer: "{brand} generalmente ofrece 2 años de garantía en sus electrodomésticos, pero te recomendamos comprobar tu recibo o el sitio web oficial para conocer las condiciones exactas."
      }
    ],
    modelFaqsTemplate: [
      {
        question: "¿Qué significan E1 o E2 en {brand} {model}?",
        answer: "Los códigos E1 y E2 en {brand} {model} suelen señalar una anomalía o fallo en el sensor térmico. Deja de usarla y desenchufa el dispositivo antes de solicitar asistencia."
      },
      {
        question: "¿Cómo limpiar la resistencia de {brand} {model}?",
        answer: "Pon tu {brand} {model} boca abajo cuando esté fría y desenchufada. Usa una esponja suave con agua tibia y un poco de jabón para limpiar suavemente la resistencia."
      },
      {
        question: "¿Puedo usar papel de horno en {brand} {model}?",
        answer: "Sí, puedes usar papel de horno en {brand} {model}, pero nunca lo pongas vacío durante el precalentamiento. Pon siempre comida pesada encima para evitar que vuele hacia la resistencia."
      },
      {
        question: "¿Dónde encontrar el manual de {brand} {model}?",
        answer: "Puedes encontrar el manual original de {brand} {model} en el sitio web oficial del fabricante, o consultar las guías específicas en esta página para resolver problemas comunes."
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
    brandMetaTitle: "Codes d'erreur friteuse à air {brand} et solutions | Crispissimo",
    brandMetaDescription: "Découvrez la signification des codes d'erreur des friteuses {brand}, comment effectuer un redémarrage sécurisé et quels modèles sont documentés.",
    brandH1: "Solutions aux codes d'erreur et problèmes des friteuses {brand}",
    brandIntro: "Ce guide rassemble les principaux codes d'erreur documentés pour les friteuses à air {brand}. Les données proviennent de sources neutres : sélectionnez votre modèle pour diagnostiquer les problèmes et découvrir comment forcer un redémarrage en toute sécurité.",
    brandsTitle: "Marques Documentées",
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

export const modelMetaTemplate: Record<string, string> = {
  it: "Consulta i codici errore documentati per {model}: scopri come eseguire un riavvio sicuro e le soluzioni definitive ai guasti E1, E2, E3, E4 e altri.",
  en: "Check the documented error codes for {model}: discover how to perform a safe restart and find definitive solutions for E1, E2, E3, E4 and other faults.",
  es: "Consulta los códigos de error documentados para {model}: descubre cómo reiniciar de forma segura y las soluciones definitivas a los fallos E1, E2, E3, E4.",
  fr: "Consultez les codes d'erreur documentés pour {model} : découvrez comment redémarrer en sécurité et les solutions définitives aux pannes E1, E2, E3, E4."
};
