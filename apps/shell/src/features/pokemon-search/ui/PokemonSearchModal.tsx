import { PokemonPreviewCard, Skeleton } from '@pokemon-challenge/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePokemonInfiniteQuery } from '../../../entities/pokemon/api/use-pokemon-infinite-query';
import { useSearchPokemonQuery } from '../../../entities/pokemon/api/use-search-pokemon-query';
import { usePokemonSearchStore } from '../model/pokemon-search.store';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(','),
    ),
  ).filter((element) => !element.hasAttribute('disabled'));
}

export function PokemonSearchModal() {
  const isOpen = usePokemonSearchStore((state) => state.isOpen);
  const closeSearch = usePokemonSearchStore((state) => state.closeSearch);

  const [searchValue, setSearchValue] = useState('');

  const modalRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const infiniteQuery = usePokemonInfiniteQuery();
  const searchQuery = useSearchPokemonQuery(searchValue);

  const pokemonList = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [infiniteQuery.data],
  );

  const isSearching = searchValue.trim().length > 0;
  const exactSearchResult = searchQuery.data;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      previousFocusedElementRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeSearch();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const modal = modalRef.current;

      if (!modal) {
        return;
      }

      const focusableElements = getFocusableElements(modal);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
    <section
      ref={modalRef}
      aria-describedby="pokemon-search-description"
      aria-labelledby="pokemon-search-title"
      aria-modal="true"
      className="fixed inset-0 z-[60] overflow-y-auto bg-white/95 p-6 backdrop-blur-xl dark:bg-slate-950/95"
      role="dialog"
    >
      <div className="mx-auto max-w-6xl">
        <header className="sticky top-0 z-10 -mx-6 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur-xl dark:border-cyan-300/10 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
                Pokédex Search
              </p>

              <h2
                id="pokemon-search-title"
                className="mt-2 text-3xl font-black text-slate-950 dark:text-white"
              >
                Buscar Pokémon
              </h2>
            </div>

            <button
              aria-label="Cerrar buscador de Pokémon"
              className="rounded-full bg-slate-950 px-5 py-3 font-black text-white shadow-lg shadow-slate-900/20 transition hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-cyan-100 dark:text-slate-950 dark:hover:bg-cyan-200 dark:focus:ring-cyan-300/40"
              type="button"
              onClick={closeSearch}
            >
              Cerrar
            </button>
          </div>

          <div className="mx-auto mt-5 max-w-6xl">
            <input
              ref={inputRef}
              aria-label="Buscar Pokémon por nombre exacto"
              autoComplete="off"
              className="w-full rounded-[2rem] border border-slate-200 bg-white px-6 py-5 text-lg font-bold text-slate-950 outline-none shadow-lg shadow-slate-200/60 transition placeholder:text-slate-400 focus:border-red-300 focus:ring-4 focus:ring-red-100 dark:border-cyan-300/20 dark:bg-slate-900 dark:text-white dark:shadow-cyan-950/20 dark:focus:border-cyan-300 dark:focus:ring-cyan-300/10"
              placeholder="Busca por nombre exacto: pikachu, charizard, mr mime..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />

            <p
              id="pokemon-search-description"
              className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400"
            >
              La búsqueda usa coincidencia exacta según PokeAPI. Por ejemplo,
              escribe <strong>pikachu</strong>, no <strong>pika</strong>.
              Puedes cerrar este modal con la tecla Escape.
            </p>
          </div>
        </header>

        <div className="py-8">
          {isSearching ? (
            <>
              {searchQuery.isFetching ? (
                <div
                  aria-label="Buscando Pokémon"
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                  <Skeleton className="h-64 rounded-3xl" />
                </div>
              ) : exactSearchResult ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <PokemonPreviewCard
                    key={exactSearchResult.id}
                    pokemon={exactSearchResult}
                    to={`/pokemon/${exactSearchResult.id}`}
                    onClick={closeSearch}
                  />
                </div>
              ) : (
                <div
                  aria-live="polite"
                  className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-cyan-300/20 dark:bg-cyan-300/5"
                >
                  <p className="text-sm font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
                    Exact match not found
                  </p>

                  <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                    No encontramos ese Pokémon
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    La búsqueda debe coincidir exactamente con el nombre usado
                    por PokeAPI. Ejemplos válidos: pikachu, charizard,
                    bulbasaur, mr mime.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {infiniteQuery.isLoading ? (
                <div
                  aria-label="Cargando lista inicial de Pokémon"
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton className="h-64 rounded-3xl" key={index} />
                  ))}
                </div>
              ) : infiniteQuery.isError ? (
                <div
                  aria-live="polite"
                  className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100"
                >
                  No se pudo cargar la lista de Pokémon.
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {pokemonList.map((pokemon) => (
                      <PokemonPreviewCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        to={`/pokemon/${pokemon.id}`}
                        onClick={closeSearch}
                      />
                    ))}
                  </div>

                  <div ref={sentinelRef} className="h-12" />

                  {infiniteQuery.isFetchingNextPage && (
                    <div
                      aria-label="Cargando más Pokémon"
                      className="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton className="h-64 rounded-3xl" key={index} />
                      ))}
                    </div>
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