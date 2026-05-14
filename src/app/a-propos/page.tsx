import type { Metadata } from 'next';
import { Shield, Target, Zap, Handshake, Linkedin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Heaven Elijah Service — cabinet d'accompagnement scientifique pour étudiants et chercheurs ouest-africains. Mission, équipe, outils, valeurs.",
};

const TOOLS = ['R', 'Python', 'Epi Info', 'Google Forms', 'SPSS', 'Excel', 'ODK', 'KoBo', 'Vancouver'];

type TeamMember = {
  name: string;
  role: string;
  diplomas?: string;
  initials: string;
  linkedin?: string;
};

const TEAM: TeamMember[] = [
  {
    name: 'Dr. Rodrigue Zamtato GANE-BANG',
    role: 'Fondateur · Médecin pédiatre',
    diplomas: 'MPH Épidémiologie & Biostatistique · MSc Nutrition Publique',
    initials: 'RG',
    linkedin: 'https://www.linkedin.com/in/rodrigue-zamtato-gane-bang-abbb5489',
  },
  {
    name: 'Dr. Cielle Jusdène Fausta DEMBI',
    role: 'Co-fondatrice · Médecin pédiatre',
    initials: 'CD',
  },
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
            Heaven Elijah Service est un cabinet d'accompagnement scientifique fondé à Thiès,
            dédié aux étudiants et chercheurs ouest-africains. Accompagnement à distance,
            clients dans six pays.
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
              Heaven Elijah Service est né en 2021 d'une intuition simple : trop d'étudiants
              brillants se retrouvent seuls face à leurs données, à quelques semaines de la
              soutenance. Ce n'est pas la motivation qui manque — c'est un partenaire qui prend
              le temps d'expliquer, sans juger, et qui livre dans les délais.
            </p>
            <p className="mt-3 leading-relaxed text-text-muted">
              Nous accompagnons celles et ceux qui défendent une thèse de médecine à Saint-Louis,
              un mémoire de santé publique à Dakar, une analyse clinique à Ouagadougou. Pas en
              écrivant à leur place — en les outillant. On relit les protocoles ensemble, on
              commente le code R ou Python, on explique chaque choix statistique. À la sortie,
              vous repartez avec un livrable rigoureux et la compréhension qui va avec — celle
              qu'il vous faudra le jour du jury.
            </p>
            <p className="mt-3 leading-relaxed text-text-muted">
              Cinq ans plus tard, notre boussole n'a pas bougé : rester accessibles, pédagogiques,
              exigeants — à vos côtés.
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
          <p className="label-tag">— L'équipe</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Qui vous accompagne.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {TEAM.map((m, i) => (
              <li
                key={i}
                className="flex flex-col items-center gap-4 rounded-xl border border-border-subtle bg-tile p-6 text-center sm:flex-row sm:items-start sm:text-left sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="flex size-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy via-navy to-orange-deep text-lg font-bold text-white"
                >
                  {m.initials}
                </span>
                <div className="flex-1">
                  <p className="text-base font-bold leading-tight">{m.name}</p>
                  <p className="mt-1 text-sm text-text-muted">{m.role}</p>
                  {m.diplomas && (
                    <p className="mt-2 text-xs leading-relaxed text-orange">
                      {m.diplomas}
                    </p>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-orange"
                      aria-label={`LinkedIn de ${m.name}`}
                    >
                      <Linkedin className="size-3.5" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-text-muted">
            <em>HES fournit un accompagnement scientifique et méthodologique. Aucune consultation médicale n'est dispensée via le site.</em>
          </p>
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

      <section className="section-padding pt-0">
        <div className="container-hes">
          <div className="rounded-2xl border border-orange/30 bg-gradient-to-br from-navy to-tile p-8 sm:p-12">
            <p className="label-tag">— Notre ambition</p>
            <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
              Devenir le partenaire <span className="text-orange">scientifique de référence</span> de la recherche africaine et internationale.
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
              HES accompagne aujourd'hui des étudiants et chercheurs au Sénégal,
              au Burkina Faso, en Mauritanie, au Maroc, en Tunisie et en France.
              Notre ambition à moyen terme : étendre nos services aux <strong className="text-text">grandes
              institutions de santé publique</strong> (OMS, UNICEF, ONG internationales)
              et aux <strong className="text-text">programmes de recherche multi-pays</strong> qui
              ont besoin d'une expertise méthodologique et statistique francophone, ancrée localement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
