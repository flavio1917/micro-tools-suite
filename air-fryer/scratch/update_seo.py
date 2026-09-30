import sys

content = open('src/data/i18n/page-errors-seo.ts', encoding='utf-8').read()

# Replace interface
content = content.replace('  faqs: FAQItem[];\n}', '  faqs: FAQItem[];\n  brandFaqsTemplate?: FAQItem[];\n  modelFaqsTemplate?: FAQItem[];\n}')

# Add templates
it_block = '''      {
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
  en: {'''

en_block = '''      {
        question: "When should I contact support?",
        answer: "If the error persists after a restart, if you notice abnormal smoke, or if there are persistent smells of burning components."
      }
    ],
    brandFaqsTemplate: [
      {
        question: "What does the E1 code mean on a {brand} air fryer?",
        answer: "The E1 code on {brand} usually indicates a temperature sensor issue (open or short circuit). Check your specific manual and contact support if it persists."
      },
      {
        question: "How do I reset my {brand} air fryer?",
        answer: "To reset your {brand} air fryer, unplug it from the wall outlet for at least 15-20 minutes, then plug it back in. This hard reset clears many temporary glitches."
      },
      {
        question: "Why is my {brand} producing white smoke?",
        answer: "White smoke is often caused by excessively greasy food. Add a couple of tablespoons of water to the bottom of the {brand} basket before cooking to prevent grease from burning."
      },
      {
        question: "How long is the warranty for {brand} air fryers?",
        answer: "{brand} typically offers a 2-year warranty on their appliances, but we recommend checking your receipt or the official website for exact terms."
      }
    ],
    modelFaqsTemplate: [
      {
        question: "What do E1 or E2 mean on {brand} {model}?",
        answer: "The E1 and E2 codes on {brand} {model} usually signal a thermal sensor anomaly or failure. Stop using it and unplug the device before seeking assistance."
      },
      {
        question: "How to clean the heating element of {brand} {model}?",
        answer: "Turn your {brand} {model} upside down when cold and unplugged. Use a soft sponge with warm water and a tiny bit of dish soap to gently clean the heating element."
      },
      {
        question: "Can I use parchment paper in {brand} {model}?",
        answer: "Yes, you can use parchment paper in {brand} {model}, but never put it in empty during preheating. Always place heavy food on top to prevent it from flying into the heating element."
      },
      {
        question: "Where can I find the {brand} {model} manual?",
        answer: "You can find the original manual for {brand} {model} on the manufacturer's official website, or check the specific guides on this page to solve common problems."
      }
    ]
  },
  es: {'''

es_block = '''      {
        question: "¿Cuándo contactar al servicio técnico?",
        answer: "Si el error persiste después de reiniciar, si hay humo anormal o si notas olores persistentes a componentes quemados."
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
  fr: {'''

fr_block = '''      {
        question: "Quand contacter l’assistance ?",
        answer: "Si l'erreur persiste après un redémarrage, si vous remarquez une fumée anormale ou des odeurs persistantes de composants brûlés."
      }
    ],
    brandFaqsTemplate: [
      {
        question: "Que signifie le code E1 sur une friteuse {brand} ?",
        answer: "Le code E1 sur {brand} indique généralement un problème de capteur de température (circuit ouvert ou court-circuit). Consultez votre manuel et contactez l'assistance si le problème persiste."
      },
      {
        question: "Comment réinitialiser ma friteuse à air {brand} ?",
        answer: "Pour réinitialiser votre friteuse {brand}, débranchez-la de la prise murale pendant au moins 15-20 minutes, puis rebranchez-la. Ce redémarrage résout de nombreuses erreurs temporaires."
      },
      {
        question: "Pourquoi ma friteuse {brand} fait-elle de la fumée blanche ?",
        answer: "La fumée blanche est souvent causée par des aliments trop gras. Ajoutez quelques cuillères à soupe d'eau au fond du panier de votre {brand} avant la cuisson pour empêcher la graisse de brûler."
      },
      {
        question: "Quelle est la durée de la garantie pour les friteuses {brand} ?",
        answer: "{brand} offre généralement une garantie de 2 ans sur ses appareils, mais nous vous recommandons de vérifier votre reçu ou le site officiel pour les conditions exactes."
      }
    ],
    modelFaqsTemplate: [
      {
        question: "Que signifient E1 ou E2 sur {brand} {model} ?",
        answer: "Les codes E1 et E2 sur {brand} {model} signalent généralement une anomalie ou une panne du capteur thermique. Arrêtez de l'utiliser et débranchez l'appareil avant de demander de l'aide."
      },
      {
        question: "Comment nettoyer la résistance de {brand} {model} ?",
        answer: "Retournez votre {brand} {model} à froid et débranchée. Utilisez une éponge douce avec de l'eau tiède et très peu de liquide vaisselle pour nettoyer doucement la résistance."
      },
      {
        question: "Puis-je utiliser du papier sulfurisé dans {brand} {model} ?",
        answer: "Oui, vous pouvez utiliser du papier sulfurisé dans {brand} {model}, mais ne l'insérez jamais vide pendant le préchauffage. Placez toujours des aliments lourds dessus pour éviter qu'il ne s'envole vers la résistance."
      },
      {
        question: "Où trouver le manuel de {brand} {model} ?",
        answer: "Vous pouvez trouver le manuel original de {brand} {model} sur le site officiel du fabricant, ou consulter les guides spécifiques sur cette page pour résoudre les problèmes courants."
      }
    ]
  }
};'''

content = content.replace('''      {
        question: "Quando contattare l’assistenza?",
        answer: "Se l'errore persiste dopo il riavvio, se si verificano fumo anomalo o se si avvertono odori persistenti di componenti bruciati."
      }
    ]
  },
  en: {''', it_block)

content = content.replace('''      {
        question: "When should I contact support?",
        answer: "If the error persists after a restart, if you notice abnormal smoke, or if there are persistent smells of burning components."
      }
    ]
  },
  es: {''', en_block)

content = content.replace('''      {
        question: "¿Cuándo contactar al servicio técnico?",
        answer: "Si el error persiste después de reiniciar, si hay humo anormal o si notas olores persistentes a componentes quemados."
      }
    ]
  },
  fr: {''', es_block)

content = content.replace('''      {
        question: "Quand contacter l’assistance ?",
        answer: "Si l'erreur persiste après un redémarrage, si vous remarquez une fumée anormale ou des odeurs persistantes de composants brûlés."
      }
    ]
  }
};''', fr_block)

with open('src/data/i18n/page-errors-seo.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Replaced content in page-errors-seo.ts')
