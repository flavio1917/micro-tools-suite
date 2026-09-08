export interface GenericGuidance {
  commonSymptoms: { symptom: string; advice: string }[];
  generalSafetySteps: string[];
  genericCodeGuidance: { code: string; meaning: string }[];
  disclaimer: string;
}

export const genericAirFryerGuidance: GenericGuidance = {
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
};
