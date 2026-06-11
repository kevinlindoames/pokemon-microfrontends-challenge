import { describe, expect, it } from 'vitest';
import { validateLoginForm } from './auth.validation';

describe('validateLoginForm', () => {
  it('should return email error when email is empty', () => {
    const errors = validateLoginForm({
      email: '',
      password: '123456',
    });

    expect(errors.email).toBe('El usuario es obligatorio.');
  });

  it('should return email error when email is invalid', () => {
    const errors = validateLoginForm({
      email: 'kevin',
      password: '123456',
    });

    expect(errors.email).toBe('Ingresa un email válido.');
  });

  it('should return password error when password is empty', () => {
    const errors = validateLoginForm({
      email: 'kevin@test.com',
      password: '',
    });

    expect(errors.password).toBe('La contraseña es obligatoria.');
  });

  it('should return password error when password is shorter than 6 characters', () => {
    const errors = validateLoginForm({
      email: 'kevin@test.com',
      password: '123',
    });

    expect(errors.password).toBe('La contraseña debe tener mínimo 6 caracteres.');
  });

  it('should return no errors when form is valid', () => {
    const errors = validateLoginForm({
      email: 'kevin@test.com',
      password: '123456',
    });

    expect(errors).toEqual({});
  });
});