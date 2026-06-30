import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Settings is a Client Component, so its metadata lives in this server layout.
// Resolves to "Settings · Helix" via the root title template.
export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return children;
}
