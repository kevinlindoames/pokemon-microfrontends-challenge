import type { PokemonEvolution } from '@pokemon-challenge/shared';
import type { PokeApiEvolutionChainLink } from '../api/pokeapi.types';
import { getIdFromUrl } from './get-id-from-url';
import { getOfficialArtworkUrl } from './get-official-artwork-url';

function walkEvolutionChain(
  link: PokeApiEvolutionChainLink,
  result: PokemonEvolution[],
): void {
  const id = getIdFromUrl(link.species.url);

  result.push({
    id,
    name: link.species.name,
    image: getOfficialArtworkUrl(id),
  });

  link.evolves_to.forEach((nextLink: PokeApiEvolutionChainLink) => {
    walkEvolutionChain(nextLink, result);
  });
}

export function mapEvolutionChain(
  chain: PokeApiEvolutionChainLink,
): PokemonEvolution[] {
  const result: PokemonEvolution[] = [];

  walkEvolutionChain(chain, result);

  const uniqueById = new Map<string, PokemonEvolution>();

  result.forEach((pokemon) => {
    uniqueById.set(pokemon.id, pokemon);
  });

  return Array.from(uniqueById.values());
}