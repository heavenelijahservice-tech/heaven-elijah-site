'use client';

import { useEffect, useRef, useState } from 'react';

export type AnimatedCounterProps = {
  to: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
};

/**
 * Compteur animé 0 → `to` à l'entrée dans le viewport.
 *
 * SSR strategy:
 * - Le rendu initial (serveur + hydration) affiche `to` directement.
 *   → Crawlers (Google, OG), utilisateurs sans JS et `prefers-reduced-motion`
 *     voient toujours la vraie valeur.
 * - Au mount client, si la section est sous le fold, on remet à 0 puis on
 *   anime quand IntersectionObserver détecte l'intersection.
 * - Si la section est déjà visible au mount, on saute l'animation pour
 *   éviter un flash "300 → 0 → 300".
 */
export function AnimatedCounter({ to, durationMs = 1200, suffix = '', className = '' }: AnimatedCounterProps) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // garde la valeur cible, pas d'animation
    }

    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      return; // déjà à l'écran au mount → pas d'animation pour éviter le flash
    }

    setValue(0);

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
