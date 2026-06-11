import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../features/auth/ui/LoginForm';
import { useAuthStore } from '../../features/auth/model/auth.store';

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <section className="w-full max-w-xl rounded-[2rem] border border-red-400/30 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-red-300">
            Pokédex
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            Access Panel
          </h1>

          <p className="mt-4 text-slate-300">
            Ingresa con un email válido y una contraseña de mínimo 6 caracteres.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}