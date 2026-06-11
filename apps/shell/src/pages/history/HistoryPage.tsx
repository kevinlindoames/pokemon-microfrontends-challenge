import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../../shared/ui/error-boundary/ErrorBoundary';
import { RemoteModuleErrorFallback } from '../../shared/ui/remote-module/RemoteModuleErrorFallback';
import { RemoteModuleSkeleton } from '../../shared/ui/remote-module/RemoteModuleSkeleton';

const PokemonHistory = lazy(() => import('pokemonHistoryMf/PokemonHistory'));

export function HistoryPage() {
  return (
    <ErrorBoundary
      resetKey="pokemon-history"
      fallback={({ resetError }) => (
        <RemoteModuleErrorFallback
          description="El microfrontend de historial no respondió correctamente. El Shell sigue funcionando, pero este módulo remoto necesita estar disponible para mostrar las visitas guardadas."
          moduleName="pokemon-history-mf/PokemonHistory"
          title="No se pudo cargar el historial"
          onRetry={resetError}
        />
      )}
    >
      <Suspense fallback={<RemoteModuleSkeleton variant="history" />}>
        <PokemonHistory />
      </Suspense>
    </ErrorBoundary>
  );
}