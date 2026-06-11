import { useThemeStore } from '../model/theme.store';

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <button
      className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 shadow-sm transition hover:bg-blue-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20"
      type="button"
      onClick={toggleTheme}
    >
      {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
    </button>
  );
}