# Spécification — Site web Heaven Elijah Service

**Date** : 2026-05-10
**Auteur** : Brainstorming HES × Claude Code
**Statut** : À valider par le commanditaire

---

## 1. Vue d'ensemble

### 1.1 Objectif

Créer un site web vitrine pour **Heaven Elijah Service (HES)**, cabinet d'accompagnement scientifique basé à Dakar. Le site présente l'offre, valorise l'expertise méthodologique et statistique, et génère des prises de contact qualifiées via un formulaire et WhatsApp.

### 1.2 Audience cible

- Étudiants en master et doctorat (Sénégal et Afrique de l'Ouest francophone) préparant un mémoire ou une thèse
- Chercheurs et cliniciens ayant besoin d'analyses biostatistiques
- Encadrants académiques cherchant un partenaire de confiance pour leurs étudiants

### 1.3 Tagline & positionnement

**"De la conception à la soutenance."**
Accompagnement méthodologique, statistique et rédactionnel — du protocole jusqu'aux références Vancouver.

### 1.4 Critères de succès

- Site en ligne sous `heavenelijahservice.org` (initialement sous-domaine Vercel)
- Page d'accueil chargée en moins de 2,5 s (LCP) sur 3G simulé
- Formulaire de contact fonctionnel envoyant à `heaven.elijahservice@gmail.com`
- Score Lighthouse ≥ 90 en Performance, Accessibilité, SEO
- Site lisible et utilisable sur mobile 320 px et desktop 1920 px
- Aucune dépendance backend à maintenir côté HES

---

## 2. Décisions de design

| Domaine | Décision | Raison |
|---|---|---|
| Type de site | Vitrine + contact (lean) | Délai court, faible maintenance, conversion directe |
| Direction visuelle | Bento moderne / startup | Énergique, met en avant chiffres et CTAs, distinctif |
| Pages | Accueil, Services, À propos, Contact | Couverture minimale efficace |
| Langue | Français uniquement | Audience principale francophone, plus simple à maintenir |
| Stack | Next.js 14+ (App Router, static export) | Performance, écosystème mature, évolutif |
| Styling | Tailwind CSS v4 | Tokens en CSS natif, productivité, cohérence |
| Animations | Framer Motion | Intégration React, contrôle fin, support `prefers-reduced-motion` |
| Formulaire | Formspree (plan gratuit) | Aucun backend à maintenir, 50 soumissions/mois |
| Hébergement | Vercel | Gratuit, déploiement auto sur push Git, SSL inclus |
| Domaine | `heavenelijahservice.org` (à acquérir) | Cohérence avec identité scientifique |

---

## 3. Architecture technique

### 3.1 Arborescence

```
E:\Projets\heaven-elijah-site\
├── public/
│   ├── logo.svg                    # Logo HES vectorisé
│   ├── favicon.ico
│   ├── og-image.png                # 1200×630 partage social
│   └── visuels/                    # Visuels HES additionnels
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout racine (Header + Footer + fonts)
│   │   ├── page.tsx                # Accueil
│   │   ├── services/page.tsx
│   │   ├── a-propos/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── globals.css             # Variables CSS, reset, classes utilitaires
│   │   ├── not-found.tsx           # 404
│   │   ├── sitemap.ts              # sitemap.xml généré
│   │   └── robots.ts               # robots.txt
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Nav sticky avec backdrop-blur
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── PackFamilies.tsx    # Bento 3 familles
│   │   │   ├── Process.tsx         # 4 étapes
│   │   │   ├── WhyHES.tsx          # Bento chiffres clés
│   │   │   ├── Testimonials.tsx
│   │   │   └── FinalCTA.tsx
│   │   └── ui/
│   │       ├── BentoCard.tsx       # Composant tuile bento générique
│   │       ├── Button.tsx          # Variantes primary/ghost
│   │       ├── PackCard.tsx        # Carte de pack (page Services)
│   │       ├── AnimatedCounter.tsx # Compteur 0 → valeur à l'apparition
│   │       └── ContactForm.tsx     # Formulaire Formspree
│   │
│   └── data/
│       ├── packs.ts                # 9 packs typés
│       ├── testimonials.ts         # Tableau témoignages (placeholders)
│       └── site.ts                 # Métadonnées (nom, contacts, URL, OG)
│
├── .env.local                      # NEXT_PUBLIC_FORMSPREE_ID (non versionné)
├── .env.example                    # Template
├── .gitignore
├── next.config.mjs                 # output: 'export', images.unoptimized: true
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

### 3.2 Versions & dépendances clés

| Paquet | Version cible | Rôle |
|---|---|---|
| `next` | 14.2.x ou 15.x | Framework |
| `react`, `react-dom` | 18.3.x | UI |
| `typescript` | 5.x | Typage |
| `tailwindcss` | 4.x | Styling |
| `framer-motion` | 11.x | Animations |
| `geist` | latest | Fonts Geist Sans + Mono |
| `lucide-react` | latest | Icônes (légères, stroke-based) |

### 3.3 Configuration Next.js (export statique)

```js
// next.config.mjs
export default {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

Conséquence : `next build` produit un dossier `out/` avec du HTML/CSS/JS pur, déployable n'importe où. Pas de fonctions serverless, pas de SSR.

---

## 4. Système de design

### 4.1 Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-deep` | `#0e1729` | Fond global de page |
| `--navy` | `#15233f` | Surfaces sombres (hero, footer, CTAs gradient) |
| `--tile` | `#1a2541` | Tuiles bento standard |
| `--border` | `#2a3a5c` | Contours, séparateurs |
| `--orange` | `#f09042` | Accent unique : CTAs, chiffres clés, labels, hover |
| `--orange-deep` | `#d9772b` | Gradient accent |
| `--light` | `#fafafa` | Section témoignages (rupture claire) |
| `--text` | `#ffffff` | Texte principal sur fond sombre |
| `--text-muted` | `#c9cfdc` | Texte secondaire |

### 4.2 Typographie

- **Geist Sans** — titres, body, UI. Chargée via `geist/font/sans` (Next.js, optimisé, autohébergée).
- **Geist Mono** — chiffres clés, prix, stats, labels mono. Chargée via `geist/font/mono` (même paquet, paire native). Crée un contraste "data/scientifique" avec le sans-serif.

Échelle :

| Niveau | Taille | Poids | Tracking |
|---|---|---|---|
| H1 hero | 48-56 px (clamp) | 700 | -0.03em |
| H2 section | 28-32 px | 700 | -0.02em |
| H3 carte | 16-18 px | 600-700 | normal |
| Body | 14-16 px | 400 | normal |
| Label | 10-11 px UPPERCASE | 700 | 0.2em |
| Mono stat | 28-42 px | 700 | normal |

### 4.3 Espacement (Tailwind par défaut)

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px`

- Padding sections verticales : 96-128 px desktop, 60-80 px mobile
- Padding tuiles bento : 16-24 px
- Gap grilles : 10-14 px

### 4.4 Anatomie d'une tuile bento

```
┌─────────────────────────────┐
│ LABEL DISCRET (orange, 10)  │
│                             │
│ Chiffre / titre en grand    │
│         (28-42 px)          │
│                             │
│ Description courte (option) │
└─────────────────────────────┘
   ↑ hover : translateY(-2px)
   + bordure orange (300 ms)
```

Une tuile sur deux peut être en accent orange (`linear-gradient(135deg, #f09042, #d9772b)`) pour rythmer la grille.

### 4.5 Animations

| Élément | Animation | Durée |
|---|---|---|
| Tuile bento (hover) | `translateY(-2px)` + `border-color: orange` | 300 ms ease |
| Chiffres clés | Compteur 0 → valeur à l'intersection | 1200 ms ease-out |
| Sections (scroll) | Fade-up + stagger 80 ms entre éléments | 600 ms |
| Hero catchline | Apparition mots-par-mots stagger 60 ms | 800 ms total |
| Boutons CTA | Hover : `translateY(-1px)` + ombre orange | 200 ms |
| Page transitions | Pas de transition custom (App Router natif) | — |

**Toutes les animations sont désactivées si l'utilisateur a `prefers-reduced-motion: reduce`.** Géré au niveau `globals.css` et via la prop `reduceMotion` de Framer Motion.

---

## 5. Pages — détail

### 5.1 Page d'accueil (`/`)

Sections dans l'ordre :

1. **Hero** — fond `bg-deep`, gradient radial orange en haut-droite. Label "— Dakar, Sénégal · Depuis 2024", H1 catchline avec "soutenance" en orange, paragraphe d'intro, deux CTAs (`Voir les packs` primary, `Discuter de mon projet` ghost), 3 badges réassurance (★ Confidentialité · ✓ 2 révisions · ⏱ Délais 2-3 sem.).

2. **Trois familles de packs** — bento grid 3 colonnes. Tuile vedette (Mémoire/Thèse, bordure orange) + Analyse + Collecte. Chaque tuile : label famille, titre, courte description, prix d'entrée (`90k →`), nombre de niveaux.

3. **Process en 4 étapes** — grille 4 colonnes avec ligne orange en fil rouge. Cercles numérotés `01 / 02 / 03 / 04` (Diagnostic express, Validation, Analyse, Restitution), titre court + une phrase chacun.

4. **Pourquoi HES (chiffres clés)** — bento 3×2 asymétrique. Tuile principale "Projets accompagnés" (placeholder `[XX]+`), tuile orange "Délai 2-3 sem.", tuiles "×2 révisions", "100 % confidentialité", "R · Python · ODK · KoBo · Vancouver".

5. **Témoignages** — section en rupture (fond `--light` clair). Grille 2 colonnes. Cartes blanches : citation avec guillemet orange, avatar circulaire navy, nom + rôle. Tag `[PLACEHOLDER]` jusqu'à insertion des vrais témoignages.

6. **CTA final** — bandeau navy avec bordure orange, gradient radial orange en bas-droite. H2 "Discutons de votre projet.", phrase "Diagnostic express gratuit en 15 minutes. Aucun engagement.", deux CTAs (Prendre contact, WhatsApp direct).

### 5.2 Page Services (`/services`)

- Hero court : titre "Tous les packs HES", lead descriptif.
- Trois sections, une par famille :
  - **Parcours A à Z (Mémoire / Thèse)** — 90 000 / 110 000 / 130 000 FCFA
  - **Analyse (base de données disponible)** — 50 000 / 70 000 / 90 000 FCFA
  - **Collecte (avant terrain)** — 20 000 / 30 000 / 40 000 FCFA
- Chaque pack : carte avec nom de niveau, prix mono orange, contenu court (basé sur le catalogue).
- Encadré conditions en bas : acompte 50 %, 2 révisions incluses, confidentialité, délais à compter de la réception complète des éléments.

### 5.3 Page À propos (`/a-propos`)

- Hero court : titre "De la conception à la soutenance.", lead.
- Bloc mission (placeholder ~150 mots) avec citation orange en exergue.
- Bloc "Outils maîtrisés" : chips listant R, Python, ODK, KoBo, Google Forms, Vancouver, SPSS, Excel.
- Bloc équipe : 3 cartes membres (placeholders avatar gradient navy/orange + nom + rôle).
- Bloc valeurs : 4 tuiles avec icônes `lucide-react` (`Shield` Confidentialité, `Target` Rigueur, `Zap` Réactivité, `Handshake` Pédagogie) en orange + courte description.

### 5.4 Page Contact (`/contact`)

- Hero court : titre "Démarrer un projet.", lead.
- Layout 2 colonnes : formulaire à gauche (60 %), cartes de contact à droite (40 %).
- **Formulaire** : Nom complet, Email, Téléphone (optionnel), Type de besoin (select : Pack Mémoire/Thèse / Analyse / Collecte / Autre), Message (textarea). Bouton "Envoyer ma demande →". Mention sous le bouton : "Envoi sécurisé via Formspree · Réponse sous 24 h".
- **Sidebar** :
  - Carte WhatsApp (gradient vert WhatsApp `#25D366` → `#128C7E`) avec numéro mono + texte d'appel.
  - Carte Téléphone alternatif.
  - Carte Email.
  - Carte Localisation : "Dakar, Sénégal" + iframe Google Maps embed (gratuit).

---

## 6. Composants réutilisables

| Composant | Props clés | Usage |
|---|---|---|
| `Button` | `variant: 'primary' \| 'ghost'`, `href`, `icon` | Tous les CTAs |
| `BentoCard` | `accent?: boolean`, `featured?: boolean`, `span?: number`, `children` | Toutes les tuiles bento |
| `PackCard` | `pack: Pack` (typé) | Page Services et accueil |
| `AnimatedCounter` | `value: number`, `suffix?`, `duration?` | Section "Pourquoi HES" |
| `ContactForm` | (aucune — config via env) | Page Contact |

Tous les composants sont **autonomes, typés, testables individuellement**.

---

## 7. Données & contenu

### 7.1 `src/data/packs.ts`

```ts
export type PackFamily = 'memoire-these' | 'analyse' | 'collecte';
export type PackLevel = 'essentiel' | 'standard' | 'plus' | 'premium';

export type Pack = {
  id: string;
  family: PackFamily;
  level: PackLevel;
  name: string;
  priceFCFA: number;
  delivery: string;        // "3 semaines", "2 semaines"
  features: string[];      // bullet points
  featured?: boolean;
};

export const PACKS: Pack[] = [ /* 9 entrées */ ];
```

### 7.2 `src/data/testimonials.ts`

```ts
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;         // chemin /public/equipe/...
  placeholder?: boolean;   // marqueur visuel "[À REMPLIR]"
};

export const TESTIMONIALS: Testimonial[] = [ /* 2-4 placeholders */ ];
```

### 7.3 `src/data/site.ts`

```ts
export const SITE = {
  name: 'Heaven Elijah Service',
  tagline: 'De la conception à la soutenance.',
  url: 'https://heavenelijahservice.org',
  contact: {
    email: 'heaven.elijahservice@gmail.com',
    phone: '+221 76 387 34 28',
    whatsapp: '+221 77 130 41 65',
    address: 'Dakar, Sénégal',
  },
  social: {
    linkedin: '',  // à compléter
    facebook: '',
  },
  ogImage: '/og-image.png',
};
```

---

## 8. Formulaire de contact (Formspree)

### 8.1 Setup

1. Créer un compte sur `formspree.io`
2. Créer un formulaire → récupérer l'ID (ex: `mvojzpne`)
3. Configurer email de réception : `heaven.elijahservice@gmail.com`
4. Renseigner `.env.local` :
   ```
   NEXT_PUBLIC_FORMSPREE_ID=mvojzpne
   ```

### 8.2 Implémentation `ContactForm.tsx`

- POST vers `https://formspree.io/f/${FORMSPREE_ID}` en `application/json`
- Validation côté client (regex email, champs requis)
- États : `idle | submitting | success | error`
- Sur succès : message "Demande envoyée. Nous revenons vers vous sous 24 h." + reset.
- Sur erreur : message d'erreur générique + suggestion d'utiliser WhatsApp.
- Honeypot anti-spam (champ caché ignoré par les humains).

### 8.3 Limites du plan gratuit Formspree

- 50 soumissions/mois
- Pas de stockage long terme
- Branding Formspree dans les emails

→ Suffisant pour démarrer. Upgrade payant possible plus tard.

---

## 9. Déploiement

### 9.1 Workflow Git → Vercel

1. Repo GitHub (privé recommandé au démarrage)
2. Vercel connecté au repo (1 clic)
3. Push sur `main` → build + déploiement automatique en ~30 s
4. Branches feature → URLs preview automatiques

### 9.2 Variables d'environnement Vercel

| Nom | Valeur | Scope |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | (clé Formspree) | Production + Preview |

### 9.3 Domaine personnalisé

- URL temporaire : `heaven-elijah-site.vercel.app`
- Production : `heavenelijahservice.org` une fois acquis
- Configuration DNS : enregistrements A et CNAME selon les instructions Vercel
- SSL auto via Let's Encrypt

---

## 10. SEO & accessibilité

### 10.1 SEO technique

- `<title>` et `<meta name="description">` uniques par page
- Open Graph + Twitter Card (image 1200×630)
- `sitemap.xml` généré via `app/sitemap.ts`
- `robots.txt` autorisant tous les crawlers
- JSON-LD `Organization` + `LocalBusiness` (avec adresse Dakar) sur la page d'accueil
- URLs courtes et lisibles : `/services`, `/a-propos`, `/contact`
- HTML sémantique : `<header>`, `<main>`, `<section>`, `<footer>`, `<nav aria-label>`

### 10.2 Accessibilité (WCAG 2.2 AA visé)

- Contraste texte/fond ≥ 4.5:1 (vérifié pour orange `#f09042` sur fond sombre)
- Tous les boutons et liens accessibles au clavier (focus visible)
- Tous les champs de formulaire ont un `<label>` associé
- Images avec `alt` descriptif (logo : `Heaven Elijah Service`)
- Pas de texte uniquement véhiculé par la couleur
- Animations respectent `prefers-reduced-motion: reduce`
- Hiérarchie de titres correcte (un `<h1>` par page)

---

## 11. Performance

Cibles Core Web Vitals (mobile 4G simulé) :

| Métrique | Cible |
|---|---|
| LCP | < 2,5 s |
| INP | < 200 ms |
| CLS | < 0,1 |
| FCP | < 1,5 s |
| Bundle JS gzip (page d'accueil) | < 150 kB |

Leviers :

- Export statique → HTML pré-rendu, zéro hydratation inutile
- Fonts Geist via `next/font` (autohébergement, FOIT/FOUT évités)
- Images en `<img>` natif (export statique = pas d'optim Next/Image), `width`/`height` explicites, `loading="lazy"` sauf hero
- Framer Motion uniquement sur composants interactifs (sections animées)
- Tailwind v4 → CSS final < 30 kB

---

## 12. Plan de livraison

| # | Étape | Effort estimé |
|---|---|---|
| 1 | Setup projet (Next.js + Tailwind + TS + Framer Motion + structure) | 30 min |
| 2 | Layout racine + fonts + tokens CSS + Header + Footer | 1 h |
| 3 | Composants UI réutilisables (Button, BentoCard, PackCard, AnimatedCounter, ContactForm) | 1 h |
| 4 | Données typées (`packs.ts`, `testimonials.ts`, `site.ts`) | 30 min |
| 5 | Page d'accueil (6 sections) | 2 h |
| 6 | Page Services | 1 h |
| 7 | Page À propos | 1 h |
| 8 | Page Contact + intégration Formspree | 1 h |
| 9 | Animations Framer Motion + reduced-motion | 1 h |
| 10 | SEO (meta, sitemap, robots, JSON-LD) + OG image | 30 min |
| 11 | Page 404 cohérente | 15 min |
| 12 | Tests responsive 320/768/1024/1440 + cross-browser | 1 h |
| 13 | Déploiement Vercel + domaine temporaire | 15 min |
| 14 | README développeur (setup, déploiement, où modifier quoi) | 30 min |

**Total : ~10-12 h de travail.** Réparti en sessions de 2-3 h.

---

## 13. Risques & inconnues

| # | Sujet | Statut | Plan |
|---|---|---|---|
| 1 | Logo SVG | PNG haute déf disponible | Vectorisation au démarrage (Inkscape/Illustrator) |
| 2 | Stats chiffrées (nb projets, années) | Non confirmées | Placeholders `[XX]+` jusqu'à confirmation |
| 3 | Témoignages réels | À collecter | 2-4 placeholders, à remplacer avant mise en ligne publique |
| 4 | Photos d'équipe | Non disponibles | Avatars gradient navy/orange en placeholder |
| 5 | Texte mission "À propos" | À rédiger | Brouillon proposé à partir de la tagline + catalogue |
| 6 | Carte Dakar | Décidé | Google Maps iframe (gratuit, 1 ligne d'embed) — adresse exacte à confirmer |
| 7 | Domaine `heavenelijahservice.org` | À acheter | Site déployé sur Vercel temporaire en attendant |
| 8 | Compte Formspree | À créer | 5 minutes, gratuit |

---

## 14. Hors-périmètre (explicitement)

Pour rester lean et livrer vite, **les éléments suivants ne sont pas inclus** :

- Espace client / authentification
- Paiement en ligne (Wave, Orange Money, Stripe)
- Blog ou section ressources
- FAQ dédiée (les questions clés sont dans les pages existantes)
- CMS headless (le contenu vit dans le code, édition par push Git)
- Multilingue (anglais, wolof) — extensible plus tard
- Page Méthodologie détaillée
- Newsletter / capture d'email

Ces éléments peuvent être ajoutés dans une itération ultérieure si le besoin se confirme.

---

## 15. Critères d'acceptation

Le site est considéré comme **livrable** quand :

- [ ] Les 4 pages sont en ligne sur `https://heaven-elijah-site.vercel.app`
- [ ] Le formulaire de contact envoie effectivement des emails à `heaven.elijahservice@gmail.com`
- [ ] Les liens WhatsApp et téléphone fonctionnent sur mobile (cliquables)
- [ ] Le site est lisible sur mobile 320 px sans scroll horizontal
- [ ] Lighthouse mobile ≥ 90 sur les 4 axes (Perf, A11y, Best Practices, SEO)
- [ ] `prefers-reduced-motion` désactive bien toutes les animations
- [ ] Les placeholders `[À REMPLIR]` sont identifiables visuellement (tag orange)
- [ ] Le `README.md` permet à un autre développeur de relancer le projet en local
