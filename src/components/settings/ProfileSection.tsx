'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { Input } from 'chiselui';
import type { UserPreferences } from '@/types/settings';
import { getInitials } from '@/lib/avatar';

interface ProfileSectionProps {
  preferences: UserPreferences;
  onUpdate: (partial: Partial<UserPreferences>) => void;
}

/** Pragmatic email shape check — non-empty local + domain with a dot. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProfileSection({ preferences, onUpdate }: ProfileSectionProps) {
  // Fields are edited locally and only persisted onBlur so we don't write to
  // storage (and toast) on every keystroke.
  const [name, setName] = useState(preferences.name);
  const [email, setEmail] = useState(preferences.email);
  const [emailError, setEmailError] = useState('');

  // Keep local inputs in step when preferences load in or change elsewhere.
  useEffect(() => {
    setName(preferences.name);
  }, [preferences.name]);
  useEffect(() => {
    setEmail(preferences.email);
  }, [preferences.email]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNameBlur = () => {
    const trimmed = name.trim();
    // Reject an empty name by reverting to the last saved value.
    if (!trimmed) {
      setName(preferences.name);
      return;
    }
    if (trimmed !== preferences.name) onUpdate({ name: trimmed });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError) setEmailError('');
  };

  const handleEmailBlur = () => {
    const trimmed = email.trim();
    if (trimmed === preferences.email) {
      setEmailError('');
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError('Enter a valid email address.');
      return;
    }
    setEmailError('');
    onUpdate({ email: trimmed });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-neutral-100)] text-lg font-medium text-[var(--color-neutral-700)]">
          {getInitials(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium">{name || 'Your name'}</p>
          <p className="truncate text-sm text-[var(--color-neutral-500)]">
            {email || 'No email set'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          maxLength={60}
          placeholder="Your name"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
}
