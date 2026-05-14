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
    phone: '+221 77 130 41 65',
    whatsapp: '+221 76 387 34 28',
    whatsappLink: 'https://wa.me/221763873428',
    address: 'Thiès, Sénégal',
  },
  social: {
    /** Taplink centralisant Facebook, Instagram et LinkedIn (le champ garde le nom 'linktree' pour stabilité côté Footer). */
    linktree: 'https://taplink.cc/heaven_elijah_service',
    platforms: ['Facebook', 'Instagram', 'LinkedIn'],
  },
  ogImage: '/og-image.png',
} as const;

export type SiteConfig = typeof SITE;
