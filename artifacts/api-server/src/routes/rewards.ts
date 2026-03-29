import { Router, type IRouter } from "express";
import { db, usersTable, auditLogsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();
const CURRENT_USER_ID = "user-001";

router.get("/rewards", async (req, res) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, CURRENT_USER_ID)).limit(1);
  if (!user[0]) {
    res.json({ diamonds: 0, gems: 0, totalEarned: 0, rank: "Bronze", multiplier: 1.0 });
    return;
  }
  const { diamonds, gems, level } = user[0];
  let rank = "Bronze";
  if (diamonds >= 50000) rank = "Legend";
  else if (diamonds >= 20000) rank = "Diamond";
  else if (diamonds >= 10000) rank = "Platinum";
  else if (diamonds >= 5000) rank = "Gold";
  else if (diamonds >= 1000) rank = "Silver";

  res.json({
    diamonds,
    gems,
    totalEarned: diamonds + gems * 10,
    rank,
    multiplier: 1 + level * 0.01,
  });
});

router.post("/rewards/grant", async (req, res) => {
  const { userId, diamonds = 0, gems = 0, reason } = req.body;
  const targetId = userId || CURRENT_USER_ID;
  const user = await db.select().from(usersTable).where(eq(usersTable.id, targetId)).limit(1);
  if (!user[0]) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  await db.update(usersTable).set({
    diamonds: user[0].diamonds + diamonds,
    gems: user[0].gems + gems,
  }).where(eq(usersTable.id, targetId));

  await db.insert(auditLogsTable).values({
    id: randomUUID(),
    action: `grant_rewards:diamonds=${diamonds},gems=${gems}`,
    targetUserId: targetId,
    performedBy: "god_mode",
    details: reason || "Manual grant via God Mode",
  });

  const updated = await db.select().from(usersTable).where(eq(usersTable.id, targetId)).limit(1);
  const { diamonds: d, gems: g, level } = updated[0];
  let rank = "Bronze";
  if (d >= 50000) rank = "Legend";
  else if (d >= 20000) rank = "Diamond";
  else if (d >= 10000) rank = "Platinum";
  else if (d >= 5000) rank = "Gold";
  else if (d >= 1000) rank = "Silver";

  res.json({ diamonds: d, gems: g, totalEarned: d + g * 10, rank, multiplier: 1 + level * 0.01 });
});

export default router;
