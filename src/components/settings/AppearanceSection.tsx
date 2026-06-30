'use client';

import { ThemeToggle } from 'chiselui';

/**
 * Appearance settings. Reuses chiselui's self-contained ThemeToggle (same
 * default `storageKey` as the one in the Sidebar, so the two stay in sync) —
 * the theme logic lives entirely in that component, not here.
 */
export function AppearanceSection() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-medium">Theme</p>
        <p className="mt-0.5 text-sm text-[var(--color-neutral-500)]">
          Choose how Helix looks to you.
        </p>
      </div>
      <ThemeToggle />
    </div>
  );
}
