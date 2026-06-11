import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ErrorBoundary } from '../../shared/ui/error-boundary/ErrorBoundary';

const PokemonDetail = lazy(() => import('pokemonDetailMf/PokemonDetail'));

function PokemonDetailRemoteFallback({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-lg shadow-red-100/60 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100 dark:shadow-red-950/20">
      <p className="text-sm font-black uppercase tracking-[0.35em]">
        Remote module error
      </p>

      <h2 className="mt-3 text-3xl font-black">
        No se pudo cargar el detalle del Pokémon
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold opacity-80">
        El microfrontend de detalle no respondió correctamente. Esto puede
        ocurrir si el remote está temporalmente caído, si hubo un problema de
        red o si el archivo remoteEntry.js no está disponible.
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          className="rounded-full bg-red-600 px-5 py-3 font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
          type="button"
          onClick={onRetry}
        >
          Reintentar
        </button>

        <Link
          className="rounded-full bg-white px-5 py-3 font-black text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-100 dark:text-red-700"
          to="/home"
        >
          Volver al Home
        </Link>
      </div>
    </div>
  );
}

function PokemonDetailSkeleton() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="h-80 animate-pulse rounded-[2rem] bg-slate-200 dark:bg-white/10" />

        <div>
          <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-6 h-24 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="h-24 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PokemonDetailPage() {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  if (!pokemonId) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
        No se recibió un Pokémon válido.
      </div>
    );
  }

  return (
    <ErrorBoundary
      resetKey={pokemonId}
      fallback={({ resetError }) => (
        <PokemonDetailRemoteFallback onRetry={resetError} />
      )}
    >
      <Suspense fallback={<PokemonDetailSkeleton />}>
        <PokemonDetail pokemonId={pokemonId} />
      </Suspense>
    </ErrorBoundary>
  );
}