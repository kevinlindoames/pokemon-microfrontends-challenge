import { beforeEach, describe, expect, it, vi } from 'vitest';
import { httpGet } from '../../../shared/api/http-client';
import { searchPokemonByName } from './pokemon.api';

vi.mock('../../../shared/api/http-client', () => ({
  httpGet: vi.fn(),
}));

const mockedHttpGet = vi.mocked(httpGet);

const pikachuResponse = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      },
    },
  },
};

const mrMimeResponse = {
  id: 122,
  name: 'mr-mime',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png',
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/122.svg',
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png',
      },
    },
  },
};

describe('searchPokemonByName', () => {
  beforeEach(() => {
    mockedHttpGet.mockReset();
  });

  it('returns one pokemon when the name matches exactly', async () => {
    mockedHttpGet.mockResolvedValueOnce(pikachuResponse);

    const result = await searchPokemonByName('pikachu');

    expect(mockedHttpGet).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu',
    );

    expect(result).toEqual({
      id: '25',
      name: 'pikachu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
    });
  });

  it('returns null when the value is only a fragment of the pokemon name', async () => {
    mockedHttpGet.mockRejectedValueOnce(new Error('Not found'));

    const result = await searchPokemonByName('pika');

    expect(mockedHttpGet).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pika',
    );

    expect(result).toBeNull();
  });

  it('normalizes spaces and uppercase before searching', async () => {
    mockedHttpGet.mockResolvedValueOnce(mrMimeResponse);

    const result = await searchPokemonByName('Mr Mime');

    expect(mockedHttpGet).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/mr-mime',
    );

    expect(result).toEqual({
      id: '122',
      name: 'mr-mime',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/122.svg',
    });
  });

  it('does not call the API when the search value is empty', async () => {
    const result = await searchPokemonByName('   ');

    expect(mockedHttpGet).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});