# Heaven Elijah Service — Site web

Site vitrine officiel de [Heaven Elijah Service](https://heavenelijahservice.org), cabinet d'accompagnement scientifique pour étudiants et chercheurs basé à Dakar.

## Stack

- [Next.js 14](https://nextjs.org/) — App Router en mode `output: 'export'` (HTML statique)
- [Tailwind CSS v4](https://tailwindcss.com/) — design tokens via `@theme`
- [Framer Motion](https://www.framer.com/motion/) — animations (à activer dans une itération ultérieure)
- [Geist Sans + Mono](https://vercel.com/font) — typographie
- [lucide-react](https://lucide.dev/) — icônes
- [Vitest](https://vitest.dev/) + Testing Library + jest-axe — tests
- [Formspree](https://formspree.io/) — formulaire de contact (plan gratuit)
- [Vercel](https://vercel.com/) — hébergement statique

## Démarrer en local

```bash
# Prérequis : Node.js 20+
node -v

# 1. Installer les dépendances
npm install

# 2. Copier .env.example vers .env.local et renseigner Formspree
cp .env.example .env.local
# puis éditer NEXT_PUBLIC_FORMSPREE_ID

# 3. Lancer le serveur de dev
npm run dev
# → http://localhost:3000
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement avec hot-reload |
| `npm run build` | Build production statique vers `out/` |
| `npm run start` | Sert le build (utile localement) |
| `npm test` | Lance la suite Vitest |
| `npm run lint` | ESLint |

## Où modifier quoi

| Élément | Fichier |
|---|---|
| Coordonnées (email, téléphone, WhatsApp) | `src/data/site.ts` |
| Tarifs et contenu des packs | `src/data/packs.ts` |
| Témoignages | `src/data/testimonials.ts` |
| Logo | `public/logo.svg` |
| Palette de couleurs | `src/app/globals.css` (bloc `@theme`) |
| Métadonnées SEO globales | `src/app/layout.tsx` |
| OG image | `public/og-image.png` (1200×630) — à créer |

## Déploiement

Le site est conçu pour être déployé sur **Vercel** :

1. Pousser le repo sur GitHub
2. Importer le repo dans Vercel — le framework Next.js est détecté automatiquement
3. Ajouter la variable d'environnement `NEXT_PUBLIC_FORMSPREE_ID` dans Vercel (Project Settings → Environment Variables)
4. Le déploiement se fait automatiquement à chaque push sur `main`

### Domaine personnalisé

Une fois `heavenelijahservice.org` acquis :

1. Vercel → Project → Domains → Add → `heavenelijahservice.org`
2. Configurer chez le registrar les enregistrements DNS indiqués par Vercel
3. SSL géré automatiquement par Let's Encrypt

## Placeholders à remplacer avant mise en ligne publique

- [ ] Logo SVG vectoriel HD (`public/logo.svg` — actuellement un placeholder géométrique)
- [ ] OG image 1200×630 (`public/og-image.png` — à créer)
- [ ] Favicon (`public/favicon.ico` — à créer)
- [ ] Témoignages réels (`src/data/testimonials.ts`)
- [ ] Texte mission complet (`src/app/a-propos/page.tsx`)
- [ ] Photos d'équipe (`public/equipe/*` + `src/app/a-propos/page.tsx`)
- [ ] Stats réelles (compteur dans `WhyHES.tsx` — actuellement `50+`)
- [ ] Liens réseaux sociaux (`src/data/site.ts`)
- [ ] Adresse exacte pour la carte Google Maps (`src/app/contact/page.tsx`)

## Architecture

```
src/
├── app/                          # Routes Next.js App Router
│   ├── layout.tsx                # Layout racine (fonts, metadata, Header/Footer)
│   ├── page.tsx                  # Accueil (6 sections + JSON-LD)
│   ├── services/page.tsx
│   ├── a-propos/page.tsx
│   ├── contact/page.tsx
│   ├── not-found.tsx             # 404
│   ├── sitemap.ts                # /sitemap.xml
│   ├── robots.ts                 # /robots.txt
│   └── globals.css               # Tokens @theme, reset, utilitaires
├── components/
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # 6 sections d'accueil
│   └── ui/                       # Button, BentoCard, PackCard, AnimatedCounter, ContactForm
└── data/                         # site, packs, testimonials (typés)
```

## Tests

Couvre les unités à haut risque :
- `src/data/site.test.ts` — config exposée et types
- `src/data/packs.test.ts` — 9 packs, familles, prix
- `src/components/ui/Button.test.tsx` — variantes + link/button auto
- `src/components/ui/ContactForm.test.tsx` — validation client
- `src/app/page.test.tsx` — zéro violation axe (a11y)

## Licence

Code propriétaire — Heaven Elijah Service. Tous droits réservés.
