import { create } from 'zustand';
import { getStoredTheme, setStoredTheme } from '../lib/theme.storage';
import type { ThemeMode } from './theme.types';

type ThemeState = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

function applyThemeToDocument(theme: ThemeMode): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const storedTheme = getStoredTheme();

  if (typeof document !== 'undefined') {
    applyThemeToDocument(storedTheme);
  }

  return {
    theme: storedTheme,

    toggleTheme: () => {
      const nextTheme = get().theme === 'dark' ? 'light' : 'dark';

      setStoredTheme(nextTheme);
      applyThemeToDocument(nextTheme);

      set({
        theme: nextTheme,
      });
    },
  };
});