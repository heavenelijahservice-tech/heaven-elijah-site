'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const need = String(data.get('need') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const honeypot = String(data.get('website') ?? '');

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = 'Nom requis';
    if (!EMAIL_RE.test(email)) nextErrors.email = 'Email invalide';
    if (!need) nextErrors.need = 'Type de besoin requis';
    if (!message) nextErrors.message = 'Message requis';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    if (honeypot) return;

    setErrors({});
    setStatus('submitting');

    try {
      if (!FORMSPREE_ID) throw new Error('Formspree ID missing');
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error('Formspree error');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-orange/40 bg-orange/10 p-6 text-center">
        <h3 className="text-lg font-bold">Demande envoyée.</h3>
        <p className="mt-2 text-sm text-text-muted">Nous revenons vers vous sous 24 h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field label="Nom complet" name="name" required error={errors.name}>
        <input type="text" name="name" id="field-name" className="form-input" autoComplete="name" />
      </Field>

      <Field label="Email" name="email" required error={errors.email}>
        <input type="email" name="email" id="field-email" className="form-input" autoComplete="email" />
      </Field>

      <Field label="Téléphone (optionnel)" name="phone">
        <input type="tel" name="phone" id="field-phone" className="form-input" autoComplete="tel" />
      </Field>

      <Field label="Type de besoin" name="need" required error={errors.need}>
        <select name="need" id="field-need" className="form-input" defaultValue="">
          <option value="" disabled>— Choisir —</option>
          <option>Pack Mémoire/Thèse</option>
          <option>Pack Analyse</option>
          <option>Pack Collecte</option>
          <option>Autre</option>
        </select>
      </Field>

      <Field label="Décrivez votre projet" name="message" required error={errors.message}>
        <textarea name="message" id="field-message" rows={5} className="form-input resize-y" />
      </Field>

      {/* Honeypot anti-spam : invisible aux humains (off-screen) ET masqué aux lecteurs d'écran (aria-hidden). Les bots remplissent tous les champs, on rejette si rempli. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="hp-website">Ne pas remplir ce champ</label>
        <input id="hp-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-bold text-bg-deep transition hover:-translate-y-px disabled:opacity-50"
      >
        {status === 'submitting' ? 'Envoi…' : 'Envoyer ma demande'}
        <Send className="size-4" aria-hidden="true" />
      </button>

      {status === 'error' && (
        <p className="text-sm text-orange">
          Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.
        </p>
      )}

      <p className="text-xs text-text-muted">
        Envoi sécurisé via Formspree · Réponse sous 24 h
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`field-${name}`} className="label-tag">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-orange">
          {error}
        </p>
      )}
    </div>
  );
}
