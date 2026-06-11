import { describe, expect, it } from 'vitest';
import type { PokeApiTypeResponse } from '../api/pokeapi.types';
import { mapTypeResponseToPokemonSummaries } from './pokemon-category.mapper';

describe('mapTypeResponseToPokemonSummaries', () => {
  it('should map type response to pokemon summaries', () => {
    const response: PokeApiTypeResponse = {
      id: 10,
      name: 'fire',
      pokemon: [
        {
          slot: 1,
          pokemon: {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
          },
        },
        {
          slot: 2,
          pokemon: {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
          },
        },
      ],
    };

    const result = mapTypeResponseToPokemonSummaries(response, 2);

    expect(result).toEqual([
      {
        id: '4',
        name: 'charmander',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      },
      {
        id: '5',
        name: 'charmeleon',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
      },
    ]);
  });

  it('should respect limit parameter', () => {
    const response: PokeApiTypeResponse = {
      id: 10,
      name: 'fire',
      pokemon: [
        {
          slot: 1,
          pokemon: {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
          },
        },
        {
          slot: 2,
          pokemon: {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
          },
        },
      ],
    };

    const result = mapTypeResponseToPokemonSummaries(response, 1);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('charmander');
  });
});