import type { ReactNode } from 'react';

type Tone = 'default' | 'accent' | 'featured';

export type BentoCardProps = {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
};

const toneClasses: Record<Tone, string> = {
  default:
    'bg-tile border border-border-subtle hover:border-orange',
  accent:
    'bg-gradient-to-br from-orange to-orange-deep text-bg-deep border border-transparent',
  featured:
    'bg-gradient-to-br from-navy to-tile border border-orange',
};

export function BentoCard({ tone = 'default', children, className = '', as: Tag = 'div' }: BentoCardProps) {
  return (
    <Tag
      className={`group rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
