'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { StarRating } from './StarRating';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_TESTIMONIAL_ID ?? '';
const MAX_TEXT = 500;

export function TestimonialForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [rating, setRating] = useState<number | null>(null);
  const [consent, setConsent] = useState(false);
  const [textLen, setTextLen] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const statut = String(data.get('statut') ?? '').trim();
    const institution = String(data.get('institution') ?? '').trim();
    const text = String(data.get('text') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const honeypot = String(data.get('website') ?? '');

    const next: Record<string, string> = {};
    if (!name) next.name = 'Ton nom (réel ou initiales) est requis';
    if (!statut) next.statut = 'Ton statut est requis';
    if (!institution) next.institution = 'Ton institution est requise';
    if (!text) next.text = 'Ton témoignage est requis';
    else if (text.length > MAX_TEXT) next.text = `Trop long — max ${MAX_TEXT} caractères`;
    if (!EMAIL_RE.test(email)) next.email = 'Email invalide';
    if (!consent) next.consent = 'Il faut autoriser la publication pour envoyer';

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    if (honeypot) return;

    setErrors({});
    setStatus('submitting');

    try {
      if (!FORMSPREE_ID) throw new Error('Formspree témoignage ID manquant');
      const payload = {
        _subject: `Nouveau témoignage HES — ${name}`,
        name,
        statut,
        institution,
        témoignage: text,
        note: rating ? `${rating}/5` : 'non spécifiée',
        email_contact: email,
        consentement: 'Oui, autorise la publication',
      };
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Formspree error');
      setStatus('success');
      form.reset();
      setRating(null);
      setConsent(false);
      setTextLen(0);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-orange/40 bg-orange/10 p-6 text-center">
        <h3 className="text-lg font-bold">Merci pour ton témoignage.</h3>
        <p className="mt-2 text-sm text-text-muted">
          Nous le relirons et le publierons sur cette page sous 3 jours ouvrés.
          On te contactera par email si on a besoin d&apos;une précision.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field
        label="Ton nom (complet ou initiales)"
        name="name"
        required
        error={errors.name}
        help="Ex : « Aminata D. » ou juste les initiales — comme tu préfères"
      >
        <input
          type="text"
          name="name"
          id="tf-name"
          className="form-input"
          autoComplete="name"
          suppressHydrationWarning
        />
      </Field>

      <Field label="Ton statut" name="statut" required error={errors.statut}>
        <select
          name="statut"
          id="tf-statut"
          className="form-input"
          defaultValue=""
          suppressHydrationWarning
        >
          <option value="" disabled>— Choisir —</option>
          <option>Étudiant L3 / M1</option>
          <option>Étudiant M2</option>
          <option>Doctorant</option>
          <option>Chercheur ou clinicien</option>
          <option>Encadrant / enseignant</option>
          <option>Autre</option>
        </select>
      </Field>

      <Field
        label="Ton institution ou université"
        name="institution"
        required
        error={errors.institution}
        help="Ex : UCAD, UGB, Université de Thiès, Hôpital Le Dantec…"
      >
        <input
          type="text"
          name="institution"
          id="tf-institution"
          className="form-input"
          suppressHydrationWarning
        />
      </Field>

      <Field
        label={`Ton témoignage (${textLen} / ${MAX_TEXT})`}
        name="text"
        required
        error={errors.text}
        help="Décris en quelques phrases ce que HES a fait pour toi et ce que ça a changé."
      >
        <textarea
          name="text"
          id="tf-text"
          rows={5}
          className="form-input resize-y"
          maxLength={MAX_TEXT}
          onChange={e => setTextLen(e.currentTarget.value.length)}
          suppressHydrationWarning
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        />
      </Field>

      <div className="flex flex-col gap-2">
        <span className="label-tag">Note (optionnelle)</span>
        <StarRating value={rating} onChange={setRating} />
      </div>

      <Field
        label="Ton email de contact"
        name="email"
        required
        error={errors.email}
        help="Non publié — sert uniquement à te recontacter en cas de question"
      >
        <input
          type="email"
          name="email"
          id="tf-email"
          className="form-input"
          autoComplete="email"
          suppressHydrationWarning
        />
      </Field>

      <div className="mt-2 flex items-start gap-3 rounded-lg border border-border-subtle bg-bg-deep/50 p-3">
        <input
          type="checkbox"
          name="consent"
          id="tf-consent"
          checked={consent}
          onChange={e => setConsent(e.currentTarget.checked)}
          className="mt-1 size-4 shrink-0 accent-orange"
          suppressHydrationWarning
        />
        <label htmlFor="tf-consent" className="text-xs leading-relaxed text-text-muted">
          <strong className="text-text">J&apos;autorise Heaven Elijah Service à publier mon témoignage</strong>
          {' '}sur son site web (nom / initiales, statut, institution, texte, note).
          Mon email de contact ne sera pas rendu public.
          Je peux demander la suppression à tout moment via{' '}
          <a href="mailto:heaven.elijahservice@gmail.com" className="text-orange underline">
            heaven.elijahservice@gmail.com
          </a>.
        </label>
      </div>
      {errors.consent && (
        <p role="alert" className="text-xs text-orange">{errors.consent}</p>
      )}

      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="tf-hp">Ne pas remplir ce champ</label>
        <input id="tf-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-orange px-5 py-3 text-sm font-bold text-bg-deep transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === 'submitting' ? (
          <>
            Envoi en cours
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Envoyer mon témoignage
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="text-sm text-orange">
          Une erreur est survenue. Réessaie, ou contacte-nous directement via WhatsApp.
        </p>
      )}

      <p className="text-xs text-text-muted">
        Modération manuelle avant publication · Réponse sous 3 jours ouvrés
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  help,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`tf-${name}`} className="label-tag">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </label>
      {help && <p className="mb-1 text-xs text-text-muted">{help}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs text-orange">
          {error}
        </p>
      )}
    </div>
  );
}
