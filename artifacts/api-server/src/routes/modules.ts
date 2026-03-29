import { Router, type IRouter } from "express";
import { db, modulesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const DEFAULT_MODULES = [
  { id: "studio", name: "RX Studio", description: "Create, edit, and publish content with AI-powered tools", icon: "🎬", enabled: true, color: "from-violet-600 to-purple-800", path: "/studio" },
  { id: "social", name: "RX Social", description: "Connect, share, and grow with the creator community", icon: "🌐", enabled: true, color: "from-cyan-500 to-blue-700", path: "/social" },
  { id: "chat", name: "RX Magic Chat", description: "AI-powered chat with celebrity voices and smart suggestions", icon: "💬", enabled: true, color: "from-emerald-500 to-teal-700", path: "/chat" },
  { id: "music", name: "RX Music", description: "AI-generated music, playlists, and sound effects", icon: "🎵", enabled: true, color: "from-pink-500 to-rose-700", path: "/music" },
  { id: "shop", name: "RX Shopping", description: "Premium items, NFTs, and exclusive creator merch", icon: "🛍️", enabled: true, color: "from-amber-500 to-orange-700", path: "/shop" },
  { id: "events", name: "RX Events", description: "Live tournaments, concerts, and PvP challenges", icon: "🏆", enabled: true, color: "from-red-500 to-red-800", path: "/events" },
];

async function ensureModules() {
  const existing = await db.select().from(modulesTable);
  if (existing.length === 0) {
    await db.insert(modulesTable).values(DEFAULT_MODULES);
  }
}

router.get("/modules", async (req, res) => {
  await ensureModules();
  const modules = await db.select().from(modulesTable);
  res.json({ modules });
});

router.post("/modules/:moduleId/toggle", async (req, res) => {
  await ensureModules();
  const { moduleId } = req.params;
  const { enabled } = req.body;
  await db.update(modulesTable).set({ enabled }).where(eq(modulesTable.id, moduleId));
  const updated = await db.select().from(modulesTable).where(eq(modulesTable.id, moduleId)).limit(1);
  res.json(updated[0]);
});

export default router;
