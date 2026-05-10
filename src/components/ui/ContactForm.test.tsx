import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('renders required fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/nom complet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type de besoin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/décrivez votre projet/i)).toBeInTheDocument();
  });

  it('blocks submission when name is empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(await screen.findByText(/nom requis/i)).toBeInTheDocument();
  });

  it('blocks submission with malformed email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/nom complet/i), 'Awa Diop');
    await user.type(screen.getByLabelText(/email/i), 'pas-un-email');
    await user.type(screen.getByLabelText(/décrivez votre projet/i), 'Mémoire de M2');
    await user.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument();
  });
});
