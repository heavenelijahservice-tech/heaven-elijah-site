import Link from 'next/link';
import { SITE } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-sm">
      <div className="container-hes grid gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <img src="/logo.png" alt="" className="size-7" />
            <span>{SITE.name}</span>
          </Link>
          <p className="mt-3 text-text-muted">
            Accompagnement scientifique pour étudiants et chercheurs.
            <br />
            {SITE.contact.address}.
          </p>
        </div>

        <FooterCol title="Site">
          <FooterLink href="/">Accueil</FooterLink>
          <FooterLink href="/services">Services</FooterLink>
          <FooterLink href="/a-propos">À propos</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Contact">
          <li>{SITE.contact.phone}</li>
          <li>{SITE.contact.whatsapp}</li>
          <li>
            <a href={`mailto:${SITE.contact.email}`} className="hover:text-orange">
              {SITE.contact.email}
            </a>
          </li>
        </FooterCol>

        <FooterCol title="Suivez-nous">
          <li>
            <a href={SITE.contact.whatsappLink} className="hover:text-orange">
              WhatsApp
            </a>
          </li>
          <li>LinkedIn</li>
          <li>Facebook</li>
        </FooterCol>
      </div>

      <div className="container-hes flex flex-col items-center justify-between gap-2 border-t border-white/10 px-5 py-4 text-xs text-text-muted sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} {SITE.name} · {SITE.contact.address}</span>
        <span>Tous droits réservés.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="label-tag mb-3">{title}</h5>
      <ul className="flex flex-col gap-2 text-text-muted">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-orange">
        {children}
      </Link>
    </li>
  );
}
