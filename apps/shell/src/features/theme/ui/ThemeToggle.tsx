import { Button } from '@pokemon-challenge/ui';
import { useThemeStore } from '../model/theme.store';

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <Button
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      size="sm"
      type="button"
      variant="secondary"
      onClick={toggleTheme}
    >
      {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
    </Button>
  );
}