import { Router, type IRouter } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();

const CURRENT_USER_ID = "user-001";

async function ensureUser() {
  const existing = await db.select().from(usersTable).where(eq(usersTable.id, CURRENT_USER_ID)).limit(1);
  if (existing.length === 0) {
    await db.insert(usersTable).values({
      id: CURRENT_USER_ID,
      username: "rx_creator",
      displayName: "RX Creator",
      avatar: "",
      level: 42,
      reputation: 9800,
      status: "active",
      diamonds: 15000,
      gems: 3400,
      faction: "Neon Wolves",
      badges: ["Founder", "Top Creator", "PvP Champion"],
      violationCount: 0,
      isGodMode: true,
    });
  }
}

router.get("/user/profile", async (req, res) => {
  await ensureUser();
  const user = await db.select().from(usersTable).where(eq(usersTable.id, CURRENT_USER_ID)).limit(1);
  res.json(user[0]);
});

router.put("/user/profile", async (req, res) => {
  await ensureUser();
  const { displayName, avatar, diamonds, gems } = req.body;
  const updates: Record<string, unknown> = {};
  if (displayName !== undefined) updates.displayName = displayName;
  if (avatar !== undefined) updates.avatar = avatar;
  if (diamonds !== undefined) updates.diamonds = diamonds;
  if (gems !== undefined) updates.gems = gems;
  updates.lastActive = new Date();

  await db.update(usersTable).set(updates).where(eq(usersTable.id, CURRENT_USER_ID));
  const updated = await db.select().from(usersTable).where(eq(usersTable.id, CURRENT_USER_ID)).limit(1);
  res.json(updated[0]);
});

export default router;
