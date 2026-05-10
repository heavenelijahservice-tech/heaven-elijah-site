import { Button } from '@/components/ui/Button';
import { ArrowRight, Shield, RotateCcw, Clock } from 'lucide-react';
import { SITE } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(240,144,66,0.18) 0%, transparent 60%)',
        }}
      />
      <div className="container-hes relative">
        <p className="label-tag">— {SITE.contact.address} · Depuis 2024</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-[1] tracking-[-0.03em] sm:text-6xl md:text-7xl">
          De la conception<br />
          à la <em className="not-italic text-orange">soutenance.</em>
        </h1>
        <p className="mt-5 max-w-xl text-base text-text-muted sm:text-lg">
          Accompagnement méthodologique, statistique et rédactionnel pour étudiants et
          chercheurs. Mémoires, thèses, publications.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/services">
            Voir les packs <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="ghost">
            Discuter de mon projet
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
          <li className="flex items-center gap-2">
            <Shield className="size-4 text-orange" aria-hidden="true" /> Confidentialité garantie
          </li>
          <li className="flex items-center gap-2">
            <RotateCcw className="size-4 text-orange" aria-hidden="true" /> 2 révisions incluses
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-orange" aria-hidden="true" /> Délais 2-3 semaines
          </li>
        </ul>
      </div>
    </section>
  );
}
