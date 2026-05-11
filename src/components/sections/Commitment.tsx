import { ShieldCheck } from 'lucide-react';

export function Commitment() {
  return (
    <section className="section-padding pt-0">
      <div className="container-hes">
        <div className="rounded-2xl border border-orange/30 bg-tile/40 p-8 sm:p-12">
          <div className="flex items-start gap-5">
            <div className="hidden flex-shrink-0 sm:block">
              <ShieldCheck className="size-12 text-orange" aria-hidden="true" />
            </div>
            <div>
              <p className="label-tag">— Notre engagement</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Vous restez l'auteur·e. <span className="text-orange">Toujours.</span>
              </h2>
              <p className="mt-3 max-w-3xl text-text-muted leading-relaxed">
                HES n'écrit pas votre mémoire à votre place. Nous vous outillons, vous
                expliquons, vous accompagnons. Nos livrables (analyses, tableaux, références)
                s'intègrent dans <strong className="text-text">votre</strong> document, sous{' '}
                <strong className="text-text">votre</strong> nom. Pas de tricherie, pas d'IA cachée,
                pas de prête-plume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
