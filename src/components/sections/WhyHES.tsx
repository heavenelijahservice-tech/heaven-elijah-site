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
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
            <p className="label-tag">Projets accompagnés</p>
            <div>
              <p className="font-mono text-6xl font-bold leading-none">
                <AnimatedCounter to={50} suffix="+" />
              </p>
              <p className="mt-3 max-w-xs text-sm text-text-muted">
                Mémoires, thèses et analyses livrés à des étudiants et chercheurs ouest-africains depuis 2024.
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
