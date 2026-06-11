import type { MouseEventHandler } from 'react';
import type { PokemonSummary } from '@pokemon-challenge/shared';
import { Link } from 'react-router-dom';

type PokemonPreviewCardProps = {
  pokemon: PokemonSummary;
  to: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function PokemonPreviewCard({
  pokemon,
  to,
  onClick,
}: PokemonPreviewCardProps) {
  const displayName = pokemon.name.replace(/-/g, ' ');

  return (
    <Link
      className="group flex h-full min-h-[17rem] flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20 dark:focus:ring-cyan-300/40"
      to={to}
      onClick={onClick}
    >
      <div className="flex aspect-square shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-sky-50 p-4 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40">
        {pokemon.image ? (
          <img
            alt={displayName}
            className="h-full w-full object-contain transition group-hover:scale-110"
            decoding="async"
            loading="lazy"
            src={pokemon.image}
          />
        ) : (
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-300">
            No image
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-start">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600 dark:text-cyan-200">
          #{pokemon.id}
        </p>

        <h3 className="mt-1 min-h-14 break-words text-lg font-black capitalize leading-tight text-slate-950 dark:text-white">
          {displayName}
        </h3>
      </div>
    </Link>
  );
}