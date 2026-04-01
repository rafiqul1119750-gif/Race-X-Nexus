import { Router, type IRouter } from "express";

const router: IRouter = Router();

const MOCK_LEADERBOARD = [
  { rank: 1, userId: "user-legendary-1", username: "VelocityKing", displayName: "Velocity King 🔥", score: 982000, diamonds: 987654, faction: "Neon Wolves", avatar: "" },
  { rank: 2, userId: "user-legendary-2", username: "NeonPhoenix", displayName: "Neon Phoenix ⚡", score: 876000, diamonds: 845230, faction: "Crystal Hawks", avatar: "" },
  { rank: 3, userId: "user-001", username: "rx_creator", displayName: "RX Creator (You)", score: 750000, diamonds: 15000, faction: "Neon Wolves", avatar: "" },
  { rank: 4, userId: "user-legendary-4", username: "StarForge99", displayName: "StarForge 99", score: 645000, diamonds: 623100, faction: "Shadow Blades", avatar: "" },
  { rank: 5, userId: "user-legendary-5", username: "CosmicDrift", displayName: "Cosmic Drift", score: 598000, diamonds: 577800, faction: "Crystal Hawks", avatar: "" },
  { rank: 6, userId: "user-legendary-6", username: "PixelRacer", displayName: "Pixel Racer", score: 512000, diamonds: 489200, faction: "Storm Raiders", avatar: "" },
  { rank: 7, userId: "user-legendary-7", username: "LunarByte", displayName: "Lunar Byte", score: 478000, diamonds: 445000, faction: "Neon Wolves", avatar: "" },
  { rank: 8, userId: "user-legendary-8", username: "HyperGlitch", displayName: "HyperGlitch", score: 412000, diamonds: 398000, faction: "Shadow Blades", avatar: "" },
  { rank: 9, userId: "user-legendary-9", username: "ArcadeVortex", displayName: "Arcade Vortex", score: 389000, diamonds: 372000, faction: "Storm Raiders", avatar: "" },
  { rank: 10, userId: "user-legendary-10", username: "NightCircuit", displayName: "Night Circuit", score: 356000, diamonds: 341000, faction: "Crystal Hawks", avatar: "" },
];

let leaderboardData = [...MOCK_LEADERBOARD];
let lastReset = "2026-03-01";

router.get("/leaderboard", (_req, res) => {
  res.json({ entries: leaderboardData, season: "Season 7 - Spring 2026", lastReset });
});

router.post("/leaderboard", (_req, res) => {
  leaderboardData = leaderboardData.map(e => ({ ...e, score: 0, diamonds: 0 }));
  lastReset = new Date().toISOString().split("T")[0];
  res.json({ success: true, message: "Leaderboard has been reset for the new season." });
});

export default router;
