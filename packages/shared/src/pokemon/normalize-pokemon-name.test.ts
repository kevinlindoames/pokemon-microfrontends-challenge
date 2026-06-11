import { describe, expect, it } from 'vitest';
import { normalizePokemonName } from './normalize-pokemon-name';

describe('normalizePokemonName', () => {
  it('should trim and lowercase the pokemon name', () => {
    expect(normalizePokemonName('  Pikachu  ')).toBe('pikachu');
  });

  it('should replace spaces with hyphens', () => {
    expect(normalizePokemonName('Mr Mime')).toBe('mr-mime');
  });

  it('should normalize accented characters', () => {
    expect(normalizePokemonName('Pikáchu')).toBe('pikachu');
  });

  it('should handle empty values', () => {
    expect(normalizePokemonName('   ')).toBe('');
  });
});