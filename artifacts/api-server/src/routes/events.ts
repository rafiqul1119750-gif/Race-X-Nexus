import { Router, type IRouter } from "express";
import { db, eventsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();

const MOCK_EVENTS = [
  { id: "evt-001", name: "Neon Velocity Championship", type: "tournament" as const, status: "live" as const, startDate: new Date("2026-03-28"), endDate: new Date("2026-04-05"), description: "The ultimate racing creator tournament — 1v1 content battles across all modules.", reward: "50,000 💎 + Legendary Badge", participants: 2847, maxParticipants: 5000 },
  { id: "evt-002", name: "AI Beats Festival", type: "concert" as const, status: "live" as const, startDate: new Date("2026-03-29"), endDate: new Date("2026-03-31"), description: "24-hour AI-generated music showcase. Stream, vote, and win exclusive sound packs.", reward: "10,000 💠 + VIP Status", participants: 12500, maxParticipants: 50000 },
  { id: "evt-003", name: "Spring Creator Blitz", type: "seasonal" as const, status: "upcoming" as const, startDate: new Date("2026-04-01"), endDate: new Date("2026-04-14"), description: "Spring seasonal challenge — create content with spring themes for bonus multipliers.", reward: "25,000 💎 + Spring Avatar Frame", participants: 0, maxParticipants: 10000 },
  { id: "evt-004", name: "PvP Content Wars: Round 7", type: "pvp" as const, status: "upcoming" as const, startDate: new Date("2026-04-02"), endDate: new Date("2026-04-03"), description: "Head-to-head content creation battles. Fastest-liked post wins.", reward: "5,000 💎", participants: 450, maxParticipants: 512 },
  { id: "evt-005", name: "Masterclass: AI Video Workshop", type: "workshop" as const, status: "upcoming" as const, startDate: new Date("2026-04-05"), endDate: new Date("2026-04-05"), description: "Learn to use AI-powered video tools with top creators. Certificate of completion.", reward: "Exclusive Template Pack + 2,000 💠", participants: 890, maxParticipants: 1000 },
];

async function ensureEvents() {
  const existing = await db.select().from(eventsTable);
  if (existing.length === 0) {
    await db.insert(eventsTable).values(MOCK_EVENTS);
  }
}

router.get("/events", async (req, res) => {
  await ensureEvents();
  const events = await db.select().from(eventsTable);
  const liveCount = events.filter(e => e.status === "live").length;
  res.json({ events, liveCount });
});

router.post("/events", async (req, res) => {
  await ensureEvents();
  const { name, type, startDate, endDate, description, reward, maxParticipants } = req.body;
  const event = {
    id: randomUUID(),
    name,
    type,
    status: "upcoming" as const,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : undefined,
    description,
    reward,
    maxParticipants,
    participants: 0,
  };
  await db.insert(eventsTable).values(event);
  res.status(201).json(event);
});

export default router;
