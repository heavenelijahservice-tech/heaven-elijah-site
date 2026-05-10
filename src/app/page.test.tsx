import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import HomePage from './page';

describe('HomePage accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    if (results.violations.length > 0) {
      const summary = results.violations
        .map(v => `${v.id} (${v.impact}): ${v.description}`)
        .join('\n');
      throw new Error(`Accessibility violations:\n${summary}`);
    }
    expect(results.violations).toHaveLength(0);
  });
});
