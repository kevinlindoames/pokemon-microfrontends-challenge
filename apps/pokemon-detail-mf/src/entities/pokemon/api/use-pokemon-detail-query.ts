import { useQuery } from '@tanstack/react-query';
import { getPokemonDetail } from './pokemon-detail.api';

export function usePokemonDetailQuery(pokemonId: string) {
  return useQuery({
    queryKey: ['pokemon-detail', pokemonId],
    queryFn: () => getPokemonDetail(pokemonId),
    enabled: Boolean(pokemonId),
  });
}