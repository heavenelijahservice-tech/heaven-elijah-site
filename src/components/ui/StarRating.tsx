'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

export type StarRatingProps = {
  value: number | null;
  onChange?: (v: number) => void;
  size?: number;
  /** Affichage seul, pas d'interaction. */
  readonly?: boolean;
  /** Couleur du fond quand la contrastée sur fond clair. Défaut : navy sur cream. */
  onLight?: boolean;
};

/**
 * Widget étoiles réutilisable — input (avec onChange) ou lecture seule (readonly).
 * Cinq étoiles cliquables ; hover survole l'aperçu.
 */
export function StarRating({ value, onChange, size = 22, readonly = false, onLight = false }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value ?? 0;
  const emptyClass = onLight ? 'text-navy/25' : 'text-border-subtle';
  const filledClass = 'fill-orange text-orange';

  if (readonly) {
    return (
      <div className="flex gap-0.5" role="img" aria-label={`Note : ${value ?? 0} sur 5`}>
        {[1, 2, 3, 4, 5].map(n => (
          <Star
            key={n}
            aria-hidden="true"
            className={n <= (value ?? 0) ? filledClass : emptyClass}
            style={{ width: size, height: size }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(null)}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          type="button"
          key={n}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => setHover(n)}
          className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
          aria-label={`Attribuer la note ${n} sur 5`}
          aria-pressed={value === n}
        >
          <Star
            aria-hidden="true"
            className={n <= display ? filledClass : emptyClass}
            style={{ width: size, height: size }}
          />
        </button>
      ))}
    </div>
  );
}
