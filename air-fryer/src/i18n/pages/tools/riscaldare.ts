export const riscaldareSeoData = {
  it: {
    title: "Riscaldare il Cibo in Friggitrice ad Aria | Tempi e Gradi",
    description: "Abbandona il microonde: scopri i tempi e le temperature esatte per riscaldare pizza, carne, patatine e pasta in friggitrice ad aria senza seccarli."
  },
  en: {
    title: "Reheating Food in Air Fryer: Times and Temperatures Guide",
    description: "Skip the microwave: discover the exact times and temperatures to reheat pizza, fries, meat, and pasta in your air fryer, keeping them perfectly crispy."
  },
  es: {
    title: "Recalentar Comida en Freidora de Aire | Tiempos y Grados",
    description: "Olvida el microondas: descubre los tiempos y temperaturas exactas para recalentar pizza, patatas, carne y pasta en freidora de aire y recuperar el crujiente."
  },
  fr: {
    title: "Réchauffer des Aliments à l'Air Fryer | Guide",
    description: "Oubliez le micro-ondes : découvrez les temps et températures exacts pour réchauffer pizzas, frites, viandes et pâtes à la friteuse à air sans les assécher."
  }
} as const;

export const riscaldareContent = {
  it: {
    h1: "Come Riscaldare il Cibo in Friggitrice ad Aria: Tempi e Gradi",
    intro: "Riscaldare il cibo in friggitrice ad aria è meglio del microonde? Scopri tempi e temperature esatte per riscaldare pizza, pasta, carne e fritti mantenendoli croccanti come appena cucinati.",
    desc: "Il tuo rianimatore di avanzi. Seleziona il cibo e trova tempi e temperature indicativi per recuperare croccantezza e calore.",
    quickNav: "Vai a:",
    editorialH2: "La scienza del riscaldamento: perché funziona?",
    editorialText: "L’aria calda circolante aiuta a ridurre l’umidità superficiale accumulata in frigorifero e a recuperare parte della croccantezza in pochi minuti, soprattutto su pizza, fritti, pane e impanati.",
    safetyNoteTitle: "⚠️ Nota di sicurezza",
    safetyNoteText: "Tempi e temperature sono indicativi. Per avanzi di carne, pollo, pesce e piatti composti, verifica che siano caldi in modo uniforme all’interno; per la massima sicurezza usa un termometro da cucina e controlla che la temperatura interna raggiunga 74°C.",
    fsTitle: "3 regole d’oro per riscaldare:",
    fsList: [
      "<strong>Regola la temperatura in base al cibo:</strong> per molti avanzi è utile iniziare con una temperatura moderata e aumentarla solo se serve più croccantezza. Controlla sempre che l’interno sia caldo e adatta il tempo alla quantità e allo spessore.",
      "<strong>Non bloccare il flusso d’aria:</strong> evita fogli interi di carta forno o alluminio che coprono tutta la base. Se usi l’alluminio per coprire un alimento, fissalo bene e non lasciarlo libero durante il preriscaldamento.",
      "<strong>Aggiungi un po’ di umidità:</strong> se pane o pizza sono asciutti, spruzza poca acqua sulla superficie prima di riscaldarli."
    ],
    ui: { temp: "Temp.", time: "Tempo", tip: "💡 Consiglio:" },
    categories: [
      {
        id: "lievitati", icon: "🍕", title: "Pizza, pane e rustici",
        items: [
          { emoji: "🍕", name: "Pizza (Fette)", temp: "170°C", time: "3-4 min", tip: "Aggiungi qualche goccia d’acqua sulla crosta prima di inserirla nella friggitrice per evitare che si secchi troppo." },
          { emoji: "🥖", name: "Pane, panini e focaccia", temp: "160-170°C", time: "2-4 min", tip: "Se il pane o la focaccia sono asciutti, inumidiscili leggermente; attenzione ai panini farciti che richiedono più tempo." },
          { emoji: "🥐", name: "Cornetti e brioche", temp: "150°C", time: "2-3 min", tip: "Attenzione ai ripieni (crema/cioccolato) che diventano incandescenti in fretta!" },
          { emoji: "🥧", name: "Torta salata / quiche", temp: "160°C", time: "5-7 min", tip: "La bassa temperatura assicura che l’interno si scaldi prima che la crosta bruci." },
          { emoji: "🥟", name: "Rustici di Sfoglia", temp: "170°C", time: "4-5 min", tip: "La pasta sfoglia può recuperare croccantezza senza aggiungere olio." },
          { emoji: "🥞", name: "Pancake e Muffin", temp: "150°C", time: "2-3 min", tip: "Se non vuoi far scurire la superficie, coprili leggermente con carta stagnola." }
        ]
      },
      {
        id: "carne", icon: "🥩", title: "Carne e pollo",
        items: [
          { emoji: "🥩", name: "Carne / Bistecca", temp: "150°C", time: "3-4 min", tip: "Temperatura più bassa per non stracuocere l’interno. Se era al sangue, fermati a 3 minuti." },
          { emoji: "🍗", name: "Pollo arrosto, cosce e pollo allo spiedo", temp: "170°C", time: "5-6 min", tip: "Disponi i pezzi in un solo strato, girali a metà cottura e verifica che siano ben caldi anche all’interno, soprattutto vicino all’osso. I tempi sono indicativi." },
          { emoji: "🍔", name: "Hamburger (Solo carne)", temp: "160°C", time: "4-5 min", tip: "Se ha il formaggio sopra, mettilo solo nell’ultimo minuto per farlo fondere senza bruciarlo." },
          { emoji: "🧆", name: "Polpette al Sugo", temp: "160°C", time: "5-7 min", tip: "Tagliale a metà se sono molto grandi, per farle scaldare bene all’interno." },
          { emoji: "🥩", name: "Cotoletta Milanese", temp: "170°C", time: "3-4 min", tip: "Spruzza un velo d’olio se la panatura sembra troppo secca dal giorno prima." },
          { emoji: "🍢", name: "Arrosticini / Spiedini", temp: "180°C", time: "3-4 min", tip: "Tieni d’occhio il tempo per evitare di asciugare la carne. I tempi possono variare in base allo spessore e alla temperatura iniziale." },
          { emoji: "🌭", name: "Salsiccia Cotta", temp: "160°C", time: "3-4 min", tip: "Essendo già cotta, NON bucarla, altrimenti perderà tutti i succhi interni diventando stopposa." }
        ]
      },
      {
        id: "pesce", icon: "🐟", title: "Pesce e fritti",
        items: [
          { emoji: "🍤", name: "Pesce fritto e frittura di pesce", temp: "180°C", time: "3-5 min", tip: "Disponi il pesce in un solo strato e controlla dopo circa 3 minuti per evitare di asciugarlo troppo." },
          { emoji: "🐟", name: "Pesce al forno", temp: "160°C", time: "4-5 min", tip: "Riscaldalo in un contenitore adatto e controlla che sia ben caldo all’interno senza asciugarlo." }
        ]
      },
      {
        id: "primi", icon: "🍝", title: "Primi e piatti unici",
        items: [
          { emoji: "🍝", name: "Pasta al forno / lasagne", temp: "160°C", time: "6-8 min", tip: "Mettila in un contenitore adatto alla friggitrice per mantenere il condimento e favorire un riscaldamento uniforme." },
          { emoji: "🍝", name: "Pasta già cotta / Pasta condita", temp: "160°C", time: "4-6 min", tip: "Trasferiscila in una teglietta adatta alla friggitrice e aggiungi poco sugo o un cucchiaio d’acqua se tende ad asciugarsi. Mescola a metà tempo." },
          { emoji: "🍳", name: "Frittata / Omelette", temp: "150°C", time: "4-5 min", tip: "Scalda delicatamente a bassa temperatura per non far diventare l’uovo gommoso." },
          { emoji: "🌯", name: "Kebab / Piadina", temp: "170°C", time: "4-5 min", tip: "Avvolgilo in carta stagnola se lo vuoi morbido, lascialo libero se lo vuoi croccante." }
        ]
      },
      {
        id: "contorni", icon: "🍟", title: "Contorni e snack",
        items: [
          { emoji: "🍟", name: "Patatine fritte", temp: "180°C", time: "4-5 min", tip: "Scuoti il cestello a metà cottura e aggiungi una leggera spruzzata d’olio, se necessario." },
          { emoji: "🍘", name: "Arancini, supplì e crocchette", temp: "180°C", time: "5-7 min", tip: "Disponili in un solo strato e controlla che siano ben caldi all’interno prima di servirli." },
        ]
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Quanto tempo ci vuole per riscaldare la pizza in friggitrice ad aria?", a: "Per riscaldare la pizza in friggitrice ad aria bastano 3-4 minuti a 160°C. La crosta torna croccante senza seccare il condimento." },
      { q: "Come riscaldare il pollo fritto senza farlo diventare secco?", a: "Per riscaldare il pollo fritto, usa 160°C per 5-6 minuti. Spruzza un velo d'olio sulla superficie per mantenere la crosta croccante." },
      { q: "Si può riscaldare il riso in friggitrice ad aria?", a: "Sì, puoi riscaldare il riso in friggitrice ad aria a 150°C per 4-5 minuti. Aggiungi un cucchiaio d'acqua e copri con carta forno per evitare che si secchi." }
    ]
  },
  en: {
    h1: "How to Reheat Food in an Air Fryer",
    intro: "Is reheating food in an air fryer better than the microwave? Discover exact times and temperatures to reheat pizza, pasta, meat, and fried foods keeping them as crispy as freshly cooked.",
    desc: "Your leftover reviver. Choose your food and find recommended times and temperatures to bring back heat and crispiness.",
    quickNav: "Jump to:",
    editorialH2: "Why Air Fryers Help Reheat Food",
    editorialText: "Circulating hot air helps reduce the surface moisture that builds up in the fridge and restores some crispiness in just a few minutes, especially for pizza, fried food, bread and breaded dishes.",
    safetyNoteTitle: "⚠️ Food safety note",
    safetyNoteText: "Times and temperatures are indicative. For leftover meat, poultry, fish and mixed dishes, make sure they are heated evenly and are hot all the way through; for maximum food safety, use a food thermometer and check that the internal temperature reaches 74°C / 165°F.",
    fsTitle: "3 Golden Rules for Reheating:",
    fsList: [
      "<strong>Adjust the temperature to the food:</strong> for many leftovers, start at a moderate temperature and increase it only if you need more crispiness. Check that the food is hot all the way through and adjust the time to the amount and thickness.",
      "<strong>Do not block the airflow:</strong> avoid full sheets of parchment paper or foil covering the entire base. If you use foil to cover food, secure it properly and never leave it loose during preheating.",
      "<strong>Add a little moisture:</strong> if bread or pizza is dry, spray a small amount of water on the surface before reheating."
    ],
    ui: { temp: "Temp.", time: "Time", tip: "💡 Tip:" },
    categories: [
      {
        id: "lievitati", icon: "🍕", title: "Pizza, Bread & Pastries",
        items: [
          { emoji: "🍕", name: "Pizza Slices", temp: "340°F", time: "3-4 min", tip: "Add a few drops of water to the crust before air frying to prevent it from drying out." },
          { emoji: "🥖", name: "Bread, Rolls & Focaccia", temp: "320-340°F", time: "2-4 min", tip: "If the bread or focaccia is dry, moisten it slightly; be careful with filled rolls which require more time." },
          { emoji: "🥐", name: "Croissants & Pastries", temp: "300°F", time: "2-3 min", tip: "Be careful with fillings (cream/chocolate) as they get molten hot very quickly!" },
          { emoji: "🥧", name: "Quiche / Savory Pie", temp: "320°F", time: "5-7 min", tip: "Use a lower temperature so the inside warms up before the crust burns." },
          { emoji: "🥟", name: "Puff Pastry Snacks", temp: "340°F", time: "4-5 min", tip: "Puff pastry can regain some crispiness without adding oil." },
          { emoji: "🥞", name: "Pancakes & Muffins", temp: "300°F", time: "2-3 min", tip: "If you don't want the top to brown, cover lightly with foil." }
        ]
      },
      {
        id: "carne", icon: "🥩", title: "Meat & Poultry",
        items: [
          { emoji: "🥩", name: "Steak / Meat", temp: "300°F", time: "3-4 min", tip: "Keep the temp lower to avoid overcooking. If it was rare, stop at 3 minutes." },
          { emoji: "🍗", name: "Roast Chicken, Chicken Legs & Rotisserie Chicken", temp: "340°F", time: "5-6 min", tip: "Arrange the pieces in a single layer, turn halfway through and check they are piping hot near the bone. Times are indicative." },
          { emoji: "🍔", name: "Hamburger Patties", temp: "320°F", time: "4-5 min", tip: "If it has cheese on top, add it only in the last minute to melt without burning." },
          { emoji: "🧆", name: "Meatballs", temp: "320°F", time: "5-7 min", tip: "Cut them in half if they are very large to ensure they heat all the way through." },
          { emoji: "🥩", name: "Breaded Cutlet", temp: "340°F", time: "3-4 min", tip: "Lightly spray with oil if the breading looks too dry from yesterday." },
          { emoji: "🍢", name: "Meat Skewers", temp: "360°F", time: "3-4 min", tip: "Keep a close eye on the time to avoid drying out the meat. Times may vary depending on its thickness and starting temperature." },
          { emoji: "🌭", name: "Cooked Sausages", temp: "320°F", time: "3-4 min", tip: "Since they are cooked, DO NOT pierce them, or they will dry out completely." }
        ]
      },
      {
        id: "pesce", icon: "🐟", title: "Seafood & Fried Food",
        items: [
          { emoji: "🍤", name: "Fried Fish & Fried Seafood", temp: "360°F", time: "3-5 min", tip: "Arrange the fish in a single layer and check after about 3 minutes to avoid drying it out." },
          { emoji: "🐟", name: "Baked Fish", temp: "320°F", time: "4-5 min", tip: "Reheat it in an air-fryer-safe dish and check that it is hot all the way through without drying it out." }
        ]
      },
      {
        id: "primi", icon: "🍝", title: "Mains & Wraps",
        items: [
          { emoji: "🍝", name: "Baked Pasta / Lasagna", temp: "320°F", time: "6-8 min", tip: "Place it in an air-fryer-safe dish to contain the sauce and help it heat evenly." },
          { emoji: "🍝", name: "Cooked Pasta / Pasta with Sauce", temp: "320°F", time: "4-6 min", tip: "Place it in an air-fryer-safe dish and add a little sauce or a tablespoon of water if it seems dry. Stir halfway through." },
          { emoji: "🍳", name: "Omelette / Frittata", temp: "300°F", time: "4-5 min", tip: "Reheat gently so the egg doesn't turn rubbery." },
          { emoji: "🌯", name: "Kebab / Wraps", temp: "340°F", time: "4-5 min", tip: "Wrap in foil for a soft wrap, leave exposed for a crunchy wrap." }
        ]
      },
      {
        id: "contorni", icon: "🍟", title: "Sides & Veggies",
        items: [
          { emoji: "🍟", name: "French Fries", temp: "360°F", time: "4-5 min", tip: "Shake the basket halfway through and add a quick spray of oil." },
          { emoji: "🍘", name: "Arancini, Supplì & Croquettes", temp: "360°F", time: "5-7 min", tip: "Arrange them in a single layer and make sure they are hot all the way through before serving." },
        ]
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "How long does it take to reheat pizza in an air fryer?", a: "Reheating pizza in an air fryer takes just 3-4 minutes at 320°F (160°C). The crust becomes crispy again without drying out the toppings." },
      { q: "How do I reheat fried chicken without making it dry?", a: "To reheat fried chicken, use 320°F (160°C) for 5-6 minutes. Lightly spray oil on the surface to keep the crust crispy." },
      { q: "Can I reheat rice in an air fryer?", a: "Yes, you can reheat rice in an air fryer at 300°F (150°C) for 4-5 minutes. Add a tablespoon of water and cover with parchment paper to prevent drying." }
    ]
  },
  es: {
    h1: "Cómo Recalentar Comida en Freidora de Aire: Tiempos y Grados",
    intro: "¿Recalentar la comida en la freidora de aire es mejor que el microondas? Descubre tiempos y temperaturas para recalentar pizza, carne y fritos y mantenerlos crujientes.",
    desc: "Tu revividor de sobras. Elige el alimento y encuentra tiempos y temperaturas orientativos para recuperar el calor y el crujiente.",
    quickNav: "Ir a:",
    editorialH2: "Por qué la freidora de aire ayuda a recalentar",
    editorialText: "El aire caliente en circulación ayuda a reducir la humedad superficial acumulada en el frigorífico y a recuperar parte del crujiente en pocos minutos, especialmente en pizza, fritos, pan y alimentos empanados.",
    safetyNoteTitle: "⚠️ Nota de seguridad",
    safetyNoteText: "Los tiempos y las temperaturas son orientativos. En sobras de carne, pollo, pescado y platos preparados, comprueba que estén calientes de manera uniforme y bien calientes por dentro; para una mayor seguridad alimentaria, utiliza un termómetro y verifica que la temperatura interna alcance los 74°C.",
    fsTitle: "3 Reglas de Oro para Recalentar:",
    fsList: [
      "<strong>Adapta la temperatura al alimento:</strong> para muchas sobras, empieza con una temperatura moderada y súbela solo si necesitas más crujiente. Comprueba que el alimento esté caliente por dentro y ajusta el tiempo según la cantidad y el grosor.",
      "<strong>No bloquees el flujo de aire:</strong> evita cubrir toda la base con hojas enteras de papel de horno o aluminio. Si usas aluminio para cubrir un alimento, fíjalo bien y nunca lo dejes suelto durante el precalentamiento.",
      "<strong>Añade un poco de humedad:</strong> si el pan o la pizza están secos, rocía un poco de agua sobre la superficie antes de recalentarlos."
    ],
    ui: { temp: "Temp.", time: "Tiempo", tip: "💡 Consejo:" },
    categories: [
      {
        id: "lievitati", icon: "🍕", title: "Pizza, Pan y Masas",
        items: [
          { emoji: "🍕", name: "Pizza (Porciones)", temp: "170°C", time: "3-4 min", tip: "Pon unas gotas de agua en la corteza antes de calentar para que no se seque." },
          { emoji: "🥖", name: "Pan, panecillos y focaccia", temp: "160-170°C", time: "2-4 min", tip: "Si el pan o la focaccia están secos, humedécelos ligeramente; ten cuidado con los bocadillos rellenos que requieren más tiempo." },
          { emoji: "🥐", name: "Cruasanes y Bollería", temp: "150°C", time: "2-3 min", tip: "¡Cuidado con los rellenos (crema/chocolate) que se calientan muchísimo!" },
          { emoji: "🥧", name: "Quiche / Tarta Salada", temp: "160°C", time: "5-7 min", tip: "Baja temperatura para que el interior se caliente antes de que la masa se queme." },
          { emoji: "🥟", name: "Hojaldres", temp: "170°C", time: "4-5 min", tip: "El hojaldre puede recuperar parte de su crujiente sin añadir aceite." },
          { emoji: "🥞", name: "Tortitas y Muffins", temp: "150°C", time: "2-3 min", tip: "Si no quieres que se doren más, cúbrelos ligeramente con aluminio." }
        ]
      },
      {
        id: "carne", icon: "🥩", title: "Carne y Pollo",
        items: [
          { emoji: "🥩", name: "Carne / Filete", temp: "150°C", time: "3-4 min", tip: "Baja temperatura para no cocinarla de más por dentro. Si estaba poco hecha, no pases de 3 min." },
          { emoji: "🍗", name: "Pollo asado, muslos y pollo asado al espetón", temp: "170°C", time: "5-6 min", tip: "Coloca las piezas en una sola capa, dales la vuelta a la mitad y comprueba que estén bien calientes cerca del hueso. Los tiempos son orientativos." },
          { emoji: "🍔", name: "Hamburguesas", temp: "160°C", time: "4-5 min", tip: "Si lleva queso, ponlo solo en el último minuto para que se funda sin quemarse." },
          { emoji: "🧆", name: "Albóndigas", temp: "160°C", time: "5-7 min", tip: "Córtalas por la mitad si son muy grandes para que se calienten bien por dentro." },
          { emoji: "🥩", name: "Milanesa / Empanado", temp: "170°C", time: "3-4 min", tip: "Rocía un poco de aceite si el rebozado parece muy seco del día anterior." },
          { emoji: "🍢", name: "Pinchos Morunos", temp: "180°C", time: "3-4 min", tip: "Vigila el tiempo para evitar que la carne se reseque. Los tiempos pueden variar según el grosor y la temperatura inicial." },
          { emoji: "🌭", name: "Salchichas (Ya cocidas)", temp: "160°C", time: "3-4 min", tip: "Como ya están cocidas, NO las pinches o perderán sus jugos." }
        ]
      },
      {
        id: "pesce", icon: "🐟", title: "Pescado y Frituras",
        items: [
          { emoji: "🍤", name: "Pescado frito y fritura de pescado", temp: "180°C", time: "3-5 min", tip: "Coloca el pescado en una sola capa y compruébalo después de unos 3 minutos para evitar que se reseque." },
          { emoji: "🐟", name: "Pescado al horno", temp: "160°C", time: "4-5 min", tip: "Caliéntalo en un recipiente apto y comprueba que esté bien caliente por dentro sin resecarlo." }
        ]
      },
      {
        id: "primi", icon: "🍝", title: "Platos Principales",
        items: [
          { emoji: "🍝", name: "Lasaña / Pasta al horno", temp: "160°C", time: "6-8 min", tip: "Colócala en un recipiente apto para la freidora para contener la salsa y favorecer un calentamiento uniforme." },
          { emoji: "🍝", name: "Pasta ya cocida / Pasta con salsa", temp: "160°C", time: "4-6 min", tip: "Colócala en un recipiente apto para la freidora y añade un poco de salsa o una cucharada de agua si está seca. Remueve a mitad del tiempo." },
          { emoji: "🍳", name: "Tortilla / Omelette", temp: "150°C", time: "4-5 min", tip: "Calienta suavemente para que el huevo no se vuelva gomoso." },
          { emoji: "🌯", name: "Kebab / Wraps", temp: "170°C", time: "4-5 min", tip: "Envuélvelo en aluminio para que quede suave, o déjalo libre para que cruja." }
        ]
      },
      {
        id: "contorni", icon: "🍟", title: "Guarniciones y Snacks",
        items: [
          { emoji: "🍟", name: "Patatas Fritas", temp: "180°C", time: "4-5 min", tip: "Agita la cesta a la mitad y añade un toque de aceite en spray." },
          { emoji: "🍘", name: "Arancini, supplì y croquetas", temp: "180°C", time: "5-7 min", tip: "Colócalos en una sola capa y comprueba que estén bien calientes por dentro antes de servir." },
        ]
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "¿Cuánto tiempo tarda en recalentarse una pizza en la freidora de aire?", a: "Recalentar pizza en la freidora de aire tarda solo 3-4 minutos a 160°C. La corteza vuelve a quedar crujiente sin secar el relleno." },
      { q: "¿Cómo recalentar pollo frito sin que quede seco?", a: "Para recalentar pollo frito, usa 160°C durante 5-6 minutos. Rocía un poco de aceite en la superficie para mantener la corteza crujiente." },
      { q: "¿Se puede recalentar arroz en la freidora de aire?", a: "Sí, puedes recalentar arroz en la freidora de aire a 150°C durante 4-5 minutos. Añade una cucharada de agua y cubre con papel de horno para evitar que se seque." }
    ]
  },
  fr: {
    h1: "Comment réchauffer des aliments à l’air fryer",
    intro: "Réchauffer les aliments dans une friteuse à air est-il meilleur que le micro-ondes ? Découvrez les temps et températures exacts pour réchauffer la pizza, les pâtes, la viande et les aliments frits en les gardant croustillants.",
    desc: "Votre allié pour réchauffer les restes. Choisissez l’aliment et trouvez des temps et températures indicatifs pour retrouver chaleur et croustillant.",
    quickNav: "Aller à :",
    editorialH2: "Pourquoi l’air fryer aide à réchauffer les aliments",
    editorialText: "L’air chaud en circulation aide à réduire l’humidité de surface accumulée au réfrigérateur et à retrouver une partie du croustillant en quelques minutes, notamment pour la pizza, les aliments frits, le pain et les aliments panés.",
    safetyNoteTitle: "⚠️ Note de sécurité",
    safetyNoteText: "Les temps et les températures sont indicatifs. Pour les restes de viande, de volaille, de poisson et les plats composés, vérifiez qu’ils sont chauffés uniformément et bien chauds à l’intérieur ; pour une sécurité alimentaire maximale, utilisez un thermomètre et contrôlez que la température interne atteint 74°C.",
    fsTitle: "3 Règles d'Or pour Réchauffer :",
    fsList: [
      "<strong>Adaptez la température à l’aliment :</strong> pour de nombreux restes, commencez à température modérée et augmentez-la seulement si vous souhaitez plus de croustillant. Vérifiez que l’aliment est chaud à l’intérieur et adaptez le temps à la quantité et à l’épaisseur.",
      "<strong>Ne bloquez pas la circulation de l’air :</strong> évitez les feuilles entières de papier cuisson ou d’aluminium qui couvrent toute la base. Si vous utilisez de l’aluminium pour couvrir un aliment, fixez-le correctement et ne le laissez jamais libre pendant le préchauffage.",
      "<strong>Ajoutez un peu d’humidité :</strong> si le pain ou la pizza sont secs, vaporisez un peu d’eau sur la surface avant de les réchauffer."
    ],
    ui: { temp: "Temp.", time: "Temps", tip: "💡 Conseil:" },
    categories: [
      {
        id: "lievitati", icon: "🍕", title: "Pizza, Pain et Pâtisseries",
        items: [
          { emoji: "🍕", name: "Pizza (Parts)", temp: "170°C", time: "3-4 min", tip: "Ajoutez quelques gouttes d'eau sur la croûte avant de chauffer." },
          { emoji: "🥖", name: "Pain, sandwichs et focaccia", temp: "160-170°C", time: "2-4 min", tip: "Si le pain ou la focaccia sont secs, humidifiez-les légèrement ; attention aux sandwichs garnis, qui peuvent nécessiter un peu plus de temps." },
          { emoji: "🥐", name: "Croissants", temp: "150°C", time: "2-3 min", tip: "Attention aux fourrages (crème/chocolat) qui deviennent brûlants très vite !" },
          { emoji: "🥧", name: "Quiche / Tarte", temp: "160°C", time: "5-7 min", tip: "La basse température assure que l'intérieur chauffe avant que la croûte ne brûle." },
          { emoji: "🥟", name: "Feuilletés", temp: "170°C", time: "4-5 min", tip: "La pâte feuilletée peut retrouver une partie de son croustillant sans ajouter d’huile." },
          { emoji: "🥞", name: "Pancakes & Muffins", temp: "150°C", time: "2-3 min", tip: "Pour ne pas faire brunir le dessus, couvrez légèrement d'aluminium." }
        ]
      },
      {
        id: "carne", icon: "🥩", title: "Viande et Volaille",
        items: [
          { emoji: "🥩", name: "Viande / Steak", temp: "150°C", time: "3-4 min", tip: "Baissez la température. S'il était saignant, ne dépassez pas 3 minutes." },
          { emoji: "🍗", name: "Poulet rôti, cuisses et poulet rôti à la broche", temp: "170°C", time: "5-6 min", tip: "Disposez les morceaux en une seule couche, retournez-les à mi-cuisson et vérifiez qu'ils sont bien chauds près de l'os. Les temps sont indicatifs." },
          { emoji: "🍔", name: "Steak Haché", temp: "160°C", time: "4-5 min", tip: "Si vous ajoutez du fromage, mettez-le à la dernière minute pour le faire fondre." },
          { emoji: "🧆", name: "Boulettes de viande", temp: "160°C", time: "5-7 min", tip: "Coupez-les en deux si elles sont grosses pour bien les réchauffer à l’intérieur." },
          { emoji: "🥩", name: "Escalope Pannée", temp: "170°C", time: "3-4 min", tip: "Vaporisez un peu d'huile si la panure semble trop sèche." },
          { emoji: "🍢", name: "Brochettes", temp: "180°C", time: "3-4 min", tip: "Surveillez le temps pour éviter de dessécher la viande. Les temps peuvent varier selon l’épaisseur et la température initiale." },
          { emoji: "🌭", name: "Saucisses", temp: "160°C", time: "3-4 min", tip: "Ne les piquez SURTOUT PAS, sinon elles perdront tout leur jus." }
        ]
      },
      {
        id: "pesce", icon: "🐟", title: "Poissons et Fritures",
        items: [
          { emoji: "🍤", name: "Poisson frit et friture de poisson", temp: "180°C", time: "3-5 min", tip: "Disposez le poisson en une seule couche et vérifiez après environ 3 minutes pour éviter de le dessécher." },
          { emoji: "🐟", name: "Poisson au four", temp: "160°C", time: "4-5 min", tip: "Réchauffez-le dans un récipient compatible et vérifiez qu’il est bien chaud à l’intérieur sans le dessécher." }
        ]
      },
      {
        id: "primi", icon: "🍝", title: "Plats Principaux",
        items: [
          { emoji: "🍝", name: "Pâtes au four / Lasagnes", temp: "160°C", time: "6-8 min", tip: "Placez-les dans un récipient compatible avec l’air fryer pour retenir la sauce et favoriser un réchauffage uniforme." },
          { emoji: "🍝", name: "Pâtes déjà cuites / Pâtes en sauce", temp: "160°C", time: "4-6 min", tip: "Placez-les dans un récipient compatible avec l’air fryer et ajoutez un peu de sauce ou une cuillère à soupe d’eau si elles semblent sèches. Mélangez à mi-cuisson." },
          { emoji: "🍳", name: "Omelette", temp: "150°C", time: "4-5 min", tip: "Chauffez doucement pour que l'œuf ne devienne pas caoutchouteux." },
          { emoji: "🌯", name: "Kebab / Wraps", temp: "170°C", time: "4-5 min", tip: "Enveloppez d'aluminium pour le rendre moelleux, laissez libre pour le croustillant." }
        ]
      },
      {
        id: "contorni", icon: "🍟", title: "Accompagnements",
        items: [
          { emoji: "🍟", name: "Frites", temp: "180°C", time: "4-5 min", tip: "Secouez le panier à mi-cuisson et ajoutez un pschitt d'huile." },
          { emoji: "🍘", name: "Arancini, supplì et croquettes", temp: "180°C", time: "5-7 min", tip: "Disposez-les en une seule couche et vérifiez qu’ils sont bien chauds à l’intérieur avant de les servir." },
        ]
      }
    ],
    faqTitle: "FAQ",
    faqs: [
      { q: "Combien de temps faut-il pour réchauffer une pizza dans une friteuse à air ?", a: "Réchauffer une pizza dans une friteuse à air prend seulement 3-4 minutes à 160°C. La croûte redevient croustillante sans sécher la garniture." },
      { q: "Comment réchauffer du poulet frit sans le rendre sec ?", a: "Pour réchauffer du poulet frit, utilisez 160°C pendant 5-6 minutes. Vaporisez un peu d'huile sur la surface pour garder la croûte croustillante." },
      { q: "Peut-on réchauffer du riz dans une friteuse à air ?", a: "Oui, vous pouvez réchauffer du riz dans une friteuse à air à 150°C pendant 4-5 minutes. Ajoutez une cuillère à soupe d'eau et couvrez avec du papier cuisson pour éviter qu'il ne sèche." }
    ]
  }
} as const;
