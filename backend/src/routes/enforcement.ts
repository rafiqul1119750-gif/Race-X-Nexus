import { Router, type IRouter } from "express";
import { db, violationsTable, usersTable, auditLogsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();

router.get("/enforcement/violations", async (_req, res) => {
  const violations = await db.select().from(violationsTable).orderBy(desc(violationsTable.timestamp)).limit(50);
  res.json({ violations });
});

router.post("/enforcement/violations", async (req, res) => {
  const { userId, type, description } = req.body;

  const existing = await db.select().from(violationsTable).where(eq(violationsTable.userId, userId)).limit(1);
  const currentCount = existing.length > 0 ? existing[0].count + 1 : 1;

  const violation = {
    id: randomUUID(),
    userId,
    type,
    description,
    status: currentCount >= 3 ? "frozen" as const : "pending" as const,
    count: currentCount,
  };
  await db.insert(violationsTable).values(violation);

  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  let newStatus = user[0]?.status || "active";
  let frozenUntil: string | undefined;

  if (currentCount >= 3) {
    newStatus = "frozen";
    const frozenDate = new Date();
    frozenDate.setHours(frozenDate.getHours() + 3);
    frozenUntil = frozenDate.toISOString();
    await db.update(usersTable).set({
      status: "frozen",
      frozenUntil: new Date(frozenUntil),
      violationCount: currentCount,
    }).where(eq(usersTable.id, userId));
  } else {
    await db.update(usersTable).set({ violationCount: currentCount }).where(eq(usersTable.id, userId));
  }

  await db.insert(auditLogsTable).values({
    id: randomUUID(),
    action: `violation:${type}:count=${currentCount}`,
    targetUserId: userId,
    performedBy: "enforcement_system",
    details: description || `Violation #${currentCount} - ${type}`,
  });

  const messages: Record<number, string> = {
    1: "First warning issued. Two more violations will result in a temporary account freeze.",
    2: "Second warning. One more violation and your account will be frozen for at least 3 hours.",
    3: "Account frozen for 3 hours due to 3 violations. All rewards and activities suspended.",
  };

  res.json({
    violationCount: currentCount,
    status: newStatus,
    frozenUntil,
    message: messages[Math.min(currentCount, 3)] || "Additional violation recorded.",
  });
});

export default router;
