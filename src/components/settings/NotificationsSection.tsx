'use client';

import { Switch } from 'chiselui';
import type { UserPreferences } from '@/types/settings';

interface NotificationsSectionProps {
  preferences: UserPreferences;
  onUpdate: (partial: Partial<UserPreferences>) => void;
}

/** The boolean preference keys this section toggles. */
type NotificationKey = 'emailNotifications' | 'taskReminders' | 'weeklyDigest';

const NOTIFICATION_ITEMS: {
  key: NotificationKey;
  title: string;
  description: string;
}[] = [
  {
    key: 'emailNotifications',
    title: 'Email notifications',
    description: 'Receive email updates about activity on your projects.',
  },
  {
    key: 'taskReminders',
    title: 'Task reminders',
    description: 'Get a nudge before a task deadline is due.',
  },
  {
    key: 'weeklyDigest',
    title: 'Weekly digest',
    description: 'A summary of your week, delivered every Monday.',
  },
];

export function NotificationsSection({
  preferences,
  onUpdate,
}: NotificationsSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      {NOTIFICATION_ITEMS.map((item) => {
        const switchId = `pref-${item.key}`;
        return (
          <div
            key={item.key}
            className="flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <label htmlFor={switchId} className="font-medium">
                {item.title}
              </label>
              <p className="mt-0.5 text-sm text-[var(--color-neutral-500)]">
                {item.description}
              </p>
            </div>
            <Switch
              id={switchId}
              checked={preferences[item.key]}
              onChange={(checked) => onUpdate({ [item.key]: checked })}
            />
          </div>
        );
      })}
    </div>
  );
}
