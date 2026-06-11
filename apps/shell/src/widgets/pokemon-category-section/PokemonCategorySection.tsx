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
    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
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
        <div className={pokemonGridClassName}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className="h-52 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10"
              key={index}
            />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm font-bold text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
          No se pudieron cargar los Pokémon de tipo {label}.
        </div>
      ) : null}

      {data ? (
        <div className={pokemonGridClassName}>
          {data.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : null}
    </section>
  );
}