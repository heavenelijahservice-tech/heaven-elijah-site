# Heaven Elijah Service — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a fast, accessible, single-language (French) marketing website for Heaven Elijah Service with 4 pages (Accueil · Services · À propos · Contact), Bento-style dark UI, and a Formspree-backed contact form, deployable to Vercel as a static export.

**Architecture:** Next.js 14+ App Router compiled as static HTML (`output: 'export'`). Content lives in typed TypeScript modules under `src/data/`. UI is composed of small primitive components (`ui/`), section components (`sections/`), and layout components (`layout/`). Styling uses Tailwind CSS v4 with HES design tokens declared in `globals.css` via `@theme`. Animations use Framer Motion and respect `prefers-reduced-motion`.

**Tech Stack:**
- Next.js 14.2+ · React 18.3 · TypeScript 5
- Tailwind CSS v4 (CSS-first `@theme`)
- Framer Motion 11
- Geist Sans + Geist Mono (via `geist` package)
- lucide-react (icons)
- Vitest + React Testing Library + jest-axe (tests)
- Formspree (contact backend)
- Vercel (hosting)

**Spec reference:** [docs/specs/2026-05-10-heaven-elijah-site-design.md](../specs/2026-05-10-heaven-elijah-site-design.md) (commit `48562eb`).

**Working directory:** `E:\Projets\heaven-elijah-site\` (already contains `.git`, `.gitignore`, `docs/`).

---

## Phase 0 — Project Setup

### Task 1: Initialize Next.js project (manual, preserves existing files)

**Files:**
- Create: `E:\Projets\heaven-elijah-site\package.json`
- Create: `E:\Projets\heaven-elijah-site\tsconfig.json`
- Create: `E:\Projets\heaven-elijah-site\next.config.mjs`
- Create: `E:\Projets\heaven-elijah-site\next-env.d.ts` (auto by Next.js on first run)

- [ ] **Step 1: Verify Node 20+ is available**

Run: `node -v`
Expected: `v20.x.x` or higher. If not, install Node 20 LTS first.

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "heaven-elijah-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.5.0",
    "geist": "^1.3.1",
    "lucide-react": "^0.456.0"
  },
  "devDependencies": {
    "@types/node": "^20.16.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.45",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/user-event": "^14.5.0",
    "jsdom": "^25.0.0",
    "jest-axe": "^9.0.0",
    "@types/jest-axe": "^3.5.9",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 5: Install dependencies**

Run: `npm install`
Expected: completes without errors, `node_modules/` populated, `package-lock.json` created.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs
git commit -m "chore: initialize Next.js 14 project with static export"
```

---

### Task 2: Set up Tailwind CSS v4 with HES design tokens

**Files:**
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`

- [ ] **Step 1: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 2: Create `src/app/globals.css` with HES tokens via `@theme`**

```css
@import "tailwindcss";

@theme {
  /* Couleurs HES */
  --color-bg-deep: #0e1729;
  --color-navy: #15233f;
  --color-tile: #1a2541;
  --color-border-subtle: #2a3a5c;
  --color-orange: #f09042;
  --color-orange-deep: #d9772b;
  --color-light: #fafafa;
  --color-text: #ffffff;
  --color-text-muted: #c9cfdc;

  /* Typographie */
  --font-sans: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), 'JetBrains Mono', ui-monospace, monospace;

  /* Tracking */
  --tracking-tightest: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-label: 0.2em;
}

/* Reset minimal + base */
*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  background-color: var(--color-bg-deep);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.55;
}

a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }

img, svg, video { display: block; max-width: 100%; height: auto; }

/* Focus visible cohérent */
:focus-visible {
  outline: 2px solid var(--color-orange);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Reduced motion : neutralise toutes les animations */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Utilitaires sémantiques HES */
.label-tag {
  font-size: 11px;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-orange);
  font-weight: 700;
}

.section-padding {
  padding-block: clamp(60px, 8vw, 128px);
  padding-inline: clamp(20px, 5vw, 64px);
}

.container-hes {
  max-width: 1200px;
  margin-inline: auto;
}
```

- [ ] **Step 3: Commit**

```bash
git add postcss.config.mjs src/app/globals.css
git commit -m "feat: tailwind v4 + HES design tokens via @theme"
```

---

### Task 3: Configure ESLint and Vitest

**Files:**
- Create: `.eslintrc.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}
```

- [ ] **Step 2: Create `vitest.config.mts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Verify Vitest runs**

Run: `npx vitest run --passWithNoTests`
Expected: completes successfully, "0 tests" output.

- [ ] **Step 5: Commit**

```bash
git add .eslintrc.json vitest.config.mts vitest.setup.ts
git commit -m "chore: configure ESLint and Vitest with jsdom"
```

---

## Phase 1 — Data Layer (TDD)

### Task 4: Site config module

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/site.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/data/site.test.ts
import { describe, it, expect } from 'vitest';
import { SITE } from './site';

describe('SITE config', () => {
  it('exposes brand identity', () => {
    expect(SITE.name).toBe('Heaven Elijah Service');
    expect(SITE.tagline).toBe('De la conception à la soutenance.');
  });

  it('exposes contact channels', () => {
    expect(SITE.contact.email).toMatch(/@/);
    expect(SITE.contact.whatsapp).toMatch(/^\+221/);
    expect(SITE.contact.phone).toMatch(/^\+221/);
    expect(SITE.contact.address).toContain('Dakar');
  });

  it('uses the production URL', () => {
    expect(SITE.url).toBe('https://heavenelijahservice.org');
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx vitest run src/data/site.test.ts`
Expected: FAIL — "Cannot find module './site'".

- [ ] **Step 3: Implement `src/data/site.ts`**

```ts
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
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npx vitest run src/data/site.test.ts`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/data/site.test.ts
git commit -m "feat(data): site config with brand and contact info"
```

---

### Task 5: Packs data module

**Files:**
- Create: `src/data/packs.ts`
- Create: `src/data/packs.test.ts`

- [ ] **Step 1: Write failing test**

```ts
// src/data/packs.test.ts
import { describe, it, expect } from 'vitest';
import { PACKS, getPacksByFamily, FAMILIES } from './packs';

describe('PACKS data', () => {
  it('contains exactly 9 packs', () => {
    expect(PACKS).toHaveLength(9);
  });

  it('groups into 3 families of 3 packs each', () => {
    expect(getPacksByFamily('memoire-these')).toHaveLength(3);
    expect(getPacksByFamily('analyse')).toHaveLength(3);
    expect(getPacksByFamily('collecte')).toHaveLength(3);
  });

  it('orders Mémoire/Thèse packs at 90k, 110k, 130k FCFA', () => {
    const prices = getPacksByFamily('memoire-these').map(p => p.priceFCFA);
    expect(prices).toEqual([90000, 110000, 130000]);
  });

  it('orders Analyse packs at 50k, 70k, 90k FCFA', () => {
    const prices = getPacksByFamily('analyse').map(p => p.priceFCFA);
    expect(prices).toEqual([50000, 70000, 90000]);
  });

  it('orders Collecte packs at 20k, 30k, 40k FCFA', () => {
    const prices = getPacksByFamily('collecte').map(p => p.priceFCFA);
    expect(prices).toEqual([20000, 30000, 40000]);
  });

  it('exposes 3 family metadata entries', () => {
    expect(FAMILIES).toHaveLength(3);
    FAMILIES.forEach(f => {
      expect(f.label).toBeTruthy();
      expect(f.tagline).toBeTruthy();
    });
  });

  it('every pack has at least 2 features', () => {
    PACKS.forEach(p => expect(p.features.length).toBeGreaterThanOrEqual(2));
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx vitest run src/data/packs.test.ts`
Expected: FAIL — "Cannot find module './packs'".

- [ ] **Step 3: Implement `src/data/packs.ts`**

```ts
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
  // Mémoire / Thèse
  {
    id: 'memoire-essentiel',
    family: 'memoire-these',
    name: 'Essentiel',
    priceFCFA: 90000,
    delivery: '3 semaines',
    features: [
      'Protocole + questionnaire (structure + variables)',
      "Analyse descriptive (tableaux + figures 2D)",
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
      'Fiche d\'enquête numérique (ODK / KoBo / Google Form)',
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
  // Analyse
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
  // Collecte
  {
    id: 'collecte-essentiel',
    family: 'collecte',
    name: 'Essentiel',
    priceFCFA: 20000,
    delivery: 'Avant terrain',
    features: [
      'Protocole + questionnaire (structure + variables)',
      'Mini-plan d\'analyse',
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
      'Essentiel + fiche d\'enquête numérique',
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

export function formatFCFA(amount: number): string {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npx vitest run src/data/packs.test.ts`
Expected: PASS — 7 tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/packs.ts src/data/packs.test.ts
git commit -m "feat(data): 9 packs HES typed with family helpers"
```

---

### Task 6: Testimonials data module (placeholders)

**Files:**
- Create: `src/data/testimonials.ts`

- [ ] **Step 1: Implement `src/data/testimonials.ts`**

```ts
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/testimonials.ts
git commit -m "feat(data): testimonials placeholders"
```

---

## Phase 2 — UI Primitives

### Task 7: `Button` component

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders as a link when href is provided', () => {
    render(<Button href="/contact">Contact</Button>);
    const el = screen.getByRole('link', { name: 'Contact' });
    expect(el).toHaveAttribute('href', '/contact');
  });

  it('renders as a button by default', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('applies the primary variant class by default', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-orange');
  });

  it('applies the ghost variant when requested', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx vitest run src/components/ui/Button.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/components/ui/Button.tsx`**

```tsx
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps | 'href'>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-orange text-bg-deep hover:shadow-[0_8px_24px_-8px_var(--color-orange)]',
  ghost: 'border border-white/30 text-text hover:border-orange hover:text-orange bg-transparent',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '' } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ('href' in props && props.href) {
    const { href, variant: _v, children: _c, className: _cn, ...rest } = props;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, children: _c, className: _cn, href: _h, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npx vitest run src/components/ui/Button.test.tsx`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.test.tsx
git commit -m "feat(ui): Button with primary/ghost variants and link auto-detection"
```

---

### Task 8: `BentoCard` component

**Files:**
- Create: `src/components/ui/BentoCard.tsx`

- [ ] **Step 1: Implement `src/components/ui/BentoCard.tsx`**

```tsx
import type { ReactNode } from 'react';

type Tone = 'default' | 'accent' | 'featured';

export type BentoCardProps = {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
};

const toneClasses: Record<Tone, string> = {
  default:
    'bg-tile border border-border-subtle hover:border-orange',
  accent:
    'bg-gradient-to-br from-orange to-orange-deep text-bg-deep border border-transparent',
  featured:
    'bg-gradient-to-br from-navy to-tile border border-orange',
};

export function BentoCard({ tone = 'default', children, className = '', as: Tag = 'div' }: BentoCardProps) {
  return (
    <Tag
      className={`group rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/BentoCard.tsx
git commit -m "feat(ui): BentoCard with default/accent/featured tones"
```

---

### Task 9: `PackCard` component

**Files:**
- Create: `src/components/ui/PackCard.tsx`

- [ ] **Step 1: Implement `src/components/ui/PackCard.tsx`**

```tsx
import { Check } from 'lucide-react';
import { type Pack, formatFCFA } from '@/data/packs';

export function PackCard({ pack }: { pack: Pack }) {
  const tone = pack.featured ? 'featured' : 'default';
  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${
        tone === 'featured'
          ? 'bg-gradient-to-br from-navy to-tile border-2 border-orange'
          : 'bg-tile border border-border-subtle hover:border-orange'
      }`}
    >
      <header className="flex items-baseline justify-between">
        <span className="label-tag">Pack</span>
        <span className="font-mono text-2xl font-bold text-orange">
          {formatFCFA(pack.priceFCFA)}
        </span>
      </header>
      <h3 className="text-xl font-bold tracking-tight">{pack.name}</h3>
      <ul className="flex flex-1 flex-col gap-2">
        {pack.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
            <Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <footer className="text-xs text-text-muted">
        Délai : <span className="font-mono text-orange">{pack.delivery}</span>
      </footer>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/PackCard.tsx
git commit -m "feat(ui): PackCard rendering pack price/features/delivery"
```

---

### Task 10: `AnimatedCounter` component

**Files:**
- Create: `src/components/ui/AnimatedCounter.tsx`

- [ ] **Step 1: Implement `src/components/ui/AnimatedCounter.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export type AnimatedCounterProps = {
  to: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({ to, durationMs = 1200, suffix = '', className = '' }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / durationMs, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(eased * to));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/AnimatedCounter.tsx
git commit -m "feat(ui): AnimatedCounter with intersection observer + reduced-motion"
```

---

### Task 11: `ContactForm` component (TDD validation)

**Files:**
- Create: `src/components/ui/ContactForm.tsx`
- Create: `src/components/ui/ContactForm.test.tsx`
- Create: `.env.example`

- [ ] **Step 1: Write failing test**

```tsx
// src/components/ui/ContactForm.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('renders required fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type de besoin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/décrivez votre projet/i)).toBeInTheDocument();
  });

  it('blocks submission when name is empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(await screen.findByText(/nom requis/i)).toBeInTheDocument();
  });

  it('blocks submission with malformed email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/nom complet/i), 'Awa Diop');
    await user.type(screen.getByLabelText(/email/i), 'pas-un-email');
    await user.type(screen.getByLabelText(/décrivez votre projet/i), 'Mémoire de M2');
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Create `.env.example`**

```
# Formspree form ID (https://formspree.io)
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id-here
```

- [ ] **Step 3: Run test, verify it fails**

Run: `npx vitest run src/components/ui/ContactForm.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `src/components/ui/ContactForm.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const honeypot = String(data.get('website') ?? '');

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = 'Nom requis';
    if (!EMAIL_RE.test(email)) nextErrors.email = 'Email invalide';
    if (!message) nextErrors.message = 'Message requis';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    if (honeypot) return; // bot

    setErrors({});
    setStatus('submitting');

    try {
      if (!FORMSPREE_ID) throw new Error('Formspree ID missing');
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error('Formspree error');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-orange/40 bg-orange/10 p-6 text-center">
        <h3 className="text-lg font-bold">Demande envoyée.</h3>
        <p className="mt-2 text-sm text-text-muted">Nous revenons vers vous sous 24 h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field label="Nom complet" name="name" required error={errors.name}>
        <input type="text" name="name" id="field-name" className="form-input" autoComplete="name" />
      </Field>

      <Field label="Email" name="email" required error={errors.email}>
        <input type="email" name="email" id="field-email" className="form-input" autoComplete="email" />
      </Field>

      <Field label="Téléphone (optionnel)" name="phone">
        <input type="tel" name="phone" id="field-phone" className="form-input" autoComplete="tel" />
      </Field>

      <Field label="Type de besoin" name="need" required>
        <select name="need" id="field-need" className="form-input" defaultValue="">
          <option value="" disabled>— Choisir —</option>
          <option>Pack Mémoire/Thèse</option>
          <option>Pack Analyse</option>
          <option>Pack Collecte</option>
          <option>Autre</option>
        </select>
      </Field>

      <Field label="Décrivez votre projet" name="message" required error={errors.message}>
        <textarea name="message" id="field-message" rows={5} className="form-input resize-y" />
      </Field>

      {/* Honeypot anti-spam — caché aux humains */}
      <div className="hidden" aria-hidden="true">
        <label>
          Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-bold text-bg-deep transition hover:-translate-y-px disabled:opacity-50"
      >
        {status === 'submitting' ? 'Envoi…' : 'Envoyer ma demande'}
        <Send className="size-4" aria-hidden="true" />
      </button>

      {status === 'error' && (
        <p className="text-sm text-orange">
          Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.
        </p>
      )}

      <p className="text-xs text-text-muted">
        Envoi sécurisé via Formspree · Réponse sous 24 h
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`field-${name}`} className="label-tag">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-orange">
          {error}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Add `.form-input` utility to `globals.css`**

Append to `src/app/globals.css`:

```css
.form-input {
  width: 100%;
  background-color: var(--color-bg-deep);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--color-text);
  transition: border-color 200ms ease;
}
.form-input:focus {
  outline: none;
  border-color: var(--color-orange);
}
```

- [ ] **Step 6: Run test, verify it passes**

Run: `npx vitest run src/components/ui/ContactForm.test.tsx`
Expected: PASS — 3 tests.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/ContactForm.tsx src/components/ui/ContactForm.test.tsx src/app/globals.css .env.example
git commit -m "feat(ui): ContactForm with client-side validation + Formspree submission"
```

---

## Phase 3 — Layout

### Task 12: `Header` (sticky nav)

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `public/logo.svg` (placeholder — see step 1)

- [ ] **Step 1: Create placeholder `public/logo.svg`**

This is a temporary geometric placeholder; replace with real vectorized HES logo before launch.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
  <circle cx="32" cy="32" r="30" fill="none" stroke="#15233f" stroke-width="3"/>
  <path d="M22 14v36M42 14v36" stroke="#15233f" stroke-width="6" stroke-linecap="round"/>
  <path d="M28 22c4 4 8 6 12 0M28 30c4 4 8 6 12 0M28 38c4 4 8 6 12 0M28 46c4 4 8 6 12 0" stroke="#f09042" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 2: Implement `src/components/layout/Header.tsx`**

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-deep/80 backdrop-blur">
      <div className="container-hes flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <img src="/logo.svg" alt="" className="size-8" />
          <span className="hidden sm:inline">Heaven Elijah</span>
          <span className="text-orange">Service</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden gap-7 text-sm md:flex">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-text-muted transition hover:text-orange"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href="/contact" className="hidden sm:inline-flex">
          Démarrer un projet →
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx public/logo.svg
git commit -m "feat(layout): sticky Header with backdrop blur and brand link"
```

---

### Task 13: `Footer`

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Implement `src/components/layout/Footer.tsx`**

```tsx
import Link from 'next/link';
import { SITE } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-sm">
      <div className="container-hes grid gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <img src="/logo.svg" alt="" className="size-7" />
            <span>{SITE.name}</span>
          </Link>
          <p className="mt-3 text-text-muted">
            Accompagnement scientifique pour étudiants et chercheurs.
            <br />
            {SITE.contact.address}.
          </p>
        </div>

        <FooterCol title="Site">
          <FooterLink href="/">Accueil</FooterLink>
          <FooterLink href="/services">Services</FooterLink>
          <FooterLink href="/a-propos">À propos</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <li>{SITE.contact.phone}</li>
          <li>{SITE.contact.whatsapp}</li>
          <li>
            <a href={`mailto:${SITE.contact.email}`} className="hover:text-orange">
              {SITE.contact.email}
            </a>
          </li>
        </FooterCol>

        <FooterCol title="Suivez-nous">
          <li>
            <a href={SITE.contact.whatsappLink} className="hover:text-orange">
              WhatsApp
            </a>
          </li>
          <li>LinkedIn</li>
          <li>Facebook</li>
        </FooterCol>
      </div>

      <div className="container-hes flex flex-col items-center justify-between gap-2 border-t border-white/10 px-5 py-4 text-xs text-text-muted sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} {SITE.name} · {SITE.contact.address}</span>
        <span>Tous droits réservés.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="label-tag mb-3">{title}</h5>
      <ul className="flex flex-col gap-2 text-text-muted">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-orange">
        {children}
      </Link>
    </li>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(layout): Footer with brand, sitemap, contact and social"
```

---

### Task 14: Root `layout.tsx`

**Files:**
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Implement `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: 'Next.js',
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-orange focus:px-3 focus:py-2 focus:text-bg-deep">
          Aller au contenu
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server starts and renders**

Run: `npm run dev`
Open browser at `http://localhost:3000` — expect a basic page with Header + Footer (404 for `/` because no `page.tsx` yet, but Header/Footer render).

Stop server with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(app): root layout with Geist fonts, metadata, skip-link and Header/Footer"
```

---

## Phase 4 — Home Page Sections

### Task 15: `Hero` section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Implement `src/components/sections/Hero.tsx`**

```tsx
import { Button } from '@/components/ui/Button';
import { ArrowRight, Shield, RotateCcw, Clock } from 'lucide-react';
import { SITE } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(240,144,66,0.18) 0%, transparent 60%)',
        }}
      />
      <div className="container-hes relative">
        <p className="label-tag">— {SITE.contact.address} · Depuis 2024</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-[1] tracking-[-0.03em] sm:text-6xl md:text-7xl">
          De la conception<br />
          à la <em className="not-italic text-orange">soutenance.</em>
        </h1>
        <p className="mt-5 max-w-xl text-base text-text-muted sm:text-lg">
          Accompagnement méthodologique, statistique et rédactionnel pour étudiants et
          chercheurs. Mémoires, thèses, publications.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/services">
            Voir les packs <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="ghost">
            Discuter de mon projet
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
          <li className="flex items-center gap-2">
            <Shield className="size-4 text-orange" aria-hidden="true" /> Confidentialité garantie
          </li>
          <li className="flex items-center gap-2">
            <RotateCcw className="size-4 text-orange" aria-hidden="true" /> 2 révisions incluses
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-orange" aria-hidden="true" /> Délais 2-3 semaines
          </li>
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(sections): Hero with catchline, CTAs and reassurance badges"
```

---

### Task 16: `PackFamilies` section

**Files:**
- Create: `src/components/sections/PackFamilies.tsx`

- [ ] **Step 1: Implement `src/components/sections/PackFamilies.tsx`**

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { FAMILIES, getPacksByFamily, formatFCFA } from '@/data/packs';

export function PackFamilies() {
  return (
    <section className="section-padding">
      <div className="container-hes">
        <p className="label-tag">— Notre offre</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Trois familles de packs
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">
          Du diagnostic exploratoire à l'accompagnement complet de mémoire ou de thèse.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FAMILIES.map((family, idx) => {
            const packs = getPacksByFamily(family.id);
            const minPrice = Math.min(...packs.map(p => p.priceFCFA));
            return (
              <BentoCard key={family.id} tone={idx === 0 ? 'featured' : 'default'} as="article">
                <Link href={`/services#${family.id}`} className="flex h-full flex-col gap-4">
                  <div>
                    <p className="label-tag">{family.label}</p>
                    <h3 className="mt-2 text-xl font-bold">{family.tagline}</h3>
                    <p className="mt-2 text-sm text-text-muted">{family.description}</p>
                  </div>
                  <div className="mt-auto flex items-baseline justify-between">
                    <span className="font-mono text-2xl font-bold text-orange">
                      dès {formatFCFA(minPrice)}
                    </span>
                    <ArrowRight className="size-5 text-orange transition group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/PackFamilies.tsx
git commit -m "feat(sections): PackFamilies bento with min price per family"
```

---

### Task 17: `Process` section

**Files:**
- Create: `src/components/sections/Process.tsx`

- [ ] **Step 1: Implement `src/components/sections/Process.tsx`**

```tsx
const STEPS = [
  { num: '01', title: 'Diagnostic express', desc: '15 min, gratuit. On cadre votre besoin.' },
  { num: '02', title: 'Validation', desc: "Protocole + plan d'analyse signés." },
  { num: '03', title: 'Analyse', desc: 'Livrable + 2 révisions incluses.' },
  { num: '04', title: 'Restitution', desc: 'Tableaux, figures, narratif scientifique.' },
];

export function Process() {
  return (
    <section className="section-padding">
      <div className="container-hes">
        <p className="label-tag">— Méthode</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Un process en 4 étapes.
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">
          Cadre clair, livrables identifiés, deux révisions incluses à chaque pack.
        </p>

        <ol className="relative mt-10 grid gap-3 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[5%] top-[34px] hidden h-px bg-gradient-to-r from-transparent via-orange to-transparent md:block"
          />
          {STEPS.map(s => (
            <li
              key={s.num}
              className="relative z-10 rounded-xl border border-border-subtle bg-bg-deep p-5 text-center"
            >
              <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-orange bg-tile font-mono font-bold text-orange">
                {s.num}
              </span>
              <h3 className="text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-xs text-text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Process.tsx
git commit -m "feat(sections): Process 4-step bento with horizontal connector"
```

---

### Task 18: `WhyHES` section (chiffres clés)

**Files:**
- Create: `src/components/sections/WhyHES.tsx`

- [ ] **Step 1: Implement `src/components/sections/WhyHES.tsx`**

```tsx
import { BentoCard } from '@/components/ui/BentoCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function WhyHES() {
  return (
    <section className="section-padding">
      <div className="container-hes">
        <p className="label-tag">— Pourquoi HES</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Des chiffres qui parlent.
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">
          Tous nos engagements en un coup d'œil.
          <span className="ml-2 rounded bg-orange/15 px-1.5 py-0.5 text-xs text-orange">
            Stats à confirmer
          </span>
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
            <p className="label-tag">Projets accompagnés</p>
            <div>
              <p className="font-mono text-6xl font-bold leading-none">
                <AnimatedCounter to={50} suffix="+" />
              </p>
              <p className="mt-3 max-w-xs text-sm text-text-muted">
                Mémoires, thèses et analyses livrés à des étudiants et chercheurs ouest-africains.
              </p>
            </div>
          </BentoCard>

          <BentoCard tone="accent">
            <p className="label-tag">Délai moyen</p>
            <p className="mt-2 font-mono text-3xl font-bold">2-3 sem.</p>
          </BentoCard>

          <BentoCard>
            <p className="label-tag">Révisions</p>
            <p className="mt-2 font-mono text-3xl font-bold">×2</p>
          </BentoCard>

          <BentoCard>
            <p className="label-tag">Confidentialité</p>
            <p className="mt-2 font-mono text-3xl font-bold">100 %</p>
          </BentoCard>

          <BentoCard>
            <p className="label-tag">Outils maîtrisés</p>
            <p className="mt-2 font-mono text-sm leading-relaxed">
              R · Python<br />ODK · KoBo<br />Vancouver
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/WhyHES.tsx
git commit -m "feat(sections): WhyHES bento 4×2 with animated counter"
```

---

### Task 19: `Testimonials` section

**Files:**
- Create: `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Implement `src/components/sections/Testimonials.tsx`**

```tsx
import { TESTIMONIALS } from '@/data/testimonials';

export function Testimonials() {
  return (
    <section className="bg-light text-navy">
      <div className="container-hes section-padding">
        <p className="label-tag">— Ils nous ont fait confiance</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Témoignages
        </h2>
        <p className="mt-3 max-w-xl text-navy/65">
          Étudiants et chercheurs accompagnés sur des mémoires et thèses dans plusieurs disciplines.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map(t => (
            <figure
              key={t.id}
              className="flex flex-col gap-4 rounded-xl border border-navy/10 bg-white p-6"
            >
              <blockquote className="text-base leading-relaxed">
                <span className="mr-1 text-3xl leading-none text-orange">"</span>
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-navy/10 pt-4">
                <span
                  aria-hidden="true"
                  className="size-10 rounded-full bg-gradient-to-br from-navy to-tile"
                />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-navy/55">{t.role}</p>
                </div>
                {t.placeholder && (
                  <span className="ml-auto rounded bg-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    À remplir
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat(sections): Testimonials with light theme rupture and placeholder tags"
```

---

### Task 20: `FinalCTA` section

**Files:**
- Create: `src/components/sections/FinalCTA.tsx`

- [ ] **Step 1: Implement `src/components/sections/FinalCTA.tsx`**

```tsx
import { Button } from '@/components/ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE } from '@/data/site';

export function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="container-hes">
        <div className="relative overflow-hidden rounded-2xl border border-orange/40 bg-gradient-to-br from-navy to-tile p-10 text-center sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(240,144,66,0.22) 0%, transparent 70%)',
            }}
          />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Discutons de votre projet.
          </h2>
          <p className="relative mt-3 text-text-muted">
            Diagnostic express gratuit en 15 minutes. Aucun engagement.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">
              Prendre contact <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={SITE.contact.whatsappLink} variant="ghost">
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp direct
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FinalCTA.tsx
git commit -m "feat(sections): FinalCTA banner with contact + WhatsApp"
```

---

### Task 21: Compose home page

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Implement `src/app/page.tsx`**

```tsx
import { Hero } from '@/components/sections/Hero';
import { PackFamilies } from '@/components/sections/PackFamilies';
import { Process } from '@/components/sections/Process';
import { WhyHES } from '@/components/sections/WhyHES';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PackFamilies />
      <Process />
      <WhyHES />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 2: Verify visually**

Run: `npm run dev`
Open `http://localhost:3000` — confirm: header, hero with catchline, 3 pack family cards, 4 process steps, why-hes bento, testimonials light section, final CTA, footer. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(app): home page composing all six sections"
```

---

## Phase 5 — Other Pages

### Task 22: Services page

**Files:**
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Implement `src/app/services/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { PackCard } from '@/components/ui/PackCard';
import { FAMILIES, getPacksByFamily } from '@/data/packs';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    "9 packs d'accompagnement scientifique : mémoire/thèse, analyse de données, collecte. Tarifs et délais.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-hes">
          <p className="label-tag">— Notre offre complète</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Tous les packs HES.</h1>
          <p className="mt-3 max-w-2xl text-text-muted">
            9 formules réparties en 3 familles. Choisissez selon où vous en êtes dans votre projet.
          </p>
        </div>
      </section>

      {FAMILIES.map(family => (
        <section key={family.id} id={family.id} className="section-padding pt-0">
          <div className="container-hes">
            <header className="mb-6">
              <p className="label-tag">{family.label}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{family.tagline}</h2>
              <p className="mt-2 max-w-xl text-text-muted">{family.description}</p>
            </header>
            <div className="grid gap-4 md:grid-cols-3">
              {getPacksByFamily(family.id).map(pack => (
                <PackCard key={pack.id} pack={pack} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding pt-0">
        <div className="container-hes">
          <div className="rounded-xl border border-orange/40 bg-orange/5 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 size-5 shrink-0 text-orange" aria-hidden="true" />
              <div>
                <p className="label-tag">Conditions</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  <strong className="text-text">Acompte 50 %</strong> à la signature ·{' '}
                  <strong className="text-text">2 révisions</strong> incluses ·{' '}
                  <strong className="text-text">Confidentialité garantie</strong> · Délais à partir
                  de la réception complète des éléments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat(pages): services page with 9 packs and conditions block"
```

---

### Task 23: À propos page

**Files:**
- Create: `src/app/a-propos/page.tsx`

- [ ] **Step 1: Implement `src/app/a-propos/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { Shield, Target, Zap, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Heaven Elijah Service — cabinet d'accompagnement scientifique pour étudiants et chercheurs ouest-africains. Mission, équipe, outils, valeurs.",
};

const TOOLS = ['R', 'Python', 'ODK', 'KoBo', 'Google Forms', 'Vancouver', 'SPSS', 'Excel'];

const TEAM = [
  { name: '[Nom Prénom]', role: '[Fondateur · Méthodologie]' },
  { name: '[Nom Prénom]', role: '[Biostatisticien]' },
  { name: '[Nom Prénom]', role: '[Encadreur scientifique]' },
];

const VALUES = [
  { Icon: Shield, label: 'Confidentialité', desc: 'Données et travaux jamais partagés.' },
  { Icon: Target, label: 'Rigueur', desc: 'Standards méthodologiques internationaux.' },
  { Icon: Zap, label: 'Réactivité', desc: 'Délais respectés, communication directe.' },
  { Icon: Handshake, label: 'Pédagogie', desc: "On explique, on n'exécute pas en boîte noire." },
];

export default function AProposPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-hes">
          <p className="label-tag">— Qui sommes-nous</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            De la conception à la <span className="text-orange">soutenance.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-text-muted">
            Heaven Elijah Service est un cabinet d'accompagnement scientifique fondé à Dakar,
            dédié aux étudiants et chercheurs ouest-africains.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-hes grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <article className="rounded-xl border border-border-subtle bg-tile p-6 sm:p-8">
            <p className="text-xl font-bold leading-snug text-orange">
              "Permettre à chaque chercheur·e de produire un travail rigoureux, lisible et défendable."
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              [Texte mission complet à rédiger — environ 150 mots décrivant l'origine de HES, la
              philosophie d'accompagnement et l'engagement envers la communauté scientifique
              africaine.] <span className="ml-2 rounded bg-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">À rédiger</span>
            </p>
          </article>
          <aside className="rounded-xl border border-border-subtle bg-navy p-6 sm:p-8">
            <p className="label-tag">Outils maîtrisés</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TOOLS.map(t => (
                <li key={t} className="rounded-full border border-border-subtle bg-tile px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-hes">
          <div className="flex items-baseline gap-3">
            <p className="label-tag">L'équipe</p>
            <span className="rounded bg-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Photos à venir
            </span>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <li
                key={i}
                className="flex flex-col items-center gap-3 rounded-xl border border-border-subtle bg-tile p-6 text-center"
              >
                <span
                  aria-hidden="true"
                  className="size-16 rounded-full border-2 border-orange bg-gradient-to-br from-navy to-tile"
                />
                <span className="text-sm font-bold">{m.name}</span>
                <span className="text-xs text-text-muted">{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-hes">
          <p className="label-tag">— Nos valeurs</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-4">
            {VALUES.map(v => (
              <li
                key={v.label}
                className="rounded-xl border border-border-subtle bg-bg-deep p-5 text-center"
              >
                <v.Icon className="mx-auto size-6 text-orange" aria-hidden="true" />
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-orange">
                  {v.label}
                </p>
                <p className="mt-1 text-xs text-text-muted">{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/a-propos/page.tsx
git commit -m "feat(pages): a-propos with mission, tools, team placeholders, values"
```

---

### Task 24: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Implement `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ui/ContactForm';
import { SITE } from '@/data/site';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Démarrez votre projet avec Heaven Elijah Service. Diagnostic express gratuit en 15 minutes.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-hes">
          <p className="label-tag">— Discutons</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Démarrer un projet.
          </h1>
          <p className="mt-3 max-w-2xl text-text-muted">
            Diagnostic express gratuit en 15 minutes. Décrivez votre besoin et on revient vers
            vous sous 24 h.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-hes grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-xl border border-border-subtle bg-tile p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-3">
            <a
              href={SITE.contact.whatsappLink}
              className="rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 text-white/85">
                <MessageCircle className="size-4" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest">WhatsApp direct</span>
              </div>
              <p className="mt-2 font-mono text-lg font-bold text-white">{SITE.contact.whatsapp}</p>
              <p className="mt-1 text-xs text-white/85">Réponse en quelques heures</p>
            </a>

            <ContactCard Icon={Phone} title="Téléphone">
              <span className="font-mono">{SITE.contact.phone}</span>
            </ContactCard>

            <ContactCard Icon={Mail} title="Email">
              <a href={`mailto:${SITE.contact.email}`} className="break-all hover:text-orange">
                {SITE.contact.email}
              </a>
            </ContactCard>

            <ContactCard Icon={MapPin} title="Localisation">
              <span>{SITE.contact.address}</span>
              <iframe
                title="Carte de Dakar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62164.92!2d-17.49!3d14.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f50fe8e555%3A0x2bdf5d636cc7cea1!2sDakar!5e0!3m2!1sfr!2ssn!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-3 h-32 w-full rounded-lg border border-border-subtle"
              />
            </ContactCard>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  Icon,
  title,
  children,
}: {
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-tile p-5">
      <div className="flex items-center gap-2 text-orange">
        <Icon className="size-4" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat(pages): contact with form, WhatsApp card, contact channels and Dakar map"
```

---

### Task 25: 404 page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Implement `src/app/not-found.tsx`**

```tsx
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-hes max-w-2xl text-center">
        <p className="font-mono text-6xl font-bold text-orange sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Page introuvable.
        </h1>
        <p className="mt-3 text-text-muted">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou consultez nos services.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <ArrowLeft className="size-4" aria-hidden="true" /> Retour à l'accueil
          </Button>
          <Button href="/services" variant="ghost">
            Voir les packs
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat(pages): 404 with brand-consistent design and recovery CTAs"
```

---

## Phase 6 — SEO

### Task 26: `sitemap.ts` and `robots.ts`

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Implement `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/services', '/a-propos', '/contact'];
  return routes.map(path => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Implement `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat(seo): sitemap.xml and robots.txt"
```

---

### Task 27: JSON-LD structured data on home

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add JSON-LD `Organization` + `LocalBusiness` schema to home**

Replace `src/app/page.tsx` with:

```tsx
import { Hero } from '@/components/sections/Hero';
import { PackFamilies } from '@/components/sections/PackFamilies';
import { Process } from '@/components/sections/Process';
import { WhyHES } from '@/components/sections/WhyHES';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SITE } from '@/data/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE.url,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  image: `${SITE.url}${SITE.ogImage}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Sénégal' },
  priceRange: '20 000 — 130 000 FCFA',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PackFamilies />
      <Process />
      <WhyHES />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(seo): JSON-LD LocalBusiness schema on home page"
```

---

## Phase 7 — Quality Gates

### Task 28: Accessibility smoke test

**Files:**
- Create: `src/app/page.test.tsx`

- [ ] **Step 1: Write accessibility test**

```tsx
// src/app/page.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from './page';

expect.extend({ toHaveNoViolations });

describe('HomePage accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run accessibility test**

Run: `npx vitest run src/app/page.test.tsx`
Expected: PASS — 1 test, no axe violations.

If violations appear, fix them by adding missing `aria-label`, `alt`, or semantic markup. Common issues: empty links, decorative images without `alt=""`.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.test.tsx
git commit -m "test(a11y): smoke test home page with jest-axe"
```

---

### Task 29: Production build verification

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: completes successfully. Output includes:
- Lines like `✓ Generating static pages (8/8)`
- Output exported to `out/` directory
- No TypeScript or ESLint errors

- [ ] **Step 2: Inspect output**

Run: `ls out` (or `dir out` on PowerShell)
Expected: presence of `index.html`, `services/index.html`, `a-propos/index.html`, `contact/index.html`, `404.html`, `_next/`, `sitemap.xml`, `robots.txt`.

- [ ] **Step 3: Serve and verify in browser**

Run: `npx serve out -p 4000`
Open `http://localhost:4000` — confirm site renders identically to dev.

Run Lighthouse in Chrome DevTools (Mobile) — Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.

Stop server with Ctrl+C.

- [ ] **Step 4: Run full test suite**

Run: `npm test`
Expected: all suites pass.

- [ ] **Step 5: Commit (no code change, just gate marker)**

If any code changes were needed to pass the gates, commit them now with `chore: build/lint fixes for production gate`. Otherwise skip this step.

---

## Phase 8 — Documentation & Deploy

### Task 30: README and `.env.example`

**Files:**
- Create: `README.md`

- [ ] **Step 1: Implement `README.md`**

```markdown
# Heaven Elijah Service — Site web

Site vitrine officiel de [Heaven Elijah Service](https://heavenelijahservice.org), cabinet d'accompagnement scientifique pour étudiants et chercheurs basé à Dakar.

## Stack

- [Next.js 14](https://nextjs.org/) — App Router en mode `output: 'export'` (HTML statique)
- [Tailwind CSS v4](https://tailwindcss.com/) — design tokens via `@theme`
- [Framer Motion](https://www.framer.com/motion/) — animations
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
| OG image | `public/og-image.png` (1200×630) |

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

- [ ] Logo SVG vectoriel HD (`public/logo.svg`)
- [ ] OG image 1200×630 (`public/og-image.png`)
- [ ] Favicon (`public/favicon.ico`)
- [ ] Témoignages réels (`src/data/testimonials.ts`)
- [ ] Texte mission complet (`src/app/a-propos/page.tsx`)
- [ ] Photos d'équipe (`public/equipe/*` + `src/app/a-propos/page.tsx`)
- [ ] Stats réelles (compteur `WhyHES.tsx`)
- [ ] Liens réseaux sociaux (`src/data/site.ts`)

## Licence

Code propriétaire — Heaven Elijah Service. Tous droits réservés.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README with stack, scripts, edit map and deployment guide"
```

---

### Task 31: Vercel deployment

- [ ] **Step 1: Push to GitHub**

```bash
# Si pas encore de remote :
gh repo create heaven-elijah-site --private --source=. --remote=origin
git push -u origin main
```

(Si `gh` n'est pas installé : créer le repo sur github.com puis `git remote add origin <url> && git push -u origin main`.)

- [ ] **Step 2: Import dans Vercel**

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Connecter GitHub si nécessaire
3. Sélectionner le repo `heaven-elijah-site`
4. Framework auto-détecté : Next.js
5. Cliquer "Deploy"

Le premier build prend ~1-2 minutes. URL générée : `heaven-elijah-site.vercel.app` (ou variante).

- [ ] **Step 3: Configurer Formspree**

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un formulaire "Heaven Elijah Service"
3. Configurer email destinataire : `heaven.elijahservice@gmail.com`
4. Copier l'ID du formulaire (8 caractères, ex: `mvojzpne`)
5. Dans Vercel → Project → Settings → Environment Variables :
   - Nom : `NEXT_PUBLIC_FORMSPREE_ID`
   - Valeur : (l'ID copié)
   - Scopes : Production + Preview + Development
6. Re-deployer (Vercel → Deployments → "..." → Redeploy)

- [ ] **Step 4: Tester le formulaire en prod**

1. Visiter `https://heaven-elijah-site.vercel.app/contact`
2. Remplir et soumettre une demande de test
3. Vérifier la réception sur `heaven.elijahservice@gmail.com`

- [ ] **Step 5: Connecter le domaine `heavenelijahservice.org`** *(quand acquis)*

1. Acheter le domaine (Namecheap, OVH, Gandi, etc.)
2. Vercel → Project → Settings → Domains → Add → `heavenelijahservice.org`
3. Configurer chez le registrar les DNS indiqués (souvent un enregistrement A `76.76.21.21` ou un CNAME)
4. Attendre la propagation (5 min à 24 h)
5. SSL automatique via Let's Encrypt

- [ ] **Step 6: Final commit**

```bash
git commit --allow-empty -m "chore: site live on Vercel"
git push
```

---

## Self-Review

### Spec coverage

| Spec section | Implementation task |
|---|---|
| 1. Vue d'ensemble | Tasks 4 (site), 14 (layout meta) |
| 2. Décisions de design | Tasks 1-3 (stack, Tailwind, exports) |
| 3. Architecture (arborescence) | Tasks 1-29 (every file) |
| 4. Système de design (palette, typo, spacing, anim) | Task 2 (`@theme`), 14 (fonts), 10 (counter) |
| 5.1 Page d'accueil sections | Tasks 15-21 |
| 5.2 Page Services | Task 22 |
| 5.3 Page À propos | Task 23 |
| 5.4 Page Contact | Task 24 |
| 6. Composants réutilisables | Tasks 7-11 |
| 7. Données & contenu | Tasks 4-6 |
| 8. Formulaire Formspree | Tasks 11, 31 |
| 9. Déploiement | Task 31 |
| 10. SEO & accessibilité | Tasks 14 (meta), 26 (sitemap), 27 (JSON-LD), 28 (axe) |
| 11. Performance | Task 29 (Lighthouse gate) |
| 12. Plan de livraison | This plan = 31 tasks |
| 13. Risques & inconnues | README §placeholders + spec §13 |
| 15. Critères d'acceptation | Task 29 (build + Lighthouse), Task 31 (deploy + form) |

All spec sections are covered.

### Placeholder scan

- All `[À REMPLIR]` / `[À RÉDIGER]` strings are intentional content placeholders, **rendered visibly with orange tags** so the project owner sees them on the live site. Listed in README §placeholders.
- No "TODO", "TBD", "implement later", or "fill in details" inside the plan steps themselves.
- All test code is concrete (no "write tests for the above").

### Type / signature consistency

- `Pack`, `PackFamilyId`, `PackFamily` defined in Task 5; consumed identically in Tasks 9, 16, 22.
- `Testimonial` defined in Task 6; consumed identically in Task 19.
- `SITE` defined in Task 4; consumed in Tasks 13, 14, 19, 24, 26, 27.
- `Button` props (`variant`, `href`, `children`) consistent across all section components.
- `BentoCard` `tone` (`'default' | 'accent' | 'featured'`) consistent in Tasks 8, 16, 18.
- `formatFCFA` (singular helper) used identically in `PackCard` and `PackFamilies`.

No drift detected.
