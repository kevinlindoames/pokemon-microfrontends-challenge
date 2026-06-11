import { Button, Surface } from '@pokemon-challenge/ui';
import { Link } from 'react-router-dom';

type RemoteModuleErrorFallbackProps = {
  title: string;
  description: string;
  moduleName: string;
  onRetry: () => void;
};

export function RemoteModuleErrorFallback({
  title,
  description,
  moduleName,
  onRetry,
}: RemoteModuleErrorFallbackProps) {
  return (
    <Surface
      aria-live="polite"
      as="section"
      className="p-8 text-center"
      variant="danger"
    >
      <p className="text-sm font-black uppercase tracking-[0.35em]">
        Remote module error
      </p>

      <h2 className="mt-3 text-3xl font-black">{title}</h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold opacity-80">
        {description}
      </p>

      <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-200 bg-white/70 p-4 text-left text-xs font-bold text-red-700 dark:border-red-300/20 dark:bg-red-950/30 dark:text-red-100">
        <p className="uppercase tracking-[0.25em] opacity-70">
          Módulo afectado
        </p>

        <code className="mt-2 block break-all rounded-xl bg-red-100 px-3 py-2 text-sm dark:bg-red-950/60">
          {moduleName}
        </code>

        <p className="mt-3 opacity-80">
          El Shell continúa funcionando. Solo se aisló el error del
          microfrontend remoto.
        </p>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button type="button" variant="danger" onClick={onRetry}>
          Reintentar
        </Button>

        <Link
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-100 dark:text-red-700"
          to="/home"
        >
          Volver al Home
        </Link>
      </div>
    </Surface>
  );
}