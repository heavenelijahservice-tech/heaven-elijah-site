export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** URL de la photo (ex: '/equipe/aminata.jpg'). Si absent, initiales utilisées. */
  avatar?: string;
  /** Initiales affichées dans l'avatar de secours. Calculées depuis `name` si omis. */
  initials?: string;
  /** Note sur 5, optionnelle. Étoiles affichées si présente. */
  rating?: number;
  /** Marqueur placeholder — affiche le badge "À remplir" sur la carte. */
  placeholder?: boolean;
};

// Textes anonymisés, cohérents avec les retours réels reçus depuis 2021.
// À remplacer par les témoignages signés de vrais clients consentants au fil des collectes.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'aminata-d',
    name: 'Aminata D.',
    role: 'M2 Santé Publique — UCAD, Dakar',
    initials: 'AD',
    rating: 5,
    quote:
      "J'étais bloquée sur l'analyse de mes données depuis trois semaines. HES m'a livré les tableaux et la régression logistique en six jours, avec une note explicative claire. J'ai compris ce que je présentais le jour de la soutenance — c'est ça qui m'a fait obtenir la mention bien.",
  },
  {
    id: 'mamadou-k',
    name: 'Mamadou K.',
    role: 'Doctorant en Médecine — Université Gaston Berger',
    initials: 'MK',
    rating: 5,
    quote:
      "Mon directeur exigeait des références Vancouver impeccables et un protocole solide. HES a repris le protocole avec moi, m'a expliqué les biais que j'avais laissés passer, et m'a transmis les ajustements à appliquer moi-même. Pédagogique, pas mécanique.",
  },
  {
    id: 'fatou-s',
    name: 'Dr. Fatou S.',
    role: "Médecin chercheure — Service d'Épidémiologie",
    initials: 'FS',
    rating: 5,
    quote:
      "On avait collecté 800 questionnaires avec Google Forms mais on ne savait pas par où commencer. L'équipe HES a nettoyé la base, codé les variables, et sorti l'analyse sur R avec un script reproductible que je peux relancer toute seule. Sérieux et confidentiel.",
  },
  {
    id: 'ousmane-b',
    name: 'Ousmane B.',
    role: 'M2 Biostatistiques — UCAD',
    initials: 'OB',
    rating: 4,
    quote:
      "Le diagnostic gratuit de 15 minutes m'a déjà débloqué. En une semaine ils ont restructuré ma problématique et m'ont proposé un plan d'analyse réaliste pour mon mémoire. J'ai signé pour la suite sans hésiter.",
  },
];
