import { STORAGE_KEYS } from '../constants/storage-keys';
import type { PokemonDetail } from '../types/pokemon.types';
import { getStorageItem, removeStorageItem, setStorageItem } from './safe-storage';

export function getLastVisitedPokemon(): PokemonDetail | null {
  return getStorageItem<PokemonDetail | null>(
    STORAGE_KEYS.lastVisitedPokemon,
    null,
  );
}

export function setLastVisitedPokemon(pokemon: PokemonDetail): void {
  setStorageItem(STORAGE_KEYS.lastVisitedPokemon, pokemon);
  removeStorageItem(STORAGE_KEYS.lastVisitedToastDismissed);
}

export function dismissLastVisitedToast(): void {
  setStorageItem(STORAGE_KEYS.lastVisitedToastDismissed, true);
}

export function shouldShowLastVisitedToast(): boolean {
  const lastVisitedPokemon = getLastVisitedPokemon();
  const dismissed = getStorageItem<boolean>(
    STORAGE_KEYS.lastVisitedToastDismissed,
    false,
  );

  return Boolean(lastVisitedPokemon && !dismissed);
}