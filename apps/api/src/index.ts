import express from "express";
import { datesRouter } from "./routes/dates.js";

const app = express();
const PORT = process.env["PORT"] ?? 3001;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/dates", datesRouter);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
