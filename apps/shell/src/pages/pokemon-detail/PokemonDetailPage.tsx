import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = lazy(() => import('pokemonDetailMf/PokemonDetail'));

export function PokemonDetailPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  if (!pokemonId) {
    return (
      <section className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
        No se encontró el identificador del Pokémon.
      </section>
    );
  }

  return (
    <Suspense
      fallback={
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 text-slate-500 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:text-slate-400">
          Loading detail MF...
        </section>
      }
    >
      <PokemonDetail pokemonId={pokemonId} />
    </Suspense>
  );
}