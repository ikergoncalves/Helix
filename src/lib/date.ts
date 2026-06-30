/**
 * Date helpers for tasks.
 *
 * Tasks store deadlines as `YYYY-MM-DD` strings while chiselui's
 * DateRangePicker works with native `Date` objects. We parse and format in
 * *local* time on purpose: `new Date('2026-06-01')` is parsed as UTC midnight,
 * which renders as the previous day in negative timezones. Building the Date
 * from explicit components (and reading them back the same way) keeps the day
 * the user picked intact.
 */

/** Parse a `YYYY-MM-DD` string into a local-time Date, or null if invalid. */
export function parseISODate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

/** Format a Date as a `YYYY-MM-DD` string from its local components. */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const RANGE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

/**
 * Render a deadline range as `Jun 10 – Jun 18`. Gracefully degrades when one
 * or both ends are missing.
 */
export function formatDateRange(start: string, end: string): string {
  const startDate = parseISODate(start);
  const endDate = parseISODate(end);
  if (startDate && endDate) {
    return `${RANGE_FORMAT.format(startDate)} – ${RANGE_FORMAT.format(endDate)}`;
  }
  if (startDate) return RANGE_FORMAT.format(startDate);
  if (endDate) return RANGE_FORMAT.format(endDate);
  return 'No dates';
}
