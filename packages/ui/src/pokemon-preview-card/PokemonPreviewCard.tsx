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
      className="group flex h-full min-h-[17rem] flex-col rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-lg shadow-[var(--card-shadow)] transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-cyan-300/40"
      to={to}
      onClick={onClick}
    >
      <div className="flex aspect-square shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--card-media-from)] via-[var(--card-media-via)] to-[var(--card-media-to)] p-4">
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