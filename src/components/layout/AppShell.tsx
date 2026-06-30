import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

/**
 * App frame. On desktop: a fixed sidebar on the left with a scrollable content
 * area on the right. Below `md`: the sidebar collapses to a sticky top header
 * (MobileNav) and the content takes the full width.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <MobileNav />
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
