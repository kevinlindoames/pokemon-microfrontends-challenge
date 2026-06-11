export function getStorageItem<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors to avoid breaking the UI.
  }
}

export function removeStorageItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors to avoid breaking the UI.
  }
}