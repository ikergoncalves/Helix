'use client';

import { useEffect } from 'react';
import { Button } from 'chiselui';

/**
 * Route-segment error boundary. Next.js requires this to be a Client
 * Component and passes `reset` to retry the failed render. We log the error
 * for debugging but never surface its internals to the user.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-sm text-[var(--color-neutral-500)]">
        An unexpected error occurred. You can try again — if the problem
        persists, refresh the page.
      </p>
      <Button variant="primary" className="mt-8" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
