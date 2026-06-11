import { registerPokemonVisit } from '@pokemon-challenge/shared';
import { useEffect } from 'react';
import { usePokemonDetailQuery } from '../../entities/pokemon/api/use-pokemon-detail-query';
import { PokemonDetailCard } from '../../widgets/pokemon-detail-card/PokemonDetailCard';

type PokemonDetailPageProps = {
  pokemonId: string;
};

export function PokemonDetailPage({ pokemonId }: PokemonDetailPageProps) {
  const { data, isLoading, isError } = usePokemonDetailQuery(pokemonId);

  useEffect(() => {
    if (data) {
      registerPokemonVisit(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-xl dark:border-cyan-300/10 dark:bg-slate-950/70">
        <div className="h-8 w-64 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-[2rem] bg-slate-200 dark:bg-white/10" />
          <div className="space-y-4">
            <div className="h-10 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-6 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-6 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-6 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-red-700 shadow-xl dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
        <p className="text-sm font-black uppercase tracking-[0.3em]">
          Error
        </p>

        <h2 className="mt-3 text-3xl font-black">
          No se pudo cargar el Pokémon
        </h2>

        <p className="mt-2 font-medium">
          Verifica el identificador: {pokemonId}
        </p>
      </section>
    );
  }

  return <PokemonDetailCard pokemon={data} />;
}