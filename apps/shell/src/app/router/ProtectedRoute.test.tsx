import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { STORAGE_KEYS } from '@pokemon-challenge/shared';
import { useAuthStore } from '../../features/auth/model/auth.store';
import { ProtectedRoute } from './ProtectedRoute';

function resetAuthStore() {
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
  });
}

function renderProtectedRoute(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<div>Protected Home</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthStore();
  });

  it('redirects to login when the user is not authenticated', () => {
    renderProtectedRoute('/home');

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Home')).not.toBeInTheDocument();
  });

  it('renders protected content when the user is authenticated', () => {
    const user = {
      email: 'kevin@test.com',
      name: 'kevin',
    };

    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));

    useAuthStore.setState({
      user,
      isAuthenticated: true,
    });

    renderProtectedRoute('/home');

    expect(screen.getByText('Protected Home')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});