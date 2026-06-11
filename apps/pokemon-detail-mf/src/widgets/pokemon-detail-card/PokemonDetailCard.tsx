import type { PokemonDetail } from '@pokemon-challenge/shared';
import { PlayPokemonCryButton } from '../../features/play-pokemon-cry/ui/PlayPokemonCryButton';
import { formatPokemonName } from '../../entities/pokemon/lib/format-pokemon-name';

type PokemonDetailCardProps = {
  pokemon: PokemonDetail;
};

function formatHeight(value: number): string {
  return `${(value / 10).toFixed(1)} m`;
}

function formatWeight(value: number): string {
  return `${(value / 10).toFixed(1)} kg`;
}

export function PokemonDetailCard({ pokemon }: PokemonDetailCardProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-red-100 bg-white/90 shadow-2xl shadow-red-100/60 backdrop-blur dark:border-cyan-300/20 dark:bg-slate-950/80 dark:shadow-cyan-950/40">
      <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-300 to-sky-400 dark:from-red-500 dark:via-cyan-300 dark:to-blue-500" />

      <div className="grid gap-8 p-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <aside className="space-y-5">
          <div className="relative flex min-h-[28rem] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-red-50 via-white to-sky-50 p-8 dark:border-cyan-300/10 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40">
            <div className="absolute left-6 top-6 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-sky-400" />
            </div>

            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
              #{pokemon.id}
            </p>

            <img
              alt={pokemon.name}
              className="h-80 w-full object-contain drop-shadow-2xl"
              decoding="async"
              loading="eager"
              src={pokemon.image}
            />

            <div className="mt-6 text-center">
              <h2 className="text-5xl font-black capitalize text-slate-950 dark:text-white">
                {formatPokemonName(pokemon.name)}
              </h2>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {pokemon.types.map((type) => (
                  <span
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-black capitalize text-red-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100"
                    key={type}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
              Pokédex Entry
            </p>

            <p className="mt-3 text-base font-semibold leading-7 text-slate-600 dark:text-slate-300">
              {pokemon.description ?? 'No Pokédex entry available.'}
            </p>
          </div>
        </aside>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
                Height
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                {formatHeight(pokemon.height)}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
                Weight
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                {formatWeight(pokemon.weight)}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
                Base XP
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                {pokemon.baseExperience}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
                  Abilities
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm font-black capitalize text-yellow-700 dark:border-yellow-300/20 dark:bg-yellow-300/10 dark:text-yellow-100"
                      key={ability.name}
                    >
                      {formatPokemonName(ability.name)}
                      {ability.isHidden ? ' · Hidden' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <PlayPokemonCryButton cry={pokemon.cry} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
              Evolution Chain
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
              {pokemon.evolutionChain.map((evolution) => (
                <div
                  className="rounded-3xl border border-slate-200 bg-gradient-to-br from-red-50 via-white to-sky-50 p-4 text-center dark:border-cyan-300/10 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40"
                  key={evolution.id}
                >
                  <img
                    alt={evolution.name}
                    className="mx-auto h-28 w-full object-contain"
                    decoding="async"
                    loading="lazy"
                    src={evolution.image}
                  />

                  <p className="mt-3 text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
                    #{evolution.id}
                  </p>

                  <h3 className="mt-1 text-lg font-black capitalize text-slate-950 dark:text-white">
                    {formatPokemonName(evolution.name)}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
              Base Stats
            </p>

            <div className="mt-5 space-y-4">
              {pokemon.stats.map((stat) => {
                const percentage = Math.min((stat.value / 150) * 100, 100);

                return (
                  <div key={stat.name}>
                    <div className="mb-2 flex items-center justify-between text-sm font-bold">
                      <span className="capitalize text-slate-600 dark:text-slate-300">
                        {formatPokemonName(stat.name)}
                      </span>

                      <span className="text-slate-950 dark:text-white">
                        {stat.value}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-300 to-sky-400 dark:from-red-500 dark:via-cyan-300 dark:to-blue-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
              Main Moves
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {pokemon.moves.map((move) => (
                <span
                  className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black capitalize text-sky-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100"
                  key={move}
                >
                  {formatPokemonName(move)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}