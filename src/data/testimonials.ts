export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  placeholder?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'placeholder-1',
    name: '[Nom Prénom]',
    role: '[Étudiant·e en M2 — Université]',
    quote:
      "[Témoignage à remplir avec un vrai retour d'étudiant·e accompagné·e par HES sur son mémoire.]",
    placeholder: true,
  },
  {
    id: 'placeholder-2',
    name: '[Nom Prénom]',
    role: '[Doctorant·e — Discipline]',
    quote:
      "[Témoignage à remplir avec un retour de chercheur·e sur l'accompagnement biostatistique.]",
    placeholder: true,
  },
];
