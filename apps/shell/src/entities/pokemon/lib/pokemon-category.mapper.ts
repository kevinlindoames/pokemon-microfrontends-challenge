import type { PokemonSummary } from '@pokemon-challenge/shared';
import type {
  PokeApiTypePokemonItem,
  PokeApiTypeResponse,
} from '../api/pokeapi.types';
import { getOfficialArtworkUrl } from './get-official-artwork-url';
import { getPokemonIdFromUrl } from './get-pokemon-id-from-url';

export function mapTypeResponseToPokemonSummaries(
  response: PokeApiTypeResponse,
  limit = 10,
): PokemonSummary[] {
  return response.pokemon
    .slice(0, limit)
    .map((item: PokeApiTypePokemonItem) => {
      const id = getPokemonIdFromUrl(item.pokemon.url);

      return {
        id,
        name: item.pokemon.name,
        image: getOfficialArtworkUrl(id),
      };
    });
}