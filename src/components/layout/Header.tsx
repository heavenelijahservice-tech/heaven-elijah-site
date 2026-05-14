'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-deep/80 backdrop-blur">
      <div className="container-hes flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <img src="/logo-icon.svg" alt="Heaven Elijah Service" className="size-14" width={56} height={56} />
          <span aria-hidden="true" className="hidden sm:inline">
            Heaven Elijah
          </span>
          <span aria-hidden="true" className="hidden text-orange sm:inline">
            Service
          </span>
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

        <Button href="/contact" className="hidden md:inline-flex">
          Démarrer un projet →
        </Button>

        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(o => !o)}
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-orange md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/10 bg-bg-deep/95 backdrop-blur md:hidden"
      >
        <nav aria-label="Navigation mobile" className="container-hes flex flex-col px-5 py-3">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="border-b border-white/5 py-3 text-base text-text-muted hover:text-orange"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" onClick={close} className="mt-4 w-full">
            Démarrer un projet →
          </Button>
        </nav>
      </div>
    </header>
  );
}
