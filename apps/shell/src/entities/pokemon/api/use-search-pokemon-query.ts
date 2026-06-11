import { normalizePokemonName } from '@pokemon-challenge/shared';
import { useQuery } from '@tanstack/react-query';
import { getAllPokemonForSearch } from './pokemon.api';

const MAX_SEARCH_RESULTS = 24;

export function useSearchPokemonQuery(searchValue: string) {
  const normalizedValue = normalizePokemonName(searchValue);

  return useQuery({
    queryKey: ['pokemon-search-list'],
    queryFn: getAllPokemonForSearch,
    enabled: normalizedValue.length > 0,
    staleTime: 1000 * 60 * 30,
    select: (pokemonList) => {
      if (!normalizedValue) {
        return [];
      }

      return pokemonList
        .filter((pokemon) => {
          const normalizedPokemonName = normalizePokemonName(pokemon.name);

          return (
            normalizedPokemonName.startsWith(normalizedValue) ||
            normalizedPokemonName.includes(normalizedValue)
          );
        })
        .sort((a, b) => {
          const aName = normalizePokemonName(a.name);
          const bName = normalizePokemonName(b.name);

          const aStartsWith = aName.startsWith(normalizedValue);
          const bStartsWith = bName.startsWith(normalizedValue);

          if (aStartsWith && !bStartsWith) {
            return -1;
          }

          if (!aStartsWith && bStartsWith) {
            return 1;
          }

          return aName.localeCompare(bName);
        })
        .slice(0, MAX_SEARCH_RESULTS);
    },
  });
}