import { Button } from '@/components/ui/Button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE } from '@/data/site';

export function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="container-hes">
        <div className="relative overflow-hidden rounded-2xl border border-orange/40 bg-gradient-to-br from-navy to-tile p-10 text-center sm:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(240,144,66,0.22) 0%, transparent 70%)',
            }}
          />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Discutons de votre projet.
          </h2>
          <p className="relative mt-3 text-text-muted">
            Diagnostic express gratuit en 15 minutes. Aucun engagement.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">
              Prendre contact <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={SITE.contact.whatsappLink} variant="ghost">
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp direct
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
