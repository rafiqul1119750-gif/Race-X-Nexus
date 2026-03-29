import { pgTable, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eventTypeEnum = pgEnum("event_type", ["tournament", "concert", "workshop", "pvp", "seasonal", "challenge"]);
export const eventStatusEnum = pgEnum("event_status", ["upcoming", "live", "ended"]);

export const eventsTable = pgTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: eventTypeEnum("type").notNull(),
  status: eventStatusEnum("status").notNull().default("upcoming"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  description: text("description").notNull(),
  reward: text("reward"),
  participants: integer("participants").notNull().default(0),
  maxParticipants: integer("max_participants"),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ participants: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
