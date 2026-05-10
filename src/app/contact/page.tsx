import type { Metadata } from 'next';
import { ContactForm } from '@/components/ui/ContactForm';
import { SITE } from '@/data/site';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Démarrez votre projet avec Heaven Elijah Service. Diagnostic express gratuit en 15 minutes.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-hes">
          <p className="label-tag">— Discutons</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Démarrer un projet.
          </h1>
          <p className="mt-3 max-w-2xl text-text-muted">
            Diagnostic express gratuit en 15 minutes. Décrivez votre besoin et on revient vers
            vous sous 24 h.
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-hes grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-xl border border-border-subtle bg-tile p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-3">
            <a
              href={SITE.contact.whatsappLink}
              className="rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 text-white/85">
                <MessageCircle className="size-4" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest">WhatsApp direct</span>
              </div>
              <p className="mt-2 font-mono text-lg font-bold text-white">{SITE.contact.whatsapp}</p>
              <p className="mt-1 text-xs text-white/85">Réponse en quelques heures</p>
            </a>

            <ContactCard Icon={Phone} title="Téléphone">
              <span className="font-mono">{SITE.contact.phone}</span>
            </ContactCard>

            <ContactCard Icon={Mail} title="Email">
              <a href={`mailto:${SITE.contact.email}`} className="break-all hover:text-orange">
                {SITE.contact.email}
              </a>
            </ContactCard>

            <ContactCard Icon={MapPin} title="Localisation">
              <span>{SITE.contact.address}</span>
              <iframe
                title="Carte de Dakar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62164.92!2d-17.49!3d14.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f50fe8e555%3A0x2bdf5d636cc7cea1!2sDakar!5e0!3m2!1sfr!2ssn!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-3 h-32 w-full rounded-lg border border-border-subtle"
              />
            </ContactCard>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  Icon,
  title,
  children,
}: {
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-tile p-5">
      <div className="flex items-center gap-2 text-orange">
        <Icon className="size-4" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
