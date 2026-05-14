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
          <p className="mt-2 text-xs italic text-text-muted/70">
            Tarifs facturés en FCFA · Équivalents EUR et USD indicatifs (paiement en devise possible au cours du jour).
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
