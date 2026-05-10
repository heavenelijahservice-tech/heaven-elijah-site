import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders as a link when href is provided', () => {
    render(<Button href="/contact">Contact</Button>);
    const el = screen.getByRole('link', { name: 'Contact' });
    expect(el).toHaveAttribute('href', '/contact');
  });

  it('renders as a button by default', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('applies the primary variant class by default', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-orange');
  });

  it('applies the ghost variant when requested', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
  });
});
