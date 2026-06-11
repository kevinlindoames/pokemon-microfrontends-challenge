import {
  dismissLastVisitedToast,
  getLastVisitedPokemon,
  shouldShowLastVisitedToast,
} from '@pokemon-challenge/shared';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PokemonDetail } from '@pokemon-challenge/shared';

export function LastVisitedToast() {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!shouldShowLastVisitedToast()) {
      return;
    }

    const lastVisitedPokemon = getLastVisitedPokemon();

    if (!lastVisitedPokemon) {
      return;
    }

    setPokemon(lastVisitedPokemon);
    setIsVisible(true);
  }, []);

  function handleDismiss() {
    dismissLastVisitedToast();
    setIsVisible(false);
  }

  if (!isVisible || !pokemon) {
    return null;
  }

  return (
    <aside className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm overflow-hidden rounded-[2rem] border border-red-100 bg-white/95 shadow-2xl shadow-red-200/70 backdrop-blur dark:border-cyan-300/20 dark:bg-slate-950/95 dark:shadow-cyan-950/40">
      <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-300 to-sky-400 dark:from-red-500 dark:via-cyan-300 dark:to-blue-500" />

      <div className="p-5">
        <div className="flex gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-sky-50 p-2 dark:from-slate-900 dark:via-slate-950 dark:to-cyan-950/40">
            <img
              alt={pokemon.name}
              className="h-full w-full object-contain"
              src={pokemon.image}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 dark:text-cyan-300">
              Último visitado
            </p>

            <h3 className="mt-1 truncate text-2xl font-black capitalize text-slate-950 dark:text-white">
              {pokemon.name}
            </h3>

            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              Puedes volver rápidamente a su ficha Pokédex.
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-slate-900/20 transition hover:bg-red-500 dark:bg-cyan-100 dark:text-slate-950 dark:hover:bg-cyan-200"
            to={`/pokemon/${pokemon.id}`}
            onClick={handleDismiss}
          >
            Ver detalle
          </Link>

          <button
            className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
            type="button"
            onClick={handleDismiss}
          >
            Cerrar
          </button>
        </div>
      </div>
    </aside>
  );
}