import { Check } from 'lucide-react';
import { type Pack, formatFCFA, formatEURandUSD } from '@/data/packs';

export function PackCard({ pack }: { pack: Pack }) {
  const featured = pack.featured;
  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 ${
        featured
          ? 'bg-gradient-to-br from-navy to-tile border-2 border-orange'
          : 'bg-tile border border-border-subtle hover:border-orange'
      }`}
    >
      <header className="flex items-baseline justify-between gap-3">
        <span className="label-tag">Pack</span>
        <div className="flex flex-col items-end">
          <span className="font-mono text-2xl font-bold leading-none text-orange">
            {formatFCFA(pack.priceFCFA)}
          </span>
          <span className="mt-1 font-mono text-[11px] text-text-muted">
            {formatEURandUSD(pack.priceFCFA)}
          </span>
        </div>
      </header>
      <h3 className="text-xl font-bold tracking-tight">{pack.name}</h3>
      <ul className="flex flex-1 flex-col gap-2">
        {pack.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
            <Check className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <footer className="text-xs text-text-muted">
        Délai : <span className="font-mono text-orange">{pack.delivery}</span>
      </footer>
    </article>
  );
}
