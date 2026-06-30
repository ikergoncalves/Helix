'use client';

import { Spinner } from 'chiselui';

/**
 * Global loading UI. Next.js shows this automatically during route
 * transitions, centered in the content area.
 *
 * Marked `'use client'` so the chiselui barrel (which sets up React contexts at
 * module scope) stays out of the server/RSC module graph.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Spinner size="lg" label="Loading…" />
    </div>
  );
}
