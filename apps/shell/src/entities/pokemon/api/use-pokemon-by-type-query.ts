import type { PokemonTypeName } from '@pokemon-challenge/shared';
import { useQuery } from '@tanstack/react-query';
import { getPokemonByType } from './pokemon.api';

export function usePokemonByTypeQuery(type: PokemonTypeName) {
  return useQuery({
    queryKey: ['pokemon-by-type', type],
    queryFn: () => getPokemonByType(type),
  });
}