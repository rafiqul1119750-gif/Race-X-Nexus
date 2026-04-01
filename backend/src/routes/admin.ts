import { Router, type IRouter } from "express";
import { db, usersTable, auditLogsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

const router: IRouter = Router();
const CURRENT_USER_ID = "user-001";

const MOCK_USERS = [
  { id: "user-001", username: "rx_creator", displayName: "RX Creator", status: "active" as const, reputation: 9800, diamonds: 15000, gems: 3400, violationCount: 0, lastActive: new Date().toISOString(), joinDate: "2025-01-15" },
  { id: "user-002", username: "NeonPhoenix", displayName: "Neon Phoenix", status: "active" as const, reputation: 7200, diamonds: 845230, gems: 12000, violationCount: 0, lastActive: new Date().toISOString(), joinDate: "2025-02-20" },
  { id: "user-003", username: "ShadowCaster", displayName: "Shadow Caster", status: "frozen" as const, reputation: 2100, diamonds: 500, gems: 50, violationCount: 3, lastActive: "2026-02-15T12:00:00Z", joinDate: "2025-06-10" },
  { id: "user-004", username: "PixelDrifter", displayName: "Pixel Drifter", status: "inactive" as const, reputation: 3400, diamonds: 2200, gems: 340, violationCount: 1, lastActive: "2026-02-01T10:00:00Z", joinDate: "2025-04-22" },
  { id: "user-005", username: "GlitchRacer77", displayName: "Glitch Racer 77", status: "suspended" as const, reputation: 800, diamonds: 0, gems: 0, violationCount: 5, lastActive: "2026-01-10T09:00:00Z", joinDate: "2025-08-05" },
];

router.get("/admin/users", async (_req, res) => {
  res.json({ users: MOCK_USERS, total: MOCK_USERS.length });
});

router.post("/admin/users/:userId/action", async (req, res) => {
  const { userId } = req.params;
  const { action, value, reason } = req.body;

  await db.insert(auditLogsTable).values({
    id: randomUUID(),
    action: `admin:${action}`,
    targetUserId: userId,
    performedBy: "god_mode",
    details: reason || `Action: ${action}, Value: ${value}`,
  });

  res.json({ success: true, message: `Action '${action}' applied to user ${userId}` });
});

router.get("/admin/logs", async (_req, res) => {
  const logs = await db.select().from(auditLogsTable).orderBy(desc(auditLogsTable.timestamp)).limit(50);
  res.json({ logs });
});

export default router;
