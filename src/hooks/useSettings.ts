'use client';

import { useCallback, useEffect, useState } from 'react';
import { useToast } from 'chiselui';
import { DEFAULT_PREFERENCES, type UserPreferences } from '@/types/settings';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

export interface UseSettingsResult {
  preferences: UserPreferences;
  isLoading: boolean;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
}

/**
 * Client-side store for user preferences, backed by localStorage.
 *
 * Settings auto-save: there is no "Save" button, so every `updatePreferences`
 * merges the partial into the current state, persists immediately, and fires a
 * discreet confirmation toast. The stored value is merged over
 * `DEFAULT_PREFERENCES` on load so older payloads missing newer fields still
 * resolve to a complete object.
 */
export function useSettings(): UseSettingsResult {
  const { toast } = useToast();
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getItem<UserPreferences>(STORAGE_KEYS.preferences);
    if (stored) setPreferences({ ...DEFAULT_PREFERENCES, ...stored });
    setIsLoading(false);
  }, []);

  const updatePreferences = useCallback(
    (partial: Partial<UserPreferences>) => {
      setPreferences((current) => {
        const next = { ...current, ...partial };
        setItem(STORAGE_KEYS.preferences, next);
        return next;
      });
      toast({ message: 'Preferences saved', variant: 'success' });
    },
    [toast],
  );

  return { preferences, isLoading, updatePreferences };
}
