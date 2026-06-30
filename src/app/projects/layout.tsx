import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// The projects pages are Client Components, so per-page metadata lives here in
// a server layout. Resolves to "Projects · Helix" via the root title template.
export const metadata: Metadata = {
  title: 'Projects',
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
