import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-hes max-w-2xl text-center">
        <p className="font-mono text-6xl font-bold text-orange sm:text-8xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Page introuvable.
        </h1>
        <p className="mt-3 text-text-muted">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou consultez nos services.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/">
            <ArrowLeft className="size-4" aria-hidden="true" /> Retour à l'accueil
          </Button>
          <Button href="/services" variant="ghost">
            Voir les packs
          </Button>
        </div>
      </div>
    </section>
  );
}
