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
