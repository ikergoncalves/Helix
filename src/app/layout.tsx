import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'chiselui/styles.css';
import { Providers } from './providers';
import { AppShell } from '@/components/layout/AppShell';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_DESCRIPTION =
  'Project and task management — a Linear / Notion-light workspace.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Helix',
    template: '%s · Helix',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'Helix',
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: 'Helix',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
