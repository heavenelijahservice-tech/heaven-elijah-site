const STEPS = [
  { num: '01', title: 'Diagnostic express', desc: '15 min, gratuit. On cadre votre besoin.' },
  { num: '02', title: 'Validation', desc: "Protocole + plan d'analyse signés." },
  { num: '03', title: 'Analyse', desc: 'Livrable + 2 révisions incluses.' },
  { num: '04', title: 'Restitution', desc: 'Tableaux, figures, narratif scientifique.' },
];

export function Process() {
  return (
    <section className="section-padding">
      <div className="container-hes">
        <p className="label-tag">— Méthode</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Un process en 4 étapes.
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">
          Cadre clair, livrables identifiés, deux révisions incluses à chaque pack.
        </p>

        <ol className="relative mt-10 grid gap-3 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[5%] top-[34px] hidden h-px bg-gradient-to-r from-transparent via-orange to-transparent md:block"
          />
          {STEPS.map(s => (
            <li
              key={s.num}
              className="relative z-10 rounded-xl border border-border-subtle bg-bg-deep p-5 text-center"
            >
              <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border border-orange bg-tile font-mono font-bold text-orange">
                {s.num}
              </span>
              <h3 className="text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-xs text-text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
