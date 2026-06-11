export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'El usuario es obligatorio.';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Ingresa un email válido.';
  }

  if (!values.password.trim()) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe tener mínimo 6 caracteres.';
  }

  return errors;
}