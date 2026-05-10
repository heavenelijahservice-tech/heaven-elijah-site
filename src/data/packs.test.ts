import { describe, it, expect } from 'vitest';
import { PACKS, getPacksByFamily, FAMILIES } from './packs';

describe('PACKS data', () => {
  it('contains exactly 9 packs', () => {
    expect(PACKS).toHaveLength(9);
  });

  it('groups into 3 families of 3 packs each', () => {
    expect(getPacksByFamily('memoire-these')).toHaveLength(3);
    expect(getPacksByFamily('analyse')).toHaveLength(3);
    expect(getPacksByFamily('collecte')).toHaveLength(3);
  });

  it('orders Mémoire/Thèse packs at 90k, 110k, 130k FCFA', () => {
    const prices = getPacksByFamily('memoire-these').map(p => p.priceFCFA);
    expect(prices).toEqual([90000, 110000, 130000]);
  });

  it('orders Analyse packs at 50k, 70k, 90k FCFA', () => {
    const prices = getPacksByFamily('analyse').map(p => p.priceFCFA);
    expect(prices).toEqual([50000, 70000, 90000]);
  });

  it('orders Collecte packs at 20k, 30k, 40k FCFA', () => {
    const prices = getPacksByFamily('collecte').map(p => p.priceFCFA);
    expect(prices).toEqual([20000, 30000, 40000]);
  });

  it('exposes 3 family metadata entries', () => {
    expect(FAMILIES).toHaveLength(3);
    FAMILIES.forEach(f => {
      expect(f.label).toBeTruthy();
      expect(f.tagline).toBeTruthy();
    });
  });

  it('every pack has at least 2 features', () => {
    PACKS.forEach(p => expect(p.features.length).toBeGreaterThanOrEqual(2));
  });
});
