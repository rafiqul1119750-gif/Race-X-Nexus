import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userStatusEnum = pgEnum("user_status", ["active", "inactive", "suspended", "frozen", "archived"]);

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
  level: integer("level").notNull().default(1),
  reputation: integer("reputation").notNull().default(100),
  status: userStatusEnum("status").notNull().default("active"),
  diamonds: integer("diamonds").notNull().default(0),
  gems: integer("gems").notNull().default(0),
  faction: text("faction"),
  badges: text("badges").array(),
  violationCount: integer("violation_count").notNull().default(0),
  isGodMode: boolean("is_god_mode").notNull().default(false),
  joinDate: timestamp("join_date").notNull().defaultNow(),
  lastActive: timestamp("last_active").notNull().defaultNow(),
  frozenUntil: timestamp("frozen_until"),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ joinDate: true, lastActive: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
