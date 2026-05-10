import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps | 'href'>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-orange text-bg-deep hover:shadow-[0_8px_24px_-8px_var(--color-orange)]',
  ghost: 'border border-white/30 text-text hover:border-orange hover:text-orange bg-transparent',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '' } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ('href' in props && props.href) {
    const { href, variant: _v, children: _c, className: _cn, ...rest } = props;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, children: _c, className: _cn, href: _h, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
