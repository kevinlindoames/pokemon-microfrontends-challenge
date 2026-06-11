import {
  STORAGE_KEYS,
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@pokemon-challenge/shared';
import type { AuthUser } from '@pokemon-challenge/shared';

export function getStoredAuthUser(): AuthUser | null {
  return getStorageItem<AuthUser | null>(STORAGE_KEYS.authUser, null);
}

export function setStoredAuthUser(user: AuthUser): void {
  setStorageItem(STORAGE_KEYS.authUser, user);
}

export function removeStoredAuthUser(): void {
  removeStorageItem(STORAGE_KEYS.authUser);
}