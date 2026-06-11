import { describe, expect, it } from 'vitest';
import { cleanFlavorText } from './clean-flavor-text';

describe('cleanFlavorText', () => {
  it('should remove line breaks and form feed characters', () => {
    expect(cleanFlavorText('Hello\nPokémon\fWorld')).toBe(
      'Hello Pokémon World',
    );
  });

  it('should collapse multiple spaces', () => {
    expect(cleanFlavorText('Hello   Pokémon   World')).toBe(
      'Hello Pokémon World',
    );
  });
});