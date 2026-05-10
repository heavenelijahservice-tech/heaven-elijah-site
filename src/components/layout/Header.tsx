import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-deep/80 backdrop-blur">
      <div className="container-hes flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <img src="/logo.svg" alt="" className="size-8" />
          <span className="hidden sm:inline">Heaven Elijah</span>
          <span className="text-orange">Service</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden gap-7 text-sm md:flex">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-text-muted transition hover:text-orange"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href="/contact" className="hidden sm:inline-flex">
          Démarrer un projet →
        </Button>
      </div>
    </header>
  );
}
