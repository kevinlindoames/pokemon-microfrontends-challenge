import type { AuthUser } from '@pokemon-challenge/shared';
import { create } from 'zustand';
import {
  getStoredAuthUser,
  removeStoredAuthUser,
  setStoredAuthUser,
} from '../lib/auth.storage';

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
};

function buildUserFromEmail(email: string): AuthUser {
  const name = email.split('@')[0] || 'Usuario';

  return {
    email,
    name,
  };
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = getStoredAuthUser();

  return {
    user: storedUser,
    isAuthenticated: Boolean(storedUser),

    login: (email: string) => {
      const user = buildUserFromEmail(email);

      setStoredAuthUser(user);

      set({
        user,
        isAuthenticated: true,
      });
    },

    logout: () => {
      removeStoredAuthUser();

      set({
        user: null,
        isAuthenticated: false,
      });
    },
  };
});