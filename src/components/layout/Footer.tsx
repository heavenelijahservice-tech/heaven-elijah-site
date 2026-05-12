import Link from 'next/link';
import { SITE } from '@/data/site';

const UNIVERSITIES = [
  'UCAD',
  'UGB',
  'Université de Thiès',
  'Saint Christopher (USCID)',
  'IPFORMED',
  'Université Alioune Diop',
  'Université de Ziguinchor',
];

const COUNTRIES = [
  { flag: '🇸🇳', name: 'Sénégal' },
  { flag: '🇧🇫', name: 'Burkina Faso' },
  { flag: '🇲🇷', name: 'Mauritanie' },
  { flag: '🇲🇦', name: 'Maroc' },
  { flag: '🇹🇳', name: 'Tunisie' },
  { flag: '🇫🇷', name: 'France' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-sm">
      {/* Bande "Couverture académique et internationale" */}
      <div className="border-b border-white/10">
        <div className="container-hes flex flex-col gap-6 px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
            <p className="text-xs uppercase tracking-[0.2em] text-orange md:w-48 md:flex-shrink-0">
              Universités partenaires
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-text-muted/85">
              {UNIVERSITIES.map(u => (
                <li key={u} className="transition-opacity hover:opacity-100">
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
            <p className="text-xs uppercase tracking-[0.2em] text-orange md:w-48 md:flex-shrink-0">
              Pays couverts
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-text-muted/85">
              {COUNTRIES.map(c => (
                <li key={c.name} className="flex items-center gap-1.5">
                  <span aria-hidden="true">{c.flag}</span>
                  <span className="font-semibold">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-hes grid gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <img src="/logo-picto.png?v=2" alt="" className="size-12" />
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
