import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from '../../shared/ui/error-boundary/ErrorBoundary';
import { RemoteModuleErrorFallback } from '../../shared/ui/remote-module/RemoteModuleErrorFallback';
import { RemoteModuleSkeleton } from '../../shared/ui/remote-module/RemoteModuleSkeleton';

const PokemonDetail = lazy(() => import('pokemonDetailMf/PokemonDetail'));

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
        <RemoteModuleErrorFallback
          description="El microfrontend de detalle no respondió correctamente. Esto puede ocurrir si el remote está temporalmente caído, si hubo un problema de red o si el archivo remoteEntry.js no está disponible."
          moduleName="pokemon-detail-mf/PokemonDetail"
          title="No se pudo cargar el detalle del Pokémon"
          onRetry={resetError}
        />
      )}
    >
      <Suspense fallback={<RemoteModuleSkeleton variant="detail" />}>
        <PokemonDetail pokemonId={pokemonId} />
      </Suspense>
    </ErrorBoundary>
  );
}