import type { VisitedPokemon } from '@pokemon-challenge/shared';
import { formatDate } from '../../../shared/lib/format-date';

type VisitedPokemonItemProps = {
  pokemon: VisitedPokemon;
};

export function VisitedPokemonItem({ pokemon }: VisitedPokemonItemProps) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 transition dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20 md:flex-row md:items-center">
      <div className="flex h-28 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-sky-50 p-3 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40 md:w-32">
      <img
  alt={pokemon.name}
  className="h-full w-full object-contain"
  decoding="async"
  loading="lazy"
  src={pokemon.image}
/>
      </div>

      <div className="flex-1">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500 dark:text-cyan-300">
          #{pokemon.id}
        </p>

        <h3 className="mt-1 text-2xl font-black capitalize text-slate-950 dark:text-white">
          {pokemon.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          Última visita: {formatDate(pokemon.lastVisitedAt)}
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-3 text-center text-yellow-700 dark:border-yellow-300/20 dark:bg-yellow-300/10 dark:text-yellow-100">
        <p className="text-xs font-black uppercase tracking-[0.2em]">
          Visitas
        </p>

        <p className="text-3xl font-black">{pokemon.visits}</p>
      </div>
    </article>
  );
}