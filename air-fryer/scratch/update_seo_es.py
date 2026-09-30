import sys
import re

content = open('src/data/i18n/page-errors-seo.ts', encoding='utf-8').read()

es_block = '''    brandFaqsTemplate: [
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
    ]'''

# For ES, find "  },\n  fr: {" and replace it with "    ],\n" + es_block + "\n  },\n  fr: {"
if 'modelFaqsTemplate' not in content.split('es: {')[1].split('fr: {')[0]:
    content = re.sub(r'(\s*\}\n\s*\]\n\s*\},\n\s*fr: \{)', r'\n' + es_block + r'\1', content)

with open('src/data/i18n/page-errors-seo.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ES block.")
