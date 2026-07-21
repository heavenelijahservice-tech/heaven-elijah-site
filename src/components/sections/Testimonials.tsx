import { TESTIMONIALS } from '@/data/testimonials';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

const MAX_ON_HOME = 4;

export function Testimonials() {
  const displayed = TESTIMONIALS.slice(0, MAX_ON_HOME);
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
          {displayed.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>
      </div>
    </section>
  );
}
