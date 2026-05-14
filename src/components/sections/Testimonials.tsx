import { TESTIMONIALS, type Testimonial } from '@/data/testimonials';

function getInitials(t: Testimonial): string {
  if (t.initials) return t.initials;
  return t.name
    .replace(/^(Dr\.?|Pr\.?|Mr\.?|Mme\.?|M\.?) ?/i, '')
    .split(/\s+/)
    .map(part => part[0])
    .filter(c => c && /[A-Za-zÀ-ÿ]/.test(c))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="bg-light text-navy">
      <div className="container-hes section-padding">
        <p className="label-tag">— Ils nous ont fait confiance</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Témoignages
        </h2>
        <p className="mt-3 max-w-xl text-navy/65">
          Étudiants et chercheurs accompagnés sur des mémoires et thèses dans plusieurs disciplines.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map(t => (
            <figure
              key={t.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-navy/10 bg-white p-6"
            >
              <blockquote className="text-base leading-relaxed">
                <span className="mr-1 text-3xl leading-none text-orange">"</span>
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-navy/10 pt-4">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt=""
                    aria-hidden="true"
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy via-navy to-orange-deep text-xs font-bold text-white"
                  >
                    {getInitials(t)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-navy/55">{t.role}</p>
                </div>
                {t.placeholder && (
                  <span className="ml-auto rounded bg-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    À remplir
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
