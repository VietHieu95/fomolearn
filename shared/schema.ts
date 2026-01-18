import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  status: "full" | "updating" | "coming_soon";
  progress?: number;
  icon: string;
  lessons: Lesson[];
  description?: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  courses: Course[];
}
