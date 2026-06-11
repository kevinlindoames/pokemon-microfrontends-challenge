import type { PokemonSummary } from '@pokemon-challenge/shared';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemonInfiniteQuery } from '../../../entities/pokemon/api/use-pokemon-infinite-query';
import { useSearchPokemonQuery } from '../../../entities/pokemon/api/use-search-pokemon-query';
import { usePokemonSearchStore } from '../model/pokemon-search.store';

function PokemonSearchCard({
  pokemon,
  onSelect,
}: {
  pokemon: PokemonSummary;
  onSelect: () => void;
}) {
  return (
    <Link
      className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl dark:border-cyan-300/10 dark:bg-slate-950/80 dark:shadow-cyan-950/20"
      to={`/pokemon/${pokemon.id}`}
      onClick={onSelect}
    >
      <div className="flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-sky-50 p-4 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40">
        {pokemon.image ? (
         <img
  alt={pokemon.name}
  className="h-full w-full object-contain transition group-hover:scale-110"
  decoding="async"
  loading="lazy"
  src={pokemon.image}
/>
        ) : (
          <span className="text-sm font-bold text-slate-400">No image</span>
        )}
      </div>

      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
        #{pokemon.id}
      </p>

      <h3 className="mt-1 text-xl font-black capitalize text-slate-950 dark:text-white">
        {pokemon.name.replace(/-/g, ' ')}
      </h3>
    </Link>
  );
}

export function PokemonSearchModal() {
  const isOpen = usePokemonSearchStore((state) => state.isOpen);
  const closeSearch = usePokemonSearchStore((state) => state.closeSearch);

  const [searchValue, setSearchValue] = useState('');

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const infiniteQuery = usePokemonInfiniteQuery();
  const searchQuery = useSearchPokemonQuery(searchValue);

  const pokemonList = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [infiniteQuery.data],
  );

  const isSearching = searchValue.trim().length > 0;
  const searchResults = searchQuery.data ?? [];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeSearch();
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeSearch, isOpen]);

  useEffect(() => {
    if (!isOpen || isSearching) {
      return;
    }

    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          infiniteQuery.hasNextPage &&
          !infiniteQuery.isFetchingNextPage
        ) {
          void infiniteQuery.fetchNextPage();
        }
      },
      {
        rootMargin: '300px',
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [
    infiniteQuery,
    infiniteQuery.fetchNextPage,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
    isOpen,
    isSearching,
  ]);

  useEffect(() => {
    if (!isOpen) {
      setSearchValue('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <section className="fixed inset-0 z-[60] overflow-y-auto bg-white/95 p-6 backdrop-blur-xl dark:bg-slate-950/95">
      <div className="mx-auto max-w-6xl">
        <header className="sticky top-0 z-10 -mx-6 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur-xl dark:border-cyan-300/10 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
                Pokédex Search
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                Buscar Pokémon
              </h2>
            </div>

            <button
              className="rounded-full bg-slate-950 px-5 py-3 font-black text-white shadow-lg shadow-slate-900/20 transition hover:bg-red-500 dark:bg-cyan-100 dark:text-slate-950 dark:hover:bg-cyan-200"
              type="button"
              onClick={closeSearch}
            >
              Cerrar
            </button>
          </div>

          <div className="mx-auto mt-5 max-w-6xl">
            <input
              autoFocus
              className="w-full rounded-[2rem] border border-slate-200 bg-white px-6 py-5 text-lg font-bold text-slate-950 outline-none shadow-lg shadow-slate-200/60 transition placeholder:text-slate-400 focus:border-red-300 dark:border-cyan-300/20 dark:bg-slate-900 dark:text-white dark:shadow-cyan-950/20 dark:focus:border-cyan-300"
              placeholder="Busca por nombre: pika, char, saur, eevee..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
        </header>

        <div className="py-8">
          {isSearching ? (
            <>
              {searchQuery.isFetching ? (
                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center font-black text-slate-500 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:text-slate-400">
                  Buscando Pokémon...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {searchResults.map((pokemon) => (
                    <PokemonSearchCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      onSelect={closeSearch}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-cyan-300/20 dark:bg-cyan-300/5">
                  <p className="text-sm font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
                    Empty result
                  </p>

                  <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                    No encontramos ese Pokémon
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Prueba con una parte del nombre como pika, char, saur o
                    eevee.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {infiniteQuery.isLoading ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10"
                      key={index}
                    />
                  ))}
                </div>
              ) : infiniteQuery.isError ? (
                <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
                  No se pudo cargar la lista de Pokémon.
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {pokemonList.map((pokemon) => (
                      <PokemonSearchCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onSelect={closeSearch}
                      />
                    ))}
                  </div>

                  <div ref={sentinelRef} className="h-12" />

                  {infiniteQuery.isFetchingNextPage && (
                    <p className="py-6 text-center text-sm font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
                      Loading more Pokémon...
                    </p>
                  )}

                  {!infiniteQuery.hasNextPage && (
                    <p className="py-6 text-center text-sm font-black uppercase tracking-[0.25em] text-slate-400">
                      No hay más Pokémon por cargar.
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
