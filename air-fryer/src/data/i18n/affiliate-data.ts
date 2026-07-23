export interface AffiliateProduct {
  id: string;
  title: string;
  copy: string;
  link: string;
  imageUrl?: string;
  svgIcon?: string;
}

export interface AffiliateContextData {
  uiTitle: string;
  uiSponsoredText: string;
  products: AffiliateProduct[];
}

export interface AffiliateData {
  [context: string]: AffiliateContextData;
}

export const affiliateTranslations: Record<string, AffiliateData> = {
  it: {
    'error-codes': {
      uiTitle: "Consigliati per te",
      uiSponsoredText: "Sponsorizzato",
      products: [
        {
          id: "degreaser",
          title: "Sgrassatore Professionale Forni",
          copy: "Elimina le incrostazioni che causano fumo bianco e bloccano i sensori.",
          link: "https://www.amazon.it/dp/B07XYZ123?tag=crispissimo-it-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>'
        },
        {
          id: "silicone-liners",
          title: "Tappetini in Silicone per Friggitrice",
          copy: "Proteggi il cestello dall'usura e facilita la pulizia quotidiana.",
          link: "https://www.amazon.it/dp/B08ABC456?tag=crispissimo-it-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>'
        },
        {
          id: "new-air-fryer",
          title: "Nuova Friggitrice ad Aria",
          copy: "Apparecchio guasto o fuori garanzia? Scopri le migliori alternative aggiornate al 2024.",
          link: "https://www.amazon.it/dp/B09XYZ789?tag=crispissimo-it-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>'
        }
      ]
    }
  },
  en: {
    'error-codes': {
      uiTitle: "Recommended for you",
      uiSponsoredText: "Sponsored",
      products: [
        {
          id: "degreaser",
          title: "Professional Oven Degreaser",
          copy: "Eliminates crusts that cause white smoke and block sensors.",
          link: "https://www.amazon.com/dp/B07XYZ123?tag=crispissimo-en-20",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>'
        },
        {
          id: "silicone-liners",
          title: "Silicone Liners for Air Fryer",
          copy: "Protect the basket from wear and make daily cleaning easier.",
          link: "https://www.amazon.com/dp/B08ABC456?tag=crispissimo-en-20",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>'
        },
        {
          id: "new-air-fryer",
          title: "New Air Fryer",
          copy: "Broken appliance or out of warranty? Discover the best updated alternatives.",
          link: "https://www.amazon.com/dp/B09XYZ789?tag=crispissimo-en-20",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>'
        }
      ]
    }
  },
  es: {
    'error-codes': {
      uiTitle: "Recomendados para ti",
      uiSponsoredText: "Patrocinado",
      products: [
        {
          id: "degreaser",
          title: "Desengrasante Profesional para Hornos",
          copy: "Elimina las incrustaciones que causan humo blanco y bloquean los sensores.",
          link: "https://www.amazon.es/dp/B07XYZ123?tag=crispissimo-es-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>'
        },
        {
          id: "silicone-liners",
          title: "Alfombrillas de Silicona para Freidora",
          copy: "Protege la cesta del desgaste y facilita la limpieza diaria.",
          link: "https://www.amazon.es/dp/B08ABC456?tag=crispissimo-es-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>'
        },
        {
          id: "new-air-fryer",
          title: "Nueva Freidora de Aire",
          copy: "¿Aparato averiado o fuera de garantía? Descubre las mejores alternativas.",
          link: "https://www.amazon.es/dp/B09XYZ789?tag=crispissimo-es-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>'
        }
      ]
    }
  },
  fr: {
    'error-codes': {
      uiTitle: "Recommandés pour vous",
      uiSponsoredText: "Sponsorisé",
      products: [
        {
          id: "degreaser",
          title: "Dégraissant Professionnel",
          copy: "Élimine les incrustations qui causent de la fumée blanche et bloquent les capteurs.",
          link: "https://www.amazon.fr/dp/B07XYZ123?tag=crispissimo-fr-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>'
        },
        {
          id: "silicone-liners",
          title: "Tapis en Silicone",
          copy: "Protégez le panier de l'usure et facilitez le nettoyage quotidien.",
          link: "https://www.amazon.fr/dp/B08ABC456?tag=crispissimo-fr-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>'
        },
        {
          id: "new-air-fryer",
          title: "Nouvelle Friteuse à Air",
          copy: "Appareil en panne ou hors garantie ? Découvrez les meilleures alternatives.",
          link: "https://www.amazon.fr/dp/B09XYZ789?tag=crispissimo-fr-21",
          svgIcon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>'
        }
      ]
    }
  }
};
