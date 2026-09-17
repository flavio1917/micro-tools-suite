export interface GenericGuidance {
  commonSymptoms: { symptom: string; advice: string }[];
  generalSafetySteps: string[];
  genericCodeGuidance: { code: string; meaning: string }[];
  disclaimer: string;
}

export const genericAirFryerGuidance: Record<'it'|'en'|'fr'|'es', GenericGuidance> = {
  it: {
    disclaimer: "E1, E2, E3 e altri codici non hanno un significato universale: cambiano in base a marca, modello e versione. Usa questa guida solo per orientarti e verifica sempre il manuale della tua friggitrice.",
    generalSafetySteps: [
      "Spegnere e scollegare la friggitrice dalla presa di corrente.",
      "Attendere che l'apparecchio si raffreddi completamente.",
      "Controllare che cestello, cassetto, coperchio o sonda siano inseriti e chiusi correttamente.",
      "Verificare che le prese d'aria e le ventole non siano ostruite.",
      "Riaccendere solo se non ci sono fumo nero, odore intenso di bruciato, cavo danneggiato o componenti palesemente deformati."
    ],
    commonSymptoms: [
      {
        symptom: "La friggitrice non si accende",
        advice: "Verifica che la spina sia inserita saldamente e che la presa funzioni. Assicurati che il cestello sia chiuso completamente, poiché molti modelli hanno un microinterruttore di sicurezza."
      },
      {
        symptom: "Il cestello o cassetto non viene rilevato",
        advice: "Estrai e reinserisci il cestello spingendolo a fondo. Controlla che non ci siano residui di cibo che bloccano la chiusura o il sensore di contatto."
      },
      {
        symptom: "Fumo bianco durante la cottura",
        advice: "È spesso causato da cibi molto grassi (es. salsicce, pancetta). Il grasso cola sul fondo e brucia. Puoi provare ad aggiungere un cucchiaio d'acqua sul fondo del cestello esterno prima di cuocere per ridurre il fumo, o svuotare il grasso in eccesso."
      },
      {
        symptom: "Fumo nero",
        advice: "Spegnere immediatamente l'apparecchio. Potrebbe esserci del cibo incastrato sulla serpentina riscaldante superiore, oppure un potenziale guasto elettrico. Se non è causato da residui bruciati, non riutilizzare e contatta l'assistenza."
      },
      {
        symptom: "Cibo poco cotto o poco croccante",
        advice: "Non sovraccaricare il cestello. Assicurati di scuotere il cibo a metà cottura e valuta di aumentare leggermente tempi o temperatura rispetto alle istruzioni standard."
      },
      {
        symptom: "Cottura non uniforme",
        advice: "Gli alimenti si sovrappongono troppo. Cuoci in lotti più piccoli e assicurati che l'aria circoli liberamente intorno al cibo."
      },
      {
        symptom: "Errore sul display che ricompare dopo spegnimento",
        advice: "Se un errore persiste dopo aver scollegato l'apparecchio per 15-20 minuti, indica solitamente un guasto a un sensore o al circuito. Evita il fai-da-te su componenti elettrici e consulta l'assistenza."
      }
    ],
    genericCodeGuidance: [
      {
        code: "E1 / E01",
        meaning: "Riparazione Hardware (Frequente su: Cosori, Ninja, Philips). Solitamente indica un guasto al termistore NTC o al sensore di temperatura. Soluzione: scollega la friggitrice, esegui un hard reset lasciandola spenta per 15 minuti. Se il problema persiste all'accensione, è necessaria l'assistenza."
      },
      {
        code: "E2 / E02",
        meaning: "Riparazione Hardware (Frequente su: Cosori, Ariete, Moulinex). Spesso segnala un cortocircuito del sensore o un surriscaldamento grave. Soluzione: scollega immediatamente dalla corrente, verifica visivamente se le griglie di ventilazione sono libere e attendi il raffreddamento. Se ricompare, richiede riparazione."
      },
      {
        code: "E3 / E03",
        meaning: "Reset Software (Frequente su: Ninja, Generico, Proscenic). Tipicamente indica l'attivazione della protezione da surriscaldamento o un cestello mal posizionato. Soluzione: verifica l'inserimento del cestello, allontana l'apparecchio di almeno 15cm dal muro, lascialo raffreddare e riprova."
      },
      {
        code: "E4 / E04",
        meaning: "Reset Software (Frequente su: Ninja, Cosori). Spesso associato a problemi di comunicazione della scheda o anomalia della ventola/voltaggio. Soluzione: scollega l'apparecchio, controlla se la ventola gira o è ostruita. Evita prolunghe o adattatori multipli e collegala a una presa a muro."
      },
      {
        code: "Display Spento / Nessun Segnale",
        meaning: "Riparazione Hardware (Tutte le marche). Può indicare il micro-interruttore del cestello difettoso o un fusibile termico bruciato. Soluzione: assicurati di sentire il 'clic' del cestello quando viene inserito. Se non si accende in altre prese, contattare l'assistenza."
      },
      {
        code: "Altri Codici (E5, E6, ecc.)",
        meaning: "Il significato varia per marca e modello; consulta il manuale specifico. Spesso sono legati a sensori o alimentazione."
      }
    ]
  },
  en: {
    disclaimer: "E1, E2, E3, and other codes do not have a universal meaning: they vary by brand, model, and version. Use this guide only for orientation and always check your fryer's manual.",
    generalSafetySteps: [
      "Turn off and unplug the fryer from the electrical outlet.",
      "Wait for the appliance to cool down completely.",
      "Check that the basket, drawer, lid, or probe are inserted and closed correctly.",
      "Verify that the air vents and fans are not obstructed.",
      "Turn on again only if there is no black smoke, intense burning smell, damaged cord, or visibly deformed components."
    ],
    commonSymptoms: [
      {
        symptom: "The fryer will not turn on",
        advice: "Check that the plug is securely inserted and the outlet is working. Make sure the basket is completely closed, as many models have a safety microswitch."
      },
      {
        symptom: "The basket or drawer is not detected",
        advice: "Remove and reinsert the basket by pushing it all the way in. Check for any food residue blocking the closure or the contact sensor."
      },
      {
        symptom: "White smoke during cooking",
        advice: "This is often caused by very fatty foods (e.g., sausages, bacon). The fat drips to the bottom and burns. You can try adding a tablespoon of water to the bottom of the outer basket before cooking to reduce smoke, or empty excess fat."
      },
      {
        symptom: "Black smoke",
        advice: "Turn off the appliance immediately. There could be food stuck on the upper heating element, or a potential electrical fault. If it's not caused by burnt residue, do not reuse it and contact support."
      },
      {
        symptom: "Food undercooked or not crispy",
        advice: "Do not overload the basket. Make sure to shake the food halfway through cooking and consider slightly increasing the time or temperature compared to standard instructions."
      },
      {
        symptom: "Uneven cooking",
        advice: "Foods are overlapping too much. Cook in smaller batches and ensure air circulates freely around the food."
      },
      {
        symptom: "Display error reappears after turning off",
        advice: "If an error persists after unplugging the appliance for 15-20 minutes, it usually indicates a faulty sensor or circuit. Avoid DIY repairs on electrical components and consult support."
      }
    ],
    genericCodeGuidance: [
      {
        code: "E1 / E01",
        meaning: "Hardware Repair (Frequent on: Cosori, Ninja, Philips). Usually indicates a fault in the NTC thermistor or temperature sensor. Solution: unplug the fryer, perform a hard reset by leaving it off for 15 minutes. If the problem persists upon turning it on, service is required."
      },
      {
        code: "E2 / E02",
        meaning: "Hardware Repair (Frequent on: Cosori, Ariete, Moulinex). Often signals a sensor short circuit or severe overheating. Solution: unplug immediately from the power source, visually check if the ventilation grilles are clear and wait for it to cool. If it reappears, it requires repair."
      },
      {
        code: "E3 / E03",
        meaning: "Software Reset (Frequent on: Ninja, Generic, Proscenic). Typically indicates the activation of the overheating protection or a poorly positioned basket. Solution: verify the basket insertion, move the appliance at least 15cm away from the wall, let it cool, and try again."
      },
      {
        code: "E4 / E04",
        meaning: "Software Reset (Frequent on: Ninja, Cosori). Often associated with board communication problems or fan/voltage anomalies. Solution: unplug the appliance, check if the fan is spinning or obstructed. Avoid extension cords or multi-adapters and connect it to a wall outlet."
      },
      {
        code: "Display Off / No Signal",
        meaning: "Hardware Repair (All brands). May indicate a defective basket microswitch or a blown thermal fuse. Solution: make sure you hear the basket 'click' when inserted. If it doesn't turn on in other outlets, contact support."
      },
      {
        code: "Other Codes (E5, E6, etc.)",
        meaning: "The meaning varies by brand and model; consult the specific manual. They are often related to sensors or power supply."
      }
    ]
  },
  fr: {
    disclaimer: "Les codes E1, E2, E3, etc. n'ont pas une signification universelle : ils varient selon la marque, le modèle et la version. Utilisez ce guide uniquement pour vous orienter et consultez toujours le manuel de votre friteuse.",
    generalSafetySteps: [
      "Éteignez et débranchez la friteuse de la prise électrique.",
      "Attendez que l'appareil refroidisse complètement.",
      "Vérifiez que le panier, le tiroir, le couvercle ou la sonde sont insérés et fermés correctement.",
      "Vérifiez que les bouches d'aération et les ventilateurs ne sont pas obstrués.",
      "Ne rallumez que s'il n'y a pas de fumée noire, d'odeur intense de brûlé, de câble endommagé ou de composants visiblement déformés."
    ],
    commonSymptoms: [
      {
        symptom: "La friteuse ne s'allume pas",
        advice: "Vérifiez que la fiche est bien branchée et que la prise fonctionne. Assurez-vous que le panier est complètement fermé, car de nombreux modèles possèdent un micro-interrupteur de sécurité."
      },
      {
        symptom: "Le panier ou le tiroir n'est pas détecté",
        advice: "Retirez et réinsérez le panier en le poussant à fond. Vérifiez qu'il n'y a pas de résidus de nourriture bloquant la fermeture ou le capteur de contact."
      },
      {
        symptom: "Fumée blanche pendant la cuisson",
        advice: "Cela est souvent causé par des aliments très gras (ex. saucisses, bacon). La graisse coule au fond et brûle. Vous pouvez essayer d'ajouter une cuillère à soupe d'eau au fond du panier externe avant la cuisson pour réduire la fumée, ou vider l'excès de graisse."
      },
      {
        symptom: "Fumée noire",
        advice: "Éteignez immédiatement l'appareil. Il peut y avoir de la nourriture coincée sur la résistance supérieure, ou un dysfonctionnement électrique potentiel. Si ce n'est pas causé par des résidus brûlés, ne réutilisez pas l'appareil et contactez le support."
      },
      {
        symptom: "Nourriture pas assez cuite ou pas croustillante",
        advice: "Ne surchargez pas le panier. Assurez-vous de secouer la nourriture à mi-cuisson et envisagez d'augmenter légèrement le temps ou la température par rapport aux instructions standard."
      },
      {
        symptom: "Cuisson inégale",
        advice: "Les aliments se chevauchent trop. Cuisinez en plus petites quantités et assurez-vous que l'air circule librement autour de la nourriture."
      },
      {
        symptom: "L'erreur à l'écran réapparaît après l'extinction",
        advice: "Si une erreur persiste après avoir débranché l'appareil pendant 15-20 minutes, cela indique généralement un capteur ou un circuit défectueux. Évitez les réparations de bricolage sur les composants électriques et consultez le support."
      }
    ],
    genericCodeGuidance: [
      {
        code: "E1 / E01",
        meaning: "Réparation Matérielle (Fréquent sur: Cosori, Ninja, Philips). Indique généralement un défaut de la thermistance NTC ou du capteur de température. Solution : débranchez la friteuse, effectuez une réinitialisation matérielle en la laissant éteinte pendant 15 minutes. Si le problème persiste lors de l'allumage, une réparation est nécessaire."
      },
      {
        code: "E2 / E02",
        meaning: "Réparation Matérielle (Fréquent sur: Cosori, Ariete, Moulinex). Signale souvent un court-circuit du capteur ou une surchauffe sévère. Solution : débranchez immédiatement de la source d'alimentation, vérifiez visuellement si les grilles de ventilation sont dégagées et attendez qu'elle refroidisse. S'il réapparaît, cela nécessite une réparation."
      },
      {
        code: "E3 / E03",
        meaning: "Réinitialisation Logicielle (Fréquent sur: Ninja, Générique, Proscenic). Indique généralement l'activation de la protection contre la surchauffe ou un panier mal positionné. Solution : vérifiez l'insertion du panier, éloignez l'appareil d'au moins 15 cm du mur, laissez-le refroidir et réessayez."
      },
      {
        code: "E4 / E04",
        meaning: "Réinitialisation Logicielle (Fréquent sur: Ninja, Cosori). Souvent associé à des problèmes de communication de la carte ou à des anomalies de ventilateur/tension. Solution : débranchez l'appareil, vérifiez si le ventilateur tourne ou est obstrué. Évitez les rallonges ou les adaptateurs multiples et connectez-le à une prise murale."
      },
      {
        code: "Écran Éteint / Pas de Signal",
        meaning: "Réparation Matérielle (Toutes les marques). Peut indiquer un micro-interrupteur de panier défectueux ou un fusible thermique grillé. Solution : assurez-vous d'entendre le 'clic' du panier lorsqu'il est inséré. S'il ne s'allume pas sur d'autres prises, contactez le support."
      },
      {
        code: "Autres Codes (E5, E6, etc.)",
        meaning: "La signification varie selon la marque et le modèle ; consultez le manuel spécifique. Ils sont souvent liés aux capteurs ou à l'alimentation."
      }
    ]
  },
  es: {
    disclaimer: "Los códigos E1, E2, E3 y otros no tienen un significado universal: varían según la marca, modelo y versión. Utilice esta guía solo para orientarse y compruebe siempre el manual de su freidora.",
    generalSafetySteps: [
      "Apague y desconecte la freidora de la toma de corriente.",
      "Espere a que el aparato se enfríe completamente.",
      "Compruebe que la cesta, el cajón, la tapa o la sonda estén insertados y cerrados correctamente.",
      "Verifique que las rejillas de ventilación y los ventiladores no estén obstruidos.",
      "Vuelva a encender solo si no hay humo negro, olor intenso a quemado, cable dañado o componentes visiblemente deformados."
    ],
    commonSymptoms: [
      {
        symptom: "La freidora no se enciende",
        advice: "Verifique que el enchufe esté bien insertado y que la toma funcione. Asegúrese de que la cesta esté completamente cerrada, ya que muchos modelos tienen un microinterruptor de seguridad."
      },
      {
        symptom: "La cesta o cajón no es detectado",
        advice: "Retire y vuelva a insertar la cesta empujándola hasta el fondo. Compruebe si hay residuos de comida bloqueando el cierre o el sensor de contacto."
      },
      {
        symptom: "Humo blanco durante la cocción",
        advice: "A menudo es causado por alimentos muy grasos (ej. salchichas, tocino). La grasa gotea al fondo y se quema. Puede intentar añadir una cucharada de agua en el fondo de la cesta exterior antes de cocinar para reducir el humo, o vaciar el exceso de grasa."
      },
      {
        symptom: "Humo negro",
        advice: "Apague el aparato inmediatamente. Podría haber comida atascada en el elemento calefactor superior, o un posible fallo eléctrico. Si no es causado por residuos quemados, no lo vuelva a usar y contacte al soporte."
      },
      {
        symptom: "Comida poco hecha o poco crujiente",
        advice: "No sobrecargue la cesta. Asegúrese de agitar la comida a mitad de cocción y considere aumentar ligeramente el tiempo o la temperatura en comparación con las instrucciones estándar."
      },
      {
        symptom: "Cocción desigual",
        advice: "Los alimentos se superponen demasiado. Cocine en lotes más pequeños y asegúrese de que el aire circule libremente alrededor de la comida."
      },
      {
        symptom: "El error en pantalla reaparece después de apagar",
        advice: "Si un error persiste después de desenchufar el aparato durante 15-20 minutos, suele indicar un sensor o circuito defectuoso. Evite reparaciones caseras en componentes eléctricos y consulte al soporte."
      }
    ],
    genericCodeGuidance: [
      {
        code: "E1 / E01",
        meaning: "Reparación de Hardware (Frecuente en: Cosori, Ninja, Philips). Normalmente indica un fallo en el termistor NTC o en el sensor de temperatura. Solución: desenchufe la freidora, realice un reinicio completo dejándola apagada durante 15 minutos. Si el problema persiste al encenderla, se requiere servicio."
      },
      {
        code: "E2 / E02",
        meaning: "Reparación de Hardware (Frecuente en: Cosori, Ariete, Moulinex). A menudo señala un cortocircuito en el sensor o un sobrecalentamiento grave. Solución: desenchufe inmediatamente de la fuente de alimentación, compruebe visualmente si las rejillas de ventilación están despejadas y espere a que se enfríe. Si reaparece, requiere reparación."
      },
      {
        code: "E3 / E03",
        meaning: "Reinicio de Software (Frecuente en: Ninja, Genérico, Proscenic). Típicamente indica la activación de la protección contra sobrecalentamiento o una cesta mal posicionada. Solución: verifique la inserción de la cesta, aleje el aparato al menos 15 cm de la pared, déjelo enfriar y vuelva a intentarlo."
      },
      {
        code: "E4 / E04",
        meaning: "Reinicio de Software (Frecuente en: Ninja, Cosori). A menudo asociado con problemas de comunicación de la placa o anomalías del ventilador/voltaje. Solución: desenchufe el aparato, compruebe si el ventilador gira o está obstruido. Evite alargadores o adaptadores múltiples y conéctelo a un enchufe de pared."
      },
      {
        code: "Pantalla Apagada / Sin Señal",
        meaning: "Reparación de Hardware (Todas las marcas). Puede indicar un microinterruptor de la cesta defectuoso o un fusible térmico fundido. Solución: asegúrese de escuchar el 'clic' de la cesta cuando se inserta. Si no se enciende en otras tomas, contacte al soporte."
      },
      {
        code: "Otros Códigos (E5, E6, etc.)",
        meaning: "El significado varía según la marca y el modelo; consulte el manual específico. A menudo están relacionados con los sensores o la fuente de alimentación."
      }
    ]
  }
};
