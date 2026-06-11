import {
  getPokemonImage,
  type PokemonDetail,
} from '@pokemon-challenge/shared';
import type {
  PokeApiEvolutionChainResponse,
  PokeApiFlavorTextEntry,
  PokeApiPokemonAbility,
  PokeApiPokemonDetailResponse,
  PokeApiPokemonMove,
  PokeApiPokemonSpeciesResponse,
} from '../api/pokeapi.types';
import { cleanFlavorText } from './clean-flavor-text';
import { mapEvolutionChain } from './evolution-chain.mapper';

type MapPokemonDetailParams = {
  pokemon: PokeApiPokemonDetailResponse;
  species: PokeApiPokemonSpeciesResponse;
  evolutionChain: PokeApiEvolutionChainResponse;
};

function getEnglishDescription(
  species: PokeApiPokemonSpeciesResponse,
): string | undefined {
  const entry = species.flavor_text_entries.find(
    (item: PokeApiFlavorTextEntry) => item.language.name === 'en',
  );

  if (!entry) {
    return undefined;
  }

  return cleanFlavorText(entry.flavor_text);
}

export function mapPokeApiPokemonDetail({
  pokemon,
  species,
  evolutionChain,
}: MapPokemonDetailParams): PokemonDetail {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: getPokemonImage(pokemon.sprites),
    types: pokemon.types.map((item) => item.type.name),
    stats: pokemon.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
    height: pokemon.height,
    weight: pokemon.weight,
    baseExperience: pokemon.base_experience,
    abilities: pokemon.abilities.map((item: PokeApiPokemonAbility) => ({
      name: item.ability.name,
      isHidden: item.is_hidden,
    })),
    moves: pokemon.moves
      .slice(0, 8)
      .map((item: PokeApiPokemonMove) => item.move.name),
    cry: pokemon.cries?.latest || pokemon.cries?.legacy || undefined,
    description: getEnglishDescription(species),
    evolutionChain: mapEvolutionChain(evolutionChain.chain),
  };
}