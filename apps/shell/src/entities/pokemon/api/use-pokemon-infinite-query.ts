import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemonPage } from './pokemon.api';

const PAGE_SIZE = 30;

export function usePokemonInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: ['pokemon-infinite-list'],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getPokemonPage({
        limit: PAGE_SIZE,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
}