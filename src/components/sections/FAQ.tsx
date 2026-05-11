import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'Vous écrivez mon mémoire à ma place ?',
    a: "Non. HES n'est pas un service de rédaction fantôme. Nous outillons votre rigueur méthodologique et statistique. Vous restez l'auteur·e à 100 % de votre travail. Nos livrables (analyses, tableaux, références) s'intègrent dans VOTRE document final, sous votre nom.",
  },
  {
    q: 'Comment garantissez-vous la confidentialité ?',
    a: "Les données et le contenu de votre travail ne sortent jamais de l'équipe HES. Accord de confidentialité (NDA) signé sur demande. Aucune information n'est partagée, ni en interne ni publiquement. Les fichiers sont supprimés de nos serveurs 3 mois après la livraison.",
  },
  {
    q: 'Quels logiciels et standards utilisez-vous ?',
    a: 'Analyses statistiques : R, Python, SPSS, Excel selon votre besoin. Collecte numérique : ODK, KoBo Toolbox, Google Forms. Références bibliographiques : Vancouver par défaut (APA, Chicago ou autre style sur demande). Tous nos livrables sont reproductibles et documentés.',
  },
  {
    q: 'Et si je ne suis pas satisfait du livrable ?',
    a: "Chaque pack inclut deux révisions gratuites pour ajuster le livrable à vos besoins. Si après ces deux révisions le résultat ne convient toujours pas, on en discute pour trouver une solution équitable — révisions supplémentaires offertes ou geste commercial selon le cas.",
  },
  {
    q: 'Acceptez-vous les paiements en plusieurs fois ?',
    a: "L'acompte de 50 % à la signature est fixe. Le solde est dû à la livraison du livrable validé. Pour les packs Premium (Mémoire/Thèse 130 000 FCFA), un échelonnement en 3 fois est possible sur demande : 50 % à la signature, 30 % à mi-parcours, 20 % à la livraison finale.",
  },
];

export function FAQ() {
  return (
    <section className="section-padding">
      <div className="container-hes max-w-3xl">
        <p className="label-tag">— Questions fréquentes</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          On répond aux objections.
        </h2>
        <p className="mt-3 text-text-muted">
          Les questions les plus courantes des étudiants et chercheurs avant de démarrer.
        </p>

        <ul className="mt-10 flex flex-col gap-2">
          {FAQS.map((item, i) => (
            <li key={i}>
              <details className="group rounded-xl border border-border-subtle bg-tile transition-colors hover:border-orange">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
                  <span>{item.q}</span>
                  <Plus
                    className="size-5 flex-shrink-0 text-orange transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-text-muted">
                  {item.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
