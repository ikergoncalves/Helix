'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'chiselui';

/**
 * Custom 404. Rendered inside the root layout (so the app frame stays in
 * place), centered in the content area and styled with chiselui tokens.
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-[var(--color-primary)]">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 max-w-sm text-[var(--color-neutral-500)]">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Button
        variant="primary"
        className="mt-8"
        onClick={() => router.push('/projects')}
      >
        Back to projects
      </Button>
    </div>
  );
}
