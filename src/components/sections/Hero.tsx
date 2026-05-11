'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Shield, RotateCcw, Clock } from 'lucide-react';
import { SITE } from '@/data/site';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden section-padding">
      {/* Halo orange en haut à droite (existant) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(240,144,66,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Logo décoratif géant rotatif sur la droite — semi-transparent, derrière le contenu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block"
      >
        <img
          src="/logo-icon.svg"
          alt=""
          className="animate-spin-slow h-[600px] w-[600px]"
        />
      </div>

      <div className="container-hes relative">
        <motion.p {...fadeUp(0)} className="label-tag">
          — {SITE.contact.address} · Depuis 2024
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="mt-3 max-w-4xl text-5xl font-bold leading-[1] tracking-[-0.03em] sm:text-6xl md:text-7xl"
        >
          De la conception
          <br />à la <em className="not-italic text-orange">soutenance.</em>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-5 max-w-xl text-base text-text-muted sm:text-lg"
        >
          Accompagnement méthodologique, statistique et rédactionnel pour étudiants et
          chercheurs. Mémoires, thèses, publications.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-7 flex flex-wrap gap-3">
          <Button href="/services">
            Voir les packs <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="ghost">
            Discuter de mon projet
          </Button>
        </motion.div>

        <motion.ul
          {...fadeUp(0.4)}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted"
        >
          <li className="flex items-center gap-2">
            <Shield className="size-4 text-orange" aria-hidden="true" /> Confidentialité garantie
          </li>
          <li className="flex items-center gap-2">
            <RotateCcw className="size-4 text-orange" aria-hidden="true" /> 2 révisions incluses
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-orange" aria-hidden="true" /> Délais 2-3 semaines
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
