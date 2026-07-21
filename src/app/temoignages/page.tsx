import type { Metadata } from 'next';
import { TESTIMONIALS } from '@/data/testimonials';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { TestimonialForm } from '@/components/ui/TestimonialForm';

export const metadata: Metadata = {
  title: 'Témoignages',
  description:
    "Retours de personnes accompagnées par Heaven Elijah Service sur leur mémoire, thèse ou analyse biostatistique. Formulaire semi-privé pour partager ta propre expérience.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function TemoignagesPage() {
  return (
    <>
      {/* Section haute — liste de tous les témoignages */}
      <section className="bg-light text-navy">
        <div className="container-hes section-padding">
          <p className="label-tag">— Ils nous ont fait confiance</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Témoignages
          </h1>
          <p className="mt-4 max-w-2xl text-navy/70">
            Retours de personnes que nous avons accompagnées sur leur mémoire, thèse ou
            analyse depuis 2021. Cette page est <strong>semi-privée</strong> — accessible via
            le lien qu&apos;on t&apos;a transmis, mais pas référencée sur le site public.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map(t => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          <p className="mt-8 text-sm italic text-navy/60">
            {TESTIMONIALS.length} témoignage{TESTIMONIALS.length > 1 ? 's' : ''} publié
            {TESTIMONIALS.length > 1 ? 's' : ''} · Dernier ajout signé de la main de son
            auteur.
          </p>
        </div>
      </section>

      {/* Section basse — formulaire de dépôt */}
      <section className="section-padding">
        <div className="container-hes max-w-3xl">
          <p className="label-tag">— À ton tour</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Tu as travaillé avec HES ?
          </h2>
          <p className="mt-4 max-w-2xl text-text-muted">
            Ton retour compte, plus que tu ne l&apos;imagines. Cinq minutes suffisent — tout
            est ci-dessous. Nous relisons chaque témoignage avant publication et te
            recontactons par email si nécessaire.
          </p>

          <div className="mt-10 rounded-xl border border-border-subtle bg-tile p-6 sm:p-8">
            <TestimonialForm />
          </div>

          <div className="mt-8 rounded-lg border border-border-subtle bg-tile/50 p-4 text-xs text-text-muted">
            <p className="font-semibold text-orange">Comment on gère ton témoignage</p>
            <ul className="mt-2 space-y-1.5 leading-relaxed">
              <li>· Réception par email, relecture manuelle sous 3 jours ouvrés.</li>
              <li>· Publication sur cette page + éventuellement en home (parmi les 4 mis en avant).</li>
              <li>· Ton email de contact n&apos;est jamais rendu public.</li>
              <li>· Modification ou suppression sur simple demande à tout moment.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
