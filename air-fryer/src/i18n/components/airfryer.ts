export const translations = {
  it: {
    title: "Convertitore", subtitle: "Pro", tab_conv: "Incolla Ricetta", tab_food: "Inserimento Rapido", tab_recipes: "Ricettario",
    placeholder: "Incolla qui la ricetta (es: 'Cuocere a 200°C per 40 minuti')...",
    btn_action: "Calcola", label_temp: "Temp. Ottimizzata", label_time: "Tempo Calcolato", eco_label: "Risparmio stimato: ~",
    manual_temp: "TEMP. FORNO", manual_time: "MINUTI FORNO", error_msg: "⚠️ Dati insufficienti. Inserisci Temperatura e Tempo.", 
    legal_privacy: "⚙️ Motore di Convezione Termica attivo. Calcolo 100% locale.",
    alert_cap: "⚠️ Sicurezza: Temp limitata a 200°C", 
    tooltip_cap: "Perché 200°C? Superare questa soglia degrada l'antiaderente e favorisce l'Acrilammide, nociva sugli amidi ad alte temperature. Cuoci in sicurezza!",
    cta_recipes_top: "Senza idee per cena?", cta_recipes_bottom_prefix: "Esplora", cta_recipes_bottom_suffix: "Ricette Testate",
    
    // Contenuti SEO
    seo_title: "La Scienza della Conversione",
    seo_text: "La friggitrice ad aria non è una semplice friggitrice, ma un <strong>potente forno a convezione termica</strong>. Sfrutta l'effetto ciclonico: una ventola spinge aria rovente ad altissima velocità in uno spazio ristretto. La trasmissione del calore è molto più aggressiva rispetto a un forno tradizionale. Per questo, il nostro algoritmo applica la regola aurea ingegneristica: <strong>abbattere la temperatura di 20°C (o 25°F) e ridurre il tempo del 20%</strong>, applicando massimali di sicurezza.",
    faq_title: "Domande Frequenti (FAQ)",
    faqs: [
      { q: "Perché è obbligatorio abbassare la temperatura?", a: "L'aria ciclonica ad alta velocità disidrata la superficie dei cibi molto più rapidamente. Mantenere gli stessi gradi del forno brucerebbe l'esterno prima che il cuore del cibo sia cotto." },
      { q: "Posso usare la carta forno o l'alluminio?", a: "Sì, ma non devi mai coprire l'intero fondo del cestello. Se blocchi il flusso d'aria ascendente, annulli l'effetto croccante della convezione e rischi che la carta voli sulla resistenza incendiandosi." },
      { q: "Devo preriscaldare la friggitrice ad aria?", a: "Grazie alle dimensioni ridotte della camera, si scalda in 2-3 minuti. Il preriscaldamento è consigliato solo per i lievitati delicati o per sigillare tagli di carne rossa spessi (come le bistecche)." }
    ]
  },
  en: {
    title: "Air Fryer", subtitle: "Engine", tab_conv: "Smart Paste", tab_food: "Quick Input", tab_recipes: "Recipes",
    placeholder: "Paste oven recipe here (e.g. 'Bake at 400°F for 40 minutes')...",
    btn_action: "Calculate", label_temp: "Optimized Temp", label_time: "Calculated Time", eco_label: "Est. Savings: ~",
    manual_temp: "OVEN TEMP.", manual_time: "OVEN MINUTES", error_msg: "⚠️ Missing data! Please provide Temp and Time.", 
    legal_privacy: "⚙️ Thermal Convection Engine active. 100% local processing.",
    alert_cap: "⚠️ Safety: Capped at 400°F", 
    tooltip_cap: "Why 400°F? Exceeding this degrades the non-stick coating and promotes Acrylamide, a harmful byproduct on starches at extreme heat. Cook safely!",
    cta_recipes_top: "Don't know what to cook?", cta_recipes_bottom_prefix: "Explore", cta_recipes_bottom_suffix: "Tested Recipes",

    seo_title: "The Science of Conversion",
    seo_text: "An air fryer is not a fryer; it's a <strong>high-powered convection oven</strong>. It uses a cyclonic effect, pushing blazing hot air at high speed in a confined space. Heat transmission is much more aggressive than a traditional oven. Therefore, our algorithm applies the golden engineering rule: <strong>drop the temperature by 25°F (or 20°C) and reduce time by 20%</strong>, while applying safety caps.",
    faq_title: "Frequently Asked Questions",
    faqs: [
      { q: "Why must I lower the temperature?", a: "High-speed cyclonic air dehydrates food surfaces rapidly. Keeping oven temperatures would burn the exterior before the inside is cooked." },
      { q: "Can I use parchment paper or aluminum foil?", a: "Yes, but never cover the entire bottom of the basket. Blocking the upward airflow ruins the crisping effect and risks the paper flying up into the heating element." },
      { q: "Do I need to preheat the air fryer?", a: "Due to its small chamber, it heats up in 2-3 minutes. Preheating is only recommended for delicate pastries or searing thick cuts of red meat." }
    ]
  },
  es: {
    title: "Convertidor", subtitle: "Pro", tab_conv: "Pegar Receta", tab_food: "Datos Rápidos", tab_recipes: "Recetas",
    placeholder: "Pega el texto de la receta aquí (ej: 'Hornear a 200°C por 40 min')...",
    btn_action: "Calcular", label_temp: "Temp. Optimizada", label_time: "Tiempo Calculado", eco_label: "Ahorro estimado: ~",
    manual_temp: "TEMP. HORNO", manual_time: "MINUTOS HORNO", error_msg: "⚠️ ¡Faltan datos! Introduce Temperatura y Tiempo.", 
    legal_privacy: "⚙️ Motor de Convección Térmica activo. Cálculos 100% locales.",
    alert_cap: "⚠️ Seguridad: Temp limitada a 200°C", 
    tooltip_cap: "¿Por qué 200°C? Superar este límite degrada el antiadherente y favorece la Acrilamida, nociva en almidones a calor extremo. ¡Cocina seguro!",
    cta_recipes_top: "¿Sin ideas para cenar?", cta_recipes_bottom_prefix: "Explora", cta_recipes_bottom_suffix: "Recetas",

    seo_title: "La Ciencia de la Conversión",
    seo_text: "La freidora de aire es un <strong>potente horno de convección</strong>. Utiliza un efecto ciclónico: un ventilador empuja aire muy caliente a alta velocidad. La transmisión de calor es mucho más agresiva que en un horno tradicional. Por eso, nuestro algoritmo aplica la regla de oro: <strong>bajar la temperatura 20°C (o 25°F) y reducir el tiempo un 20%</strong>.",
    faq_title: "Preguntas Frecuentes",
    faqs: [
      { q: "¿Por qué es obligatorio bajar la temperatura?", a: "El aire ciclónico a alta velocidad deshidrata la superficie más rápido. Mantener los grados del horno quemaría el exterior antes de cocinar el interior." },
      { q: "¿Puedo usar papel de horno o aluminio?", a: "Sí, pero nunca cubras todo el fondo. Si bloqueas el flujo de aire, anulas el efecto crujiente y corres el riesgo de que el papel vuele hacia la resistencia." },
      { q: "¿Debo precalentar la freidora de aire?", a: "Gracias a su tamaño reducido, se calienta en 2-3 minutos. Solo se recomienda precalentar para masas delicadas o para sellar cortes gruesos de carne." }
    ]
  },
  fr: {
    title: "Convertisseur", subtitle: "Pro", tab_conv: "Coller Recette", tab_food: "Saisie Rapide", tab_recipes: "Recettes",
    placeholder: "Collez le texte de la recette ici (ex: 'Cuire à 200°C pendant 40 min')...",
    btn_action: "Calculer", label_temp: "Temp. Optimisée", label_time: "Temps Calculé", eco_label: "Économie est. : ~",
    manual_temp: "TEMP. FOUR", manual_time: "MINUTES FOUR", error_msg: "⚠️ Données manquantes ! Entrez Température et Temps.", 
    legal_privacy: "⚙️ Moteur de Convection Thermique actif. Calculs 100% locaux.",
    alert_cap: "⚠️ Sécurité : Temp. limitée à 200°C", 
    tooltip_cap: "Pourquoi 200°C ? Dépasser ce seuil dégrade le revêtement et favorise l'Acrylamide, nocive sur les amidons à haute température. Cuisinez en sécurité !",
    cta_recipes_top: "En panne d'inspiration ?", cta_recipes_bottom_prefix: "Explorez", cta_recipes_bottom_suffix: "Recettes",

    seo_title: "La Science de la Conversion",
    seo_text: "La friteuse à air est un <strong>puissant four à convection</strong>. Elle utilise un effet cyclonique : un ventilateur propulse de l'air brûlant à grande vitesse. La transmission de la chaleur est plus agressive qu'un four traditionnel. C'est pourquoi notre algorithme applique la règle d'or : <strong>baisser la température de 20°C (o 25°F) et réduire le temps de 20 %</strong>.",
    faq_title: "Foire Aux Questions",
    faqs: [
      { q: "Pourquoi est-il obligatoire de baisser la température ?", a: "L'air cyclonique déshydrate la surface très rapidement. Garder les degrés du four brûlerait l'extérieur avant que l'intérieur ne soit cuit." },
      { q: "Puis-je utiliser du papier sulfurisé ou de l'aluminium ?", a: "Oui, mais ne couvrez jamais tout le fond. Bloquer le flux d'air annule l'effet croustillant et le papier risque de voler sur la résistance." },
      { q: "Dois-je préchauffer la friteuse à air ?", a: "Grâce à sa petite taille, elle chauffe en 2-3 minutes. Le préchauffage n'est recommandé que pour les pâtes délicates ou pour saisir les viandes épaisses." }
    ]
  }
} as const;
