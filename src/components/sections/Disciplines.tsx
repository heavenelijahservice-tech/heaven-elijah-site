const DISCIPLINES = [
  'Santé publique',
  'Médecine',
  'Pharmacie',
  'Sciences infirmières',
  'Épidémiologie',
  'Nutrition',
  'Agronomie',
  'Sciences vétérinaires',
  'Économie',
  'Éducation',
  'Anthropologie',
  'Environnement',
];

export function Disciplines() {
  return (
    <section className="section-padding pt-0">
      <div className="container-hes">
        <p className="label-tag">— Couverture disciplinaire</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Quel que soit votre domaine.
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          On accompagne des projets de recherche dans une quinzaine de disciplines —
          si la vôtre n'est pas listée, demandez : on a probablement déjà couvert un projet similaire.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {DISCIPLINES.map(d => (
            <li
              key={d}
              className="rounded-full border border-border-subtle bg-tile px-4 py-1.5 text-sm text-text-muted transition-colors hover:border-orange hover:text-orange"
            >
              {d}
            </li>
          ))}
          <li className="rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-sm font-semibold text-orange">
            + votre domaine ?
          </li>
        </ul>
      </div>
    </section>
  );
}
