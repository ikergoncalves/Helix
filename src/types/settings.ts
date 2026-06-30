/** User-configurable preferences, persisted under `STORAGE_KEYS.preferences`. */
export interface UserPreferences {
  name: string;
  email: string;
  emailNotifications: boolean;
  taskReminders: boolean;
  weeklyDigest: boolean;
}

/** Used until the user saves anything, and to backfill missing fields. */
export const DEFAULT_PREFERENCES: UserPreferences = {
  name: 'Iker Gonçalves',
  email: 'iker@helix.app',
  emailNotifications: true,
  taskReminders: true,
  weeklyDigest: false,
};
