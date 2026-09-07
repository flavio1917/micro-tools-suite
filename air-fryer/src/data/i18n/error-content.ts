import type { SupportedLanguage } from '../../types/air-fryer-v2';

export interface LocalizedText {
  source_text: string;
  source_language: SupportedLanguage | string;
  source_reference?: string;
  text: string;
}

export type EditorialStatus = 'draft' | 'source_verified' | 'translated' | 'reviewed';

export interface EditorialErrorContent {
  label: string;
  cause: string;
  solution: string;
  steps: string[];
  escalation: string;
  safety_note?: string;
  source_text: string;
  source_language: string;
  source_reference: string;
  editorial_status: EditorialStatus;
}

export interface ErrorContent {
  label: LocalizedText;
  cause?: LocalizedText;
  solution?: LocalizedText;
  steps?: LocalizedText[];
  safety_note?: LocalizedText;
  editorial?: EditorialErrorContent;
}

export interface SymptomContent {
  label: LocalizedText;
  cause?: LocalizedText;
  solution?: LocalizedText;
}

export type I18nErrorDictionary = Record<string, ErrorContent>;
export type I18nSymptomDictionary = Record<string, SymptomContent>;

export interface LanguagePack {
  errors: I18nErrorDictionary;
  symptoms: I18nSymptomDictionary;
}

function createPhilipsE1_NA351(lang: SupportedLanguage): ErrorContent {
  const content = {
    it: {
      label: "Errore E1 su Philips Airfryer Serie 3000",
      cause: "L'apparecchio potrebbe essere stato conservato in un luogo troppo freddo.",
      solution: "Lasciare riscaldare l'apparecchio a temperatura ambiente per almeno 15 minuti prima di ricollegarlo.",
      steps: [
        "Scollegare l'apparecchio dalla presa di corrente se collegato.",
        "Lasciarlo riscaldare a temperatura ambiente per almeno 15 minuti.",
        "Ricollegarlo alla presa di corrente."
      ],
      escalation: "Se sullo schermo viene ancora visualizzata la scritta E1, chiamare l'assistenza telefonica Philips o rivolgersi al centro assistenza clienti."
    },
    en: {
      label: "Error E1 on Philips Airfryer 3000 Series",
      cause: "The appliance may have been stored in a place that is too cold.",
      solution: "Let the appliance warm up at room temperature for at least 15 minutes before plugging it back in.",
      steps: [
        "Unplug the appliance from the power outlet if plugged in.",
        "Let it warm up at room temperature for at least 15 minutes.",
        "Plug it back into the power outlet."
      ],
      escalation: "If the text E1 is still displayed on the screen, call Philips telephone support or contact the customer service center."
    },
    fr: {
      label: "Erreur E1 sur Philips Airfryer Série 3000",
      cause: "L'appareil a peut-être été stocké dans un endroit trop froid.",
      solution: "Laissez l'appareil se réchauffer à température ambiante pendant au moins 15 minutes avant de le rebrancher.",
      steps: [
        "Débranchez l'appareil de la prise de courant s'il est branché.",
        "Laissez-le se réchauffer à température ambiante pendant au moins 15 minutes.",
        "Rebranchez-le à la prise de courant."
      ],
      escalation: "Si le texte E1 est toujours affiché à l'écran, appelez l'assistance téléphonique Philips ou contactez le centre de service client."
    },
    es: {
      label: "Error E1 en Philips Airfryer Serie 3000",
      cause: "Es posible que el aparato se haya guardado en un lugar demasiado frío.",
      solution: "Deje que el aparato se caliente a temperatura ambiente durante al menos 15 minutos antes de volver a enchufarlo.",
      steps: [
        "Desenchufe el aparato de la toma de corriente si está enchufado.",
        "Déjelo calentar a temperatura ambiente durante al menos 15 minutos.",
        "Vuelva a enchufarlo a la toma de corriente."
      ],
      escalation: "Si el texto E1 sigue apareciendo en la pantalla, llame al soporte telefónico de Philips o comuníquese con el centro de servicio al cliente."
    }
  };

  const c = content[lang];
  return {
    label: { source_text: "System error", source_language: "it", text: c.label },
    editorial: {
      ...c,
      source_text: "Airfryer potrebbe essere stato conservato in un luogo troppo freddo... lasciarlo riscaldare a temperatura ambiente per almeno 15 minuti",
      source_language: "it",
      source_reference: "Manuale Philips NA351",
      editorial_status: "reviewed"
    }
  };
}

function createPhilipsE_NA351(code: string, lang: SupportedLanguage): ErrorContent {
  const content = {
    it: {
      label: `Errore ${code} su Philips Airfryer Serie 3000`,
      cause: "Il dispositivo potrebbe non funzionare correttamente.",
      solution: "Provare a scollegare e ricollegare il dispositivo alla presa di corrente.",
      steps: [
        "Scollegare il dispositivo dalla presa di corrente.",
        "Ricollegare il dispositivo alla presa di corrente."
      ],
      escalation: "Se non si riesce a risolvere il problema, chiamare l'assistenza telefonica Philips o rivolgersi al centro assistenza clienti del proprio paese."
    },
    en: {
      label: `Error ${code} on Philips Airfryer 3000 Series`,
      cause: "The device may not be functioning correctly.",
      solution: "Try unplugging and replugging the device into the power outlet.",
      steps: [
        "Unplug the device from the power outlet.",
        "Plug the device back into the power outlet."
      ],
      escalation: "If you cannot solve the problem, call Philips telephone support or contact the customer service center in your country."
    },
    fr: {
      label: `Erreur ${code} sur Philips Airfryer Série 3000`,
      cause: "L'appareil peut ne pas fonctionner correctement.",
      solution: "Essayez de débrancher et de rebrancher l'appareil à la prise de courant.",
      steps: [
        "Débranchez l'appareil de la prise de courant.",
        "Rebranchez l'appareil à la prise de courant."
      ],
      escalation: "Si vous ne parvenez pas à résoudre le problème, appelez l'assistance téléphonique Philips ou contactez le centre de service client de votre pays."
    },
    es: {
      label: `Error ${code} en Philips Airfryer Serie 3000`,
      cause: "Es posible que el dispositivo no funcione correctamente.",
      solution: "Intente desenchufar y volver a enchufar el dispositivo a la toma de corriente.",
      steps: [
        "Desenchufe el dispositivo de la toma de corriente.",
        "Vuelva a enchufar el dispositivo a la toma de corriente."
      ],
      escalation: "Si no puede resolver el problema, llame al soporte telefónico de Philips o comuníquese con el centro de servicio al cliente de su país."
    }
  };

  const c = content[lang];
  return {
    label: { source_text: "System error", source_language: "it", text: c.label },
    editorial: {
      ...c,
      source_text: "Il dispositivo potrebbe non funzionare correttamente. Provare a scollegare e ricollegare il dispositivo alla presa.",
      source_language: "it",
      source_reference: "Manuale Philips NA351",
      editorial_status: "reviewed"
    }
  };
}

function createPhilipsE1_NA220(lang: SupportedLanguage): ErrorContent {
  const content = {
    it: {
      label: "Errore E1 su Philips Airfryer Serie 2000",
      cause: "Airfryer potrebbe essere stato conservato in un luogo troppo freddo.",
      solution: "Lasciarlo riscaldare a temperatura ambiente per almeno 15 minuti prima di ricollegarlo.",
      steps: [
        "Scollega l'apparecchio dalla presa di corrente se collegato.",
        "Lascialo riscaldare a temperatura ambiente per almeno 15 minuti.",
        "Ricollegalo alla presa di corrente."
      ],
      escalation: "Se il problema persiste, chiamare l'assistenza telefonica Philips o rivolgersi al centro assistenza clienti del proprio paese."
    },
    en: {
      label: "Error E1 on Philips Airfryer 2000 Series",
      cause: "The Airfryer may have been stored in a place that is too cold.",
      solution: "Let it warm up at room temperature for at least 15 minutes before plugging it back in.",
      steps: [
        "Unplug the appliance from the power outlet if plugged in.",
        "Let it warm up at room temperature for at least 15 minutes.",
        "Plug it back into the power outlet."
      ],
      escalation: "If the problem persists, call Philips telephone support or contact the customer service center in your country."
    },
    fr: {
      label: "Erreur E1 sur Philips Airfryer Série 2000",
      cause: "L'Airfryer a peut-être été stocké dans un endroit trop froid.",
      solution: "Laissez-le se réchauffer à température ambiante pendant au moins 15 minutes avant de le rebrancher.",
      steps: [
        "Débranchez l'appareil de la prise de courant s'il est branché.",
        "Laissez-le se réchauffer à température ambiante pendant au moins 15 minutes.",
        "Rebranchez-le à la prise de courant."
      ],
      escalation: "Si le problème persiste, appelez l'assistance téléphonique Philips ou contactez le centre de service client de votre pays."
    },
    es: {
      label: "Error E1 en Philips Airfryer Serie 2000",
      cause: "Es posible que la Airfryer se haya guardado en un lugar demasiado frío.",
      solution: "Déjelo calentar a temperatura ambiente durante al menos 15 minutos antes de volver a enchufarlo.",
      steps: [
        "Desenchufe el aparato de la toma de corriente si está enchufado.",
        "Déjelo calentar a temperatura ambiente durante al menos 15 minutos.",
        "Vuelva a enchufarlo a la toma de corriente."
      ],
      escalation: "Si el problema persiste, llame al soporte telefónico de Philips o comuníquese con el centro de servicio al cliente de su país."
    }
  };

  const c = content[lang];
  return {
    label: { source_text: "System error", source_language: "it", text: c.label },
    editorial: {
      ...c,
      source_text: "Airfryer potrebbe essere stato conservato in un luogo troppo freddo... lasciarlo riscaldare a temperatura ambiente per almeno 15 minuti",
      source_language: "it",
      source_reference: "Manuale Philips NA220/NA221",
      editorial_status: "reviewed"
    }
  };
}

function createPhilipsE_NA220(code: string, lang: SupportedLanguage): ErrorContent {
  const content = {
    it: {
      label: `Errore ${code} su Philips Airfryer Serie 2000`,
      cause: "Sull'apparecchio viene visualizzato un errore.",
      solution: "Scollegare l'apparecchio e ricollegarlo.",
      steps: [
        "Scollegare l'apparecchio dalla presa di corrente.",
        "Ricollegare l'apparecchio alla presa di corrente."
      ],
      escalation: "Se il problema persiste, chiamare l'assistenza telefonica Philips o rivolgersi al centro assistenza clienti del proprio paese."
    },
    en: {
      label: `Error ${code} on Philips Airfryer 2000 Series`,
      cause: "An error is displayed on the appliance.",
      solution: "Unplug the appliance and plug it back in.",
      steps: [
        "Unplug the appliance from the power outlet.",
        "Plug the appliance back into the power outlet."
      ],
      escalation: "If the problem persists, call Philips telephone support or contact the customer service center in your country."
    },
    fr: {
      label: `Erreur ${code} sur Philips Airfryer Série 2000`,
      cause: "Une erreur s'affiche sur l'appareil.",
      solution: "Débranchez l'appareil et rebranchez-le.",
      steps: [
        "Débranchez l'appareil de la prise de courant.",
        "Rebranchez l'appareil à la prise de courant."
      ],
      escalation: "Si le problème persiste, appelez l'assistance téléphonique Philips ou contactez le centre de service client de votre pays."
    },
    es: {
      label: `Error ${code} en Philips Airfryer Serie 2000`,
      cause: "Aparece un error en el aparato.",
      solution: "Desenchufe el aparato y vuelva a enchufarlo.",
      steps: [
        "Desenchufe el aparato de la toma de corriente.",
        "Vuelva a enchufar el aparato a la toma de corriente."
      ],
      escalation: "Si el problema persiste, llame al soporte telefónico de Philips o comuníquese con el centro de servicio al cliente de su país."
    }
  };

  const c = content[lang];
  return {
    label: { source_text: "System error", source_language: "it", text: c.label },
    editorial: {
      ...c,
      source_text: "Sull'apparecchio viene visualizzato un errore. Scollegare l'apparecchio e ricollegarlo.",
      source_language: "it",
      source_reference: "Manuale Philips NA220/NA221",
      editorial_status: "reviewed"
    }
  };
}

export const errorContentDB: Record<SupportedLanguage, LanguagePack> = {
  it: { errors: {}, symptoms: {} },
  en: { errors: {}, symptoms: {} },
  fr: { errors: {}, symptoms: {} },
  es: { errors: {}, symptoms: {} }
};

const langs: SupportedLanguage[] = ['it', 'en', 'fr', 'es'];

for (const lang of langs) {
  // NA351
  errorContentDB[lang].errors["philips.NA351.E1"] = createPhilipsE1_NA351(lang);
  errorContentDB[lang].errors["philips.NA351.E4"] = createPhilipsE_NA351('E4', lang);
  errorContentDB[lang].errors["philips.NA351.E12"] = createPhilipsE_NA351('E12', lang);

  // NA220 - NA221
  errorContentDB[lang].errors["philips.NA220 - NA221.E1"] = createPhilipsE1_NA220(lang);
  errorContentDB[lang].errors["philips.NA220 - NA221.E4"] = createPhilipsE_NA220('E4', lang);
  errorContentDB[lang].errors["philips.NA220 - NA221.E6"] = createPhilipsE_NA220('E6', lang);
  errorContentDB[lang].errors["philips.NA220 - NA221.E9"] = createPhilipsE_NA220('E9', lang);
  errorContentDB[lang].errors["philips.NA220 - NA221.E12"] = createPhilipsE_NA220('E12', lang);
}

export function isPlaceholderOrInsufficientText(value?: string): boolean {
  if (!value?.trim()) return true;

  const normalized = value.trim().toLowerCase().replace(/\s+/g, ' ');
  const forbiddenExactValues = new Set([
    'errore e1', 'errore e4', 'errore e6', 'errore e9', 'errore e12',
    'error e1', 'error e4', 'error e6', 'error e9', 'error e12',
    'erreur e1', 'erreur e4', 'erreur e6', 'erreur e9', 'erreur e12',
    'scollega la spina', 'consultare il manuale', 'contatta assistenza',
    'contact support', 'see manual', 'placeholder', 'todo', 'tbd'
  ]);

  if (forbiddenExactValues.has(normalized)) return true;
  return normalized.length < 30;
}

export function hasCompleteTranslations(key: string, severity: string = 'stop_and_support', checkEditorial: boolean = false): boolean | { lang: string; field: string; reason: string } {
  for (const lang of langs) {
    const errorData = errorContentDB[lang]?.errors[key];
    if (!errorData) return { lang, field: 'all', reason: 'Missing error content' };
    
    if (checkEditorial) {
       if (!errorData.editorial || errorData.editorial.editorial_status !== 'reviewed') {
         return { lang, field: 'editorial_status', reason: 'Not reviewed or missing editorial block' };
       }
       if (isPlaceholderOrInsufficientText(errorData.editorial.label)) return { lang, field: 'label', reason: 'Placeholder or too short' };
       if (isPlaceholderOrInsufficientText(errorData.editorial.cause)) return { lang, field: 'cause', reason: 'Placeholder or too short' };
       if (isPlaceholderOrInsufficientText(errorData.editorial.solution)) return { lang, field: 'solution', reason: 'Placeholder or too short' };
       if (severity === 'stop_and_support' && isPlaceholderOrInsufficientText(errorData.editorial.safety_note)) return { lang, field: 'safety_note', reason: 'Placeholder or too short' };
       if (isPlaceholderOrInsufficientText(errorData.editorial.escalation)) return { lang, field: 'escalation', reason: 'Placeholder or too short' };
       if (!errorData.editorial.steps || errorData.editorial.steps.length === 0) return { lang, field: 'steps', reason: 'Missing concrete steps' };
    } else {
      if (!errorData.label || !errorData.label.text) return { lang, field: 'label', reason: 'Missing label text' };
    }
  }
  return true;
}
