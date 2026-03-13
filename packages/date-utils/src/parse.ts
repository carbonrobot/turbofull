/** Returns true when `value` is a Date instance with a valid time value. */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

/**
 * Coerces a string, number, or Date to a valid Date.
 * Throws if the result is not a valid date.
 */
export function parseDate(value: string | number | Date): Date {
  if (value instanceof Date) {
    if (!isValidDate(value)) throw new Error("Invalid Date object");
    return value;
  }
  const d = new Date(value);
  if (!isValidDate(d)) throw new Error(`Cannot parse date: "${String(value)}"`);
  return d;
}

/** Returns a new Date at midnight (local time) for the given date. */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Returns a new Date at 23:59:59.999 (local time) for the given date. */
export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/** Returns a new Date with the given number of days added (or subtracted if negative). */
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Returns the number of whole days between two dates (b − a). */
export function diffInDays(a: Date, b: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1_000;
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}
