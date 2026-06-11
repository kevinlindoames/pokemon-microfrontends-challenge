import type { PokemonDetail } from '@pokemon-challenge/shared';
import { API_CONFIG } from '../../../shared/config/api.config';
import { httpGet } from '../../../shared/api/http-client';
import type {
  PokeApiEvolutionChainResponse,
  PokeApiPokemonDetailResponse,
  PokeApiPokemonSpeciesResponse,
} from './pokeapi.types';
import { mapPokeApiPokemonDetail } from '../lib/pokemon-detail.mapper';

export async function getPokemonDetail(
  pokemonId: string,
): Promise<PokemonDetail> {
  const pokemon = await httpGet<PokeApiPokemonDetailResponse>(
    `${API_CONFIG.pokeApiBaseUrl}/pokemon/${pokemonId}`,
  );

  const species = await httpGet<PokeApiPokemonSpeciesResponse>(
    pokemon.species.url,
  );

  const evolutionChain = await httpGet<PokeApiEvolutionChainResponse>(
    species.evolution_chain.url,
  );

  return mapPokeApiPokemonDetail({
    pokemon,
    species,
    evolutionChain,
  });
}