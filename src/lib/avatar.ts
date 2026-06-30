/**
 * Derive up to two uppercase initials from a name, for the textual avatars
 * used across the app (task cards, profile). Falls back to an em dash when
 * there is no usable name.
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
