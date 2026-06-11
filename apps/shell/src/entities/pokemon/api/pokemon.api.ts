import {
  getPokemonImage,
  normalizePokemonName,
  type PokemonSummary,
  type PokemonTypeName,
} from '@pokemon-challenge/shared';
import { httpGet } from '../../../shared/api/http-client';
import { API_CONFIG } from '../../../shared/config/api.config';
import { mapTypeResponseToPokemonSummaries } from '../lib/pokemon-category.mapper';
import type {
  PokeApiPokemonDetailResponse,
  PokeApiPokemonListResponse,
  PokeApiTypeResponse,
} from './pokeapi.types';

function getPokemonIdFromUrl(url: string): string {
  const urlParts = url.split('/').filter(Boolean);

  return urlParts[urlParts.length - 1] ?? '';
}

function getOfficialArtworkUrl(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function getPokemonByType(
  type: PokemonTypeName,
): Promise<PokemonSummary[]> {
  const response = await httpGet<PokeApiTypeResponse>(
    `${API_CONFIG.pokeApiBaseUrl}/type/${type}`,
  );

  return mapTypeResponseToPokemonSummaries(response, 10);
}

export async function getPokemonPage(params: {
  limit: number;
  offset: number;
}): Promise<{
  results: PokemonSummary[];
  nextOffset: number | null;
}> {
  const response = await httpGet<PokeApiPokemonListResponse>(
    `${API_CONFIG.pokeApiBaseUrl}/pokemon?limit=${params.limit}&offset=${params.offset}`,
  );

  return {
    results: response.results.map((pokemon) => {
      const id = getPokemonIdFromUrl(pokemon.url);

      return {
        id,
        name: pokemon.name,
        image: getOfficialArtworkUrl(id),
      };
    }),
    nextOffset: response.next ? params.offset + params.limit : null,
  };
}

export async function searchPokemonByName(
  value: string,
): Promise<PokemonSummary | null> {
  const normalizedValue = normalizePokemonName(value);

  if (!normalizedValue) {
    return null;
  }

  try {
    const response = await httpGet<PokeApiPokemonDetailResponse>(
      `${API_CONFIG.pokeApiBaseUrl}/pokemon/${normalizedValue}`,
    );

    return {
      id: String(response.id),
      name: response.name,
      image: getPokemonImage(response.sprites),
    };
  } catch {
    return null;
  }
}