import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PokemonDetailPage } from '../pages/pokemon-detail/PokemonDetailPage';

type PokemonDetailProps = {
  pokemonId: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function PokemonDetail({ pokemonId }: PokemonDetailProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonDetailPage pokemonId={pokemonId} />
    </QueryClientProvider>
  );
}