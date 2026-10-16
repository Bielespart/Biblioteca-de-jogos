import { describe, expect, it } from 'vitest';
import { validateGameInput } from './validation';

describe('validateGameInput', () => {
  it('rejects empty required fields', () => {
    const result = validateGameInput({
      name: '   ',
      platform: '',
      genre: '',
      developer: ''
    });

    expect(result).toContain('name');
    expect(result).toContain('platform');
    expect(result).toContain('genre');
    expect(result).toContain('developer');
  });

  it('allows valid values', () => {
    const result = validateGameInput({
      name: 'Hades',
      platform: 'PC',
      genre: 'Action Roguelike',
      developer: 'Supergiant Games'
    });

    expect(result).toEqual([]);
  });
});
