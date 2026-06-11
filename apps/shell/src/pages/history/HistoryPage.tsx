import { lazy, Suspense } from 'react';

const PokemonHistory = lazy(() => import('pokemonHistoryMf/PokemonHistory'));

export function HistoryPage() {
  return (
    <Suspense fallback={<p className="text-slate-300">Loading history MF...</p>}>
      <PokemonHistory />
    </Suspense>
  );
}