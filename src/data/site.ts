export const SITE = {
  name: 'Heaven Elijah Service',
  shortName: 'HES',
  tagline: 'De la conception à la soutenance.',
  description:
    "Cabinet d'accompagnement scientifique pour étudiants et chercheurs : méthodologie, biostatistique et rédaction.",
  url: 'https://heavenelijahservice.org',
  locale: 'fr_FR',
  contact: {
    email: 'heaven.elijahservice@gmail.com',
    phone: '+221 76 387 34 28',
    whatsapp: '+221 77 130 41 65',
    whatsappLink: 'https://wa.me/221771304165',
    address: 'Dakar, Sénégal',
  },
  social: {
    linkedin: '',
    facebook: '',
  },
  ogImage: '/og-image.png',
} as const;

export type SiteConfig = typeof SITE;
