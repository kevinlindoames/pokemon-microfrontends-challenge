import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/model/auth.store';
import { ThemeToggle } from '../../features/theme-toggle/ui/ThemeToggle';
import { LastVisitedToast } from '../../features/last-visited-toast/ui/LastVisitedToast';
import { PokemonSearchButton } from '../../features/pokemon-search/ui/PokemonSearchButton';
import { PokemonSearchModal } from '../../features/pokemon-search/ui/PokemonSearchModal';

export function AppLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_28%),radial-gradient(circle_at_top_right,#fee2e2_0%,transparent_30%),linear-gradient(135deg,#fff7ed_0%,#ffffff_45%,#eff6ff_100%)] p-6 text-slate-950 transition dark:bg-[radial-gradient(circle_at_top_left,#ef4444_0%,transparent_24%),radial-gradient(circle_at_top_right,#22d3ee_0%,transparent_22%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#111827_100%)] dark:text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <header className="overflow-hidden rounded-[2rem] border border-red-100 bg-white/90 shadow-2xl shadow-red-100/60 backdrop-blur transition dark:border-cyan-300/20 dark:bg-slate-950/80 dark:shadow-cyan-950/40">
          <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-300 to-sky-400 dark:from-red-500 dark:via-cyan-300 dark:to-blue-500" />

          <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-900 bg-sky-300 shadow-lg shadow-sky-200/70 dark:border-cyan-100 dark:bg-cyan-300 dark:shadow-cyan-300/30">
                <div className="h-7 w-7 rounded-full bg-white shadow-inner" />
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-red-500" />
                <span className="absolute -bottom-1 right-2 h-3 w-3 rounded-full border border-white bg-yellow-300" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-red-600 dark:text-cyan-200">
                  Pokédex Shell
                </p>

                <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                  Pokémon Microfrontends
                </h1>

                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-cyan-100/70">
                  React · Vite · Module Federation
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-3 text-sm font-bold">
              <Link
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-red-700 shadow-sm transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100 dark:hover:bg-red-500/20"
                to="/home"
              >
                Home
              </Link>

              <Link
                className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-yellow-700 shadow-sm transition hover:bg-yellow-100 dark:border-yellow-300/20 dark:bg-yellow-300/10 dark:text-yellow-100 dark:hover:bg-yellow-300/20"
                to="/pokemon/pikachu"
              >
                Detail
              </Link>

              <Link
                className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sky-700 shadow-sm transition hover:bg-sky-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
                to="/history"
              >
                History
              </Link>
              <PokemonSearchButton />

              <ThemeToggle />

              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm transition dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100">
                {user?.name ?? 'Usuario'}
              </div>

              <button
                className="rounded-full bg-slate-950 px-4 py-2 font-black text-white shadow-lg shadow-slate-900/20 transition hover:bg-red-500 dark:bg-cyan-100 dark:text-slate-950 dark:hover:bg-cyan-200"
                type="button"
                onClick={handleLogout}
              >
                Salir
              </button>
            </nav>
          </div>
        </header>

        <Outlet />
      </section>
      <LastVisitedToast />
      <PokemonSearchModal />
    </main>
  );
}