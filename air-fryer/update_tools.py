import os
import re

base_dir = 'src/components/seo-tools/'

# Define exact replacements for each file to be safe
REPLACEMENTS = {}

# 1. MATERIALI
REPLACEMENTS['materiali.astro'] = [
    # IT
    (r'it: {\s*title: "Cosa mettere nella Friggitrice ad Aria\? \| Semaforo dei Materiali",\s*h1: "Il Semaforo dei Materiali",\s*desc: "La guida definitiva su cosa puoi e NON puoi inserire nel cestello della tua friggitrice ad aria. Evita disastri in cucina e proteggi il tuo elettrodomestico."',
     '''it: {
    title: "Cosa Mettere (e Non) in Friggitrice ad Aria | Guida Materiali",
    h1: "Contenitori e Materiali per Friggitrice ad Aria: Cosa Si Può Mettere?",
    desc: "Carta forno, alluminio, silicone o vetro? Scopri quali contenitori usare in friggitrice ad aria e quali materiali evitare per non rovinare l'apparecchio.",
    intro: "Scopri quali materiali e contenitori puoi usare in sicurezza nella tua friggitrice ad aria. Questa guida ti mostra cosa mettere e cosa evitare per non rovinare l'apparecchio e cucinare in totale sicurezza.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Posso mettere la carta forno nella friggitrice ad aria?", a: "Sì, ma solo se fissata con il cibo sopra. Altrimenti vola verso la resistenza e può bruciarsi." },
      { q: "Il silicone è sicuro per la friggitrice ad aria?", a: "Sì, gli stampi in silicone alimentare resistono alle temperature della friggitrice e sono sicuri." },
      { q: "Posso usare contenitori in vetro?", a: "Solo se resistenti al calore (vetro temperato). Evita vetro sottile che può rompersi con gli sbalzi termici." },
      { q: "L'alluminio si può mettere?", a: "Sì, ma con cautela. Usa fogli di alluminio solo se ben fissati e non a contatto diretto con la resistenza." }
    ]'''),
    # EN
    (r'en: {\s*title: "What to put in an Air Fryer\? \| Materials Traffic Light",\s*h1: "Materials Traffic Light",\s*desc: "The ultimate guide on what you can and CANNOT put in your air fryer basket. Avoid kitchen disasters and protect your appliance."',
     '''en: {
    title: "What to Put in an Air Fryer (and What Not To) | Materials Guide",
    h1: "Air Fryer Materials Guide: What Can You Put Inside?",
    desc: "Parchment paper, foil, silicone, or glass? Discover which containers are safe to use in your air fryer and which materials to avoid completely.",
    intro: "Discover which materials and containers you can safely use in your air fryer. This guide shows you what to put inside and what to avoid to protect your appliance and cook safely.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I put parchment paper in the air fryer?", a: "Yes, but only if weighed down by food. Otherwise, it will fly into the heating element and burn." },
      { q: "Is silicone safe for the air fryer?", a: "Yes, food-grade silicone molds can withstand air fryer temperatures and are perfectly safe." },
      { q: "Can I use glass containers?", a: "Only if they are heat-resistant (tempered glass or oven-safe). Avoid thin glass that might shatter." },
      { q: "Can I use aluminum foil?", a: "Yes, but use caution. Make sure it is securely tucked and not touching the heating element." }
    ]'''),
    # ES
    (r'es: {\s*title: "¿Qué poner en la Freidora de Aire\? \| Semáforo de Materiales",\s*h1: "Semáforo de Materiales",\s*desc: "La guía definitiva sobre qué puedes y NO puedes introducir en la cesta de tu freidora de aire. Evita desastres y protege tu electrodoméstico."',
     '''es: {
    title: "Qué Meter (y Qué No) en la Freidora de Aire | Guía de Materiales",
    h1: "Materiales y Recipientes para Freidora de Aire: ¿Qué se puede meter?",
    desc: "¿Papel de horno, aluminio, silicona o cristal? Descubre qué recipientes son seguros para usar en la freidora de aire y cuáles debes evitar.",
    intro: "Descubre qué materiales y recipientes puedes usar de forma segura en tu freidora de aire. Esta guía te muestra qué introducir y qué evitar para no dañar el aparato.",
    faqTitle: "FAQ",
    faqs: [
      { q: "¿Puedo poner papel de horno en la freidora de aire?", a: "Sí, pero solo si está sujeto con comida encima. De lo contrario, volará hacia la resistencia y se quemará." },
      { q: "¿Es segura la silicona para la freidora de aire?", a: "Sí, los moldes de silicona alimentaria resisten las altas temperaturas y son muy seguros." },
      { q: "¿Puedo usar recipientes de cristal?", a: "Solo si son resistentes al calor (vidrio templado). Evita el cristal fino que puede romperse por choque térmico." },
      { q: "¿Se puede meter papel de aluminio?", a: "Sí, pero con precaución. Asegúrate de que esté bien fijado y no toque directamente la resistencia." }
    ]'''),
    # FR
    (r'fr: {\s*title: "Que mettre dans la Friteuse à Air \? \| Guide des Matériaux",\s*h1: "Le Guide des Matériaux",\s*desc: "Le guide définitif sur ce que vous pouvez et NE POUVEZ PAS insérer dans le panier de votre friteuse à air. Évitez les catastrophes."',
     '''fr: {
    title: "Que Mettre (et Ne Pas Mettre) dans une Friteuse à Air | Matériaux",
    h1: "Récipients et Matériaux pour Friteuse à Air : Que peut-on mettre ?",
    desc: "Papier cuisson, aluminium, silicone ou verre ? Découvrez quels récipients utiliser sans danger dans votre friteuse à air et ceux à éviter.",
    intro: "Découvrez quels matériaux et récipients vous pouvez utiliser en toute sécurité dans votre friteuse à air. Ce guide vous montre quoi mettre et quoi éviter pour protéger votre appareil.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Puis-je mettre du papier cuisson dans la friteuse à air ?", a: "Oui, mais uniquement s'il est maintenu par des aliments. Sinon, il volera vers la résistance et brûlera." },
      { q: "Le silicone est-il sûr pour la friteuse à air ?", a: "Oui, les moules en silicone alimentaire résistent aux températures de la friteuse et sont sûrs." },
      { q: "Puis-je utiliser des récipients en verre ?", a: "Seulement s'ils résistent à la chaleur (verre trempé). Évitez le verre fin qui peut se briser sous l'effet de la chaleur." },
      { q: "Peut-on mettre du papier d'aluminium ?", a: "Oui, mais avec prudence. Assurez-vous qu'il est bien fixé et qu'il ne touche pas la résistance." }
    ]''')
]

# 2. PULIZIA
REPLACEMENTS['pulizia.astro'] = [
    # SEO Data completely replaced
    (r'const seoData = \{.*?\}\s*;',
     '''const seoData = {
  it: {
    title: "Come Pulire la Resistenza della Friggitrice ad Aria: Metodo Sicuro",
    description: "Scopri come pulire e sgrassare la serpentina della tua friggitrice ad aria senza graffiare il rivestimento. Metodo sicuro ed ecologico in 5 step."
  },
  en: {
    title: "How to Clean Air Fryer Heating Element: Safe Step-by-Step Method",
    description: "Discover how to clean and degrease the heating coil of your air fryer without scratching the non-stick coating. Safe 5-step eco-friendly method."
  },
  es: {
    title: "Cómo Limpiar la Resistencia de la Freidora de Aire: Método Seguro",
    description: "Descubre cómo limpiar y desengrasar la resistencia de tu freidora de aire sin rayar el revestimiento. Método ecológico y seguro en 5 pasos."
  },
  fr: {
    title: "Comment Nettoyer la Résistance de la Friteuse à Air : Méthode Sûre",
    description: "Découvrez comment nettoyer et dégraisser la résistance de votre friteuse à air sans rayer le revêtement. Méthode écologique sûre en 5 étapes."
  }
};'''),
    # H1 and Intro and FAQ in content
    (r'it: {\s*h1: "Guida Pulizia Resistenza",',
     '''it: {
    h1: "Come Pulire la Resistenza della Friggitrice ad Aria in Sicurezza",
    intro: "La resistenza della friggitrice ad aria si sporca e fa fumo? Scopri come pulire e sgrassare la serpentina in sicurezza, senza graffiare il rivestimento antiaderente e senza prodotti aggressivi.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Posso usare lo sgrassatore per il forno?", a: "Assolutamente no. I residui chimici verrebbero vaporizzati sul cibo alla prima accensione. Usa solo prodotti naturali come il bicarbonato." },
      { q: "Come evito che la resistenza si sporchi?", a: "Non riempire mai troppo il cestello e usa un paraschizzi se disponibile. Cuoci cibi molto grassi (come la pancetta) a temperature leggermente inferiori." },
      { q: "Ogni quanto devo pulire la serpentina?", a: "Controllala visivamente una volta al mese. Puliscila solo se noti accumuli evidenti di grasso o se l'apparecchio fa fumo." }
    ],'''),
    (r'en: {\s*h1: "Heating Element Cleaning Guide",',
     '''en: {
    h1: "How to Clean the Air Fryer Heating Element Safely",
    intro: "Is your air fryer heating element dirty and smoking? Discover how to clean and degrease the coil safely without scratching the non-stick coating and without harsh chemicals.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Can I use oven cleaner?", a: "Absolutely not. Chemical residues will vaporize into your food the next time you cook. Only use natural products like baking soda." },
      { q: "How do I prevent the element from getting dirty?", a: "Never overfill the basket and use a splatter shield if available. Cook very fatty foods (like bacon) at slightly lower temperatures." },
      { q: "How often should I clean the heating element?", a: "Check it visually once a month. Only clean it if you see obvious grease buildup or if the appliance is smoking." }
    ],'''),
    (r'es: {\s*h1: "Guía de Limpieza de Resistencia",',
     '''es: {
    h1: "Cómo Limpiar la Resistencia de la Freidora de Aire de Forma Segura",
    intro: "¿La resistencia de la freidora de aire se ensucia y hace humo? Descubre cómo limpiar y desengrasar la resistencia de forma segura, sin rayar el teflón y sin productos agresivos.",
    faqTitle: "FAQ",
    faqs: [
      { q: "¿Puedo usar desengrasante para hornos?", a: "Absolutamente no. Los residuos químicos se vaporizarán en tu comida. Usa solo productos naturales como el bicarbonato." },
      { q: "¿Cómo evito que la resistencia se ensucie?", a: "Nunca llenes demasiado la cesta y usa una tapa antisalpicaduras si la tienes. Cocina alimentos muy grasos a temperaturas más bajas." },
      { q: "¿Con qué frecuencia debo limpiar la resistencia?", a: "Revísala visualmente una vez al mes. Límpiala solo si notas acumulaciones de grasa evidentes o si el aparato hace humo." }
    ],'''),
    (r'fr: {\s*h1: "Guide de Nettoyage",',
     '''fr: {
    h1: "Comment Nettoyer la Résistance de la Friteuse à Air en Toute Sécurité",
    intro: "La résistance de la friteuse à air est sale et fume ? Découvrez comment nettoyer et dégraisser la résistance en toute sécurité, sans rayer le revêtement et sans produits chimiques.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Puis-je utiliser du décapant pour four ?", a: "Absolument pas. Les résidus chimiques se vaporiseraient sur vos aliments. Utilisez uniquement des produits naturels comme le bicarbonate." },
      { q: "Comment éviter que la résistance ne se salisse ?", a: "Ne remplissez jamais trop le panier. Cuisez les aliments très gras (comme le bacon) à des températures légèrement inférieures." },
      { q: "À quelle fréquence dois-je nettoyer la résistance ?", a: "Vérifiez-la visuellement une fois par mois. Nettoyez-la uniquement si vous remarquez des accumulations de graisse ou si l'appareil fume." }
    ],''')
]

# 3. SURGELATI
REPLACEMENTS['surgelati.astro'] = [
    (r'it: {\s*title: "Convertitore Friggitrice ad Aria per Surgelati: Tempi a 2 Fasi",\s*h1: "Cottura Surgelati",\s*desc: "Basta cibi surgelati che vengono bruciati fuori e ghiacciati dentro. Inserisci i dati della scatola e ottieni la cottura termodinamica perfetta in 2 Fasi."',
     '''it: {
    title: "Convertitore Cottura Surgelati in Friggitrice ad Aria | Tempi",
    h1: "Cottura Surgelati in Friggitrice ad Aria: Convertitore Tempi",
    desc: "Calcola automaticamente i tempi di cottura per i cibi surgelati in friggitrice ad aria. Converti i minuti del forno per patatine, pollo e pesce.",
    intro: "Cucinare surgelati in friggitrice ad aria può essere complicato: spesso vengono bruciati fuori e ghiacciati dentro. Questo strumento calcola automaticamente i tempi di cottura per ottenere risultati perfetti."'''),
    (r'en: {\s*title: "Air Fryer Frozen Food Converter: 2-Phase Cooking",\s*h1: "Frozen Food Calibrator",\s*desc: "Stop burning the frozen food outside while the inside is frozen. Enter the box instructions to get the perfect 2-Phase thermodynamic cooking method."',
     '''en: {
    title: "Air Fryer Frozen Food Converter | Calculate Cooking Times",
    h1: "Cooking Frozen Food in Air Fryer: Time Converter",
    desc: "Automatically calculate cooking times for frozen foods in your air fryer. Convert oven minutes for french fries, chicken nuggets, and fish.",
    intro: "Cooking frozen food in an air fryer can be tricky: it often burns on the outside while staying frozen inside. This tool automatically calculates the perfect cooking times."'''),
    (r'es: {\s*title: "Calculadora Freidora de Aire para Congelados: 2 Fases",\s*h1: "Calibrador de Congelados",\s*desc: "Evita que la comida congelada se queme por fuera y sea congelada por dentro. Introduce los datos del envase y obtén la cocción termodinámica en 2 Fases."',
     '''es: {
    title: "Calculadora de Tiempos para Congelados en Freidora de Aire",
    h1: "Cocinar Congelados en Freidora de Aire: Calculadora de Tiempos",
    desc: "Calcula automáticamente los tiempos de cocción para alimentos congelados en freidora de aire. Convierte los minutos del horno para patatas y pollo.",
    intro: "Cocinar congelados en freidora de aire puede ser complicado: a menudo se queman por fuera y quedan helados por dentro. Esta herramienta calcula automáticamente los tiempos perfectos."'''),
    (r'fr: {\s*title: "Convertisseur Friteuse à Air pour Surgelés : Cuisson en 2 Phases",\s*h1: "Calibrateur de Surgelés",\s*desc: "Fini les aliments brûlés à l\'extérieur et congelés à l\'intérieur. Entrez les données de l\'emballage et obtenez la cuisson parfaite en 2 phases."',
     '''fr: {
    title: "Convertisseur de Temps pour Surgelés en Friteuse à Air",
    h1: "Cuisson des Surgelés à la Friteuse à Air : Convertisseur de Temps",
    desc: "Calculez automatiquement les temps de cuisson des aliments surgelés à la friteuse à air. Convertissez les minutes du four pour vos frites et poulet.",
    intro: "Cuisiner des surgelés à la friteuse à air peut être compliqué : ils brûlent souvent à l'extérieur tout en restant congelés à l'intérieur. Cet outil calcule automatiquement le temps idéal."''')
]

# 4. RISCALDARE
REPLACEMENTS['riscaldare.astro'] = [
    (r'const seoData = \{.*?\}\s*;',
     '''const seoData = {
  it: {
    title: "Riscaldare il Cibo in Friggitrice ad Aria: Guida a Tempi e Gradi",
    description: "Abbandona il microonde: scopri i tempi e le temperature esatte per riscaldare pizza, carne, patatine e pasta in friggitrice ad aria senza seccarli."
  },
  en: {
    title: "Reheating Food in Air Fryer: Times and Temperatures Guide",
    description: "Skip the microwave: discover the exact times and temperatures to reheat pizza, fries, meat, and pasta in your air fryer, keeping them perfectly crispy."
  },
  es: {
    title: "Recalentar Comida en Freidora de Aire: Guía de Tiempos y Grados",
    description: "Olvida el microondas: descubre los tiempos y temperaturas exactas para recalentar pizza, patatas, carne y pasta en freidora de aire y recuperar el crujiente."
  },
  fr: {
    title: "Réchauffer des Aliments à l'Air Fryer : Guide Temps et Températures",
    description: "Oubliez le micro-ondes : découvrez les temps et températures exacts pour réchauffer pizzas, frites, viandes et pâtes à la friteuse à air sans les assécher."
  }
};'''),
    (r'it: {\s*h1: "Come riscaldare il cibo in friggitrice ad aria",',
     '''it: {
    h1: "Come Riscaldare il Cibo in Friggitrice ad Aria: Tempi e Gradi",
    intro: "Riscaldare il cibo in friggitrice ad aria è meglio del microonde? Scopri tempi e temperature esatte per riscaldare pizza, pasta, carne e fritti mantenendoli croccanti come appena cucinati.",'''),
    (r'en: {\s*h1: "How to reheat food in an air fryer",',
     '''en: {
    h1: "How to Reheat Food in an Air Fryer: Time and Temperature Guide",
    intro: "Is reheating food in the air fryer better than the microwave? Discover the exact times and temperatures to reheat pizza, pasta, and meat to keep them crispy.",'''),
    (r'es: {\s*h1: "Cómo recalentar comida en freidora de aire",',
     '''es: {
    h1: "Cómo Recalentar Comida en Freidora de Aire: Tiempos y Grados",
    intro: "¿Recalentar la comida en la freidora de aire es mejor que el microondas? Descubre tiempos y temperaturas para recalentar pizza, carne y fritos y mantenerlos crujientes.",'''),
    (r'fr: {\s*h1: "Comment réchauffer à la friteuse à air",',
     '''fr: {
    h1: "Comment Réchauffer des Aliments à la Friteuse à Air : Temps et Températures",
    intro: "Réchauffer la nourriture à la friteuse à air est-il meilleur qu'au micro-ondes ? Découvrez les temps et températures pour réchauffer pizza et viande en gardant le croustillant.",''')
]

# 5. CALORIE
REPLACEMENTS['calorie.astro'] = [
    (r'it: {\s*title: "Calcolatore Calorie: Frittura Tradizionale vs Friggitrice ad Aria",\s*h1: "Calcolatore di Risparmio Calorico",\s*desc: "Scopri esattamente quanti grassi e calorie risparmi cucinando ad aria invece che per immersione nell\'olio. Dati scientifici, non slogan."',
     '''it: {
    title: "Calcolatore Calorie: Friggitrice ad Aria vs Frittura Tradizionale",
    h1: "Calcolo Calorie: Friggitrice ad Aria vs Frittura ad Immersione",
    desc: "Calcola le calorie e i grassi risparmiati cucinando con la friggitrice ad aria rispetto alla classica frittura ad immersione. Simula il tuo risparmio.",
    intro: "Quante calorie risparmi usando la friggitrice ad aria invece della frittura tradizionale? Questo calcolatore ti mostra esattamente quanti grassi e calorie risparmi in base al cibo che prepari."'''),
    (r'en: {\s*title: "Calorie Calculator: Deep Frying vs Air Frying",\s*h1: "Calorie Savings Calculator",\s*desc: "Discover exactly how much fat and calories you save by air frying instead of deep frying. Real math, not marketing slogans."',
     '''en: {
    title: "Air Fryer Calorie Calculator: Deep Frying vs Air Frying Savings",
    h1: "Calorie Calculator: Air Fryer vs Deep Frying Savings",
    desc: "Calculate the calories and fat saved by cooking with an air fryer compared to traditional deep frying. Simulate your exact caloric savings instantly.",
    intro: "How many calories do you save using an air fryer instead of deep frying? This calculator shows you exactly how much fat and calories you save based on the food you cook."'''),
    (r'es: {\s*title: "Calculadora de Calorías: Fritura Tradicional vs Freidora de Aire",\s*h1: "Calculadora de Ahorro Calórico",\s*desc: "Descubre exactamente cuánta grasa y calorías ahorras cocinando al aire en lugar de freír en aceite. Matemáticas reales, no eslóganes."',
     '''es: {
    title: "Calculadora de Calorías: Freidora de Aire vs Fritura Tradicional",
    h1: "Calculadora de Calorías: Freidora de Aire vs Fritura Tradicional",
    desc: "Calcula las calorías y la grasa que ahorras cocinando con tu freidora de aire en comparación con la fritura en aceite tradicional. Simula tu ahorro.",
    intro: "¿Cuántas calorías ahorras usando la freidora de aire en lugar de la fritura tradicional? Esta calculadora te muestra exactamente cuánta grasa y calorías ahorras."'''),
    (r'fr: {\s*title: "Calculateur Calories : Friture vs Friteuse à Air",\s*h1: "Calculateur d\'Économies de Calories",\s*desc: "Découvrez exactement combien de graisses et calories vous économisez en cuisinant à l\'air plutôt qu\'à l\'huile. De vrais chiffres, pas de slogans marketing."',
     '''fr: {
    title: "Calculateur de Calories : Friteuse à Air vs Friture Traditionnelle",
    h1: "Calculateur de Calories : Friteuse à Air vs Friture Traditionnelle",
    desc: "Calculez les calories et les graisses économisées en cuisinant avec une friteuse à air par rapport à une friture traditionnelle. Simulez vos économies.",
    intro: "Combien de calories économisez-vous en utilisant la friteuse à air ? Ce calculateur vous montre exactement combien de graisses et de calories vous économisez."''')
]

# 6. CONSUMI
REPLACEMENTS['consumi.astro'] = [
    (r'const seoData = \{.*?\}\s*;',
     '''const seoData = {
  it: {
    title: "Consumo Friggitrice ad Aria in kWh: Calcolo Costo in Bolletta",
    description: "Scopri quanti Watt consuma una friggitrice ad aria e calcola il costo esatto in kWh sulla bolletta elettrica. Confronto consumi con il forno tradizionale."
  },
  en: {
    title: "Air Fryer Power Consumption in kWh: Calculate Electricity Cost",
    description: "Discover how many Watts your air fryer uses and calculate the exact kWh cost on your electricity bill. Compare energy consumption with a traditional oven."
  },
  es: {
    title: "Consumo Freidora de Aire en kWh: Calculadora de Gasto de Luz",
    description: "Descubre cuántos vatios consume una freidora de aire y calcula el costo exacto en kWh de tu factura de luz. Compara el gasto con un horno tradicional."
  },
  fr: {
    title: "Consommation Friteuse à Air en kWh : Calcul du Coût Électrique",
    description: "Découvrez combien de Watts consomme une friteuse à air et calculez le coût exact en kWh sur votre facture d'électricité. Comparaison avec le four."
  }
};'''),
    (r'it: {\s*h1: "Il Simulatore di Bolletta",',
     '''it: {
    h1: "Consumi Friggitrice ad Aria: Calcola il Costo in Bolletta in kWh",
    intro: "Quanto costa usare la friggitrice ad aria in termini di bolletta elettrica? Scopri il consumo in kWh e confrontalo con il forno tradizionale per capire se conviene davvero.",'''),
    (r'en: {\s*h1: "Electricity Bill Simulator",',
     '''en: {
    h1: "Air Fryer Energy Consumption: Calculate Your Electricity Cost",
    intro: "How much does it cost to use an air fryer on your electricity bill? Discover the kWh consumption and compare it with a traditional oven to see if it's really worth it.",'''),
    (r'es: {\s*h1: "Simulador de Factura",',
     '''es: {
    h1: "Consumo Freidora de Aire: Calcula el Costo en la Factura de Luz",
    intro: "¿Cuánto cuesta usar la freidora de aire en la factura de la luz? Descubre el consumo en kWh y compáralo con el horno tradicional para saber si vale la pena.",'''),
    (r'fr: {\s*h1: "Simulateur de Facture Électrique",',
     '''fr: {
    h1: "Consommation Friteuse à Air : Calculez le Coût en Électricité",
    intro: "Combien coûte l'utilisation d'une friteuse à air en termes d'électricité ? Découvrez la consommation en kWh et comparez avec un four traditionnel.",''')
]

FILE_METADATA = {
    'materiali.astro': {
        'id': 'materiali',
        'slugs': {'it': '/strumenti/materiali-friggitrice-ad-aria/', 'en': '/en/tools/air-fryer-materials-guide/', 'es': '/es/herramientas/materiales-freidora-aire/', 'fr': '/fr/outils/materiaux-friteuse-air/'},
        'names': {'it': 'Materiali Friggitrice ad Aria', 'en': 'Air Fryer Materials', 'es': 'Materiales Freidora de Aire', 'fr': 'Matériaux Friteuse à Air'}
    },
    'pulizia.astro': {
        'id': 'pulizia',
        'slugs': {'it': '/strumenti/pulire-resistenza-friggitrice-ad-aria/', 'en': '/en/tools/clean-air-fryer-heating-element/', 'es': '/es/herramientas/limpiar-resistencia-freidora-aire/', 'fr': '/fr/outils/nettoyer-resistance-friteuse-air/'},
        'names': {'it': 'Pulizia Resistenza', 'en': 'Cleaning Heating Element', 'es': 'Limpiar Resistencia', 'fr': 'Nettoyer Résistance'}
    },
    'surgelati.astro': {
        'id': 'surgelati',
        'slugs': {'it': '/strumenti/cottura-surgelati-friggitrice-ad-aria/', 'en': '/en/tools/cook-frozen-food-air-fryer/', 'es': '/es/herramientas/cocinar-congelados-freidora-aire/', 'fr': '/fr/outils/cuisson-surgeles-friteuse-air/'},
        'names': {'it': 'Cottura Surgelati', 'en': 'Cook Frozen Food', 'es': 'Cocinar Congelados', 'fr': 'Cuisson Surgelés'}
    },
    'riscaldare.astro': {
        'id': 'riscaldare',
        'slugs': {'it': '/strumenti/riscaldare-cibo-friggitrice-ad-aria/', 'en': '/en/tools/reheat-food-air-fryer/', 'es': '/es/herramientas/recalentar-comida-freidora-aire/', 'fr': '/fr/outils/rechauffer-aliments-friteuse-air/'},
        'names': {'it': 'Riscaldare Cibo', 'en': 'Reheating Food', 'es': 'Recalentar Comida', 'fr': 'Réchauffer Aliments'}
    },
    'calorie.astro': {
        'id': 'calorie',
        'slugs': {'it': '/strumenti/calcolo-calorie-friggitrice-ad-aria/', 'en': '/en/tools/air-fryer-calorie-calculator/', 'es': '/es/herramientas/calculo-calorias-freidora-aire/', 'fr': '/fr/outils/calcul-calories-friteuse-air/'},
        'names': {'it': 'Calcolo Calorie', 'en': 'Calorie Calculator', 'es': 'Calculadora de Calorías', 'fr': 'Calcul Calories'}
    },
    'consumi.astro': {
        'id': 'consumi',
        'slugs': {'it': '/strumenti/consumi-friggitrice-ad-aria/', 'en': '/en/tools/air-fryer-energy-costs/', 'es': '/es/herramientas/consumo-freidora-aire/', 'fr': '/fr/outils/consommation-friteuse-air/'},
        'names': {'it': 'Consumi', 'en': 'Energy Consumption', 'es': 'Consumo', 'fr': 'Consommation'}
    }
}

hub_slugs = {'it': '/strumenti/', 'en': '/en/tools/', 'es': '/es/herramientas/', 'fr': '/fr/outils/'}
hub_names = {'it': 'Strumenti', 'en': 'Tools', 'es': 'Herramientas', 'fr': 'Outils'}

import json

for file, changes in REPLACEMENTS.items():
    filepath = os.path.join(base_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply text replacements
    for pattern, replacement in changes:
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    meta = FILE_METADATA[file]
    
    # Check where to inject alternateUrls and breadcrumbSchema
    injection_code = f"""
// === INJECTED SEO DATA ===
const alternateUrls = {{
  it: `https://www.crispissimo.com{meta['slugs']['it']}`,
  en: `https://www.crispissimo.com{meta['slugs']['en']}`,
  es: `https://www.crispissimo.com{meta['slugs']['es']}`,
  fr: `https://www.crispissimo.com{meta['slugs']['fr']}`,
  "x-default": `https://www.crispissimo.com{meta['slugs']['it']}`
}};

const breadcrumbSchema = {{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.crispissimo.com/"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": {json.dumps(hub_names)}[lang] || "Strumenti",
      "item": `https://www.crispissimo.com${{{json.dumps(hub_slugs)}[lang] || "/strumenti/"}}`
    }},
    {{
      "@type": "ListItem",
      "position": 3,
      "name": {json.dumps(meta['names'])}[lang] || "",
      "item": alternateUrls[lang] || alternateUrls.it
    }}
  ]
}};

const currentFaqs = t.faqs || [];
const faqSchema = currentFaqs.length > 0 ? {{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": currentFaqs.map(faq => ({{
    "@type": "Question",
    "name": faq.q || faq.question,
    "acceptedAnswer": {{
      "@type": "Answer",
      "text": faq.a || faq.answer
    }}
  }}))
}} : null;
"""
    if "alternateUrls =" not in content:
        parts = content.split('---')
        # Insert just before the second '---' (the end of the frontmatter)
        parts[1] = parts[1] + injection_code
        content = '---'.join(parts)

    if '<MainLayout ' in content and 'alternateUrls=' not in content:
        content = content.replace('<MainLayout ', '<MainLayout alternateUrls={alternateUrls} ')

    # Inject intro paragraph in HTML under H1
    if '{t.h1}</h1>' in content and '{t.intro}' not in content:
        content = content.replace('{t.h1}</h1>', '{t.h1}</h1>\n      <p class="tool-text text-base md:text-xl max-w-2xl mx-auto font-medium mb-6 text-slate-600 dark:text-slate-300">{t.intro}</p>')
    
    # Inject JSON-LD scripts at the end of the page (before </MainLayout>)
    scripts = """
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
    {faqSchema && <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />}
"""
    if 'breadcrumbSchema' not in content.split('</MainLayout>')[0][-500:]:
        content = content.replace('</MainLayout>', scripts + '\n</MainLayout>')
        
    # Remove existing <script> faqSchema to avoid duplication if it already exists
    if 'set:html={JSON.stringify(faqSchema)}' in content:
        # We just injected it, but some files (like surgelati.astro) had it.
        # Let's clean up existing duplicate faqSchema definition
        content = re.sub(r'const faqSchema = \{.*?\n\};', '', content, flags=re.DOTALL)
        # We also might have multiple `<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />`
        content = content.replace('<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />', '')
        # Add it back properly at the bottom
        content = content.replace('</MainLayout>', '{faqSchema && <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />}\n</MainLayout>')

    # Add internal links at the bottom
    links_html = """
    <div class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h3 class="text-xl font-bold mb-4 text-slate-800 dark:text-white">Strumenti Correlati</h3>
      <ul class="space-y-2 text-slate-600 dark:text-slate-400">
        <li><a href={lang === 'it' ? '/strumenti/codici-errore-friggitrice-ad-aria/' : lang === 'en' ? '/en/tools/air-fryer-error-codes/' : lang === 'es' ? '/es/herramientas/codigos-error-freidora-aire/' : '/fr/outils/codes-erreur-friteuse-air/'} class="hover:text-orange-500 underline">Codici Errore Friggitrice ad Aria</a></li>
        <li><a href={lang === 'it' ? '/strumenti/fumo-puzza-friggitrice-ad-aria/' : lang === 'en' ? '/en/tools/air-fryer-smell-smoke/' : lang === 'es' ? '/es/herramientas/freidora-aire-humo-olor/' : '/fr/outils/friteuse-air-fumee-odeur/'} class="hover:text-orange-500 underline">Fumo e Puzza</a></li>
        <li><a href={lang === 'it' ? '/strumenti/pulire-resistenza-friggitrice-ad-aria/' : lang === 'en' ? '/en/tools/clean-air-fryer-heating-element/' : lang === 'es' ? '/es/herramientas/limpiar-resistencia-freidora-aire/' : '/fr/outils/nettoyer-resistance-friteuse-air/'} class="hover:text-orange-500 underline">Pulizia Resistenza</a></li>
      </ul>
    </div>
"""
    if "Strumenti Correlati" not in content:
        if '<Disclaimer' in content:
            content = content.replace('<Disclaimer', links_html + '\n    <Disclaimer')
        else:
            content = content.replace('</section>', links_html + '\n  </section>')

    # Add FAQ UI if not present
    faq_ui = """
    {t.faqs && t.faqs.length > 0 && (
      <div class="mt-12 max-w-3xl mx-auto">
        <h2 class="tool-subtitle mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">{t.faqTitle || "FAQ"}</h2>
        <div class="space-y-4">
          {t.faqs.map((faq) => (
            <details class="group tool-faq-item [&_summary::-webkit-details-marker]:hidden bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm">
              <summary class="flex justify-between items-center font-bold cursor-pointer list-none text-slate-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                {faq.q || faq.question}
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p class="tool-text mt-4 text-base border-t border-slate-200 dark:border-slate-800 pt-4">{faq.a || faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    )}
"""
    if "t.faqs.map" not in content and "t.faqs" not in content.split('---')[-1]:
        if '<Disclaimer' in content:
            content = content.replace('<Disclaimer', faq_ui + '\n    <Disclaimer')
        else:
            content = content.replace('</section>', faq_ui + '\n  </section>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Process completed perfectly")
