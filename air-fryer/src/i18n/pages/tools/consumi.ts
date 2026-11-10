export const seoData = {
  it: {
    title: "Consumo Friggitrice ad Aria in kWh | Costo Bolletta",
    description: "Scopri quanti Watt consuma una friggitrice ad aria e calcola il costo esatto in kWh sulla bolletta elettrica. Confronto consumi con il forno tradizionale."
  },
  en: {
    title: "Air Fryer Power Consumption in kWh | Electricity Cost",
    description: "Discover how many Watts your air fryer uses and calculate the exact kWh cost on your electricity bill. Compare energy consumption with a traditional oven."
  },
  es: {
    title: "Consumo Freidora de Aire en kWh: Calculadora de Gasto de Luz",
    description: "Descubre cuántos vatios consume una freidora de aire y calcula el costo exacto en kWh de tu factura de luz. Compara el gasto con un horno tradicional."
  },
  fr: {
    title: "Consommation Friteuse à Air en kWh | Coût Électrique",
    description: "Découvrez combien de Watts consomme une friteuse à air et calculez le coût exact en kWh sur votre facture d'électricité. Comparaison avec le four."
  }
} as const;

export const content = {
  it: {
    h1: "Consumi Friggitrice ad Aria: Calcola il Costo in Bolletta in kWh",
    intro: "Quanto costa usare la friggitrice ad aria in termini di bolletta elettrica? Scopri il consumo in kWh e confrontalo con il forno tradizionale per capire se conviene davvero.",
    desc: seoData.it.description,
    liveBadge: "🔴 LIVE",
    wLabel: "Potenza Friggitrice (Watt)",
    mLabel: "Minuti di Cottura",
    cLabel: "Costo Energia (€/kWh)",
    resAF: "Costo Friggitrice",
    resOven: "Costo Forno Elettrico (2500W)*",
    resSave: "Soldi Risparmiati",
    ovenNote: "*Il forno tradizionale richiede circa il 25% di tempo in più per eguagliare la cottura ad aria.",
    editorialH2: "Perché la Friggitrice ad Aria consuma meno?",
    tableH2: "Tabella dei consumi: kWh e costo per durata",
    tableIntro: "Il consumo si calcola così: kWh = potenza in Watt × minuti ÷ 60.000. Il costo è kWh × prezzo dell'energia. La tabella usa un prezzo di esempio di 0,25 €/kWh e la potenza massima dichiarata: in pratica il consumo reale è più basso, perché la resistenza si spegne a intermittenza una volta raggiunta la temperatura.",
    tableColPower: "Potenza",
    tableMinUnit: "min",
    tableKwh: "kWh",
    tableNote: "Valori indicativi a potenza piena; usa la calcolatrice sopra con il prezzo della tua bolletta.",
    editorialText: "A differenza del forno tradizionale che impiega 15-20 minuti solo per scaldare un'enorme camera d'aria da 60 litri, la friggitrice ad aria satura la sua camera compatta in pochissimi minuti. Inoltre, il <strong>potente flusso ciclonico</strong> riduce i tempi di cottura complessivi del 20-30%. Questo significa che, sebbene il picco di assorbimento (i Watt) sia simile, la resistenza elettrica resta accesa per molto meno tempo, tagliando drasticamente il calcolo dei kWh totali.",
    faqTitle: "Domande Frequenti sui Consumi",
    faqs: [
      { q: "È vero che la friggitrice ad aria fa saltare la corrente?", a: "Se hai un contratto base da 3kW e accendi contemporaneamente forno, lavatrice e friggitrice (che assorbe in media 1500-2000W), il contatore scatterà. Usala come useresti un normale forno elettrico." },
      { q: "Conviene usarla per cucinare per una sola persona?", a: "Assolutamente sì. Per porzioni piccole e medie, la friggitrice ad aria è imbattibile. Accendere un forno tradizionale da 2500W per cuocere una singola fetta di salmone è uno spreco energetico enorme." },
      { q: "Rispetto al forno a microonde consuma di più?", a: "Sì, il microonde consuma meno energia, ma funziona in modo diverso: agisce sulle molecole d'acqua e non crea crosticine. Sono due elettrodomestici complementari, non sostitutivi." }
    ]
  },
  en: {
    h1: "Air Fryer Energy Consumption: Calculate Your Electricity Cost",
    intro: "How much does it cost to use an air fryer on your electricity bill? Discover the kWh consumption and compare it with a traditional oven to see if it's really worth it.",
    desc: seoData.en.description,
    liveBadge: "🔴 LIVE",
    wLabel: "Air Fryer Power (Watts)",
    mLabel: "Cooking Minutes",
    cLabel: "Energy Cost (€/kWh)",
    resAF: "Air Fryer Cost",
    resOven: "Electric Oven Cost (2500W)*",
    resSave: "Money Saved",
    ovenNote: "*A traditional oven requires about 25% more time to match air frying results.",
    editorialH2: "Why does the Air Fryer use less energy?",
    tableH2: "Consumption table: kWh and cost by cooking time",
    tableIntro: "Consumption is calculated as: kWh = power in Watts × minutes ÷ 60,000. The cost is kWh × your energy price. The table uses an example price of €0.25/kWh and the maximum rated power: real consumption is lower, because the heating element cycles on and off once the temperature is reached.",
    tableColPower: "Power",
    tableMinUnit: "min",
    tableKwh: "kWh",
    tableNote: "Indicative values at full power; use the calculator above with the price on your bill.",
    editorialText: "Unlike a traditional oven that takes 15-20 minutes just to heat a massive 60-liter air chamber, an air fryer saturates its compact chamber in minutes. Additionally, the <strong>powerful cyclonic airflow</strong> reduces overall cooking times by 20-30%. This means that although the peak wattage is similar, the heating element stays on for much less time, drastically cutting the total kWh used.",
    faqTitle: "Frequently Asked Questions about Energy",
    faqs: [
      { q: "Does the air fryer draw too much power?", a: "An air fryer draws 1500-2000W on average. If you run it alongside a traditional oven and a washing machine, you might trip the breaker. Treat it like a regular heavy appliance." },
      { q: "Is it worth using for just one person?", a: "Absolutely. For small to medium portions, the air fryer is unbeatable. Turning on a 2500W traditional oven to cook a single piece of salmon is a massive energy waste." },
      { q: "Does it use more energy than a microwave?", a: "Yes, a microwave uses less energy, but it works differently (heating water molecules) and cannot crisp food. They are complementary appliances." }
    ]
  },
  es: {
    h1: "Consumo Freidora de Aire: Calcula el Costo en la Factura de Luz",
    intro: "¿Cuánto cuesta usar la freidora de aire en la factura de la luz? Descubre el consumo en kWh y compáralo con el horno tradicional para saber si vale la pena.",
    desc: seoData.es.description,
    liveBadge: "🔴 LIVE",
    wLabel: "Potencia Freidora (Vatios)",
    mLabel: "Minutos de Cocción",
    cLabel: "Coste Energía (€/kWh)",
    resAF: "Coste Freidora",
    resOven: "Coste Horno Eléctrico (2500W)*",
    resSave: "Dinero Ahorrado",
    ovenNote: "*El horno tradicional requiere un 25% más de tiempo para igualar la cocción por aire.",
    editorialH2: "¿Por qué la freidora de aire consume menos?",
    tableH2: "Tabla de consumo: kWh y coste según el tiempo",
    tableIntro: "El consumo se calcula así: kWh = potencia en vatios × minutos ÷ 60.000. El coste es kWh × precio de la energía. La tabla usa un precio de ejemplo de 0,25 €/kWh y la potencia máxima declarada: en la práctica el consumo real es menor, porque la resistencia se apaga de forma intermitente al alcanzar la temperatura.",
    tableColPower: "Potencia",
    tableMinUnit: "min",
    tableKwh: "kWh",
    tableNote: "Valores orientativos a plena potencia; usa la calculadora de arriba con el precio de tu factura.",
    editorialText: "A diferencia del horno tradicional, que tarda 15-20 minutos solo en calentar una enorme cámara de 60 litros, la freidora satura su cámara compacta en minutos. Además, el <strong>potente flujo ciclónico</strong> reduce los tiempos de cocción un 20-30%. Aunque el pico de vatios es similar, la resistencia eléctrica está encendida mucho menos tiempo, reduciendo los kWh totales.",
    faqTitle: "Preguntas Frecuentes sobre Consumo",
    faqs: [
      { q: "¿Es verdad que la freidora gasta mucha luz?", a: "Tiene un pico de 1500-2000W. Si la usas a la vez que el horno tradicional y la lavadora, podrían saltar los plomos. Úsala como un electrodoméstico potente normal." },
      { q: "¿Vale la pena usarla para una sola persona?", a: "Totalmente. Para porciones pequeñas, es imbatible. Encender un horno de 2500W para un solo filete de salmón es un gran desperdicio de energía." },
      { q: "¿Consume más que un microondas?", a: "Sí, el microondas consume menos, pero funciona agitando moléculas de agua y no tuesta ni dora los alimentos. Son electrodomésticos complementarios." }
    ]
  },
  fr: {
    h1: "Simulateur de Facture",
    intro: "Combien coûte l'utilisation de la friteuse à air sur votre facture d'électricité ? Découvrez la consommation en kWh et comparez-la avec un four traditionnel pour voir si cela en vaut vraiment la peine.",
    desc: seoData.fr.description,
    liveBadge: "🔴 LIVE",
    wLabel: "Puissance Friteuse (Watts)",
    mLabel: "Minutes de Cuisson",
    cLabel: "Coût de l'Énergie (€/kWh)",
    resAF: "Coût Friteuse",
    resOven: "Coût Four Électrique (2500W)*",
    resSave: "Argent Économisé",
    ovenNote: "*Un four traditionnel nécessite environ 25 % de temps en plus pour égaler la cuisson à l'air.",
    editorialH2: "Pourquoi la Friteuse à Air consomme-t-elle moins ?",
    tableH2: "Tableau de consommation : kWh et coût selon la durée",
    tableIntro: "La consommation se calcule ainsi : kWh = puissance en watts × minutes ÷ 60 000. Le coût est kWh × prix de l'énergie. Le tableau utilise un prix d'exemple de 0,25 €/kWh et la puissance maximale indiquée : en pratique la consommation réelle est plus faible, car la résistance se coupe par intermittence une fois la température atteinte.",
    tableColPower: "Puissance",
    tableMinUnit: "min",
    tableKwh: "kWh",
    tableNote: "Valeurs indicatives à pleine puissance ; utilisez le calculateur ci-dessus avec le prix de votre facture.",
    editorialText: "Contrairement à un four traditionnel qui met 15 à 20 minutes pour chauffer une grande cavité de 60 litres, la friteuse sature sa petite chambre en quelques minutes. De plus, le <strong>flux d'air cyclonique</strong> réduit le temps de cuisson de 20 à 30 %. Bien que la puissance maximale (Watts) soit similaire, la résistance chauffe moins longtemps, réduisant ainsi les kWh totaux.",
    faqTitle: "Questions Fréquentes sur l'Énergie",
    faqs: [
      { q: "La friteuse à air fait-elle sauter les plombs ?", a: "Elle consomme 1500-2000W. Si vous l'utilisez en même temps qu'un four traditionnel et un lave-linge, le disjoncteur peut sauter. Utilisez-la comme un gros appareil normal." },
      { q: "Est-il intéressant de l'utiliser pour une seule personne ?", a: "Absolument. Pour de petites portions, elle est imbattable. Allumer un four de 2500W pour un seul pavé de saumon est un énorme gaspillage d'énergie." },
      { q: "Consomme-t-elle plus qu'un micro-ondes ?", a: "Oui, le micro-ondes consomme moins, mais il ne dore ni ne croustille les aliments. Ce sont des appareils complémentaires." }
    ]
  }
} as const;
