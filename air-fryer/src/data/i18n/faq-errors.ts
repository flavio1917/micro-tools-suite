export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqErrorsTranslation {
  sectionTitle: string;
  faqs: FaqItem[];
}

export const faqErrorsTranslations: Record<string, FaqErrorsTranslation> = {
  it: {
    sectionTitle: "Domande Frequenti sui Guasti e Codici Errore",
    faqs: [
      {
        question: "Cosa fare se esce fumo bianco dalla friggitrice ad aria?",
        answer: "Il fumo bianco è causato dall'accumulo di grasso in eccesso che cola sul fondo e brucia, o da residui di cotture precedenti. Spegni l'apparecchio, lascialo raffreddare e pulisci accuratamente il cestello e la resistenza. Per evitare il problema, non cuocere cibi troppo grassi senza un po' d'acqua sul fondo."
      },
      {
        question: "Cosa significano i codici di errore E1 o E2?",
        answer: "Nella maggior parte dei modelli (es. Cosori, Innsky, Princess), i codici E1 ed E2 indicano un problema al sensore di temperatura (circuito aperto o cortocircuito). Non tentare di ripararlo da solo: scollega l'apparecchio e contatta l'assistenza clienti."
      },
      {
        question: "Come faccio a resettare la friggitrice ad aria?",
        answer: "Per un reset di base (hard reset), scollega la spina dalla presa di corrente per almeno 10-15 minuti. Questo permette ai condensatori di scaricarsi e alla scheda elettronica di riavviarsi. Se alla riaccensione l'errore persiste, l'hardware è probabilmente danneggiato."
      },
      {
        question: "Quando è strettamente necessario chiamare l'assistenza?",
        answer: "Devi contattare l'assistenza se i codici di errore (come E1, E2, E3) persistono dopo un reset e dopo che la macchina si è completamente raffreddata, oppure se noti sintomi fisici gravi come fumo nero, scintille o forte odore di plastica fusa."
      },
      {
        question: "Perché il display mostra il messaggio 'Pot' o 'Out'?",
        answer: "Questi messaggi indicano che il sensore di sicurezza non rileva la presenza del cestello. Verifica che sia inserito fino in fondo (deve fare un 'clic' metallico). Se il problema persiste, i contatti tra cestello e corpo macchina potrebbero essere sporchi o piegati."
      }
    ]
  },
  en: {
    sectionTitle: "Frequently Asked Questions about Breakdowns and Error Codes",
    faqs: [
      {
        question: "What to do if white smoke comes out of the air fryer?",
        answer: "White smoke is caused by excess fat accumulating at the bottom and burning, or by residues from previous cooking. Turn off the appliance, let it cool down, and thoroughly clean the basket and the heating element. To avoid this, do not cook overly fatty foods without a little water at the bottom."
      },
      {
        question: "What do the E1 or E2 error codes mean?",
        answer: "In most models (e.g., Cosori, Innsky, Princess), the E1 and E2 codes indicate a problem with the temperature sensor (open circuit or short circuit). Do not try to repair it yourself: unplug the appliance and contact customer support."
      },
      {
        question: "How do I reset my air fryer?",
        answer: "For a basic reset (hard reset), unplug it from the power outlet for at least 10-15 minutes. This allows the capacitors to discharge and the electronic board to reboot. If the error persists upon restarting, the hardware is likely damaged."
      },
      {
        question: "When is it absolutely necessary to call customer service?",
        answer: "You must contact support if error codes (such as E1, E2, E3) persist after a reset and after the machine has completely cooled down, or if you notice severe physical symptoms like black smoke, sparks, or a strong smell of burning plastic."
      },
      {
        question: "Why does the display show the message 'Pot' or 'Out'?",
        answer: "These messages indicate that the safety sensor does not detect the presence of the basket. Check that it is pushed all the way in (it should make a metallic 'click'). If the problem persists, the contacts between the basket and the machine body might be dirty or bent."
      }
    ]
  },
  es: {
    sectionTitle: "Preguntas Frecuentes sobre Averías y Códigos de Error",
    faqs: [
      {
        question: "¿Qué hacer si sale humo blanco de la freidora de aire?",
        answer: "El humo blanco es causado por la acumulación de grasa que gotea en el fondo y se quema, o por residuos de cocciones anteriores. Apague el aparato, déjelo enfriar y limpie a fondo la cesta y la resistencia. Para evitar el problema, no cocine alimentos muy grasos sin un poco de agua en el fondo."
      },
      {
        question: "¿Qué significan los códigos de error E1 o E2?",
        answer: "En la mayoría de los modelos (ej. Cosori, Innsky, Princess), los códigos E1 y E2 indican un problema con el sensor de temperatura (circuito abierto o cortocircuito). No intente repararlo usted mismo: desenchufe el aparato y contacte con atención al cliente."
      },
      {
        question: "¿Cómo reinicio mi freidora de aire?",
        answer: "Para un reinicio básico (hard reset), desenchufe el cable de la toma de corriente durante al menos 10-15 minutos. Esto permite que los condensadores se descarguen y la placa electrónica se reinicie. Si el error persiste al encender, el hardware probablemente esté dañado."
      },
      {
        question: "¿Cuándo es estrictamente necesario llamar al servicio técnico?",
        answer: "Debe contactar con asistencia si los códigos de error (como E1, E2, E3) persisten después de un reinicio y después de que la máquina se haya enfriado completamente, o si nota síntomas físicos graves como humo negro, chispas o un fuerte olor a plástico derretido."
      },
      {
        question: "¿Por qué la pantalla muestra el mensaje 'Pot' o 'Out'?",
        answer: "Estos mensajes indican que el sensor de seguridad no detecta la presencia de la cesta. Verifique que esté insertada hasta el fondo (debe hacer un 'clic' metálico). Si el problema persiste, los contactos entre la cesta y el cuerpo de la máquina podrían estar sucios o doblados."
      }
    ]
  },
  fr: {
    sectionTitle: "Foire Aux Questions sur les Pannes et Codes d'Erreur",
    faqs: [
      {
        question: "Que faire si de la fumée blanche sort de la friteuse à air ?",
        answer: "La fumée blanche est causée par l'accumulation de graisse qui coule au fond et brûle, ou par des résidus de cuissons précédentes. Éteignez l'appareil, laissez-le refroidir et nettoyez soigneusement le panier et la résistance. Pour éviter le problème, ne cuisinez pas d'aliments trop gras sans un peu d'eau au fond."
      },
      {
        question: "Que signifient les codes d'erreur E1 ou E2 ?",
        answer: "Dans la plupart des modèles (ex. Cosori, Innsky, Princess), les codes E1 et E2 indiquent un problème au niveau du capteur de température (circuit ouvert ou court-circuit). N'essayez pas de le réparer vous-même : débranchez l'appareil et contactez le service client."
      },
      {
        question: "Comment réinitialiser ma friteuse à air ?",
        answer: "Pour une réinitialisation de base (hard reset), débranchez la fiche de la prise de courant pendant au moins 10-15 minutes. Cela permet aux condensateurs de se décharger et à la carte électronique de redémarrer. Si l'erreur persiste au redémarrage, le matériel est probablement endommagé."
      },
      {
        question: "Quand est-il strictement nécessaire d'appeler l'assistance ?",
        answer: "Vous devez contacter l'assistance si les codes d'erreur (tels que E1, E2, E3) persistent après une réinitialisation et après que la machine ait complètement refroidi, ou si vous remarquez des symptômes physiques graves comme de la fumée noire, des étincelles ou une forte odeur de plastique fondu."
      },
      {
        question: "Pourquoi l'écran affiche-t-il le message 'Pot' ou 'Out' ?",
        answer: "Ces messages indiquent que le capteur de sécurité ne détecte pas la présence du panier. Vérifiez qu'il est enfoncé jusqu'au bout (il doit faire un 'clic' métallique). Si le problème persiste, les contacts entre le panier et le corps de la machine pourraient être sales ou tordus."
      }
    ]
  }
};
