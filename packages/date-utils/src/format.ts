const pad = (n: number, length = 2): string => String(n).padStart(length, "0");

const TOKEN_RE = /YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g;

/**
 * Format a Date using a simple token-based pattern.
 *
 * Supported tokens:
 *   YYYY  - 4-digit year         (e.g. 2025)
 *   YY    - 2-digit year         (e.g. 25)
 *   MM    - 2-digit month        (01–12)
 *   M     - numeric month        (1–12)
 *   DD    - 2-digit day          (01–31)
 *   D     - numeric day          (1–31)
 *   HH    - 2-digit 24-h hour    (00–23)
 *   H     - numeric 24-h hour    (0–23)
 *   mm    - 2-digit minutes      (00–59)
 *   m     - numeric minutes      (0–59)
 *   ss    - 2-digit seconds      (00–59)
 *   s     - numeric seconds      (0–59)
 */
export function formatDate(date: Date, pattern: string): string {
  const replacements: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MM: pad(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DD: pad(date.getDate()),
    D: String(date.getDate()),
    HH: pad(date.getHours()),
    H: String(date.getHours()),
    mm: pad(date.getMinutes()),
    m: String(date.getMinutes()),
    ss: pad(date.getSeconds()),
    s: String(date.getSeconds()),
  };
  return pattern.replace(TOKEN_RE, (token) => replacements[token] ?? token);
}

/** Returns the date's ISO 8601 string (UTC). */
export function toISO(date: Date): string {
  return date.toISOString();
}

/** Returns a new Date equal to the given date, normalised to UTC. */
export function toUTC(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds(),
    ),
  );
}
