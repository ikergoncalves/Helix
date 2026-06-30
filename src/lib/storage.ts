/**
 * Typed, SSR-safe wrapper around `localStorage`.
 *
 * Every function guards against running on the server (where `window` is
 * undefined) and against malformed payloads, so callers can use it from any
 * component without sprinkling `typeof window` checks everywhere.
 */

/** Keys used by Helix to namespace its localStorage entries. */
export const STORAGE_KEYS = {
  projects: 'helix.projects',
  preferences: 'helix.preferences',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/** Read and parse a JSON value. Returns `null` when missing or unreadable. */
export function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

/** Serialize and persist a value. No-op on the server or on quota errors. */
export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore write failures (quota exceeded, private mode, etc.).
  }
}

/** Remove a value. No-op on the server. */
export function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore removal failures.
  }
}
