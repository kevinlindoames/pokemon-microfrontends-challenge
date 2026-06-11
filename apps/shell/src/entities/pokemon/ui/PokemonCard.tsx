import type { PokemonSummary } from '@pokemon-challenge/shared';
import { Link } from 'react-router-dom';

type PokemonCardProps = {
  pokemon: PokemonSummary;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20"
      to={`/pokemon/${pokemon.id}`}
    >
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-sky-50 p-4 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40">
        {pokemon.image ? (
          <img
  alt={pokemon.name}
  className="h-full w-full object-contain transition group-hover:scale-110"
  decoding="async"
  loading="lazy"
  src={pokemon.image}
/>
        ) : (
          <div className="text-sm text-slate-400">No image</div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
          #{pokemon.id}
        </p>

        <h3 className="mt-1 text-lg font-black capitalize text-slate-950 dark:text-white">
          {pokemon.name}
        </h3>
      </div>
    </Link>
  );
}