import { pgTable, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const violationTypeEnum = pgEnum("violation_type", ["age_violation", "copyright", "harassment", "spam", "other"]);
export const violationStatusEnum = pgEnum("violation_status", ["pending", "resolved", "frozen", "suspended"]);

export const violationsTable = pgTable("violations", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: violationTypeEnum("type").notNull(),
  description: text("description"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  status: violationStatusEnum("status").notNull().default("pending"),
  count: integer("count").notNull().default(1),
});

export const insertViolationSchema = createInsertSchema(violationsTable).omit({ timestamp: true, count: true });
export type InsertViolation = z.infer<typeof insertViolationSchema>;
export type Violation = typeof violationsTable.$inferSelect;
