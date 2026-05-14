export type PackFamilyId = 'memoire-these' | 'analyse' | 'collecte';

export type Pack = {
  id: string;
  family: PackFamilyId;
  name: string;
  priceFCFA: number;
  delivery: string;
  features: string[];
  featured?: boolean;
};

export type PackFamily = {
  id: PackFamilyId;
  label: string;
  tagline: string;
  description: string;
};

export const FAMILIES: PackFamily[] = [
  {
    id: 'memoire-these',
    label: 'Parcours A à Z',
    tagline: 'Mémoire / Thèse',
    description:
      "Accompagnement complet : protocole, questionnaire, analyse et références bibliographiques.",
  },
  {
    id: 'analyse',
    label: 'Données prêtes',
    tagline: 'Analyse',
    description:
      "Vous avez la base de données, on livre les analyses descriptives, bivariées et multivariées.",
  },
  {
    id: 'collecte',
    label: 'Avant terrain',
    tagline: 'Collecte',
    description:
      "Préparation du terrain : protocole, questionnaire papier ou numérique (ODK / KoBo / Google Form).",
  },
];

export const PACKS: Pack[] = [
  {
    id: 'memoire-essentiel',
    family: 'memoire-these',
    name: 'Essentiel',
    priceFCFA: 90000,
    delivery: '3 semaines',
    features: [
      'Protocole + questionnaire (structure + variables)',
      'Analyse descriptive (tableaux + figures 2D)',
      'Références bibliographiques (Vancouver)',
    ],
  },
  {
    id: 'memoire-standard',
    family: 'memoire-these',
    name: 'Standard',
    priceFCFA: 110000,
    delivery: '3 semaines',
    featured: true,
    features: [
      'Protocole + questionnaire',
      "Fiche d'enquête numérique (ODK / KoBo / Google Form)",
      'Analyse descriptive + bivariée',
      'Références bibliographiques (Vancouver)',
    ],
  },
  {
    id: 'memoire-premium',
    family: 'memoire-these',
    name: 'Premium',
    priceFCFA: 130000,
    delivery: '3 semaines',
    features: [
      'Protocole + questionnaire + fiche numérique',
      'Analyse descriptive + multivariée (si indiquée)',
      'Références bibliographiques (Vancouver)',
      'Suivi soutenance',
    ],
  },
  {
    id: 'analyse-essentiel',
    family: 'analyse',
    name: 'Essentiel',
    priceFCFA: 50000,
    delivery: '3 semaines',
    features: [
      'Analyse descriptive (tableaux + figures 2D)',
      'Délai 3 semaines',
    ],
  },
  {
    id: 'analyse-plus',
    family: 'analyse',
    name: 'Plus',
    priceFCFA: 70000,
    delivery: '3 semaines',
    featured: true,
    features: [
      'Analyse descriptive + bivariée',
      'Tableaux analytiques standardisés avec interprétation',
      'Délai 3 semaines',
    ],
  },
  {
    id: 'analyse-premium',
    family: 'analyse',
    name: 'Premium',
    priceFCFA: 90000,
    delivery: '2 semaines',
    features: [
      'Analyse descriptive + multivariée (OR/IC 95 % / β/IC 95 %) selon le modèle',
      'Interprétation analyse multivariée',
      'Délai 2 semaines',
    ],
  },
  {
    id: 'collecte-essentiel',
    family: 'collecte',
    name: 'Essentiel',
    priceFCFA: 20000,
    delivery: 'Avant terrain',
    features: [
      'Protocole + questionnaire (structure + variables)',
      "Mini-plan d'analyse",
    ],
  },
  {
    id: 'collecte-plus',
    family: 'collecte',
    name: 'Plus',
    priceFCFA: 30000,
    delivery: 'Avant terrain',
    featured: true,
    features: [
      "Essentiel + fiche d'enquête numérique",
      'ODK / KoBo / Google Form selon besoin',
    ],
  },
  {
    id: 'collecte-premium',
    family: 'collecte',
    name: 'Premium',
    priceFCFA: 40000,
    delivery: 'Avant terrain',
    features: [
      'Plus + classement des références bibliographiques',
      'Format Vancouver',
    ],
  },
];

export function getPacksByFamily(family: PackFamilyId): Pack[] {
  return PACKS.filter(p => p.family === family);
}

/**
 * Taux de change utilisés pour l'affichage des prix multi-devises.
 * - EUR : taux fixe légal depuis 1999 (1 EUR = 655,957 FCFA).
 * - USD : approximation à mettre à jour si le cours EUR/USD évolue fortement.
 */
export const EUR_PER_XOF = 655.957;
export const USD_PER_XOF = 600;

export function formatFCFA(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

export function formatEUR(fcfa: number): string {
  const eur = Math.round(fcfa / EUR_PER_XOF);
  return `≈ ${eur} €`;
}

export function formatUSD(fcfa: number): string {
  const usd = Math.round(fcfa / USD_PER_XOF);
  return `≈ ${usd} $`;
}

/** Renvoie les trois devises en une seule chaîne compacte : "≈ 137 € · ≈ 150 $". */
export function formatEURandUSD(fcfa: number): string {
  return `${formatEUR(fcfa)} · ${formatUSD(fcfa)}`;
}
