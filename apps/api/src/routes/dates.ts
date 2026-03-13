import { Router } from "express";
import {
  formatDate,
  toISO,
  formatRelative,
  formatDuration,
  parseDate,
  startOfDay,
  endOfDay,
  addDays,
  diffInDays,
} from "@repo/date-utils";

const router = Router();

/** GET /api/dates/now — current timestamp in multiple formats */
router.get("/now", (_req, res) => {
  const now = new Date();
  res.json({
    iso: toISO(now),
    formatted: formatDate(now, "YYYY-MM-DD HH:mm:ss"),
    relative: formatRelative(now),
  });
});

/** POST /api/dates/format — format an arbitrary date with a pattern */
router.post("/format", (req, res) => {
  const { date, pattern = "YYYY-MM-DD" } = req.body as {
    date?: string;
    pattern?: string;
  };

  if (!date) {
    res.status(400).json({ error: "date is required" });
    return;
  }

  try {
    const parsed = parseDate(date);
    res.json({
      input: date,
      pattern,
      formatted: formatDate(parsed, pattern),
      iso: toISO(parsed),
    });
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : "Invalid date",
    });
  }
});

/** POST /api/dates/relative — relative time from a base date */
router.post("/relative", (req, res) => {
  const { date, base } = req.body as { date?: string; base?: string };

  if (!date) {
    res.status(400).json({ error: "date is required" });
    return;
  }

  try {
    const parsed = parseDate(date);
    const baseParsed = base ? parseDate(base) : new Date();
    res.json({
      input: date,
      base: toISO(baseParsed),
      relative: formatRelative(parsed, baseParsed),
    });
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : "Invalid date",
    });
  }
});

/** GET /api/dates/duration?ms=<number> — human-readable duration */
router.get("/duration", (req, res) => {
  const ms = Number(req.query["ms"]);
  if (!Number.isFinite(ms) || ms < 0) {
    res.status(400).json({ error: "ms must be a non-negative number" });
    return;
  }
  res.json({ ms, formatted: formatDuration(ms) });
});

/** POST /api/dates/diff — days between two dates */
router.post("/diff", (req, res) => {
  const { from, to } = req.body as { from?: string; to?: string };

  if (!from || !to) {
    res.status(400).json({ error: "from and to are required" });
    return;
  }

  try {
    const fromDate = parseDate(from);
    const toDate = parseDate(to);
    res.json({
      from,
      to,
      diffInDays: diffInDays(fromDate, toDate),
    });
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : "Invalid date",
    });
  }
});

/** POST /api/dates/range — start/end of day and adjacent days */
router.post("/range", (req, res) => {
  const { date } = req.body as { date?: string };

  if (!date) {
    res.status(400).json({ error: "date is required" });
    return;
  }

  try {
    const parsed = parseDate(date);
    res.json({
      input: date,
      startOfDay: toISO(startOfDay(parsed)),
      endOfDay: toISO(endOfDay(parsed)),
      yesterday: toISO(addDays(parsed, -1)),
      tomorrow: toISO(addDays(parsed, 1)),
    });
  } catch (err) {
    res.status(400).json({
      error: err instanceof Error ? err.message : "Invalid date",
    });
  }
});

export { router as datesRouter };
