import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../lib/auth.validation';
import type {
  LoginFormErrors,
  LoginFormValues,
} from '../lib/auth.validation';
import { useAuthStore } from '../model/auth.store';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLoginForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    login(values.email.trim());
    navigate('/home', { replace: true });
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-200">
          Usuario
        </label>

        <input
          className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-red-300"
          placeholder="usuario@email.com"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              email: event.target.value,
            }))
          }
        />

        {errors.email ? (
          <p className="mt-2 text-sm font-medium text-red-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-200">
          Contraseña
        </label>

        <input
          className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-red-300"
          placeholder="Mínimo 6 caracteres"
          type="password"
          value={values.password}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              password: event.target.value,
            }))
          }
        />

        {errors.password ? (
          <p className="mt-2 text-sm font-medium text-red-300">
            {errors.password}
          </p>
        ) : null}
      </div>

      <button
        className="w-full rounded-2xl bg-red-500 px-5 py-3 font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
        type="submit"
      >
        Ingresar
      </button>
    </form>
  );
}