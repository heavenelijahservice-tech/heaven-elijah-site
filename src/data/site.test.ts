import { describe, it, expect } from 'vitest';
import { SITE } from './site';

describe('SITE config', () => {
  it('exposes brand identity', () => {
    expect(SITE.name).toBe('Heaven Elijah Service');
    expect(SITE.tagline).toBe('De la conception à la soutenance.');
  });

  it('exposes contact channels', () => {
    expect(SITE.contact.email).toMatch(/@/);
    expect(SITE.contact.whatsapp).toMatch(/^\+221/);
    expect(SITE.contact.phone).toMatch(/^\+221/);
    expect(SITE.contact.address).toContain('Thiès');
  });

  it('uses the production URL', () => {
    expect(SITE.url).toBe('https://heavenelijahservice.org');
  });
});
