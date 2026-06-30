'use client';

import { type ReactNode } from 'react';
import { Skeleton } from 'chiselui';
import { useSettings } from '@/hooks/useSettings';
import { ProfileSection } from '@/components/settings/ProfileSection';
import { NotificationsSection } from '@/components/settings/NotificationsSection';
import { AppearanceSection } from '@/components/settings/AppearanceSection';

export default function SettingsPage() {
  const { preferences, isLoading, updatePreferences } = useSettings();

  return (
    <section className="max-w-3xl">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-[var(--color-neutral-500)]">
          Manage your profile, notifications, and appearance.
        </p>
      </header>

      {isLoading ? (
        <SettingsSkeleton />
      ) : (
        <div className="mt-8 flex flex-col">
          <SettingsBlock
            title="Profile"
            description="Your personal information."
          >
            <ProfileSection
              preferences={preferences}
              onUpdate={updatePreferences}
            />
          </SettingsBlock>

          <SettingsBlock
            title="Notifications"
            description="Decide what Helix emails you about."
          >
            <NotificationsSection
              preferences={preferences}
              onUpdate={updatePreferences}
            />
          </SettingsBlock>

          <SettingsBlock
            title="Appearance"
            description="Customize how the interface looks."
          >
            <AppearanceSection />
          </SettingsBlock>
        </div>
      )}
    </section>
  );
}

/**
 * One settings section: a label/description column beside its controls,
 * separated from the previous block by a token-driven divider.
 */
function SettingsBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-[var(--color-border)] py-8 first:border-t-0 first:pt-0">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-[var(--color-neutral-500)]">
            {description}
          </p>
        </div>
        <div className="sm:col-span-2">{children}</div>
      </div>
    </div>
  );
}

/** Placeholder shown while preferences are read from localStorage. */
function SettingsSkeleton() {
  return (
    <div className="mt-8 flex flex-col gap-8">
      {['a', 'b', 'c'].map((id) => (
        <div key={id} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <Skeleton width="50%" height={18} />
            <Skeleton width="80%" height={14} className="mt-2" />
          </div>
          <div className="sm:col-span-2">
            <Skeleton variant="rectangular" height={72} />
          </div>
        </div>
      ))}
    </div>
  );
}
