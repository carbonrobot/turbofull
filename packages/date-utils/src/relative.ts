const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/**
 * Returns a human-readable relative time string.
 *
 * @param date  - The date to describe.
 * @param base  - The reference point (defaults to now).
 *
 * @example
 * formatRelative(new Date(Date.now() - 90_000)) // "a minute ago"
 * formatRelative(new Date(Date.now() + 3_600_000)) // "in an hour"
 */
export function formatRelative(date: Date, base: Date = new Date()): string {
  const diff = date.getTime() - base.getTime();
  const abs = Math.abs(diff);
  const past = diff < 0;

  if (abs < MINUTE) return "just now";

  let value: number;
  let unit: string;

  if (abs < HOUR) {
    value = Math.round(abs / MINUTE);
    unit = value === 1 ? "minute" : "minutes";
  } else if (abs < DAY) {
    value = Math.round(abs / HOUR);
    unit = value === 1 ? "hour" : "hours";
  } else if (abs < WEEK) {
    value = Math.round(abs / DAY);
    unit = value === 1 ? "day" : "days";
  } else if (abs < MONTH) {
    value = Math.round(abs / WEEK);
    unit = value === 1 ? "week" : "weeks";
  } else if (abs < YEAR) {
    value = Math.round(abs / MONTH);
    unit = value === 1 ? "month" : "months";
  } else {
    value = Math.round(abs / YEAR);
    unit = value === 1 ? "year" : "years";
  }

  return past ? `${value} ${unit} ago` : `in ${value} ${unit}`;
}

/**
 * Formats a duration in milliseconds as a compact human-readable string.
 *
 * @example
 * formatDuration(500)       // "500ms"
 * formatDuration(75_000)    // "1m 15s"
 * formatDuration(7_200_000) // "2h"
 */
export function formatDuration(ms: number): string {
  if (ms < SECOND) return `${ms}ms`;
  if (ms < MINUTE) return `${Math.round(ms / SECOND)}s`;
  if (ms < HOUR) {
    const m = Math.floor(ms / MINUTE);
    const s = Math.floor((ms % MINUTE) / SECOND);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(ms / HOUR);
  const m = Math.floor((ms % HOUR) / MINUTE);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
