'use client';

import { useEffect, type ReactNode } from 'react';
import { ToastProvider } from 'chiselui';
import { ensureSeedData } from '@/lib/seed';

/**
 * Client-side providers for the whole app.
 *
 * chiselui has no ThemeProvider — theming is owned by the <ThemeToggle/>, which
 * persists the choice and writes `data-theme` onto <html>. So the only context
 * we mount here is the ToastProvider. We also seed localStorage once on mount.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureSeedData();
  }, []);

  return <ToastProvider>{children}</ToastProvider>;
}
