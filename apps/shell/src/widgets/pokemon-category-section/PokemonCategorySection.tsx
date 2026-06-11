import { Skeleton, Surface } from '@pokemon-challenge/ui';
import type { PokemonTypeName } from '@pokemon-challenge/shared';
import { usePokemonByTypeQuery } from '../../entities/pokemon/api/use-pokemon-by-type-query';
import { PokemonCard } from '../../entities/pokemon/ui/PokemonCard';

type PokemonCategorySectionProps = {
  type: PokemonTypeName;
  label: string;
  description: string;
};

const pokemonGridClassName =
  'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5';

export function PokemonCategorySection({
  type,
  label,
  description,
}: PokemonCategorySectionProps) {
  const { data, isLoading, isError } = usePokemonByTypeQuery(type);

  return (
    <Surface as="section" className="p-5 backdrop-blur">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
            Type / {type}
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
            {label}
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div
          aria-label={`Cargando Pokémon de tipo ${label}`}
          className={pokemonGridClassName}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton className="h-52 rounded-3xl" key={index} />
          ))}
        </div>
      ) : null}

      {isError ? (
        <Surface className="p-5 text-sm font-bold" radius="3xl" variant="danger">
          No se pudieron cargar los Pokémon de tipo {label}.
        </Surface>
      ) : null}

      {data ? (
        <div className={pokemonGridClassName}>
          {data.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : null}
    </Surface>
  );
}