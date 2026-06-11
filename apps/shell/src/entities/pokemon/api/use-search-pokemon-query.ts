import { normalizePokemonName } from '@pokemon-challenge/shared';
import { useQuery } from '@tanstack/react-query';
import { searchPokemonByName } from './pokemon.api';

export function useSearchPokemonQuery(searchValue: string) {
  const normalizedValue = normalizePokemonName(searchValue);

  return useQuery({
    queryKey: ['pokemon-search-exact', normalizedValue],
    queryFn: () => searchPokemonByName(normalizedValue),
    enabled: normalizedValue.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}