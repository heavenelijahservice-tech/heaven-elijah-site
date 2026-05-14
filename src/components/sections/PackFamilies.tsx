import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { FAMILIES, getPacksByFamily, formatFCFA, formatEURandUSD } from '@/data/packs';

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
                  <div className="mt-auto flex items-end justify-between gap-2">
                    <div>
                      <span className="block font-mono text-2xl font-bold leading-none text-orange">
                        dès {formatFCFA(minPrice)}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] text-text-muted">
                        {formatEURandUSD(minPrice)}
                      </span>
                    </div>
                    <ArrowRight className="size-5 shrink-0 text-orange transition group-hover:translate-x-1" aria-hidden="true" />
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
