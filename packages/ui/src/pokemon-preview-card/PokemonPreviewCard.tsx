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
      className="group ui-card flex h-full min-h-[17rem] flex-col rounded-3xl border p-4 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 ui-focus-ring"
      to={to}
      onClick={onClick}
    >
      <div className="ui-card-media flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-2xl p-4">
        {pokemon.image ? (
          <img
            alt={displayName}
            className="h-full w-full transform-gpu object-contain transition-transform duration-300 ease-out group-hover:scale-125"
            decoding="async"
            loading="lazy"
            src={pokemon.image}
          />
        ) : (
          <div className="ui-text-secondary text-sm font-semibold">
            No image
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-start">
        <p className="ui-text-accent text-xs font-black uppercase tracking-[0.25em]">
          #{pokemon.id}
        </p>

        <h3 className="ui-text-primary mt-1 min-h-14 break-words text-lg font-black capitalize leading-tight">
          {displayName}
        </h3>
      </div>
    </Link>
  );
}