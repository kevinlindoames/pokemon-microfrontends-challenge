import {
  STORAGE_KEYS,
  getStorageItem,
  setStorageItem,
} from '@pokemon-challenge/shared';
import type { ThemeMode } from '../model/theme.types';

export function getStoredTheme(): ThemeMode {
  return getStorageItem<ThemeMode>(STORAGE_KEYS.theme, 'dark');
}

export function setStoredTheme(theme: ThemeMode): void {
  setStorageItem(STORAGE_KEYS.theme, theme);
}