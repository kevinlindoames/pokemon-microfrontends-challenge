import { describe, expect, it } from 'vitest';
import type { PokeApiEvolutionChainLink } from '../api/pokeapi.types';
import { mapEvolutionChain } from './evolution-chain.mapper';

describe('mapEvolutionChain', () => {
  it('should map a linear evolution chain', () => {
    const chain: PokeApiEvolutionChainLink = {
      species: {
        name: 'pichu',
        url: 'https://pokeapi.co/api/v2/pokemon-species/172/',
      },
      evolves_to: [
        {
          species: {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
          },
          evolves_to: [
            {
              species: {
                name: 'raichu',
                url: 'https://pokeapi.co/api/v2/pokemon-species/26/',
              },
              evolves_to: [],
            },
          ],
        },
      ],
    };

    const result = mapEvolutionChain(chain);

    expect(result.map((pokemon) => pokemon.name)).toEqual([
      'pichu',
      'pikachu',
      'raichu',
    ]);

    expect(result[0].id).toBe('172');
    expect(result[1].id).toBe('25');
    expect(result[2].id).toBe('26');
  });

  it('should map a branched evolution chain', () => {
    const chain: PokeApiEvolutionChainLink = {
      species: {
        name: 'eevee',
        url: 'https://pokeapi.co/api/v2/pokemon-species/133/',
      },
      evolves_to: [
        {
          species: {
            name: 'vaporeon',
            url: 'https://pokeapi.co/api/v2/pokemon-species/134/',
          },
          evolves_to: [],
        },
        {
          species: {
            name: 'jolteon',
            url: 'https://pokeapi.co/api/v2/pokemon-species/135/',
          },
          evolves_to: [],
        },
        {
          species: {
            name: 'flareon',
            url: 'https://pokeapi.co/api/v2/pokemon-species/136/',
          },
          evolves_to: [],
        },
      ],
    };

    const result = mapEvolutionChain(chain);

    expect(result.map((pokemon) => pokemon.name)).toEqual([
      'eevee',
      'vaporeon',
      'jolteon',
      'flareon',
    ]);
  });
});