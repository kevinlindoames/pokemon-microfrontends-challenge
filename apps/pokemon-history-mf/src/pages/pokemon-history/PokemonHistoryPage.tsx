import {
  clearPokemonHistory,
  getPokemonHistory,
  type VisitedPokemon,
} from '@pokemon-challenge/shared';
import { useState } from 'react';
import { ClearHistoryButton } from '../../features/clear-history/ui/ClearHistoryButton';
import { PokemonHistoryList } from '../../widgets/pokemon-history-list/PokemonHistoryList';

export function PokemonHistoryPage() {
  const [history, setHistory] = useState<VisitedPokemon[]>(() =>
    getPokemonHistory(),
  );

  function handleClearHistory() {
    clearPokemonHistory();
    setHistory([]);
  }

  function handleGoBack() {
    window.history.back();
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-red-100 bg-white/90 shadow-2xl shadow-red-100/60 backdrop-blur dark:border-cyan-300/20 dark:bg-slate-950/80 dark:shadow-cyan-950/40">
      <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-300 to-sky-400 dark:from-red-500 dark:via-cyan-300 dark:to-blue-500" />

      <div className="p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 dark:text-cyan-200">
              Visited Pokédex
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">
              Vistos recientemente
            </h2>

            <p className="mt-3 max-w-2xl text-base font-semibold text-slate-500 dark:text-slate-400">
              Historial local de Pokémon consultados desde el microfrontend de
              detalle.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-full border border-slate-200 bg-white px-5 py-3 font-black text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
              type="button"
              onClick={handleGoBack}
            >
              Regresar
            </button>

            <ClearHistoryButton
              disabled={history.length === 0}
              onClear={handleClearHistory}
            />
          </div>
        </div>

        <div className="mt-8">
          {history.length > 0 ? (
            <PokemonHistoryList history={history} />
          ) : (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-cyan-300/20 dark:bg-cyan-300/5">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-red-500 dark:text-cyan-300">
                Empty history
              </p>

              <h3 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                Aún no visitaste ningún Pokémon
              </h3>

              <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                Entra al detalle de un Pokémon para registrarlo aquí.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}