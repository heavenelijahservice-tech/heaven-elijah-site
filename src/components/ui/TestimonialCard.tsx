import { type Testimonial } from '@/data/testimonials';
import { StarRating } from './StarRating';

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

/**
 * Carte de témoignage réutilisable — utilisée à la fois sur la home (Testimonials section)
 * et sur la page /temoignages qui liste tout.
 */
export function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col justify-between gap-4 rounded-xl border border-navy/10 bg-white p-6">
      {t.rating !== undefined && (
        <StarRating value={t.rating} readonly size={16} onLight />
      )}
      <blockquote className="text-base leading-relaxed">
        <span className="mr-1 text-3xl leading-none text-orange">&quot;</span>
        {t.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-navy/10 pt-4">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
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
  );
}
