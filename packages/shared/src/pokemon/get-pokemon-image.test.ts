import { describe, expect, it } from 'vitest';
import { getPokemonImage } from './get-pokemon-image';

describe('getPokemonImage', () => {
  it('should return dream world image when available', () => {
    const image = getPokemonImage({
      front_default: 'front.png',
      other: {
        dream_world: {
          front_default: 'dream-world.png',
        },
        'official-artwork': {
          front_default: 'official.png',
        },
      },
    });

    expect(image).toBe('dream-world.png');
  });

  it('should return official artwork when dream world image is not available', () => {
    const image = getPokemonImage({
      front_default: 'front.png',
      other: {
        dream_world: {
          front_default: null,
        },
        'official-artwork': {
          front_default: 'official.png',
        },
      },
    });

    expect(image).toBe('official.png');
  });

  it('should return front default as fallback', () => {
    const image = getPokemonImage({
      front_default: 'front.png',
      other: {
        dream_world: {
          front_default: null,
        },
        'official-artwork': {
          front_default: null,
        },
      },
    });

    expect(image).toBe('front.png');
  });

  it('should return empty string when no image is available', () => {
    const image = getPokemonImage({
      front_default: null,
      other: {
        dream_world: {
          front_default: null,
        },
        'official-artwork': {
          front_default: null,
        },
      },
    });

    expect(image).toBe('');
  });
});