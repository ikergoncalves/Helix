'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from 'chiselui';
import { NAV_ITEMS } from './navItems';

/**
 * Mobile top bar. Replaces the fixed sidebar below the `md` breakpoint with a
 * sticky header carrying the same nav links and theme toggle laid out
 * horizontally, so the content area gets the full viewport width.
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:hidden">
      <span className="text-lg font-semibold">Helix</span>

      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'bg-[var(--color-neutral-100)] font-medium'
                  : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
