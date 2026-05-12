'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft, RotateCcw, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PACKS, formatFCFA, type Pack } from '@/data/packs';
import { SITE } from '@/data/site';

type Stage = 'pas-commence' | 'en-collecte' | 'donnees-pretes' | 'document-presque-fini';
type Level = 'l3-m1' | 'm2' | 'these-article';

const STAGE_OPTIONS: { id: Stage; label: string; desc: string }[] = [
  {
    id: 'pas-commence',
    label: 'Je n\'ai pas encore commencé',
    desc: 'Sujet validé mais pas de protocole, pas de questionnaire',
  },
  {
    id: 'en-collecte',
    label: 'Je suis sur le terrain',
    desc: 'Collecte en cours, ou prête à démarrer',
  },
  {
    id: 'donnees-pretes',
    label: 'Mes données sont collectées',
    desc: 'Base prête, j\'ai besoin des analyses',
  },
  {
    id: 'document-presque-fini',
    label: 'Mon document avance, je veux un accompagnement complet',
    desc: 'De la révision méthodo aux références Vancouver',
  },
];

const LEVEL_OPTIONS: { id: Level; label: string; desc: string }[] = [
  { id: 'l3-m1', label: 'Mémoire L3 / M1', desc: 'Niveau licence ou première année master' },
  { id: 'm2', label: 'Mémoire M2', desc: 'Deuxième année master' },
  { id: 'these-article', label: 'Thèse ou article', desc: 'Doctorat, publication scientifique' },
];

function recommendPackId(stage: Stage, level: Level): string {
  if (stage === 'pas-commence' || stage === 'en-collecte') {
    if (level === 'l3-m1') return 'collecte-essentiel';
    if (level === 'm2') return 'collecte-plus';
    return 'collecte-premium';
  }
  if (stage === 'donnees-pretes') {
    if (level === 'l3-m1') return 'analyse-essentiel';
    if (level === 'm2') return 'analyse-plus';
    return 'analyse-premium';
  }
  if (level === 'l3-m1') return 'memoire-essentiel';
  if (level === 'm2') return 'memoire-standard';
  return 'memoire-premium';
}

function packFamilyLabel(pack: Pack): string {
  if (pack.family === 'memoire-these') return 'Pack Mémoire / Thèse';
  if (pack.family === 'analyse') return 'Pack Analyse';
  return 'Pack Collecte';
}

export function PackCalculator() {
  const [stage, setStage] = useState<Stage | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const currentStep = !stage ? 1 : !level ? 2 : 3;
  const recommendedPack = stage && level ? PACKS.find(p => p.id === recommendPackId(stage, level)) : null;

  const reset = () => {
    setStage(null);
    setLevel(null);
  };

  const transition = shouldReduceMotion
    ? {}
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="section-padding">
      <div className="container-hes max-w-3xl">
        <p className="label-tag">— Recommandation personnalisée</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Quel pack pour vous ?
        </h2>
        <p className="mt-3 text-text-muted">
          Deux questions, une recommandation adaptée. 30 secondes pour savoir où démarrer.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-tile p-6 sm:p-10">
          {/* Indicateur de progression */}
          <div className="mb-8 flex items-center gap-2">
            <div className={`h-1 flex-1 rounded-full transition-colors ${currentStep >= 1 ? 'bg-orange' : 'bg-border-subtle'}`} />
            <div className={`h-1 flex-1 rounded-full transition-colors ${currentStep >= 2 ? 'bg-orange' : 'bg-border-subtle'}`} />
            <div className={`h-1 flex-1 rounded-full transition-colors ${currentStep >= 3 ? 'bg-orange' : 'bg-border-subtle'}`} />
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                transition={transition}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-orange">Question 1 / 2</p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">Où en êtes-vous dans votre projet ?</h3>
                <ul className="mt-6 grid gap-2">
                  {STAGE_OPTIONS.map(opt => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setStage(opt.id)}
                        className="group flex w-full items-start gap-3 rounded-xl border border-border-subtle bg-bg-deep p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange"
                      >
                        <div className="mt-0.5 size-4 flex-shrink-0 rounded-full border-2 border-border-subtle transition-colors group-hover:border-orange" />
                        <div className="flex-1">
                          <p className="font-semibold">{opt.label}</p>
                          <p className="mt-0.5 text-xs text-text-muted">{opt.desc}</p>
                        </div>
                        <ArrowRight className="size-4 self-center text-text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                transition={transition}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-orange">Question 2 / 2</p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">Quel est le niveau de votre projet ?</h3>
                <ul className="mt-6 grid gap-2">
                  {LEVEL_OPTIONS.map(opt => (
                    <li key={opt.id}>
                      <button
                        type="button"
                        onClick={() => setLevel(opt.id)}
                        className="group flex w-full items-start gap-3 rounded-xl border border-border-subtle bg-bg-deep p-4 text-left transition-all hover:-translate-y-0.5 hover:border-orange"
                      >
                        <div className="mt-0.5 size-4 flex-shrink-0 rounded-full border-2 border-border-subtle transition-colors group-hover:border-orange" />
                        <div className="flex-1">
                          <p className="font-semibold">{opt.label}</p>
                          <p className="mt-0.5 text-xs text-text-muted">{opt.desc}</p>
                        </div>
                        <ArrowRight className="size-4 self-center text-text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setStage(null)}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-orange"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" /> Revenir à la question précédente
                </button>
              </motion.div>
            )}

            {currentStep === 3 && recommendedPack && (
              <motion.div
                key="result"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={transition}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-orange">— Notre recommandation</p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">Le pack idéal pour vous</h3>

                <article className="mt-6 rounded-xl border-2 border-orange bg-gradient-to-br from-navy to-tile p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="label-tag">{packFamilyLabel(recommendedPack)}</p>
                      <h4 className="mt-1 text-2xl font-bold tracking-tight">
                        {recommendedPack.name}
                      </h4>
                    </div>
                    <p className="font-mono text-3xl font-bold text-orange">
                      {formatFCFA(recommendedPack.priceFCFA)}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-col gap-2">
                    {recommendedPack.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-xs text-text-muted">
                    Délai : <span className="font-mono text-orange">{recommendedPack.delivery}</span> ·
                    {' '}Acompte 50 % à la signature · 2 révisions incluses
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/contact">
                      Démarrer ce pack <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button href={SITE.contact.whatsappLink} variant="ghost">
                      <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                    </Button>
                  </div>
                </article>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-text-muted hover:text-orange"
                  >
                    <RotateCcw className="size-4" aria-hidden="true" /> Recommencer
                  </button>
                  <a href="/services" className="text-text-muted hover:text-orange">
                    Voir tous les packs →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
